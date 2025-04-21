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
---

<script>
  const meta = {
    what_you_will_learn: [],
    prerequisites: [],
    source_code: "",
    whats_next: []
  };
</script>

# Heading

Description text

[//] STEPS_START

## Step 1

Some Content

## Step 2

Some Content

[//] STEPS_END

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

extra:
  isolated_templates:
    - templates/complete-guide.html

  expanded_navs:
    - title: Guides
      options:
        - divider
        - verticle-line
    - title: Technology Guides
      options:
        - divider
    - title: Best Practice Guides

  # If the nav_override section is a child of expanded_nav. Add +1 to the level value
  # No 'level' specified will apply at all the levels
  nav_overrides:
    React:
      link: complete-guides/react/introduction
      level: 2
    Javascript:
      link: complete-guides/javascript/introduction
      level: 2
    Redirect-Based:
      link: complete-guides/nextjs/introduction
      level: 3
    App-Native:
      link: complete-guides/app-native/introduction
      level: 3

  # No 'level' specified will apply at all the levels
  nav_icons:
    References:
      icon: octicons/link-external-16
      level: 1
    React:
      icon: fontawesome/brands/react
      level: 2
    .NET:
      icon: assets/libs/custom-icons/dotnet.svg
      level: 2
    Node.js:
      icon: fontawesome/brands/node-js
      level: 2

nav:
  - Technology Guides:
    - React:
      - Introduction: complete-guides/react/introduction.md
      ...
      - Next Steps: complete-guides/react/next-steps.md
    - Next.js:
      - B2B:
        - Introduction: complete-guides/nextjs-b2b/introduction.md
        ...
      - Redirect-Based:
        - Introduction: complete-guides/nextjs/introduction.md
        ...
        - Next Steps: complete-guides/nextjs/next-steps.md
      - App-Native:
        - Introduction: complete-guides/app-native/introduction.md
        ...
        - Next Steps: complete-guides/app-native/next-steps.md
---
```
