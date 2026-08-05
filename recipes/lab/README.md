# AI Lab

## Intent

The `lab` recipe is the meta-recipe of `@the-ai-lab`. It is a set of skills that manage the full lifecycle of the other recipes: create, deploy, test, and remove.

The `/lab` command is the entry point. It reads the action from the prompt and routes it to the correct skill. The command does not contain the management logic itself.

## Skills

The recipe ships two skills:

- [`deploy-recipes`](./skills/deploy-recipes/SKILL.md) deploys recipes into the current project. It supports `install` (copy), `test` (symlink), and `remove` (delete and revert configuration changes). It ships reusable scripts for every file operation.
- [`manage-recipes`](./skills/manage-recipes/SKILL.md) creates and improves recipes in `@the-ai-lab`. It holds the official `SKILL.md` format specification and the guide for using scripts inside a skill.

Other agents can load either skill directly to manage recipes without the `/lab` command.

## Command usage

The `/lab` command supports five subcommands:

| Command | Action | Skill |
| :------ | :----- | :---- |
| `/lab install <recipe-name>` | Copy a recipe into the project | `deploy-recipes` |
| `/lab test <recipe-name>` | Symlink a recipe into the project instead of copying it | `deploy-recipes` |
| `/lab remove <recipe-name>` | Remove a recipe from the project and revert configuration changes | `deploy-recipes` |
| `/lab create <recipe-name>` | Create a new recipe in `@the-ai-lab` | `manage-recipes` |
| `/lab improve <recipe-name>` | Add reusable scripts for the recurrent tasks of a recipe | `manage-recipes` |

## Installation (OpenCode instructions)

### 1. Install @the-ai-lab as an external reference

Add `@the-ai-lab` as a project reference in the target project's `opencode.json`. Create the file if it does not exist, then insert the `the-ai-lab` key in the references block:

```json
{
  "references": {
    "the-ai-lab": {
      "repository": "zipang/the-ai-lab",
      "description": "Deploy and manage recipes (agents, skills, and commands) from The AI Lab into your project"
    }
  }
}
```

### 2. Deploy the command

Ask the agent to copy the command from the reference:

```
Copy the command from @the-ai-lab/recipes/lab/commands/lab.md into .opencode/commands/lab.md
```

### 3. Deploy the skills

Ask the agent to copy both skills from the reference:

```
Copy the skills from @the-ai-lab/recipes/lab/skills/deploy-recipes/ and @the-ai-lab/recipes/lab/skills/manage-recipes/ into .agents/skills/
```

The command now works in this project.

### 4. Use the command

```
/lab install <recipe-name>
/lab test <recipe-name>
/lab remove <recipe-name>
/lab create <recipe-name>
/lab improve <recipe-name>
```

## Usage

The command routes each action to the correct skill. The `deploy-recipes` skill uses the `@the-ai-lab` reference to find the recipe root directory `@the-ai-lab/recipes/<recipe-name>/`. It then reads the recipe README to get the complete recipe content (agents, skills, commands) and runs one of its scripts to perform the requested action: install the recipe in the current project, test it with symlinks, or remove it from the current project.

The `manage-recipes` skill creates new recipe directories in `@the-ai-lab`, and improves existing recipes by turning their recurrent manual tasks into reusable scripts. It follows the official `SKILL.md` specification for every skill in the recipe.

## References

| Component | Source |
| :-------- | :----- |
| Command | [`commands/lab.md`](./commands/lab.md) |
| Skill | [`skills/deploy-recipes/`](./skills/deploy-recipes/SKILL.md) |
| Skill | [`skills/manage-recipes/`](./skills/manage-recipes/SKILL.md) |
