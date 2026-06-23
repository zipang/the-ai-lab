---
name: image-prompt-engineering
description: "Use when crafting optimized prompts for AI image generation models. Covers the 6-part prompt anatomy, per-model syntax, anti-pattern detection, and iteration workflows."
---

# Image Prompt Engineering

Translates visual direction (color, composition, lighting, mood) into model-specific image generation prompts. Use this skill after receiving a visual direction block from the Visual Director agent and before passing prompts to the Brand Guardian agent.

## The 6-Part Prompt Anatomy

Every prompt you write must address all six dimensions. Missing a slot forces the model to guess, producing unpredictable results.

### 1. Subject

What is in the frame. Be specific — vague subjects produce generic images.

**Good:**
> "A woman in her early 30s with curly auburn hair, freckled skin, wearing a cream linen blazer, holding a ceramic mug with both hands, candid smile, eyes slightly crinkled."

**Bad:**
> "A woman smiling."

| Do | Don't |
| :-- | :---- |
| Specify age range, hair color/style, skin tone, clothing, expression | "a person", "someone", "a customer" |
| Include pose, action, interaction with environment | "standing", "sitting" alone |
| Describe facial expression precisely | "happy" or "sad" alone |
| For products: material, finish, angle, scale, context | "a bottle", "the product" |

### 2. Style

The visual aesthetic — art movement, photography style, medium, or artist reference.

**Photography:**
> "editorial photography, fashion aesthetic, shot on medium format film, slight grain, natural color grading."

**Illustration:**
> "digital illustration, vector art, flat colors, bold geometric shapes, Bauhaus influence."

**3D / CGI:**
> "3D render, octane render, photorealistic, global illumination, subsurface scattering on skin."

**Painting:**
> "oil on canvas, impasto texture, Impressionist style, visible brushstrokes, Claude Monet palette."

| Style Type | Keywords to Use |
| :--------- | :-------------- |
| Photography | "editorial", "lifestyle", "documentary", "cinematic", "macro", "street", "fashion", "beauty" |
| Illustration | "vector", "line art", "watercolor", "gouache", "charcoal", "digital painting", "comic" |
| 3D | "octane render", "cycles render", "unreal engine", "vray", "substance painter", "blender" |
| Fine Art | "oil painting", "acrylic", "pastel", "woodcut", "etching", "screen print" |
| Artist References | "in the style of [artist]" — use sparingly, one per prompt max |

### 3. Lighting

The quality, direction, color, and intensity of light. This is the single highest-impact visual parameter.

**Components to specify:**
- **Archetype** — "golden hour", "Rembrandt", "soft studio", "low-key", "high-key", "neon", "silhouette"
- **Direction** — "key light from upper-left at 45°", "backlit", "side-lit", "top-down", "rim light"
- **Quality** — "hard shadows", "soft diffused", "dappled", "harsh", "ambient"
- **Color temperature** — "warm 3200K", "cool 5600K", "mixed tungsten and daylight", "neon cyan"

**Example:**
> "Rembrandt lighting, key from upper-right, triangle highlight on left cheek, warm 3200K temperature, deep shadow falloff on right side of frame."

### 4. Composition

How elements are arranged within the frame. Governs visual hierarchy and narrative emphasis.

| Element | What to Specify | Example |
| :------ | :-------------- | :------ |
| Framing | Shot distance and camera position | "close-up on face", "wide shot", "overhead flat lay", "dutch angle 15°" |
| Subject placement | Where the subject sits in the frame | "subject on left third, negative space on right", "centered, symmetrical" |
| Depth | Foreground, midground, background | "foreground: blurred leaves, midground: subject, background: mountain range at sunset" |
| Leading lines | Elements that direct the eye | "stone wall leads from bottom-left to subject at center-right" |
| Focal length | Lens effect | "85mm portrait", "24mm wide angle", "50mm standard", "macro 1:1" |
| Depth of field | How much is in focus | "shallow depth of field, background bokeh", "hyperfocal, everything sharp" |

### 5. Mood

The emotional tone — why the viewer should feel something.

**Specify:**
- **Primary emotion** — "serenity", "urgency", "luxury", "nostalgia", "joy", "melancholy"
- **Atmosphere** — "misty forest at dawn", "rain-slicked city street at midnight", "sterile white lab"
- **Color grade** — "teal-orange blockbuster grade", "desaturated matte", "warm sepia", "cold blue"

**Example:**
> "Melancholic and contemplative mood, misty overcast atmosphere, desaturated cool tones, lone figure in an empty plaza, Edward Hopper influence."

### 6. Technical

Model-specific parameters, quality boosters, and output constraints.

