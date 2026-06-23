---
name: marketing-storytelling
description: "Use when defining the narrative direction and emotional arc for marketing visuals. Analyzes campaign goals, target audience, and brand identity to produce structured creative briefs."
---

# Marketing Storytelling

Transforms marketing strategy into visual storytelling. Use this skill when a campaign brief needs narrative structure, emotional direction, and a production-ready creative brief for downstream agents (visual direction, prompt engineering, brand review).

## Narrative Frameworks

Choose the framework that best aligns with campaign goals and audience psychology.

### Hero's Journey (brand as guide, customer as hero)
The customer faces a challenge, encounters the brand as a mentor, and returns transformed. Best for aspirational / identity-driven campaigns.

- **Call to Adventure** — the customer's desire or pain point
- **Meeting the Guide** — the brand appears with empathy + authority
- **The Transformation** — using the product changes the customer's world
- **Return** — the customer shares their new state (social proof)

*Use when:* building brand affinity, launching lifestyle products, storytelling-driven brands

### Problem-Solution (pain point → resolution arc)
Open on the frustration, then reveal the product as the clean resolution. Best for utility-driven or B2B messaging.

- **Frame 1** — visceral depiction of the problem
- **Frame 2** — tension peak (what if nothing changes?)
- **Frame 3** — product enters as the turning point
- **Frame 4** — resolved, better state

*Use when:* productivity tools, cleaning products, financial services, B2B SaaS

### Before-After (transformation narrative)
Side-by-side or sequential reveal of change. Minimal narrative, maximum contrast. Best for results-driven campaigns.

- **Before** — raw, unpolished, undesirable
- **Transition** — implied action (using the product)
- **After** — ideal state, aspirational

*Use when:* beauty, fitness, home improvement, health & wellness

### Showcase (feature/benefit highlight)
Product-centered. Each frame isolates one feature or benefit. Best for launch campaigns or technical products.

- **Detail Shot** — macro/close-up of the feature
- **In-Context** — feature solving a real moment
- **Benefit Statement** — the emotional payoff of that feature
- **Repeat** for each key feature

*Use when:* tech hardware, automotive specs, fashion detail, food packaging

### Lifestyle (aspiration and belonging)
The product exists naturally in an enviable world. The audience sees themselves in the scene. Minimal product focus, maximal atmosphere.

- **Environment** — establish the desirable world
- **Inhabitant** — someone the audience wants to be
- **Moment** — a candid, emotional beat
- **Product** — present but not dominant

*Use when:* fashion, travel, luxury, beverages, fragrance

### Sequence / Series (multi-image campaign flow)
A set of images that work individually but tell a story together. Best for campaigns shown across multiple touchpoints (billboards, social carousel, print series).

- **Establishing** — wide, contextual, sets the world
- **Conflict / Question** — introduces tension or curiosity
- **Escalation** — builds toward the reveal
- **Resolution** — the brand's answer

*Use when:* OOH campaigns, social media carousels, print spreads, email sequences

## Emotional Tone Mapping

Each emotion maps to specific visual attributes. Use this table to translate the campaign's emotional goal into concrete direction for the Visual Director agent.

| Emotion | Primary Colors | Composition | Lighting | Texture | Keywords |
| :------ | :------------- | :---------- | :------- | :------ | :------- |
| Trust | Blues, deep teals, warm grays | Stable (rule-of-thirds, horizontal lines) | Soft, even, diffused | Smooth, matte | calm, reliable, professional |
| Excitement | Reds, oranges, electric yellows | Diagonal, asymmetrical, dynamic | High contrast, specular highlights | Glossy, reflective | energetic, urgent, adrenaline |
| Serenity | Pastels, sage greens, sky blues | Symmetrical, centered, wide | Golden hour, soft gradations | Soft, organic, flowing | peaceful, balanced, gentle |
| Luxury | Black, gold, deep burgundy, cream | Minimal, generous negative space | Dramatic (chiaroscuro, spotlight) | Satin, polished, rich | exclusive, refined, premium |
| Urgency | Red, amber, stark white | Tight crops, tilted horizon | Harsh, clinical, high-key | Sharp, synthetic | immediate, cannot-wait, critical |
| Nostalgia | Sepia, faded primaries, desaturated greens | Matte-box framing, slight vignette | Warm, soft, film-grain | Textured, aged | familiar, wistful, retro |
| Joy | Yellows, pinks, bright greens | Organic, playful, off-center | Bright, airy, backlit | Luminous, glowing | happy, light, celebratory |
| Innovation | Cyan, magenta, cool whites | Fragmented, layered, geometric | Neon / LED, blue ambient | Glass, metallic, translucent | futuristic, breakthrough, smart |
| Warmth | Terracotta, amber, soft coral | Close, intimate, shallow DOF | Candlelight, sunset, firelight | Knitted, wood-grain, cozy | welcoming, human, heartfelt |
| Authority | Navy, charcoal, crisp white | Symmetrical, low-angle, heroic | Hard directional, dramatic shadow | Polished stone, leather | powerful, commanding, established |

