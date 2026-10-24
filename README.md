# THE AI LAB : TOOLS, SKILLS, RECIPES FOR AI AGENTS

## Project's Goals

This repository is a laboratory to experiment with tools, skills, and templates, to enhance our experience of working with AI Agents (such as OpenCode, Claude Code, etc.). Our goal is to identify, test, and configure some optimal tools for specific tasks like coding, web development, research, and daily organization.

## What's inside

- **`recipes/`** — deployable bundles of agents, skills, and commands. One directory per recipe, ready to copy into any project without renaming.
- **`tools/`** — source-code tool projects used by the lab and by recipes (MCP servers).
- **`docs/`** — indexed tool documentation, maintained by The Librarian.
- **`AGENTS.md`** — detailed instructions and personas for the agents used in this lab.

## 🧩 Recipes

Each recipe has its own README that states its intent, usage examples, and components.

- **[The Marketing Studio](./recipes/the-marketing-studio/README.md)**: Multi-agent pipeline for brand-aligned marketing visuals.
- **[The Designer](./recipes/the-designer/README.md)**: Local, autonomous design systems and style guides.
- **[The Librarian](./recipes/the-librarian/README.md)**: Specialized sub-agent for local documentation indexing and management.
- **[Git Commit Workflow](./recipes/git-commit/README.md)**: Atomic, conventional commits with mandatory human-in-the-loop confirmation.
- **[Agent Browser](./recipes/agent-browser/README.md)**: Browser automation CLI for AI agents.
- **[Technical Writing](./recipes/technical-writing/README.md)**: Controlled technical English based on ASD-STE100 Simplified Technical English.
- **[Use Bun](./recipes/use-bun/README.md)**: Always-fresh Bun documentation skill that replaces npm, tsc, ESLint, Prettier, Jest, and Vite habits with Bun built-ins.
- **[AI Lab](./recipes/lab/README.md)**: Create, install, test, remove, and improve recipes with the `/lab` command.
- **[Vercel](./recipes/vercel/README.md)**: Vercel platform specialist. Task-oriented skills for the CLI, the AI SDK, and Serverless Functions.

To deploy a recipe into your project you have two main options:

