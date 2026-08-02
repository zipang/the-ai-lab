/**
 * MCP Image Studio — MCP server for AI image generation via the AIML API.
 *
 * Exposes three tools (`generate_image`, `list_models`, `get_cost_report`)
 * and one resource (`costs://current`).
 *
 * @see {@link https://docs.aimlapi.com/api-references/image-models|AIML API Image Models}
 * @see {@link https://github.com/modelcontextprotocol/typescript-sdk|MCP TypeScript SDK}
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { getModelById, getAvailableModels, type ModelConfig } from "./models.js";

const AIML_API_BASE = "https://api.aimlapi.com/v1";

// ── Cost tracking ───────────────────────────────────────────────

interface CostEntry {
  timestamp: string;
  model: string;
  prompt: string;
  cost: number;
  imageCount: number;
  size: string;
}

/** Tracks generation costs in-memory and persists them to disk. */
class CostTracker {
  private entries: CostEntry[] = [];
  private totalCost: number = 0;

  addEntry(entry: CostEntry): void {
    this.entries.push(entry);
    this.totalCost += entry.cost;
  }

  getSummary(): { totalCost: number; perModel: Record<string, { count: number; cost: number }> } {
    const perModel: Record<string, { count: number; cost: number }> = {};
    for (const e of this.entries) {
      if (!perModel[e.model]) perModel[e.model] = { count: 0, cost: 0 };
      perModel[e.model].count += e.imageCount;
      perModel[e.model].cost += e.cost;
    }
    return { totalCost: this.totalCost, perModel };
  }

  async persist(filePath: string): Promise<void> {
    const dir = dirname(resolve(filePath));
    await mkdir(dir, { recursive: true });
    const data = {
      generatedAt: new Date().toISOString(),
      totalCost: this.totalCost,
      perModel: this.getSummary().perModel,
      entries: this.entries,
    };
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }
}

// ── Helpers ──────────────────────────────────────────────────────

/** Converts text to a kebab-case slug (first 6 words). */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join("-");
}

/** Builds a unique output filename: `<slug>_v<NNN>.png`. */
function buildFilename(
  prompt: string,
  index: number,
  modelId: string,
  filename?: string,
  version?: number
): string {
  const slug = filename || slugify(prompt);
  const ver = (version ?? 1) + index;
  return `${slug}_v${String(ver).padStart(3, "0")}.png`;
}

// ── Image generation ─────────────────────────────────────────────

/**
 * Generates one or more images via the AIML API.
 *
 * Makes a POST request to {@link https://docs.aimlapi.com/api-references/image-models `/v1/images/generations`}
 * (OpenAI-compatible endpoint). Saves the resulting images as PNG files.
 *
 * When the response includes `cost.usd`, that value is used as the total cost;
 * otherwise it falls back to `model.costPerImage * n`.
 *
 * @param params - Generation parameters
 * @param params.prompt - Text description of the desired image
 * @param params.model - Target model configuration
 * @param params.n - Number of images to generate (1-10)
 * @param params.size - Image resolution string (e.g. "1024x1024")
 * @param params.outputDir - Directory to write output files
 * @param params.filename - Optional filename slug (default: first 6 words of prompt)
 * @param params.version - Optional starting version number (default: 1)
 * @returns Array of results with file paths, per-image costs, and model id
 * @throws {Error} If `AIML_API_KEY` is not set or the API returns an error
 */
