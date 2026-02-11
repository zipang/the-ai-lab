# LOCAL MCP SERVERS

This recipe provides a template and instructions for creating *local* MCP servers using **Bun** and **TypeScript**. 

Local MCP servers are ideal for keeping private data private and ensuring fast, low-latency interactions with your local tools and filesystem.

## Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- An MCP host (like Opencode, Claude Desktop, or Claude Code).

## Using the Template

We provide a minimal, production-ready template in the `template/` directory that demonstrates all three MCP primitives: **Tools**, **Resources**, and **Prompts**.

### 1. Scaffold your server

Copy the template to your desired project location:

```bash
cp -r recipes/mcp-servers/template ~/my-new-mcp-server
cd ~/my-new-mcp-server
bun install
```

### 2. Implementation details

The core logic is located in `src/index.ts`. You can add your own tools, resources, and prompts following the patterns established in the file.

### 3. Local Configuration

To use your local server with an AI client, add it to your configuration file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "my-local-server": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/my-new-mcp-server/src/index.ts"]
    }
  }
}
```

## Why Bun for Local MCP?

- **Zero Config TypeScript:** No compilation step required; run `.ts` files directly.
- **Fast Startup:** Instantaneous execution, perfect for agentic workflows.
- **Modern Standards:** Built-in support for ESM, top-level await, and web APIs.

## Research & Best Practices

For a deeper dive into architecture, use cases, and best practices, see [research.md](./research.md).
