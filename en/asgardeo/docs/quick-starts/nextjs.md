---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new Next.js app",
      "Install <a href='https://www.npmjs.com/package/@asgardeo/nextjs' target='_blank' rel='noopener noreferrer'>@asgardeo/nextjs</a> package",
      "Add user login and logout",
      "Display user profile information"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>.",
      "A favorite text editor or IDE"
    ],
    source_code: "<a href='https://github.com/asgardeo/web-ui-sdks/tree/main/samples/teamspace-nextjs' target='_blank' class='github-icon'>Next.js App Sample</a>",
    whats_next: [
      "Try out <a href='{{ base_path }}/complete-guides/nextjs/introduction/' target='_blank'>{{ product_name }} complete Next.js guide</a>"
    ]
  };
</script>

{% include "../../../includes/quick-starts/nextjs.md" %}
