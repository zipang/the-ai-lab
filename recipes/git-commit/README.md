# Git Commit Workflow

## Intent

Standardize how the agent creates git commits: atomic, well-formatted commits with conventional messages (`<emoji> <type>: <description>`) and a mandatory human-in-the-loop confirmation before any commit or push.

## Usage

### 1. Deploy the skill

```bash
mkdir -p .agents/skills
cp -r skills/git-commit .agents/skills/
```

### 2. Deploy the command

```bash
mkdir -p .opencode/commands
cp commands/commit.md .opencode/commands/
```

### 3. Configure custom instructions

Add the rule to `.opencode/instructions.md` (registered in `opencode.json`):

```markdown
**Git Commits**: WHEN a `git commit` is required you MUST always use the `git-commit` skill to handle the staging and committing of files. This ensures atomic, well-formatted commits. **Safety First**: Propose your commit plan and wait for explicit user confirmation before executing any commit or push using a `(YES|no)` prompt where `YES` is the default.
```

If `opencode.json` doesn't exist, create it with:

```json
{
  "instructions": [".opencode/instructions.md"]
}
```

### 4. Usage

Trigger the workflow by:
- Using the `/commit` command (e.g., `/commit "update documentation"`)
- Prompting something like "Commit my changes" or "Commit the changes in src/main.js"

The command accepts an optional parameter to help the agent identify which files to stage and provide context for the commit message.

## References

| Component | Source |
| :-------- | :----- |
| Skill | [`skills/git-commit/`](./skills/git-commit/SKILL.md) |
| Command | [`commands/commit.md`](./commands/commit.md) |
