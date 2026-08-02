---
name:  design-system-frontend
description: How to author well structured HTML blocks or components that respect the full design system values defined with our theme stylesheet (CSS variables). Use when authoring/updating static webpages that use a theme created with the `design-system-tokens` skill
---

# CONTEXT

This skill is a complementary set of rules that work together with the `design-system-tokens` skill (required).
The design-system-tokens list all the CSS variables available in our theme stylesheet, and their usage.
Use this skill when authoring pages that must implement our Design System conventions by using exclusively the values of these tokens.

But first of all, you must identify the proper working directory that contain the theme values.
Read the relevant `PRODUCT.md` file associated with the theme and locate the appropriate theme stylesheet (`<theme>.css`) in the same directory.

## RULES

* VERIFY THAT the theme stylesheet is properly loaded in the edited page
* NEVER use a hardcodeed value for a property that is covered by the Design System rules: Typography font families, font weight, color palette for the text and surfaces, spacing (padding and margin), shapes (border and elevation presets).

## USE CASE : PROTOTYPING WITH VANILLA HTML+JS

* Use this approach when authoring complete, _disposable_ HTML pages, e.g. for _prototyping_ the look and feel of a page
* Don't use this approach when working with Reatc or other components oriented framework.
* Load the [utilities.css](./references/utilities.css) stylesheet : copy the stylesheet next to the theme stylecheet and ensure that is is loaded after the theme in the page's head section.
* Create classes to declare the components scope (e.g. `.card`, `.card-header`, `.card-body`, `.card-footer`, ) and their common styles
* Add the utility classes (`.text-brand-primary`, `.bg-surface-alt`, `.p-md`, ...) to generate the variants like in Tailwind

## USE CASE : COMPONENT APPROACH (jQuery, React, Vue, Svelte...)

* Use `data-*` attributes like `data-variant` or `data-size` to hold and style the component variants (e.g. `data-variant="{btn-primary|btn-cta}"`, `data-size="xl"`..)
