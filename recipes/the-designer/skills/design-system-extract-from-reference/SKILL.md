---
name: design-system-extract-from-reference
description: This skill teaches how to use agent-browser to extract design tokens (colors, typography, spacing, borders, elevation) from any live web page reference URL, producing structured data that feeds directly into DESIGN.md and a theme stylesheet.
---

# Extract Design Tokens from a Reference URL

A standardized workflow for capturing all visual design tokens from an existing
web page using `agent-browser` as the extraction tool. The output is a
structured token inventory that maps directly to the `design-system-tokens`
specification (colors, typography, spacing, rounded, elevation, borders).

## Prerequisites

- `agent-browser` installed (`bun add -g agent-browser && agent-browser install`)
- `design-system-tokens` skill loaded (for understanding token categories)
- The target reference URL is accessible

---

# 1. Workflow Overview

The extraction follows three phases:

```
Phase 1 — Screenshot & Snapshot
  → agent-browser screenshot, snapshot -i -c
  → Captures the visual reference and interactive element refs

Phase 2 — One-Pass Token Extraction
  → cat extract.js | agent-browser eval --stdin
  → Single injected function walks the DOM and returns the full token inventory

Phase 3 — Compile & Structure
  → Organize extracted values into the design-system-tokens categories
  → Output: a structured token inventory ready for DESIGN.md + theme CSS
```

---

# 2. Phase 1 — Screenshot & Snapshot

```bash
agent-browser open <url>
agent-browser wait --load networkidle
```

The screenshot is the visual reference for the compile phase. 

---

# 3. Phase 2 — One-Pass Token Extraction

A single self-contained JavaScript function — `extractDesignTokens()` —
walks the DOM in two targeted passes, calls `getComputedStyle()` once per
element, and returns the complete token inventory as a JSON object.

The function lives in [`extract.js`](./extract.js) alongside this skill file.

## Usage

```bash
cat extract.js | agent-browser eval --stdin
```

Or with `--json` for machine-readable output:

```bash
cat extract.js | agent-browser eval --stdin --json
```

## Sampling populations

The function uses two CSS-selector-scoped passes instead of scanning every
element on the page. This focuses the frequency counts on elements that
actually carry design decisions.

| Pass | CSS selector | Token categories tallied |
|------|-------------|--------------------------|
| Typography | `h1, h2, h3, h4, h5, h6, p, a, button, code` | fontFamily (per-role + aggregate), fontSize, fontWeight, lineHeight, letterSpacing |
| Container | `header, footer, section, main, aside, nav, article, button, div, a[role=button]` | backgroundColor, color, padding, margin, borderRadius, borderWidth, boxShadow |

The `a[role=button]` selector captures links styled as buttons (pill CTAs,
ghost buttons) so their background color, radius, and padding are tallied —
plain `<a>` links are excluded from the container pass to avoid transparent
background noise.

## One-shots (same function, no extra round-trips)

The function also captures three supplementary inventories in the same call:

| Inventory | Source | What it gives you |
|-----------|--------|-------------------|
| Font families | Typography pass + tag categorization | Resolved `base` (body), `display` (headings), and `mono` (`<code>`) font-family stacks — the three semantic roles defined by the `design-system-tokens` spec |
| `@font-face` declarations | `document.styleSheets` → `CSSFontFaceRule` | Custom font family names, src URLs, weights, styles |
| `@media` breakpoints | `document.styleSheets` → `CSSMediaRule` | Responsive breakpoint values |

Stylesheet traversal is wrapped in `try/catch` for CORS — cross-origin
stylesheets are silently skipped.

## Filtering rules

- **Trivial values skipped** at tally time: `transparent`, `rgba(0, 0, 0, 0)`,
  `currentcolor` for colors; `0px`, `none`, `auto` for lengths; `none` for
  box-shadow.
- **Frequency threshold**: only values occurring **more than 3 times**
  (≥ 4 occurrences) are kept. This filters one-off decorations and noise.
- **Top N cap**: each category is capped to the top 30 values by frequency.
- **Element cap**: each pass processes at most 8000 elements (safety valve
  for pathological pages).

## Return shape

```json
{
  "fontFamilies": {
    "base":    "<resolved font stack>",
    "display": "<resolved font stack>",
    "mono":    "<resolved font stack>"
  },
  "colors": {
    "background": [{ "value": "rgb(...)", "count": N }, ...],
    "text":       [{ "value": "rgb(...)", "count": N }, ...]
  },
  "typography": {
    "fontFamily":    [{ "value": "...", "count": N, "primary": "..." }, ...],
    "fontSize":      [{ "value": "...", "count": N, "rem": "..." }, ...],
    "fontWeight":    [{ "value": "...", "count": N }, ...],
    "lineHeight":    [{ "value": "...", "count": N }, ...],
    "letterSpacing": [{ "value": "...", "count": N }, ...]
  },
  "spacing": {
    "padding": [{ "value": "...", "count": N, "rem": "..." }, ...],
    "margin":  [{ "value": "...", "count": N, "rem": "..." }, ...]
  },
  "borders": {
    "radius": [{ "value": "...", "count": N, "rem": "..." }, ...],
    "width":  [{ "value": "...", "count": N, "rem": "..." }, ...]
  },
  "elevation": {
    "boxShadow": [{ "value": "...", "count": N }, ...]
  },
  "fontFaces": [
    { "fontFamily": "...", "src": "...", "fontWeight": "...", "fontStyle": "..." }
  ],
  "mediaQueries": ["(min-width: 768px)", ...]
}
```

