---
description: Install or remove an ai-lab recipe in this project
---
Manage a recipe from the `@ai-lab` reference in this project.

Subcommand: $1
Recipe name: $2

## Reference path

`@ai-lab` is a configured project reference (a Git repository or a local directory). Find its resolved filesystem path from the references in your system context. All recipe sources live under `recipes/<name>/` inside that reference.

If the `@ai-lab` reference is not configured, stop and explain that the project must add it first:

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

## Deploy mapping (apply in this project)

| Component | Source (in @ai-lab) | Destination (this project) |
| :-------- | :------------------ | :------------------------- |
| Agent     | `recipes/<name>/agents/*.md` | `.opencode/agents/` |
| Skill     | `recipes/<name>/skills/<skill>/` | `.agents/skills/<skill>/` |
| Command   | `recipes/<name>/commands/*.md` | `.opencode/commands/` |

## install

1. Check that `recipes/<name>/` exists in the `@ai-lab` reference. If it does not, list the available recipes under `recipes/` and stop.
2. Read `@ai-lab/recipes/<name>/README.md` for the recipe's intent and extra configuration steps.
3. Copy every component from the recipe to its destination above. Overwrite existing files.
4. Apply the extra configuration steps the README requires (for example adding a reference in `opencode.json`, updating `.opencode/instructions.md`, or installing a global binary). Explain each step before you run it.
5. Report what you installed and what configuration you changed.

## remove

1. Check that `recipes/<name>/` exists in the `@ai-lab` reference so you know which components belong to the recipe.
2. List the exact files you will delete (`.opencode/agents/<...>.md`, `.agents/skills/<skill>/`, `.opencode/commands/<...>.md`) and the configuration changes the README specifies.
3. Confirm the removal plan with the user before deleting anything.
4. Delete the files and revert the configuration changes.
5. Report what you removed and what configuration you reverted.

## Usage

If `$1` is neither `install` nor `remove` (or `$2` is missing), show the usage:

```
/ai-lab install <recipe-name>
/ai-lab remove <recipe-name>
```
