---
name: askquestion
description: "Use when the agent needs to ask the user a question using the built-in `question` tool. Documents the exact API, correct usage patterns, and common mistakes."
---

# Ask Question Tool

Load this skill before every call to the `question` tool to ensure correct usage.

## Usage Rule

**Always use the `question` tool.** Never ask the user a question inline — use the tool even for binary yes/no questions.

## Tool API

The `question` tool accepts a single parameter:

### `questions` (array, required)

An array of question objects.

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `question` | string | yes | The full question text |
| `header` | string | yes | Very short label (max **30 characters**). Used as tab header in the UI. |
| `options` | array | yes | Array of option objects |
| `multiple` | boolean | no | `true` = user can select **several** options; `false`/omitted = only **one** option |

Each option:

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `label` | string | yes | Display text — **1 to 5 words**, concise |
| `description` | string | yes | Short explanation (1 sentence), adds context beyond the label |

### Return value

Array of selected labels (strings).

## Examples

### Multi-select example (MCP servers)

```json
{
  "questions": [
    {
      "question": "Which MCP servers do you want to enable?",
      "header": "MCP Servers",
      "options": [
        { "label": "image-studio", "description": "AI image generation via Flux, Imagen, DALL-E" },
        { "label": "database", "description": "PostgreSQL read/write access" },
        { "label": "slack", "description": "Slack messaging and notifications" }
      ],
      "multiple": true
    }
  ]
}
```

### Single-select example (environment)

```json
{
  "questions": [
    {
      "question": "Which environment are you deploying to?",
      "header": "Environment",
      "options": [
        { "label": "Production", "description": "Live production environment" },
        { "label": "Staging", "description": "Pre-production staging environment" },
        { "label": "Development", "description": "Local or dev environment" }
      ]
    }
  ]
}
```

### Binary example (yes/no)

```json
{
  "questions": [
    {
      "question": "Proceed with database migration?",
      "header": "Migration",
      "options": [
        { "label": "Yes", "description": "Run the migration now" },
        { "label": "No", "description": "Cancel and do nothing" }
      ]
    }
  ]
}
```

### Multiple questions example

```json
{
  "questions": [
    {
      "question": "Which MCP servers do you want to enable?",
      "header": "MCP Servers",
      "options": [
        { "label": "image-studio", "description": "AI image generation" },
        { "label": "database", "description": "PostgreSQL access" }
      ],
      "multiple": true
    },
    {
      "question": "Log level for the session?",
      "header": "Log Level",
      "options": [
        { "label": "debug", "description": "Verbose logging" },
        { "label": "info", "description": "Normal logging" },
        { "label": "error", "description": "Errors only" }
      ]
    }
  ]
}
```

## Tool API

The `question` tool accepts a single parameter:

### `questions` (array, required)

An array of question objects. Each object has the following fields:

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `question` | string | yes | The full question text |
| `header` | string | yes | Very short label (max **30 characters**). Used as tab header in the UI. |
| `options` | array | yes | Array of option objects |
| `multiple` | boolean | no | `true` = user can select **several** options; `false`/omitted = only **one** option |

Each option:

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `label` | string | yes | Display text — **1 to 5 words**, concise |
| `description` | string | yes | Short explanation (1 sentence), adds context beyond the label |

### Return value

Array of selected labels (strings).

## Usage Rules

### Rule 1 — One `question` entry per logical topic

Do not bundle unrelated questions into a single object. Each question in the array must be a distinct, self-contained topic.

### Rule 2 — Set `multiple: true` when the user may select several items

Single choice → omit `multiple` (defaults to `false`).
Multi-select → set `"multiple": true`.

### Rule 3 — `header` ≤ 30 characters (1–3 words)

Short tab-style label only. No full sentences.

### Rule 4 — `label` is 1–5 words, scannable

The user clicks/taps the label. Keep it short.

### Rule 5 — `description` adds context, does not repeat the label

Always provide information beyond what the label already says.

### Rule 6 — Match the user's language

Use the same language as the user's request for all text fields.

## Common Mistakes

| Mistake | Consequence | Fix |
| :------ | :---------- | :-- |
| Asking inline instead of using the tool | Skill contract is violated | Always use `question` tool |
| Forgetting `multiple: true` on multi-select | User can only pick one item | Add `"multiple": true` |
| Merging unrelated questions | Confusing UI | Split into separate entries |
| Header > 30 chars | UI truncation | Shorten to 1–3 words |
| Label > 5 words | Hard to scan | Shorten, move detail to `description` |
| Asking questions the user didn't request | Frustration | Only ask what is necessary |
| Fewer than 2 options | User cannot meaningfully choose | Always provide ≥ 2 options |
| `description` repeats `label` verbatim | Wasted space | Add new info or leave brief |

## Validation checklist

- [ ] Did you use the `question` tool? (Never ask inline.)
- [ ] Does every entry have a `header` ≤ 30 chars with ≥ 2 `options`?
- [ ] Is `multiple` correctly set (true for multi-select, omitted for single)?
- [ ] Are labels ≤ 5 words and descriptions non-redundant?
- [ ] Are unrelated topics split into separate question objects?
- [ ] Is the language consistent with the user's request?
