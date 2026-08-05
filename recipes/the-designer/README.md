# The Designer (@the-ai-lab/recipes/the-designer)

This recipe contains one agent and five skills. The Designer creates and maintains design
systems and style guides inside the project. It works from a text description or a reference
URL to produce two artifacts : DESIGN.md and a stylesheet. The agent translate user's prompts to the dedicated skills to interactively create/update or apply the Design System in the project.

## Usage

Select The Designer agent and give it a brief:

- "Create a new design system named 'OceanFlow' for a fintech dashboard."
- "Extract the design system from https://example.com and apply it to our landing page."
- "Make the cards on the dashboard feel bolder and more distinctive."

## Content

| Component | Source |
| :-------- | :----- |
| Agent | [`the-designer`](./agents/the-designer.md) |
| Skill | [`design-system-tokens`](./skills/design-system-tokens/SKILL.md) |
| Skill | [`design-system-frontend`](./skills/design-system-frontend/SKILL.md) |
| Skill | [`design-system-extract-from-reference`](./skills/design-system-extract-from-reference/SKILL.md) |
| Skill | [`impeccable`](./skills/impeccable/SKILL.md) |
| Skill | [`agent-browser`](./skills/agent-browser/SKILL.md) |

## Dependencies

This recipe requires the `agent-browser` CLI tool :

```sh
bun add -g agent-browser
agent-browser install
```