- deploy the recipe manually or tell your agent to follow the instructions : [Deploying a Recipe](#deploying-a-recipe).
- install the /lab command to fully manage your recipes (install, test, remove, create, improve) :

## Deploying a Recipe

Deploy a recipe into a target project. The target project is where the agent, skills, or commands run. Run every deploy command from the root of the target project. The recipe source lives in this lab under `recipes/<name>/`.

The preferred way is the `/lab` command. It works in any project that has the `@the-ai-lab` reference and the `/lab` command installed (see [Install the /lab command](#install-the-lab-command)). The command routes each action to the correct skill. It loads the `deploy-recipes` skill to install, test, or remove a recipe, and the `manage-recipes` skill to create a new one or to improve an existing one. The `deploy-recipes` skill ships reusable scripts that perform every file operation. Use `/lab install <recipe-name>` to deploy, `/lab test <recipe-name>` to symlink for testing, `/lab remove <recipe-name>` to remove a recipe, `/lab create <recipe-name>` to create a new recipe in the lab, and `/lab improve <recipe-name>` to add reusable scripts to a recipe. The methods below describe the underlying mechanics that the command automates.

| Component | Source (this lab)                | Destination (target project) |
| :-------- | :------------------------------- | :--------------------------- |
| Agent     | `recipes/<name>/agents/*.md`     | `.opencode/agents/`          |
| Skill     | `recipes/<name>/skills/<skill>/` | `.agents/skills/<skill>/`    |
| Command   | `recipes/<name>/commands/*.md`   | `.opencode/commands/`        |

The recipe pre-names every file for its destination. A direct copy needs no renaming.

### Method 1: Deploy from the Git repository (recommended)

This method needs no local copy of the lab. OpenCode exposes the lab to the target project as a project reference.

1. Add `the-ai-lab` as a project reference in the target project's `opencode.json`. Create the file if it does not exist.

   ```json
   {
   	"references": {
   		"the-ai-lab": {
   			"repository": "zipang/the-ai-lab",
   			"description": "Use to deploy recipes (agents, skills, and commands) from The AI Lab"
   		}
   	}
   }
   ```

The `description` tells the agent when to use the reference. OpenCode clones the repository into its cache and makes it available as `@the-ai-lab`.
To make `@the-ai-lab` available in every project, add the same reference to the global config at `~/.config/opencode/opencode.json` instead of the project file.

2. At any moment you can now ask your agent to deploy a recipe from the `@the-ai-lab` reference. Example:

   ```
   Install the technical-writing recipe from @the-ai-lab into this project.
   ```

   If the `/lab` command is installed, use `/lab install technical-writing` instead.

### Method 2: Deploy from a local copy of the lab

Use this method when you already have a checkout of the lab on disk.

Example: deploy the `technical-writing` recipe.

```bash
# Run from the root of the target project.
mkdir -p .agents/skills
cp -r <path-to-lab>/recipes/technical-writing/skills/* .agents/skills/
```

## Install the /lab command

Copy and paste this prompt to let your agent install the `/lab` command in your project:

```
Install the /lab command from @the-ai-lab into this project.

1. Add `the-ai-lab` as a reference in `opencode.json`. Create the file if it does not exist.
   Use this configuration:

   {
     "references": {
       "the-ai-lab": {
         "repository": "zipang/the-ai-lab",
         "description": "Use to deploy recipes (agents, skills, and commands) from The AI Lab"
       }
     }
   }

   The `description` is required. It tells the agent when to use the reference
   and gives the agent access to the resolved reference path.

2. Copy the command from `@the-ai-lab/recipes/lab/commands/lab.md` into
   `.opencode/commands/lab.md`. If `@the-ai-lab` is not available yet, fetch the
   file from https://raw.githubusercontent.com/zipang/the-ai-lab/master/recipes/lab/commands/lab.md
   and write it to that path.

3. Copy the skills from `@the-ai-lab/recipes/lab/skills/deploy-recipes/` and
   `@the-ai-lab/recipes/lab/skills/manage-recipes/` into `.agents/skills/`.
   The command routes each action to one of these skills to perform its work.

4. Report how to use the command:
   /lab install <recipe-name>
   /lab test <recipe-name>
   /lab remove <recipe-name>
   /lab create <recipe-name>
   /lab improve <recipe-name>
```

## Install the Use Bun recipe

The `use-bun` skill keeps an always-fresh index of the official Bun
documentation, split into per-domain references that the agent fetches on
demand as Markdown from `bun.com`. A bundled updater script regenerates the
indexes on every Bun release and writes a small "Bun tooling" block into the
project's root `AGENTS.md`, so every session prefers Bun built-ins over npm,
tsc, ESLint, Prettier, Jest, or Vite habits. It supersedes local Bun
documentation mirrors such as the ones maintained by The Librarian.

Copy and paste this prompt to let your agent install it:

```
Install the "Use Bun" recipe from @the-ai-lab into this project. Read the
instructions at https://raw.githubusercontent.com/zipang/the-ai-lab/master/recipes/use-bun/README.md
then:

1. Add `the-ai-lab` as a reference in `opencode.json`. Create the file if it
   does not exist. Use this configuration:

   {
     "references": {
       "the-ai-lab": {
         "repository": "zipang/the-ai-lab",
         "description": "Use to deploy recipes (agents, skills, and commands) from The AI Lab"
       }
     }
   }

2. Copy the skill from `@the-ai-lab/recipes/use-bun/skills/use-bun/` into
   `.agents/skills/`. If `@the-ai-lab` is not available yet, fetch the recipe
   README above for the raw GitHub fallback files.

3. Run `bun .agents/skills/use-bun/scripts/update.ts` from the project root.
   It generates the documentation indexes from bun.com and adds the managed
   "Bun tooling" block to the root `AGENTS.md` (between
   `<!-- the-ai-lab:use-bun:start -->` and `<!-- the-ai-lab:use-bun:end -->`
   markers; it creates `AGENTS.md` when the file does not exist).

4. Apply the formatter configuration from the recipe README's Usage section:
   write the style in `.editorconfig`, keep only the exclusions in the
   `bunfig.toml` `[fmt]` section, set the `format` script in `package.json` to
   `bun fmt`, add the `formatter` block (bun fmt on agent saves) to
   `opencode.json`, and add the optional `.githooks/pre-commit` hook that
   formats staged files with `bun fmt --staged`.

5. Rewrite the existing instructions. The managed "Bun tooling" block is a
   pointer and does not cancel the old rules. Read every `AGENTS.md` and
   `README.md` from the root down, then delete each instruction that names a
   removed formatter or its config file, each manual format step in a
   checklist or a script, and each Bun usage list that repeats the skill
   routing table. Keep the lint commands and the project rules. Fix each
   script that chains the formatter with the linter.

6. Restart OpenCode, then report how to use the skill and how to refresh the
   indexes after each Bun release with the `--check` flag for CI.
```

If the `/lab` command is installed, replace steps 1 and 2 with
`/lab install use-bun`, then run the updater script as in step 3.

## 🛠️ Local MCP Servers

Tools that require a local installation and build step to be installed. See [`tools/`](./tools/) for details.

- **[Bun & TypeScript Template](./tools/mcp-servers/bun-template/README.md)**: Quick-start template for building local MCP servers with Bun.
- **[Rust Filesystem MCP](./tools/mcp-servers/rust-mcp-filesystem/README.md)**: A high-performance Rust implementation for filesystem operations.
- **[MCP Inspector](./tools/mcp-servers/mcp-inspector/README.md)**: Interactive debugger for testing and exploring MCP servers.
- **[Image Studio](`tools/mcp-servers/mcp-image-studio/`)**: Multi-provider AI image generation with cost tracking.
