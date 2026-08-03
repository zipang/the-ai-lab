# AI Lab CLI

## Intent

The AI Lab CLI is the `/ai-lab` command. It installs and removes other recipes from The AI Lab inside the current project. It also pushes local recipe edits back to The AI Lab as a pull request. It works through the `@ai-lab` project reference. The reference must be configured before the command can run.

The command supports three subcommands:

- `/ai-lab install <recipe-name>` copies a recipe into the project.
- `/ai-lab remove <recipe-name>` removes a recipe from the project.
- `/ai-lab push <recipe-name>` creates a pull request with the local edits of an installed recipe.

## Bootstrap

Install the `@ai-lab` reference and deploy the command once. This is a one-time setup.

### 1. Install the reference

Add `ai-lab` as a project reference in the target project's `opencode.json`. Create the file if it does not exist.

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

The `description` is required. It tells the agent when to use the reference and gives the agent access to the resolved reference path.

### 2. Deploy the command

Ask the agent to copy the command from the reference:

```
Copy the command from @ai-lab/recipes/ai-lab/commands/ai-lab.md into .opencode/commands/ai-lab.md
```

The command now works in this project.

### 3. Use the command

```
/ai-lab install <recipe-name>
/ai-lab remove <recipe-name>
/ai-lab push <recipe-name>
```

## Usage

The command reads the `@ai-lab` reference to find `recipes/<name>/`. It deploys or removes agents, skills, and commands with the mapping defined in the root `README.md` of The AI Lab. On install it also applies the extra configuration steps from the recipe README. On remove it confirms the deletion plan before it deletes any file. On push it copies the installed components back into a temporary clone of The AI Lab, commits them on a branch, and opens a pull request.

## References

| Component | Source |
| :-------- | :----- |
| Command | [`commands/ai-lab.md`](./commands/ai-lab.md) |
