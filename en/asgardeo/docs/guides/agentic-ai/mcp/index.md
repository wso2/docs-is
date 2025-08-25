The Model Context Protocol (MCP) provides a standardized way for AI agents and applications to interact with model resources. Asgardeo offers capabilities to control these interactions, ensuring that access to MCP servers and their resources is secure and well-managed.

## [Securing MCP servers]({{base_path}}/guides/agentic-ai/mcp/mcp-server-authorization)

MCP servers can be registered in Asgardeo as protected resources. This setup allows administrators to define precise access policies for each server, specifying which clients or applications are authorized to interact with it. By safeguarding MCP servers in this way, organizations can maintain consistent authorization rules and minimize the risk of unauthorized access.

## [Securing MCP clients]({{base_path}}/guides/agentic-ai/mcp/register-mcp-client-app)

Applications or agents that need to communicate with MCP servers can be registered as MCP clients. During registration, clients can be assigned scopes that define the resources and capabilities they are permitted to access. This ensures that clients operate only within the boundaries of their authorized permissions, maintaining a secure ecosystem for model interactions.

Through these features, Asgardeo centralizes the management of MCP authorization, making it easier to enforce secure interactions between clients and servers, maintain compliance, and manage permissions efficiently across AI agent ecosystems.
