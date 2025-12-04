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
      "An <a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "Python installed on your system",
      "pip or another Python package manager",
      "A favorite text editor or IDE",
      "An MCP server secured with {{ product_name }} (you may use your own or follow the <a href='https://wso2.com/asgardeo/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server'>MCP Auth Server quickstart</a>)"
    ],
    source_code: "<a href='https://github.com/wso2/iam-ai-samples/tree/main/mcp-auth/python' target='_blank' class='github-icon'>Agent-Auth Python Sample</a>"
  };
</script>

{% include "../../../includes/quick-starts/agent-auth-py.md" %}
