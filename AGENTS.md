# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## Rules for Agents

Follow these rules on any task in this project.

1. **Read the READMEs.** Read the root `README.md` first. It describes the project's intent, contents, and deploy process. Read the README in every directory you touch.
2. **Use bun instead of nodejs, npm, etc..** Everytime some command line from the web tells to use `node` or `npm` or `yarn` or any similar tool from the Javascript/Typescript ecosystem, always use the bun equivalent command : `bun` or `bunx`
2. **Use the `git-commit` skill** for every commit. It produces conventional, atomic commit messages.
3. **Use the `technical-writing` skill** for every document you write or edit. It enforces STE-flavored Simplified Technical English.
4. **Follow the DOX framework** below. AGENTS.md files are binding work contracts for their subtrees.
5. **Resolve `@the-ai-lab` as a self-reference.** This repository is the source of the `@the-ai-lab` reference. OpenCode cannot configure `@the-ai-lab` as a self-reference in this project's `opencode.json`. Treat any mention of `@the-ai-lab` in this project as a reference to this repository root. For example, `@the-ai-lab/recipes/<name>/` resolves to `./recipes/<name>/`.

## DOX Framework

### Read before editing

1. Read the root AGENTS.md.
2. Read every AGENTS.md found along the path from the root to each file you expect to touch.
3. Use the nearest AGENTS.md as the local contract. Use the parent docs for repo-wide rules.
4. If docs conflict, the closer doc controls local details, but no child doc may weaken DOX.

Do not rely on memory. Re-read the applicable chain in the current session.

### Update after editing

Every meaningful change requires a DOX pass:

- Update the closest owning AGENTS.md when the change affects purpose, scope, ownership, structure, contracts, workflows, rules, inputs/outputs, or user preferences.
- Update parent docs when parent-level structure or the child index changes. Update child docs when parent rules change.
- Remove stale or contradictory text immediately.
- Small edits that do not change behavior may leave docs unchanged, but the DOX pass still happens.

### Hierarchy

- The root AGENTS.md is the top of the chain: project-wide rules and the Child DOX Index.
- Child AGENTS.md files own their folder's domain rules and their own Child DOX Index.
- The closer a doc is to the work, the more specific and practical it must be.

### Child doc shape

Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, or responsibilities. Default section order:

Purpose → Ownership → Local Contracts → Work Guidance → Verification → Child DOX Index

### Style

- Keep docs concise, current, and operational.
- Document stable contracts, not diary entries.
- Do not duplicate rules across files unless each scope needs a local version.

### Closeout

1. Re-check changed paths against the DOX chain.
2. Update nearest owning docs and any affected parents or children.
3. Refresh every affected Child DOX Index.
4. Remove stale or contradictory text.
5. Report docs intentionally left unchanged and why.

## User Preferences

- Skills deploy to `.agents/skills/` (agent-agnostic) rather than `.opencode/skills/`.

## Child DOX Index

- `recipes/AGENTS.md` — deployable recipes: structure and per-recipe README contract.
- `tools/AGENTS.md` — source-code tools: category layout and per-tool README contracts.

Everything else (`.opencode/`, `docs/`, root config files) stays owned by this root doc.
