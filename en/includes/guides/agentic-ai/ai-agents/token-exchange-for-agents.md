<!-- vale off -->
# Token Exchange for AI Agents
<!-- vale on -->

This guide walks you through how an AI agent can act on behalf of a user by exchanging a token that the user already holds, using the [token exchange grant]({{base_path}}/guides/authentication/configure-token-exchange/), as defined in the [OAuth 2.0 Token Exchange specification (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693). The issued token identifies the user in the `sub` claim and records the agent as the acting party in the `act` claim, so resource servers can see both identities in a single token.

!!! note "Agent friendly delegation mechanism"
    - This flow does **not use redirects** and needs **no new user interaction**.
    - The agent reuses the token it already obtained through its own [authentication flow]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-its-own).

---

## When to use token exchange for delegation

{{ product_name }} supports three ways for an agent to act on behalf of a user. Choose based on whether a user token already exists and whether the user is available to give consent.

<table>
    <tr>
        <th>Approach</th>
        <th>Use when</th>
    </tr>
    <tr>
        <td><a href="{{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-behalf-of-a-user">On-behalf-of with authorization code</a></td>
        <td>The user is present in a browser and delegation should be established with explicit consent.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#using-ciba-for-on-behalf-of-delegation">On-behalf-of with CIBA</a></td>
        <td>The agent runs in the background and the user approves the delegation asynchronously on a separate device.</td>
    </tr>
    <tr>
        <td>Token exchange</td>
        <td>The agent already holds a token issued for the user, and you need a token that additionally identifies the agent acting on their behalf.</td>
    </tr>
</table>

Token exchange collects no consent of its own. It re-scopes and re-attributes authority the user has already granted, which makes it suited to bringing an agent into work the user has already authorized.

## How the flow works

![Agent Delegation via Token Exchange Flow Diagram](../../../assets/img/guides/agentic-ai/ai-agent-token-exchange-flow.png)

As shown in the above sequence diagram, the flow proceeds as follows.

1. **Agent Authentication**
   The agent authenticates with its **Agent ID** and **Agent Secret** and obtains its own access token, as described in [AI agent acting on its own]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-its-own). This token becomes the `actor_token`.

2. **Task Delegation**
   The user, or an agent earlier in the chain, delegates a task to the agent and provides the subject token. The subject token identifies the user on whose behalf the agent acts. {{ product_name }} accepts a token issued by itself or by a trusted token issuer, as described in [Token exchange flows]({{base_path}}/guides/authentication/configure-token-exchange/#token-exchange-flows).

3. **Token Exchange Request**
   The agent sends both tokens to the token endpoint using the token exchange grant.

4. **Validation**
   {{ product_name }} validates both tokens, resolves the agent from the `sub` claim of the actor token, and verifies that the agent is a registered and active identity in the organization.

5. **Delegated Token Issuance**
   {{ product_name }} issues an access token that carries the user in `sub` and the agent in `act.sub`.

6. **Authorized Request**
   The agent calls the protected resource with the delegated token. The resource server can authorize the request against the user's identity while attributing the action to the agent.

!!! note
    {{ product_name }} limits the scopes of the delegated token to the scopes approved in the subject token. If the request contains the `scope` parameter, the delegated token receives only the scopes that are common to the request and the subject token.

## Requesting a delegated token

!!! note "Before you begin"
    - Enable the token exchange grant for the application that requests the token, as described in [Enable token exchange in your app]({{base_path}}/guides/authentication/configure-token-exchange/#enable-token-exchange-in-your-app).
    - Configure the agent's application to issue `JWT` access tokens. {{ product_name }} rejects opaque actor tokens.

Send both tokens to the token endpoint.

=== "Request Format"

    ``` bash
    curl --location '{{ api_base_path }}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
    --data-urlencode 'subject_token={user_token}' \
    --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'actor_token={agent_token}' \
    --data-urlencode 'actor_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token' \
    --data-urlencode 'scope={requested_scopes}'
    ```

The request contains the following delegation parameters:

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>subject_token</td>
        <td>A JWT token that identifies the user on whose behalf the agent acts.</td>
    </tr>
    <tr>
        <td>actor_token</td>
        <td>A JWT token issued by {{ product_name }} for the agent.</td>
    </tr>
    <tr>
        <td>actor_token_type</td>
        <td>Should be <code>urn:ietf:params:oauth:token-type:access_token</code> or
        <code>urn:ietf:params:oauth:token-type:jwt</code>.</td>
    </tr>
</table>

## The delegated token

The decoded token identifies the user in `sub` and the agent in `act.sub`.

```json
{
  "sub": "<user_identifier>",
  "act": {
    "sub": "<agent_identifier>"
  },
  ...
}
```

A resource server can use the `act` claim to record which agent acted for the user, or to apply policies that depend on the acting agent. This gives you an audit trail that attributes the action to the agent independently of the user, as described in [Comprehensive auditing and explainability]({{base_path}}/guides/agentic-ai/ai-agents/#comprehensive-auditing-and-explainability).

## Chaining delegation across agents

When an agent hands a task to another agent, the second agent exchanges the delegated token again with its own actor token. The new agent becomes the current acting party and the existing `act` claim nests under it, so the token carries the full chain.

```json
{
  "sub": "<user_identifier>",
  "act": {
    "sub": "<second_agent_identifier>",
    "act": {
      "sub": "<first_agent_identifier>"
    }
  },
  ...
}
```

The most recent agent appears at the top level of the chain. {{ product_name }} carries the existing chain forward unchanged when the request presents no actor token, so an agent that re-exchanges a token it received can't alter the chain behind it.

To learn more about the delegation model and the `act` claim, see [Delegation]({{base_path}}/guides/authorization/delegation/).
