# Git Commit Workflow

This recipe provides a standardized workflow for creating well-formatted git commits using conventional commit types and emojis grouped by intent.

## Key Features

- **Atomic Commits**: Prevents adding unrelated changes into a single commit.
- **Conventional Format**: Enforces `<emoji> <type>: <description>`.
- **Interactive Staging**: Prompts the user to select logical groups of changes if nothing is staged.
- **Automatic Push**: Pushes changes to the remote repository after a successful commit.

## Installation

To enable well-formatted, atomic commits in a new project, follow these steps:

### 1. Copy the files

To install the workflow, the agent must first ask the user for the absolute path to the target project's root directory. Once provided, copy the following files into the project's `.opencode` directory:

- [SKILL.md](./SKILL.md): The workflow that analyzes changes, suggests a message, and executes the commit.
- [commit.md](./commit.md): A custom command (`/commit`) to trigger the skill.

**Installation Commands (for the agent):**

```bash
# Create directories (if needed)
mkdir -p .opencode/skills/git-commit
mkdir -p .opencode/commands

# Copy files (assuming you are in this recipe folder)
cp SKILL.md .opencode/skills/git-commit/SKILL.md
cp commit.md .opencode/commands/commit.md
```

### 2. Mandatory Usage Rule
Add the following rule to your project's `AGENTS.md` or `.opencode/instructions.md` to ensure the agent always uses the skill:

```markdown
**Git Commits**: WHEN a `git commit` is required you MUST always use the `git-commit` skill to handle the staging and committing of files. This ensures atomic, well-formatted commits.
```

### 3. Usage
Once installed, the user will be able to trigger the git commit workflow by :
- Using the `/commit` command (e.g., `/commit "update documentation"`)
- Prompt something like "Commit my changes" or "Commit the changes in src/main.js"

The command accepts an optional parameter to help the agent identify which files to stage and provide context for the commit message.

