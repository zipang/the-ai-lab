# FOLLOW THESE INSTRUCTIONS TO INSTALL [THE AI LAB](https://github.com/zipang/the-ai-lab) INTO YOUR PROJECT

Follow these steps and branch accordingly to the correct step (each step is a level 2 paragraph identified by its number)

## 1. Resolve @the-ai-lab reference

Is this reference already resolved to some local existing path ? 
If YES GO TO STEP #4

Ask the user if he wants to install a read-only refrence to the project (GO TO STEP #2) or a local clone that he could use to create pull-requests (GO TO STEP #3).

## 2. Create the remote reference to @the-ai-lab using the git repo

Insert into the root `opencode.json` the following reference[1] block : `references.the-ai-lab` with a reference to the github repo.
If the local [opencode.json](./opencode.json) doesn't exist yet, just create it with the full content:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "references": {
    "the-ai-lab": {
      "repository": "zipang/the-ai-lab",
      "branch": "master",
      "description": "THE AI LAB : TOOLS, SKILLS, RECIPES FOR AI AGENTS"
    }
  }
}
```

From now on `@the-ai-lab` design the live [AI Lab project root](https://github.com/zipang/the-ai-lab) and you should use `webfetch` to read its content

## 3. Create the local reference to @the-ai-lab

Insert into the root `opencode.json` the following reference[1] block : `references.the-ai-lab` with the correct path.
If the local [opencode.json](./opencode.json) doesn't exist yet, just create it with the full content:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "references": {
    "the-ai-lab": {
      "path": "../the-ai-lab",
      "description": "THE AI LAB : TOOLS, SKILLS, RECIPES FOR AI AGENTS"
    }
  }
}
```

From now on `@the-ai-lab` design the local path to the cloned project.

## 4. Install the `lab` meta-recipe

Load the required skill at `@the-ai-lab/recipes/lab/skills/deploy-recipes` and deploy all the components from `@the-ai-lab/recipes/lab` into the local project root.

## 5. Propose to the user a selection of recipes to install

The list of available recipes comes from the project [README](@the-ai-lab/README.md#-recipes)
Propose the user a choice of recipes to install using the `question` tool[2] : "Which recipe do you want to install ?" and proceeed with the installation of the selected recipes using the `deploy-recipes` skill.

## 6. Restart OpenCode

When the installation is complete, tell the user to restart OpenCode so that the new reference, skills, and commands take effect.

[1]: https://opencode.ai/docs/references/
[2]: https://opencode.ai/docs/tools/#question

