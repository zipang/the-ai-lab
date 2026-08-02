# DOX — recipes/

## Purpose

Holds deployable agent recipes. Each recipe is a self-contained bundle of agents, skills, and commands that can be copied into any project's agent configuration without renaming.

## Ownership

- The lab maintains recipe structure, conventions, and the index in this `AGENTS.md` and `README.md`.
- Each recipe folder owns its own components and README.
- Source-code tool projects (MCP servers, STT) are out of scope here — see `../tools/AGENTS.md`.

## Local Contracts

- One recipe = one directory directly under `recipes/`.
- A recipe may only contain these subdirectories: `agents/`, `skills/`, `commands/` (subset by content).
- Each recipe has a `README.md` at its root stating intent, usage, and a references table of every agent/skill/command it contains.
- `agents/*.md` are pre-named to the deployed agent name (OpenCode uses the filename as the agent name). Direct copy into `.opencode/agents/`, no renames.
- `skills/<name>/SKILL.md` follows one-folder-per-skill auto-discovery. Deployed to `.agents/skills/`.
- `commands/<name>.md` maps one file per command. Deployed to `.opencode/commands/`.
- Every recipe must be tracked in the root `README.md` and in `recipes/README.md`.

## Child DOX Index

None.
