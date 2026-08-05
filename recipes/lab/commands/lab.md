---
description: Create, install, test, remove, or improve an @the-ai-lab recipe
---
# The /lab command

## Basic usage

Command syntax:
```
/lab <action> <recipe-name>
```

Route the action to the correct skill and use it to execute the user's intent with the provided `$ARGUMENTS`.

If the `<action>` verb is not one of the available actions (`install`, `test`, `remove`, `create`, nor `improve`), guess the correct action from the general intent of whole sentence ($ARGUMENTS). For example, "install the agent-browser recipe" maps to `/lab install agent-browser`. 

If no action matches clearly, show the formal usage below and stop:

```
**USAGE:**
/lab install <recipe-name>
/lab test <recipe-name>
/lab remove <recipe-name>
/lab create <recipe-name>
/lab improve <recipe-name>
```

## Command reference (skill mapping)

Load the corresponding skill to execute the action intended by the user prompt

| Command | Action | Skill |
| :------ | :----- | :---- |
| `/lab install <recipe-name>` | Copy a recipe into the project | `deploy-recipes` |
| `/lab test <recipe-name>` | Symlink a recipe into the project instead of copying it | `deploy-recipes` |
| `/lab remove <recipe-name>` | Remove a recipe and revert configuration changes | `deploy-recipes` |
| `/lab create <recipe-name>` | Create a new recipe in `@the-ai-lab` | `manage-recipes` |
| `/lab improve <recipe-name>` | Add reusable scripts to a recipe | `manage-recipes` |
