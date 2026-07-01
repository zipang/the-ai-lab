# The Marketing Studio

A multi-agent AI pipeline for marketing content production — from campaign strategy and copywriting to image generation. This recipe chains specialized agents, each responsible for a distinct creative stage, ending with the user as the final Brand Guardian.

## Architecture

```
User Brief
    │
    ▼
┌─────────────────────────────────────┐
│  The Strategist                      │  →  Campaign brief + Deliverable definition
│  (marketing-storytelling skill)      │  →  Campaign type, file list, task plan
└──────────────┬──────────────────────┘
               │ creative brief + deliverable specs
               ▼
┌─────────────────────────────────────┐
│  The Copywriter                      │  →  Headlines, body copy, CTAs, taglines
│  (copywriting skill)                 │  →  Per-asset copy deliverables
└──────────────┬──────────────────────┘
               │ copy per deliverable file
               ▼
┌─────────────────────────────────────┐
│  The Art Director                    │  →  Per-visual direction
│  (visual-direction skill)            │  →  Loads DESIGN.md for brand tokens
│  (The Designer integration)          │  →  Color palette, typography per visual
└──────────────┬──────────────────────┘
               │ per-visual direction blocks + copy
               ▼
┌─────────────────────────────────────┐
│  The Prompt Engineer                 │  →  Only for image/visual deliverables
│  (image-prompt-engineering skill)    │  →  Generates model-specific prompts
└──────────────┬──────────────────────┘
               │ prompts + params
               ▼
         Final Visual Assets
               │
               ▼  (User reviews as Brand Guardian)
         Approved / Request Changes
```

Each agent reads the output of the previous one, refines it through its own skill, and passes the result downstream. The user acts as the final Brand Guardian — reviewing artistic choices and copy for brand compliance before approving.

## Prerequisites

