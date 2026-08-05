# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## Rules for Agents

Follow these rules on any task in this project.

1. **Read the READMEs.** Read the root `README.md` first. It describes the project's intent, contents, and deploy process. Read the README in every directory you touch.
2. **Use bun instead of nodejs, npm, etc..** Everytime some command line from the web tells to use `node` or `npm` or `yarn` or any similar tool from the Javascript/Typescript ecosystem, always use the bun equivalent command : `bun` or `bunx`
3. **Use the `git-commit` skill** for every commit. It produces conventional, atomic commit messages.
4. **Use the `technical-writing` skill** for every document you write or edit. It enforces STE-flavored Simplified Technical English.
5. **Resolve `@the-ai-lab` as a self-reference.** This repository is the source of the `@the-ai-lab` reference. OpenCode cannot configure `@the-ai-lab` as a self-reference in this project's `opencode.json`. Treat any mention of `@the-ai-lab` in this project as a reference to this repository root. For example, `@the-ai-lab/recipes/<name>/` resolves to `./recipes/<name>/`.
6. **Manage recipes through the lab skills.** Use the `deploy-recipes` skill to install, test, or remove recipes from `@the-ai-lab`. Use the `manage-recipes` skill to create new ones or to improve existing ones with reusable scripts. If a skill is not available, install it from `@the-ai-lab/recipes/lab/skills/<skill>/` and use it with your `$ARGUMENTS` or prompt context. 
7. **Follow the DOX framework** below. AGENTS.md files are binding work contracts for their subtrees.

# DOX framework

- DOX is highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

## User Preferences

When the user requests a durable behavior change, record it here or in the relevant child AGENTS.md

## Child DOX Index

- `recipes/AGENTS.md` — deployable recipes: structure and per-recipe README contract.
- `tools/AGENTS.md` — source-code tools: category layout and per-tool README contracts.
- Root-owned files: Everything else (`.opencode/`, `docs/`, root config files) stays owned by this root doc.
