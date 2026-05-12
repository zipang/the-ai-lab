# The Designer

The Designer is a specialized local agent workflow designed to assist web developers in creating and maintaining a robust **Design System** and **Style Guide** for their web applications.

## Goal
The goal of this recipe is to provide a local, autonomous alternative to services like [Google Stitch](https://stitch.withgoogle.com/). By leveraging a specialized agent, developers can define, refine, and document their application's visual language directly within their project's environment.

## Key Capabilities
- **Automated Design Specification**: Generate comprehensive `DESIGN.md` files based on user-provided descriptions or by analyzing external reference URLs.
- **Style Guide Generation**: Automatically create an HTML Style Guide that embeds all theme-specific CSS variables.
- **Visual System Documentation**: The Style Guide will render core elements of the design system, including:
    - **Typography**: Headings (h1-h6), body text, and labels.
    - **UI Components**: Standard buttons, cards, and other essential building blocks.

## How it works
1. **Input**: The agent receives a design description (text) or a reference URL.
2. **Analysis**: It processes the input to extract design tokens (colors, spacing, fonts, etc.).
3. **Drafting**: It generates a `DESIGN.md` file capturing the design system specifications.
4. **Implementation**: It produces an HTML preview file that visualizes these design tokens using CSS variables, allowing immediate verification of the visual system.

## Agent deployment
To be activated inside a new project
