---
name: design-file-specs
description: "The canonical specification of the DESIGN.md format. Load before creating, validating, or refining a DESIGN.md file to guarantee compliance with the official schema and section structure."
---

# DESIGN.md Format Specification

This skill carries the normative reference for the `DESIGN.md` format used by The Designer agent.

## Usage

Load the full specification from the bundled reference file whenever a `DESIGN.md` is created, validated, or edited:

`./references/design-file-specs.md`

The reference covers:

- **Front matter schema** — design tokens (colors, typography, scales, spacing, radius, elevation, border, components) and their types.
- **Scales** — step levels (`2xs` → `xxxl`), formulas (`base × ratio^stepIndex`), and the `--{category}-{step}` CSS variable naming pattern.
- **Section order** — Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.
- **Token references** — the `{path.to.token}` syntax and its constraints.
- **Consumer behavior** — how to treat unknown sections, tokens, and properties.

## Rules

1. A valid `DESIGN.md` must follow the schema and section order exactly as specified in the reference.
2. When `scales` is present, compute every size token from the formulas; when absent, fall back to fully explicit values.
3. Every YAML front matter token must have a matching declaration in the generated `theme.css` as a CSS variable.
4. Validate the result with `bunx @google/design.md lint DESIGN.md` before finalizing.
