#!/usr/bin/env bun
/**
 * list-recipes.ts
 *
 * Lists every recipe inside an @the-ai-lab reference.
 *
 * A recipe is a directory directly under `<root>/recipes/` that contains a
 * README.md file. Directories without a README.md are not recipes and are
 * skipped.
 *
 * Usage:
 *   bun run list-recipes.ts <the-ai-lab-root> [--json]
 *
 *   the-ai-lab-root  Resolved filesystem path of the @the-ai-lab reference.
 *   --json           Emit one JSON array on stdout instead of plain lines.
 *
 * Exit codes:
 *   0  success
 *   1  invalid arguments
 *   2  the recipes/ directory does not exist in the reference root
 */

import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const HELP = args.includes("--help");
const JSON_OUT = args.includes("--json");
const root = args.find((a) => !a.startsWith("--"));

function printUsage(stream = console.log) {
  stream("Usage: bun run list-recipes.ts <the-ai-lab-root> [--json]");
  stream("");
  stream("Lists every recipe under <the-ai-lab-root>/recipes/.");
  stream("A recipe is a directory that contains a README.md file.");
  stream("");
  stream("  the-ai-lab-root  Resolved filesystem path of the @the-ai-lab reference.");
  stream("  --json           Emit one JSON array on stdout instead of plain lines.");
}

if (HELP) {
  printUsage();
  process.exit(0);
}

if (!root) {
  printUsage(console.error);
  process.exit(1);
}

const recipesDir = join(root, "recipes");
if (!existsSync(recipesDir) || !statSync(recipesDir).isDirectory()) {
  console.error(`Error: ${recipesDir} does not exist or is not a directory.`);
  process.exit(2);
}

const names = readdirSync(recipesDir)
  .filter((name) => {
    const dir = join(recipesDir, name);
    return statSync(dir).isDirectory() && existsSync(join(dir, "README.md"));
  })
  .sort();

if (JSON_OUT) {
  const items = names.map((name) => ({ name, path: join("recipes", name) }));
  console.log(JSON.stringify(items, null, 2));
} else {
  for (const name of names) console.log(name);
}
