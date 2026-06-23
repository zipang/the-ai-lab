import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import { google } from "@ai-sdk/google";
import { fal } from "@ai-sdk/fal";
import type { ModelConfig } from "./types.js";

export const MODEL_REGISTRY: ModelConfig[] = [
  {
    id: "dall-e-3",
    provider: "openai",
    label: "DALL-E 3 (OpenAI)",
    costPerImage: 0.040,
    maxSize: "1792x1024",
    getModel: () => openai.image("dall-e-3"),
  },
  {
    id: "gpt-image-2",
    provider: "openai",
    label: "GPT-Image-2 (OpenAI)",
    costPerImage: 0.032,
    maxSize: "4096x2304",
    getModel: () => openai.image("gpt-image-2"),
  },
  {
    id: "grok-imagine-image",
    provider: "xai",
    label: "Grok Imagine (xAI)",
    costPerImage: 0.020,
    maxSize: "2048x2048",
    getModel: () => xai.image("grok-imagine-image"),
  },
  {
    id: "grok-imagine-image-quality",
    provider: "xai",
    label: "Grok Imagine Quality (xAI)",
    costPerImage: 0.050,
    maxSize: "2048x2048",
    getModel: () => xai.image("grok-imagine-image-quality"),
  },
  {
    id: "imagen-4.0",
    provider: "google",
    label: "Imagen 4.0 (Google)",
    costPerImage: 0.030,
    maxSize: "2048x2048",
    getModel: () => google.image("imagen-4.0-generate-001"),
  },
  {
    id: "flux-pro",
    provider: "fal",
    label: "Flux Pro (Fal.ai)",
    costPerImage: 0.040,
    maxSize: "2048x2048",
    getModel: () => fal.image("fal-ai/flux-pro"),
  },
];

export function getAvailableModels(): ModelConfig[] {
  return MODEL_REGISTRY.filter((m) => {
    switch (m.provider) {
      case "openai": return !!process.env.OPENAI_API_KEY;
      case "xai": return !!process.env.XAI_API_KEY;
      case "google": return !!process.env.GOOGLE_API_KEY;
      case "fal": return !!process.env.FAL_KEY;
      default: return false;
    }
  });
}

export function getModelById(id: string): ModelConfig | undefined {
  return MODEL_REGISTRY.find((m) => m.id === id);
}
