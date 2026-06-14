---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Build and install the WSO2 Identity Platform MCP Server",
      "Configure your WSO2 Identity Platform organization",
      "Set up your code editor with the WSO2 Identity Platform MCP Server"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>WSO2 Identity Platform account</a>",
      "Install <a href='https://go.dev/doc/install' target='_blank' rel='noopener noreferrer'>Go</a> on your system.",
      "You need to have one of the following tools installed: <a href='https://code.visualstudio.com/download' target='_blank' rel='noopener noreferrer'>VS Code</a>, <a href='https://claude.ai/download' target='_blank' rel='noopener noreferrer'>Claude Desktop</a>, <a href='https://www.cursor.com/en/downloads' target='_blank' rel='noopener noreferrer'>Cursor</a>,  <a href='https://windsurf.com/download' target='_blank' rel='noopener noreferrer'>Windsurf</a> or any other MCP-compatible client"
    ],
    source_code: "<a href='https://github.com/asgardeo/asgardeo-mcp-server' target='_blank' class='github-icon'>WSO2 Identity Platform MCP Server</a>",

  };
</script>

{% include "../../../includes/quick-starts/mcp-server.md" %}
