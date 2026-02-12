# Installing Variant: whisper-stt

This variant implements local Speech-to-Text using [Whisper.cpp](https://github.com/ggerganov/whisper.cpp).

## 1. Technical Setup

Ensure you have the following installed on your system:
- `bun`
- `ffmpeg`
- Build tools (`cmake`, `make`, `gcc`, `g++`)

Then, build the binaries and download the models:

```bash
cd recipes/speech-to-text/whisper-stt
chmod +x install.sh
./install.sh
```

## 2. Agent Configuration

To make the recipe available to the agent, update your configuration files.

### MCP Server Registration
Add the following to your `.opencode/config.json`:

```json
{
  "mcpServers": {
    "whisper-stt": {
      "command": "whisper-stt",
      "env": {
        "WHISPER_MODEL": "base",
        "WHISPER_INPUT": "auto",
        "WHISPER_OUTPUT": "en"
      }
    }
  }
}
```

### Custom Commands
Create these files in your `.opencode/commands/` directory:

**dictate.md**:
```markdown
---
description: Start voice dictation with live feedback (Streaming)
---
I want to dictate my next prompt with live feedback.
1. Run the command `dictate`.
2. Follow the on-screen prompts (Press ENTER to start/stop).
3. Use the final transcribed text as my next prompt.
```

## Usage
- In the TUI, use `/dictate` to activate the speech to text UI.
