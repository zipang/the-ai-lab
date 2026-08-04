---
name: vercel-docs
description: Use to locate and read the local Vercel CLI and AI SDK documentation, and to ask the Librarian to install or update it. Load before you cite a remote doc URL, and whenever the user asks to index or refresh the Vercel or AI SDK docs.
---

# Vercel Docs

## Purpose

This skill is the bridge between the Vercel agent (`@the-ai-lab/recipes/agents/vercel.md`) and the Librarian. 
It delegates all the tasks related to documentation fetching/update to the Librarian.

Load this skill when you need access to up-to-date Vercel Cli, or Vercel AI SDK reference details, 
or when the user asks to install, update, or reindex these locals documentations.

## Documentation sets

Here is the list of locally maintained documentation inside the Vercel universe.

| Set | Remote entry point | Local mirror |
|-----|--------------------|--------------|
| Vercel CLI | `https://vercel.com/docs/cli` and its sub-pages (append `.md` to each page URL) | `docs/vercel-cli - <version>/` |
| AI SDK | `https://ai-sdk.dev/llms.txt` (links to `.md` files) | `docs/ai-sdk - <version>/` |

The Librarian creates each mirror under `docs/<tool> - <version>/` and writes an
`index.md` entry point with the chapter list. Extraction happens on demand, not
at install time.

## Procedure

### 1. Identify the set you need

Pick the set from the table above. If the user asks for a topic that does not
fit either set, fall back to the remote URL and tell the user the local mirror
does not cover it.

### 2. Read the local mirror

1. Read `docs/<tool> - <version>/index.md` to find the chapter relevant to your topic.
2. Read the chapter file.

Use the local mirror as the source of truth. Do not fetch the remote page when
the mirror exists.

### 3. Request the missing or outdated mirror

If the mirror does not exist, or the user asks to install or update it, delegate
the work to the Librarian agent through the `task` tool. Give the Librarian one
precise mission per set.

Vercel CLI mission:

> Index the Vercel CLI documentation into `docs/vercel-cli - <version>/`.
> Source: the `https://vercel.com/docs/cli` section and its sub-pages. Append
> `.md` to each page URL to get the markdown endpoint. Version: the current
> Vercel CLI version (`npm view vercel version`). Build the `index.md` entry
> point and advertise the documentation in `.opencode/instructions.md`.

AI SDK mission:

> Index the AI SDK documentation into `docs/ai-sdk - <version>/`. Source:
> `https://ai-sdk.dev/llms.txt`, which links to `.md` files. Version: the
> current `ai` npm version (`npm view ai version`). Build the `index.md` entry
> point and advertise the documentation in `.opencode/instructions.md`.

### 4. Use the refreshed mirror

After the Librarian reports done, preload the new `index.md`, find the chapter
by topic, and read the file. Answer the user from the local mirror.

## Rules

- Never download, index, or update the local documentation yourself. Delegate
  that work to the Librarian agent through the task tool.
- Prefer the local mirror over the remote URL. Fetch the remote page only when
  the mirror does not cover the topic.
- Keep one name for each set. Use "Vercel CLI" and "AI SDK", not variants.
- Send the Librarian one mission per set, with the exact source, version, and
  target directory.
