# Image Processing Recipe

## Setup
1. `chmod +x bin/setup-models bin/enhance-picture`
2. `cd bin && ./setup-models`
3. Download models (e.g. from https://github.com/xinntao/Real-ESRGAN/releases) into `../models`
4. Update `bin/.env` with `MODEL_PATH` (relative path to the model file)

## Usage
`enhance -i /path/to/images -o /path/to/output --scale 4`
