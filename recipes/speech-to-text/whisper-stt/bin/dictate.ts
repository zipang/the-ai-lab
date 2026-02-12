#!/usr/bin/env bun
import { spawn } from "child_process";
import path from "node:path";
import fs from "node:fs";

// 1. Setup paths
const REAL_PATH = fs.realpathSync(process.argv[1]);
const BASE_DIR = path.join(path.dirname(REAL_PATH), "..");
const DOTENV_PATH = path.join(BASE_DIR, ".env");

// 2. Load .env
if (fs.existsSync(DOTENV_PATH)) {
  const envContent = fs.readFileSync(DOTENV_PATH, "utf-8");
  envContent.split("\n").forEach(line => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  });
}

// 3. Get Config
const requestedModel = process.argv[2] || process.env.WHISPER_MODEL || "base";
const inputLang = process.argv[3] || process.env.WHISPER_INPUT || "auto";
const driver = process.env.WHISPER_AUDIO_DRIVER || "alsa";
const modelPath = path.join(BASE_DIR, "whisper.cpp", "models", `ggml-${requestedModel}.bin`);

if (!fs.existsSync(modelPath)) {
  console.error(`Error: Model not found at ${modelPath}`);
  process.exit(1);
}

// 4. Interactive State
let ffmpegProcess = null;
let accumulatedText = "";

console.error(`--- Dictate Mode (FFmpeg Whisper Filter) ---`);
console.error(`Model: ${requestedModel}`);
console.error(`Audio: ${driver}`);
console.error(`Lang:  ${inputLang}`);

// Check for whisper filter
// const check = spawn("ffmpeg", ["-filters"]);
// let filtersOutput = "";
// check.stdout.on("data", (d) => filtersOutput += d.toString());
// check.on("close", () => {
//   if (!filtersOutput.includes(" whisper ")) {
//     console.error(`\n[ERROR] Your FFmpeg version does not support the 'whisper' filter.`);
//     console.error(`Please ensure you are using FFmpeg 8+ with whisper support enabled.`);
//     process.exit(1);
//   }
//   console.error(`\nPress ENTER to START/STOP dictation (Ctrl+C to cancel)`);
// });

// 5. Handle Terminal Input
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (key) => {
  if (key === "\u0003") { // Ctrl+C
    cleanup();
    process.exit(0);
  }
  
  if (key === "\r" || key === "\n") {
    if (!ffmpegProcess) {
      startDictation();
    } else {
      stopDictation();
    }
  }
});

function startDictation() {
  console.error("\n[RECORDING...] (Press ENTER to stop)\n");
  
  // Note: destination=pipe\\:1 tells ffmpeg to output to stdout
  const whisperFilter = `whisper=model=${modelPath}:language=${inputLang}:queue=3:destination=pipe\\\\:1:format=text`;
  
  const args = [
    "-hide_banner",
    "-f", driver,
    "-i", "default",
    "-af", whisperFilter,
    "-f", "null", "-",
    "-loglevel", "info" // Filter output is often sent to info/stderr
  ];

  // We spawn with shell: true to handle the complex filter escaping if needed, 
  // but here we'll try direct spawn first.
  ffmpegProcess = spawn("ffmpeg", args);

  // The whisper filter outputs the text to the 'destination'
  // If destination is pipe:1, it comes through stdout.
  ffmpegProcess.stdout.on("data", (data) => {
    const text = data.toString();
    accumulatedText += text;
    // Live feedback to stderr so it doesn't pollute the final stdout result
    process.stderr.write(text);
  });

  // FFmpeg also logs the transcription to stderr if destination is not set,
  // or sometimes logs metadata there.
  ffmpegProcess.stderr.on("data", (data) => {
    const msg = data.toString();
    // Some versions of the filter might output text to stderr as [info]
    if (msg.includes("whisper: ")) {
       // Extract text if needed, though destination=pipe:1 should handle it
    }
  });

  ffmpegProcess.on("error", (err) => {
    console.error("\nFailed to start FFmpeg:", err.message);
    process.exit(1);
  });
}

function stopDictation() {
  if (ffmpegProcess) {
    console.error("\n\n[STOPPED] Finalizing...");
    ffmpegProcess.kill("SIGINT");
    
    // We wait a bit for the process to exit and flush
    setTimeout(() => {
      console.error("\nFinal Transcript:");
      console.error("-----------------");
      // Output final concatenated text to stdout
      process.stdout.write(accumulatedText.trim() + "\n");
      process.exit(0);
    }, 500);
  }
}

function cleanup() {
  if (ffmpegProcess) {
    ffmpegProcess.kill("SIGKILL");
  }
}
