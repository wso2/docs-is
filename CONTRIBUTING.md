# Contributing to WSO2 Identity Server / Asgardeo Documentation

We would really appreciate your contributions to WSO2 Identity Server / Asgardeo Docs to help make it even better than it is today!
As a contributor, here are the guidelines we would like you to follow:

 - [Adding Quickstart guides](#adding-quickstart-guides)
 - [Adding Complete guides](#adding-complete-guides)

## Adding Quickstart guides

Please refer added sample [en/asgardeo/docs/quick-starts/react.md](en/asgardeo/docs/quick-starts/react.md). 

#### Example

Add below frontmatter yaml block to your new file along with quick start steps with H2 headings. Which will auto convert to steps in the page.

```markdown
---
template: templates/quick-start.html
heading: <!-- Page heading -->
description: <!-- Page sub heading description -->
what_you_will_learn: <!-- List of text (HTML supported) -->
prerequisites: <!-- List of text (HTML supported) -->
source_code: <a href="link" target="_blank" class="github-icon"><!-- Sample Name --></a>
whats_next: <!-- List of text (HTML supported) -->
---

## Step 1

Some Content

## Step 2

Some Content
```

## Adding Complete guides

Please refer added sample [en/asgardeo/docs/complete-guides/react](en/asgardeo/docs/complete-guides/react). 

Need below front-matter config in the doc file.

E.g., 
```yaml
---
template: templates/complete-guide.html
heading: Introduction
read_time: 2 mins
---
```

And in define pages in `mkdocs.yaml` config file.

E.g., 
```yaml
---
nav_icons:
    React: fontawesome/brands/react

nav:
  - Technology Guides:
    - React: complete-guides/react/introduction.md
  - React|hide_nav:
    - Introduction: complete-guides/react/introduction.md
    - Prerequisite: complete-guides/react/prerequisite.md
    ...
    - Next Steps: complete-guides/react/next-steps.md
---
```