**Universal technical elements:**
- Aspect ratio (e.g., `--ar 16:9`, `--ar 4:5`, `--ar 1:1`)
- Quality level (e.g., `--q 2`, `--quality 100`)
- Style intensity (e.g., `--s 50`, `--style raw`)
- Output resolution
- Version flag (e.g., `--v 6.1`, `--v 7`)
- Seed for reproducibility

**Example:**
> `--ar 16:9 --style raw --s 50 --v 7 --seed 4231`

## Per-Model Syntax Reference

### Midjourney V7

| Parameter | Syntax | Values | Effect |
| :-------- | :----- | :----- | :----- |
| Aspect Ratio | `--ar W:H` | `16:9`, `4:5`, `1:1`, `21:9`, `9:16`, `3:2`, `4:3` | Frame dimensions |
| Style Raw | `--style raw` | flag | Reduces Midjourney's default beautification, increases prompt adherence |
| Stylize | `--s <0-1000>` | `0`–`1000` (default `100`) | How strongly Midjourney applies its own aesthetic. Lower = more literal. |
| Weird | `--w <0-3000>` | `0`–`3000` (default `0`) | Adds surreal/experimental qualities |
| Chaos | `--c <0-100>` | `0`–`100` (default `0`) | Variation between images in a grid. Higher = more diverse. |
| Character Consistency | `--cw <0-100>` | `0`–`100` (default `100`) | How strongly character reference images influence. `0` = face only, `100` = full appearance. |
| Image Weight | `--iw <0.5-2.0>` | `0.5`–`2.0` (default `1.0`) | How strongly an image prompt influences the result vs the text prompt |
| Seed | `--seed <0-4294967295>` | Any integer | Deterministic output — same seed + same prompt = same image |
| Tile | `--tile` | flag | Generates seamlessly tiling patterns |
| Stop | `--stop <10-100>` | `10`–`100` (default `100`) | Stop generation early (useful for sketch-like results at lower values) |
| Video | `--video` | flag | Creates a timelapse of the generation process |
| Move | `--move <1-3>` | `1`–`3` (default `1`) | Camera motion for animated outputs |
| Speed | `--speed <0.25-4.0>` | `0.25`–`4.0` | Generation speed vs quality tradeoff. Slower = more iteration = higher quality. |
| Version | `--v <version>` | `7`, `6.1`, `6` | Model version. Always use `--v 7` for current gen. |

**Midjourney Prompt Structure:**
```
[subject] + [style] + [lighting] + [composition] + [mood] + [technical parameters]
```

**Midjourney syntax rules:**
- Comma-separated clauses within the prompt string
- Parameters go at the end, after the prose
- Midjourney **ignores** negative prompts — you cannot say "no X" in MJ. Instead, use `--no` for simple exclusions:
  ```
  --no text, watermark, signature, people, trees
  ```
- `--no` is NOT reliable for complex negations. Better approach: omit undesired elements entirely and rely on positive description.
- Use multi-prompting with `::` to separate concepts:
  ```
  landscape:: misty mountains :: golden sunrise warmth :: --ar 16:9
  ```
  Each segment separated by `::` gets its own weighting. You can also add numerical weights:
  ```
  subject::2 background::1 lighting::1.5
  ```

**Midjourney reference image usage:**
```
[image URL] description of what the reference shows --iw 1.5 --ar 16:9
```

**Midjourney character consistency in V7:**
```
[character reference URL] character doing action, wearing outfit, in environment --cw 80
```

### DALL-E 3

| Feature | Behavior | Best Practice |
| :------ | :------- | :------------ |
| Prompt style | Conversational natural language prose | Write full descriptive sentences, not keyword lists |
| Text rendering | Best-in-class for in-image text | Always put text content in the prompt in quotes: "A sign reading 'GRAND OPENING'" |
| Style modifier | Built-in `vivid` vs `natural` | `vivid` (default) = more dramatic, hyper-real, cinematic. `natural` = more photographic, realistic. |
| Aspect ratio | `1024x1024` (square), `1792x1024` (wide), `1024x1792` (tall) | Wide for landscapes, tall for portraits, square for social |
| Negative prompts | NOT supported | Instead, describe what you DO want in detail |
| Image editing | Supports in-conversation editing of generated images | Detected by presence of phrase like "edit this image" or "change the background" |
| Quality | `hd` parameter available | Use `hd` for detailed output, standard `dall-e-3` for faster/cheaper |
| Seed | NOT user-controllable | DALL-E 3 does not expose seed. Reproducibility not guaranteed. |

**DALL-E 3 prompt structure:**
```
Subject description in detailed prose. Setting and environment description.
Lighting and mood description. Compositional notes. Style and medium.
```

