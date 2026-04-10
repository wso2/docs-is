---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Authenticate AI agents with {{ product_name }}",
      "Use agent credentials or On-Behalf-Of (OBO) authentication flows",
      "Connect authenticated agents to secure MCP servers",
      "Invoke MCP tools safely from modern AI agent frameworks"
    ],
    prerequisites: [
      "About 15 minutes",
      "A <a href='{{ base_path }}/get-started/quick-set-up/'>{{ product_name }} setup</a>",
      "Node.js installed on your system",
      "Make sure you have a JavaScript package manager like npm, yarn, or pnpm",
      "A text editor or IDE",
      "An MCP server secured with {{ product_name }} (you may use your own or follow the [MCP Auth Server quickstart]({{base_path}}/quick-starts/mcp-auth-server))"
    ],
    source_code: "<a href='https://github.com/wso2/iam-ai-samples/tree/main/agent-identity/typescript' target='_blank' class='github-icon'>Agent-Auth TypeScript Sample</a>"
  };
</script>

{% include "../../../../includes/quick-starts/agent-auth-ts.md" %}
