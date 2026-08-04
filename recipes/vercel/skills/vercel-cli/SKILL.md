---
name: vercel-cli
description: Use when operating the Vercel platform through the vercel CLI: deploy, build, link, pull, env, logs, domains, alias, dns, certs, rollback, promote, teams, tokens. Load before running any vercel command.
---

# Vercel CLI

Use the `vercel` command to manage a Vercel project from the terminal. This
skill gives the command reference, the workflows, and the safety rules.

## Install and authenticate

Install the CLI globally:

```bash
bun add -g vercel
```

Log in:

```bash
vercel login
```

Check the identity:

```bash
vercel whoami
```

For CI/CD, use a token instead of interactive login:

```bash
export VERCEL_TOKEN=...
vercel deploy --non-interactive
```

The `--token` flag and the `VERCEL_TOKEN` environment variable both work.
The flag takes precedence. Prefer the environment variable because it does
not expose the token in process lists.

## Global options

| Option | Shorthand | Purpose |
|--------|-----------|---------|
| `--token` | `-t` | Authenticate with a token |
| `--scope` | `-S` | Run the command for another scope |
| `--team` | `-T` | Run the command for a team |
| `--project` | | Select a project by name or ID |
| `--cwd` | | Set the working directory |
| `--local-config` | `-A` | Use a specific `vercel.json` |
| `--prod` | | Target the production environment |
| `--yes` | `-y` | Skip confirmations |
| `--debug` | `-d` | Show verbose output |
| `--non-interactive` | | Run without prompts |

Set these environment variables to skip project linking in CI/CD:

```
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

## Project setup

| Task | Command |
|------|---------|
| Link a local directory to a project | `vercel link` |
| Create a project | `vercel project add` |
| List projects | `vercel project ls` |
| Show project settings | `vercel project inspect [name]` |
| Pull env vars and settings | `vercel pull` |
| Pull for a specific environment | `vercel pull --environment=production` |
| Start an example project | `vercel init [name]` |

## Local development

Run the project locally with the Vercel environment:

```bash
vercel dev
vercel dev --port 3000
```

## Build and deploy

| Task | Command |
|------|---------|
| Build locally | `vercel build` |
| Build for production | `vercel build --prod` |
| Deploy a preview | `vercel` |
| Deploy to production | `vercel deploy --prod` |
| List recent deployments | `vercel list` |
| Show a deployment | `vercel inspect [url]` |
| Show deployment logs | `vercel inspect [url] --logs` |
| Redeploy an existing deployment | `vercel redeploy [url]` |
| Promote a deployment | `vercel promote [url]` |
| Roll back production | `vercel rollback` |
| Find the deployment that broke a build | `vercel bisect` |
| Remove deployments | `vercel remove [url]` |

## Environment variables

| Task | Command |
|------|---------|
| List env vars | `vercel env ls` |
| Add an env var | `vercel env add [name] [environment]` |
| Update an env var | `vercel env update [name] [environment]` |
| Remove an env var | `vercel env rm [name] [environment]` |
| Pull env vars into a local file | `vercel env pull [file]` |
| Run a command with env vars | `vercel env run -- <command>` |

## Domains, aliases, DNS, and certificates

| Task | Command |
|------|---------|
| List custom domains | `vercel domains ls` |
| Add a domain | `vercel domains add [domain] [project]` |
| Remove a domain | `vercel domains rm [domain]` |
| List aliases | `vercel alias ls` |
| Set an alias | `vercel alias set [url] [domain]` |
| Remove an alias | `vercel alias rm [domain]` |
| List DNS records | `vercel dns ls [domain]` |
| Add a DNS record | `vercel dns add [domain] [name] [type] [value]` |
| Remove a DNS record | `vercel dns rm [id]` |
| List certificates | `vercel certs ls` |
| Issue a certificate | `vercel certs issue [domain]` |

## Observability

| Task | Command |
|------|---------|
| Show runtime logs | `vercel logs [url]` |
| Follow logs | `vercel logs [url] --follow` |
| Show account metrics | `vercel metrics` |
| Show request traces | `vercel traces` |
| List activity events | `vercel activity ls` |

## Account and team

| Task | Command |
|------|---------|
| Show the current user | `vercel whoami` |
| Log out | `vercel logout` |
| Switch team scope | `vercel switch` |
| List teams | `vercel teams list` |
| Invite to a team | `vercel teams invite [email]` |
| List tokens | `vercel tokens ls` |
| Create a token | `vercel tokens add [name]` |
| Show usage and costs | `vercel usage` |

## Workflows

### Deploy a project

1. Link the directory. Run `vercel link`.
2. Test locally. Run `vercel dev`.
3. Build locally. Run `vercel build`.
4. Deploy to production. Run `vercel deploy --prod`.

### Roll back production

1. List recent deployments. Run `vercel list`.
2. Promote the working deployment. Run `vercel promote [url]`.

## Safety rules

- Confirm before destructive actions. This includes `remove`, `rm`,
  `rollback`, `promote`, and cache purge.
- Never print a token. Prefer the `VERCEL_TOKEN` environment variable over
  the `--token` flag.
- Use `--non-interactive` in scripts and CI/CD.
- Prefer the local mirror (see the `vercel-docs` skill) before you fetch
  https://vercel.com/docs/cli. When unsure about a flag, read the local
  chapter, then run `vercel help <command>`.
