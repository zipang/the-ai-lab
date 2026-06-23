import { generateImage } from "ai";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { getModelById, getAvailableModels } from "./models.js";
import { CostTracker } from "./cost-tracker.js";
import type { GenerationRequest, GenerationResult, ModelConfig } from "./types.js";

export class ImageGenerator {
  private costTracker: CostTracker;

  constructor(costTracker: CostTracker) {
    this.costTracker = costTracker;
  }

  async generate(
    request: GenerationRequest,
    outputDir: string
  ): Promise<GenerationResult[]> {
    const modelConfig = request.model
      ? getModelById(request.model)
      : getAvailableModels()[0];

    if (!modelConfig) {
      throw new Error(
        `Model "${request.model}" not found or provider key missing. Available: ${getAvailableModels().map((m) => m.id).join(", ")}`
      );
    }

    const n = Math.min(request.n ?? 1, 10);
    const size = request.size ?? "1024x1024";
    const cost = modelConfig.costPerImage * n;

    const { images } = await generateImage({
      model: modelConfig.getModel(),
      prompt: request.prompt,
      n,
      size,
    });

    await mkdir(resolve(outputDir), { recursive: true });

    const results: GenerationResult[] = [];

    for (let i = 0; i < images.length; i++) {
      const timestamp = Date.now();
      const filename = `hero_${modelConfig.id}_${timestamp}_${i + 1}.png`;
      const filePath = resolve(outputDir, filename);
      const buffer = Buffer.from(images[i].base64, "base64");
      await writeFile(filePath, buffer);

      results.push({
        imagePath: filePath,
        cost: modelConfig.costPerImage,
        model: modelConfig.id,
      });
    }

    this.costTracker.addEntry({
      timestamp: new Date().toISOString(),
      model: modelConfig.id,
      prompt: request.prompt.slice(0, 200),
      cost,
      imageCount: n,
      size,
    });

    return results;
  }

  listModels(): ModelConfig[] {
    return getAvailableModels();
  }

  getCostReport() {
    return this.costTracker.getSummary();
  }
}
