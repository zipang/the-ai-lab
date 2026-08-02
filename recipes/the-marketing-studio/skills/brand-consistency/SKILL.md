---
name: brand-consistency
description: Use when maintaining visual brand identity across a series of AI-generated images. Covers token locking, style coherence, and campaign-level consistency rules.
---

# Brand Consistency Skill

## 0. Using DESIGN.md as Brand Source of Truth

When a `DESIGN.md` file exists in the project, it serves as the canonical source for brand identity tokens. Extract and lock these values before any generation. For the DESIGN.md format specification, load the `design-file-specs` skill (shipped with The Designer recipe).

### Token Mapping: DESIGN.md → Brand Tokens

| DESIGN.md Field | Brand Token Category | How to Encode in Prompts |
| :-------------- | :------------------- | :----------------------- |
| `colors.primary` | Primary Colors | Lock hex value: "deep navy (#0A1628)" |
| `colors.secondary` | Secondary Palette | Lock hex value: "slate grey (#6B7280)" |
| `colors.tertiary` | Accent Colors | Lock hex value + usage rule: "gold (#F59E0B), used sparingly" |
| `colors.neutral` | Background / Surface | Lock hex value: "warm beige (#F5F0EB)" |
| `typography.body.fontFamily` | Body Typography | "body text in [font], clean sans-serif" |
| `typography.heading.fontFamily` | Heading Typography | "headings in [font]" |
| Additional `colors.*` | Extended Palette | Map any extra color tokens similarly |

### Auto-Extraction Workflow

```
1. Locate the DESIGN.md file in the project root or theme directory
2. Parse YAML front matter for `colors` and `typography` sections
3. Map each token to the corresponding brand token category above
4. If DESIGN.md includes `scales` → compute base sizes for reference
5. If DESIGN.md includes `elevation` → map to visual depth cues
6. Pass all extracted tokens into the prompt as locked values
```

### When DESIGN.md is Absent

Fall back to manual brand token definition (Section 1). Ask the user for:
- Primary brand color (hex)
- Secondary/neutral colors (hex)
- Accent color (hex)
- Body font and heading font

---

## Overview

AI image generation is powerful but volatile — the same prompt can yield wildly different results across runs. This skill provides a system to **lock down brand identity** across an entire pipeline of generated assets so every output feels like it belongs to the same family.

Use this skill when generating images for:
- A campaign series (multiple ads, social posts, landing pages)
- A character or mascot appearing across scenes
- A product line needing unified visual treatment
- Any project where "these look like they're from different brands" is unacceptable

---

## 1. Brand Token System

A brand token system is a set of **locked prompt values** that never vary across generations. Treat these like CSS custom properties for your image prompts.

### Locked Values

| Token Category | Examples |
|----------------|----------|
| **Primary Colors** | `deep navy (#0A1628)`, `warm white (#FAFAF8)` |
| **Secondary Palette** | `slate grey (#6B7280)`, `soft beige (#F5F0EB)` |
| **Accent Colors** | `coral (#FF6B6B)`, `gold (#F59E0B)` — used sparingly |
| **Lighting** | `soft diffused studio lighting`, `golden hour warmth` |
| **Texture** | `matte finish`, `slight paper grain texture` |
| **Mood** | `professional but approachable`, `premium minimalism` |

### How to Encode in Prompts

```markdown
# BEFORE (no brand tokens — unpredictable)
"a modern office with people working"

# AFTER (brand tokens locked in)
"a modern office with people working, deep navy and warm white color scheme,
 soft beige accents, coral highlight on one element,
 soft diffused studio lighting, matte finish, premium minimalism"
```

### Typography References (DALL-E Text Rendering)

When prompting for images that include rendered text:

```markdown
# Specify font style and placement
"sign reads 'SUMMER SALE' in clean sans-serif font, centered,
 letter spacing wide, color warm white on deep navy background,
 no serifs, no italics"
```

**Limitations:** DALL-E and Midjourney cannot render specific typefaces reliably. Instead describe the *category* (sans-serif, serif, geometric, hand-drawn) and *treatment* (bold, light, tracked out, all caps).

### Visual Motifs & Recurring Elements

