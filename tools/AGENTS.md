# DOX — tools/

## Purpose

Holds source-code tool projects used by the lab and by recipes: local MCP servers and speech-to-text tools. These are standalone projects (with installers, source, and their own READMEs), not deployable recipe bundles.

## Ownership

- The lab maintains the category layout (`mcp-servers/`, `speech-to-text/`) and their category READMEs.
- Each tool project owns its own code, installer, and README.

## Local Contracts

- Tools are grouped by category directory: `mcp-servers/`, `speech-to-text/`.
- Each tool project keeps its own structure and install instructions in its README.
- Deployable agent/skill/command bundles belong in `../recipes/` — never here.

## Child DOX Index

None.