## Creative Brief Template

This is the output format. Every brief produced by this skill must include all fields below.

```markdown
## Creative Brief

**Campaign Name:** `[name]`
**Date:** `[date]`
**Target Audience:** `[demographic + psychographic profile]`
**Key Message:** `[single sentence — the core takeaway]`

### Narrative Framework
`[Hero's Journey | Problem-Solution | Before-After | Showcase | Lifestyle | Sequence/Series]`

### Emotional Arc
- **Primary emotion:** `[from Emotional Tone Mapping table]`
- **Secondary emotion:** `[complementary or contrasting emotion]`
- **Tone progression:** `[how emotion evolves across the campaign sequence if applicable]`

### Visual Direction
- **Color palette:** `[3-5 hex colors or descriptive colors]`
- **Lighting:** `[from tone mapping]`
- **Composition style:** `[from tone mapping]`
- **Texture / finish:** `[from tone mapping]`

### Image Sequence Plan
| # | Shot Description | Focus | Emotion | Notes |
| :-: | :--------------- | :---- | :------ | :---- |
| 1 | `[description]` | `[product / environment / person]` | `[emotion]` | `[compositional notes]` |
| 2 | `[description]` | `[product / environment / person]` | `[emotion]` | `[compositional notes]` |
| 3 | `[description]` | `[product / environment / person]` | `[emotion]` | `[compositional notes]` |

### Reference Styles
- `[photography style, e.g., documentary, editorial, cinematic]`
- `[artists / photographers / films for mood reference]`
- `[color grading reference, e.g., teal-orange, desaturated, warm]`

### Brand Constraints
- `[mandatory visual elements — logo placement, product colors, packaging view]`
- `[elements to avoid — competitor colors, off-brand settings]`
```

## Brand Voice → Visual Metaphor Translation

Translate verbal brand positioning into visual direction. Given the brand's voice descriptors, derive the visual metaphors and execution cues.

| Brand Voice | Sounds Like | Looks Like |
| :---------- | :---------- | :--------- |
| Authoritative | "We set the standard." | Monumental architecture, low-angle hero shots, dark suits, steel & glass |
| Playful | "Life's better with a twist." | Candy colors, tilt-shift, unexpected juxtapositions, rounded shapes |
| Minimalist | "Less is more." | Ample negative space, single subject, monochrome, clean lines |
| Empathetic | "We understand." | Warm close-ups, soft focus, human touch, real unposed expressions |
| Bold | "Break the rules." | High contrast, off-grid compositions, neon accents, mixed media |
| Scientific | "Trust the data." | Clean geometric layouts, cool blues, macro textures, precision lighting |
| Rebellious | "Don't follow." | Gritty textures, broken symmetry, high grain, unconventional crops |
| Nurturing | "We've got you." | Rounded organic shapes, warm earth tones, embrace poses, shallow DOF |

**Translation method:**
1. Extract 2-3 brand voice adjectives from the brand guidelines or brief
2. Find matching row(s) in the table above
3. Blend the "Looks Like" columns — if the brand is both Authoritative and Nurturing, combine monumental space with warm human-centered moments
4. Pass the derived visual cues into the Creative Brief's Visual Direction and Reference Styles fields

## Common Mistakes

- **Generic briefs** — "a person using a product in a nice setting" communicates nothing. Every field must be specific: *which* person, *which* setting, *what* emotion, *what* light.
- **Mixed metaphors** — A "sleek futuristic" visual paired with "warm nostalgic" copy confuses audiences. Ensure the emotional tone map is consistent across all brief fields.
- **Tone inconsistency across series** — In a Sequence framework, images 1→3 might escalate tension and image 4 resolves. The *arc* is intentional, not accidental. Verify each image's emotion against the progression.
- **Product-first instead of customer-first** — The Hero's Journey fails when the brand puts itself in the hero role. The customer is the hero; the brand is the guide.
- **Overloading the brief** — A campaign with 8 emotions, 12 reference styles, and no clear hierarchy paralyzes downstream agents. Limit to one primary + one secondary emotion, 2-3 reference styles maximum.
- **Ignoring brand constraints** — Beautiful concepts that violate brand color, logo, or product presentation rules waste production time. State constraints up front.
