# Whisper Speech to Text

This recipe implements local Speech-to-Text using [Whisper.cpp](https://github.com/ggerganov/whisper.cpp).

## Build

Ensure you have the following installed on your system:
- `bun`
- `ffmpeg`
- Build tools (`cmake`, `make`, `gcc`, `g++`)

Then, build the binaries and download the models:

```bash
cd recipes/speech-to-text/whisper
chmod +x install.sh
./install.sh
```

## Community Models

You can download custom or fine-tuned models from Hugging Face using the `download-community.sh` script:

```bash
# Search for models
./download-community.sh search distil-whisper

# List files in a repository
./download-community.sh list distil-whisper/distil-large-v3-ggml

# Download a model
./download-community.sh download distil-whisper/distil-large-v3-ggml ggml-distil-large-v3.bin
```

## Configuration

You can change the default model used by the recipe by running:

```bash
./update-default-model.sh
```

## Installation

To make the recipe available to the agent, update your configuration files.

### MCP Server Registration
Add the following to your `opencode.json`:

```json
{
  "mcp": {
    "whisper-stt": {
      "type": "local",
      "command": ["whisper-stt"],
      "environment": {
        "WHISPER_MODEL": "base"
      },
      "enabled": true
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
