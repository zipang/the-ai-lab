# The Librarian (@the-ai-lab/recipes/the-librarian)

This recipe contains one agent and two skills. The Librarian is the "keeper of truth"
for tools documentation. It discovers official documentation sources, downloads them as
faithful local Markdown mirrors, indexes them under `docs/<tool> - <version>/`, and
advertises them to the other agents so local docs are used before web searches.

The agent runs in `mode: all`. Select it with `@librarian`, or delegate documentation
tasks to it from another agent.

## Usage

Invoke the agent with a mission:

- `@librarian index the opencode documentation`
- `@librarian update the bun docs using https://bun.sh/llms.txt`

## Content

| Component | Source |
| :-------- | :----- |
| Agent | [`librarian`](./agents/librarian.md) |
| Skill | [`index-tool-docs`](./skills/index-tool-docs/SKILL.md) |
| Skill | [`fix-bun-docs`](./skills/fix-bun-docs/SKILL.md) |
