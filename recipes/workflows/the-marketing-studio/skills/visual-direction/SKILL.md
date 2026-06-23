---
name: visual-direction
description: "Use when translating a creative brief into a visual language for AI image generation. Covers color theory, composition, lighting, photography styles, and art movements for marketing visuals."
---

# Visual Direction

Translates written creative briefs into concrete visual language for image generation systems. Use this skill when a brief from Marketing Storytelling needs to become actionable production parameters for prompt engineering and brand review agents.

## Color Theory for Marketing

### Psychology of Colors

Every color carries psychological weight. Use these mappings to align palette choices with campaign emotion goals.

| Color | Primary Associations | Marketing Use | Example Brands |
| :---- | :------------------- | :------------ | :------------- |
| Red | Urgency, excitement, passion, appetite | Clearance sales, fast food, call-to-action buttons | Coca-Cola (#FF0000), Netflix (#E50914), YouTube (#FF0000) |
| Orange | Energy, confidence, friendliness, affordability | CTA buttons, kids' products, discount messaging | Amazon (#FF9900), Fanta (#FF6600), Nickelodeon (#F5A623) |
| Yellow | Optimism, warmth, clarity, caution | Window displays, children's products, attention-grabbing elements | McDonald's (#FFC000), IKEA (#FFCC00), National Geographic (#FFCC00) |
| Green | Growth, health, sustainability, wealth | Eco-friendly brands, finance, organic food, wellness | Starbucks (#00704A), Whole Foods (#3A7734), John Deere (#367C2B) |
| Blue | Trust, security, professionalism, calm | Banking, healthcare, tech, corporate communications | Facebook (#1877F2), IBM (#006699), PayPal (#003087) |
| Purple | Luxury, creativity, wisdom, spirituality | Premium beauty, high-end tech, meditation apps | Cadbury (#7B2D8E), Hallmark (#6A5ACD), Twitch (#9146FF) |
| Pink | Playfulness, romance, femininity, sweetness | Beauty, fashion, desserts, lifestyle | Barbie (#E0218A), Victoria's Secret (#C92A6B), T-Mobile (#E20074) |
| Brown | Reliability, earthiness, warmth, tradition | Outdoor, coffee, handcrafted goods, leather | UPS (#4A1C00), Hershey's (#603813), Timberland (#8B5A2B) |
| Black | Power, sophistication, luxury, mystery | Luxury goods, high-end tech, fashion | Chanel (#000000), Apple (space gray), Mercedes-Benz (#000000) |
| White | Purity, simplicity, cleanliness, minimalism | Healthcare, tech, modern brands | Apple (#FFFFFF), Nike (white Swoosh), The White Company |
| Gray | Neutrality, balance, professionalism, timelessness | Corporate, automotive, industrial design | Apple (space gray), Wikipedia (#707070), Audi (#A0A0A0) |
| Gold | Prestige, success, excellence, opulence | Luxury awards, premium tiers, exclusivity | Mastercard (#FFC107), Rolex (#C5A55A), Champagne (#F7E7CE) |

### Brand Palette Extraction and Extension

Given a brand's primary colors, generate a full visual system:

1. **Primary** — the dominant brand color (60% of visual weight)
2. **Secondary** — one or two supporting colors (30% of visual weight)
3. **Accent** — a contrasting pop color for emphasis (10% of visual weight)
4. **Neutral** — backgrounds, text, supporting surfaces (unlimited)

**Extraction method:**
- From logo: sample the dominant hue, then generate a 5-tone scale (light → medium → dark)
- From product: photograph the hero product against a white background, sample the key surface color
- From brand voice: match voice adjectives to color rows in the psychology table above
- From industry: differentiate — use the opposite end of the color wheel from competitors

**Extension rules:**
- Tint with white +15% increments for lighter variants
- Shade with black +10% increments for darker variants
- Desaturate 30% for a muted "editorial" palette
- Never use an accent color that clashes with the primary (use a color harmony rule below to verify)

### Color Harmony Rules

#### Complementary
Colors opposite on the color wheel. Maximum contrast, high energy. Use one as dominant, the other as accent.

| Base | Complement | Example Use |
| :--- | :--------- | :---------- |
| Blue (#1877F2) | Orange (#FF8800) | Tech CTA: blue UI, orange button |
| Red (#E50914) | Green (#00AA55) | Seasonal: red product on green background |
| Purple (#7B2D8E) | Yellow (#F5C518) | Premium: purple packaging, gold accents |
| Teal (#008080) | Coral (#FF7F50) | Lifestyle: teal room, coral decor accents |

#### Analogous
3–5 colors adjacent on the color wheel. Harmonious, calm, sophisticated. Best for lifestyle and trust-building.

| Anchor | Analogous Set | Mood |
| :----- | :------------ | :--- |
| Blue | Blue-green, blue, blue-violet, violet | Trust with creativity |
| Green | Yellow-green, green, blue-green, teal | Natural growth |
| Red | Orange-red, red, red-violet, magenta | Passionate warmth |
| Yellow | Yellow-orange, yellow, yellow-green, lime | Optimistic energy |

#### Triadic
Three colors evenly spaced on the color wheel. Vibrant, balanced, playful.

| Triad | Balance Tip | Best For |
| :---- | :---------- | :------- |
| Red (#FF3333), Yellow (#FFD700), Blue (#3366FF) | Use 60-30-10 ratio | Children's products, entertainment |
| Orange (#FF8C00), Green (#2ECC71), Purple (#9B59B6) | Keep saturation moderate | Creative brands, arts |
| Cyan (#00CED1), Magenta (#FF1493), Yellow (#FFD700) | Neutralize two, brighten one | Editorial fashion |

#### Monochromatic
Single hue in varying value (light → dark). Minimalist, elegant, easy to execute. Best for luxury and premium brands.

| Hue | Light (tint) | Mid-tone | Dark (shade) | Use Case |
| :-- | :----------- | :------- | :----------- | :------- |
| Navy | #B0C4DE | #4682B4 | #1E3A5F | Corporate trust |
| Burgundy | #F5C6C6 | #A52A2A | #4A0000 | Luxury wine |
| Forest | #C8E6C9 | #4CAF50 | #1B5E20 | Sustainability |
| Slate | #CFD8DC | #607D8B | #263238 | Modern industrial |

## Composition Rules

### Core Framing Techniques

| Framing | Description | When to Use | Example Prompt Direction |
| :------ | :---------- | :---------- | :---------------------- |
| Close-up | Face or object fills the frame, intimate | Emotion focus, product detail, beauty | "extreme close-up, face filling frame, every pore visible" |
| Medium shot | Subject from waist up, some environment | Conversation, lifestyle, product in use | "medium shot, subject at counter, drink in hand, cafe background" |
| Wide shot | Subject fully visible in environment | Establishing scene, lifestyle, fashion | "wide shot, figure standing on cliff edge, ocean stretching behind" |
| Extreme wide | Subject is small within the landscape | Atmosphere, travel, aspirational | "extreme wide, lone figure on salt flat, horizon line at lower third" |
| Overhead / flat lay | Camera pointed straight down | Product flat lays, food, unboxing | "overhead view, birds-eye, flat lay on marble surface" |
| Dutch angle | Tilted horizon, diagonal imbalance | Tension, rebellion, edgy campaigns | "dutch angle, horizon tilted 15 degrees, uneasy mood" |
| Low angle | Camera below subject, looking up | Power, authority, monumentalism | "low angle shot, building towering above, dramatic upward perspective" |
| High angle | Camera above subject, looking down | Vulnerability, overview, documentary | "high angle, subject looking up, surrounded by towering shelves" |
| POV | Through subject's eyes | Immersion, first-person experience | "POV shot, hands holding steering wheel, road ahead" |

### Rule of Thirds

Divide the frame into a 3×3 grid. Place key elements on the intersections or along the lines.

**Example placements:**
- Horizon on the upper third line → emphasis on foreground
- Horizon on the lower third line → emphasis on sky / atmosphere
- Subject's eye on the upper-right intersection → natural reading flow
- Product on the left third, negative space on the right → text-ready composition

### Golden Ratio (Phi Grid)

A 1:1.618 proportion grid. More dynamic than rule of thirds. Place the primary focal point at the spiral's convergence.

**Common marketing applications:**
- Product centered within the spiral's tightest curve, with space flowing outward
- Face composition: eye aligns with the spiral origin, jawline follows the curve
- Landscape: horizon and tree line follow the spiral's arc

### Leading Lines

Use natural or constructed lines in the frame to direct the viewer's eye toward the focal point.

| Line Type | Examples | Effect |
| :-------- | :------- | :----- |
| Straight | Roads, railways, corridors, table edges | Fast, direct eye movement |
| Curved | Rivers, staircases, archways, flowing fabric | Gentle, exploratory eye movement |
| Diagonal | Tilted buildings, crossing arms, shadows | Dynamic, energetic, uneasy |
| Converging | Hallways, avenues, tunnel perspective | Pulls viewer deep into the frame |
| Implied | Gaze direction, pointing hands, arrow shapes | Psychological, subtle direction |

**Example:** "leading lines: a winding stone path draws the eye from the bottom-left corner toward the product at the center-right intersection"

### Negative Space

The empty area around the subject. Essential for text overlay, minimalist branding, and premium feel.

| Negative Space Ratio | Effect | Best For |
| :------------------- | :----- | :------- |
| 20% | Standard, balanced | Product catalogs, editorial |
| 40% | Clean, premium | Luxury packaging, hero shots |
| 60%+ | Minimalist, bold | Fashion editorials, perfume ads |
| 80%+ | Conceptual, avant-garde | High-fashion, art direction |

**Example:** "minimal composition with 70% negative space — product centered on a white field, only a single shadow anchoring it to the ground"

### Balance: Symmetrical vs Asymmetrical

| Type | Description | Branding Fit | Example |
| :--- | :---------- | :----------- | :------ |
| Symmetrical | Mirror image left/right. Stable, formal, authoritative. | Banking, luxury, government, healthcare | Two identical products flanking a central logo |
| Asymmetrical | Unequal visual weight balanced by color, size, or texture. Dynamic, modern. | Tech, fashion, startups, editorial | Large product on the left balanced by a bright accent color on the right |
| Radial | Elements radiate from center. Strong focal point. | Automotive, watches, tech hero shots | Watch face at center, strap curves radiating outward |
| Color balance | Small area of bright/high-saturation balances large area of neutral | Any brand needing attention without symmetry | White page with a small red product at the lower-right |

## Lighting Archetypes

Each lighting archetype conveys a specific mood and production technique. Choose based on emotional tone from the brief.

### Golden Hour

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Warm, aspirational, nostalgic, approachable |
| **Technique** | Low sun 10–15° above horizon, 3200K color temperature, long shadows, backlight halation |
| **Mood** | Hope, warmth, beauty, natural happiness |
| **Best for** | Lifestyle, travel, beauty, food, wellness |
| **Example direction** | "golden hour light, low sun casting long warm shadows, backlit subject with lens flare, skin glowing, grass illuminated in amber tones" |
| **Key visual cues** | Warm orange/amber highlights, deep blue shadows, lens flare, rim light on hair/edges |

### Cinematic Rembrandt

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Dramatic, depth, storytelling, high-end |
| **Technique** | Key light at 45° to subject and slightly above, forming a triangle of light on the cheek opposite the light source. One side of face illuminated, one side in shadow. |
| **Mood** | Mystery, seriousness, narrative depth |
| **Best for** | Luxury, portrait-driven campaigns, fragrance, spirits |
| **Example direction** | "Rembrandt lighting, dramatic key from upper-left, triangle highlight on right cheek, deep shadows on left side of face, cinematic chiaroscuro" |
| **Key visual cues** | Triangle highlight on shadowed cheek, one eye in shadow, deep contrast, film noir atmosphere |

### Soft Studio

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Clean, professional, approachable, product-focused |
| **Technique** | Large softbox or diffusion panel 45° above and 90° horizontal. Fill card opposite. Even illumination with soft shadow transition. |
| **Mood** | Clarity, honesty, precision |
| **Best for** | E-commerce product shots, corporate portraits, food, cosmetics |
| **Example direction** | "soft studio lighting, large octabox key light, wrap-around fill, product evenly lit with soft shadows, white seamless background" |
| **Key visual cues** | Even exposure, soft gradients, minimal specular highlights, gentle shadow falloff |

### Moody Low-Key

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Premium, mysterious, exclusive, intense |
| **Technique** | Single small light source from extreme angle (rim or edge). 70%+ of the frame in shadow. No fill light. |
| **Mood** | Luxury, sensuality, privacy, power |
| **Best for** | Jewelry, watches, perfume, premium automotive interiors, dark spirits |
| **Example direction** | "low-key lighting, single edge light skimming the product surface, 80% of frame in deep shadow, dramatic contrast ratio 8:1, luxurious dark mood" |
| **Key visual cues** | Large shadow areas, bright edge highlights, rich blacks, selective illumination |

### High-Key Bright

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Energetic, clean, optimistic, youthful |
| **Technique** | Multiple diffused light sources from multiple angles. Minimal shadow. Exposure pushed +0.5 to +1.0 stops. |
| **Mood** | Energy, joy, clarity, freshness |
| **Best for** | Lifestyle, fitness, food, family, tech unboxing |
| **Example direction** | "high-key lighting, brightly lit from all angles, no visible shadows, white background blown out to pure white, fresh energetic mood" |
| **Key visual cues** | Near-shadowless, bright whites, high overall exposure, airy feel |

### Silhouette / Backlight

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Graphic, iconic, mysterious, shape-focused |
| **Technique** | Strong light source behind the subject. Subject exposed for background, rendering them dark or black. |
| **Mood** | Drama, anonymity, focus on form |
| **Best for** | Campaign hero images, logo integration, geometric products |
| **Example direction** | "backlit silhouette, subject completely dark against a vibrant sunset gradient, strong graphic shape, no detail in the subject" |
| **Key visual cues** | Dark foreground shape, bright background, strong outline, color transition in background |

### LED / Neon

| Attribute | Specification |
| :-------- | :------------ |
| **Effect** | Futuristic, vibrant, nocturnal, urban |
| **Technique** | Colored LED sources (cyan, magenta, red, blue) as key or accent. Ambient darkness with pools of color. |
| **Mood** | Innovation, nightlife, cyberpunk, energy |
| **Best for** | Tech, gaming, nightlife, fashion, music |
| **Example direction** | "neon lighting, cyan and magenta LED tubes as the only light sources, dark blue ambient, colored reflections on wet pavement" |
| **Key visual cues** | Colored light spills, bounced color on surfaces, high saturation in highlights, dark unlit areas |

## Photography Styles

| Style | Description | Best For | Example Prompt Direction |
| :---- | :---------- | :------- | :---------------------- |
| Editorial | Polished, stylized, high-fashion aesthetic. Strong art direction. | Fashion, luxury, fragrance, magazine-style campaigns | "editorial photography, high-fashion aesthetic, strong composition, deliberately styled, Vogue or Harper's Bazaar quality" |
| Lifestyle | Candid-appearing moments, "real life" scenarios, natural light bias | Food, beverage, family, travel, fitness | "lifestyle photography, candid moment, natural light, authentic expression, unposed feel in a real setting" |
| Product / Hero | Clean, centered, maximum detail. Single product against blank or gradient background. | E-commerce, packaging shots, catalog | "hero product photography, centered, white gradient background, sharp focus throughout, texture detail visible" |
| Macro | Extreme close-up revealing surface detail invisible to the naked eye | Food texture, fabric weave, jewelry facets, skincare | "macro photography, extreme close-up, shallow depth of field, surface texture detail, 1:1 magnification ratio" |
| Aerial / Drone | High-angle exterior shots from above | Real estate, travel destinations, large-scale events, landscapes | "aerial drone photography, directly overhead, geometric landscape patterns, golden hour shadows" |
| Documentary | Unstaged, raw, emotional truth. Grain, imperfect framing, natural contrast. | Social impact campaigns, authentic brand storytelling, BTS | "documentary style photography, grainy, natural contrast, unstaged moment, photojournalism aesthetic, Henri Cartier-Bresson influence" |
| Cinematic | Film still quality. Anamorphic framing, deep color grading, shallow depth of field. | Video game key art, film posters, brand films, luxury | "cinematic still, anamorphic 2.35:1 frame, shallow depth of field, teal-orange color grade, film grain, Roger Deakins influence" |
| Still Life | Arranged objects, controlled composition, often symbolic | Fragrance, jewelry, food, art, brand collections | "still life photography, carefully arranged objects on a marble surface, soft north-facing window light, painterly quality" |
| Architectural | Buildings, interiors, spaces. Emphasizes line, form, scale. | Real estate, hospitality, workplace, retail design | "architectural photography, wide lens, symmetrical composition, clean lines, natural light flooding through windows" |
| Street | Candid, urban, real people in real places | Urban lifestyle, fashion street style, local culture | "street photography, candid, urban setting, real people, natural light, gritty texture, decisive moment" |
| Beauty | Flawless skin rendering, dramatic eye or lip focus, fashion lighting | Cosmetics, skincare, hair care, fragrance | "beauty photography, flawless skin texture, dramatic eye catchlight, smooth gradients, retouched finish, luxury cosmetic campaign" |
| Food | Stylized for appetite appeal. Shallow DOF, steam, splashes, props. | Restaurants, food products, recipe content | "food photography, overhead flat lay, natural light from left, steam rising, fresh ingredients scattered, appetizing golden-brown tones" |

## Art Movements and Style References

Use these as style anchors in image prompts. Each entry includes the visual hallmarks that make the movement recognizable.

| Movement | Era | Visual Hallmarks | Marketing Context |
| :------- | :-: | :--------------- | :---------------- |
| **Modernism** | 1920s–1960s | Clean lines, geometric abstraction, sans-serif typography, bold primary colors, minimal ornamentation | Tech brands, architecture, corporate identity |
| **Minimalism** | 1960s–present | Extreme reduction, monochrome or limited palette, generous negative space, single focal point | Luxury, perfume, high-end tech, meditation apps |
| **Art Deco** | 1920s–1930s | Geometric patterns, gold/black/cream palette, symmetrical, lavish materials (marble, brass, velvet) | Luxury hotels, champagne, jewelry, fashion |
| **Brutalism** | 1950s–1970s | Raw concrete, massive blocky forms, monochrome, functional, unadorned surfaces | Streetwear, architecture firms, heavy industry, edgy brands |
| **Bauhaus** | 1919–1933 | Form follows function, primary colors (red/yellow/blue), geometric simplicity, photomontage | Design-forward brands, furniture, art schools |
| **Pop Art** | 1950s–1960s | Bright flat colors, halftone dots, comic-book style, repetition, commercial imagery | Entertainment, food, consumer goods, playful campaigns |
| **Retro / Mid-Century** | 1940s–1960s | Pastel palettes (mint, pink, teal), atomic-age patterns, rounded shapes, warm tones | Coffee shops, bakeries, lifestyle, apparel, home goods |
| **Cyberpunk** | 1980s–present | Neon on dark backgrounds, high-tech/low-life contrast, rain-slicked streets, holograms, augmented reality | Gaming, tech, nightlife, futuristic product launches |
| **Art Nouveau** | 1890–1910 | Organic flowing lines, floral motifs, whiplash curves, natural forms, romantic | Perfume, wine labels, luxury packaging, weddings |
| **Surrealism** | 1920s–1930s | Dreamlike juxtapositions, impossible scale, floating objects, melting forms, uncanny | Conceptual campaigns, art, luxury, avant-garde fashion |
| **Memphis / Postmodern** | 1980s | Clashing colors, squiggly shapes, Memphis patterns, ironic, playful, asymmetric | Digital-native brands, playful lifestyle, creative agencies |
| **Impressionism** | 1860s–1890s | Soft focus, visible brushstrokes, dappled light, outdoor scenes, pastel palette | Hospitality, fragrance, destination marketing, romantic brands |
| **Vaporwave** | 2010s–present | Glitch effects, CRT scanlines, classical busts, purple/pink/cyan gradients, retro-futurism | Gaming, streaming, digital products, Gen Z campaigns |
| **Japanese Woodblock (Ukiyo-e)** | 1600s–1800s | Bold outlines, flat color fields, wave motifs, cherry blossoms, diagonal composition | Tea, skincare, hospitality, minimalist fashion |

## Mood Board Creation Process

Assemble visual references to establish a shared visual vocabulary before production.

### Step 1: Gather Raw References
Collect 10–20 images from:
- Existing brand campaigns (continuity)
- Competitor visual audits (differentiation)
- Cinematography stills (lighting reference)
- Fine art (art movement anchor)
- Architecture and interiors (environment feel)
- Nature and texture (material palette)
- AI-generated exploration (before committing to direction)

### Step 2: Extract Key Attributes
For each image, annotate with a structured tag:

```
| Reference | Dominant Colors | Lighting Archetype | Composition | Texture | Mood Keywords |
| :-------- | :-------------- | :----------------- | :---------- | :------ | :------------ |
| img-01    | #2C3E50, #E74C3C | Rembrandt          | Dutch angle, leading lines | Polished brass | dramatic, powerful, premium |
| img-02    | #F5CBA7, #FFFFFF | Golden hour        | Rule of thirds, negative space | Soft linen | warm, natural, approachable |
```

### Step 3: Consolidate into Direction
From the annotated board, derive:
- **Palette** → 3–5 hex colors appearing across 70%+ of references
- **Lighting** → the archetype most represented (or blend two)
- **Composition pattern** → recurring framing or balance style
- **Texture palette** → the materials that define the visual world
- **Style anchor** → one or two art movements that unite the images

### Step 4: Validate Against Brief
Cross-check against the creative brief's emotional tone map and brand constraints:
- Does the palette trigger the intended primary emotion?
- Does the lighting match the brand voice (e.g., low-key for luxury)?
- Is every reference brand-compliant (no competitor colors, no off-brand settings)?

### Step 5: Write the Visual Direction Block
Produce a concise visual direction string that can be passed directly into image generation prompts:

```
Palette: #2C3E50 (navy), #E74C3C (accent red), #ECF0F1 (neutral).
Lighting: Rembrandt key from upper-right, deep shadow falloff.
Composition: Dutch angle, leading lines along a mahogany table edge.
Texture: Polished brass, matte leather, silk.
Style anchor: Art Deco meets modern minimalism.
```

## Model Platform Selection Guide

| Platform | Strengths | Weaknesses | Best For |
| :------- | :-------- | :---------- | :------- |
| **Midjourney** | Exceptional aesthetic quality, artistic style range, strong composition, atmosphere | Less precise text rendering, limited control over specific elements, no inpainting API | Artistic/editorial campaigns, lifestyle, fashion, conceptual mood exploration |
| **Stable Diffusion / Flux** | Full technical control (ControlNet, IP-Adapter, LoRA), reproducible outputs, custom fine-tuning | Steeper learning curve, requires manual setup, aesthetic quality varies | Technical product shots, brand consistency at scale, inpainting/outpainting, local production pipelines |
| **DALL-E 3** | Best text rendering in images, strongest prompt adherence, handles complex scenes | Less stylistic variety, more sanitized outputs, less "artistic" default aesthetic | Typography-heavy visuals, social media cards, presentations, quick turnarounds |
| **Adobe Firefly** | Commercial safe licensing, integration with Creative Cloud, vector generation | Smaller style range, slower iteration, limited advanced controls | Commercial production, enterprise brand assets, stock-replacement imagery |
| **Ideogram** | Excellent text rendering, fast iteration, simple interface | Smaller community, fewer advanced features, limited API | Logo mockups, social media content, rapid prototyping |

**Selection decision flow:**
1. Need fine brand consistency across a large set? → **Stable Diffusion / Flux** with LoRA
2. Need stunning single hero shots for a campaign? → **Midjourney** (v6 or later)
3. Need accurate text/logos in the image? → **DALL-E 3** or **Ideogram**
4. Need commercially safe stock replacement? → **Adobe Firefly**
5. Need all three (brand consistency + aesthetic + text)? → Layer a **Midjourney** hero with **DALL-E** text overlays, or use **Flux** with multiple specialized LoRAs

## Common Mistakes

- **Palette listing without hierarchy** — Listing 8 hex codes with no guidance on 60-30-10 distribution leaves the image model with no priority. Always designate primary / secondary / accent.
- **Lighting as an afterthought** — "Good lighting" is not a direction. Pick an archetype from the table above and specify position (e.g., "key light from upper-left at 45°").
- **Composition without purpose** — "Rule of thirds" is a tool, not a goal. State what goes on which intersection and why. "Product on left third, negative space on right for text overlay."
- **Style pollution** — Referencing both "minimalist Japanese wabi-sabi" and "brutalist concrete" in the same brief creates an impossible visual contradiction. Limit to one primary style anchor per visual direction.
- **Ignoring brand constraints** — Creating a beautiful direction that uses competitor colors or off-brand settings wastes the entire production pass. Validate against brand guidelines before writing prompts.
- **No texture specification** — Many prompts describe only color and composition but miss surface feel. "Matte, satin, glossy, rough" changes how light interacts. Always include a texture layer.
- **Mood board without annotation** — Raw reference images without extracted attributes (color, light, composition) force every viewer to interpret them differently. Always annotate the board with structured tags.
