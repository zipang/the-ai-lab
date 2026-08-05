# Vercel

## Intent

A specialist agent for the Vercel platform. It manages Vercel projects:
deployment, builds, environment variables, domains, logs, and
troubleshooting. The agent is the main interlocutor for every Vercel task in
the project.

All the agent knowledge lives in task-oriented skills. The agent loads one
skill for each task. This keeps the context window small.

The Vercel CLI and AI SDK reference knowledge lives in a local documentation
mirror. The Librarian maintains it, and the agent reads it before the web. The
`vercel-docs` skill is the bridge between the agent and the Librarian.

## Required recipes

This recipe depends on the [`the-librarian`](../the-librarian/README.md)
recipe. Install it first. It provides the Librarian agent and the
`index-tool-docs` skill that builds and advertises the local mirror.

Load the `manage-recipes` skill from `@the-ai-lab/recipes/lab/skills/manage-recipes/` to install or remove recipes from `@the-ai-lab`. Use it with your `$ARGUMENTS` or prompt context. Install `the-librarian` first, then install `vercel`.

Auto-install of required recipes by the `manage-recipes` skill is a planned
follow-up. For now, install `the-librarian` before you install `vercel`.

## Local documentation

The Librarian indexes two documentation sets on demand.

| Set | Remote entry point | Local mirror | Version source |
|-----|--------------------|--------------|----------------|
| Vercel CLI | `https://vercel.com/docs/cli` and its sub-pages (append `.md` to each page URL) | `docs/vercel-cli - <version>/` | `npm view vercel version` |
| AI SDK | `https://ai-sdk.dev/llms.txt` (links to `.md` files) | `docs/ai-sdk - <version>/` | `npm view ai version` |

The local mirror may not exist yet. The agent reads the mirror through the
`vercel-docs` skill, and delegates the install or update to the Librarian. The
Serverless Functions docs stay remote for now.

## Bundle

| Component | Purpose | When the agent loads it |
| :-------- | :------ | :---------------------- |
| Agent `vercel` | Classifies the task and runs the work | Always |
| Skill `vercel-cli` | Command reference and workflows for the Vercel CLI | For any operation through the `vercel` command |
| Skill `vercel-ai-sdk` | Build AI features with the Vercel AI SDK | For chat, streaming, and tool-calling features |
| Skill `vercel-serverless-functions` | Author and debug API routes and functions | For API route and function work |
| Skill `vercel-docs` | Read the local Vercel CLI or AI SDK docs, and delegate indexing to the Librarian | For reference details, or to install or update the local docs |

The `technical-writing` skill, used when updating this recipe, is provided by
the standalone [`technical-writing`](../technical-writing/README.md) recipe.

## Usage

### 1. Install dependencies

Install the Vercel CLI globally:

```sh
bun add -g vercel
```

Log in once:

```sh
vercel login
```

### 2. Deploy the agent

Deployment of the agent and skills follows the process in the root `AGENTS.md`
of this lab. Load the `manage-recipes` skill from `@the-ai-lab/recipes/lab/skills/manage-recipes/` and use it to install the `vercel` recipe.

### 3. Invoke the agent

Start a session and select the Vercel agent, then give it a task:

- "Deploy this project to production."
- "Add the DATABASE_URL variable for the preview environment."
- "Build a chat feature with streaming responses."

The agent loads the matching skill, proposes the commands, and confirms
destructive actions.

## References

| Component | Source |
| :-------- | :----- |
| Agent | [`agents/vercel.md`](./agents/vercel.md) |
| Skill | [`skills/vercel-cli/`](./skills/vercel-cli/SKILL.md) |
| Skill | [`skills/vercel-ai-sdk/`](./skills/vercel-ai-sdk/SKILL.md) |
| Skill | [`skills/vercel-serverless-functions/`](./skills/vercel-serverless-functions/SKILL.md) |
| Skill | [`skills/vercel-docs/`](./skills/vercel-docs/SKILL.md) |
