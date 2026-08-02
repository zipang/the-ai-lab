# Recipes

Each directory in this folder is a self-contained **recipe**: a deployable bundle of agents, skills, and commands, ready to install into a project without any file renaming. The `README.md` at the root of each recipe explains its intent, usage, and references every component it contains.

## Conventions

Every recipe follows the same internal layout — a subset of these three directories, mirroring the target `.opencode/` / `.agents/` deployment layout exactly:

| Recipe directory | Deploy destination            | Notes |
| :--------------- | :---------------------------- | :---- |
| `agents/`        | `.opencode/agents/`           | OpenCode derives the agent name from the filename — files are pre-named for direct copy |
| `skills/`        | `.agents/skills/`             | One folder per skill, `<name>/SKILL.md`, auto-discovered |
| `commands/`      | `.opencode/commands/`         | One markdown file per command, `<name>.md` |

Deploying a recipe means copying the contents of each directory into its destination — no renaming required.

## Index

| Recipe | Intent | Components |
| :----- | :----- | :--------- |
| [agent-browser](./agent-browser/README.md) | Browser automation CLI for AI agents | 1 skill |
| [git-commit](./git-commit/README.md) | Atomic, conventional, confirmed git commits | 1 skill, 1 command |
| [the-designer](./the-designer/README.md) | Local autonomous design systems & style guides | 1 agent, 1 skill |
| [the-librarian](./the-librarian/README.md) | Local indexing of tools documentation | 1 agent |
| [the-marketing-studio](./the-marketing-studio/README.md) | Multi-agent marketing content pipeline | 4 agents, 5 skills |

Source-code tools (MCP servers, speech-to-text) live outside this folder — see [`../tools/`](../tools/).
