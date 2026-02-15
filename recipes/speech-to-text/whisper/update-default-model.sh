#!/bin/bash
set -e

# Configuration
RECIPE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$RECIPE_ROOT/.env"

echo "--- Whisper Default Model Updater ---"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: .env file not found at $ENV_FILE. Please run install.sh first."
    exit 1
fi

# Load current configuration
# Using grep/sed to avoid issues with sourcing if there are spaces or other characters
WHISPER_MODELS_PATH=$(grep "^WHISPER_MODELS_PATH=" "$ENV_FILE" | cut -d'=' -f2-)
CURRENT_MODEL=$(grep "^WHISPER_MODEL=" "$ENV_FILE" | cut -d'=' -f2-)

if [ -z "$WHISPER_MODELS_PATH" ] || [ ! -d "$WHISPER_MODELS_PATH" ]; then
    echo "Error: WHISPER_MODELS_PATH not set correctly in .env or directory does not exist."
    echo "Current path: $WHISPER_MODELS_PATH"
    exit 1
fi

echo "Current default model: $CURRENT_MODEL"
echo ""
echo "Available models in $WHISPER_MODELS_PATH:"

# List files and store in an array
IFS=$'\n' GLOBIGNORE='*' command eval 'MODELS=($(ls "$WHISPER_MODELS_PATH"/ggml-*.bin 2>/dev/null))'

if [ ${#MODELS[@]} -eq 0 ]; then
    echo "No models found in $WHISPER_MODELS_PATH. Please download some models first."
    exit 1
fi

for i in "${!MODELS[@]}"; do
    FILENAME=$(basename "${MODELS[$i]}")
    # Strip ggml- and .bin
    MODEL_NAME=$(echo "$FILENAME" | sed 's/^ggml-//' | sed 's/\.bin$//')
    
    if [ "$MODEL_NAME" == "$CURRENT_MODEL" ]; then
        printf "  [%d] %s (current)\n" "$((i+1))" "$MODEL_NAME"
    else
        printf "  [%d] %s\n" "$((i+1))" "$MODEL_NAME"
    fi
done

echo ""
read -p "Select a model number (1-${#MODELS[@]}): " SELECTION

if ! [[ "$SELECTION" =~ ^[0-9]+$ ]] || [ "$SELECTION" -lt 1 ] || [ "$SELECTION" -gt "${#MODELS[@]}" ]; then
    echo "Invalid selection."
    exit 1
fi

SELECTED_FILE=$(basename "${MODELS[$((SELECTION-1))]}")
SELECTED_MODEL=$(echo "$SELECTED_FILE" | sed 's/^ggml-//' | sed 's/\.bin$//')

echo "Setting default model to: $SELECTED_MODEL"

# Update .env file
# We use a temp file to safely replace the line
sed -i "s/^WHISPER_MODEL=.*/WHISPER_MODEL=$SELECTED_MODEL/" "$ENV_FILE"

echo "Successfully updated $ENV_FILE"