Each entry in a frequency array has:
- `value` — the computed style string as returned by the browser
- `count` — number of elements where this value was observed
- `rem` — *(length-based categories only)* the value converted to rem (`px / 16`)
- `primary` — *(fontFamily only)* the first non-generic family name, useful for identifying the typeface without parsing the full stack

The `fontFamilies` object holds the three semantic font-family stacks
(`base`, `display`, `mono`) resolved from `getComputedStyle()` by tag
categorization. `mono` falls back to probing a temporary `<code>` element
when the page contains no `<code>` elements, so the site's `code` rule (or
the browser default monospace stack) is still captured.

## How to read the frequency data

- **Highest count = the dominant/default value** for that role. The
  most frequent text color is the body text color; the most frequent
  background color is the page surface; the most frequent font-size is
  the body size.
- **Secondary clusters reveal the design system's deliberate choices.**
  A font-size cluster at 16px / 22px / 26px / 32px / 48px suggests a
  type scale. A padding cluster at 4px / 8px / 12px / 16px / 24px /
  32px / 48px / 96px suggests a spacing scale.
- **`fontFamilies` is the authoritative source for the three semantic
  font roles.** Read `fontFamilies.base` for the body font,
  `fontFamilies.display` for headings, and `fontFamilies.mono` for code.
  Cross-reference with `fontFaces` to find the `@font-face` declarations
  for each family.
- **Negative margins** are meaningful (negative spacing for overlap
  effects) and are preserved in the data.
- **`100%` border-radius** means fully rounded (pills, avatars) — map
  it to `--rounded-full`.

---

# 4. Phase 3 — Compile & Structure

Organize all extracted values into the categories defined by the
`design-system-tokens` skill. This structured inventory becomes the source
of truth for creating `DESIGN.md` and `<theme>.css`.

## Mapping the raw data to token roles

| Token role | Source in the extraction | How to pick |
|------------|--------------------------|-------------|
| `colors.brand.primary` | `colors.background` | Most frequent non-white, non-black background — typically the button/CTA/section color |
| `colors.brand.accent` | `colors.background` (non-black, non-white entries) | Second most frequent colored background (e.g. button|section color) |
| `colors.brand.secondary` | `colors.background` (non-black, non-white entries) | Next most frequent colored background (e.g. button|section color) |
| `colors.brand.tertiary` | `colors.background` (non-black, non-white entries) | Next most frequent colored background (e.g. button|section color) |
| `colors.surface.base` | `colors.background` | Most frequent background (usually some white or off-white) |
| `colors.surface.alt` | `colors.background` | Second most frequent background |
| `colors.surface.dark` | `colors.background` or footer inspection | Darkest background with significant count |
| `colors.text.base` | `colors.text` | Most frequent text color (usually black or dark navy) |
| `colors.text.subtle` | `colors.text` | Lighter/muted text color |
| `colors.action.*` | `colors.background` or manual inspection | Look for distinct green/red/blue/amber backgrounds; fall back to manual inspection of the reference screenshot |
| `typography.base.fontFamily` | `fontFamilies.base` | Resolved from the most frequent family across `p, a, button` |
| `typography.display.fontFamily` | `fontFamilies.display` | Resolved from the most frequent family across `h1`-`h6` |
| `typography.mono.fontFamily` | `fontFamilies.mono` | Resolved from `<code>` elements (or probed `<code>` fallback) |
| Type scale | `typography.fontSize` | Sort by rem value; map smallest→`xs`, base→`base` (1rem), largest→`display` |
| Spacing scale | `spacing.padding` | Sort by rem value; map to `xs`→`xxl` following the design-system-tokens spec |
| `rounded.*` | `borders.radius` | Most frequent → `base`; smaller → `sm`; larger → `lg`; `100%` → `full` |
| `border.*` | `borders.width` | Most frequent non-zero width → `sm`; next → `md`; largest → `lg` |
| `elevation.*` | `elevation.boxShadow` | Map by blur size: 1-2px→`sm`, 4-8px→`md`, 12-24px→`lg` |

## Output template

Use this template to compile the extracted data into a token inventory:

