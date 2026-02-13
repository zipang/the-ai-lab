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

## Prerequisites

This project requires **Cargo** and the **Rust toolchain**. 

You can install them via your package manager:
- **Fedora/RHEL/CentOS**: `sudo dnf install cargo`
- **Debian/Ubuntu**: `sudo apt install cargo`
- **MacOS (Homebrew)**: `brew install rust`

Alternatively, use the official **rustup** installer for the latest version:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Installation

To install the `rust-mcp-filesystem` binary, use the provided installation script which compiles the latest version from GitHub:

```bash
./install.sh
```

This script will prompt you for the installation directory (`~/.cargo/bin` or `~/.local/bin`) and verify your environment.

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
