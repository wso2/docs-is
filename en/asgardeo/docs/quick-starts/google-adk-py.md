---
template: templates/quick-start.html
---

<script>
  const meta = {
    what_you_will_learn: [
      "Build an AI agent using Google ADK",
      "Install <a href='https://pypi.org/project/asgardeo_ai/' target='_blank' rel='noopener noreferrer'>asgardeo_ai</a> package",
      "Connect the AI agent to a MCP server",
      "Add AI agent login",
      "Add AI agent login on behalf of a user"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>WSO2 Identity Platform account</a>",
      "<a href='https://www.python.org/downloads/' target='_blank' rel='noopener noreferrer'>Python 3.10</a> or later",
      "Package manager such as <a href='https://pypi.org/project/pip/'target='_blank' rel='noopener noreferrer'>pip</a>"
    ],
    source_code: "<a href='https://github.com/wso2/iam-ai-samples/tree/main/agent-identity/python'' target='_blank' class='github-icon'>Google ADK Python Sample</a>"
  };
</script>

{% include "../../../includes/quick-starts/google-adk-py.md" %}
