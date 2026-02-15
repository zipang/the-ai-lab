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
    # Ensure "whisper" is part of the query if not already present
    local SEARCH_QUERY="$QUERY"
    if [[ ! "$QUERY" =~ "whisper" ]]; then
        SEARCH_QUERY="whisper $QUERY"
    fi

    echo "Searching Hugging Face for '$SEARCH_QUERY' (Whisper ASR models)..."
    # Search for whisper models, increase limit to 50 to find newer/specific models
    curl -s "https://huggingface.co/api/models?search=$(echo $SEARCH_QUERY | sed 's/ /+/g')&pipeline_tag=automatic-speech-recognition&limit=50" | \
    jq -r '.[] | select(.id | ascii_downcase | contains("whisper")) | "\(.id) (Likes: \(.likes))"'
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
    local SUGGESTED_NAME=$(echo "$FILENAME" | sed 's/^ggml-//' | sed 's/\.bin$//')

    echo "Downloading $FILENAME from $REPO..."
    
    echo "Our system requires models to be named as 'ggml-<name>.bin'"
    read -p "Enter a friendly name for this model [$SUGGESTED_NAME]: " FRIENDLY_NAME
    FRIENDLY_NAME=${FRIENDLY_NAME:-$SUGGESTED_NAME}
    
    local TARGET_NAME="ggml-$FRIENDLY_NAME.bin"

    echo "Saving as $TARGET_NAME..."
    URL="https://huggingface.co/$REPO/resolve/main/$FILENAME"
    
    curl -L -o "$MODELS_DIR/$TARGET_NAME" "$URL"
    echo "Done! Model saved to $MODELS_DIR/$TARGET_NAME"
    
    # Update .env if requested
    read -p "Do you want to set '$FRIENDLY_NAME' as the default WHISPER_MODEL in .env? (y/n) [n]: " SET_ENV
    if [[ "$SET_ENV" == "y" || "$SET_ENV" == "Y" ]]; then
        sed -i "s/^WHISPER_MODEL=.*/WHISPER_MODEL=$FRIENDLY_NAME/" "$RECIPE_ROOT/.env"
        echo "Updated .env with WHISPER_MODEL=$FRIENDLY_NAME"
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
