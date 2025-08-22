[The Model Context Protocol (MCP)](https://modelcontextprotocol.io/) provides a standardized way for AI agents and applications to interact with model resources. Asgardeo offers capabilities to control these interactions, ensuring that access to MCP servers and their resources is secure and well-managed.

## [Securing MCP servers]({{base_path}}/guides/agentic-ai/mcp/mcp-server-authorization)

MCP servers can be registered as protected resources in Asgardeo. This setup allows administrators to define precise access controls for each server and their tools and resources, specifying which clients or users are authorized to interact with it. By securely exposing remote MCP servers, organizations can maintain consistent authorization rules and minimize the risk of unauthorized access to MCP servers and their tools, and protect underlying business resources.

## [Setup MCP clients]({{base_path}}/guides/agentic-ai/mcp/register-mcp-client-app)

An MCP client is a connection component that host applications use to interface with MCP servers through dedicated, stateful sessions. When connecting to an MCP server, you can register the client in Asgardeo, which also creates an OAuth 2.1 client meeting the necessary standards. Clients can be authorized with specific scopes that define their permitted access to MCP servers, ensuring they operate only within authorized boundaries and maintain a secure ecosystem for model interactions.

Through these features, Asgardeo centralizes the management of MCP authorization, making it easier to enforce secure interactions between clients and servers, maintain compliance, and manage permissions efficiently across AI agent ecosystems.
