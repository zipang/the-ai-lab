---
description: Create, install, test, remove, or improve an @the-ai-lab recipe
---
# The /lab command

Route the action to the correct skill and use it to execute the user's intent with the provided `$ARGUMENTS`.

## Basic usage

Command syntax:
```
/lab <action> <recipe-name>
```
Where the `<action>` can be one of `<install|test|remove|create|improve>`.

- The `install`, `test`, and `remove` actions load the `deploy-recipes` skill.
- The `create` and `improve` actions load the `manage-recipes` skill.

If the action verb is not one of the available actions (`install`, `test`, `remove`, `create`, nor `improve`), guess the action from the whole sentence ($ARGUMENTS). For example, "install the agent-browser recipe" maps to `/lab install agent-browser`. If no action matches clearly, show the formal usage below and stop:

```
**USAGE:**
/lab install <recipe-name>
/lab test <recipe-name>
/lab remove <recipe-name>
/lab create <recipe-name>
/lab improve <recipe-name>
```