**DALL-E 3 example:**
> A professional chef in her late 40s with silver-streaked dark hair pulled back, wearing a crisp white apron over a navy linen shirt, standing in a sunlit rustic kitchen. She's holding a wooden spoon with a taste of vibrant red tomato sauce, smiling warmly at the camera. Soft natural light streams through a large window to her left, casting gentle shadows across the wooden counter. Fresh herbs and ceramic bowls are artfully arranged in the foreground. Natural photographic style, shallow depth of field, warm editorial color grading.

**DALL-E 3 text rendering — critical rules:**
1. Always put the exact text content in quotes inside the prompt
2. Specify font style if important: "bold sans-serif letters", "elegant script typography"
3. For signs/posters: describe the sign itself as an object
4. DALL-E 3 handles text better than any other model, but complex layouts (paragraphs, multiple text blocks) still fail. Keep text to 1-2 short phrases.

**DALL-E 3 edit vs generate detection:**
DALL-E 3 can edit an existing image when the user provides an image and requests a change. The prompt must distinguish:
- **Generate:** "Create an image of..."
- **Edit:** "Change the background to..." or "Replace the product with..."

When passing a seed image for editing, describe both what the image currently shows AND what should change:
> "This image shows a woman holding a blue water bottle. Change the bottle to a sleek stainless steel color, keeping everything else identical."

### Stable Diffusion (SDXL / SD 3.5)

| Feature | Syntax | Effect |
| :------ | :----- | :----- |
| Weighted tokens | `(word:1.3)` | Increases emphasis on `word` by 1.3x. Range: `0.5` (de-emphasize) to `1.5` (strong emphasis) |
| Alternative weighting | `(word)` +1, `[word]` -1 | Alternative syntax: `()` boosts 1.1x, `[]` reduces 0.9x |
| Prompt break | `BREAK` | Separates the prompt into two parts that process independently. Useful for foreground vs background. |
| Negative prompt | Required field | Always provide a negative prompt with SD models |
| CFG Scale | `--cfg_scale 7.5` | Classifier-Free Guidance scale. Higher = stricter prompt adherence (but may reduce quality). Range: 1–30. Default 7.5. |
| Steps | `--steps 30` | Denoising steps. More steps = more detail but diminishing returns. Range: 20–50. |
| Sampler | `--sampler DPM++ 2M Karras` | Algorithm that controls the denoising process |
| Seed | `--seed 123456789` | Deterministic generation |
| Size | `--width 1024 --height 1024` | Output dimensions in pixels |
| Clip Skip | `--clip_skip 2` | How many CLIP layers to skip. Higher = more stylistic interpretation. |
| Refiner | SDXL specific | A second model pass that refines details. Use for high-quality outputs. |

**Stable Diffusion prompt structure:**
```
Positive: [detailed subject], [style/medium], [lighting], [composition], [mood], [quality boosters]
Negative: [things to avoid], [artifacts to suppress], [style elements to exclude]
```

**Stable Diffusion example:**
```
Positive: (masterpiece, best quality:1.2), a woman with curly auburn hair wearing a cream linen blazer, (editorial photography:1.1), Rembrandt lighting from upper-left, close-up portrait, shallow depth of field, warm skin tones, (highly detailed skin texture:1.1), film grain, natural expression, (freckles:1.1)
Negative: text, watermark, signature, bad anatomy, distorted face, extra fingers, mutated hands, poorly drawn hands, ugly, deformed, blurry, low quality, jpeg artifacts, oversaturated, washed out, cartoon, 3d render, plastic skin, airbrushed, smoothed skin
```

**Weighted token rules:**
- Use `(word:1.3)` sparingly — 3–4 per prompt maximum
- Weights above `1.5` degrade coherence
- Weight the subject, lighting, and quality boosters — NOT style references
- De-emphasize with `(word:0.7)` for elements that should be subtle

**BREAK keyword usage:**
```
portrait of a woman in a sunlit field BREAK cinematic lighting, golden hour, soft bokeh in background
```
The part before `BREAK` is the primary subject, the part after is the environment/atmosphere. The model processes them independently, which prevents background from bleeding into the subject.

**SDXL specific parameters:**
| Parameter | SDXL Value | Notes |
| :-------- | :--------- | :---- |
| Resolution | `1024x1024` base | Non-square ratios: `1216x832`, `832x1216`, `1472x832`, `832x1472` |
| Refiner | Recommended for 1024+ | Set refiner start at 0.8 (80% through steps) |
| Clip Skip | `2` is standard | `1` for more literal, `3+` for more creative |
| High-res fix | Enabled for >1024 | Prevents duplicate elements at high resolutions |

### Flux Pro

