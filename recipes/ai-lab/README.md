# AI Lab CLI

## Intent

The AI Lab command `/ai-lab` is a cli like tool that provides a set of sub commands to manage recipes installation from the repo inside the current project. 

The command supports three subcommands:

- `/ai-lab install <recipe-name>` copies a recipe into the project.
- `/ai-lab remove <recipe-name>` removes a recipe from the project.
- `/ai-lab push <recipe-name>` creates a pull request with the local edits of an installed recipe.

## Installation (OpenCode intructions)

### 1. Install the ai-lab github repo as an external reference

Add `@ai-lab` as a project reference in the target project's `opencode.json`. Create the file if it does not exist then insert the `ai-lab` key in the references block :

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

The command uses the `@ai-lab` reference to find the recipe root directory `@ai-lab/recipes/<recipe-name>/`. 
Then it uses the recipe README to have a clear view of the recipe's content (agents, skills, commands..) and propose a list of action : install the recipe in the current project, remove the recipe from the current project, push local modifications of the current recipe to the repo to create a Pull Request. 

## References

| Component | Source |
| :-------- | :----- |
| Command | [`commands/ai-lab.md`](./commands/ai-lab.md) |
