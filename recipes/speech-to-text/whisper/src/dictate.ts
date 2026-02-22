import { createOpencodeClient } from "@opencode-ai/sdk";
import { spawn } from "child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
import fs from "node:fs";
import { $ } from "bun";

const {
  WHISPER_MODEL: ENV_MODEL = "base",
  WHISPER_CLI,
  WHISPER_MODELS_PATH,
  WHISPER_VAD_MODEL,
  WHISPER_AUDIO_DRIVER = "alsa",
  WHISPER_INPUT: ENV_INPUT = "auto",
  WHISPER_OUTPUT: ENV_OUTPUT = "auto"
} = process.env;

export interface DictateArgs {
  model?: string;
  language?: string;
}

export async function dictate(args: DictateArgs = {}) {
  const client = createOpencodeClient();
  const tempFile = join(tmpdir(), `dictate-${Date.now()}.wav`);
  let soxProcess: any = null;

  const model = args.model || ENV_MODEL;
  const language = args.language || ENV_INPUT;

  const cleanup = () => {
    if (soxProcess) {
      try {
        soxProcess.kill("SIGTERM");
      } catch (e) {}
      soxProcess = null;
    }
    if (fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch (e) {}
    }
  };

  // We should handle process signals in the plugin host usually, 
  // but for local safety we can add them here if this is a separate process.
  // In Opencode plugins, each plugin runs in its own worker/process.
  const sigHandler = () => { cleanup(); process.exit(0); };
  process.on("SIGINT", sigHandler);
  process.on("SIGTERM", sigHandler);

  try {
    if (!WHISPER_CLI || !fs.existsSync(WHISPER_CLI)) {
      throw new Error(`WHISPER_CLI not found at ${WHISPER_CLI}`);
    }

    // 1. Start Recording
    await client.tui.showToast({ body: { message: "🎙️ Recording... (SPACE or ENTER to stop)", variant: "info" } });

    soxProcess = spawn("sox", [
      "-q",
      "-t", WHISPER_AUDIO_DRIVER, "default",
      "-c", "1",
      "-r", "16000",
      "-b", "16",
      tempFile
    ]);

    soxProcess.on("error", (err: Error) => {
      console.error("[ERROR] Sox error:", err);
    });

    // 2. Wait for stop key
    // NOTE: Plugin host must provide stdin to the plugin process for this to work
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    await new Promise<void>((resolve) => {
      process.stdin.on("data", function handler(data: string) {
        if (data === " " || data === "\r" || data === "\n") {
          process.stdin.off("data", handler);
          resolve();
        }
        if (data === "\u0003") { // Ctrl+C
          cleanup();
          process.exit(0);
        }
      });
    });

    process.stdin.setRawMode(false);
    process.stdin.pause();

    // Stop sox
    if (soxProcess) {
      soxProcess.kill("SIGTERM");
      // Wait for file to flush
      await new Promise(r => setTimeout(r, 200));
    }

    if (!fs.existsSync(tempFile) || fs.statSync(tempFile).size < 100) {
      await client.tui.showToast({ body: { message: "⚠️ No audio recorded", variant: "warning" } });
      return "No audio recorded";
    }

    // 3. Transcribe
    await client.tui.showToast({ body: { message: "⚙️ Transcribing...", variant: "info" } });

    const modelFile = join(WHISPER_MODELS_PATH || "", `ggml-${model}.bin`);
    const whisperArgs = ["-m", modelFile, "-f", tempFile, "-nt", "-l", language];

    if (ENV_OUTPUT === "en" && language !== "en") {
      whisperArgs.push("-tr");
    }

    if (WHISPER_VAD_MODEL && fs.existsSync(WHISPER_VAD_MODEL)) {
      whisperArgs.push("--vad", "-vm", WHISPER_VAD_MODEL);
    }

    // Execute whisper-cli
    const { stdout, stderr, exitCode } = await $`${WHISPER_CLI} ${whisperArgs}`.quiet().nothrow();

    if (exitCode !== 0) {
      console.error("[ERROR] Whisper-cli failed:", stderr.toString());
      await client.tui.showToast({ body: { message: "❌ Transcription failed", variant: "error" } });
      return "Transcription failed";
    }

    const transcription = stdout.toString()
      .split("\n")
      .filter(line => !line.match(/^(whisper_|system_info|main:|\s*$|\[)/))
      .join(" ")
      .trim();

    if (!transcription) {
      await client.tui.showToast({ body: { message: "😶 No speech detected", variant: "warning" } });
      return "No speech detected";
    }

    // 4. Update TUI
    await client.tui.clearPrompt();
    await client.tui.appendPrompt({ body: { text: transcription } });
    await client.tui.showToast({ body: { message: "✅ Transcription added", variant: "success" } });

    return `Transcription successful: ${transcription}`;

  } catch (error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[ERROR]", errorMsg);
    await client.tui.showToast({ body: { message: `❌ Error: ${errorMsg}`, variant: "error" } });
    return `Error: ${errorMsg}`;
  } finally {
    cleanup();
    process.off("SIGINT", sigHandler);
    process.off("SIGTERM", sigHandler);
  }
}