| Feature | Behavior | Best Practice |
| :------ | :------- | :------------ |
| Prompt style | Natural language descriptions | Like DALL-E 3: use sentences, not comma-separated tags |
| Keyword mapping | Direct and precise | Flux maps keywords literally. Use exact descriptors. |
| Structure vs Style | Flux favors structure over style stacking | Focus on what you want (count, layout, position) rather than layering style references |
| Negative prompts | Limited support | Provide what Flux should avoid as part of the natural language prompt |
| Resolution | Variable | Works well from 512x512 to 1024x1024 and non-square variants |
| Speed | Fast, often 2-4 seconds per generation | Excellent for rapid iteration loops |
| Seed | Supported | Use for reproducibility |
| Consistency | Good prompt adherence | Less artistic license than Midjourney, more literal |

**Flux Pro prompt structure:**
```
A clear, direct description of the scene. State subject, setting, and action in natural sentences.
Style and mood described in explicit terms rather than artist references.
```

**Flux Pro example:**
> A wooden dining table set for two people, viewed from above. White ceramic plates are placed at each setting with silver cutlery on linen napkins. A vase of fresh wildflowers sits in the center. Soft natural light comes from the left side. Warm earthy color palette with beige and terracotta tones. Photorealistic style, sharp focus across the entire frame.

**Flux Pro tips:**
1. Be explicit about object count — Flux handles numeracy better than Midjourney but still benefits from clear counts
2. Avoid stacking art movement references ("Art Deco meets Bauhaus with Art Nouveau flourishes") — pick one
3. Specify composition directly ("subject is in the center", "two objects flank a central figure")
4. For text: describe it naturally ("a wooden sign that reads 'WELCOME' in carved letters")
5. Flux handles camera angles well — use "viewed from above", "seen from a low angle", "close-up view"

### ComfyUI

| Concept | Implementation | Notes |
| :------ | :------------- | :---- |
| Positive prompt | CLIP Text Encode node → Positive input of KSampler | Standard prose or weighted SD-style prompt |
| Negative prompt | CLIP Text Encode node → Negative input of KSampler | Required node. Can be empty string but best practice is to provide it |
| Checkpoint model | Load Checkpoint node | Different checkpoints have different syntax preferences. Read the checkpoint's documentation. |
| LoRA | Load LoRA node | Requires base model and LoRA file. Prompt must reference LoRA's trigger keyword. |
| ControlNet | Load ControlNet node + Apply ControlNet | Preprocessor node handles image-to-condition mapping (canny, depth, openpose, etc.) |
| IP-Adapter | Separate node pipeline | Image prompt adapter for style/face consistency |
| Latent upscale | LatentUpscale node before decoding | For higher resolutions without full HD denoising cost |
| VAEs | Load VAE node | Separates VAE from checkpoint. Some checkpoints require specific VAEs. |

**ComfyUI checkpoint-specific syntax:**

| Checkpoint Family | Syntax Preference | Example |
| :---------------- | :---------------- | :----- |
| Realistic Vision | Weighted SD syntax, short prompts | `(photograph of a woman:1.2), detailed face, natural lighting` |
| DreamShaper | Medium length, comma-separated tags | `portrait, woman, freckles, natural lighting, canon photography` |
| RevAnimated | Detailed weighted prompts, negative crucial | Full SD-style positive + negative with multiple weights |
| Juggernaut XL | Natural language + quality tags | `Cinematic shot of a woman with auburn hair, soft lighting, masterpiece quality` |
| SDXL Turbo | 4-5 step generation, short prompts | Minimal prompt, rely on LoRAs for specificity |
| Pony Diffusion | Danbooru tags, weighted syntax | `1girl, solo, looking at viewer, (freckles:1.2), (smile:1.1)` |
| Flux Dev/Schnell | Natural language, no weights | Full sentence descriptions, no `()` or `[]` syntax |

**ComfyUI negative prompt baseline (can be adapted per checkpoint):**
```
nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, ugly, deformed
```

**ComfyUI quality tags for positive prompt (model-dependent):**
```
masterpiece, best quality, ultra-detailed, highres, 8k, photorealistic
```
Some models (especially anime-focused) respond well to quality tags at the beginning. Photorealism models may ignore them — test with your checkpoint.

**ComfyUI workflow best practice:**
```
Load Checkpoint → CLIP Text Encode (Positive) → CLIP Text Encode (Negative) → KSampler → VAE Decode → Save Image
                                         ↓                                        ↑
                              (optional) Load Image → ControlNet → Apply ControlNet
```

## Anti-Pattern Detection

Based on prompt-master pattern analysis. Before finalizing any prompt, scan for these anti-patterns:

### Fatal Anti-Patterns (will produce unusable output)

