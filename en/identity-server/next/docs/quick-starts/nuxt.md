---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create a new Nuxt app",
      "Install <a href='https://www.npmjs.com/package/@asgardeo/nuxt' target='_blank' rel='noopener noreferrer'>@asgardeo/nuxt</a> module",
      "Add user sign-in and sign-out",
      "Display user profile information",
      "Protect a page with middleware"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/quick-set-up/'>Set-up {{ product_name }}</a>",
      "Install <a href='https://nodejs.org/en/download/package-manager' target='_blank' rel='noopener noreferrer'>Node.js</a> on your system.",
      "Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>.",
      "A favorite text editor or IDE"
    ]
  };
</script>

{% include "../../../../includes/quick-starts/nuxt.md" %}
