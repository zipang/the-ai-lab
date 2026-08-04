---
description: Install, remove, or push an @the-ai-lab recipe in this project
---

## Basic usage

Command syntax:
```
/lab <action> <recipe-name>
```
Where the `<action>` can be one of `<install|test|remove|push>`
Extract first argument $1 as the action verb
Extract the second argument $2 as the recipe name

If the action verb is not one of the available actions (`install`, `test`, `remove`, nor `push`), guess the action from the whole sentence ($ARGUMENTS). For example, "install the agent-browser recipe" maps to `/lab install agent-browser`. If no action matches clearly, show the formal usage below and stop:

```
**USAGE:**
/lab install <recipe-name>
/lab test <recipe-name>
/lab remove <recipe-name>
/lab push <recipe-name>
```

**IMPORTANT:** After running any of the `install`, `test`, `remove` action, the Opencode configuration will have changed and you must inform the user to restart Opencode to take the modifications into account.

## Use @the-ai-lab reference as the root to discover all recipes

`@the-ai-lab` should be a configured project reference (to a Git repository or a local directory). 
Find its resolved filesystem path from the references in your system context. 

**Special case:** You are **INSIDE** `the-ai-lab` repository. If the current project root name is `the-ai-lab` and it contains a `recipes/` directory then use `@the-ai-lab` as a reference to the current project root.

All recipes live under `@the-ai-lab/recipes/<name>/`.

If the `@the-ai-lab` reference is not configured or is not the current project's root, stop and explain how to add it to the project first by adding these lines to the root `.opencode.json` file:

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

## How to deploy all components from the recipe into the local project

Here is how to map each recipe components to their path in the current project

| Component | Source (in @the-ai-lab)          | Destination                |
| :-------- | :------------------------------- | :------------------------- |
| Agent     | `recipes/<name>/agents/*.md`     | `.opencode/agents/` |
| Skill     | `recipes/<name>/skills/<skill>/` | `.agents/skills/<skill>/` |
| Command   | `recipes/<name>/commands/*.md`   | `.opencode/commands/` |

## Detailed instructions for each action

### `install`

1. Check that `recipes/<name>/` exists in the `@the-ai-lab` reference. If no recipe name was provided, ask the user to select recipes from the available recipes under `recipes/` (multiple choices possible). If a provided recipe name does not exist, list the available recipes under `recipes/` and stop.
2. For each recipe, read the `@the-ai-lab/recipes/<name>/README.md` to have the complete recipe's content (list of agents, skills, commands).
3. Copy every component from the recipe to its destination above. Overwrite existing files.
4. Apply the extra configuration steps the README requires (for example adding a reference in `opencode.json`, updating `.opencode/instructions.md`, or installing a global binary). Explain each step before you run it.
5. Report what you installed and what configuration you changed.

### `test`

This is based on the `install` action but with a slightly different behaviour : instead of *copying* the recipe files, we will instead *symlink* them to their recipe source.

### `remove`

1. Check that `recipes/<name>/` exists in the `@the-ai-lab` reference. If no recipe name was provided, ask the user to select recipes from the available recipes under `@the-ai-lab/recipes/` (multiple choices possible). If a provided recipe name does not exist, list the available recipes under `recipes/` and stop.
2. For each recipe, read `@the-ai-lab/recipes/<name>/README.md`, then list the exact files you will delete (`.opencode/agents/<...>.md`, `.agents/skills/<skill>/`, `.opencode/commands/<...>.md`) and the configuration changes the README specifies.
3. Confirm the removal plan with the user before deleting anything.
4. Delete the files (or the symbolic links) and revert the configuration changes.
5. Report what you removed and what configuration you reverted.

### `push`

`push` sends the local edits of an installed recipe back to the `@the-ai-lab` source. The flow depends on how `@the-ai-lab` is configured.

1. Check that `recipes/<name>/` exists in the `@the-ai-lab` reference. If it does not, list the available recipes under `recipes/` and stop.
2. Determine the reference type from the `@the-ai-lab` configuration: a `repository` entry is a Git repository reference; a local path is a local directory reference.
3. Read `@the-ai-lab/recipes/<name>/README.md` and note the recipe's component list in its references table.
4. For every component, confirm that the installed copy exists in this project (`.opencode/agents/<name>.md`, `.agents/skills/<skill>/`, `.opencode/commands/<name>.md`). Stop and report if a component is missing.

#### Git repository reference

5. Clone the reference repository into a temporary directory. Use the remote URL from the `@the-ai-lab` reference when you can read it. Otherwise use `git@github.com:zipang/the-ai-lab.git`.
6. Copy every installed component into `<temp>/recipes/<name>/` and overwrite the reference files. Keep the recipe layout. Do not add, delete, or change any file the recipe does not own.
7. Show the user a diff summary of every changed file. Confirm the plan before you commit with a `(YES|no)` prompt. `YES` is the default.
8. In the temporary clone, create a feature branch named `lab/<name>-update`. Stage and commit the changes with the `git-commit` skill.
9. Push the branch to the remote. If `gh` is available and authenticated, open a pull request with `gh pr create --fill`. Otherwise report the compare URL `https://github.com/zipang/the-ai-lab/compare/lab/<name>-update?expand=1` so the user can open the pull request manually.
10. Report the files you pushed and the pull request URL (or the compare URL).

#### Local directory reference

5. Copy every installed component back into `<resolved-the-ai-lab-path>/recipes/<name>/` and overwrite the reference files. Keep the recipe layout. Do not add, delete, or change any file the recipe does not own.
6. Show the user a diff summary of every changed file.
7. Ask the user whether to immediately commit and push the changes from the local directory. If the user agrees, commit the changes in that directory with the `git-commit` skill and push them. If the user declines, stop and report the changed files.

