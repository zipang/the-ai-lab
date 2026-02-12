#!/bin/bash
set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_URL="https://github.com/ggerganov/whisper.cpp"
INSTALL_DIR="$PROJECT_ROOT/whisper.cpp"

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
    echo "Building whisper.cpp (static build for portability)..."
    cmake -B build -DBUILD_SHARED_LIBS=OFF
    cmake --build build --config Release -j
    # Copy recommended binary to root
    cp build/bin/whisper-cli ./whisper-cli
else
    echo "whisper.cpp already exists, skipping clone/build."
    cd "$INSTALL_DIR"
    # Even if it exists, let's ensure it's built statically if it wasn't
    if [ ! -f "./whisper-cli" ] || ldd ./whisper-cli | grep -q "not found"; then
        echo "Rebuilding whisper.cpp for portability..."
        cmake -B build -DBUILD_SHARED_LIBS=OFF
        cmake --build build --config Release -j
        cp build/bin/whisper-cli ./whisper-cli
    fi
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
  echo "  large-v2   | 3.1 GB | ~4.0GB| Multilingual"
  echo "  large-v3   | 3.1 GB | ~4.0GB| Multilingual"
  echo "  large-v3-turbo | 1.6 GB | ~2GB | Fast & accurate"
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

# 4. Configure environment
cd "$PROJECT_ROOT"
ENV_FILE=".env"

echo ""
echo "> Configuring Audio Driver:"
AUDIO_DRIVER="alsa"
if ffmpeg -hide_banner -f alsa -i default -t 1 -f null - 2>/dev/null; then
    echo "  [OK] ALSA detected."
    AUDIO_DRIVER="alsa"
elif ffmpeg -hide_banner -f pulse -i default -t 1 -f null - 2>/dev/null; then
    echo "  [OK] PulseAudio detected."
    AUDIO_DRIVER="pulse"
else
    echo "  [!] Could not auto-detect audio driver. Defaulting to ALSA."
    read -p "  Enter audio driver (alsa/pulse/jack) [alsa]: " USER_DRIVER
    AUDIO_DRIVER=${USER_DRIVER:-alsa}
fi

echo ""
echo "> Configuring Language:"
read -p "  Enter input language (e.g., fr, en, auto) [auto]: " WHISPER_INPUT
WHISPER_INPUT=${WHISPER_INPUT:-auto}

read -p "  Translate to English? (y/n) [n]: " TRANSLATE_YN
if [[ "$TRANSLATE_YN" == "y" || "$TRANSLATE_YN" == "Y" ]]; then
    WHISPER_OUTPUT="en"
else
    WHISPER_OUTPUT="$WHISPER_INPUT"
fi

# Get first model from SELECTED_MODELS as default
DEFAULT_MODEL=$(echo $SELECTED_MODELS | awk '{print $1}')

echo "Writing configuration to $(pwd)/$ENV_FILE..."
cat > "$ENV_FILE" <<EOF
WHISPER_MODEL=$DEFAULT_MODEL
WHISPER_AUDIO_DRIVER=$AUDIO_DRIVER
WHISPER_INPUT=$WHISPER_INPUT
WHISPER_OUTPUT=$WHISPER_OUTPUT
EOF

echo "Initializing Bun project in $(pwd)..."
bun install

echo "Registering 'whisper-stt' command globally..."
bun link

echo ""
echo "--- Installation Complete ---"
echo "Models downloaded: $SELECTED_MODELS"
echo "Whisper.cpp built in: $INSTALL_DIR"
echo "The 'whisper-stt' command is now available."
