# The Librarian

## Intent

A specialized agent that acts as the "keeper of truth" for tools documentation. It discovers official documentation sources (e.g., `llms.txt`), downloads them as faithful local Markdown mirrors, indexes them under `/docs/<tool> - <version>/`, and advertises them to the other agents so local docs are preferred over web searches.

## Missions

1. **Discover**: Identify official, up-to-date documentation sources for a tool and its version.
2. **Acquire**: Download the complete, unmodified raw Markdown content (`curl`/`wget` on `llms.txt` links, GitHub raw, or `webfetch` as a last resort).
3. **Index**: Organize docs into `/docs/<tool> - <version>/` with an `index.md` entry point and a short chapter description per file.
4. **Advertise**: Keep `.opencode/instructions.md` updated so other agents know about the locally indexed documentation.

The agent runs in `mode: all`. The user can select it with `@librarian`, and
other agents can delegate documentation tasks to it through the task tool.
When another agent sends a mission, the Librarian runs the workflow for the
requested set only, and reports the result back to that agent.

## Usage

Deployment of the agent and skills follows the process in the root `AGENTS.md` of this lab.

Invoke the agent with a mission, for example:

> "@librarian index the opencode documentation"
> "@librarian update the latest bun version using https://bun.sh/llms.txt"

The workflow skills load on demand:

- `index-tool-docs` runs the full create/reindex workflow.
- `fix-bun-docs` normalizes an acquired Bun mirror (removes the upstream
  `Documentation Index` header and rewrites `/docs/...` links to relative).

## References

| Component | Source |
| :-------- | :----- |
| Agent | [`agents/librarian.md`](./agents/librarian.md) |
| Skill: index-tool-docs | [`skills/index-tool-docs/`](./skills/index-tool-docs/) |
| Skill: fix-bun-docs | [`skills/fix-bun-docs/`](./skills/fix-bun-docs/) |
