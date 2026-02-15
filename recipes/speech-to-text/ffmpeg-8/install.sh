#!/bin/bash
set -e

# Configuration
RECIPE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STT_DIR="$(dirname "$RECIPE_DIR")"
WHISPER_CPP_DIR="$STT_DIR/whisper.cpp"
FFMPEG_DIR="$RECIPE_DIR/ffmpeg-source"
INSTALL_PREFIX="$RECIPE_DIR/dist"

echo "--- Speech-to-Text: FFmpeg 8 + Whisper Filter Installer ---"

# 0. Cleanup previous installation
echo "Cleaning previous installation..."
rm -rf "$INSTALL_PREFIX" 2>/dev/null || true
mkdir -p "$INSTALL_PREFIX"

# Install build dependencies
echo ""
echo "> Installing build dependencies..."
if [ -f /etc/fedora-release ]; then
    sudo dnf install -y gcc gcc-c++ make cmake git yasm nasm pulseaudio-libs-devel pkg-config || true
elif [ -f /etc/debian_version ]; then
    sudo apt-get update && sudo apt-get install -y gcc g++ make cmake git yasm nasm libpulse-dev pkg-config || true
elif [ -f /etc/arch-release ]; then
    sudo pacman -S --needed gcc make cmake git yasm nasm pulseaudio pkgconf || true
else
    echo "Warning: Could not detect distribution. Please install the following packages manually:"
    echo "  - build-essential (gcc, g++, make)"
    echo "  - cmake, git"
    echo "  - yasm or nasm"
    echo "  - libpulse-dev (pulseaudio-libs-devel on Fedora)"
    echo "  - pkg-config"
    read -p "Press Enter to continue anyway..."
fi

# 1. Ensure whisper.cpp is ready and built as a library
if [ ! -d "$WHISPER_CPP_DIR" ]; then
    echo "Error: whisper.cpp not found in $STT_DIR"
    echo "Attempting to clone whisper.cpp..."
    git clone https://github.com/ggerganov/whisper.cpp "$WHISPER_CPP_DIR"
fi

echo "Building whisper.cpp library..."
cd "$WHISPER_CPP_DIR"
# Build as static library for easier integration
cmake -B build-lib -DBUILD_SHARED_LIBS=OFF -DWHISPER_BUILD_TESTS=OFF -DWHISPER_BUILD_EXAMPLES=OFF
cmake --build build-lib --config Release -j$(nproc 2>/dev/null || echo 4)

# Create a consolidated lib directory for FFmpeg to link against
mkdir -p "$INSTALL_PREFIX/lib"
find "$WHISPER_CPP_DIR/build-lib" -name "lib*.a" -exec cp -d {} "$INSTALL_PREFIX/lib/" \;

# Create a pkg-config for whisper.cpp if it doesn't exist
# This helps FFmpeg's configure script find it
mkdir -p "$INSTALL_PREFIX/lib/pkgconfig"
cat > "$INSTALL_PREFIX/lib/pkgconfig/whisper.pc" <<EOF
prefix=$WHISPER_CPP_DIR
libdir=$INSTALL_PREFIX/lib
includedir=\${prefix}/include
includedir_ggml=\${prefix}/ggml/include

Name: whisper
Description: Whisper.cpp library (static)
Version: 1.7.5
Libs: -L\${libdir} -lwhisper -lggml -lggml-cpu -lggml-base -lstdc++ -lm -lgomp
Cflags: -I\${includedir} -I\${includedir_ggml}
EOF

export PKG_CONFIG_PATH="$INSTALL_PREFIX/lib/pkgconfig:$PKG_CONFIG_PATH"

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

# 2. Model Selection
cd "$WHISPER_CPP_DIR"
echo ""
echo "> Select Whisper models to download (space separated):"
echo "  Model      | Size   | RAM   | Note"
echo "  -----------|--------|-------|-----------------------"
echo "  tiny.en    | 75 MB  | ~400MB| English only, fastest"
echo "  tiny       | 75 MB  | ~400MB| Multilingual"
echo "  base       | 142 MB | ~500MB| Multilingual (Recommended)"
echo "  small      | 466 MB | ~1.0GB| Multilingual"
echo "  medium     | 1.5 GB | ~2.5GB| Multilingual"
echo "  large-v1   | 3.1 GB | ~4.0GB| Multilingual"
echo "  large-v2   | 3.1 GB | ~4.0GB| Multilingual"
echo "  large-v3   | 3.1 GB | ~4.0GB| Multilingual"
echo "  large-v3-turbo | 1.6 GB | ~2GB | Fast & accurate"
echo ""
read -p "Enter models (default: base): " SELECTED_MODELS

