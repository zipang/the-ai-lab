import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";
import { dictate, DictateArgs } from "./dictate.ts";

// ============================================================
// WHISPER PLUGIN
// ============================================================

export const WhisperPlugin: Plugin = async ({ client }) => {
  return {
    tool: {
      whisper_dictate: tool({
        description:
          "Record voice from microphone and transcribe it directly into the prompt buffer using local Whisper.cpp",
        args: {
          model: tool.schema
            .string()
            .optional()
            .describe("Whisper model to use (e.g., base, small, medium)"),
          language: tool.schema
            .string()
            .optional()
            .describe("Input language code (e.g., en, fr, auto)"),
        },
        async execute(args: DictateArgs) {
          return await dictate(client, args);
        },
      }),
    },

    async config(config) {
      config.command = {
        ...config.command,
        dictate: {
          description:
            "Use the microphone and speech recognition to dictate the next prompt",
          template:
            "Call the `whisper_dictate` tool and **WAIT** (the next prompt will be appended from the speech to text transcription)",
        },
      };
    },
  };
};
