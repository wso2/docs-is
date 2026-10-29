# User self-service

{{ product_name }} provides a built-in self-service portal which users can use to manage their own accounts. Learn more about the [My Account portal]({{base_path}}/guides/user-self-service/overview/) and its capabilities.

You can also incorporate self-service capabilities into your business applications by invoking the APIs offered by {{product_name}}. Refer [Build self-service capabilities]({{base_path}}/guides/user-self-service/build-self-service-capabilities/) to learn more.
{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}
To let users manage their own accounts through an AI agent, use the [Self-service MCP server]({{base_path}}/guides/user-self-service/self-service-mcp-server/).
{% endif %}
