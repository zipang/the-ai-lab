# The Marketing Studio (@the-ai-lab/recipes/the-marketing-studio)

This recipe chains four specialized agents to produce marketing content: campaign strategy,
copywriting, art direction, and image prompt engineering. Each agent reads the output of the
previous one, refines it through its own skill, and passes the result downstream. The user
acts as the final Brand Guardian.

## Usage

Invoke the starting agent with a campaign brief, or invoke a single agent for a focused task:

- `@the-strategist` Create a campaign for our new eco-friendly water bottle. Target audience: outdoor enthusiasts aged 25-40. Key message: "Adventure without compromise."
- `@the-copywriter` I need a headline and CTA for a banner ad promoting our spring sale.
- `@the-art-director` I need visual direction for a poster showing a runner on a mountain trail at golden hour.

## Content

| Component | Source |
| :-------- | :----- |
| Agent | [`the-strategist`](./agents/the-strategist.md) |
| Agent | [`the-copywriter`](./agents/the-copywriter.md) |
| Agent | [`the-art-director`](./agents/the-art-director.md) |
| Agent | [`the-prompt-engineer`](./agents/the-prompt-engineer.md) |
| Skill | [`marketing-storytelling`](./skills/marketing-storytelling/SKILL.md) |
| Skill | [`copywriting`](./skills/copywriting/SKILL.md) |
| Skill | [`visual-direction`](./skills/visual-direction/SKILL.md) |
| Skill | [`image-prompt-engineering`](./skills/image-prompt-engineering/SKILL.md) |
| Skill | [`brand-consistency`](./skills/brand-consistency/SKILL.md) |

## Dependencies

This recipe integrates with the [`the-designer`](../the-designer/README.md) recipe.
The `DESIGN.md` file produced by The Designer is the source of truth for brand identity
across the pipeline. If the project has no `DESIGN.md` yet, invoke `@the-designer` to
create one, or provide brand details directly when The Art Director asks.
