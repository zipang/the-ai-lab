# Agent Browser

## Intent

Enable browser automation for AI agents: navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, and automating any browser task (including Electron desktop apps, Slack, and cloud browsers). Ships as a skill that drives the fast native Rust `agent-browser` CLI.

## Usage

The skill requires the `agent-browser` binary. Install it globally:

```sh
bun add -g agent-browser
agent-browser install  # Download Chrome from Chrome for Testing (first time only)
```

Deployment of the skill follows the process in the root `AGENTS.md` of this lab.

## References

| Component | Source |
| :-------- | :----- |
| Skill | [`skills/agent-browser/`](./skills/agent-browser/SKILL.md) |
