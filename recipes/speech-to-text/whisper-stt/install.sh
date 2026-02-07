#!/bin/bash
set -e

# Configuration
REPO_URL="https://github.com/ggerganov/whisper.cpp"
INSTALL_DIR="$(pwd)/whisper.cpp"

echo "--- Speech-to-Text: Whisper.cpp Installer ---"

# Check dependencies
for cmd in git make gcc g++ cmake bun ffmpeg; do
    if ! command -v $cmd &> /dev/null; then
        echo "Error: $cmd is not installed."
        exit 1
    fi
done

# 1. Clone and Build Whisper.cpp
if [ ! -d "$INSTALL_DIR" ]; then
    echo "Cloning whisper.cpp..."
    git clone "$REPO_URL" "$INSTALL_DIR"
    cd "$INSTALL_DIR"
    echo "Building whisper.cpp (this may take a minute)..."
    cmake -B build
    cmake --build build --config Release -j
    # Copy main binary to expected location
    cp build/bin/main ./main
else
    echo "whisper.cpp already exists, skipping clone/build."
    cd "$INSTALL_DIR"
fi

# 2. Ask for models
echo ""
echo "> Select Whisper models to download (space separated):"
echo "  Model      | Size   | RAM   | Note"
echo "  -----------|--------|-------|-----------------------"
echo "  tiny.en    | 75 MB  | ~400MB| English only, fastest"
echo "  tiny       | 75 MB  | ~400MB| Multilingual"
echo "  base.en    | 142 MB | ~500MB| English only"
echo "  base       | 142 MB | ~500MB| Multilingual (Recommended)"
echo "  small.en   | 466 MB | ~1.0GB| English only"
echo "  small      | 466 MB | ~1.0GB| Multilingual"
echo "  medium.en  | 1.5 GB | ~2.5GB| English only"
echo "  medium     | 1.5 GB | ~2.5GB| Multilingual"
echo "  large-v1   | 3.1 GB | ~4.0GB| Multilingual"
echo "  large      | 3.1 GB | ~4.0GB| Multilingual (Best accuracy)"
echo ""
read -p "Enter models (default: base): " SELECTED_MODELS

# If empty, default to base
if [ -z "$SELECTED_MODELS" ]; then
    SELECTED_MODELS="base"
fi

# 3. Download Models
for MODEL in $SELECTED_MODELS; do
    echo "Downloading model: $MODEL..."
    bash ./models/download-ggml-model.sh "$MODEL"
done

# 4. Initialize Bun project
cd "$(dirname "$0")"
echo "Initializing Bun project in $(pwd)..."
bun install

echo "Registering 'whisper-stt' command globally..."
bun link

echo ""
echo "--- Installation Complete ---"
echo "Models downloaded: $LANGUAGES"
echo "Whisper.cpp built in: $INSTALL_DIR"
echo "The 'whisper-stt' command is now available."
