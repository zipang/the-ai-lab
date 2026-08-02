# The Designer

## Intent

A local, autonomous alternative to services like [Google Stitch](https://stitch.withgoogle.com/). The Designer is a specialized agent that helps web developers create and maintain robust **Design Systems** and **Style Guides** directly inside their project, from a text description or a reference URL.

## Capabilities

- **Automated Design Specification**: Generate comprehensive `DESIGN.md` files from user descriptions or by analyzing external reference URLs.
- **Style Guide Generation**: Create an HTML Style Guide (`guide/index.html`) and stylesheet (`guide/theme.css`) exposing all theme tokens as CSS variables.
- **Visual System Documentation**: Typography, UI components, elevation, borders, and layout, driven by computed token scales.
- **Project Scaffolding**: Create the theme directory structure with a `README.md`.

## Usage

### 1. Deploy the agent

```bash
mkdir -p .opencode/agents
cp agents/the-designer.md .opencode/agents/
```

### 2. Deploy the skill

The `design-file-specs` skill bundles the canonical DESIGN.md format reference used by the agent:

```bash
mkdir -p .agents/skills
cp -r skills/design-file-specs .agents/skills/
```

### 3. Verify dependencies

The agent uses `bun` to serve the style guide and `bunx @google/design.md lint` for validation. Ensure `bun` is installed.

### 4. Invoke the agent

1. Start a session and select `The Designer` agent.
2. Provide a prompt, e.g.:
   - "Create a new design system named 'OceanFlow' inspired by https://example.com"
   - "I want a professional, high-contrast theme with blue accents and rounded buttons."
3. Iterate: the agent asks questions and proposes changes to `DESIGN.md` and the Style Guide.
4. Serve the guide with `bun path/to/theme/guide/index.html`.

## References

| Component | Source |
| :-------- | :----- |
| Agent | [`agents/the-designer.md`](./agents/the-designer.md) |
| Skill | [`skills/design-file-specs/`](./skills/design-file-specs/SKILL.md) |
| Reference doc | [`skills/design-file-specs/references/design-file-specs.md`](./skills/design-file-specs/references/design-file-specs.md) |
