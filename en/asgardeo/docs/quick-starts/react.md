---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new React app using Vite",
      "Install <a href='https://www.npmjs.com/package/@asgardeo/react' target='_blank' rel='noopener noreferrer'>@asgardeo/react</a> package",
      "Add user sign-in and sign-out",
      "Display user profile information"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>Asgardeo account</a>",
      "Install <a href='https://nodejs.org/en/download/package-manager' target='_blank' rel='noopener noreferrer'>Node.js</a> on your system.",
      "Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>.",
      "A favorite text editor or IDE"
    ],
    source_code: "<a href='https://github.com/asgardeo/web-ui-sdks/tree/main/samples/teamspace-react' target='_blank' class='github-icon'>React Vite App Sample</a>",
    whats_next: [
      "Try out <a href='{{ base_path }}/complete-guides/react/introduction/' target='_blank'>{{ product_name }} complete React guide</a>"
    ]
  };
</script>

{% include "../../../includes/quick-starts/react.md" %}
