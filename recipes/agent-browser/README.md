# Agent Browser (@the-ai-lab/recipes/agent-browser)

This recipe contains one skill. It drives the native Rust `agent-browser` CLI from the agent.
Use it to navigate pages, fill forms, click buttons, take screenshots, extract data, and
automate any browser task, including Electron desktop apps and cloud browsers.

## Usage

Ask the agent to drive the browser:

- "Open https://example.com and take a screenshot."
- "Fill the login form on this page with these values."
- "Scrape the product list from the catalog page."

## Content

| Component | Source |
| :-------- | :----- |
| Skill | [`agent-browser`](./skills/agent-browser/SKILL.md) |

## Dependencies

This recipe requires the `agent-browser` binary. Install it globally and download Chrome once:

```sh
bun add -g agent-browser
agent-browser install
```