| # | Anti-Pattern | Detection Rule | Fix |
| :-: | :----------- | :------------- | :-- |
| 1 | **Vague subject** | Subject contains generic terms: "person", "woman", "man", "product", "object" without modifiers | Add 3+ descriptive attributes (age, hair, clothing, expression, pose) |
| 2 | **Missing negative prompt** | Prompt is SD/ComfyUI-targeted but has no negative prompt field | Always provide a negative prompt for SD-family models |
| 3 | **Prose for Midjourney** | Full natural language sentences longer than 15 words in a Midjourney prompt | Convert to comma-separated keyword phrases |
| 4 | **Ignored seed** | No seed parameter when reproducibility is required | Always include `--seed <value>` for Midjourney, `--seed <value>` for SD/Flux |
| 5 | **Missing aspect ratio** | `--ar` not specified for Midjourney, or aspect ratio not declared | Always set aspect ratio explicitly |
| 6 | **Overweighted** | Any single token weight exceeds `1.5` in SD syntax | Reduce to max `1.5`, preferably `1.3` or lower |
| 7 | **Model mismatch** | Prompt references model-specific syntax that the target model doesn't support | Strip MJ `--params` from DALL-E prompts; add negative prompts only for SD |
| 8 | **Contradictory instructions** | "dark moody lighting" + "bright sunny day" both present | Remove one — pick a single lighting archetype |
| 9 | **Style pollution** | 3+ art movements or artist references in one prompt | Limit to one primary style anchor |
| 10 | **Empty slot** | One or more of the 6 anatomy slots absent | Audit for all 6 slots and fill the missing one |

### Quality Anti-Patterns (images will be mediocre)

| # | Anti-Pattern | Detection Rule | Fix |
| :-: | :----------- | :------------- | :-- |
| 11 | **All description, no style** | Subject + mood present but no style/medium specified | Add a photography style or art movement |
| 12 | **Style without subject** | "Cinematic, editorial, dramatic lighting" but subject is vague | Make the subject specific first, then layer style |
| 13 | **Lighting as afterthought** | Lighting mentioned as "nice lighting" or "good light" | Pick an archetype from the Lighting section |
| 14 | **Dead color palette** | No color direction at all | Add palette from the visual direction brief |
| 15 | **Camera zoom only** | "Close-up" or "wide shot" without deeper composition | Add subject placement, leading lines, depth layers |
| 16 | **Over-stylization** | "Masterpiece, best quality, 4k, 8k, ultra-detailed, award-winning photo, trending on ArtStation" stacked 6+ deep | Use 1-2 quality tags maximum. Quality comes from the prompt content, not the tags. |
| 17 | **Anti-prompts in positive** | "No watermark, no text, no bad hands" in the positive prompt | Move negatives to the negative prompt field (SD) or remove (MJ/DALL-E) |
| 18 | **Text assumption** | Model is Midjourney but prompt requests specific text rendering | Use DALL-E 3 or Ideogram for in-image text. MJ cannot render text reliably. |
| 19 | **Token blindness** | Model is Flux but prompt uses SD weighted `(word:1.3)` syntax | Remove weight syntax — Flux uses natural language |
| 20 | **Attribute inflation** | 15+ comma-separated attributes for a single subject | Prioritize: 3-5 most important attributes. Models average all attributes — too many makes everything mid. |

### Structural Anti-Patterns (workflow problems)

| # | Anti-Pattern | Detection Rule | Fix |
| :-: | :----------- | :------------- | :-- |
| 21 | **One-shot attempt** | Only one prompt iteration, no tracking of changes | Always iterate: generate → evaluate → adjust exactly one variable → regenerate |
| 22 | **Missing reference** | Image prompt relies on style that would be better served by a reference image | Add a style reference or character reference if precise consistency is needed |
| 23 | **Neglected seed** | Promising result but seed not recorded for reuse | Immediately record the seed + full prompt + settings after a good generation |
| 24 | **Copy-paste across models** | Same prompt used verbatim for MJ → DALL-E → SD | Adapt structure and syntax to each model's conventions |
| 25 | **No iteration log** | Changing multiple variables between generations without logging | Track one variable change per iteration with before/after comparison |

## Negative Prompt Strategies by Platform

Negative prompts prevent unwanted elements from appearing. Treatment varies dramatically by platform.

### Midjourney

Midjourney has **no negative prompt support** in the traditional sense.

**Alternatives:**
1. `--no` parameter (simple exclusions):
   ```
   --no text, watermark, signature, trees, cars
   ```
   `--no` is best for 2-3 broad categories. Complex `--no` lists degrade output quality.

2. **Positive exclusion** — describe the negative as a positive opposite:
   ```
   Instead of: "no people"
   Use: "empty street, no visible people"
   ```

3. **Multi-prompt weighting** — reduce undesired elements via low `::` weight:
   ```
   subject::2 background elements::0.3
   ```

