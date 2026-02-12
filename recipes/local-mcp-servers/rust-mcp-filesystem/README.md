# A local MCP server written in Rust for local file access

Packages infos

```toml
[package]
name = "rust-mcp-filesystem"
version = "0.4.0"
edition = "2024"
repository = "https://github.com/rust-mcp-stack/rust-mcp-filesystem"
authors = ["Ali Hashemi"]
description = "Blazing-fast, asynchronous MCP server for seamless filesystem operations."
homepage = "https://github.com/rust-mcp-stack/rust-mcp-filesystem"
```

Original project README : https://github.com/rust-mcp-stack/rust-mcp-filesystem/blob/main/README.md

## Installation

To install the `rust-mcp-filesystem` binary run the appropriate install command found in the [README](https://github.com/rust-mcp-stack/rust-mcp-filesystem/blob/main/README.md) :

For instance on linux system the command would be (if v0.4.0 is the latest release):

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/rust-mcp-stack/rust-mcp-filesystem/releases/download/v0.4.0/rust-mcp-filesystem-installer.sh | sh
```

Then configure the agent to use this MCP server : 

To enable the MCP to _read and write_ files in the current project insert these lines into the Opencode `config.json` (in the section mcpServers)

```json
{
  "mcpServers": {
    ...
    "filesystem": {
      "command": "rust-mcp-filesystem",
      "args": [ "-w", "/replace/with/path/to/current/project" ]
    }
  }
}
```
