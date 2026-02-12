# A template for local MCP servers with bun

## Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- An MCP host (like Opencode, Claude Desktop, or Claude Code).

## Using the Typescript Template

This directory provides a minimal template to bootstrap a custom MCP server written in Typescript that demonstrates all three MCP primitives: **Tools**, **Resources**, and **Prompts**.

### 1. Scaffold your server

Copy the content of this directory to a new location (ask the user for the location of his choice):

```bash
cp -r recipes/local-mcp-servers/bun-template path/to/my-new-mcp-server
cd path/to/my-new-mcp-server
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
      "args": ["run", "/path/to/my-new-mcp-server/src/index.ts"]
    }
  }
}
```

## Why Bun for Local MCP?

- **Zero Config TypeScript:** No compilation step required; run `.ts` files directly.
- **Fast Startup:** Instantaneous execution, perfect for agentic workflows.
- **Modern Standards:** Built-in support for ESM, top-level await, and web APIs.
