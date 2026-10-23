# The Librarian (@the-ai-lab/recipes/the-librarian)

This recipe contains one agent and one skill. The Librarian is the "keeper of truth"
for tools documentation. It discovers official documentation sources, downloads them as
faithful local Markdown mirrors, indexes them under `docs/<tool> - <version>/`, and
advertises them to the other agents so local docs are used before web searches.

The agent runs in `mode: all`. Select it with `@librarian`, or delegate documentation
tasks to it from another agent.

Use this recipe for tools without a dedicated documentation recipe. Bun
documentation is now served by the [Use Bun](../use-bun/README.md) recipe, which
fetches the official pages on demand instead of keeping a local mirror.

## Usage

Invoke the agent with a mission:

- `@librarian index the opencode documentation`
- `@librarian refresh the vercel-cli docs to the latest version`

## Content

| Component | Source |
| :-------- | :----- |
| Agent | [`librarian`](./agents/librarian.md) |
| Skill | [`index-tool-docs`](./skills/index-tool-docs/SKILL.md) |
