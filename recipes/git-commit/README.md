# Git Commit Workflow (@the-ai-lab/recipes/git-commit)

This recipe contains one skill. It standardizes how the agent creates git commits.
Each commit is atomic and uses a conventional message (`<emoji> <type>: <description>`).
The skill asks for human confirmation before every commit or push.

## Usage

Ask the agent to commit, or run the `/commit` command:

- "Commit my changes."
- "Commit the changes in src/components/."
- `/commit "update documentation"`

## Content

| Component | Source |
| :-------- | :----- |
| Skill | [`git-commit`](./skills/git-commit/SKILL.md) |
| Command | [`/commit`](./commands/commit.md) |
