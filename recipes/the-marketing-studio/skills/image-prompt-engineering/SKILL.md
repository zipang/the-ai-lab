---
name: image-prompt-engineering
description: "Use when crafting optimized prompts for AI image generation models. Produces a 6-part, production-ready prompt (Subject, Environment, Composition, Atmosphere, Style, Generation Parameters). Includes per-model notes for OpenAI GPT-Image 2, anti-patterns, and a validation checklist."
---

# Image Prompt Engineering

Translate creative direction (scene description, composition, lighting, mood, camera craft) into a structured, model-friendly image prompt. Use this skill after receiving a visual brief and before handing off to an image model.
Use this skill to consistently produce precise, unambiguous six-part prompts that image generation models can use for a predictive result.

## Output Contract

Return exactly six sections labelled from A to F with these exact English titles:
A. Subject
B. Environment
C. Composition
D. Atmosphere
E. Style
F. Output format & size

Language: Match the user’s requested language. If unspecified, use the project’s primary locale; otherwise default to English.

Scope: Keep the prompt self-contained. Do not reference external docs or the model by name. Avoid implementation jargon inside the six sections (save model notes for yourself, below).

## Step-by-Step Method

1. Gather scene description and constraints
   - Extract the main elements and hard requirements (e.g., “pure blue sky, “horizon only fills the top third”).
   - Note prohibited elements explicitly for later negative guidance (e.g., “no clouds”, "no flare").
   - Confirm aspect ratio and delivery format expectations.

2. Analyze the reference image (if provided)
   - Infer camera height, angle, lens feel (wide/normal/tele), horizon placement, leading lines, and symmetry.
   - Identify foreground anchor(s), midground, and background layers.

3. Lock the Scene Core
   - Define the subject in one precise sentence that anchors viewpoint and scale.
   - Specify key physical details the model must render (materials, markings, textures).
   - List exclusions (e.g., “no power lines, no signs, no people”) when important.

4. Set the Environment and Horizon
   - Describe the broader setting and distant elements (terrain, vegetation, skyline).
   - Place the horizon explicitly (e.g., “horizon aligned on the upper third; sky occupies only the top third”).
   - State sky/atmosphere constraints (color, clouds/haze/contrails presence or absence).

5. Compose the Frame
   - Describe symmetry/asymmetry, rule-of-thirds, leading lines, and camera position (height and angle).
   - Indicate lens range by feel (e.g., “24–28 mm wide-angle”) and intent (strong perspective vs. flatter look).
   - Keep aspect ratio out of this section; reserve exact format specs for section 6.

6. Define Atmosphere
   - Ambience: time of day, overall mood, and color temperature intent.
   - Light sources: specify the primary key light (direction/height), secondary sources (fill, bounce, rim/backlight, skylight), and shadow character (crisp vs soft, length, density). If indoors: list fixtures/windows and their placement; if outdoors: state sun angle and skylight contribution.
   - Air quality: clarify clarity/particulates (crystal clear, dry air; light haze; humidity; dust; mist), and any volumetric effects (subtle bloom, god rays, none). Do not imply clouds/fog if the brief forbids them.
   - Use concrete, testable phrasing; e.g., “clear midday sun from high right, subtle skylight fill, dry air, no haze; neutral white balance.”

7. Specify Technical Style
   - For photographic/cinematic looks: focal length, aperture, ISO, shutter (guidance-level), focus strategy (e.g., hyperfocal), depth-of-field; grading intent (contrast curve, saturation, highlight/shadow roll-off), texture/sharpness posture.
   - For non-photographic looks, explicitly state the medium and craft:
     - Painting (oil/acrylic/gouache): canvas/paper texture, brushwork (impasto, dry brush), edge quality, palette constraints (limited palette, earth tones), finish (matte vs glossy).
     - Watercolor: wet-on-wet vs wet-on-dry, pigment granulation, blooms allowed or avoided, paper texture (cold-press/hot-press), transparency layering.
     - Drawing/ink/graphite: line weight variation, hatching/cross-hatching, stippling, contour emphasis, paper tone/tooth.
     - Pastel/charcoal: blending vs visible strokes, smudging, falloff, fixative look.
     - Graphic/vector poster: flat shapes, clean bezier curves, geometric construction, limited spot colors, halftone/dither parameters if any.
     - Animation/illustration: cel-shaded 2D with hand-painted background feel; 3D toon-shaded with outline thickness; consistent frame-clean edges. Avoid naming specific artists or studios.
   - Negative style cues: specify exclusions (e.g., “no photobashing seams”, “no AI artifacts”, “no lens flare”, “no HDR halo”).

8. Generation Parameters
   - Aspect ratio and orientation (e.g., “16:9 landscape”).
   - Pixel dimensions (e.g., “3840×2160” and an optional higher-res alternative).
   - File format and color space (e.g., “JPEG sRGB quality ~95” or “PNG 8-bit sRGB”).
   - Optional: seed or variation count only if the tool exposes it; otherwise omit.

## Model Notes: OpenAI GPT-Image 2

