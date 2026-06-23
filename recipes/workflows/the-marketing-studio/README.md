# The Marketing Studio

A multi-agent AI pipeline for marketing storytelling through image generation. This recipe chains specialized agents — each responsible for a distinct creative stage — from narrative development to brand-compliant image prompt output.

## Architecture

```
User Brief
    │
    ▼
┌─────────────────────┐
│ Marketing Storyteller │  →  Narrative & campaign angle
└─────────┬───────────┘
          │ story outline
          ▼
┌─────────────────────┐
│  Visual Director     │  →  Shot list, composition, mood
└─────────┬───────────┘
          │ visual direction
          ▼
┌──────────────────────────┐
│ Image Prompt Engineer     │  →  Optimized prompt for target model
└──────────┬───────────────┘
           │ prompt + params
           ▼
┌─────────────────────┐
│  Brand Guardian      │  →  Validates brand consistency
└─────────┬───────────┘
          │ approved / rejected
          ▼
     Final Prompt
```

Each agent reads the output of the previous one, refines it through its own skill, and passes the result downstream. The brand guardian acts as a final quality gate.

## Prerequisites

- A superpowers-compatible agent (OpenCode, Claude Code, etc.)
- **Recommended**: Install the [prompt-master](https://github.com/example/prompt-master) skill for advanced prompt engineering techniques used by the Image Prompt Engineer agent.

## Installation

1. **Register the agents** — copy each agent definition into your project's `.opencode/agents/` directory:

```bash
mkdir -p .opencode/agents/the-marketing-studio
cp -r recipes/workflows/the-marketing-studio/skills/* .opencode/agents/the-marketing-studio/
```

2. **Skills auto-discovery** — the skill directories under `recipes/workflows/the-marketing-studio/skills/` are already structured for superpowers auto-discovery. No additional registration is needed.

3. **Configure instructions** — add the following to `.opencode/instructions.md` to enable the pipeline:

```markdown
**Marketing Studio**: Use the `the-marketing-studio` agent chain when the task involves AI image generation for marketing content. Invoke agents in order: Marketing Storyteller → Visual Director → Image Prompt Engineer → Brand Guardian.
```

## Usage

Invoke the pipeline by mentioning the starting agent with your campaign brief:

> **@marketing-storyteller** Create a campaign for our new eco-friendly water bottle. Target audience: outdoor enthusiasts aged 25-40. Key message: "Adventure without compromise."

The Storyteller outputs a narrative brief, which is automatically forwarded to the **@visual-director** agent, and so on through the chain.

You can also invoke a single agent for a focused task:

> **@visual-director** I need a shot list for a 30-second ad showing a runner transitioning from city streets to mountain trails.

> **@brand-guardian** Review this prompt for brand compliance: "A sleek water bottle on a rocky outcrop at golden hour..."

## Recipe Contents

| File / Directory | Purpose |
| :--------------- | :------ |
| `README.md` | This file — installation & usage guide |
| `skills/marketing-storytelling/` | Agent skill: narrative development & campaign strategy |
| `skills/visual-direction/` | Agent skill: shot composition & mood boards |
| `skills/image-prompt-engineering/` | Agent skill: model-optimized prompt writing |
| `skills/brand-consistency/` | Agent skill: brand guideline validation |

## Attribution

This recipe integrates concepts from the **prompt-master** skill framework for advanced prompt engineering. Special thanks to the prompt-master community for pattern libraries used in the Image Prompt Engineer agent.
