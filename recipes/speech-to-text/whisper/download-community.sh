#!/bin/bash
set -e

# Configuration
RECIPE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STT_ROOT="$(dirname "$RECIPE_ROOT")"
WHISPER_CPP_DIR="$STT_ROOT/whisper.cpp"
MODELS_DIR="$WHISPER_CPP_DIR/models"

echo "--- Whisper Community Model Downloader ---"

if [ ! -d "$WHISPER_CPP_DIR" ]; then
    echo "Error: whisper.cpp directory not found. Please run install.sh first."
    exit 1
fi

# Function to search HF
search_hf() {
    local QUERY=$1
    echo "Searching Hugging Face for '$QUERY' (Whisper ASR models)..."
    # Search for whisper models without strict ggml filter, but limit to ASR
    curl -s "https://huggingface.co/api/models?search=$QUERY&pipeline_tag=automatic-speech-recognition&limit=15" | \
    jq -r '.[] | select(.id | contains("whisper")) | "\(.id) (Likes: \(.likes))"'
}

# Function to list files in a repo
list_repo_files() {
    local REPO=$1
    echo "Files in $REPO:"
    curl -s "https://huggingface.co/api/models/$REPO" | \
    jq -r '.siblings[] | .rfilename' | grep ".bin"
}

# Function to download
download_model() {
    local REPO=$1
    local FILENAME=$2
    local TARGET_NAME=$3

    if [ -z "$TARGET_NAME" ]; then
        TARGET_NAME=$(echo "$FILENAME" | sed 's/\//_/g')
    fi

    echo "Downloading $FILENAME from $REPO..."
    URL="https://huggingface.co/$REPO/resolve/main/$FILENAME"
    
    curl -L -o "$MODELS_DIR/$TARGET_NAME" "$URL"
    echo "Done! Model saved to $MODELS_DIR/$TARGET_NAME"
    
    # Update .env if requested
    read -p "Do you want to set this as the default WHISPER_MODEL in .env? (y/n) [n]: " SET_ENV
    if [[ "$SET_ENV" == "y" || "$SET_ENV" == "Y" ]]; then
        # Strip .bin from filename for the env variable if it follows the ggml-*.bin pattern
        MODEL_ENV_VAL=$(echo "$TARGET_NAME" | sed 's/^ggml-//' | sed 's/\.bin$//')
        sed -i "s/^WHISPER_MODEL=.*/WHISPER_MODEL=$MODEL_ENV_VAL/" "$RECIPE_ROOT/.env"
        echo "Updated .env with WHISPER_MODEL=$MODEL_ENV_VAL"
    fi
}

if [ -z "$1" ]; then
    echo "Usage:"
    echo "  $0 search <query>             - Search for models on Hugging Face"
    echo "  $0 list <repo_id>             - List .bin files in a repository"
    echo "  $0 download <repo_id> <file>  - Download a specific model file"
    echo ""
    echo "Example:"
    echo "  $0 download ggerganov/whisper.cpp ggml-large-v3-turbo.bin"
    exit 0
fi

COMMAND=$1
shift

case $COMMAND in
    search)
        search_hf "$1"
        ;;
    list)
        list_repo_files "$1"
        ;;
    download)
        download_model "$1" "$2" "$3"
        ;;
    *)
        echo "Unknown command: $COMMAND"
        exit 1
        ;;
esac