- Responds well to clear, sectioned prose with full sentences rather than comma lists.
- Use numbers only when they convey intent (e.g., “horizon at upper third”, “24–28 mm look”). Avoid over-specifying conflicting values.
- Keep negatives concise and non-contradictory. Do not say both “grain” and “no grain” unless you truly intend fine cinema grain.
- Prefer present-tense imperatives (“place horizon…”, “use pure blue sky”) phrased as descriptions inside the six sections.

## Anti-Patterns to Avoid

- Conflicts: Do not mix mutually exclusive cues (e.g., “overcast light” with “clear midday sun”).
- Style soup: Long chains of period styles and lens names without a clear priority.
- Vague adjectives: “stunning”, “beautiful”, “nice”. Replace with concrete visual intent.
- Aspect ratio drift: Mention aspect ratio only in section 6; do not restate elsewhere.
- Hidden negatives: If you need to exclude items (people, cars, signs, power lines), say so explicitly once.

## Non-Photographic Style Examples (patterns)

- Watercolor landscape: translucent layers, wet-on-wet sky gradient; controlled granulation in textures; cold-press paper texture visible; crisp edges on architecture; muted natural palette.
- Oil painting, plein air: medium impasto brushwork with visible bristle strokes; subtle canvas weave; warm–cool limited palette; soft scumbling for distant planes; matte finish.
- Ink line art: varied line weights for contour and depth; cross-hatching midtones; pure white paper; no wash; high-contrast graphic clarity.
- Vector flat poster: bold flat color fields; geometric simplification; 4–6 spot colors; clean bezier curves; optional subtle halftone texture.
- Cel-shaded animation: base colors with single-shadow tone; gentle ambient occlusion; thin, consistent outlines; hand-painted background impression; no photographic texture.

## Validation Checklist (pre-submit)

- All six sections present with the exact titles.
- Hard constraints included (e.g., sky color/purity; horizon occupancy) with no contradictions.
- Subject anchors viewpoint and scale.
- Composition states camera height/angle and symmetry/leading lines.
- Style includes lens/aperture/ISO/shutter and grading intent for photographic looks, or explicit medium and craft descriptors for non-photographic looks (e.g., watercolor granulation, brushwork, line work).
- Generation parameters specify aspect ratio, pixel size, and file format.
 - Atmosphere names light sources/direction and air quality/volumetrics where relevant.

## Fill-in Template

Use this skeleton and replace bracketed items with task-specific content. Maintain the six headings exactly.

```
A. Subject
[One sentence anchoring the main subject, viewpoint, and scale. Add key material/marking details and explicit exclusions if needed.]

B. Environment
[Environment description and distant elements; place the horizon and sky characteristics if relevant.]

C. Composition
[Symmetry/asymmetry, leading lines, camera height and angle, lens feel; horizon placement rules if applicable.]

D. Atmosphere
[Ambience: time of day, overall mood, and color temperature. Light sources: key/fill/backlight directions and shadow character (crisp vs soft); outdoors state sun angle and skylight; indoors list fixtures/windows. Air quality: clarity vs haze, humidity, dust, or mist.]

E. Style
[For photographic/cinematic looks: focal length range, aperture, ISO, shutter, focus strategy; grading/contrast/saturation; texture/sharpness posture. For non-photographic looks: specify medium (watercolor, oil, ink, charcoal, vector, cel-shaded animation, etc.), surface/texture, brushwork or line work, palette constraints, and rendering conventions; concise negative cues.]

F. Output format & size
[Aspect ratio and orientation; pixel dimensions; file format (jpeg, png, webp..) and color space; optional seed/variations if available.]
```

## Example (road scene with pure blue sky and top-third horizon)

A. Subject
Straight two-lane country road viewed from the centerline at a very low height (about 60–70 cm above the asphalt) to emphasize strong leading lines converging to a distant vanishing point. Dark asphalt with realistic aggregate and fine cracks; dashed white center marks and solid white edge lines; gravel shoulders with dry grasses. No vehicles, no people, no dominant signs, no power lines.

B. Environment
Rural summer landscape: dry fields with sparse scrub and a few small groves; far away, a soft line of low hills. Sky is a pure, uniform blue with no clouds, no haze, no contrails. Distant horizon is crisp.

C. Composition
Strict central symmetry with the road aligned to the vertical axis of the frame. Rule of thirds: the horizon sits on the base of the upper third; the sky occupies only the top third of the image, with the lower two thirds devoted to road and verges. Low camera height and a wide-angle perspective to accentuate depth; clean frame edges with no stray elements.

D. Atmosphere
Clear, dry midday light; calm, minimalist scene. Natural, restrained colors; subtle sense of summer heat without atmospheric veil. Realistic contemporary film look without spectacle.

E. Style
Realistic cinematographic photography: 24–28 mm full-frame look, around f/8, ISO 100, shutter near 1/500 s; hyperfocal focus for sharpness from foreground to infinity. Neutral white balance (~5600 K); high microcontrast with fine, non-overdone sharpening. Naturalistic grading with moderate contrast and gentle highlight roll-off; contained saturation. No lens flare, no motion blur, no aggressive HDR.

F. Output format & size
16:9 cinematic, landscape orientation. Recommended size: 3840×2160 px. File format: JPEG sRGB at high quality (~90 compression).
