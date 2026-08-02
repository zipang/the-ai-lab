# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## Project's Goals

This repository is a laboratory for experimenting with tools, skills, and templates designed to enhance the experience of working with AI Agents (such as OpenCode, Claude Code, etc.). Our goal is to identify, test, and configure the optimal set of tools for specific tasks like coding, web development, research, and daily organization.

## Available Recipes

This section tracks all available recipes within the `recipes/` directory. A recipe is a deployable bundle of agents, skills, and commands. Each recipe's README explains its intent, usage, and references every component it contains. The installation instructions for each recipe are given in its own README. See [`recipes/README.md`](./recipes/README.md) for the full index.

### 🧩 Agents & Workflows

*   **[The Marketing Studio](./recipes/the-marketing-studio/README.md)**: Multi-agent pipeline for brand-aligned marketing visuals — Strategist → Art Director → Prompt Engineer.
*   **[The Designer](./recipes/the-designer/README.md)**: Local, autonomous design systems and style guides.
*   **[The Librarian](./recipes/the-librarian/README.md)**: Specialized sub-agent for local documentation indexing and management.
*   **[Git Commit Workflow](./recipes/git-commit/README.md)**: Atomic, conventional commits with mandatory human-in-the-loop confirmation.
*   **[Agent Browser](./recipes/agent-browser/README.md)**: Browser automation CLI for AI agents.

## Available Tools

Source-code tool projects (MCP servers, speech-to-text) live in the `tools/` directory. See [`tools/`](./tools/) for details.

### 🛠️ Local MCP Servers

Templates and instructions for creating local Model Context Protocol (MCP) servers.
*   **[Bun & TypeScript Template](./tools/mcp-servers/bun-template/README.md)**: Quick-start template for building local MCP servers with Bun.
*   **[Rust Filesystem MCP](./tools/mcp-servers/rust-mcp-filesystem/README.md)**: A high-performance Rust implementation for filesystem operations.
*   **[MCP Inspector](./tools/mcp-servers/mcp-inspector/README.md)**: Interactive debugger for testing and exploring MCP servers.
*   **MCP Image Studio** (`tools/mcp-servers/mcp-image-studio/`): Multi-provider AI image generation with cost tracking.

### 🎙️ Speech-to-Text (STT)

Enables hands-free interaction with AI agents through voice recording and transcription.
*   **[Whisper STT](./tools/speech-to-text/whisper/README.md)**: 100% local, privacy-focused speech-to-text using `whisper.cpp`.
*   **[FFmpeg 8 Streaming STT](./tools/speech-to-text/ffmpeg-8/README.md)**: High-performance streaming STT using FFmpeg 8 native whisper filter.

---

## Project Organization

The repository is organized by user workflows and technical capabilities:

*   **`recipes/`**: Deployable recipes — bundles of agents, skills, and commands, each documented in its own README.
*   **`tools/`**: Source-code tool projects used by the lab and by recipes (MCP servers, speech-to-text).
*   **`AGENTS.md`**: Detailed instructions and personas for the agents used in this lab.

## Contributing

New recipes should be added as a directory in `recipes/` and tracked in the root `README.md` and in `recipes/README.md`. Each recipe should include:
1.  A dedicated folder in `recipes/`.
2.  A `README.md` explaining the intent, usage, and a references table of every agent/skill/command it contains.
3.  Its deployable components under `agents/`, `skills/`, and/or `commands/` (ready to copy without renaming).

New source-code tools should be added to `tools/` under the relevant category.

---
*Created and maintained by the AI Prompt Engineering Expert.*
