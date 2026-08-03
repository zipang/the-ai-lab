---
description: Install, remove, or push an @ai-lab recipe in this project
---

## Basic usage

Command syntax:
```
/ai-lab <action> <recipe-name>
```
Where the <action> can be one of <install|remove|push>
Extract the action verb from the $arguments ($1)
Extract the recipe name from the $arguments ($2)

If the action verb is not one of the availables actions (`install`, `remove`, nor `push`), try to guess it more  broadby by the whole sentance. If there is no clear matching action simply return the expected formal usage and do nothing :

```
/ai-lab install <recipe-name>
/ai-lab remove <recipe-name>
/ai-lab push <recipe-name>
```

## Use the @ai-lab reference as the root to discover all recipes

`@ai-lab` is a configured project reference (a Git repository or a local directory). 
Find its resolved filesystem path from the references in your system context. 

All recipes live under `@ai-lab/recipes/<name>/`.

If the `@ai-lab` reference is not configured, stop and explain how to add it to the project first then tell the user to reboot opencode:

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

## How to deploy all components from the recipe into the local project

Here is how to map each recipe components to their path in the current project

| Component | Source (in @ai-lab)              | Destination                |
| :-------- | :------------------------------- | :------------------------- |
| Agent     | `recipes/<name>/agents/*.md`     | `.opencode/agents/` |
| Skill     | `recipes/<name>/skills/<skill>/` | `.agents/skills/<skill>/` |
| Command   | `recipes/<name>/commands/*.md`   | `.opencode/commands/` |

## install

1. Check that `recipes/<name>/` exists in the `@ai-lab` reference. If no recipe name was provided, ask the user to select recipes from the available recipes under `recipes/` (multiple choices possible).
2. For each recipe, read the `@ai-lab/recipes/<name>/README.md` to have the complete recipe's content (list of agents, skills, commands).
3. Copy every component from the recipe to its destination above. Overwrite existing files.
4. Apply the extra configuration steps the README requires (for example adding a reference in `opencode.json`, updating `.opencode/instructions.md`, or installing a global binary). Explain each step before you run it.
5. Report what you installed and what configuration you changed.

## remove

1. Check that `recipes/<name>/` exists in the `@ai-lab` reference. If no recipe name was provided, ask the user to select recipes from the available recipes under `recipes/` (multiple choices possible).
2. For each recipe, list the exact files you will delete (`.opencode/agents/<...>.md`, `.agents/skills/<skill>/`, `.opencode/commands/<...>.md`) and the configuration changes the README specifies.
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

