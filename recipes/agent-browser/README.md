# Agent Browser

## Intent

Enable browser automation for AI agents: navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, and automating any browser task (including Electron desktop apps, Slack, and cloud browsers). Ships as a skill that drives the fast native Rust `agent-browser` CLI.

## Usage

### 1. Deploy the skill

Copy the skill directory so it is auto-discovered (no renaming needed):

```bash
mkdir -p .agents/skills
cp -r skills/agent-browser .agents/skills/
```

### 2. Install the CLI

The skill requires the `agent-browser` binary. Install it globally:

```sh
bun add -g agent-browser
agent-browser install  # Download Chrome from Chrome for Testing (first time only)
```

## References

| Component | Source |
| :-------- | :----- |
| Skill | [`skills/agent-browser/`](./skills/agent-browser/SKILL.md) |
