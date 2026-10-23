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
markers.

### Use Bun as the project formatter

`bun fmt` replaces Prettier, oxfmt, and Biome. The full guide ships with the
skill at
[`skills/use-bun/curated/formatting.md`](./skills/use-bun/curated/formatting.md).
Apply these steps in the target project:

1. Write the style in `.editorconfig`. Every IDE reads this file, so humans and
   the agent format the same way. `bun fmt` reads `indent_style`,
   `indent_size`, `tab_width`, `max_line_length`, and `end_of_line` from it.

   ```ini
   root = true

   [*]
   indent_style = tab
   end_of_line = lf
   charset = utf-8
   trim_trailing_whitespace = true
   insert_final_newline = true
   max_line_length = 100
   ```

2. Keep the style out of `bunfig.toml`. Put only the exclusions there, because
   `bunfig.toml` wins over `.editorconfig` on an option that both files set.
   Exclude the generated and vendored trees:

   ```toml
   [fmt]
   ignorePatterns = [".agents/"]
   ```

3. Replace the formatter script in `package.json` and remove the old formatter
   dependency (`prettier`, `oxfmt`, or `biome`):

   ```json
   {
   	"scripts": {
   		"format": "bun fmt"
   	}
   }
   ```

   Run `bun fmt --check` in CI.

4. Update the formatting instructions in the root `AGENTS.md`. Replace the text
   that names Prettier or oxfmt with these rules:

   ```md
   - Format with `bun fmt`. The style lives in `.editorconfig`. Generated trees
     are excluded in `bunfig.toml`. The formatter runs on save.
   - Do not add a formatter package or a formatter config file.
   ```

   The managed "Bun tooling" block below already points to `bun fmt`.

5. Add the `formatter` block to `opencode.json`. This block formats every file
   that the agent `write`, `edit`, or `patch` tools change, and disables the
   Prettier, oxfmt, and Biome built-ins:

   ```jsonc
   {
   	"$schema": "https://opencode.ai/config.json",
   	"formatter": {
   		"bun-fmt": {
   			"command": ["bun", "fmt", "$FILE"],
   			"extensions": [
   				".js",
   				".jsx",
   				".mjs",
   				".cjs",
   				".ts",
   				".tsx",
   				".mts",
   				".cts",
   				".css",
   				".json",
   				".jsonc",
   				".yaml",
   				".yml",
   				".md",
   				".mdx",
   				".html",
   			],
   		},
   		"prettier": { "disabled": true },
   		"oxfmt": { "disabled": true },
   		"biome": { "disabled": true },
   	},
   }
   ```

6. Optional: format the files that a human saves from an editor. Add a
   pre-commit hook and commit it:

   ```bash
   mkdir -p .githooks
   printf '#!/bin/sh\nbun fmt --staged\n' > .githooks/pre-commit
   chmod +x .githooks/pre-commit
   git config core.hooksPath .githooks
   ```

The hook stops a commit when `bun fmt` exits with an error, for example on a
syntax error in a staged file.

The formatter keeps Markdown prose as the author wrote it. `proseWrap`
defaults to `"preserve"`. Read the curated guide for the known limits.

To deploy this recipe without the `@the-ai-lab` reference, fetch this
README from
`https://raw.githubusercontent.com/zipang/the-ai-lab/master/recipes/use-bun/README.md`
and follow the install steps in the root README section
[Install the Use Bun recipe](https://github.com/zipang/the-ai-lab#install-the-use-bun-recipe).

## Content

| Component | Source                                                 |
| :-------- | :----------------------------------------------------- |
| Skill     | [`use-bun`](./skills/use-bun/SKILL.md)                 |
| Guide     | [`formatting`](./skills/use-bun/curated/formatting.md) |

## Dependencies

- [Bun](https://bun.com/) 1.4.0 or later — the updater runs with `bun` and reads
  the local `Bun.version`.
- Network access to `bun.com` when running the updater script.
