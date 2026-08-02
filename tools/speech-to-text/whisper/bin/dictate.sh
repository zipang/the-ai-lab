#!/bin/bash
set -euo pipefail

# Resolve base dir safely
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load .env safely
if [ -f "$BASE_DIR/.env" ]; then
    set -a
    . "$BASE_DIR/.env" 2>/dev/null || true
    set +a
fi

# Arg parsing: model [input_lang] [output_lang] [--clean-up]
POSITIONAL_ARGS=()
CLEANUP=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --clean-up)
            CLEANUP=true
            shift
            ;;
        -*)
            echo "Unknown option: $1" >&2
            exit 1
            ;;
        *)
            POSITIONAL_ARGS+=("$1")
            shift
            ;;
    esac
done

MODEL="${POSITIONAL_ARGS[0]:-${WHISPER_MODEL:-base}}"
INPUT_LANG="${POSITIONAL_ARGS[1]:-${WHISPER_INPUT:-auto}}"
OUTPUT_LANG="${POSITIONAL_ARGS[2]:-${WHISPER_OUTPUT:-${INPUT_LANG}}}"
VAD_MODEL="${WHISPER_VAD_MODEL:-}"

# Paths & checks first
[[ -f "$WHISPER_CLI" ]] || { echo "whisper-cli not found" >&2; exit 1; }

MODEL_PATH="${WHISPER_MODELS_PATH:-$BASE_DIR/whisper.cpp/models}/ggml-$MODEL.bin"
[[ -f "$MODEL_PATH" ]] || { echo "Model not found: $MODEL_PATH" >&2; exit 1; }

VAD_MODEL_PATH=""
if [[ -n "$VAD_MODEL" ]] && [[ -n "$WHISPER_MODELS_PATH" ]]; then
    VAD_MODEL_PATH="${WHISPER_MODELS_PATH}/ggml-$VAD_MODEL.bin"
    if [[ ! -f "$VAD_MODEL_PATH" ]]; then
        echo "VAD Model not found: $VAD_MODEL_PATH" >&2
        exit 1
    fi
fi

command -v sox >/dev/null || { echo "sox required" >&2; exit 1; }

if [ -t 1 ]; then
    echo "--- Dictate (model=$MODEL, input=$INPUT_LANG, output=$OUTPUT_LANG) ---" >&2
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
AUDIO_FILE="/tmp/dictate_${TIMESTAMP}.wav"

# PIDs init
SOX_PID=0
SUCCESS=false

# Cleanup function
cleanup() {
    [[ $SOX_PID != 0 ]] && { kill $SOX_PID 2>/dev/null || true; wait $SOX_PID 2>/dev/null || true; }
    if [[ "$SUCCESS" == "false" ]]; then
        echo -e "\nInterrupted or error" >&2
    fi
    [[ $CLEANUP == true ]] && rm -f "$AUDIO_FILE"
}
trap cleanup EXIT
trap 'exit 1' ERR SIGINT SIGTERM

AUDIO_DRIVER="${WHISPER_AUDIO_DRIVER:-alsa}"
if [ -t 1 ]; then
    echo "Recording to $AUDIO_FILE.... (Press Q to STOP)" >&2
fi

sox -q -t "$AUDIO_DRIVER" default -c 1 -r 16000 "$AUDIO_FILE" &
SOX_PID=$!
# Wait for "q" key to quit
while true; do
    read -r -n 1 -s KEY
    [[ $KEY == "q" ]] && break
done
kill -SIGTERM $SOX_PID 2>/dev/null || true
wait $SOX_PID || true

if [ -t 1 ]; then
    echo -e "\nStop acknowledged. Transcription in progress..." >&2
fi

[[ -s "$AUDIO_FILE" ]] || { echo "No audio in $AUDIO_FILE" >&2; exit 1; }

# Call transcription script
"$SCRIPT_DIR/transcribe-audio" "$AUDIO_FILE" "$MODEL_PATH" "$INPUT_LANG" "$OUTPUT_LANG" "$VAD_MODEL_PATH"

SUCCESS=true