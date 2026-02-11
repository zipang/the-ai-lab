# LOCAL MCP SERVERS

This recipe is about creating *local* MCP servers in our technology of choice.
Local MCP servers have a lot of advantages vs remote ones: they allow us to keep private data private and are faster by removing remote calls. This is theoretically dependent on the local hardware and resources available.

## Template: Bun + TypeScript

We recommend using **Bun** for local MCP servers because of its speed, built-in TypeScript support, and single-binary execution capability which is ideal for lightweight local tools.

### 1. Quick Start Scaffolding

```bash
mkdir my-local-server
cd my-local-server
bun init -y
bun add @modelcontextprotocol/sdk
```

### 2. Implementation Template (`index.ts`)

This template demonstrates all three MCP primitives: **Tools**, **Resources**, and **Prompts**.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-local-manager",
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
// Expose a virtual file or data stream
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
```

### 3. Local Configuration

To use your local server with a client (like Opencode or Claude Desktop), add it to your configuration:

```json
{
  "mcpServers": {
    "my-local-server": {
      "command": "bun",
      "args": ["run", "/path/to/your/project/index.ts"]
    }
  }
}
```

## Advantages of Bun for Local MCP

- **Zero Config TypeScript:** No need for `tsconfig.json` or `tsc` for simple tools.
- **Fast Startup:** Crucial for CLI-based agents that might restart the server frequently.
- **Single File:** You can often keep a simple tool in a single `index.ts`.
- **Top-level Await:** Supported out of the box.
