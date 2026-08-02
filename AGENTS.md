# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## THE MISSION 

This repository is organized as a place to experiment with all tools available to improve the experience of working with an AI Agent.
Depending on the task (coding, web development, studies, daily organization...) a set of skills and tools are required.
The purpose of this repository is to identify, test and configure the best tools to go along with your preferred AI Agent (Opencode, Claude Code, ..) on a specific project.
(due to its open source origin and allowing access to any LLM through multiple providers we have a preference for OpenCode but are ready to test the lab with other agents)

## PROJECT ORGANIZATION

At the project's root we maintain inside the `README.md` a directory of recipes and tools, ready to use inside a specific project.

- **`recipes/`**: Deployable recipes. Each recipe is one directory — a bundle of agents, skills, and commands ready to copy into any project without renaming. Each recipe has its own `README.md` (intent, usage, references). See `recipes/AGENTS.md`.
- **`tools/`**: Source-code tool projects used by the lab and by recipes (local MCP servers, speech-to-text). See `tools/AGENTS.md`.
- **`docs/`**: Locally indexed tool documentation, maintained by The Librarian.
- **`.opencode/`**: This lab's own live agent configuration (agents, skills, commands, instructions). It is local-only and not tracked in git; the canonical agent and skill sources live in `recipes/`.

Every new recipe is tracked in the root `README.md`.

## CORE GUIDELINES

- **Recipe Installation**: Deploy a recipe into a target project (not this lab) by copying its components into the target's local configuration. The full process is documented in the root `README.md` (`## Deploying a Recipe`). Always prefer local configuration (`.opencode/` / `.agents/` directories) to keep the target project's root `AGENTS.md` clean.
- **Deploy destinations**: agents → `.opencode/agents/`, skills → `.agents/skills/`, commands → `.opencode/commands/`. Skills use `.agents/skills/` because it is agent-agnostic (compatible with more tools) and equally supported by OpenCode.
- **Ready-to-deploy**: Recipe files must be pre-named so a direct copy into the deploy destination requires no renaming.



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

- Skills are deployed to `.agents/skills/` (agent-agnostic, supported equally by OpenCode) rather than `.opencode/skills/`.

## Child DOX Index

- `recipes/AGENTS.md` — owns deployable recipes: structure (`agents/`, `skills/`, `commands/`) and per-recipe README contract. Recipe tracking and install process live in the root `README.md`.
- `tools/AGENTS.md` — owns source-code tool projects: category layout (`mcp-servers/`, `speech-to-text/`) and per-tool README install contracts.

Everything else (`.opencode/` live config, `docs/` indexed documentation, root config files) stays owned by this root doc.

