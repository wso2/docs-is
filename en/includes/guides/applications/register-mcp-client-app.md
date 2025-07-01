# Register an MCP Client Application

{{ product_name }} provides an application template with default configurations to register an MCP client with minimal effort. This template has been configured to create an OAuth application that adheres to the guidelines and best practices outlined in the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization).

To regiser an MCP Client application,  

1. On {{ product_name }} Console, go to **Applications** > **New Application** to navigate to the application template selection wizard.

    ![Select MCP client application template]({{base_path}}/assets/img/guides/applications/select-mcp-client-app-template.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Select **MCP Client Application**. The application creation wizard will appear.

    ![Create an MCP client application]({{base_path}}/assets/img/guides/applications/create-mcp-client-application.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    The MCP application creation wizard includes the following fields.

    <table>
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>A unique name to identify your application.</td>
        </tr>
        <tr>
            <td>Authorized redirect URL</td>
            <td>The URL to which the authorization code is sent upon user authentication and where the user is redirected upon logout.</td>
        </tr>
        <tr>
            <td>Public client</td>
            <td>Keep this enabled if your MCP client application cannot securely store client secrets. (Eg: mobile apps, single page web apps etc).</td>
        </tr>
    </tbody>
    </table>

    !!!note
        MCP Authorization specification recommends that MCP clients should be public clients with authorization code grant flow enabled. However, if your MCP client runs on a server side environment where you can keep a secret, you can untick the *public client* option.

3. Click **Create** to complete the registration.

## What's next?

- [Obtain an M2M token using client credential grant]({{base_path}}/references/grant-types/#client-credentials-grant)
- [Implement authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/)
