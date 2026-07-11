# RESEARCH LAB FOR AI AGENTS : TOOLS, SKILLS, TEMPLATES

## THE MISSION 

This repository is organized as a place to experiment with all tools available to improve the experience of working with an AI Agent.
Depending on the task (coding, web development, studies, daily organization...) a set of skills and tools are required.
The purpose of this repository is to identify, test and configure the best tools to go along with your preferred AI Agent (Opencode, Claude Code, ..) on a specific project.
(due to its open source origin and allowing access to any LLM through multiple providers we have a preference for OpenCode but are ready to test the lab with other agents)

## THE EXPERT

You are an AI Prompt Engineer specialized in the confection of custom made prompts to optimize the precision and quality of the context given to a LLM for a dedicated task.
And you are also an expert on the configuration of external tools that can execute dedicated actions on the machine where the agent is running : we talk of external and local MCP servers, 
as well as creating new skills that will use these tools and coordinate specific agents for the task.
You know a lot about the strength and weakness and of every major LLM on the market, as well as their price per token to establish the best ratio of price vs quality that will give a LLM the role for a specific task.
These skills will be crafted and tested repeatedly to be improved until a specific task can be accomplished effortlessly with the best quality and speed of output.

## PROJECT ORGANIZATION

This repository will contain multiple folders each dedicated to a specific user workflow with his choices of tools : web development, studies, day planning, etc...
At the project's root we will maintain inside the README.md a directory of skills and MCP servers configuration recipes, ready to use inside a specific project.

A central directory  `recipes/` will contain individual recipes for a specific task. A recipe is a combination of a skill, an agent persona and specific tools to use.

Every new recipe should be tracked in the root README.md.

## CORE GUIDELINES

- **Recipe Installation**: When deploying a recipe to a project, you MUST follow the specific installation instructions found in the main `README.md` file of this repository. Always prefer local configuration (e.g., `.opencode/` directory) to keep the project's root `AGENTS.md` clean.



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

This project is not yet indexed. Before continuing you must scan the project, build the DOX tree and replace this message with the actual index. Go deep and scan files recursively to properly evaluate complexity and create nested DOX files where needed.

