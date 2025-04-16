---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new Next.js app",
      "Install <a href='https://authjs.dev/reference/core/providers/asgardeo' target='_blank' rel='noopener noreferrer'>Asgardeo provider for Auth.js </a>",
      "Add user login and logout",
      "Display user profile information"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>.",
      "A favorite text editor or IDE"
    ],
    whats_next: [
      "Try out <a href='{{ base_path }}/complete-guides/nextjs/introduction/' target='_blank'>{{ product_name }} complete Next.js guide</a>"
    ]
  };
</script>

{% include "../../../includes/quick-starts/nextjs.md" %}