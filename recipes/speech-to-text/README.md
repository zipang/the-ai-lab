# Recipe: Speech-to-Text (STT)

## Description
This recipe enables hands-free interaction with OpenCode by allowing users to speak their prompts. It is designed for developers who want to reduce typing strain or quickly describe complex tasks using natural voice, while maintaining 100% data privacy through local processing.

## Recipe Elements
- **MCP Server**: `whisper-stt` (Local STT using Whisper.cpp).
- **Recording Skill**: `record.sh` (utilizing `ffmpeg`).
- **OpenCode Integration**: Custom `/listen` command.

## Prerequisites
- `bun`
- `ffmpeg`
- `cmake`, `make`, `gcc`, `g++` (for building whisper.cpp)

## Installation
```bash
cd recipes/speech-to-text/whisper-stt
chmod +x install.sh
./install.sh
```

## Configuration

### 1. Register the MCP Server
Add the following to your `.opencode/config.json`:

```json
{
  "mcpServers": {
    "whisper-stt": {
      "command": "whisper-stt",
      "env": {
        "WHISPER_MODEL": "base"
      }
    }
  }
}
```

*Note: You can change `WHISPER_MODEL` to any model you downloaded (e.g., `small`, `medium`, `tiny.en`).*

### 2. Define the Custom Command
Create a file at `.opencode/commands/listen.md`:

```markdown
---
description: Start voice recording and transcribe input
---
I want to speak my next prompt.
1. Run the interactive recording script `recipes/speech-to-text/whisper-stt/bin/record.sh`.
2. Follow the on-screen prompts (Press ENTER to start/stop).
3. Use the `whisper-stt` MCP server's `transcribe` tool on the resulting audio file.
4. Use the transcribed text as my next prompt.
```

### 3. Add the Recording Skill
Ensure the project has access to a recording tool. This can be a local script registered in the MCP config or a built-in OpenCode plugin.

## Usage Instructions
1. In the OpenCode TUI, type `/listen`.
2. The agent will trigger the recording process.
3. Once transcription is complete, the text will appear in your prompt box or be sent directly as a query.
