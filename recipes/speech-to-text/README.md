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

| Variant | Implementation | Key Features |
|---------|----------------|--------------|
| **[whisper-stt](./whisper-stt/install.md)** | whisper.cpp | 100% Local, Privacy-focused, Multi-model support. |

To enable this recipe, choose a variant above and follow its specific `install.md` instructions.
