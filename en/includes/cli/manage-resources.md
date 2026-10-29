# Manage resources with the CLI

This guide shows how to complete common tasks with the {{ product_name }} CLI. Before you begin, [sign in to the CLI]({{base_path}}/cli/authenticate/).

For every command and flag, run `asg <command> --help`.

## Select a resource

Commands that act on an existing resource accept one of the following flags to select it. If you leave them out in interactive mode, the CLI lets you pick the resource from a list.

| Flag | Selects the resource by | Example |
|---|---|---|
| `--id`, `-i` | Its ID. | `--id 7a4d5f50-cf2c-4de7-8b0f-b7f6f82c9ac4` |
| `--name`, `-n` | A name prefix. | `--name web-portal` |
| `--query`, `-q` | A filter query. | `--query "name sw web"` |

Filter queries take the form `<attribute> <operator> <value>`, where the operator is `eq` (equals), `sw` (starts with), `ew` (ends with), `co` (contains) or `ne` (not equal).

## Use the CLI in scripts

To run commands in scripts and CI/CD pipelines:

- Add `--no-interactive` (`-N`) so that the CLI never waits for input. Provide all required values as flags.
- Add `--yes` (`-y`) to skip confirmation prompts on create, update and delete commands.
- Add `--format json` to get output that other tools can parse.

```bash
asg apps list --format json -N
```

## Manage applications

Use `asg apps` to create, update, export and configure applications.

### Create an application

```bash
asg apps create --name web-portal --type oidc --redirect-uri http://localhost:3000/callback -y
```

The `--type` flag accepts `oidc`, `saml`, `spa`, `mobile` and `mcp`. For a SAML application, provide `--issuer` and `--acs-uri` instead of `--redirect-uri`.

### Update an application

Use `--edit` with a dot-separated path and a value to change fields of the application.

```bash
asg apps update --name web-portal --edit description="Customer portal" -y
```

Protocol settings, such as callback URLs, the access token type and PKCE, are managed separately with `asg apps protocol`.

```bash
asg apps protocol view --name web-portal
asg apps protocol update --name web-portal --edit "accessToken.type=JWT" --edit "pkce.mandatory=true" -y
```

### Export and import an application

Export the configuration of an application to a JSON file, edit it and apply it back.

```bash
asg apps export --name web-portal --file web-portal.json
asg apps update --name web-portal --file web-portal.json -N -y
```

!!! note
    Secrets are not exported. The client secret is regenerated when the file is imported.

### Authorize API resources and request user attributes

```bash
# Allow the application to request tokens for an API resource
asg apps apis add --name web-portal --api-id <api-resource-id> --scopes read:orders,write:orders -y

# Request the roles attribute in tokens
asg apps claims --name web-portal --add http://wso2.org/claims/roles -y
```

## Manage API resources and MCP servers

Use `asg apis` to register API resources and MCP servers, and to manage their scopes.

### Register an API resource

```bash
asg apis create --name "Orders API" --identifier https://api.example.com/orders --require-auth \
  --scopes '[{"name":"read:orders","displayName":"Read orders","description":"Read orders"}]' -y
```

You can also load the scopes from a file with `--scopes @scopes.json`.

### Register an MCP server

Set `--type mcp` and use the URL of the MCP server as the identifier. The identifier becomes the audience of the access tokens issued for the MCP server.

```bash
asg apis create --type mcp --name "Orders MCP" --identifier https://mcp.example.com/mcp --require-auth \
  --scopes '[{"name":"orders:read","displayName":"Read orders","description":"List orders"}]' -y
```

To register an MCP client application, run `asg apps create --type mcp`.

### Manage scopes

```bash
asg apis scopes list --name "Orders API"
asg scopes filter --query "name sw read"
```

## Manage AI agents

Create an agent and write its credentials to a `.env` file, instead of printing the secret on the terminal.

```bash
asg agents create --name orders-assistant --description "Answers questions about orders" --env-file ./.env -y
```

The file receives `AGENT_ID` and `AGENT_SECRET`. If the file does not exist, the CLI creates it with permissions that only allow your user to read it.

To let users sign in to the agent, add `--allow-user-login` with a redirect URI. The `.env` file then also receives the `CLIENT_ID` of the application created for the agent.

```bash
asg agents create --name orders-assistant --allow-user-login --redirect-uri http://localhost:3001/callback --env-file ./.env -y
```

!!! note
    The agent secret is shown only once. Use `--env-file` or `--copy-password` to keep it off the terminal.

## Manage users, groups and roles

```bash
# Create a user
asg users create --user-store DEFAULT --email jane.doe@example.com --first-name Jane --last-name Doe -y

# Add users to a group
asg groups members add --name engineering --user-id <user-id> -y

# Assign a role to users and groups
asg roles users add --name "Order Manager" --user-id <user-id> -y
asg roles groups add --name "Order Manager" --group-id <group-id> -y

# List the users assigned to a role
asg roles users list --name "Order Manager"
```

## Call management APIs directly

Use `asg api` to send a request to any {{ product_name }} [management API]({{base_path}}/apis/) with your CLI session. This is useful for operations that do not have a dedicated command.

```bash
# Send a GET request with query parameters
asg api /scim2/Users --query startIndex=1 --query count=10

# Send a POST request with a body from a file and save the response
asg api /api/server/v1/applications --method POST --body @application.json --output ./response.json
```

## Open a resource in the Console

Commands such as `asg apps settings` and `asg users settings` open the matching page of the {{ product_name }} Console in your browser.
