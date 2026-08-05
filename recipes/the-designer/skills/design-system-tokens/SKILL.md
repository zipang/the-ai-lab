---
name: design-system-tokens
description: This skill will teach you how to read/update/apply the Design System rules defined as a set of tokens (CSS variables) that define the palette (or theme) inside a ready-to-use stylesheet and a set of rules and instructions to apply the same set of tokens with additional constraint to build every UI components (DESIGN.md file). 
---

# A standardised Design System Approach based on Google open specs

In this approach a Design System is composed of two main deliverables : 

- **`DESIGN.md`**: The foundation of your design system. This file follows the specifications provided in [google-labs-code/design.md](https://github.com/google-labs-code/design.md).
- **`<theme>.css`**: A CSS file containing all the CSS variables and class definitions required to implement the Design System.

# 1. Overview

The stylesheet defines the _theme_.
The theme is only one part of a design system : it defines the palette of usable values to build styled components.
The other part of the Design System is covered inside the `DESIGN.md` file with instructions and rules to apply this set of tokens to the components.

The stylesheet contains a fixed list of design tokens exposed as CSS variables that cover the following aspects of the Design System :

- **Typography** — font families, sizes, weights, line-heights, letter-spacing
- **Colors** — brand, action, text, surface
- **Spacing** — the spatial rhythm scale
- **Rounded** — corner radius presets
- **Elevation** — shadow presets
- **Borders** — border width presets

Motion, focus rings, and other interaction states are **not** part of the stylesheet tokens. They are defined inside the `DESIGN.md` components sections where they are used.

# 2. The dual-file token contract

The **same fixed list of design tokens** is authored twice :

1. **Flattened** as CSS variables inside a single `:root` block of the `<theme>.css` stylesheet.
2. **Structured** as YAML front matter at the top of the `DESIGN.md` file, following [Google's DESIGN.md specification](https://github.com/google-labs-code/design.md).

The token tables in sections 3–8 below are the **normative mapping** between the two representations. Each table row gives :

- **Token path** — the dotted path inside the `DESIGN.md` front matter (e.g. `typography.base.fontFamily`).
- **CSS variable** — the flattened variable name inside `<theme>.css` (e.g. `--font-family-base`).
- **Required** — `Y` if the token must be given a value in the front matter; `N` if it is optional.
- **Default** — the fallback value used in the stylesheet when the token is not defined in the front matter. For non-required tokens this is always a `var(--…)` reference to a required token.
- **Description** — the intended usage of the token.

## Required vs optional tokens

The **stylesheet must define every token** in the fixed list — both required and optional. The **front matter only lists the tokens the designer chose to define** — all required tokens plus any optional tokens they customized.

When an optional token is **absent** from the front matter, the stylesheet still declares it with a `var()` fallback to an existing value :

```css
/* Required — value comes from the front matter */
--color-brand-primary: #ffce3a;

/* Optional tokens — if not defined they fall back to primary */
--color-brand-secondary: var(--color-brand-primary);
--color-brand-tertiary:  var(--color-brand-primary);
```

When an optional token **is** present in the front matter, its value overrides the fallback in the stylesheet.

**Rule :** the **Default** column for every non-required token in the tables below is a `var(--…)` reference to a required token. This guarantees that every optional token resolves to a concrete value even when the designer omits it.

## Google's front-matter families

Google's specification defines five top-level families for the front matter :

- `colors` — color tokens
- `typography` — typography tokens (entries are objects with `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing` properties)
- `rounded` — corner radius tokens
- `spacing` — spacing scale tokens
- `components` — component-level token groups (used in the `## Components` prose section, not in the raw token tables)

This skill adds two **custom top-level families** that the spec silently accepts (unknown keys are preserved, not errored) :

- `elevation` — shadow presets
- `border` — border width presets

Link and border *colors* are **not** design tokens. It is the responsibility of individual components (Link, Card, etc.) to pick the color tokens they need for their states and variants — see the `components` family and the Link example in section 9.

## The "drop `.base`" rule

When a token path ends in `.base`, the corresponding CSS variable **drops** the `base` segment. The `.base` variant is the default, un-suffixed form.

| Token path (front matter) | CSS variable (stylesheet) |
|---|---|
| `colors.text.base` | `--color-text` |
| `colors.surface.base` | `--color-surface` |

All other variants keep their name : `colors.text.accent` → `--color-text-accent`, `colors.surface.alt` → `--color-surface-alt`, etc.

## Token presents only in the theme stylesheet

There is no entry for the font size, line height, letter spacing in DESIGN.md spec (these values are par of a typography.<name> object)
However, the accepted values are defined inside the theme stylesheet with a list of CSS variables.

## Color variants

Some components may use slightly tweaked color variants when switching state. 
Buttons or links for instance should clearly indicate their `:disabled` or `:active` state.
For that purpose, color variants for the `muted` and `active` state are derived from each color brand and action entries inside a dedicated stylesheet based on the theme's values.

- They are generated in a separate [`color-variants.css`](./references/color-variants.css) file, included after the main theme stylesheet.
- The `## Colors` prose section of `DESIGN.md` should document the derivation rule (see section 4).
- Component sections inside the `DESIGN.md` file should explain how each component use these color variants to indicate their state.

# 3. Typography

Define font family and give each font a semantic role inside : `base` (body), `display` (headings), `mono` (code, labels).

## Font families

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
| `typography.base.fontFamily` | `--font-family-base` | Y | `sans-serif` | Body text and general UI font |
| `typography.display.fontFamily` | `--font-family-display` | Y | `serif` | Headings and large display text |
| `typography.mono.fontFamily` | `--font-family-mono` | N | `var(--font-family-base)` | Code, labels, monospaced content |

## Typographic scale

Use a geometric scale (`1.125` Minor Second, `1.25` Major Third, `1.333` Perfect Fourth, `1.5` Perfect Fifth, `1.618` Golden Ratio) or a linear scale (e.g. `2px` steps) to generate the values `xs` through `display`.

**Note :** `typography.base.fontSize` is the step 0 and is always equal to `1rem`. All values are in `rem` units.

The formula for a geometric scale with ratio `r` is: `size(step) = 1rem * r^step`, where `base` = step 0, `xs` = step -2, `sm` = step -1, `lg` = step +1, `xl` = step +2, `2xl` = step +3, `display` = step +4.

| Token path | CSS variable | Required | Default (r = 1.5) | Description |
|---|---|---|---|---|
|  | `--font-size-xs` | Y | `0.444rem` | Captions, metadata, timestamps |
|  | `--font-size-sm` | Y | `0.667rem` | Secondary text, list rows |
|  | `--font-size-base` | Y | `1rem` | Body text (step 0 = 1rem) |
|  | `--font-size-lg` | Y | `1.5rem` | Section titles, card titles |
|  | `--font-size-xl` | Y | `2.25rem` | Page titles, large prompts |
|  | `--font-size-2xl` | N | `var(--font-size-xl)` | Hero titles, large headings |
|  | `--font-size-display` | N | `var(--font-size-xl)` | Hero / banner headlines |

## Font weights

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
|  | `--font-weight-regular` | Y | `400` | Body text, default weight |
|  | `--font-weight-medium` | Y | `500` | Buttons, labels, navigation |
|  | `--font-weight-semibold` | N | `var(--font-weight-bold)` | Emphasized labels, sub-headings |
|  | `--font-weight-bold` | Y | `700` | Headings, emphasized titles |
|  | `--font-weight-extrabold` | N | `var(--font-weight-bold)` | Strong emphasis, display text |

## Line heights

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
|  | `--line-height-tight` | Y | `1.15` | Headings, single-line titles |
|  | `--line-height-snug` | N | `var(--line-height-tight)` | Compact descriptions, UI text |
|  | `--line-height-normal` | Y | `1.55` | Body text, multi-line descriptions |
|  | `--line-height-relaxed` | N | `var(--line-height-normal)` | Long-form reading, comments |

## Letter spacing

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
|  | `--letter-spacing-tight` | Y | `-0.02em` | Large headings, display text |
|  | `--letter-spacing-normal` | Y | `0` | Body text, default tracking |
|  | `--letter-spacing-wide` | N | `var(--letter-spacing-normal)` | Small labels, metadata |
|  | `--letter-spacing-wider` | N | `var(--letter-spacing-normal)` | Uppercase chips, buttons, overlines |

# 4. Colors

The color palette is divided into four categories : `brand`, `action`, `text`, and `surface`.

Link and border *colors* are **not** tokens — they are not part of the palette. Individual components pick the color tokens they need for their states (see the Link component example in section 9).

## Brand colors

The first and most important colors. At minimum a `colors.brand.primary` and a `colors.brand.accent` are required. Optional additions: `colors.brand.secondary`, `colors.brand.tertiary`.

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
| `colors.brand.accent` | `--color-brand-accent` | Y | `hsl(44, 100%, 53%)` | Brand accent color — CTAs, key accents |
| `colors.brand.primary` | `--color-brand-primary` | Y | `hsl(86, 75%, 55%)` | Primary brand color — headings, highlights, contrast, logo, header |
| `colors.brand.secondary` | `--color-brand-secondary` | N | `var(--color-brand-primary)` | Additional brand color — for surfaces |
| `colors.brand.tertiary` | `--color-brand-tertiary` | N | `var(--color-brand-primary)` | Additional brand color — for surfaces |

## Action colors

Semantic colors for feedback states.

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
| `colors.action.success` | `--color-action-success` | Y | `hsl(86, 75%, 55%)` | Success states, confirmations, positive feedback |
| `colors.action.info` | `--color-action-info` | Y | `#0284c7` | Informational messages, neutral notifications |
| `colors.action.warning` | `--color-action-warning` | Y | `#eab308` | Warnings, cautionary messages |
| `colors.action.danger` | `--color-action-danger` | Y | `#dc2626` | Errors, destructive actions, critical alerts |

## Text colors

Only `colors.text.base` is required.
The variants are optional and cover hierarchy and emphasis. If no value is found, the variant falls back to `var(--color-text)`.

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
| `colors.text.base` | `--color-text` | Y | `#000` | Default body text color (`<p>`) |
| `colors.text.accent` | `--color-text-accent` | N | `var(--color-text)` | Accented text —links, headings, highlighted text |
| `colors.text.subtle` | `--color-text-subtle` | N | `var(--color-text)` | Subdued text — secondary, tertiary content |
| `colors.text.ondark` | `--color-text-ondark` | N | `var(--color-surface)` | Text on dark surfaces — footer, dark sections |
| `colors.text.selected` | `--color-text-selected` | N | `var(--color-text)` | Text color on selected / focused elements |

## Surface colors

Background colors for surfaces like pages sections or cards.
At minimum two surfaces are required: `colors.surface.base` (exposed as `--color-surface`) and `colors.surface.alt`.

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
| `colors.surface.base` | `--color-surface` | Y | `#ffffff` | Default page / section background |
| `colors.surface.alt` | `--color-surface-alt` | Y | `#fbfaf7` | Alternating section backgrounds |
| `colors.surface.dark` | `--color-surface-dark` | N | `var(--color-text)` | Dark surfaces — footer, dark sections |
| `colors.surface.card` | `--color-surface-card` | N | `var(--color-surface)` | Card, forms surfaces |

## Color variants derivation

Brand and action colors carry `muted` and `active` variants that are **derived automatically** from the base color via CSS relative color syntax. These variants are **not design tokens** — they do not appear in the front matter. They live in a dedicated [`color-variants.css`](./references/color-variants.css) file, included after the main theme stylesheet.

**Derivation rules :**

- **`muted`** — less saturated, lighter : the softened, resting variant.
  ```css
  --color-brand-primary-muted: hsl(from var(--color-brand-primary) h calc(s * 0.8) calc(l * 1.2));
  ```
- **`active`** — more saturated, lighter : the vivid variant for hover/pressed states.
  ```css
  --color-brand-primary-active: hsl(from var(--color-brand-primary) h calc(s * 1.2) calc(l * 1.1));
  ```

Only `brand` and `action` colors carry these variants, because they are used on interactive elements with states. Text and surface colors define their own variants explicitly in the tables above.

**In `DESIGN.md`** — add a `### Color variants` subsection under `## Colors` documenting the derivation rule in prose, so agents know the variants exist and how they are produced. Do not list the variants as tokens in the front matter.

# 5. Spacing

Choose a linear (e.g. `4px` steps) or a geometric scale (`1.5` or `2` ratio) to create the full series from `spacing.xs` to `spacing.xxl`.

**Note :** `spacing.base` is the step 0 and is always equal to `1rem`. All values are in `rem` units.

The formula for a linear scale with step `s` (in px) is: `space(step) = s * step`, where `base` = step 1 (16px), `xs` = step 1 (4px), `sm` = step 2 (8px), `md` = step 3 (12px), `lg` = step 5 (20px), `xl` = step 8 (32px), `xxl` = step 12 (48px).

| Token path | CSS variable | Required | Default (4px linear) | Description |
|---|---|---|---|---|
| `spacing.xs` | `--space-xs` | Y | `0.25rem` (4px) | Tight gaps, icon-to-text spacing |
| `spacing.sm` | `--space-sm` | Y | `0.5rem` (8px) | Compact gaps, chip padding |
| `spacing.md` | `--space-md` | Y | `0.75rem` (12px) | Button padding, card internal spacing |
| `spacing.base` | `--space-base` | Y | `1rem` (16px) | Default spacing, input padding (step 0 = 1rem) |
| `spacing.lg` | `--space-lg` | Y | `1.25rem` (20px) | Section internal spacing, larger card gaps |
| `spacing.xl` | `--space-xl` | Y | `2rem` (32px) | Section-to-section spacing |
| `spacing.xxl` | `--space-xxl` | Y | `3rem` (48px) | Page-level vertical rhythm, section padding |

# 6. Rounded

Corner radius presets for buttons, cards, inputs, and other rectangular shapes.

| Token path | CSS variable | Required | Default | Description |
|---|---|---|---|---|
| `rounded.sm` | `--rounded-sm` | Y | — | Inputs, small badges, default controls |
| `rounded.base` | `--rounded-base` | Y | — | Cards, buttons, default containers |
| `rounded.lg` | `--rounded-lg` | Y | — | Large panels, prominent cards |
| `rounded.full` | `--rounded-full` | Y | `100%` | Circular shapes — avatars, icons, pills |

# 7. Elevation

Elevation presets define the shadow vocabulary. Each preset is associated with a style (flat, brutal, etc.). 

| Token path | CSS variable | Required | Default (flat) | Description |
|---|---|---|---|---|
| `elevation.sm` | `--elevation-sm` | N | `none` | Subtle depth — cards, default raised elements |
| `elevation.md` | `--elevation-md` | N | `none` | Moderate depth — raised cards, modals |
| `elevation.lg` | `--elevation-lg` | N | `none` | Strong depth — dropdowns, popovers, overlays |

Available presets (given as examples, they are not the only options):

- [Flat Design](./presets/elevation/flat.css) — all elevations set to `none`
- [Brutal shadows](./presets/elevation/brutal.css) — solid rectangular offset shadows
- [Material paper](./presets/elevation/material-paper.css) — Google Material-style soft, realistic, ambient + key shadows
- [Neumorphism](./presets/elevation/neumorphism.css) — soft dual light/dark shadows for an extruded-surface feel

# 8. Borders

Border *width* presets define the stroke thickness vocabulary. `border` is a **custom top-level family** in the front matter. Border *colors* are not tokens — components pick the color tokens they need for their border variants.

| Token path | CSS variable | Required | Default (none) | Description |
|---|---|---|---|---|
| `border.sm` | `--border-sm` | Y | `none` | Default stroke — dividers, input borders |
| `border.md` | `--border-md` | Y | `none` | Emphasis stroke — focus rings, active selection |
| `border.lg` | `--border-lg` | Y | `none` | Strong emphasis — drag indicators, prominent outlines |

Available presets:

- [None](./presets/borders/none.css) — all borders set to `none`
- [124](./presets/borders/124.css) — 1px / 2px / 4px
- [macOS](./presets/borders/macos.css) — hairline 0.5px separators, 1px fields, 2px focus

# 9. DESIGN.md example

A complete, annotated example of a `DESIGN.md` file — front matter plus prose sections — is provided in [references/DESIGN.md](./references/DESIGN.md).

It demonstrates :

- Every **required token** defined in the front matter, structured under Google's top-level families (`colors`, `typography`, `rounded`, `spacing`) plus the two custom families (`elevation`, `border`).
- A selection of **optional tokens** overridden by the designer (e.g. `colors.brand.secondary`, `typography.2xl.fontSize`).
- **Optional tokens omitted** from the front matter with inline comments showing the stylesheet fallback (e.g. `# tertiary: omitted → --color-brand-tertiary: var(--color-brand-primary)`).
- The `components:` block with a **Link component** example showing how components pick color tokens for their states.
- The `### Color variants` prose subsection documenting the derived `muted` / `active` rule.
- All prose sections in the canonical Google order : Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.

Inline comments in the front matter map each entry back to its CSS variable in the stylesheet.

# 10. Reference files

| File | Purpose |
|------|---------|
| [references/DESIGN.md](./references/DESIGN.md) | Complete annotated example of a `DESIGN.md` file — front matter plus prose sections. Demonstrates required and optional tokens, stylesheet fallbacks, and the Link component example. |
| [references/styles.css](./references/styles.css) | Complete example of a main theme stylesheet. Exposes every token defined in sections 3–8 as a CSS variable inside a single `:root` block. |
| [references/color-variants.css](./references/color-variants.css) | Derived `muted` / `active` variants for brand and action colors. Include **after** the main theme stylesheet. Not part of the token set. |
| [references/reset.css](./references/reset.css) | Base CSS reset consuming the theme variables. |
| [references/utilities.css](./references/utilities.css) | Class-based utilities to apply the theme variables in a Tailwind fashion. |
| [presets/elevation/](./presets/elevation/) | Elevation presets : `flat.css`, `brutal.css`, `material-paper.css`, `neumorphism.css`. |
| [presets/borders/](./presets/borders/) | Border width presets : `none.css`, `124.css`, `macos.css`, `windows.css`. |

# Validation rules

* **DO NOT ADD ANY NEW UNDOCUMENTED TOKEN** to the stylesheet or to the front matter. Only the tokens listed in sections 3–8 are permitted.
* **The stylesheet must define every token** — both required and optional.
* **The front-matter path → CSS variable mapping must follow the tables** in sections 3–8. The "Token path" column is the front-matter path; the "CSS variable" column is the stylesheet variable.
* **Non-required token defaults must be `var()` references to required tokens.** The "Default" column for every optional token in the tables specifies its fallback. The stylesheet must use this exact fallback when the token is not defined in the front matter.
* **The "drop `.base`" rule** — when a token path ends in `.base`, the CSS variable drops the `base` segment (e.g. `colors.text.base` → `--color-text`, not `--color-text-base`).
* **Derived color variants (`muted` / `active`) are NOT tokens.** They must not appear in the front matter. They are generated in `color-variants.css` from the base brand and action colors via HSL relative color syntax. The `DESIGN.md` `## Colors` section documents the derivation rule in prose only.
* **Elevation and border width presets must be imported from `presets/`.** Do not redefine `--elevation-*` or `--border-*` in the main stylesheet; import the chosen preset file instead.
* **`border` holds border widths only.** Border *colors* are not tokens — components pick the color tokens they need for their border variants under the `components:` key.
* **Merged paths in YAML** — when several token paths share the same parent object (e.g. `typography.base.fontFamily` and `typography.base.fontSize`), they collapse into a single entry in the front matter. See section 9.
