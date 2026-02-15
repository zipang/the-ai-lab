# 🎙️ FFmpeg 8 + Whisper Streaming STT

This recipe provides a high-performance, low-latency streaming speech-to-text workflow using FFmpeg 8's native `whisper` filter.

## Features
- **Native FFmpeg Integration**: Uses the `af_whisper` filter for efficient processing.
- **Low Latency**: Streaming architecture with minimal buffering.
- **TUI Integrated**: Live-streams transcription directly into your OpenCode prompt.
- **Privacy Focused**: 100% local processing using `whisper.cpp`.

## Prerequisites
- **FFmpeg**: The installer will build a custom FFmpeg 8.x binary.
- **whisper.cpp**: Shared library build (handled by the installer).
- **Bun**: For running the dictation controller.
- **System FFmpeg**: Used for audio capture (Pulse/ALSA) to fallback if the custom build lacks input drivers.

## Installation

1.  Navigate to the recipe directory:
    ```bash
    cd recipes/speech-to-text/ffmpeg-8
    ```
2.  Run the installer:
    ```bash
    ./install.sh
    ```
    The installer will:
    - Build `whisper.cpp` as a shared library.
    - Download requested models.
    - Build a minimal FFmpeg 8.x with the `whisper` filter enabled.
    - Configure the local environment.

## Usage

1.  In the OpenCode TUI, type:
    ```bash
    /dictate
    ```
2.  Follow the on-screen instructions:
    - **Press SPACE** to start recording.
    - **Press SPACE** again to stop.
3.  The transcription will appear in your prompt buffer as you speak.

## FFmpeg Pipeline Explanation

The dictation mode uses a sophisticated FFmpeg pipeline that captures audio from your microphone and applies the whisper filter for real-time speech-to-text conversion.

### Pipeline Architecture

The command is structured as a Unix pipe chain:

```bash
(ffmpeg -hide_banner -f pulse -i default -f wav - 2>/dev/null || ffmpeg -hide_banner -f alsa -i default -f wav -) | \
${FFMPEG_CUSTOM} -hide_banner -i pipe:0 -af ${whisperFilter} -f null -
```

### Component Breakdown

#### 1. Audio Capture (Input)
**FFmpeg Command:**
```bash
ffmpeg -hide_banner -f pulse -i default -f wav -
```
- `-hide_banner`: Suppresses FFmpeg startup banner for cleaner output
- `-f pulse`: Uses PulseAudio as the input format (Linux audio system)
- `-i default`: Selects the default audio input device (microphone)
- `-f wav`: Converts audio to WAV format for proper streaming
- `-`: Output to stdout (pipe to next command)

**Fallback Mechanism:**
The pipeline includes a fallback to ALSA if PulseAudio fails:
```bash
ffmpeg -hide_banner -f alsa -i default -f wav -
```
This ensures compatibility across different Linux audio systems.

#### 2. Whisper Filter Processing
**FFmpeg Command:**
```bash
${FFMPEG_CUSTOM} -hide_banner -i pipe:0 -af ${whisperFilter} -f null -
```

**Whisper Filter Configuration:**
```bash
whisper=model='${modelPath}':language=${inputLang}:queue=3:destination=pipe\\:1:format=text
```

Filter parameters:
- `model='${modelPath}'`: Specifies the Whisper model (e.g., ggml-base.bin)
- `language=${inputLang}`: Sets the input language (auto or specified)
- `queue=3`: Uses a 3-sample queue for continuous processing
- `destination=pipe:\\1`: Outputs to stdout for real-time streaming
- `format=text`: Returns text output (default is JSON)

#### 3. Output Stream
**Final Output:**
- `-f null -`: Discards the audio output (we only care about the text transcription)
- Transcription is streamed line-by-line through stdout

### Technical Details

#### Real-Time Processing
- **Low Latency**: The `queue=3` parameter balances accuracy with real-time performance
- **Streaming Architecture**: Uses Unix pipes for continuous audio flow without buffering delays
- **Line-by-Line Output**: Each transcription line is output as soon as it's generated

#### Error Handling
- **Silent Failures**: `2>/dev/null` hides PulseAudio errors to prevent noise in transcription output
- **Fallback Logic**: Automatic switch to ALSA if PulseAudio is unavailable
- **Process Management**: Uses `pkill` to gracefully terminate FFmpeg subprocesses

#### Environment Configuration
- **Custom FFmpeg**: Uses a compiled FFmpeg with the whisper filter enabled
- **Library Path**: Properly configured `LD_LIBRARY_PATH` for whisper.cpp integration
- **Model Path**: Dynamically selected based on user configuration

### Performance Considerations

1. **Model Selection**: Smaller models (base, tiny) provide lower latency but reduced accuracy
2. **Audio Quality**: WAV format ensures compatibility and quality for speech recognition
3. **Queue Size**: The 3-sample queue provides optimal balance between responsiveness and accuracy
4. **Resource Usage**: The pipeline is optimized for CPU efficiency with minimal memory overhead

This pipeline architecture provides a robust, real-time speech-to-text solution that leverages FFmpeg's native whisper integration for optimal performance and compatibility.

## Direct FFmpeg Usage

You can test the FFmpeg pipeline directly from your terminal to verify it works before using the dictation mode.

### Basic Command

```bash
# Use your custom FFmpeg binary with the whisper filter
LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -hide_banner \
  -f pulse -i default -f wav - 2>/dev/null | \
  LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -hide_banner \
  -i pipe:0 \
  -af "whisper=model='ggml-base.bin':language=auto:queue=3:destination=pipe\\\\:1:format=text" \
  -f null -
```

### Different Models and Languages

```bash
# Using larger model for better accuracy
LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -hide_banner \
  -f pulse -i default -f wav - 2>/dev/null | \
  LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -hide_banner \
  -i pipe:0 \
  -af "whisper=model='ggml-medium.bin':language=auto:queue=3:destination=pipe\\\\:1:format=text" \
  -f null -

# French language
LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -hide_banner \
  -f pulse -i default -f wav - 2>/dev/null | \
  LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -hide_banner \
  -i pipe:0 \
  -af "whisper=model='ggml-base.bin':language=fr:queue=3:destination=pipe\\\\:1:format=text" \
  -f null -
```

### Key Points

- **Ctrl+C**: Press `Ctrl+C` to stop the recording and exit the command
- **LD_LIBRARY_PATH**: Required for the custom FFmpeg to find the whisper library
- **Model Path**: Replace `ggml-base.bin` with your preferred model (e.g., `ggml-medium.bin`, `ggml-large-v3.bin`)
- **Error Handling**: The `2>/dev/null` silences PulseAudio errors
- **Fallback**: If PulseAudio fails, try replacing `-f pulse` with `-f alsa`

### Testing Individual Components

```bash
# Test audio capture only
ffmpeg -f pulse -i default -f wav -t 5 test.wav

# Test whisper filter with audio file
LD_LIBRARY_PATH=build/lib ./dist/bin/ffmpeg \
  -i test.wav \
  -af "whisper=model='ggml-base.bin':language=auto:queue=3:destination=pipe\\\\:1:format=text" \
  -f null -
```

## Troubleshooting
- **No audio captured**: Ensure your system's `ffmpeg` can record audio (try `ffmpeg -f pulse -i default -t 1 test.wav`).
- **Library not found**: If you see `libwhisper.so` errors, ensure `LD_LIBRARY_PATH` includes the `build/lib` directory.