4. **Omission** — simply don't mention the unwanted element. Midjourney won't add it if the prompt doesn't suggest it.

### DALL-E 3

DALL-E 3 does **not support negative prompts**.

**Strategies:**
1. **Inclusion framing** — describe only what you want in detail:
   ```
   Instead of: "a room with no furniture except a chair"
   Use: "a minimal room containing only a single wooden chair"
   ```

2. **Contextual avoidance** — specify the desired context that inherently excludes the unwanted:
   ```
   Instead of: "no people, no animals"
   Use: "an empty landscape, pristine wilderness, no signs of habitation"
   ```

3. **Direct correction** — if DALL-E includes unwanted elements, regenerate with explicit positive framing around what should be there.

### Stable Diffusion

Stable Diffusion has the **most powerful negative prompt** system.

**Stable Diffusion negative prompt categories:**

| Category | Negative Tokens | When to Use |
| :------- | :-------------- | :---------- |
| Anatomy | `bad anatomy, distorted face, extra fingers, mutated hands, poorly drawn hands, missing limbs` | Always — SD often generates flawed anatomy |
| Quality | `worst quality, low quality, blurry, jpeg artifacts, ugly, deformed` | Always — baseline quality suppression |
| Style contamination | `cartoon, 3d render, painting, illustration, anime` | When targeting photorealism — prevents style bleed |
| Content | `text, watermark, signature, username, logo` | When text-free output is needed |
| Specific elements | `trees, grass, sky, buildings, people` | Per-generation exclusions based on the brief |
| Technical | `oversaturated, grainy, noisy, dark, underexposed` | Lighting/camera corrections |

**Stable Diffusion negative prompt baseline (photorealism):**
```
nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, ugly, deformed, bad proportions, extra limbs, fused fingers, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs
```

**Stable Diffusion negative prompt baseline (illustration/anime):**
```
lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, ugly, deformed, bad proportions, flat colors
```

**Weighted negative tokens (advanced):**
```
(((deformed))), (bad anatomy:1.2), [watermark:0.8]
```
- `((word))` — strong emphasis (same as `(word:1.2)`)
- `[word]` — de-emphasis (same as `(word:0.9)`)
- Use sparingly — over-weighted negatives degrade output

### Flux Pro

Flux has **limited negative prompt support**.

**Strategies:**
1. **Natural language avoidance** — embed exclusions in the prompt sentence:
   ```
   "A minimalist white room without any furniture, completely empty except for..."
   ```

2. **Flux negative system (when available)** — some Flux implementations support a negative prompt field. Use sparingly with 3-5 tokens max.

3. **Prioritize positives** — Flux responds best to what you want. Invest prompt budget in positive descriptions rather than negatives.

### ComfyUI

ComfyUI negative prompt = the negative CLIP Text Encode node input.

**Checkpoint-specific considerations:**

| Checkpoint | Negative Sensitivity | Recommendation |
| :--------- | :------------------ | :------------- |
| Realistic Vision | High | Use the full photorealism baseline above |
| DreamShaper | Medium | Baseline minus "cartoon, 3d render" — DreamShaper is intentionally stylized |
| RevAnimated | High | Full baseline, add `(worst quality:1.2)` for stronger suppression |
| Juggernaut XL | High | Full baseline, quality-focused negatives |
| SDXL Turbo | Medium | Shorter negatives — Turbo models process faster with fewer tokens |
| Pony Diffusion | Low | Minimal negative needed — tag-based prompts already control content |
| Flux | Low | Skip negatives entirely or use 2-3 exclusions in sentence form |

## Iteration Workflow

### The Prompt Engineering Loop

```
[1] Write initial prompt (all 6 slots filled)
         ↓
[2] Generate 1 grid (4 images for MJ, 1-4 for SD/Flux/DALL-E)
         ↓
[3] Evaluate against rubric (score each slot 0-10)
         ↓
[4] Identify the LOWEST scoring slot
         ↓
[5] Adjust EXACTLY ONE variable in that slot
         ↓
[6] Lock parameters (seed, resolution, etc.)
         ↓
[7] Regenerate
         ↓
[8] Compare before/after — improvement?
         YES → repeat from step 3 for next lowest slot
         NO  → revert change, try a different adjustment in same slot
```

### Critical Rules

1. **ONE variable change per iteration** — changing two things at once means you won't know which caused the improvement or regression
2. **Lock the seed for evaluation** — when testing a prompt change, use the same seed as the baseline. Compare apples to apples.
3. **Lock all parameters except the tested variable** — don't change aspect ratio AND lighting AND prompt at the same time
4. **Keep an iteration log** — track each version's prompt, parameters, seed, and scores