- A superpowers-compatible agent (OpenCode, Claude Code, etc.)
- **Recommended**: Install the [prompt-master](https://github.com/example/prompt-master) skill for advanced prompt engineering techniques used by The Prompt Engineer agent.

## Campaign Deliverable Types

Every campaign begins by defining the deliverable type. This determines which downstream agents participate and what files are produced.

| Type | Description | Expected File Outputs |
| :--- | :---------- | :-------------------- |
| **Landing Page** | A standalone promotional web page | `index.html`, `style.css`, hero image, favicon, optional `script.js` |
| **Email Marketing** | HTML email for a campaign send | `email.html`, banner image, CTA button asset |
| **Poster / Flyer** | Print-ready single-page visual | `poster-a3.png` (300 DPI), `poster-a4.png` variant, print PDF |
| **Banner Ad** | Web banner at standard sizes | `banner-728x90.png`, `banner-300x250.png`, `banner-320x50.png` |
| **Social Media Visual** | Platform-optimized image asset | `instagram-square.png`, `facebook-ad.png`, `linkedin-banner.png` |
| **Billboard / OOH** | Large-format outdoor visual | `billboard.png` at print resolution, `billboard-scaled.jpg` for proofing |
| **Video Storyboard** | Sequence of key frames for a motion ad | storyboard frames (4-8 images), shot script, timing notes |
| **Product Packaging** | 3D mockup or flat template design | package flat template, `mockup-front.png`, `mockup-angle.png` |
| **Brand Asset Pack** | Coordinated set of on-brand visuals | 4-8 image files sharing consistent palette, lighting, and mood |
| **Web UI Mockup** | High-fidelity interface screenshot | `homepage-mockup.png`, `product-page-mockup.png` |
| **Presentation Deck** | Slide backgrounds and cover visuals | `slide-cover.png`, `slide-background.png`, `section-divider.png` |
| **Bill Insert / Card** | Small-format printed piece | `card-front.png`, `card-back.png`, die-cut template |

Non-image deliverables (Landing Page, Email) still pass through The Strategist and The Copywriter, but The Prompt Engineer skips execution — The Art Director's visual direction is the final step for those asset types.

## Design System Integration with DESIGN.md

This recipe integrates with [The Designer recipe](../the-designer/README.md). The `DESIGN.md` file — produced by The Designer — serves as the **canonical source of truth** for brand identity across the entire pipeline.

### How DESIGN.md is used

1. **The Art Director** loads DESIGN.md to extract brand colors, typography, elevation, and spacing tokens before producing visual direction.
2. **The brand-consistency skill** (used internally by agents) maps DESIGN.md tokens to locked prompt values for image generation.
3. **The user** maintains DESIGN.md as a living reference — updating it when brand identity evolves.

### Getting started with brand identity

If your project does not have a DESIGN.md yet:

1. Invoke **@the-designer** to create one from a description or reference URL
2. Or provide brand details directly (colors, fonts) when The Art Director asks

## Installation

1. **Register the agents** — copy agent definitions into your project's `.opencode/agents/` directory:

```bash
mkdir -p .opencode/agents/the-marketing-studio
cp recipes/workflows/the-marketing-studio/AGENT_*.md .opencode/agents/the-marketing-studio/
```

2. **Register the skills** — copy skill directories into your project's `.opencode/skills/` directory:

```bash
mkdir -p .opencode/skills
cp -r recipes/workflows/the-marketing-studio/skills/* .opencode/skills/
```

3. **Skills auto-discovery** — the skill directories under `.opencode/skills/` are already structured for auto-discovery. No additional registration is needed.

4. **Configure instructions** — add the following to `.opencode/instructions.md` to enable the pipeline:

```markdown
**Marketing Studio**: Use the `the-marketing-studio` agent chain when the task involves marketing content production. Invoke agents in order: The Strategist → The Copywriter → The Art Director → The Prompt Engineer. The user acts as the final Brand Guardian.
```

### Updating an existing deployment

To update a project that already has an older version of this recipe:

```bash
# Update agent files
cp recipes/workflows/the-marketing-studio/AGENT_*.md .opencode/agents/the-marketing-studio/

# Update skill files (adds new skills, overwrites updated ones)
cp -r recipes/workflows/the-marketing-studio/skills/* .opencode/skills/

# Update instructions reference
```

Then review and update `.opencode/instructions.md` if needed. Existing campaign briefs and generated assets are not affected by agent updates.

## Usage

Invoke the pipeline by mentioning the starting agent with your campaign brief:

> **@the-strategist** Create a campaign for our new eco-friendly water bottle. Target audience: outdoor enthusiasts aged 25-40. Key message: "Adventure without compromise."

The Strategist will first ask what type of deliverable you need, then produce a creative brief. This is forwarded to **@the-copywriter**, then **@the-art-director**, and finally **@the-prompt-engineer** (for image assets).

You can also invoke a single agent for a focused task:

> **@the-copywriter** I need a headline and CTA for a banner ad promoting our spring sale.

> **@the-art-director** I need visual direction for a poster showing a runner on a mountain trail at golden hour.

## Recipe Contents

| File / Directory | Purpose |
| :--------------- | :------ |
| `README.md` | This file — installation & usage guide |
| `AGENT_STRATEGIST.md` | Agent: campaign strategy, narrative framework, deliverable definition |
| `AGENT_COPYWRITER.md` | Agent: headlines, body copy, CTAs, taglines per deliverable |
| `AGENT_ART_DIRECTOR.md` | Agent: visual direction, brand identity, per-visual specifications |
| `AGENT_PROMPT_ENGINEER.md` | Agent: model-optimized image prompt generation |
| `skills/marketing-storytelling/` | Skill: narrative development & campaign strategy |
| `skills/copywriting/` | Skill: copy frameworks, tone & voice, CTA formulas |
| `skills/visual-direction/` | Skill: shot composition, color theory, lighting & mood boards |
| `skills/image-prompt-engineering/` | Skill: model-optimized prompt writing & anti-pattern detection |
| `skills/brand-consistency/` | Skill: brand token locking & DESIGN.md integration (reference only) |

## Attribution

This recipe integrates concepts from the **prompt-master** skill framework for advanced prompt engineering. Special thanks to the prompt-master community for pattern libraries used in The Prompt Engineer agent.
