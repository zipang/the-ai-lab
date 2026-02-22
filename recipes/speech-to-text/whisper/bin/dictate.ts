#!/usr/bin/env bun
import { createOpencodeClient } from "@opencode-ai/sdk";
import { spawn } from "child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
import fs from "node:fs";
import { $ } from "bun";
import dotenv from "dotenv";

// Load environment variables
const BIN_DIR = import.meta.dir;
const BASE_DIR = join(BIN_DIR, "..");
dotenv.config({ path: join(BASE_DIR, ".env") });

const {
  WHISPER_MODEL = "base",
  WHISPER_CLI,
  WHISPER_MODELS_PATH,
  WHISPER_VAD_MODEL,
  WHISPER_AUDIO_DRIVER = "alsa",
  WHISPER_INPUT = "auto",
  WHISPER_OUTPUT = "auto"
} = process.env;

async function run() {
  const client = createOpencodeClient();
  const tempFile = join(tmpdir(), `dictate-${Date.now()}.wav`);
  let soxProcess: any = null;

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

  process.on("SIGINT", () => { cleanup(); process.exit(0); });
  process.on("SIGTERM", () => { cleanup(); process.exit(0); });
  process.on("exit", cleanup);

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
      console.error("Sox error:", err);
    });

    // 2. Wait for stop key
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
      return;
    }

    // 3. Transcribe
    await client.tui.showToast({ body: { message: "⚙️ Transcribing...", variant: "info" } });

    const modelFile = join(WHISPER_MODELS_PATH || "", `ggml-${WHISPER_MODEL}.bin`);
    const args = ["-m", modelFile, "-f", tempFile, "-nt", "-l", WHISPER_INPUT];

    if (WHISPER_OUTPUT === "en" && WHISPER_INPUT !== "en") {
      args.push("-tr");
    }

    if (WHISPER_VAD_MODEL && fs.existsSync(WHISPER_VAD_MODEL)) {
      args.push("--vad", "-vm", WHISPER_VAD_MODEL);
    }

    // Execute whisper-cli
    const { stdout, stderr, exitCode } = await $`${WHISPER_CLI} ${args}`.quiet().nothrow();

    if (exitCode !== 0) {
      console.error(stderr.toString());
      await client.tui.showToast({ body: { message: "❌ Transcription failed", variant: "error" } });
      return;
    }

    const transcription = stdout.toString()
      .split("\n")
      .filter(line => !line.match(/^(whisper_|system_info|main:|\s*$|\[)/))
      .join(" ")
      .trim();

    if (!transcription) {
      await client.tui.showToast({ body: { message: "😶 No speech detected", variant: "warning" } });
      return;
    }

    // 4. Update TUI
    await client.tui.clearPrompt();
    await client.tui.appendPrompt({ body: { text: transcription } });
    await client.tui.showToast({ body: { message: "✅ Transcription added", variant: "success" } });

  } catch (error: any) {
    console.error(error);
    await client.tui.showToast({ body: { message: `❌ Error: ${error.message}`, variant: "error" } });
  } finally {
    cleanup();
  }
}

run();
