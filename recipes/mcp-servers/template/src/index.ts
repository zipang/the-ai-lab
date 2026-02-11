import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * Minimal Local MCP Server Template
 * 
 * This server demonstrates the three core primitives:
 * 1. Tools: Actionable functions the LLM can call.
 * 2. Resources: Data the LLM can read as context.
 * 3. Prompts: Templates for specific tasks.
 */

const server = new McpServer({
  name: "local-template-manager",
  version: "1.0.0",
});

// --- 1. TOOLS (Actions) ---
server.tool(
  "calculate_bmi",
  "Calculate Body Mass Index",
  {
    weightKg: z.number().describe("Weight in kg"),
    heightM: z.number().describe("Height in meters"),
  },
  async ({ weightKg, heightM }) => ({
    content: [{ type: "text", text: `BMI: ${(weightKg / (heightM * heightM)).toFixed(2)}` }],
  })
);

// --- 2. RESOURCES (Data) ---
server.resource(
  "project-info",
  "memo://project/readme",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "This is a local project managed by Bun and MCP.",
      mimeType: "text/plain"
    }]
  })
);

// --- 3. PROMPTS (Templates) ---
server.prompt(
  "review-code",
  { language: z.string().describe("The programming language") },
  ({ language }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please review this ${language} code for security best practices and efficiency.`
      }
    }]
  })
);

// --- START SERVER ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Local MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