```markdown
# Token Inventory for <Theme Name>

## 1. Typography

### Font Families
- **Display/Heading**: <font-family> (weights: <w1, w2, ...>)
- **Base/Body**: <font-family> (weight: <w>)
- **Mono**: <font-family> (if present)

### Type Scale
| Level | Size | Line-height | Weight | Letter-spacing |
|-------|------|-------------|--------|----------------|
| h1 | <value> | <value> | <value> | <value> |
| h2 | <value> | <value> | <value> | <value> |
| h3 | <value> | <value> | <value> | <value> |
| h4 | <value> | <value> | <value> | <value> |
| body | <value> | <value> | <value> | <value> |
| small | <value> | <value> | <value> | <value> |

### @font-face Declarations
```css
@font-face {
  font-family: '<name>';
  src: url('<path>') format('<format>');
  font-weight: <weight>;
  font-style: <style>;
}
```

## 2. Colors

### Brand Colors
| Role | Hex/RGB | Usage |
|------|---------|-------|
| Primary | <value> | Main brand color |
| Accent | <value> | Special brand color |
| Secondary | <value> | Secondary brand color |
| Tertiary | <value> | Tertiary brand color |

### Surface Colors
| Role | Hex/RGB | Usage |
|------|---------|-------|
| Base (page bg) | <value> | Body background |
| Alt (section bg) | <value> | Alternating sections |
| Dark (footer bg) | <value> | Footer / dark areas |
| Card / Input bg | <value> | Cards, form fields |

### Text Colors
| Role | Hex/RGB | Usage |
|------|---------|-------|
| Base | <value> | Body text |
| Heading | <value> | Heading text |
| Subtle | <value> | Muted/secondary text |
| Link | <value> | Hyperlinks |
| Link hover | <value> | Link hover state |

### Action / Feedback Colors
| Role | Hex/RGB | Usage |
|------|---------|-------|
| Error | <value> | Error messages |
| Success | <value> | Success feedback |
| Info | <value> | Informational |
| Warning | <value> | Warning |

## 3. Spacing / Layout
- **Section padding (vertical)**: <value>
- **Grid gutter**: <value>
- **Content max-width**: <value>
- **Breakpoints**: <list of values>

## 4. Borders & Radius
- **Default border-radius**: <value>
- **Button border-radius**: <value>
- **Card border-radius**: <value>
- **Input border-radius**: <value>
- **Border style**: <width> <style> <color>

## 5. Elevation / Shadows
- **Card shadow**: <value>
- **Button shadow**: <value>
- **Modal shadow**: <value>
- **Dropdown shadow**: <value>

## 6. Motion (if present in stylesheets)
- **Default duration**: <value>
- **Default easing**: <value>
- **Hover transitions**: <value>
```

---

# 5. Presets & Reference

## Elevation mapping

When extracting `box-shadow` values, map them to the nearest elevation preset
from the `design-system-tokens` skill:

| If the shadow is… | Map to preset |
|-------------------|---------------|
| `none` or no shadow | `flat` |
| Small soft shadow (1-2px blur) | `sm` |
| Medium soft shadow (4-8px blur) | `md` |
| Large soft shadow (12-24px blur) | `lg` |
| Solid rectangular offset | `brutal` |
| Dual light/dark shadows | `neumorphism` |

## Border mapping

| If the border is… | Map to preset |
|-------------------|---------------|
| `none` or no border | `none` |
| 1px solid | `sm` (or `124` preset) |
| 2px solid | `md` (or `124` preset) |
| 4px+ solid | `lg` (or `124` preset) |
| Hairline (0.5px) | `macOS` |
| 1px with dashed style | `Windows` |

---

# 6. Cleanup

After all extractions are complete:

```bash
agent-browser close
```

---

# Troubleshooting

| Problem | Solution |
|---------|----------|
| `eval` returns empty or sparse results | Page may not be fully loaded — run `agent-browser wait --load networkidle` then retry |
| `fontFaces` is empty | Fonts may be loaded via cross-origin stylesheets (CORS), `<link>` to Google Fonts, or injected by JavaScript. Check `fontFamilies.base` / `fontFamilies.display` for the resolved family stacks — these are captured from `getComputedStyle()` regardless of how the fonts are loaded |
| `mediaQueries` is empty | Site may use modern CSS (clamp, container queries) instead of `@media`, or stylesheets are cross-origin. Inspect the reference screenshot for responsive clues |
| `fontFamilies.mono` is a generic stack (`monospace`, `ui-monospace`) | The site has no explicit `code { font-family }` rule — the probe fell back to the browser default. This is expected; map it to `var(--font-family-base)` in the stylesheet |
| Color values are in `rgb()` not `hex` | Browsers always resolve computed colors to `rgb()`/`rgba()`. Convert to hex in the compile phase: `rgb(r, g, b)` → `#rrggbb` |
| Font sizes are in `px` not `rem` | Browsers resolve computed sizes to `px`. Use the `rem` field provided in each entry, or divide `px` by 16 |
| Page redirects or changes locale | Use the exact URL provided; add `?hl=en` or similar params if needed |
| Dynamic class names (Tailwind, CSS-in-JS) | The function reads `getComputedStyle()` which resolves all class-based styles — dynamic class names are not an issue |
