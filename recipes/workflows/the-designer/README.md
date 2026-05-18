# The Designer

The Designer is a specialized local agent workflow designed to assist web developers in creating and maintaining a robust **Design System** and **Style Guide** for their web applications.

## Goal
The goal of this recipe is to provide a _local_, _autonomous_ alternative to services like [Google Stitch](https://stitch.withgoogle.com/). By leveraging a specialized agent, developers can define, refine, and document their application's visual language directly within their project's environment.

## Key Capabilities
- **Automated Design Specification**: Generate comprehensive `DESIGN.md` files based on user-provided descriptions or by analyzing external reference URLs.
- **Style Guide Generation**: Automatically create an HTML Style Guide that embeds all theme-specific CSS variables.
- **Visual System Documentation**: The Style Guide renders core elements of the design system, including:
    - **Typography**: Headings (h1-h6), body text, and labels.
    - **UI Components**: Standard buttons, cards, and other essential building blocks.
- **Project Scaffolding**: Automatically creates the directory structure for your theme, including a `README.md` and `guide/` directory.

## How It Works
1. **Input**: The agent receives a design description (text) or a reference URL.
2. **Analysis**: It processes the input to extract design tokens (colors, spacing, fonts, etc.).
3. **Drafting**: It generates a `DESIGN.md` file capturing the design system specifications, following the [standard format](./design-file-specs.md).
4. **Implementation**: It produces an HTML preview file (`guide/index.html`) and a stylesheet (`guide/theme.css`) that visualize these design tokens using CSS variables.

## Recipe Contents
- `AGENT.md`: The core instructions for the "The Designer" agent.
- `design-file-specs.md`: Detailed specifications for the `DESIGN.md` format.

## Deployment

### 1. Register the Agent

To use "The Designer", you need to add it to your Opencode configuration. You can do this per-project or globally.

#### Per-project (Recommended)
Copy the `AGENT.md` instructions from this recipe into the project's agent configuration (you'll have to ask for the path of the project):

```bash
cp recipes/workflows/the-designer/AGENT.md /path/to/project/.opencode/agents/the-designer.md
cp recipes/workflows/the-designer/design-file-specs.md /path/to/project/.opencode/agents/design-file-specs.md
```

#### Global
To make the agent available in all your projects:

```bash
mkdir -p ~/.config/opencode/agents
cp recipes/workflows/the-designer/AGENT.md ~/.config/opencode/agents/the-designer.md
```

### 2. Verify dependencies
The agent uses `bun` to serve the style guide and `google/design.md` for linting. Ensure you have `bun` installed.

## Usage

Once deployed, you can invoke the agent in your Opencode terminal:

1. **Start a session**: Use TAB to select `The Designer` agent.
2. **Provide a prompt**: 
   > - "Create a new design system named 'OceanFlow' inspired by https://example.com"
   > - "I want a professional, high-contrast theme with blue accents and rounded buttons."
3. **Iterate**: The agent will ask questions and propose changes to your `DESIGN.md` and Style Guide.
4. **Serve the Guide**: To view your Style Guide, follow the instructions in the generated `README.md` of your theme (typically `bun path/to/theme/guide/index.html`).
