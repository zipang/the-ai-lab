# AI Lab Command

## Intent

The `/lab` command is an [opencode command](https://opencode.ai/docs/commands/) that provides a set of subcommands to manage recipe installation from the repo into the current project.

The command supports four subcommands:

- `/lab install <recipe-name>` copies a recipe into the project.
- `/lab test <recipe-name>` symlinks a recipe into the project instead of copying it.
- `/lab remove <recipe-name>` removes a recipe from the project.
- `/lab push <recipe-name>` sends the local edits of an installed recipe back to the `@the-ai-lab` source. For a Git repository reference it opens a pull request; for a local directory reference it copies the files back and offers to commit and push from that directory.

The command does not contain the management logic itself. It loads the `manage-recipes` skill and passes its `$ARGUMENTS` to it. The skill holds all the instructions for the `install`, `test`, `remove`, and `push` actions. Other agents can load the same skill directly to manage recipes without the command.

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

The command now works in this project.

### 3. Use the command

```
/lab install <recipe-name>
/lab test <recipe-name>
/lab remove <recipe-name>
/lab push <recipe-name>
```

## Usage

The command loads the `manage-recipes` skill. The skill uses the `@the-ai-lab` reference to find the recipe root directory `@the-ai-lab/recipes/<recipe-name>/`. It then reads the recipe README to get the complete recipe content (agents, skills, commands) and performs the requested action: install the recipe in the current project, test it with symlinks, remove it from the current project, or push local modifications back to the `@the-ai-lab` source.

## References

| Component | Source |
| :-------- | :----- |
| Command | [`commands/lab.md`](./commands/lab.md) |
| Skill | [`skills/manage-recipes/`](./skills/manage-recipes/SKILL.md) |
