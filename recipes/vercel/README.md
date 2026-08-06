# Vercel (@the-ai-lab/recipes/vercel)

This recipe contains one agent and four skills. The Vercel agent is the main interlocutor
for every Vercel task: deployment, builds, environment variables, domains, logs, and
troubleshooting. The agent loads one task-oriented skill per task, which keeps the context
window small. The Vercel CLI and AI SDK reference knowledge lives in a local documentation
mirror maintained by the Librarian; the `vercel-docs` skill is the bridge to that mirror.

## Usage

Select the Vercel agent and give it a task:

- "Deploy this project to production."
- "Add the DATABASE_URL variable for the preview environment."
- "Build a chat feature with streaming responses."

## Content

| Component | Source |
| :-------- | :----- |
| Agent | [`vercel`](./agents/vercel.md) |
| Skill | [`vercel-cli`](./skills/vercel-cli/SKILL.md) |
| Skill | [`vercel-ai-sdk`](./skills/vercel-ai-sdk/SKILL.md) |
| Skill | [`vercel-serverless-functions`](./skills/vercel-serverless-functions/SKILL.md) |
| Skill | [`vercel-docs`](./skills/vercel-docs/SKILL.md) |

## Dependencies

This recipe depends on the [`the-librarian`](../the-librarian/README.md) recipe. Install it
first; it provides the Librarian agent and the `index-tool-docs` skill that builds and
advertises the local documentation mirror.

This recipe also depends on the [`agent-browser`](../agent-browser/README.md) recipe. Install
it when you need to verify deployments in a real browser. It provides the `agent-browser`
skill that drives the native Rust CLI for browser automation.

This recipe also requires the Vercel CLI globally:

```sh
bun add -g vercel
vercel login
```
