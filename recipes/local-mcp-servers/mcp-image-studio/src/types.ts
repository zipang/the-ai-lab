import type { ImageModel } from "ai";

export type ProviderType = "openai" | "xai" | "google" | "fal";

export interface ModelConfig {
  id: string;
  provider: ProviderType;
  label: string;
  costPerImage: number;
  maxSize: string;
  getModel: () => ImageModel;
}

export interface CostEntry {
  timestamp: string;
  model: string;
  prompt: string;
  cost: number;
  imageCount: number;
  size: string;
}

export interface GenerationRequest {
  prompt: string;
  model?: string;
  n?: number;
  size?: string;
  quality?: "standard" | "hd";
}

export interface GenerationResult {
  imagePath: string;
  cost: number;
  model: string;
}
