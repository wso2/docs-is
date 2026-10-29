# Self-service MCP server

The [Self-service MCP server](https://github.com/asgardeo/asgardeo-mcp-server/blob/main/docs/self-service-mcp.md){:target="_blank"} lets an AI agent manage the signed-in user's own account in {{ product_name }}. The MCP server calls the [self-service APIs]({{base_path}}/guides/user-self-service/build-self-service-capabilities/) with the user's access token, so every action applies only to the user that the token belongs to.

Users can ask the agent to do the following:

- **Profile**: View and update their profile. Add or remove email addresses and mobile numbers, or set a primary one.
- **Sessions**: See where they are signed in. Sign out of one device or all devices.
- **Sign-in security**: View their MFA options, passkeys, push devices, authenticator app and backup codes. Rename passkeys, and remove passkeys, push devices, the authenticator app and backup codes.
- **Linked accounts**: List and unlink linked local accounts and social logins.
- **Applications**: List their applications. See which applications have access to their account and revoke access.
- **Consents**: View and withdraw application consents and accepted policies. Unsubscribe from communication preferences.

You can host the server over HTTP and connect your AI agents to it.

## Set up the server

You can run a single server for all users. The server uses the MCP Streamable HTTP transport and serves requests at `/mcp`.

1. Download the latest Self-service MCP server release from [releases](https://github.com/asgardeo/asgardeo-mcp-server/releases?q=self-service-mcp&expanded=true){:target="_blank"} based on your Operating System.

2. Extract the release.

3. Navigate to the extracted directory and start the server:

    ```bash
    PORT=8000 BASE_URL={{ base_url }} CLIENT_ID=<client_id> ./self-service-mcp
    ```

Note the following when you set up the server:

- Your MCP client must send the user's access token as a bearer token in the `Authorization` header of each request (`Authorization: Bearer <access_token>`). The token must contain the `internal_login` scope. The server uses this token for its calls to {{ product_name }}, so each call acts as the user who sent it.

- The server doesn't store sessions or tokens. {{ product_name }} validates the token on every call.

!!! note
    The server serves plain HTTP. Place it behind a reverse proxy or a load balancer that terminates TLS.

## Configurations

The following environment variables configure the server. `BASE_URL` is required.

| <div style="width: 130px;">Parameter</div> | Description | Default |
|---|---|---|
| `BASE_URL` | The URL of your organization. For example, `{{ base_url }}`. | - |
| `PORT` | The HTTP port of the server. | `8000` |
| `CLIENT_ID` | The client ID of the application that issued the token. You can find it in the **Protocol** tab of the application. Setting this is recommended. It prevents the agent from revoking this application's access, which would require the user to sign in again. | - |
| `PORTAL_NAME` | The name the agent uses for your self-service portal when it asks users to complete an action there. | `self-service portal` |

## Try it out

Use the following prompt in your MCP client to verify the setup.

```text
Where am I signed in?
```

You should see a list of your active sessions.

!!! note
    The server instructs the agent to confirm each change with the user before making it. Your MCP client may also prompt you to give **explicit consent** for the action. It's recommended to approve actions with the "Approve Once" option rather than the "Approve Always" option so that you retain full control over the changes made to your account.
