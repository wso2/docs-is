---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new Angular app",
      "Install <a href='https://www.npmjs.com/package/angular-oauth2-oidc' target='_blank' rel='noopener noreferrer'>angular-oauth2-oidc</a> package",
      "Add user login and logout",
      "Display user profile information"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{product_name}} account</a>",
      "Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>",
      "Install <a href='https://angular.dev/tools/cli/setup-local' target='_blank' rel='noopener noreferrer'>Angular CLI </a>",
      "A favorite text editor or IDE"
    ],
    whats_next: [
      "Try out <a href='{{ base_path }}/complete-guides/angular/introduction/' target='_blank'>{{ product_name }} complete Angular guide</a>"
    ]
  };
</script>

{% include "../../../includes/quick-starts/angular.md" %}
