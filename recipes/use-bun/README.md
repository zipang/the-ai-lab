# Use Bun (@the-ai-lab/recipes/use-bun)

This recipe installs the `use-bun` skill: an always-fresh index of the official
Bun documentation, split into per-domain references (runtime, package manager,
bundler, test runner, type checking, ...). The skill routes the agent to the
right pages, fetched on demand as Markdown from `bun.com` — no local mirror to
maintain. A bundled updater script regenerates the indexes on every Bun release
and keeps a small "Bun tooling" block in the project's root `AGENTS.md`, so every
session prefers Bun built-ins over npm, tsc, ESLint, Prettier, Jest, or Vite
habits, even before the skill is loaded.

This recipe supersedes local Bun documentation mirrors maintained by the
[Librarian](../the-librarian/README.md) recipe.

## Usage

Ask your agent, in any project with the `@the-ai-lab` reference configured:

- `Install the use-bun recipe from @the-ai-lab into this project.`
- `Update the Bun documentation indexes.` — runs the updater script.
- `Which Bun API replaces bcrypt in this project?` — the skill routes to the
  right reference page.

To keep the indexes current, run the updater after each Bun release:

```bash
bun .agents/skills/use-bun/scripts/update.ts          # rewrite the indexes
bun .agents/skills/use-bun/scripts/update.ts --check  # CI: fail when stale
```

The updater also syncs the managed `AGENTS.md` block between
`<!-- the-ai-lab:use-bun:start -->` and `<!-- the-ai-lab:use-bun:end -->`
markers. To deploy this recipe without the `@the-ai-lab` reference, fetch this
README from
`https://raw.githubusercontent.com/zipang/the-ai-lab/master/recipes/use-bun/README.md`
and follow the install steps in the root README section
[Install the Use Bun recipe](https://github.com/zipang/the-ai-lab#install-the-use-bun-recipe).

## Content

| Component | Source |
| :-------- | :----- |
| Skill | [`use-bun`](./skills/use-bun/SKILL.md) |

## Dependencies

- [Bun](https://bun.com/) 1.4.0 or later — the updater runs with `bun` and reads
  the local `Bun.version`.
- Network access to `bun.com` when running the updater script.
