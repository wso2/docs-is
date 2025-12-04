---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Set up a secure MCP server using Python",
      "Connect your server to {{ product_name }} for authentication",
      "Access MCP tools and resources securely"
    ],
    prerequisites: [
      "About 15 minutes",
      "An <a href='{{ base_path }}/get-started/create-asgardeo-account/'>{{ product_name }} account</a>",
      "Install Python 3.10 or later on your system",
      "Python package installer like pip installed",
      "A favorite text editor or IDE"
    ],
    source_code: "<a href='https://github.com/wso2/iam-ai-samples/tree/main/mcp-auth/python' target='_blank' class='github-icon'>MCP-Auth Python Sample</a>"
  };
</script>

{% include "../../../includes/quick-starts/mcp-auth-server-py.md" %}
