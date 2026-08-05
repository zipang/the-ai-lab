# DOX — recipes/

## Purpose

Holds deployable agent recipes. Each recipe is a self-contained bundle of agents, skills, and commands that can be deployed into any project's agent configuration.

## Ownership

- The lab maintains recipe structure and conventions in this `AGENTS.md`. Recipe tracking and the install process live in the root `README.md`.
- Each recipe folder owns its own components list and README.

## Local Contracts

- One recipe = one directory directly under `recipes/`.
- A recipe may only contain these subdirectories: `agents/`, `skills/`, `commands/` (subset by content).
- Each recipe has a `README.md` at its root with exactly these sections, in this order:
  1. `# <Recipe Name> (@the-ai-lab/recipes/<name>)` — full name and in-lab path.
  2. A lead paragraph under the title, with no `##` heading — 1 to 4 short sentences that state what the recipe contains and what it is for.
  3. `## Usage` — concrete example prompts or commands as a bullet list.
  4. `## Content` — one table `| Component | Source |`. The Source link text is the component name only (for example, `[git-commit](./skills/git-commit/SKILL.md)`).
  5. `## Dependencies` — optional, present only when the recipe depends on another recipe or a global binary. State the dependency and the install step.
- The generic deploy process lives in the root `README.md` (`## Deploying a Recipe`). Do not repeat deploy commands in recipe READMEs.
- Per-skill purpose, workflow, architecture, and "when the agent loads it" detail live in `SKILL.md`, not in the README.
- `agents/*.md` file names are the deployed agent name (OpenCode uses the filename as the agent name). Direct copy into `.opencode/agents/`, no renames.
- `skills/<name>/SKILL.md` follows one-folder-per-skill auto-discovery. Deployed to `.agents/skills/`.
- `commands/<name>.md` maps one file per command. Deployed to `.opencode/commands/`.
- A recipe that needs a skill or command owned by another recipe must reference that recipe instead of shipping its own copy.
- Every recipe must be tracked in the root `README.md`.
- The `lab` recipe is the meta-recipe. It ships two skills. Its `skills/deploy-recipes/` skill holds the instructions to install, test, and remove the other recipes in a target project, and ships reusable scripts for every file operation. Its `skills/manage-recipes/` skill holds the instructions to create new recipes, to improve existing ones with reusable scripts, and references the official `SKILL.md` format specification. Its `commands/lab.md` command is a thin prompt that routes each action (`install`, `test`, `remove`, `create`, `improve`) to the correct skill. The skills read the `@the-ai-lab` reference, so that reference must be configured in the target project first.

## Child DOX Index

None.
