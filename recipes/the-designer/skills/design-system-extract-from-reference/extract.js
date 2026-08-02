function extractDesignTokens() {
  const SKIP_TAGS = new Set([
    "script",
    "style",
    "head",
    "meta",
    "link",
    "noscript",
    "template",
    "source",
    "title",
    "base",
    "iframe",
    "svg",
    "path",
  ]);

  const GENERIC_FONTS = new Set([
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "ui-sans-serif",
    "ui-serif",
    "ui-monospace",
    "ui-rounded",
  ]);

  const MIN_COUNT = 4;
  const TOP_N = 30;
  const MAX_ELEMENTS = 8000;

  const TYPO_SELECTOR = "h1, h2, h3, h4, h5, h6, p, a, button, code";
  const CONTAINER_SELECTOR =
    "header, footer, section, main, aside, nav, article, button, div, a[role=button]";

  const isTrivialColor = (v) =>
    !v ||
    v === "transparent" ||
    v === "rgba(0, 0, 0, 0)" ||
    v === "currentcolor";
  const isTrivialLength = (v) =>
    !v || v === "0px" || v === "none" || v === "auto";
  const isTrivialShadow = (v) => !v || v === "none";
  const isTrivialFontSize = (v) => !v || v === "0px";
  const isNeverTrivial = (v) => !v;

  const primaryFont = (stack) => {
    const text = String(stack || "").trim();
    if (!text || /var\(/i.test(text)) return "";
    const families = text
      .split(",")
      .map((f) => f.trim().replace(/^["']|["']$/g, ""));
    return families.find((f) => f && !GENERIC_FONTS.has(f.toLowerCase())) || "";
  };

  const newMap = () => new Map();

  const bump = (map, value, isTrivial) => {
    const v = String(value || "").trim();
    if (isTrivial(v)) return;
    map.set(v, (map.get(v) || 0) + 1);
  };

  const finalize = (map, { withRem = false, withPrimary = false } = {}) => {
    const entries = [];
    for (const [value, count] of map) {
      if (count < MIN_COUNT) continue;
      const entry = { value, count };
      if (withRem && /px$/.test(value)) {
        const px = parseFloat(value);
        if (px && Number.isFinite(px)) entry.rem = (px / 16).toFixed(3) + "rem";
      }
      if (withPrimary) entry.primary = primaryFont(value);
      entries.push(entry);
    }
    entries.sort((a, b) => b.count - a.count);
    return entries.slice(0, TOP_N);
  };

  // Like finalize but returns the single most frequent value with no
  // MIN_COUNT threshold. Used for font-family roles where a page may have
  // only a handful of headings or <code> elements.
  const topValue = (map) => {
    let best = "",
      bestCount = 0;
    for (const [value, count] of map) {
      if (count > bestCount) {
        best = value;
        bestCount = count;
      }
    }
    return best;
  };

  const colors = { background: newMap(), text: newMap() };
  const typography = {
    fontFamily: newMap(),
    fontSize: newMap(),
    fontWeight: newMap(),
    lineHeight: newMap(),
    letterSpacing: newMap(),
  };
  // Font-family role maps — categorize the same typography elements by tag
  // to derive semantic roles: h1-h6 → display, code → mono, else → base.
  const headingFonts = newMap();
  const bodyFonts = newMap();
  const codeFonts = newMap();
  const spacing = { padding: newMap(), margin: newMap() };
  const borders = { radius: newMap(), width: newMap() };
  const elevation = { boxShadow: newMap() };

  let seen = 0;

  for (const el of document.querySelectorAll(TYPO_SELECTOR)) {
    if (seen >= MAX_ELEMENTS) break;
    const tag = (el.tagName || "").toLowerCase();
    if (SKIP_TAGS.has(tag)) continue;
    if (el.getAttribute("aria-hidden") === "true" || el.hasAttribute("hidden"))
      continue;
    const cs = getComputedStyle(el);
    if (
      cs.display === "none" ||
      cs.visibility === "hidden" ||
      cs.visibility === "collapse"
    )
      continue;
    seen++;
    bump(typography.fontFamily, cs.fontFamily, isNeverTrivial);
    bump(typography.fontSize, cs.fontSize, isTrivialFontSize);
    bump(typography.fontWeight, cs.fontWeight, isNeverTrivial);
    bump(typography.lineHeight, cs.lineHeight, isNeverTrivial);
    bump(typography.letterSpacing, cs.letterSpacing, isNeverTrivial);
    // Categorize font family by semantic role for the fontFamilies result.
    if (/^h[1-6]$/.test(tag)) {
      bump(headingFonts, cs.fontFamily, isNeverTrivial);
    } else if (tag === "code") {
      bump(codeFonts, cs.fontFamily, isNeverTrivial);
    } else {
      bump(bodyFonts, cs.fontFamily, isNeverTrivial);
    }
  }

  seen = 0;

  for (const el of document.querySelectorAll(CONTAINER_SELECTOR)) {
    if (seen >= MAX_ELEMENTS) break;
    const tag = (el.tagName || "").toLowerCase();
    if (SKIP_TAGS.has(tag)) continue;
    if (el.getAttribute("aria-hidden") === "true" || el.hasAttribute("hidden"))
      continue;
    const cs = getComputedStyle(el);
    if (
      cs.display === "none" ||
      cs.visibility === "hidden" ||
      cs.visibility === "collapse"
    )
      continue;
    seen++;
    bump(colors.background, cs.backgroundColor, isTrivialColor);
    bump(colors.text, cs.color, isTrivialColor);
    bump(spacing.padding, cs.paddingTop, isTrivialLength);
    bump(spacing.padding, cs.paddingRight, isTrivialLength);
    bump(spacing.padding, cs.paddingBottom, isTrivialLength);
    bump(spacing.padding, cs.paddingLeft, isTrivialLength);
    bump(spacing.margin, cs.marginTop, isTrivialLength);
    bump(spacing.margin, cs.marginRight, isTrivialLength);
    bump(spacing.margin, cs.marginBottom, isTrivialLength);
    bump(spacing.margin, cs.marginLeft, isTrivialLength);
    bump(borders.radius, cs.borderTopLeftRadius, isTrivialLength);
    bump(borders.radius, cs.borderTopRightRadius, isTrivialLength);
    bump(borders.radius, cs.borderBottomRightRadius, isTrivialLength);
    bump(borders.radius, cs.borderBottomLeftRadius, isTrivialLength);
    bump(borders.width, cs.borderTopWidth, isTrivialLength);
    bump(borders.width, cs.borderRightWidth, isTrivialLength);
    bump(borders.width, cs.borderBottomWidth, isTrivialLength);
    bump(borders.width, cs.borderLeftWidth, isTrivialLength);
    bump(elevation.boxShadow, cs.boxShadow, isTrivialShadow);
  }

  // Resolve the three semantic font families from the role maps.
  // base   — most frequent family across p, a, button (body text).
  // display — most frequent family across h1-h6 (headings).
  // mono   — most frequent family across <code> elements; if the page has
  //          no <code>, probe a temporary <code> element to read the site's
  //          `code { font-family }` rule (or the browser default monospace).
  let monoFont = topValue(codeFonts);
  if (!monoFont) {
    const probe = document.createElement("code");
    probe.style.visibility = "hidden";
    probe.style.position = "absolute";
    probe.textContent = "x";
    document.body.appendChild(probe);
    monoFont = getComputedStyle(probe).fontFamily;
    probe.remove();
  }

  const fontFamilies = {
    base: topValue(bodyFonts),
    display: topValue(headingFonts),
    mono: monoFont,
  };

  const fontFaces = [];
  const mediaQueries = [];
  try {
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      if (!rules) continue;
      for (const rule of rules) {
        if (rule instanceof CSSFontFaceRule) {
          fontFaces.push({
            fontFamily: rule.style.getPropertyValue("font-family"),
            src: rule.style.getPropertyValue("src"),
            fontWeight: rule.style.getPropertyValue("font-weight"),
            fontStyle: rule.style.getPropertyValue("font-style"),
          });
        }
        if (rule instanceof CSSMediaRule) {
          mediaQueries.push(rule.media.mediaText);
        }
      }
    }
  } catch {}

  return {
    fontFamilies,
    colors: {
      background: finalize(colors.background),
      text: finalize(colors.text),
    },
    typography: {
      fontFamily: finalize(typography.fontFamily, { withPrimary: true }),
      fontSize: finalize(typography.fontSize, { withRem: true }),
      fontWeight: finalize(typography.fontWeight),
      lineHeight: finalize(typography.lineHeight),
      letterSpacing: finalize(typography.letterSpacing),
    },
    spacing: {
      padding: finalize(spacing.padding, { withRem: true }),
      margin: finalize(spacing.margin, { withRem: true }),
    },
    borders: {
      radius: finalize(borders.radius, { withRem: true }),
      width: finalize(borders.width, { withRem: true }),
    },
    elevation: {
      boxShadow: finalize(elevation.boxShadow),
    },
    fontFaces,
    mediaQueries,
  };
}

extractDesignTokens();
