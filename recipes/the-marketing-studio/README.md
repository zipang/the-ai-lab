# The Marketing Studio

## Intent

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

Each agent reads the output of the previous one, refines it through its own skill, and passes the result downstream. The user acts as the final Brand Guardian.

## Usage

Deployment of the agents and skills follows the process in the root `AGENTS.md` of this lab.

### 1. Configure instructions

Add the following to `.opencode/instructions.md` to enable the pipeline:

```markdown
**Marketing Studio**: Use the `the-marketing-studio` agent chain when the task involves marketing content production. Invoke agents in order: The Strategist → The Copywriter → The Art Director → The Prompt Engineer. The user acts as the final Brand Guardian.
```

### 2. Invoke the pipeline

Mention the starting agent with your campaign brief:

> **@the-strategist** Create a campaign for our new eco-friendly water bottle. Target audience: outdoor enthusiasts aged 25-40. Key message: "Adventure without compromise."

The Strategist first asks what type of deliverable you need, then produces a creative brief, forwarded to **@the-copywriter**, then **@the-art-director**, and finally **@the-prompt-engineer** (for image assets).

You can also invoke a single agent for a focused task:

> **@the-copywriter** I need a headline and CTA for a banner ad promoting our spring sale.

> **@the-art-director** I need visual direction for a poster showing a runner on a mountain trail at golden hour.

### 3. Brand identity

This recipe integrates with [The Designer recipe](../the-designer/README.md). The `DESIGN.md` file — produced by The Designer — serves as the canonical source of truth for brand identity across the pipeline. If your project has no `DESIGN.md` yet, invoke **@the-designer** to create one, or provide brand details directly when The Art Director asks.

## References

| Component | Source |
| :-------- | :----- |
| Agent | [`agents/the-strategist.md`](./agents/the-strategist.md) |
| Agent | [`agents/the-copywriter.md`](./agents/the-copywriter.md) |
| Agent | [`agents/the-art-director.md`](./agents/the-art-director.md) |
| Agent | [`agents/the-prompt-engineer.md`](./agents/the-prompt-engineer.md) |
| Skill | [`skills/marketing-storytelling/`](./skills/marketing-storytelling/SKILL.md) |
| Skill | [`skills/copywriting/`](./skills/copywriting/SKILL.md) |
| Skill | [`skills/visual-direction/`](./skills/visual-direction/SKILL.md) |
| Skill | [`skills/image-prompt-engineering/`](./skills/image-prompt-engineering/SKILL.md) |
| Skill | [`skills/brand-consistency/`](./skills/brand-consistency/SKILL.md) |