export async function generateImage(params: {
  prompt: string;
  model: ModelConfig;
  n: number;
  size: string;
  outputDir: string;
  filename?: string;
  version?: number;
}): Promise<{ imagePath: string; cost: number; model: string }[]> {
  const apiKey = process.env.AIML_API_KEY;
  if (!apiKey) throw new Error("AIML_API_KEY not set");

  const promptPreview = params.prompt.length > 80 ? params.prompt.slice(0, 80) + "..." : params.prompt;
  console.error(`[image-studio] generate: model=${params.model.id}, n=${params.n}, size=${params.size}, prompt="${promptPreview}"`);

  const t0 = performance.now();

  const res = await fetch(`${AIML_API_BASE}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: params.model.id,
      prompt: params.prompt,
      n: params.n,
      response_format: "b64_json",
      size: params.size,
    }),
  });

  const elapsed = ((performance.now() - t0) / 1000).toFixed(2);

  if (!res.ok) {
    const err = await res.text();
    console.error(`[image-studio] error (${elapsed}s): ${res.status} ${err}`);
    throw new Error(`AIML API error ${res.status}: ${err}`);
  }

  const json: any = await res.json();
  // Prefer real cost from API response, fall back to model's static price
  const totalCost = json.cost?.usd ?? params.model.costPerImage * params.n;
  const results: { imagePath: string; cost: number; model: string }[] = [];

  for (let i = 0; i < (json.data?.length ?? 0); i++) {
    const item = json.data[i];
    let buffer: Buffer | null = null;

    if (item.b64_json) {
      buffer = Buffer.from(item.b64_json, "base64");
    } else if (item.url) {
      const imgRes = await fetch(item.url);
      buffer = Buffer.from(await imgRes.arrayBuffer());
    }

    if (!buffer) continue;

    const filename = buildFilename(params.prompt, i, params.model.id, params.filename, params.version);
    const filePath = resolve(params.outputDir, filename);
    await writeFile(filePath, buffer);

    const cost = totalCost / (json.data?.length ?? 1);
    results.push({ imagePath: filePath, cost, model: params.model.id });
  }

  for (const r of results) {
    console.error(`[image-studio] saved: ${r.imagePath} (cost: $${r.cost.toFixed(4)})`);
  }
  console.error(`[image-studio] done (${elapsed}s, ${results.length} image(s), total $${totalCost.toFixed(4)})`);

  return results;
}

// ── MCP server setup ─────────────────────────────────────────────

const costTracker = new CostTracker();
const COST_LOG_PATH = process.env.COST_LOG_PATH ?? "./cost-report.json";

const server = new McpServer({
  name: "mcp-image-studio",
  version: "1.0.0",
});

/**
 * Tool: generate_image
 * Generates images using any model from the catalogue and saves them to disk.
 */
server.tool(
  "generate_image",
  "Generate images using AI models. Saves to output directory.",
  {
    prompt: z.string().min(1).max(4000).describe("Text description of the desired image"),
    model: z
      .string()
      .optional()
      .describe(
        `Model ID. Available: ${getAvailableModels().map((m) => m.id).join(", ")}. Default: cheapest available.`
      ),
    n: z.number().int().min(1).max(10).optional().describe("Number of images (default: 1)"),
    size: z.string().optional().describe("Image size (default: 1024x1024)"),
    quality: z.enum(["standard", "hd"]).optional().describe("Quality (default: standard)"),
    output_dir: z.string().optional().describe("Output directory (default: ./output)"),
    filename: z
      .string()
      .optional()
      .describe("Filename slug (without extension). Default: first 6 words of prompt in kebab-case."),
    version: z
      .number()
      .int()
      .min(1)
      .optional()
      .describe("Starting version number (padded to 3 digits). Default: 1."),
  },
  async ({ prompt, model, n, size, quality, output_dir, filename, version }) => {
    try {
      const modelConfig = model
        ? getModelById(model)
        : getAvailableModels().reduce((a, b) => (a.costPerImage < b.costPerImage ? a : b));

      if (!modelConfig) {
        const available = getAvailableModels().map((m) => m.id).join(", ");
        return { content: [{ type: "text" as const, text: `Model "${model}" not found. Available: ${available}` }] };
      }

      const count = Math.min(n ?? 1, 10);
      const imgSize = size ?? "1024x1024";
      const outDir = output_dir ?? "./output";

      await mkdir(resolve(outDir), { recursive: true });

      const results = await generateImage({
        prompt,
        model: modelConfig,
        n: count,
        size: imgSize,
        outputDir: outDir,
        filename,
        version,
      });

      await costTracker.persist(COST_LOG_PATH);

      const lines = results.map(
        (r) => `Generated: ${r.imagePath} (model: ${r.model}, cost: $${r.cost.toFixed(3)})`
      );
      const total = results.reduce((sum, r) => sum + r.cost, 0);

      costTracker.addEntry({
        timestamp: new Date().toISOString(),
        model: modelConfig.id,
        prompt: prompt.slice(0, 200),
        cost: total,
        imageCount: count,
        size: imgSize,
      });

      return { content: [{ type: "text" as const, text: [...lines, `Total cost: $${total.toFixed(3)}`].join("\n") }] };
    } catch (error) {
      return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }] };
    }
  }
);

/**
 * Tool: list_models
 * Lists all available models with their pricing and max resolution.
 */
server.tool(
  "list_models",
  "List available image generation models with pricing.",
  {},
  async () => {
    const models = getAvailableModels();
    const lines = models.map(
      (m) => `- ${m.id} (${m.label}) — $${m.costPerImage.toFixed(3)}/image, max ${m.maxSize}`
    );
    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  }
);

/**
 * Tool: get_cost_report
 * Returns a cost summary for the current session, broken down by model.
 */
server.tool(
  "get_cost_report",
  "Get the cost summary for the current session.",
  {},
  async () => {
    const report = costTracker.getSummary();
    const perModel = Object.entries(report.perModel)
      .map(([m, d]) => `  ${m}: ${d.count} images, $${d.cost.toFixed(3)}`)
      .join("\n");
    return {
      content: [{ type: "text" as const, text: `Total cost: $${report.totalCost.toFixed(3)}\nPer model:\n${perModel}` }],
    };
  }
);

/**
 * Resource: costs://current
 * Exposes the current session cost report as JSON.
 */
server.resource("current-costs", "costs://current", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: JSON.stringify(costTracker.getSummary(), null, 2),
      mimeType: "application/json",
    },
  ],
}));

// ── Entry point ──────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Image Studio running on stdio (AIML API only)");
  const models = getAvailableModels();
  console.error(`Available models: ${models.map((m) => m.id).join(", ")}`);
}

if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
