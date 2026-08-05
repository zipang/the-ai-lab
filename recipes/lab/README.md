# AI Lab (@the-ai-lab/recipes/lab)

This recipe `lab` is the meta-recipe for all recipes in the `@the-ai-lab`. 
It provides skills to manage the full lifecycle of the other recipes: 
create, deploy, test, and remove. 
The `/lab` command is the entry point for the user inside an Opencode session leveraging the underlying recipe skills `deply-recipes` and `manage-recipes`. 

## Usage

Run the `/lab` command with an action and a recipe name:

- `/lab install technical-writing`
- `/lab test vercel`
- `/lab create my-recipe`
- `/lab improve agent-browser`

## Content

| Component | Source |
| :-------- | :----- |
| Command | [`/lab`](./commands/lab.md) |
| Skill | [`deploy-recipes`](./skills/deploy-recipes/SKILL.md) |
| Skill | [`manage-recipes`](./skills/manage-recipes/SKILL.md) |
