# MCP Inspector: Debugging & Testing Local Servers

The **MCP Inspector** is an interactive developer tool for testing and debugging MCP servers. It provides a React-based web UI to explore tools, resources, and prompts, and a proxy to monitor JSON-RPC traffic.

## Quick Start (Zero-Install)

The easiest way to run the inspector is using `bunx` (or `npx`). 

```bash
# Start the inspector
bunx @modelcontextprotocol/inspector
```

> **Note on Caching:** `bunx` will download the inspector package on the first run and cache it in your local Bun cache (typically `~/.bun/install/cache`). Subsequent runs will be near-instant.

## Inspecting Local Servers

To debug a server you are currently developing in this lab:

### 1. Bun Template
If you are developing a server based on the [Bun template](../bun-template/README.md):

```bash
bunx @modelcontextprotocol/inspector bun run ../bun-template/src/index.ts
```

### 2. Rust Filesystem MCP
If you have built the [Rust Filesystem MCP](../rust-mcp-filesystem/README.md):

```bash
bunx @modelcontextprotocol/inspector ../rust-mcp-filesystem/target/release/mcp-rust-fs /path/to/directory
```

## Inspecting Published Servers

You can also inspect servers directly from npm or PyPI:

```bash
# Inspect the official filesystem server
bunx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-filesystem /Users/username/Desktop
```

## Key Features

- **Tools Tab:** Test individual tools by providing arguments in a generated form.
- **Resources Tab:** Browse and read available resources exposed by the server.
- **Prompts Tab:** Preview prompt templates and their arguments.
- **Notifications:** View real-time logs and JSON-RPC messages (Requests/Responses) between the client and server.

## Troubleshooting

- **Logs to stdout:** If your MCP server prints regular logs to `stdout`, it will break the `stdio` transport used by the Inspector. Ensure all server logging is directed to `stderr`.
- **Environment Variables:** If your server requires environment variables (like API keys), pass them before the command:
  ```bash
  MY_API_KEY=xxx bunx @modelcontextprotocol/inspector ...
  ```
