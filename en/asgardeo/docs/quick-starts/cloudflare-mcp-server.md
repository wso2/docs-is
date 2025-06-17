---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new Cloudflare MCP server",
      "Set up Asgardeo for user authentication",
      "Define an MCP tool to return profile information"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "<a href='https://dash.cloudflare.com/sign-up'>Cloudflare account</a>",
      "Install Node.js on your system",
      "Make sure you have a JavaScript package manager like npm, yarn, or pnpm",
      "A favorite text editor or IDE"
    ],
    source_code: "<a href='https://github.com/sagara-gunathunga/cloudflare-mcp-asgardeo/tree/main/asgardeo-mcp-quickstart' target='_blank' class='github-icon'>Cloudflare MCP server Sample</a>"
  };
</script>

{% include "../../../includes/quick-starts/cloudflare-mcp-server.md" %}
