# Speech-to-Text (STT) Tools

This directory contains tools that enable hands-free interaction with AI agents by allowing the agent to record and transcribe your voice into text.

## Added Commands

When a variant of this tool is installed, it adds the following capabilities to your agent:

- `/listen`: Start voice recording and transcribe input (Batch mode).
- `/dictate`: Start voice dictation with live feedback (Streaming mode).

## Available Variants

| Variant | Implementation            | Key Features               |
|---------|---------------------------|----------------------------|
| **[whisper](./whisper/README.md)**   | whisper.cpp               | 100% Local, not streaming. |
| **[ffmpeg-8](./ffmpeg-8/README.md)** | ffmpeg-8 + whisper filter | 100% Local, streaming.     |

Note: The ffmpeg-8 variant doesn't deliver good transcription at all. It should be considered experimental.

To enable the Speech-To-Text tool, choose a variant above (whisper or ffmpeg-8) and follow its specific `README.md` instructions.
