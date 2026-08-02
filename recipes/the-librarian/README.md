# The Librarian

## Intent

A specialized agent that acts as the "keeper of truth" for tools documentation. It discovers official documentation sources (e.g., `llms.txt`), downloads them as faithful local Markdown mirrors, indexes them under `/docs/<tool> - <version>/`, and advertises them to the other agents so local docs are preferred over web searches.

## Missions

1. **Discover**: Identify official, up-to-date documentation sources for a tool and its version.
2. **Acquire**: Download the complete, unmodified raw Markdown content (`curl`/`wget` on `llms.txt` links, GitHub raw, or `webfetch` as a last resort).
3. **Index**: Organize docs into `/docs/<tool> - <version>/` with an `index.md` entry point and a short chapter description per file.
4. **Advertise**: Keep `.opencode/instructions.md` updated so other agents know about the locally indexed documentation.

## Usage

### 1. Deploy the agent

```bash
mkdir -p .opencode/agents
cp agents/librarian.md .opencode/agents/
```

### 2. Invoke the agent

> "@librarian index the opencode documentation"
> "@librarian update the latest bun version using https://bun.sh/llms.txt"

## References

| Component | Source |
| :-------- | :----- |
| Agent | [`agents/librarian.md`](./agents/librarian.md) |
