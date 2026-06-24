/**
 * Catalogue of image generation models available through the AIML API.
 *
 * Each model's `id` matches the `model` field expected by
 * {@link https://docs.aimlapi.com/api-references/image-models POST /v1/images/generations}.
 *
 * @see {@link https://docs.aimlapi.com/api-references/image-models|AIML API Image Models reference}
 * @see {@link https://aimlapi.com/models?integration-category=Image+Generation|Full model list on aimlapi.com}
 */

export interface ModelConfig {
  /** Model identifier used in API requests (e.g. "flux/schnell") */
  id: string;
  /** Human-readable display name */
  label: string;
  /** Estimated cost per image in USD (fallback when response lacks cost.usd) */
  costPerImage: number;
  /** Maximum supported resolution (e.g. "2048x2048") */
  maxSize: string;
}

const MODELS: ModelConfig[] = [
  // ── Black Forest Labs (Flux) ────────────────────────────────────
  // @see https://aimlapi.com/models/flux-1-schnell-api
  { id: "flux/schnell", label: "Flux Schnell", costPerImage: 0.004, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-realism-lora-api
  { id: "flux-realism", label: "Flux Realism", costPerImage: 0.030, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-1-dev-api
  { id: "flux/dev", label: "Flux Dev", costPerImage: 0.025, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-1-pro-api
  { id: "flux-pro", label: "Flux 1 Pro", costPerImage: 0.040, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-1-1-pro-api
  { id: "flux-pro/v1.1", label: "Flux 1.1 Pro", costPerImage: 0.040, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-1-1-pro-ultra-api
  { id: "flux-pro/v1.1-ultra", label: "Flux 1.1 Pro Ultra", costPerImage: 0.050, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-2-text-to-image
  { id: "blackforestlabs/flux-2", label: "Flux 2", costPerImage: 0.025, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/flux-2-pro-text-to-image
  { id: "blackforestlabs/flux-2-pro", label: "Flux 2 Pro", costPerImage: 0.039, maxSize: "2048x2048" },

  // ── ByteDance (Seedream) ────────────────────────────────────────
  // @see https://aimlapi.com/models/seedream-3-0
  { id: "bytedance/seedream-3.0", label: "Seedream 3.0", costPerImage: 0.030, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/seedream-4
  { id: "bytedance/seedream-v4-text-to-image", label: "Seedream 4", costPerImage: 0.030, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/seedream-4-5
  { id: "bytedance/seedream-4-5", label: "Seedream 4.5", costPerImage: 0.052, maxSize: "4096x4096" },

  // ── OpenAI ──────────────────────────────────────────────────────
  // @see https://aimlapi.com/models/openai-dall-e-3
  { id: "dall-e-3", label: "DALL-E 3", costPerImage: 0.040, maxSize: "1792x1024" },
  // @see https://aimlapi.com/models/gpt-image-1
  { id: "openai/gpt-image-1", label: "GPT Image 1", costPerImage: 0.025, maxSize: "4096x4096" },
  // @see https://aimlapi.com/models/gpt-image-2
  { id: "openai/gpt-image-2", label: "GPT Image 2", costPerImage: 0.032, maxSize: "4096x2304" },

  // ── Google (Imagen) ─────────────────────────────────────────────
  // @see https://aimlapi.com/models/imagen-3-api
  { id: "imagen-3.0-generate-002", label: "Imagen 3", costPerImage: 0.030, maxSize: "4096x4096" },
  // @see https://aimlapi.com/models/imagen-4-0-generate-001
  { id: "google/imagen-4.0-generate-001", label: "Imagen 4.0", costPerImage: 0.030, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/imagen-4-0-fast-generate-001
  { id: "google/imagen-4.0-fast-generate-001", label: "Imagen 4.0 Fast", costPerImage: 0.020, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/imagen-4-0-ultra-generate-001
  { id: "google/imagen-4.0-ultra-generate-001", label: "Imagen 4.0 Ultra", costPerImage: 0.060, maxSize: "2048x2048" },

  // ── xAI (Grok) ──────────────────────────────────────────────────
  // @see https://aimlapi.com/models/grok-imagine-image
  { id: "x-ai/grok-imagine-image", label: "Grok Imagine", costPerImage: 0.020, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/grok-imagine-image-pro
  { id: "x-ai/grok-imagine-image-pro", label: "Grok Imagine Pro", costPerImage: 0.050, maxSize: "2816x1536" },

  // ── Stability AI ────────────────────────────────────────────────
  // @see https://aimlapi.com/models/stable-diffusion-3-5-large-api
  { id: "stable-diffusion-v35-large", label: "SD 3.5 Large", costPerImage: 0.035, maxSize: "2048x2048" },

  // ── Recraft ─────────────────────────────────────────────────────
  // @see https://aimlapi.com/models/recraft-v3
  { id: "recraft-v3", label: "Recraft v3", costPerImage: 0.040, maxSize: "2048x2048" },

  // ── Alibaba Cloud ───────────────────────────────────────────────
  // @see https://aimlapi.com/models/qwen-image
  { id: "alibaba/qwen-image", label: "Qwen Image", costPerImage: 0.020, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/z-image-turbo
  { id: "alibaba/z-image-turbo", label: "Z-Image Turbo", costPerImage: 0.007, maxSize: "2048x2048" },
  // @see https://aimlapi.com/models/wan-2-2-t2i-plus
  { id: "alibaba/wan2.2-t2i-plus", label: "Wan 2.2 Plus", costPerImage: 0.020, maxSize: "2048x2048" },
];

/** Returns the full list of available models. */
export function getAvailableModels(): ModelConfig[] {
  return MODELS;
}

/**
 * Looks up a model by its API identifier.
 * @param id - Model identifier (e.g. "flux/schnell")
 * @returns The model config, or `undefined` if not found
 */
export function getModelById(id: string): ModelConfig | undefined {
  return MODELS.find((m) => m.id === id);
}
