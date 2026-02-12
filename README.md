# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## The Mission

This repository is a laboratory for experimenting with tools, skills, and templates designed to enhance the experience of working with AI Agents (such as OpenCode, Claude Code, etc.). Our goal is to identify, test, and configure the optimal set of tools for specific tasks like coding, web development, research, and daily organization.

## Directory of Recipes

This section tracks all available recipes within the `recipes/` directory. A recipe can contain skills, new agent persona, and specific tools exposed through MCP servers. The instructions to install a recipe are given in each README file at the root of each recipe directory variant.

### 🛠️ Local MCP Servers
Templates and instructions for creating local Model Context Protocol (MCP) servers.
*   **[Bun & TypeScript Template](./recipes/local-mcp-servers/README.md)**: Quick-start template for building local MCP servers with Bun.
*   **[Rust Filesystem MCP](./recipes/local-mcp-servers/README.md)**: A high-performance Rust implementation for filesystem operations.

### 🎙️ Speech-to-Text (STT)
Enables hands-free interaction with AI agents through voice recording and transcription.
*   **[Whisper STT](./recipes/speech-to-text/README.md)**: 100% local, privacy-focused speech-to-text using `whisper.cpp`.

---

## Project Organization

The repository is organized by user workflows and technical capabilities:

*   **`recipes/`**: Contains individual recipes for specific tasks.
*   **`AGENTS.md`**: Detailed instructions and personas for the agents used in this lab.

## Contributing

New recipes should be added to the `recipes/` directory and tracked in this `README.md`. Each recipe should include:
1.  A dedicated folder in `recipes/`.
2.  A `README.md` explaining the implementation, setup, and usage.
3.  Any necessary configuration files or templates.

---
*Created and maintained by the AI Prompt Engineering Expert.*
