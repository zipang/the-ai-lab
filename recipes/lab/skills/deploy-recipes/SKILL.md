---
name: deploy-recipes
description: Deploy or remove @the-ai-lab recipes in the current project. Use when asked to test/install/remove a recipe into the current project
---

## Intent

These actions make the whole content of recipes from @the-ai-lab directly available to Opencode in the target project.
To achieve this the skill deploys all the recipe's components into the Opencode configuration of the target project. 

## Actions

Three actions are currently available: `install`, `test`, `remove`.

- `install` copies recipe files from `@the-ai-lab` into the current project.
- `test` symlinks recipe files from `@the-ai-lab` into the project instead of copying them.
- `remove` deletes installed recipe files from the project and reverts configuration changes.

Determine the action and the recipe name from the prompt context or the `$ARGUMENTS` passed by the caller. The first argument is the action verb. The second argument is the recipe name. If the action verb is not one of `install`, `test`, or `remove`, infer the action from the full prompt. For example, "install the agent-browser recipe" maps to the `install` action. If no action matches, show the usage below and stop:

```
USAGE:
  install <recipe-name>
  test <recipe-name>
  remove <recipe-name>
```

**IMPORTANT:** After the `install`, `test`, or `remove` action, the OpenCode configuration changes. Tell the user to restart OpenCode so that the changes take effect.

## Available scripts

The skill ships reusable scripts that perform every file operation. Run them from the root of the target project with `bun`. The scripts do not apply or revert recipe-specific configuration (references in `opencode.json`, instructions files, global binaries). Read the recipe README and apply those extra steps separately.

- **`scripts/list-recipes.ts`** — lists every recipe in the `@the-ai-lab` reference. Use it to discover or verify recipe names.
- **`scripts/deploy-recipe.ts`** — copies (`install`) or symlinks (`test`) every component of a recipe into the project.
- **`scripts/remove-recipe.ts`** — removes the deployed components of a recipe from the project. It requires `--confirm` to delete.

## Use @the-ai-lab reference as the root to discover all recipes

`@the-ai-lab` is a configured project reference (to a Git repository or a local directory).
Find its resolved filesystem path from the references in your system context.

**Special case:** You are **INSIDE** `the-ai-lab` repository. If the current project root name is `the-ai-lab` and it contains a `recipes/` directory, use `@the-ai-lab` as a reference to the current project root.

All recipes live under `@the-ai-lab/recipes/<name>/`.

If the `@the-ai-lab` reference is not configured or is not the current project root, stop and explain how to add it. Tell the user to add these lines to the root `.opencode.json` file:

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

Here is how to map each recipe component to its installation path in the target project:

| Component | Source (in @the-ai-lab)          | Destination                |
| :-------- | :------------------------------- | :------------------------- |
| Agent     | `recipes/<name>/agents/*.md`     | `.opencode/agents/`        |
| Skill     | `recipes/<name>/skills/<skill>/` | `.agents/skills/<skill>/`  |
| Command   | `recipes/<name>/commands/*.md`   | `.opencode/commands/`      |

## Detailed instructions for each action

### `install`

1. Resolve the `@the-ai-lab` root path (see above). If no recipe name was given, run the list script and ask the user to select from the available recipes (multiple choices possible). If a given recipe name does not exist, run the list script and stop.
2. Read the `@the-ai-lab/recipes/<name>/README.md` to get the complete recipe content (list of agents, skills, commands) and the extra configuration steps.
3. Run the deploy script with `--dry-run` to preview the copy, then run it for real:
   ```bash
   bun run .agents/skills/deploy-recipes/scripts/deploy-recipe.ts "<the-ai-lab-root>" "<recipe-name>"
   ```
4. Apply the extra configuration steps that the README requires (for example, adding a reference in `opencode.json`, updating `.opencode/instructions.md`, or installing a global binary). Explain each step before you run it.
5. Report what you installed and what configuration you changed.

### `test`

1. Resolve the `@the-ai-lab` root path (see above). If no recipe name was given, ask the user to select recipes from the available recipes (multiple choices possible). If a given recipe name does not exist, run the list script and stop.
2. Read the `@the-ai-lab/recipes/<name>/README.md` to get the complete recipe content and the extra configuration steps.
3. Run the deploy script with `--symlink` to symlink every component instead of copying it:
   ```bash
   bun run .agents/skills/deploy-recipes/scripts/deploy-recipe.ts "<the-ai-lab-root>" "<recipe-name>" --symlink
   ```
4. Apply the extra configuration steps that the README requires.
5. Report what you symlinked and what configuration you changed.

### `remove`

1. Resolve the `@the-ai-lab` root path (see above). If no recipe name was given, ask the user to select recipes from the available recipes (multiple choices possible). If a given recipe name does not exist, run the list script and stop.
2. Read `@the-ai-lab/recipes/<name>/README.md` to get the exact components and the configuration changes the README specifies.
3. Run the remove script with `--dry-run` to list the exact files you will delete. Confirm the removal plan with the user before you delete anything.
4. Run the remove script with `--confirm` to delete the files (or the symbolic links), then revert the configuration changes the README specifies:
   ```bash
   bun run .agents/skills/deploy-recipes/scripts/remove-recipe.ts "<the-ai-lab-root>" "<recipe-name>" --confirm
   ```
5. Report what you removed and what configuration you reverted.
