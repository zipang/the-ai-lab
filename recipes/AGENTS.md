# DOX — recipes/

## Purpose

Holds deployable agent recipes. Each recipe is a self-contained bundle of agents, skills, and commands that can be copied into any project's agent configuration without renaming.

## Ownership

- The lab maintains recipe structure and conventions in this `AGENTS.md`. Recipe tracking and the install process live in the root `README.md`.
- Each recipe folder owns its own components and README.
- Source-code tool projects (MCP servers, STT) are out of scope here — see `../tools/AGENTS.md`.

## Local Contracts

- One recipe = one directory directly under `recipes/`.
- A recipe may only contain these subdirectories: `agents/`, `skills/`, `commands/` (subset by content).
- Each recipe has a `README.md` at its root stating intent, a references table of every agent/skill/command it contains, and recipe-specific usage notes. The generic deploy process lives in the root `README.md` (`## Deploying a Recipe`). Do not repeat deploy commands in recipe READMEs.
- `agents/*.md` are pre-named to the deployed agent name (OpenCode uses the filename as the agent name). Direct copy into `.opencode/agents/`, no renames.
- `skills/<name>/SKILL.md` follows one-folder-per-skill auto-discovery. Deployed to `.agents/skills/`.
- `commands/<name>.md` maps one file per command. Deployed to `.opencode/commands/`.
- A recipe that needs a skill or command owned by another recipe must reference that recipe instead of shipping its own copy.
- Every recipe must be tracked in the root `README.md`.
- The `ai-lab` recipe is the meta-recipe. Its `commands/ai-lab.md` installs, removes, and pushes updates for the other recipes in a target project. Push opens a pull request with the local edits of an installed recipe. It reads the `@ai-lab` reference, so that reference must be configured in the target project first.

## Child DOX Index

None.
