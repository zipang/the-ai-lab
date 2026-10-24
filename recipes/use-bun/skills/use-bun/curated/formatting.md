# Bun as the code formatter

Use `bun fmt` as the only formatter of the project. Keep the style rules in
`.editorconfig`, because every IDE reads this file. Agents and humans then get
the same result.

## Which file owns what

| File                   | Owns                                                                |
| :--------------------- | :------------------------------------------------------------------ |
| `.editorconfig`        | The style: indentation, line length, line endings, final newline.   |
| `bunfig.toml` `[fmt]`  | What `.editorconfig` cannot express: `ignorePatterns`, `overrides`. |
| `package.json`         | The `format` script that runs `bun fmt`.                            |
| `opencode.json`        | Formatting of the files that the agent writes.                      |
| `.githooks/pre-commit` | Formatting of the files that a human saves from an editor.          |

Do not put style options in `bunfig.toml`. `bun fmt` reads both files, and
`bunfig.toml` wins on an option that both files set. Two sources of truth give
two different results.

## Write the style once in .editorconfig

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

`bun fmt` reads `indent_style`, `indent_size`, `tab_width`, `max_line_length`,
and `end_of_line` from this file. `max_line_length` sets the wrap column of the
formatter.

## Exclude the generated trees

Keep the generated and vendored trees out of the formatting scope. Add only the
exclusion to `bunfig.toml`:

```toml
[fmt]
ignorePatterns = [".agents/"]
```

Do not run the formatter on generated output as a post-step. The generator
writes raw text, then the formatter rewrites it. A `bun fmt --check` run then
compares the raw output with the formatted file and always reports a stale
result. Exclude the tree instead.

## Replace the format script in package.json

Remove every formatter dependency and its script. Add one script:

```json
{
	"scripts": {
		"format": "bun fmt"
	}
}
```

Run `bun fmt --check` in CI. The command exits with code 1 when a file needs
formatting.

## Format the files that the agent writes

Add the `formatter` block to `opencode.json`. This block replaces the Prettier,
oxfmt, and Biome built-ins with `bun fmt`:

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

## Format the files that a human saves

OpenCode covers agent saves only. Add a pre-commit hook for editor saves. The
hook formats the staged files and stages them again:

```bash
mkdir -p .githooks
printf '#!/bin/sh\nbun fmt --staged\n' > .githooks/pre-commit
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
```

Commit the `.githooks/` directory. The hook stops a commit when `bun fmt` exits
with an error, for example on a syntax error in a staged file.

## Rewrite the existing instructions

The "Bun tooling" block that the updater adds to the root `AGENTS.md` is a
pointer. It does not cancel the instructions that already exist. An instruction
that names Prettier, oxfmt, or Biome stays binding for the agent until you
delete it. A new chapter at the end of the file is not enough.

Audit every `AGENTS.md` and `README.md` in the project. Start at the root and
walk down to each directory. Then apply these rules:

- Delete each instruction that names a removed formatter or its config file.
  Examples: `.oxfmtrc.json`, `.prettierrc`, `biome.json`, `bunx oxfmt --check`,
  `prettier --write`.
- Delete each format step and each format command from the checklists, the
  scripts, and the commit procedure. The agent formats on save, and the
  pre-commit hook formats the staged files. A manual call only adds time.
- Delete each Bun usage list that repeats the routing table of the skill. Keep
  only the rules that are specific to the project, such as a naming convention
  or a lint rule.
- Keep the lint commands. The hook does not run the linter.
- Keep a command when a script still runs it. When a script chains the
  formatter with the linter, for example `code:fix`, remove the formatter from
  the script and rename the script after its remaining task.
- Update each file that points to a deleted section, such as a README that
  sends the reader to the old rules.

Read the result as a new agent. Each remaining sentence must agree with
`.editorconfig`, `bunfig.toml`, `opencode.json`, and the pre-commit hook.

## Known limits

- The formatter does not rewrap Markdown prose. `proseWrap` defaults to
  `"preserve"`, so long lines and hard-wrapped lines stay as the author wrote
  them. Set `proseWrap = "always"` in `bunfig.toml [fmt]` to wrap prose at
  `max_line_length`.
- `bun fmt` does not read `trim_trailing_whitespace` from `.editorconfig`. It
  trims trailing whitespace in Markdown.
- The formatter pads Markdown table cells to align the columns. Expect wide
  diffs on the first run.
