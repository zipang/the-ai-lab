# The Librarian 📚

The Librarian is a specialized agent and workflow designed to be the "keeper of truth" for tools documentation. It indexes specific tools documentation locally as searchable Markdown files and makes them available for other agents.

## Missions

1. **Identify**: Find official, up-to-date documentation (e.g., `llms.txt`).
2. **Acquire**: Download and convert documentation into clean, local Markdown chapters.
3. **Index**: Store documentation in `/docs/<tool>/` with an `index.md` entry point.
4. **Advertize**: Maintain the local list of locally indexed tools and update the instructions for other agents.

## Locally Indexed Documentation

| Tool     | Status    | Entry Point                       |
| :------- | :-------- | :-------------------------------- |
| Bun      | ✅ Indexed | `/docs/bun - v1.3.9/index.md`      |
| OpenCode | ✅ Indexed | `/docs/opencode - v1.1.65/index.md`|

## Installation

To add The Librarian to your project, follow these steps:

1. **Register the Agent**:
   Add the `librarian` agent to your project by copying the `AGENT.md` file into `.opencode/agents/librarian.md`.

## Usage

Ask the Librarian to index a new tool or refresh an existing one:
> "@librarian index the opencode documentation"
> "@librarian update the latest bun version using https://bun.sh/llms.txt"