### Evaluation Rubric

Score each slot from 0 (completely wrong) to 10 (perfect match to the brief).

| Slot | Score 0 | Score 5 | Score 10 |
| :--- | :------ | :------ | :------- |
| **Subject** | Wrong subject entirely | Recognizable but missing key attributes | Exact match: age, appearance, clothing, expression, pose all match brief |
| **Style** | Wrong medium/art style | Partial style match but elements bleed (e.g., photographic with cartoon artifacts) | Perfect style execution matching the brief's style anchor |
| **Lighting** | Lighting flat or wrong archetype | Lighting direction matches but intensity/color temperature off | Exact archetype, direction, quality, and temperature match |
| **Composition** | Subject cropped wrong, bad framing | Frame distance correct but subject placement or depth off | Shot distance, subject placement, depth layers, leading lines all match |
| **Mood** | Emotionally wrong (should be serene, looks chaotic) | Partially correct mood but wrong color grade or atmosphere | Emotion matches, color grade matches, atmosphere matches |
| **Technical** | Bad resolution, wrong aspect ratio, artifacts | Correct aspect ratio and resolution but quality issues (noise, blur) | All technical parameters correct, high output quality |

**Below 5 in any slot** → that slot is the priority for the next iteration.

**All slots 7+** → the prompt is production-ready for brand review.

### Iteration Example

**Round 1:**
```
Prompt: A woman with red hair in a field, golden hour
Seed: 1234
Scores: Subject 4, Style 3, Lighting 5, Composition 3, Mood 4, Technical 2
Lowest slot: Composition (3) — "field" is too vague
```

**Round 2 (Composition fix):**
```
Prompt: A woman with red hair in a field of lavender, golden hour, wide shot, figure positioned on left third, hills stretching into background
Seed: 1234 (same for comparison)
Scores: Subject 4, Style 3, Lighting 5, Composition 6, Mood 4, Technical 2
Improved: Composition +3
```

**Round 3 (Subject fix):**
```
Prompt: A woman in her late 20s with curly red hair and freckles, wearing a white sundress, standing in a field of lavender, golden hour, wide shot...
Seed: 1234
Scores: Subject 7, Style 3, Lighting 5, Composition 6, Mood 4, Technical 2
Next slot: Style (3)
```

### Breaking Out of Local Maxima

If 3+ iterations on the same slot show no improvement, the prompt may be at a local maximum for that variable. Strategies:

1. **Reset the slot entirely** — replace the description with a completely different approach
2. **Add a reference image** — visual anchor often breaks text-only deadlocks
3. **Change the model** — if Midjourney can't nail the style, try SD with a specific LoRA
4. **Change the seed** — if you've been locking seeds for comparison, try a fresh seed to see if the model produces better results in a different latent space
5. **Restructure the prompt** — rewrite the entire prompt using different vocabulary and syntax

## Seed and Parameter Tracking

### Why Track Seeds

Seeds are the foundation of reproducible image generation. Without a recorded seed, you cannot:
- Recreate an image later
- Run controlled A/B tests on prompt changes
- Build a library of reliable prompts for a campaign
- Recover a good result if you accidentally regenerate

### Seed Tracking Template

For every generation, record:

```
Prompt: [full prompt text]
Model: [Midjourney/Stable Diffusion/DALL-E/Flux]
Parameters:
  - Seed: [seed number]
  - Aspect ratio: [e.g., 16:9]
  - Style/Quality: [e.g., raw, s50]
  - CFG Scale: [SD only, default 7.5]
  - Steps: [SD only, default 30]
  - Sampler: [SD only]
  - Resolution: [width x height]
  - Negative prompt: [SD/ComfyUI only]
  - Reference image: [URL or path if used]
  - Prompt weight: [if modified from default]
Date: [date]
Score: [average rubric score]
Notes: [what worked, what didn't]
```

### Versioning Convention

```
PROMPT_<campaign>_<scene>_v<iteration>_<seed>.txt
```

Example:
```
PROMPT_ecobottle_hero_v03_seed4231.txt
PROMPT_ecobottle_hero_v04_seed4231.txt
PROMPT_ecobottle_hero_v04_seed8842.txt
```

### Campaign Parameter Sheet

For multi-image campaigns, maintain a parameter sheet:

| Image ID | Model | Seed | AR | Style | CFG | Steps | Neg Prompt | Iterations | Final Score |
| :------- | :---- | :--- | :- | :---- | :-- | :---- | :--------- | :--------- | :---------- |
| eco-hero-01 | MJ V7 | 4231 | 16:9 | raw / s50 | — | — | —no text | 7 | 8.2 |
| eco-lifestyle-01 | MJ V7 | 8842 | 4:5 | raw / s30 | — | — | —no people | 5 | 7.5 |
| eco-product-01 | SDXL | 5519 | 1:1 | — | 7.0 | 30 | baseline | 3 | 8.8 |

