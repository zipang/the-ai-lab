---
description: Install, remove, or push an @the-ai-lab recipe in this project
---
# The /lab command

Load the `manage-recipes` skill and use it to execute the user's intent with the provided `$ARGUMENTS`.

## Basic usage

Command syntax:
```
/lab <action> <recipe-name>
```
Where the `<action>` can be one of `<install|test|remove|push>`.

If the action verb is not one of the available actions (`install`, `test`, `remove`, nor `push`), guess the action from the whole sentence ($ARGUMENTS). For example, "install the agent-browser recipe" maps to `/lab install agent-browser`. If no action matches clearly, show the formal usage below and stop:

```
**USAGE:**
/lab install <recipe-name>
/lab test <recipe-name>
/lab remove <recipe-name>
/lab push <recipe-name>
```
