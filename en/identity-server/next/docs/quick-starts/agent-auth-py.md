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
      "Python 3.10 or later installed on your system",
      "pip or another Python package manager",
      "A text editor or IDE",
      "An MCP server secured with {{ product_name }} (you may use your own or follow the [MCP Auth Server quickstart]({{base_path}}/quick-starts/mcp-auth-server-py))"
    ],
    source_code: "<a href='https://github.com/wso2/iam-ai-samples/tree/main/agent-identity/python' target='_blank' class='github-icon'>Agent-Auth Python Sample</a>"
  };
</script>

{% include "../../../../includes/quick-starts/agent-auth-py.md" %}
