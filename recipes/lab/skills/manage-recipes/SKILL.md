---
name: manage-recipes
description: Create or improve recipes in @the-ai-lab. Use when asked to create a new recipe or to improve one with reusable scripts.
---

## Actions

Two actions are currently available: `create` and `improve`.

- `create` makes a new recipe directory inside `@the-ai-lab`.
- `improve` turns the recurrent manual tasks of an existing recipe into reusable scripts.

Determine the action and the recipe name from the prompt context or the `$ARGUMENTS` passed by the caller. The first argument is the action verb. The second argument is the recipe name.

### `create`

1. Check that `recipes/<name>/` does not exist in the `@the-ai-lab` reference. If it does, report the existing recipe and stop.
2. Create the recipe directory `@the-ai-lab/recipes/<name>/`.
3. Create a `README.md` at the recipe root. It states the intent and a references table of every agent, skill, and command in the recipe. Follow the recipe structure rules in `recipes/AGENTS.md`.
4. Create the component subdirectories the recipe needs (`agents/`, `skills/`, `commands/`).
5. For every skill, follow the specifications:
   * [Read Skills Specifications](references/SKILLS_SPEC.md): when creating or updating a skill inside the recipe
   * [Use scripts inside a skill](references/using-scripts.md): when creating a reusable script to automate a recurrent task inside a skill
6. Add the new recipe to the recipes list in the root `README.md`.
7. Report the recipe you created and the files you made.

### `improve`

This action gives an existing recipe efficient, reusable scripts for its recurrent tasks. The goal is that the agent runs a script instead of rebuilding ad-hoc commands in a temporary directory each time.

1. Check that `recipes/<name>/` exists in the `@the-ai-lab` reference. If it does not, run the `list-recipes` script from the `deploy-recipes` skill and stop.
2. Read the recipe `README.md` and every `SKILL.md` in the recipe to understand its tasks.
3. Identify the recurrent, scriptable steps. Prefer mechanical work: file operations, downloads, transformations, validation, or any step the agent would otherwise redo from scratch.
4. For each step, design the script interface: arguments, flags, exit codes, and structured output. Follow the guidance in [Use scripts inside a skill](references/using-scripts.md). Use the scripts of the `deploy-recipes` skill as the template: `#!/usr/bin/env bun`, `--help`, `--dry-run`, `--json`, and meaningful exit codes.
5. Write the script with Bun into the matching `skills/<skill>/scripts/` directory. Follow the directory layout in [Read Skills Specifications](references/SKILLS_SPEC.md).
6. Update the owning `SKILL.md`: add an "Available scripts" section that lists the new script, and replace the manual step with a call to the script.
7. Test the script with `--dry-run` on a sample. Fix any error before you report.
8. Report the scripts you created, the `SKILL.md` files you updated, and how to run each script.
