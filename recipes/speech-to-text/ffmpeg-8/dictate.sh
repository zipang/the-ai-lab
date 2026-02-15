#!/bin/bash

# Configuration
RECIPE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$RECIPE_DIR/.env"

if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
else
    FFMPEG_PATH="$RECIPE_DIR/dist/bin/ffmpeg"
    WHISPER_MODELS_DIR="$RECIPE_DIR/../whisper.cpp/models"
    WHISPER_MODEL="base"
    WHISPER_INPUT="auto"
fi

usage() {
    echo "Usage: dictate.sh [options]"
    echo ""
    echo "Options:"
    echo "  -m, --model <name>   Whisper model (e.g., base, large-v3-turbo) (default: $WHISPER_MODEL)"
    echo "  -l, --lang <lang>    Language code (e.g., fr, en, auto) (default: $WHISPER_INPUT)"
    echo "  -q, --queue <secs>   Queue time in seconds (default: 5)"
    echo "  -h, --help           Show help"
    echo ""
    echo "Press Ctrl+C to stop"
}

# Parse arguments
MODEL="$WHISPER_MODEL"
LANG="$WHISPER_INPUT"
QUEUE=5

while [[ $# -gt 0 ]]; do
    case $1 in
        -m|--model) MODEL="$2"; shift 2 ;;
        -l|--lang)  LANG="$2"; shift 2 ;;
        -q|--queue) QUEUE="$2"; shift 2 ;;
        -h|--help)  usage; exit 0 ;;
        *) echo "Unknown option: $1"; usage; exit 1 ;;
    esac
done

MODEL_FILE="$WHISPER_MODELS_DIR/ggml-$MODEL.bin"

# Validations
if [ ! -f "$FFMPEG_PATH" ]; then
    echo "Error: FFmpeg binary not found at $FFMPEG_PATH. Please run ./install.sh first." >&2
    exit 1
fi

if [ ! -f "$MODEL_FILE" ]; then
    echo "Error: Model file not found: $MODEL_FILE" >&2
    echo "Available models in $WHISPER_MODELS_DIR:" >&2
    ls "$WHISPER_MODELS_DIR"/ggml-*.bin | xargs -n1 basename | sed 's/ggml-//; s/\.bin//' >&2
    exit 1
fi

cleanup() {
    echo -e "\nStopping..." >&2
    exit 0
}

trap cleanup INT TERM

echo "Recording and Transcribing... (Ctrl+C to stop)" >&2
echo "Model: $MODEL | Language: $LANG | Queue: ${QUEUE}s" >&2
echo "----------------------------------------" >&2

# Simplified execution
# -loglevel quiet: suppresses all FFmpeg logs and progress bars
# -f pulse -i default: captures directly from microphone
# whisper filter: destination=- sends transcription text directly to stdout
"$FFMPEG_PATH" -hide_banner -loglevel quiet \
    -f pulse -i default -ac 1 \
    -af "whisper=model=$MODEL_FILE:language=$LANG:queue=$QUEUE:destination=-:format=text" \
    -f null -
