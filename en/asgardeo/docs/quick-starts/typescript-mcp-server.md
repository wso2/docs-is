---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Create new TypeScript MCP server",
      "Install <a href='https://www.npmjs.com/package/@asgardeo/mcp-express' target='_blank' rel='noopener noreferrer'>@asgardeo/mcp-express</a> SDK",
      "Set up {{ product_name }} for user authentication",
      "Define authenticated MCP tools with type safety",
      "Return user profile information securely"
    ],
    prerequisites: [
      "About 20 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "Install <a href='https://nodejs.org/en/download/package-manager' target='_blank' rel='noopener noreferrer'>Node.js</a> (v16 or higher) on your system",
      "Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>",
      "Install <a href='https://claude.ai/download' target='_blank' rel='noopener noreferrer'>Claude Desktop</a>",
      "A favorite text editor or IDE with TypeScript support"
    ],
    source_code: "<a href='https://github.com/ngsanthosh/typescript-mcp-auth-quickstart' target='_blank' class='github-icon'>TypeScript MCP Auth Sample</a>"
  };
</script>

{% include "../../../includes/quick-starts/typescript-mcp-server.md" %}