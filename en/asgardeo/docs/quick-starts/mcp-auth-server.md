---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new Node.js MCP server",
      "Install <a href='https://www.npmjs.com/package/mcp-auth' target='_blank' rel='noopener noreferrer'>MCP Auth</a> package",
      "Set up {{ product_name }} for user authentication",
      "Define an MCP tool to return profile information"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "Install Node.js on your system",
      "Make sure you have a JavaScript package manager like npm, yarn, or pnpm",
      "Install <a href='https://claude.ai/download' target='_blank' rel='noopener noreferrer'>Claude Desktop</a>",
      "A favorite text editor or IDE"
    ],
    source_code: "<a href='https://github.com/sagara-gunathunga/mcp-auth-qsg' target='_blank' class='github-icon'>MCP-Auth Sample</a>"
  };
</script>

{% include "../../../includes/quick-starts/mcp-auth-server.md" %}
