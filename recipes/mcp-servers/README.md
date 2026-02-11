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

This template uses the latest `@modelcontextprotocol/sdk` to create a stdio-based server.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Initialize the server
const server = new McpServer({
  name: "my-local-tool",
  version: "1.0.0",
});

// 2. Register a tool
server.tool(
  "calculate_bmi",
  "Calculate Body Mass Index (BMI)",
  {
    weightKg: z.number().describe("Weight in kilograms"),
    heightM: z.number().describe("Height in meters"),
  },
  async ({ weightKg, heightM }) => {
    const bmi = weightKg / (heightM * heightM);
    return {
      content: [{ type: "text", text: `Your BMI is ${bmi.toFixed(2)}` }],
    };
  }
);

// 3. Start the server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Local MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
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
