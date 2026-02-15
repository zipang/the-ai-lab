#!/usr/bin/env bun
import { $ } from "bun";
import { parseArgs } from "node:util";
import path from "node:path";

// 1. Setup paths
const BIN_DIR = import.meta.dir;
const RECIPE_DIR = path.join(BIN_DIR, "..");

// 2. Robust Argument Parsing
const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    model: { type: "string", short: "m", default: process.env.WHISPER_MODEL || "base" },
    lang: { type: "string", short: "l", default: process.env.WHISPER_INPUT || "auto" },
    help: { type: "boolean", short: "h" },
  },
  strict: false,
});

if (values.help) {
  const defaultModel = process.env.WHISPER_MODEL || "base";
  const defaultLang = process.env.WHISPER_INPUT || "auto";
  console.log(`
Usage: dictate [options]

Options:
  -m, --model <name>   Whisper model to use (default: ${defaultModel})
  -l, --lang <lang>    Input language (default: ${defaultLang})
  -h, --help           Show this help message

Example:
  ./bin/dictate.ts --model medium --lang fr
`);
  process.exit(0);
}

const requestedModel = values.model;
const inputLang = values.lang;

const FFMPEG_CUSTOM =
  process.env.FFMPEG_PATH || path.join(RECIPE_DIR, "dist/bin/ffmpeg");
const LIB_PATH = path.join(RECIPE_DIR, "build/lib");
const MODELS_DIR =
  process.env.WHISPER_MODELS_DIR ||
  path.join(RECIPE_DIR, "..", "whisper.cpp", "models");

const modelPath = path.join(MODELS_DIR, `ggml-${requestedModel}.bin`);

if (!(await Bun.file(modelPath).exists())) {
  console.error(`Error: Model not found at ${modelPath}`);
  process.exit(1);
}

// 4. State
let shellPromise = null;
let accumulatedText = "";

console.error(`--- FFmpeg 8 Whisper Dictation ---`);
console.error(`Model: ${requestedModel}`);
console.error(`Lang:  ${inputLang}`);
console.error(`Press SPACE to START/STOP (Ctrl+C to cancel)`);

// 5. Input Handling
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (key) => {
  if (key === "\u0003") {
    // Ctrl+C
    cleanup();
    process.exit(0);
  }

  if (key === " ") {
    if (!shellPromise) {
      startDictation();
    } else {
      stopDictation();
    }
  }
});

async function startDictation() {
  console.error("\n[RECORDING...] (Press SPACE to stop)\n");
  accumulatedText = "";

  const whisperFilter = `whisper=model='${modelPath}':language=${inputLang}:queue=3:destination=pipe\\\\:1:format=text`;

  // We use a shell fallback for capture: pulse || alsa
  const env = {
    ...process.env,
    LD_LIBRARY_PATH: LIB_PATH,
  };

  try {
    // Bun shell ($) handles the pipeline and fallbacks natively
    shellPromise = $`
      (ffmpeg -hide_banner -f pulse -i default -f wav - 2>/dev/null || ffmpeg -hide_banner -f alsa -i default -f wav -) | \
      ${FFMPEG_CUSTOM} -hide_banner -i pipe:0 -af ${whisperFilter} -f null -
    `
      .env(env)
      .quiet();

    // Idiomatic way to read output line-by-line in Bun
    (async () => {
      try {
        for await (const line of shellPromise.lines()) {
          accumulatedText += line + "\n";
          process.stderr.write(line + "\n");
          process.stdout.write(line + "\n");
        }
      } catch (e) {
        // Process killed or stream closed
      }
    })();
  } catch (err) {
    console.error("Failed to start dictation pipeline:", err);
    cleanup();
  }
}

function stopDictation() {
  console.error("\n\n[STOPPED] Processing final bits...");
  if (shellPromise) {
    // Bun's ShellPromise currently doesn't expose a direct .kill() method.
    // We use pkill to terminate all ffmpeg subprocesses spawned by this process.
    // This is a reliable way to stop the recording and transcription pipeline.
    const pid = process.pid;
    $`pkill -P ${pid} ffmpeg`.nothrow().quiet();
    
    setTimeout(() => {
      shellPromise = null;
      console.error("\nDone. Press SPACE to record again.");
    }, 500);
  }
}

function cleanup() {
  if (shellPromise) {
    const pid = process.pid;
    $`pkill -P ${pid} ffmpeg`.nothrow().quiet();
    shellPromise = null;
  }
}
