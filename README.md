# THE AI LAB : TOOLS, SKILLS, RECIPES FOR AI AGENTS

## Project's Goals

This repository is a laboratory to experiment with tools, skills, and templates, to enhance our experience of working with AI Agents (such as OpenCode, Claude Code, etc.). Our goal is to identify, test, and configure some optimal tools for specific tasks like coding, web development, research, and daily organization.

## What's inside

*   **`recipes/`** — deployable bundles of agents, skills, and commands. One directory per recipe, ready to copy into any project without renaming.
*   **`tools/`** — source-code tool projects used by the lab and by recipes (MCP servers).
*   **`docs/`** — indexed tool documentation, maintained by The Librarian.
*   **`AGENTS.md`** — detailed instructions and personas for the agents used in this lab.

## How to install

Copy and paste this prompt to let your agent install ai-lab in your project:

```
To install a recipe from ai-lab into your project, follow the instructions at https://github.com/zipang/the-ai-lab/blob/master/README.md#deploying-a-recipe
```

## 🧩 Recipes

Each recipe has its own README that explains its usage and installation.

*   **[The Marketing Studio](./recipes/the-marketing-studio/README.md)**: Multi-agent pipeline for brand-aligned marketing visuals.
*   **[The Designer](./recipes/the-designer/README.md)**: Local, autonomous design systems and style guides.
*   **[The Librarian](./recipes/the-librarian/README.md)**: Specialized sub-agent for local documentation indexing and management.
*   **[Git Commit Workflow](./recipes/git-commit/README.md)**: Atomic, conventional commits with mandatory human-in-the-loop confirmation.
*   **[Agent Browser](./recipes/agent-browser/README.md)**: Browser automation CLI for AI agents.
*   **[Technical Writing](./recipes/technical-writing/README.md)**: Controlled technical English based on ASD-STE100 Simplified Technical English.

Deploy a recipe into your project. See [Deploying a Recipe](#deploying-a-recipe).

## Deploying a Recipe

Deploy a recipe into a target project. The target project is where the agent, skills, or commands run. Run every deploy command from the root of the target project. The recipe source lives in this lab under `recipes/<name>/`.

| Component | Source (this lab) | Destination (target project) |
| :-------- | :---------------- | :--------------------------- |
| Agent | `recipes/<name>/agents/*.md` | `.opencode/agents/` |
| Skill | `recipes/<name>/skills/<skill>/` | `.agents/skills/<skill>/` |
| Command | `recipes/<name>/commands/*.md` | `.opencode/commands/` |

The recipe pre-names every file for its destination. A direct copy needs no renaming.

### Method 1: Deploy from the Git repository (recommended)

This method needs no local copy of the lab. OpenCode exposes the lab to the target project as a project reference.

1. Add `ai-lab` as a project reference in the target project's `opencode.json`. Create the file if it does not exist.

   ```json
   {
     "references": {
       "ai-lab": {
         "repository": "zipang/the-ai-lab",
         "description": "Use to deploy recipes (agents, skills, and commands) from The AI Lab"
       }
     }
   }
   ```

The `description` tells the agent when to use the reference. OpenCode clones the repository into its cache and makes it available as `@ai-lab`.
To make `@ai-lab` available in every project, add the same reference to the global config at `~/.config/opencode/opencode.json` instead of the project file.

2. At any moment you can now ask your agent to deploy a recipe from the `@ai-lab` reference. Example:

   ```
   Install the technical-writing recipe from @ai-lab into this project.
   ```

### Method 2: Deploy from a local copy of the lab

Use this method when you already have a checkout of the lab on disk.

Example: deploy the `technical-writing` recipe.

```bash
# Run from the root of the target project.
mkdir -p .agents/skills
cp -r <path-to-lab>/recipes/technical-writing/skills/* .agents/skills/
```

## 🛠️ Local MCP Servers

Tools that require a local installation and build step to be installed. See [`tools/`](./tools/) for details.

*   **[Bun & TypeScript Template](./tools/mcp-servers/bun-template/README.md)**: Quick-start template for building local MCP servers with Bun.
*   **[Rust Filesystem MCP](./tools/mcp-servers/rust-mcp-filesystem/README.md)**: A high-performance Rust implementation for filesystem operations.
*   **[MCP Inspector](./tools/mcp-servers/mcp-inspector/README.md)**: Interactive debugger for testing and exploring MCP servers.
*   **[Image Studio](`tools/mcp-servers/mcp-image-studio/`)**: Multi-provider AI image generation with cost tracking.
