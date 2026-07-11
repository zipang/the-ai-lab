# CONTEXT MODE

This project propose a caching layer between the local cli agent and the LLM to optimize the context and store it for session preservation.

**Context Mode** is an MCP server that provides:

* **Context Saving** — Sandbox tools keep raw data out of the context window. 315 KB becomes 5.4 KB. 98% reduction.
* **Session Continuity** — Every file edit, git operation, task, error, and user decision is tracked in SQLite. When the conversation compacts, context-mode doesn't dump this data back into context — it indexes events into FTS5 and retrieves only what's relevant via BM25 search. The model picks up exactly where you left off. If you don't --continue, previous session data is deleted immediately — a fresh session means a clean slate.

## INSTALLATION

Taken from the project's README : 

**Step 1 — Install globally:**

```bash
bun add -g context-mode
```

**Step 2 — Register the MCP server and plugin.** OpenCode uses a TypeScript plugin paradigm instead of JSON hooks. Add both the MCP server and the plugin to `opencode.json` in your project root:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context-mode": {
      "type": "local",
      "command": ["context-mode"]
    }
  },
  "plugin": ["context-mode"]
}
```

The `mcp` entry gives you the 6 sandbox tools. The `plugin` entry enables hooks — OpenCode calls the plugin's TypeScript functions directly before and after each tool execution, blocking dangerous commands (like raw `curl`) and enforcing sandbox routing.

**Step 3 — Restart OpenCode.** On first plugin init, the plugin automatically manages `AGENTS.md` routing instructions in your project root:

- **File does not exist** — the routing instructions file is written.
- **File exists without context-mode rules** — routing instructions are appended after your existing content.
- **File already contains context-mode rules** — skipped (idempotent, no duplicate content).

This works alongside the plugin as a parallel enforcement layer — the plugin intercepts tool calls at runtime, while `AGENTS.md` guides the model's tool preferences from session start.

> **Why the plugin matters:** Without the `plugin` entry, context-mode has no way to intercept tool calls. The model can run raw `curl`, read large files directly, or dump unprocessed output into context — ignoring `AGENTS.md` instructions. With the plugin, `tool.execute.before` fires on every tool call and blocks or redirects data-heavy commands before they execute. The `experimental.session.compacting` hook builds and injects resume snapshots when the conversation compacts, preserving session state.
>
> Note: OpenCode's SessionStart hook is not yet available ([#14808](https://github.com/sst/opencode/issues/14808)), so startup/resume session restore is not supported — the `AGENTS.md` file is the primary way context-mode instructions reach the model at session start. Compaction recovery works fully via the plugin.
