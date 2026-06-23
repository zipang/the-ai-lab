import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ImageGenerator } from "./providers.js";
import { CostTracker } from "./cost-tracker.js";

const costTracker = new CostTracker();
const generator = new ImageGenerator(costTracker);
const COST_LOG_PATH = process.env.COST_LOG_PATH ?? "./cost-report.json";

const server = new McpServer({
  name: "mcp-image-studio",
  version: "1.0.0",
});

server.tool(
  "generate_image",
  "Generate images using AI models. Saves to output directory.",
  {
    prompt: z.string().min(1).max(4000).describe("Text description of the desired image"),
    model: z
      .string()
      .optional()
      .describe(
        `Model ID. Available: ${generator.listModels().map((m) => m.id).join(", ")}. Default: cheapest available.`
      ),
    n: z.number().int().min(1).max(10).optional().describe("Number of images (default: 1)"),
    size: z.string().optional().describe("Image size (default: 1024x1024)"),
    quality: z.enum(["standard", "hd"]).optional().describe("Quality (default: standard)"),
    output_dir: z.string().optional().describe("Output directory (default: ./output)"),
  },
  async ({ prompt, model, n, size, quality, output_dir }) => {
    try {
      const results = await generator.generate(
        { prompt, model, n, size, quality },
        output_dir ?? "./output"
      );

      await costTracker.persist(COST_LOG_PATH);

      const lines = results.map(
        (r) => `Generated: ${r.imagePath} (model: ${r.model}, cost: $${r.cost.toFixed(3)})`
      );

      const total = results.reduce((sum, r) => sum + r.cost, 0);

      return {
        content: [
          {
            type: "text",
            text: [...lines, `Total cost: $${total.toFixed(3)}`].join("\n"),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "list_models",
  "List available image generation models with pricing.",
  {},
  async () => {
    const models = generator.listModels();
    const lines = models.map(
      (m) => `- ${m.id} (${m.label}) — $${m.costPerImage.toFixed(3)}/image, max ${m.maxSize}`
    );
    return {
      content: [{ type: "text", text: lines.join("\n") }],
    };
  }
);

server.tool(
  "get_cost_report",
  "Get the cost summary for the current session.",
  {},
  async () => {
    const report = generator.getCostReport();
    const perModel = Object.entries(report.perModel)
      .map(([m, d]) => `  ${m}: ${d.count} images, $${d.cost.toFixed(3)}`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `Total cost: $${report.totalCost.toFixed(3)}\nPer model:\n${perModel}`,
        },
      ],
    };
  }
);

server.resource("current-costs", "costs://current", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: JSON.stringify(costTracker.getSummary(), null, 2),
      mimeType: "application/json",
    },
  ],
}));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Image Studio running on stdio");
  console.error(
    `Available models: ${generator.listModels().map((m) => m.id).join(", ") || "none (set API keys in env)"}`
  );
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
