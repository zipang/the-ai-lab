#!/usr/bin/env bun
/**
 * remove-recipe.ts
 *
 * Removes a deployed recipe from a target project.
 *
 * The script derives the component names from the source recipe in the
 * @the-ai-lab reference and deletes their deployed copies:
 *
 *   <target>/.opencode/agents/<...>.md
 *   <target>/.agents/skills/<skill>/
 *   <target>/.opencode/commands/<...>.md
 *
 * The script does not revert recipe-specific configuration (references in
 * opencode.json, instructions files, global binaries). The caller must read
 * the recipe README and revert those extra steps separately.
 *
 * Safe default: without --confirm the script only prints the plan and exits.
 *
 * Usage:
 *   bun run remove-recipe.ts <the-ai-lab-root> <recipe-name> [options]
 *
 * Options:
 *   --target <dir>  Target project root. Defaults to the current directory.
 *   --dry-run       Report what would be deleted without deleting anything.
 *   --confirm       Required to delete anything.
 *   --json          Emit a JSON summary on stdout.
 *
 * Exit codes:
 *   0  success (or dry-run plan printed)
 *   1  invalid arguments
 *   2  the recipe does not exist in the reference
 *   3  one or more components failed to remove
 */

import { existsSync, lstatSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const HELP = args.includes("--help");
const DRY_RUN = args.includes("--dry-run");
const CONFIRM = args.includes("--confirm");
const JSON_OUT = args.includes("--json");

const positional = args.filter((a) => !a.startsWith("--"));
const [root, recipeName] = positional;

const targetFlag = args.indexOf("--target");
const target = targetFlag !== -1 ? args[targetFlag + 1] : ".";

/** True when a path exists, including a broken symlink. */
function pathEntryExists(p) {
  try {
    lstatSync(p);
    return true;
  } catch {
    return false;
  }
}

function printUsage(stream = console.log) {
  stream("Usage: bun run remove-recipe.ts <the-ai-lab-root> <recipe-name> [options]");
  stream("");
  stream("Removes the deployed components of the recipe from the target project.");
  stream("");
  stream("Options:");
  stream("  --target <path>  Target project root. Defaults to the current directory.");
  stream("  --dry-run        Report what would be deleted without deleting anything.");
  stream("  --confirm        Required to delete anything. Without it, print the plan.");
  stream("  --json           Emit a JSON summary on stdout.");
}

if (HELP) {
  printUsage();
  process.exit(0);
}

if (!root || !recipeName) {
  printUsage(console.error);
  process.exit(1);
}

const recipeDir = join(root, "recipes", recipeName);
if (!existsSync(recipeDir) || !existsSync(join(recipeDir, "README.md"))) {
  console.error(`Error: recipe "${recipeName}" not found under ${root}/recipes/.`);
  process.exit(2);
}

const names = {
  agents: [],
  skills: [],
  commands: [],
};

const agentsDir = join(recipeDir, "agents");
if (existsSync(agentsDir)) {
  for (const name of readdirSync(agentsDir)) {
    if (statSync(join(agentsDir, name)).isFile()) names.agents.push(name);
  }
}

const skillsDir = join(recipeDir, "skills");
if (existsSync(skillsDir)) {
  for (const name of readdirSync(skillsDir)) {
    if (statSync(join(skillsDir, name)).isDirectory()) names.skills.push(name);
  }
}

const commandsDir = join(recipeDir, "commands");
if (existsSync(commandsDir)) {
  for (const name of readdirSync(commandsDir)) {
    if (statSync(join(commandsDir, name)).isFile()) names.commands.push(name);
  }
}

const targets = [
  ...names.agents.map((name) => ({ component: "agent", path: join(target, ".opencode", "agents", name) })),
  ...names.skills.map((name) => ({ component: "skill", path: join(target, ".agents", "skills", name) })),
  ...names.commands.map((name) => ({ component: "command", path: join(target, ".opencode", "commands", name) })),
];

const results = [];
let failed = 0;

for (const item of targets) {
  const exists = pathEntryExists(item.path);
  const result = {
    component: item.component,
    targetPath: relative(target, item.path),
    exists,
    action: exists ? "remove" : "skip (not present)",
  };
  results.push(result);

  if (DRY_RUN) continue;
  if (!exists) continue;
  if (!CONFIRM) continue;

  try {
    rmSync(item.path, { recursive: true, force: true });
  } catch (err) {
    failed++;
    result.error = err instanceof Error ? err.message : String(err);
    result.action = "FAILED";
  }
}

const onlyPlanned = !CONFIRM && !DRY_RUN;

if (JSON_OUT) {
  console.log(JSON.stringify({ recipe: recipeName, dryRun: DRY_RUN, confirm: CONFIRM, operations: results }, null, 2));
} else {
  console.log(`Recipe: ${recipeName}`);
  for (const r of results) {
    console.log(`  ${r.action} ${r.component}: ${r.targetPath}${r.error ? ` - ${r.error}` : ""}`);
  }
  if (onlyPlanned) {
    console.log("Plan only. Run with --confirm to delete the files.");
  } else if (DRY_RUN) {
    console.log("DRY-RUN: no file was deleted.");
  } else if (failed) {
    console.error(`${failed} component(s) failed to remove.`);
  } else {
    console.log("Done.");
  }
}

process.exit(failed ? 3 : 0);