# Delegation

Delegation lets an application get a token for a user while preserving the identity of the party that acts on the user's behalf. {{ product_name }} implements delegation with the [token exchange grant]({{base_path}}/guides/authentication/configure-token-exchange/), as defined in the [OAuth 2.0 Token Exchange specification (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693){:target="_blank"}.

The exchanged token identifies the user in the `sub` claim and the acting party in the `act` claim. When a delegated token is exchanged again, {{ product_name }} nests the previous `act` claim under the new one, so a single token carries the full delegation chain.

## Request a delegated token

Before you request a delegated token:

- Enable the token exchange grant for the application that requests the token, as described in [Enable token exchange in your app]({{base_path}}/guides/authentication/configure-token-exchange/#enable-token-exchange-in-your-app).

- Get the subject token, as described in [Token exchange flows]({{base_path}}/guides/authentication/configure-token-exchange/#token-exchange-flows). The subject token identifies the user on whose behalf the new token is issued.

- Get a JWT token for the acting user from {{ product_name }}. This is the actor token.

To request a delegated token, send both tokens to the token endpoint.

=== "Request Format"

    ``` bash
    curl --location '{{base_url}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
    --data-urlencode 'subject_token={subject_token}' \
    --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'actor_token={actor_token}' \
    --data-urlencode 'actor_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token' \
    --data-urlencode 'scope={requested_scopes}'
    ```

The request contains the following delegation parameters:

<table>
    <tr>
        <td><code>actor_token</code></td>
        <td>A JWT token issued by {{ product_name }} for the acting user.</td>
    </tr>
    <tr>
        <td><code>actor_token_type</code></td>
        <td>Should be <code>urn:ietf:params:oauth:token-type:access_token</code> or
        <code>urn:ietf:params:oauth:token-type:jwt</code>.</td>
    </tr>
</table>

{{ product_name }} resolves the actor from the `sub` claim of the actor token. The request fails if the actor doesn't resolve to a user in the organization, or if the actor account is locked or disabled.

## The act claim

The delegated token identifies the user in the `sub` claim and the acting party in the `act.sub` claim.

The decoded delegated token looks as follows:

``` json
{
  "sub": "32bc4697-ed0f-4546-8387-dcd6403e7caa",
  "iss": "{{base_url}}/oauth2/token",
  "client_id": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "aud": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "act": {
    "sub": "2d931c9d-876e-46c0-9aba-f34501879dfc"
  },
  "scope": "booking:read",
  "nbf": 1770094002,
  "exp": 1770097602,
  "iat": 1770094002,
  "jti": "0728d517-7968-474f-bd7d-12537ccbe436"
}
```

A resource server can use the `act` claim to record which party acted on behalf of the user, or to apply policies that depend on the acting party.

### Chained delegation

When a delegated token is exchanged again with a different actor token, the new actor becomes the current acting party, and the existing `act` claim nests under it. The most recent actor appears at the top level of the chain.

The decoded token after a second delegation looks as follows:

``` json
{
  "sub": "32bc4697-ed0f-4546-8387-dcd6403e7caa",
  "act": {
    "sub": "b7e93c1a-5d48-4f2b-9a06-1c3e8f7d42b5",
    "act": {
      "sub": "2d931c9d-876e-46c0-9aba-f34501879dfc"
    }
  },
  "scope": "booking:read"
}
```

{{ product_name }} carries the existing chain forward unchanged when:

- The request presents no actor token. An application that re-exchanges a delegated token can't alter the chain it received.
- The actor token identifies the user who is already the current acting party. {{ product_name }} adds no duplicate level to the chain.
