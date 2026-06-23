# MCP Image Studio

A local MCP server for multi-provider AI image generation with cost tracking. Built on the Vercel AI SDK.

Extends the [Marketing Studio](../../workflows/the-marketing-studio/README.md) recipe with actual image generation.

## Supported Providers

| Provider | Env Variable | Get API Key | Models |
|----------|-------------|-------------|--------|
| **OpenAI** | `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | DALL-E 3, GPT-Image-2 |
| **xAI Grok** | `XAI_API_KEY` | [console.x.ai](https://console.x.ai/) | Grok Imagine ($0.02/img) |
| **Google** | `GOOGLE_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Imagen 4.0 |
| **Fal.ai** | `FAL_KEY` | [fal.ai/dashboard](https://fal.ai/dashboard) | Flux Pro, Ideogram, SD |

Set the env vars for the providers you want to use. The server detects which keys are present at startup and registers only those providers.

## Prerequisites

- [Bun](https://bun.sh/) installed
- At least one API key from the table above

## Installation

```bash
# Install dependencies
cd recipes/local-mcp-servers/mcp-image-studio
bun install
```

### Register in OpenCode

Add to your `opencode.json`:

```json
{
  "mcp": {
    "image-studio": {
      "type": "local",
      "command": ["bun", "run", "recipes/local-mcp-servers/mcp-image-studio/src/index.ts"],
      "enabled": true,
      "environment": {
        "OPENAI_API_KEY": "{env:OPENAI_API_KEY}",
        "XAI_API_KEY": "{env:XAI_API_KEY}",
        "GOOGLE_API_KEY": "{env:GOOGLE_API_KEY}",
        "FAL_KEY": "{env:FAL_KEY}"
      }
    }
  }
}
```

Optionally set `COST_LOG_PATH` to control where the cost report is saved (default: `./cost-report.json`).

## Usage

### Tools

| Tool | Description |
|------|-------------|
| `generate_image` | Generate images. Params: prompt, model, n, size, quality, output_dir |
| `list_models` | List available models with pricing |
| `get_cost_report` | Cost summary for the session |

### Example

```
Generate a hero image of a person hiking at golden hour using grok-imagine-image, save to test/hero-a
```

### Extending the Model Registry

Add new models by pushing an entry to `MODEL_REGISTRY` in `src/models.ts`:

```typescript
{
  id: "my-new-model",
  provider: "openai",
  label: "My Model",
  costPerImage: 0.050,
  maxSize: "2048x2048",
  getModel: () => openai.image("my-model"),
},
```

## Cost Tracking

Every generation is logged with timestamp, model, prompt (truncated), cost, count, and size. Get the report at any time with `get_cost_report`, or read the persisted JSON at the path specified by `COST_LOG_PATH`.

## References

This implementation was inspired by the following open-source MCP servers:

| Project | Key Ideas Used |
|---------|----------------|
| [**image-gen-mcp**](https://github.com/thebenlamm/image-gen-mcp) | Multi-provider pattern with auto key detection |
| [**imagine-mcp**](https://github.com/n24q02m/imagine-mcp) | Degraded mode (start with zero credentials) |
| [**gpt-image-mcp**](https://github.com/waimakers/gpt-image) | Built-in cost tracking per generation |
| [**piapi-mcp-server**](https://github.com/apinetwork/piapi-mcp-server) | Midjourney access pattern via third-party API |
