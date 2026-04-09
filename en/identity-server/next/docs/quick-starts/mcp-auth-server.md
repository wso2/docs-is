---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create a new MCP server in Typescript",
      "Defines an MCP tool that adds two numbers",
      "Install <a href='https://www.npmjs.com/package/@asgardeo/mcp-express' target='_blank' rel='noopener noreferrer'>Asgardeo MCP SDK</a>",
      "Set up MCP authorization with {{ product_name }}"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/quick-set-up/'>Set-up {{ product_name }}</a>",
      "Install Node.js on your system",
      "Make sure you have a JavaScript package manager like npm, yarn, or pnpm",
      "A favorite text editor or IDE"
    ],
    source_code: "<a href='https://github.com/wso2/iam-ai-samples/tree/main/mcp-auth/typescript' target='_blank' class='github-icon'>MCP-Auth Sample</a>"
  };
</script>

{% include "../../../../includes/quick-starts/mcp-auth-server.md" %}