if [ -z "$SELECTED_MODELS" ]; then
    SELECTED_MODELS="base"
fi

# Ask for the default model
read -p "Select the default model to use [$(echo $SELECTED_MODELS | awk '{print $1}')]: " DEFAULT_MODEL
DEFAULT_MODEL=${DEFAULT_MODEL:-$(echo $SELECTED_MODELS | awk '{print $1}')}

for MODEL in $SELECTED_MODELS; do
    if [ ! -f "models/ggml-$MODEL.bin" ]; then
        echo "Downloading model: $MODEL..."
        bash ./models/download-ggml-model.sh "$MODEL"
    else
        echo "Model $MODEL already exists."
    fi
done

# 3. Build Optimized FFmpeg 8
if [ ! -d "$FFMPEG_DIR" ]; then
    echo "Cloning FFmpeg 8.x..."
    # Using the latest release branch for FFmpeg 8
    git clone --depth 1 --branch n8.0 https://github.com/FFmpeg/FFmpeg.git "$FFMPEG_DIR"
fi

echo "Cleaning previous FFmpeg source build..."
cd "$FFMPEG_DIR"
make distclean 2>/dev/null || true

# Check for assembly compiler
ASM_FLAGS=""
if ! command -v yasm &> /dev/null && ! command -v nasm &> /dev/null; then
    echo "Warning: yasm/nasm not found. Building without assembly optimizations."
    ASM_FLAGS="--disable-x86asm"
fi

echo "Configuring FFmpeg with whisper filter (minimal build)..."

# Minimal configuration to speed up build and focus on STT
./configure \
    --prefix="$INSTALL_PREFIX" \
    --enable-whisper \
    --extra-cflags="-I$WHISPER_CPP_DIR/include -I$WHISPER_CPP_DIR/ggml/include" \
    --extra-ldflags="-L$INSTALL_PREFIX/lib" \
    $ASM_FLAGS \
    --disable-doc \
    --disable-programs \
    --enable-ffmpeg \
    --enable-libpulse \
    --enable-avdevice \
    --enable-avfilter \
    --disable-filters \
    --enable-filter=whisper \
    --enable-filter=aresample \
    --enable-filter=aformat \
    --enable-encoder=pcm_s16le \
    --enable-encoder=pcm_s16be \
    --enable-encoder=pcm_f32le \
    --enable-encoder=pcm_f32be \
    --disable-decoders \
    --enable-decoder=pcm_s16le \
    --enable-decoder=pcm_s16be \
    --enable-decoder=pcm_f32le \
    --enable-decoder=pcm_f32be \
    --disable-hwaccels \
    --disable-parsers \
    --disable-bsfs \
    --disable-protocols \
    --enable-protocol=file \
    --enable-protocol=pipe \
    --disable-indevs \
    --enable-indev=alsa \
    --enable-indev=pulse \
    --enable-indev=oss \
    --disable-outdevs \
    --disable-demuxers \
    --enable-demuxer=wav \
    --enable-demuxer=pcm_s16le \
    --enable-demuxer=pcm_s16be \
    --enable-demuxer=pcm_f32le \
    --enable-demuxer=pcm_f32be \
    --disable-muxers \
    --enable-muxer=null \
    --enable-muxer=pcm_s16le

# Note: Check if configure succeeded with whisper enabled
if ! grep -q "CONFIG_WHISPER 1" config.h; then
    echo "Error: whisper filter was not enabled in FFmpeg configuration."
    echo "Check if whisper.cpp headers and library are correctly detected."
    exit 1
fi

echo "Building FFmpeg..."
make -j$(nproc 2>/dev/null || echo 4)
make install

echo ""
echo "--- Installation Complete ---"
echo "FFmpeg with Whisper filter built in: $INSTALL_PREFIX/bin/ffmpeg"
echo "Models: $SELECTED_MODELS"
echo "Shared library: $INSTALL_PREFIX/lib"
echo ""
echo "Note: FFmpeg is linked statically against whisper.cpp."
echo "The binary is self-contained and does not require LD_LIBRARY_PATH."

# Export paths for the recipe
cat > "$RECIPE_DIR/.env" <<EOF
FFMPEG_PATH=$INSTALL_PREFIX/bin/ffmpeg
WHISPER_MODELS_DIR=$WHISPER_CPP_DIR/models
WHISPER_INPUT=$WHISPER_INPUT
WHISPER_OUTPUT=$WHISPER_OUTPUT
WHISPER_MODEL=$DEFAULT_MODEL
EOF

echo "Environment configuration written to $RECIPE_DIR/.env"

