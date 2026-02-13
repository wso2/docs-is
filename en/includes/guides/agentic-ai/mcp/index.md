## What is MCP Authorization?

The **Model Context Protocol [MCP](https://modelcontextprotocol.io/)** standardizes how AI agents discover and invoke tools. However, a raw MCP connection is an open pipe: once connected, a client can often invoke *any* tool.

[**MCP Authorization Specification**](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) uses OAuth 2.1 for secure client authentication and access delegation.

While satisfying Authorization Server requirements for MCP specification, {{ product_name }} centralizes the management of MCP authorization, making it easier to configure and enforce secure interactions between clients and servers, maintain compliance, and manage permissions efficiently across AI agent ecosystems.

## Architecture: MCP in the Identity Model

In {{ product_name }}'s IAM model, MCP components map directly to standard MCP concepts:

| MCP Concept | IAM Concept | Role |
| :---- | :---- | :---- |
| **MCP Host** | **Agent** | The agent that is using the tools obtained via MCP |
| **MCP Client** | **MCP Client App** | The software component connecting to the MCP Server |
| **MCP Server** | **Resource Server** | Exposes tools as protected API endpoints |
| **Permission** | **OAuth Scope** | Granular permission (e.g., `filesystem:read`, `stripe:charge`) |
| **Connection** | **Authorized Session** | A session backed by a valid Access Token |

- A user can connect to the MCP Server using an MCP Client  
- An agent (MCP Host)   
  - can connect to the MCP Server using an MCP Client  
  - is capable of connecting to multiple MCP Servers, utilizing multiple MCP Clients for each connection.  
- A user can access and grant permission to access the MCP Server using an MCP Client  
- The MCP Server can validate the access token and grant access to the user, agent, or both, based on the context.

## [Registering MCP servers and configuring permissions]({{base_path}}/guides/agentic-ai/mcp/mcp-server-authorization/)

MCP servers can be registered as protected resources in {{ product_name }}. This setup allows administrators to define precise access controls for each server and their tools and resources, specifying which clients or users are authorized to interact with it. By securely exposing remote MCP servers, organizations can maintain consistent authorization rules and minimize the risk of unauthorized access to MCP servers and their tools, and protect underlying business resources.

!!! info
    Refer to the [MCP Server Authorization guide]({{base_path}}/guides/agentic-ai/mcp/mcp-server-authorization/) for detailed steps on registering MCP servers and configuring scopes for fine-grained access control.
    
## [Setting up MCP clients]({{base_path}}/guides/agentic-ai/mcp/register-mcp-client-app/)

An MCP client is a connection component that host applications use to interface with MCP servers through dedicated, stateful sessions. When connecting to an MCP server, you can register the client in {{ product_name }}, which also creates an OAuth 2.1 client meeting the necessary standards. Clients can be authorized with specific scopes that define their permitted access to MCP servers, ensuring they operate only within authorized boundaries and maintain a secure ecosystem for model interactions.

!!! info
    Refer to the [MCP Client Registration guide]({{base_path}}/guides/agentic-ai/mcp/register-mcp-client-app/) for detailed steps on setting up MCP clients and authorizing them to access MCP servers.

## Authentication and Authorization Flows

How does an agent actually get a token to talk to the MCP Server? There are a few main patterns.

### Pattern A: Connecting to the MCP server with user delegation (OBO)

Use this when an MCP client acts on a user's behalf (e.g., a Desktop Copilot).

1. **Connect Request**: User clicks "Connect Finance Tools" in the client UI.  
2. **Redirect**: The user gets redirected to the {{ product_name }} authorization endpoint.  
3. **Consent**: User sees: *"Research Assistant wants to access Finance Tools"*.  
   - **Scopes**: `finance:read_reports`  
4. **Grant**: User approves. {{ product_name }} issues an **Authorization Code**.  
5. **Token Exchange**: MCP client exchanges code for an **Access Token**.  
6. **Invocation**: MCP client sends MCP Initialize request with `Authorization: Bearer <token>`.

### Pattern B: MCP Client authenticating on its own (M2M)

Use this for backend MCP clients running without a user interface.

1. **Token Request**: MCP client calls {{ product_name }}'s `/token` endpoint directly using **Client Credentials** (Client ID + Secret).  
2. **Validation**: {{ product_name }} checks if this MCP client is authorized for the requested MCP Server resource.  
3. **Issuance**: {{ product_name }} returns an **Access Token** (`sub`= MCP client's ID).  
4. **Invocation**: The MCP client connects to the MCP Server with the token.

### Pattern C: Delegated Agent (OBO + Agent Identity)

Neither of the above patterns identifies the agent (MCP Host) as a principal identity. The token only contains the user or the client identity. This is a problem for auditing and fine-grained authorization, where the actual entity with the brain to do all the planning, reasoning, and taking actions is not represented.

This new flow outlines the steps for an Agent (MCP Host) to register its identity, obtain authorization, and interact with the MCP Server on behalf of a user.

**Setup and Registration**

1. **Agent Identity Registration:** The Agent/MCP Host is registered as an **Agent Identity** within {{ product_name }}.  
2. **Client Registration:** An MCP Client is registered and authorized to establish a connection with the MCP Server.

**Agent-Only Authentication**

1. **Agent Authentication:** The Agent authenticates itself using its own credentials to acquire a **Token**.  
2. **Agent Connection (Without User):** The Agent can utilize this Actor Token to connect to the MCP Server, provided it possesses the necessary permissions, even when a user is not present.

**User-Delegated Authentication (On-Behalf-Of Flow)**

1. **Initiating User Authentication:** When a user is available, the Agent starts an On-Behalf-Of (OBO) flow, specifying the MCP client as the OAuth client and itself as the desired actor (`requested_actor`).  
2. **User Delegation:** The user logs in and explicitly grants access delegation to the Agent.  
3. **Code Exchange:** The Agent receives the authorization code and exchanges it for a new token. This new token includes both the user's identity (`sub`) and the agent's identity (`act`) claims, along with the permissions delegated by the user.  
4. **Invocation:** The Agent now invokes the MCP Server using the token, which identifies both the user and the Agent as the actor. This dual-identity token enables enhanced auditing and fine-grained authorization on the MCP Server. The MCP Server can:  
   * Make authorization decisions based on both the user's delegated permissions to the Agent for a specific action and the Agent's own identity and permissions.  
   * Log which Agent executed the action for comprehensive auditing purposes.

!!! note   
    While the MCP Authorization specification doesn't currently mandate identifying the MCP Host (agent) with its own credentials and permissions, this is a crucial {{ product_name}} implementation. It enables secure, auditable agentic systems for autonomous agents by providing clear attribution, better permission management, clear auditability, and enhanced security.

## Supported Specifications

{{ product_name }} supports a comprehensive set of OAuth 2.0, OpenID Connect, and extended specifications to ensure secure and standardized authorization for MCP, including:

| Specification | Use Case in MCP |
| :--- | :--- |
| **OAuth 2.1 (Draft)** | The foundation for the MCP Authorization specification, ensuring security best practices. |
| **OpenID Connect Core 1.0** | Verifies the identity of user and/or agent interactions. |
| **OpenID Connect Discovery 1.0** | Allows MCP Clients to automatically discover authorization endpoints and configurations. |
| **OpenID Connect Dynamic Client Registration 1.0** | Enables dynamic onboarding of MCP Clients. |
| **OAuth 2.0 Pushed Authorization Requests (PAR)** | Enhances security by preventing authorization parameters from being exposed in the URL. |

## What's Next?

Get hands-on with MCP server authorization, 

- 📖 [**MCP Server Quick Start - TypeScript**]({{base_path}}/quick-starts/mcp-auth-server/)  
- 📖 [**MCP Server Quick Start - Python**]({{base_path}}/quick-starts/mcp-auth-server-py/)