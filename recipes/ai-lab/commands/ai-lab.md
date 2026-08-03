---
description: Install, remove, or push an ai-lab recipe in this project
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

## push

`push` sends the local edits of an installed recipe back to the GitHub repository behind `@ai-lab`. It creates a pull request in that repository.

1. Check that `recipes/<name>/` exists in the `@ai-lab` reference. If it does not, list the available recipes under `recipes/` and stop.
2. Read `@ai-lab/recipes/<name>/README.md` and note the recipe's component list in its references table.
3. For every component, confirm that the installed copy exists in this project (`.opencode/agents/<name>.md`, `.agents/skills/<skill>/`, `.opencode/commands/<name>.md`). Stop and report if a component is missing.
4. Clone the reference repository into a temporary directory. Use the remote URL from the `@ai-lab` reference when you can read it. Otherwise use `git@github.com:zipang/the-ai-lab.git`.
5. Copy every installed component into `<temp>/recipes/<name>/` and overwrite the reference files. Keep the recipe layout. Do not add, delete, or change any file the recipe does not own.
6. Show the user a diff summary of every changed file. Confirm the plan before you commit with a `(YES|no)` prompt. `YES` is the default.
7. In the temporary clone, create a feature branch named `ai-lab/<name>-update`. Stage and commit the changes with the `git-commit` skill.
8. Push the branch to the remote. If `gh` is available and authenticated, open a pull request with `gh pr create --fill`. Otherwise report the compare URL `https://github.com/zipang/the-ai-lab/compare/ai-lab/<name>-update?expand=1` so the user can open the pull request manually.
9. Report the files you pushed and the pull request URL (or the compare URL).

## Usage

If `$1` is neither `install`, `remove`, nor `push` (or `$2` is missing), show the usage:

```
/ai-lab install <recipe-name>
/ai-lab remove <recipe-name>
/ai-lab push <recipe-name>
```