## Reference Image Editing Detection

### Generate vs Edit: Prompt Structure Distinction

When working with text-to-image generation within a multi-agent pipeline, the Prompt Engineer must distinguish between generating a new image and editing an existing one.

### Generate Prompt

Use when there is no source image — the model creates from scratch.

**Structure:**
```
[Style/Medium reference] [Subject] [Action/Pose] [Environment] [Lighting] [Composition] [Mood] [Technical parameters]
```

**Example:**
> "Editorial photograph of a woman in her 30s with curly auburn hair, wearing a cream linen blazer, standing in a sunlit cafe doorway, Rembrandt lighting, medium shot, warm editorial mood —ar 4:5 --v 7"

### Edit Prompt

Use when a source image exists and needs targeted modification.

**Midjourney — Vary Region / Inpainting:**
```
[source image URL] [description of the image] --v 7
```
Then use Midjourney's Vary Region to select the area and provide an edit prompt:
> "Replace the background with a minimalist white studio"

**Stable Diffusion — Inpainting / img2img:**
```
Positive: [description of what the edited image should show, including unchanged elements]
Negative: [standard baseline]
Settings: denoising_strength=0.4, inpaint_area=face, mask_blur=4
```
- Denoising strength `0.0` = no change (identical to source), `1.0` = completely new image
- For minor edits: `0.2`–`0.4`
- For major edits: `0.5`–`0.7`
- Always describe the unchanged portions as well as what changed — gives the model more context

**DALL-E 3 — Editing:**
DALL-E 3 can edit in-conversation when the user provides an image. The prompt must explicitly state what changes:
> "This image shows a woman holding a blue bottle. Change the bottle's color to red and replace the background with a mountain landscape. Keep the woman's appearance, lighting, and composition exactly the same."

**Key edit detection patterns:**

| Signal | Interpretation |
| :----- | :------------- |
| "Change X to Y" | Edit mode — source image exists |
| "Replace the background with" | Edit mode |
| "Keep everything else the same" | Edit mode (explicit preservation constraint) |
| No source image mentioned | Generate mode |
| "Create an image of..." | Generate mode |
| Source URL in prompt | Edit mode (MJ/SD with image input) |

### Edit Prompt Anti-Patterns

| Error | Consequence | Fix |
| :---- | :---------- | :-- |
| Describing only the change, not the whole | Model alters unintended elements | Describe what stays AND what changes |
| No denoising strength (SD) | Model may produce incoherent edit or no edit at all | Always set denoising_strength based on edit scope |
| Vague region selection (MJ) | Wrong area modified, or nothing changes | Be precise about the region in Vary Region or use a mask |
| Assumed identity preservation | Model may change the subject's face/appearance | Add "keep the [subject]'s appearance identical" to the edit description |
| Text in source for DALL-E 3 edit | DALL-E may hallucinate new text that wasn't in the original | If preserving text: explicitly state "keep the existing text unchanged" |

## Quick Reference Cards

### Midjourney Quick Card
```
Prompt: [comma-separated keywords], [style], [lighting], [composition], [mood]
Params: --ar 16:9 --style raw --s 50 --v 7 --seed <value>
Exclude: --no text, watermark
Negative: Not supported — use positive exclusion or --no
Best for: Artistic hero shots, lifestyle, fashion, conceptual
```

### DALL-E 3 Quick Card
```
Prompt: "Full descriptive sentences. Text in quotes. Detailed prose."
Params: Quality=hd, Style=vivid or natural, Size=1792x1024 (wide)
Negative: Not supported — use inclusion framing
Best for: Text in images, complex scenes, rapid prototyping
```

### Stable Diffusion Quick Card
```
Positive: (weighted:1.2) tokens, [BREAK] for separation
Negative: Full baseline + content-specific exclusions
Params: --seed <value> --cfg_scale 7.5 --steps 30 --sampler DPM++ 2M Karras
Best for: Fine control, brand consistency with LoRAs, inpainting
```

### Flux Pro Quick Card
```
Prompt: Natural language sentences, precise keyword mapping
Negative: Limited — embed in sentence
Params: --seed <value>, resolution variable
Best for: Rapid iteration, structure-critical layouts, photorealism
```

### ComfyUI Quick Card
```
Workflow: Checkpoint → CLIP Encode (Positive + Negative) → KSampler → VAE Decode
Syntax: Checkpoint-dependent — check docs
Negative: Always provide a baseline per checkpoint family
Best for: Full production pipeline with ControlNet, IP-Adapter, LoRAs
```
