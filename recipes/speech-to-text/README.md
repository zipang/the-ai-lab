# Recipe: Speech-to-Text (STT)

This recipe enables hands-free interaction with OpenCode by allowing the agent to record and transcribe your voice into text.

## Service Overview

When a variant of this recipe is installed, it adds the following capabilities to your agent:

### Added Commands
- `/listen`: Start voice recording and transcribe input (Batch mode).
- `/dictate`: Start voice dictation with live feedback (Streaming mode).

### Added MCP Services
- `speech-to-text`: Provides tools to transcribe audio files or streams.

## Available Variants

| Variant                               | Implementation            | Key Features               |
|---------------------------------------|---------------------------|----------------------------|
| **[whisper](./whisper/install.md)**   | whisper.cpp               | 100% Local, Not streaming. |
| **[ffmpeg-8](./ffmpeg-8/install.md)** | ffmpeg-8 + whisper filter | 100% Local, streaming.     |

Note: The ffmpeg-8 variant doesn't deliver good transcription at all. It should be considered experimental.

To enable the **Speech To Text** recipe, choose a variant above (whisper or ffmpeg-8) and follow its specific `install.md` instructions.
