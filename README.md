# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## Project's Goals

This repository is a laboratory for experimenting with tools, skills, and templates designed to enhance the experience of working with AI Agents (such as OpenCode, Claude Code, etc.). Our goal is to identify, test, and configure the optimal set of tools for specific tasks like coding, web development, research, and daily organization.

## Available Recipes

This section tracks all available recipes within the `recipes/` directory. A recipe can contain skills, new agent persona, and specific tools exposed through MCP servers. The instructions to install a recipe are given in each README file at the root of each recipe directory variant.

### 🛠️ Local MCP Servers
Templates and instructions for creating local Model Context Protocol (MCP) servers.
*   **[Bun & TypeScript Template](./recipes/local-mcp-servers/bun-template/README.md)**: Quick-start template for building local MCP servers with Bun.
*   **[Rust Filesystem MCP](./recipes/local-mcp-servers/rust-mcp-filesystem/README.md)**: A high-performance Rust implementation for filesystem operations.
*   **[MCP Inspector](./recipes/local-mcp-servers/mcp-inspector/README.md)**: Interactive debugger for testing and exploring MCP servers.

### 🎙️ Speech-to-Text (STT)
Enables hands-free interaction with AI agents through voice recording and transcription.
*   **[Whisper STT](./recipes/speech-to-text/whisper-stt/README.md)**: 100% local, privacy-focused speech-to-text using `whisper.cpp`.
*   **[FFmpeg 8 Streaming STT](./recipes/speech-to-text/ffmpeg-8/README.md)**: High-performance streaming STT using FFmpeg 8 native whisper filter.

### ⚙️ Developer Experience (DX) & Workflows
Tools and skills to streamline development workflows.
*   **[Git Commit Workflow](./recipes/workflows/git-commit/README.md)**: Atomic, conventional commits with mandatory human-in-the-loop confirmation.
*   **[The Librarian](./recipes/workflows/the-librarian/README.md)**: Specialized sub-agent for local documentation indexing and management.

### 🎨 Image Generation
Professional AI image generation for marketing and storytelling.
*   **[The Marketing Studio](./recipes/workflows/the-marketing-studio/README.md)**: Multi-agent pipeline for brand-aligned marketing visuals — Strategist → Art Director → Prompt Engineer.

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
