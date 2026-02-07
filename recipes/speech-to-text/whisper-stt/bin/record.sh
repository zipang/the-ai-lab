#!/bin/bash

# Configuration
OUTPUT_FILE="/tmp/voice_input_$(date +%s).wav"

# Ensure ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed." >&2
    exit 1
fi

# 1. Wait for Start
if [ -t 0 ]; then
    echo "Press ENTER to START recording..." >&2
    read -r
else
    echo "Non-interactive mode: Starting recording in 1 second..." >&2
    sleep 1
fi

# 2. Start ffmpeg in background
# whisper.cpp requires 16000Hz, mono, 16-bit WAV
# We use -f alsa -i default for Linux. 
ffmpeg -y -f alsa -i default -ar 16000 -ac 1 -c:a pcm_s16le "$OUTPUT_FILE" > /dev/null 2>&1 &
FFMPEG_PID=$!

# 3. Wait for Stop
if [ -t 0 ]; then
    echo "Recording... Press ENTER to STOP." >&2
    read -r
else
    DURATION=${1:-10}
    echo "Non-interactive mode: Recording for $DURATION seconds..." >&2
    sleep "$DURATION"
fi

# 4. Stop ffmpeg gracefully (SIGINT)
kill -2 $FFMPEG_PID
wait $FFMPEG_PID 2>/dev/null

# 5. Output the result
if [ -f "$OUTPUT_FILE" ]; then
    echo "$OUTPUT_FILE"
else
    echo "Error: Failed to create recording." >&2
    exit 1
fi