Define 3-5 motifs that must appear in every image of the campaign:

```yaml
motifs:
  - "diagonal geometric line pattern in gold accent"
  - "single coral-colored object in lower-right third"
  - "shallow depth of field with bokeh background"
  - "human hands interacting with product"  # for product shots
```

---

## 2. Character / Style Locking

Consistent characters are the hardest problem in AI generation. Use these techniques to keep a character recognizable across scenes.

### Seed Anchoring Per Character

Assign a fixed generation seed to each character. Document it:

```markdown
| Character  | Fixed Seed | First Generated Prompt                                                                 |
|------------|------------|----------------------------------------------------------------------------------------|
| Maya       | 284719     | "young woman, warm brown skin, curly black hair, professional attire, smiling warmly"  |
| Dr. Chen   | 559182     | "middle-aged Asian man, silver-rimmed glasses, lab coat, salt-and-pepper hair"         |
| Product A  | 773401     | "sleek white smart speaker, matte finish, single coral button on top"                  |
```

Use the seed as a **starting point** — you may need to vary it slightly across scenes, but always return to the anchor seed when introducing the character.

### Midjourney `--cref` / `--cw` for Character Reference

```markdown
# Generate with character reference
/imagine prompt: "Maya in a coffee shop, casual Friday attire" --cref [URL to Maya reference image] --cw 60

# --cw 0: face only, style from prompt
# --cw 50: balance of face + clothing
# --cw 100: face + full outfit/style from reference
```

**Recommendations:**
- Start with `--cw 60` for scene variety while keeping face consistent
- Drop to `--cw 30` if character needs different clothing per scene
- Always use the same reference image URL for a given character
- Create a dedicated reference image library per project

### Stable Diffusion LoRA for Consistent Characters

```markdown
# Train or use a LoRA for the character
# In prompt:
"<lora:character-maya:0.8> Maya standing in a modern kitchen, morning light"

# Weight considerations:
# 0.6-0.8: Good balance of character consistency + scene flexibility
# 0.9-1.0: Very strict character lock, may limit scene variation
# < 0.6: Character may drift, useful for alternate versions
```

**LoRA training tips:**
- 15-20 high-quality images of the character from different angles
- Vary expressions, lighting, and backgrounds in training data
- Include close-ups and full-body shots
- Use consistent hairstyle and clothing in at least 50% of training images

### Style Reference Images for Aesthetic Consistency

```markdown
# Midjourney --sref (style reference)
/imagine prompt: "product shot of coral smart speaker" --sref [URL to brand style guide image]

# SD Image-to-Image with style transfer
# Use a style reference at 0.3-0.5 denoising strength for subtle style lock
```

---

## 3. Color Palette Adherence Checks

AI models drift from specified colors. Implement a validation step.

### Extraction & Comparison Workflow

```
1. Generate image
2. Run color extraction tool (see below)
3. Extract 5-10 dominant colors
4. Compute delta-E or distance to nearest locked palette color
5. Flag any color > threshold distance from palette
6. If flagged → adjust prompt to reinforce palette or regenerate with stricter color tokens
```

### Quick Color Check (Python)

```python
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

def extract_palette(image_path, n_colors=5):
    img = Image.open(image_path).resize((200, 200))
    pixels = np.array(img).reshape(-1, 3)
    kmeans = KMeans(n_clusters=n_colors, n_init=10)
    kmeans.fit(pixels)
    return kmeans.cluster_centers_.astype(int)

# Compare extracted colors to locked brand palette
# Tag any color with >40 distance (in RGB space) as a drift
```

### Prompt Adjustments for Color Drift

```markdown
# Drift detected: blue was muted navy, came out as bright azure
# Fix: reinforce color with stronger negative prompting

# Weak color token:
"deep navy background"

# Strong color token:
"very dark navy blue background, almost black navy, no bright blue, no azure,
 no cyan, deeply muted oceanic navy, color hex #0A1628"
```

---

## 4. Campaign Coherence Rules

Coherence across a campaign is about the **invisible frame** that every image shares.

### Lighting Consistency

