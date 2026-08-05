#!/usr/bin/env bun
/**
 * deploy-recipe.ts
 *
 * Deploys a recipe from an @the-ai-lab reference into a target project.
 *
 * The script copies (install) or symlinks (test) every component of the
 * recipe to its destination:
 *
 *   recipes/<name>/agents/*.md      -> <target>/.opencode/agents/
 *   recipes/<name>/skills/<skill>/  -> <target>/.agents/skills/<skill>/
 *   recipes/<name>/commands/*.md    -> <target>/.opencode/commands/
 *
 * The script does not apply recipe-specific configuration (references in
 * opencode.json, instructions files, global binaries). The caller must read
 * the recipe README and apply those extra steps separately.
 *
 * Usage:
 *   bun run deploy-recipe.ts <the-ai-lab-root> <recipe-name> [options]
 *
 * Options:
 *   --target <dir>  Target project root. Defaults to the current directory.
 *   --symlink       Symlink components instead of copying them (test mode).
 *   --dry-run       Report what would change without modifying any file.
 *   --json          Emit a JSON summary on stdout.
 *
 * Exit codes:
 *   0  success
 *   1  invalid arguments
 *   2  the recipe does not exist in the reference
 *   3  one or more components failed to deploy
 */

import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  symlinkSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const args = process.argv.slice(2);
const HELP = args.includes("--help");
const SYMLINK = args.includes("--symlink");
const DRY_RUN = args.includes("--dry-run");
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
  stream("Usage: bun run deploy-recipe.ts <the-ai-lab-root> <recipe-name> [options]");
  stream("");
  stream("Copies (install) or symlinks (test) every component of the recipe");
  stream("into the target project.");
  stream("");
  stream("Options:");
  stream("  --target <path>  Target project root. Defaults to the current directory.");
  stream("  --symlink        Symlink components instead of copying them (test mode).");
  stream("  --dry-run        Report what would change without modifying any file.");
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

const operations = [];

const agentsDir = join(recipeDir, "agents");
if (existsSync(agentsDir)) {
  for (const name of readdirSync(agentsDir)) {
    const src = join(agentsDir, name);
    if (!statSync(src).isFile()) continue;
    operations.push({
      component: "agent",
      source: src,
      destination: join(target, ".opencode", "agents", name),
    });
  }
}

const skillsDir = join(recipeDir, "skills");
if (existsSync(skillsDir)) {
  for (const name of readdirSync(skillsDir)) {
    const src = join(skillsDir, name);
    if (!statSync(src).isDirectory()) continue;
    operations.push({
      component: "skill",
      source: src,
      destination: join(target, ".agents", "skills", name),
    });
  }
}

const commandsDir = join(recipeDir, "commands");
if (existsSync(commandsDir)) {
  for (const name of readdirSync(commandsDir)) {
    const src = join(commandsDir, name);
    if (!statSync(src).isFile()) continue;
    operations.push({
      component: "command",
      source: src,
      destination: join(target, ".opencode", "commands", name),
    });
  }
}

const results = [];
let failed = 0;

for (const op of operations) {
  const action = SYMLINK ? "symlink" : "copy";
  const result = {
    ...op,
    action,
    targetPath: relative(target, op.destination),
  };
  results.push(result);

  if (DRY_RUN) continue;

  try {
    const parent = dirname(op.destination);
    if (!existsSync(parent)) mkdirSync(parent, { recursive: true });
    if (pathEntryExists(op.destination)) {
      rmSync(op.destination, { recursive: true, force: true });
    }
    if (SYMLINK) {
      symlinkSync(op.source, op.destination);
    } else if (op.component === "skill") {
      cpSync(op.source, op.destination, { recursive: true });
    } else {
      cpSync(op.source, op.destination);
    }
  } catch (err) {
    failed++;
    result.error = err instanceof Error ? err.message : String(err);
  }
}

if (JSON_OUT) {
  console.log(
    JSON.stringify(
      { recipe: recipeName, mode: SYMLINK ? "symlink" : "copy", dryRun: DRY_RUN, operations: results },
      null,
      2
    )
  );
} else {
  console.log(`Recipe: ${recipeName}`);
  console.log(`Mode: ${SYMLINK ? "symlink (test)" : "copy (install)"}`);
  for (const r of results) {
    const flag = r.error ? "FAILED" : `${r.action}${DRY_RUN ? " (dry-run)" : ""}`;
    console.log(`  ${flag} ${r.component}: ${r.targetPath}${r.error ? ` - ${r.error}` : ""}`);
  }
  if (DRY_RUN) {
    console.log("DRY-RUN: no file was modified.");
  } else if (failed) {
    console.error(`${failed} component(s) failed.`);
  } else {
    console.log("Done.");
  }
}

process.exit(failed ? 3 : 0);