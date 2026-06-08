# Tokens

When a user or application completes an OAuth 2.0 or OpenID Connect flow with {{product_name}}, the server issues tokens. Each token type has a distinct role and a specific intended consumer.

| Token | Consumed by | Purpose |
| ----- | ----------- | ------- |
| Access token | Resource server (API) | Authorize the client to access a protected resource |
| Refresh token | Authorization server token endpoint | Obtain new access tokens without re-authentication |
| ID token | Client application | Verify the identity of the authenticated user |

!!! note
    - [Configure OIDC settings]({{base_path}}/references/app-settings/oidc-settings-for-app/) to set token types, expiry times, and other per-application token behavior.
    - Learn how [token binding]({{base_path}}/references/token-binding/) securely links access tokens to the client that requested them.

## Access tokens

An access token is a short-lived credential that a client presents to a resource server to prove it is authorized to act on behalf of a user or application.

Learn more about [access tokens]({{base_path}}/references/tokens/access-tokens) including supported token types, validation behavior, and token lifetime. To configure access token settings for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token).

## Refresh tokens

A refresh token is a longer-lived credential that a client can exchange for a new access token after the current one expires, without requiring the user to re-authenticate.

Learn more about [refresh tokens]({{base_path}}/references/tokens/refresh-tokens) including rotation behavior and graceful rotation runtime rules. To configure refresh token settings for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#refresh-token).

## ID tokens

An ID token is a signed JWT issued by {{product_name}} as part of an OpenID Connect authentication flow. It is consumed by the client application to verify who authenticated, how, and when — it is not intended to be sent to resource servers as an authorization credential.

Learn more about [ID tokens]({{base_path}}/references/tokens/id-tokens) including their claims and encryption mechanics. To configure ID token settings for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#id-token).
