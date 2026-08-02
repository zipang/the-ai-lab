# The Designer

## Intent

A local, autonomous alternative to services like [Google Stitch](https://stitch.withgoogle.com/). The Designer is a specialized agent that helps web developers create and maintain design systems and style guides inside their project. It works from a text description or a reference URL.

The agent operates inside the project's `design/` directory, where multiple design systems live in parallel:

- `design/experiments/` — works directly linked to the current project.
- `design/references/` — works unrelated to the project, used as inspiration.

## Bundle

The recipe ships one agent and six skills. Each theme directory holds the same set of files: `PRODUCT.md` (product, strategy, brand voice), `DESIGN.md` (the token foundation), `<theme>.css` (the stylesheet), an optional `guide/index.html` (the style guide), and `README.md`. `DESIGN.md` follows Google's [design.md](https://github.com/google-labs-code/design.md) spec.

| Component | Purpose | When the agent loads it |
| :-------- | :------ | :---------------------- |
| Agent `the-designer` | Creates and refines design systems and style guides | Always |
| Skill `design-system-tokens` | Token and `DESIGN.md` specification with reference files and presets | First, when authoring `DESIGN.md` or `<theme>.css` |
| Skill `design-system-frontend` | Rules for authoring HTML and components with the theme tokens | When authoring HTML surfaces |
| Skill `design-system-extract-from-reference` | Extract tokens from a live reference URL with `agent-browser` | When a site is used as inspiration |
| Skill `impeccable` | Interactive refinement commands (polish, critique, audit, adapt, ...) | After the working directory is set |
| Skill `agent-browser` | Browser automation CLI (dependency of extraction) | For any live-page interaction |
| Skill `technical-writing` | Controlled technical English for the recipe's own docs | When updating this recipe |

## Usage

### 1. Install dependencies

- `bun` — runtime used to run the `impeccable` setup script and to serve style guides.
- `node` — used by the `impeccable` skill setup.
- `agent-browser` CLI — required only for the reference-extraction workflow:

```sh
bun add -g agent-browser
agent-browser install   # Downloads Chrome from Chrome for Testing, first time only
```

Deployment of the agent and skills follows the process in the root `AGENTS.md` of this lab.

### 2. Invoke the agent

Start a session and select The Designer agent, then give it a brief:

- From scratch: "Create a new design system named 'OceanFlow' for a fintech dashboard."
- From a reference: "Extract the design language from https://example.com and apply it to our landing page."
- Update existing work: "Make the cards on the dashboard feel bolder and more distinctive."

The agent proposes a plan, asks questions, and iterates on `DESIGN.md` and `<theme>.css`. It refines the surfaces with the `impeccable` commands and confirms before any destructive action.

## References

| Component | Source |
| :-------- | :----- |
| Agent | [`agents/the-designer.md`](./agents/the-designer.md) |
| Skill | [`skills/design-system-tokens/`](./skills/design-system-tokens/SKILL.md) |
| Skill | [`skills/design-system-frontend/`](./skills/design-system-frontend/SKILL.md) |
| Skill | [`skills/design-system-extract-from-reference/`](./skills/design-system-extract-from-reference/SKILL.md) |
| Skill | [`skills/impeccable/`](./skills/impeccable/SKILL.md) |
| Skill | [`skills/agent-browser/`](./skills/agent-browser/SKILL.md) |
| Skill | [`skills/technical-writing/`](./skills/technical-writing/SKILL.md) |
