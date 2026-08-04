# AI Lab CLI

## Intent

The AI Lab command `/lab` is a cli like tool that provides a set of sub commands to manage recipes installation from the repo inside the current project. 

The command supports three subcommands:

- `/lab install <recipe-name>` copies a recipe into the project.
- `/lab remove <recipe-name>` removes a recipe from the project.
- `/lab push <recipe-name>` sends the local edits of an installed recipe back to the `@the-ai-lab` source. For a Git repository reference it opens a pull request; for a local directory reference it copies the files back and offers to commit and push from that directory.

## Installation (OpenCode intructions)

### 1. Install the-ai-lab as an external reference

Add `@the-ai-lab` as a project reference in the target project's `opencode.json`. Create the file if it does not exist then insert the `the-ai-lab` key in the references block :

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

### 2. Deploy the command

Ask the agent to copy the command from the reference:

```
Copy the command from @the-ai-lab/recipes/lab/commands/lab.md into .opencode/commands/lab.md
```

The command now works in this project.

### 3. Use the command

```
/lab install <recipe-name>
/lab remove <recipe-name>
/lab push <recipe-name>
```

## Usage

The command uses the `@the-ai-lab` reference to find the recipe root directory `@the-ai-lab/recipes/<recipe-name>/`. 
Then it uses the recipe README to have a clear view of the recipe's content (agents, skills, commands..) and propose a list of action : install the recipe in the current project, remove the recipe from the current project, push local modifications of the current recipe back to the `@the-ai-lab` source (a pull request for a Git repository reference, a copy-back for a local directory reference). 

## References

| Component | Source |
| :-------- | :----- |
| Command | [`commands/lab.md`](./commands/lab.md) |