```markdown
# Pick ONE lighting scheme for the entire campaign:

# Studio — clean product shots
"soft studio lighting, two-point setup, key light from camera-left,
 subtle fill from camera-right, no harsh shadows"

# Natural — lifestyle/editorial
"golden hour natural lighting, warm sun rays from upper-left,
 soft ambient fill, gentle shadow falloff"

# Dramatic — luxury/premium
"dramatic chiaroscuro lighting, single strong key light,
 deep shadows, high contrast, theatrical mood"
```

### Composition Ratio

```markdown
# Standardize aspect ratio across all campaign images:
- Social ads: 1:1 (1080x1080)
- Hero banners: 16:9 (1920x1080)
- Product shots: 4:5 (1080x1350) for mobile-first

# Also standardize subject placement:
"product centered, occupying 40-50% of frame height,
 negative space on top 30% for text overlay"
```

### Shared Visual Vocabulary

Define visual grammar rules that apply to every image:

```yaml
visual_vocabulary:
  depth_of_field:
    - "shallow DOF for product shots (f/2.8 equivalent)"
    - "medium DOF for lifestyle scenes (f/5.6 equivalent)"
    - "deep DOF only for environment/context establishing shots"
  framing:
    - "product always shot from slightly above (30-degree angle)"
    - "people shot at eye level, not from below"
    - "group shots framed wide, individuals framed medium-tight"
  color_usage:
    - "accent colors only on the primary subject or CTA element"
    - "background always in neutral palette tones"
    - "never use accent colors on more than 15% of the frame"
  post_processing:
    - "slight desaturation (-5%) for earthy mood"
    - "subtle vignette (10% darken at edges)"
    - "consistent micro-contrast adjustment"
```

---

## 5. Seed & Parameter Tracking Table

Maintain a campaign parameter log. Every generation gets an entry.

```markdown
| Asset ID | Scene Description | Model | Seed | Steps | CFG | Ratio | Style Ref | Notes |
|----------|-------------------|-------|------|-------|-----|-------|-----------|-------|
| CAMP-001 | Maya hero shot    | MJ v6 | 2847 | 300   | 5.0 | 16:9  | sref_01  | reference image used |
| CAMP-002 | Product close-up  | SD XL | 7734 | 40    | 7.0 | 1:1   | sref_02  | LoRA strength 0.8  |
| CAMP-003 | Office lifestyle  | MJ v6 | 3918 | 250   | 5.5 | 4:5   | sref_01  | lighting diff from brief - adjusted |
| CAMP-004 | Maya + product    | MJ v6 | 2847 | 300   | 5.0 | 16:9  | sref_01  | fixed seed from CAMP-001 |

# Always log:
# - Asset ID (for cross-referencing)
# - Model + version
# - Fixed seed (if character-anchored)
# - Generation parameters (CFG, steps, scheduler)
# - Style reference URLs used
# - Deviation notes (what changed from the brief and why)
```

---

## 6. Common Brand Drifts & Corrections

| Drift | Symptom | Root Cause | Correction |
|-------|---------|------------|------------|
| **Color shift** | Navy → cyan, beige → yellow | Model over-interprets "warm" or "cool" tokens | Add hex code and negative prompts (e.g., "no cyan, no bright blue") |
| **Character aging** | Character looks older/younger each generation | Seed not anchored or reference weight too low | Lock seed per character; increase `--cw` or LoRA weight |
| **Style drift across series** | Image 1 looks photorealistic, Image 3 looks illustrated | No style reference shared across generations | Use `--sref` / style LoRA on every generation |
| **Lighting inconsistency** | One image is bright studio, next is moody natural | Lighting tokens vary across prompts | Lock lighting scheme at campaign level, paste exact same lighting token every time |
| **Composition creep** | Subject moves from center-left to center to right across series | No composition rule enforced | Define subject positioning rule and add framing tokens to every prompt |
| **Accent color overuse** | Gold appears in every element, not just accents | Accent token not scoped | Add "use accent colors sparingly, only on one element per image" |
| **Background inconsistency** | Sometimes plain, sometimes detailed scenes | Background tokens missing or optional | Always include background spec: "clean minimal background, solid warm white, no patterns" |
| **Model version drift** | Different quality/texture when team uses different model versions | No model version lock | Pin exact model version for each campaign and note in tracking table |
