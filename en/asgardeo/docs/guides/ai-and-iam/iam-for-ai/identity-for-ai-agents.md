# Identity for AI Agents

## Understand identity for AI agents

AI agents interact with APIs and resources to perform tasks. You need to control and monitor these interactions.

Identity for AI agents lets you manage each agent’s actions by assigning a unique identity to every AI agent.

This approach helps you:

- Track actions: See what each agent does.
- Limit access: Give each agent only the permissions it needs.
- Revoke access: Remove access quickly if you detect a problem.
- Unique identities secure your system. You also gain a clear view of agent behavior.

## Register an AI agent

1. On {{ product_name }}, navigate to **Agents**.

2. Clck **+ New Agent**.

3. Enter a name and description (optional) for your AI agent. Click **Create**

4. Save and note the agent credentials.

## Configure authentication for your AI agent

1. **Store the client credentials securely.**

    Never hardcode secrets in your codebase.

2. **Set up OAuth 2.0 client credentials flow.**

    This flow lets your AI agent get access tokens.

3. **Request an access token.**

    Use the identity provider's token endpoint.

    Example (using `curl`):

    ```bash
    curl -X POST https://<your-idp>/oauth2/token \
      -d 'grant_type=client_credentials' \
      -d 'client_id=<CLIENT_ID>' \
      -d 'client_secret=<CLIENT_SECRET>'
    ```

4. **Use the access token in API requests.**

    Add the token to the `Authorization` header:

    ```http
    Authorization: Bearer <ACCESS_TOKEN>
    ```

## Test your setup

- Call a protected API using the access token.
- Check the response for errors.
- Review logs to confirm the agent identity.

## Troubleshoot common issues

- **Invalid credentials:** Double-check the client ID and secret.
- **Token expired:** Request a new access token.
- **Insufficient permissions:** Update the agent's access scopes.

## Next steps

- Rotate secrets regularly.
- Monitor agent activity.
- Remove unused agents to reduce risk.