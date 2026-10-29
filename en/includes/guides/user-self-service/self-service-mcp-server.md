# Self-service MCP server

The [Self-service MCP server](https://github.com/asgardeo/asgardeo-mcp-server){:target="_blank"} lets an AI agent manage the signed-in user's own account in {{ product_name }}. The agent calls the [self-service APIs]({{base_path}}/guides/user-self-service/build-self-service-capabilities/) with the user's access token, so every action applies only to the user that the token belongs to.

Users can ask the agent to do the following:

- **Profile**: View and update their profile. Add or remove email addresses and mobile numbers, or set a primary one.
- **Sessions**: See where they are signed in. Sign out of one device or all devices.
- **Sign-in security**: View their MFA options, passkeys, push devices, authenticator app and backup codes. Rename passkeys, and remove passkeys, push devices, the authenticator app and backup codes.
- **Linked accounts**: List and unlink linked local accounts and social logins.
- **Applications**: List their applications. See which applications have access to their account and revoke access.
- **Consents**: View and withdraw application consents and accepted policies. Unsubscribe from communication preferences.

You can run the server locally with an MCP client such as VS Code, Claude Desktop or Cursor, or host it over HTTP for the users of your application.

## Prerequisites

- An application that [integrates login with {{ product_name }}]({{base_path}}/guides/authentication/add-login-to-apps/) over OpenID Connect standards. Learn more about registering OIDC applications on {{ product_name }}.

    - [SPA]({{base_path}}/guides/applications/register-single-page-app/)
    - [Traditional Web application]({{base_path}}/guides/applications/register-oidc-web-app/)
    - [Mobile application]({{base_path}}/guides/applications/register-mobile-app/)

- **Go 1.23 or later**. To install Go, follow the steps in the [Go documentation](https://go.dev/doc/install){:target="_blank"}.

!!! note
    The application must request the `internal_login` scope when users sign in.

## Build the server

Before configuring your MCP client, you need to build the Self-service MCP server executable locally.

1. Clone the repository:

    ```bash
    git clone https://github.com/asgardeo/asgardeo-mcp-server.git
    ```

2. Navigate to the cloned directory and install dependencies:

    ```bash
    cd asgardeo-mcp-server
    go mod tidy
    ```

3. Build the executable:

    ```bash
    go build -o self-service-mcp ./cmd/self-service-mcp
    ```

This creates the `self-service-mcp` binary in the current directory. The absolute path to the directory containing this binary (e.g., `/Users/<username>/asgardeo-mcp-server`) is what you will use as `<ABSOLUTE-PATH>` in the next step.

## Run the server locally

When you run the server locally, it communicates with the MCP client over standard input/output (stdio) and uses the access token set in the client configuration. To get an access token, sign in to the configured application.

=== "VS Code"
    1. Open **VS Code**.
    2. Press `Ctrl` + `Shift` + `P` (or `Cmd` + `Shift` + `P` on Mac).
    3. Type **"MCP: Open User Configuration"** and select it.

    Add the following server configuration to the `mcp.json` file. Replace `<ABSOLUTE-PATH>`, `{{ org_placeholder }}`, `<access_token>` and `<client_id>` with your values.

    ```json title="mcp.json"
    {
        "servers": {
            "self-service-mcp": {
                "type": "stdio",
                "command": "<ABSOLUTE-PATH>/self-service-mcp",
                "args": [],
                "env": {
                    "BASE_URL": "{{ base_url }}",
                    "ACCESS_TOKEN": "<access_token>",
                    "CLIENT_ID": "<client_id>"
                }
            }
        }
    }
    ```

=== "Cursor"
    1. Open **Cursor**.
    2. Click on **Cursor > Settings > Cursor Settings**.
    3. Switch to the **MCP** tab.
    4. Click on the **Add new global MCP server** button. This opens the `mcp.json` file in the editor.

    Add the following configuration to the `mcp.json` file. Replace `<ABSOLUTE-PATH>`, `{{ org_placeholder }}`, `<access_token>` and `<client_id>` with your values.

    ```json title="mcp.json"
    {
        "mcpServers": {
            "self-service-mcp": {
                "command": "<ABSOLUTE-PATH>/self-service-mcp",
                "args": [],
                "env": {
                    "BASE_URL": "{{ base_url }}",
                    "ACCESS_TOKEN": "<access_token>",
                    "CLIENT_ID": "<client_id>"
                }
            }
        }
    }
    ```

=== "Claude Desktop"
    1. Open **Claude Desktop**.
    2. Click on **Claude Desktop > Settings > Developer**.
    3. Click on the **Edit Config** button. This opens the location of the `claude_desktop_config.json` file. Open the file using a text editor.

    Add the following configuration to the `claude_desktop_config.json` file. Replace `<ABSOLUTE-PATH>`, `{{ org_placeholder }}`, `<access_token>` and `<client_id>` with your values.

    ```json title="claude_desktop_config.json"
    {
        "mcpServers": {
            "self-service-mcp": {
                "command": "<ABSOLUTE-PATH>/self-service-mcp",
                "args": [],
                "env": {
                    "BASE_URL": "{{ base_url }}",
                    "ACCESS_TOKEN": "<access_token>",
                    "CLIENT_ID": "<client_id>"
                }
            }
        }
    }
    ```

=== "Other"
    Use the following settings to configure your MCP-compatible client application. Replace `<ABSOLUTE-PATH>`, `{{ org_placeholder }}`, `<access_token>` and `<client_id>` with your values.

    ```json
    {
        "mcpServers": {
            "self-service-mcp": {
                "command": "<ABSOLUTE-PATH>/self-service-mcp",
                "args": [],
                "env": {
                    "BASE_URL": "{{ base_url }}",
                    "ACCESS_TOKEN": "<access_token>",
                    "CLIENT_ID": "<client_id>"
                }
            }
        }
    }
    ```

!!! note
    When the access token expires, replace `ACCESS_TOKEN` with a new token and restart the server.

## Host the server

You can run a single server for all users of your application. The server uses the MCP Streamable HTTP transport and serves requests at `/mcp`.

```bash
TRANSPORT=http PORT=8000 BASE_URL={{ base_url }} CLIENT_ID=<client_id> ./self-service-mcp
```

Note the following when you host the server:

- Each request must include the signed-in user's access token in the `Authorization` header as `Bearer <access_token>`. The server passes this header to {{ product_name }}, so each call acts as the user who sent it. Requests without the header receive a `401` response.

- The server doesn't store sessions or tokens. {{ product_name }} validates the token on every call.

!!! note
    The server serves plain HTTP. Place it behind a reverse proxy or a load balancer that terminates TLS.

To connect an MCP client to the hosted server, add the following configuration to the client. Replace `<your-host>` and `<access_token>` with your values.

=== "VS Code"

    ```json title="mcp.json"
    {
        "servers": {
            "self-service-mcp": {
                "type": "http",
                "url": "https://<your-host>/mcp",
                "headers": {
                    "Authorization": "Bearer <access_token>"
                }
            }
        }
    }
    ```

=== "Cursor"

    ```json title="mcp.json"
    {
        "mcpServers": {
            "self-service-mcp": {
                "url": "https://<your-host>/mcp",
                "headers": {
                    "Authorization": "Bearer <access_token>"
                }
            }
        }
    }
    ```

=== "Other"

    ```json
    {
        "mcpServers": {
            "self-service-mcp": {
                "url": "https://<your-host>/mcp",
                "headers": {
                    "Authorization": "Bearer <access_token>"
                }
            }
        }
    }
    ```

## Configurations

The following environment variables configure the server. `BASE_URL` is required. `ACCESS_TOKEN` is required when you run the server locally.

| <div style="width: 130px;">Parameter</div> | Description | Default |
|---|---|---|
| `BASE_URL` | The URL of your organization. For example, `{{ base_url }}`. | - |
| `ACCESS_TOKEN` | The access token of the user. Use it when you run the server locally. | - |
| `TRANSPORT` | The transport of the server. Set to `stdio` or `http`. | `stdio` |
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
