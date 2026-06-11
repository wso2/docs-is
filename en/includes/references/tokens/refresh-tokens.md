# Refresh tokens

A refresh token is a long-lived credential issued alongside an access token — typically valid for days or weeks. Clients use refresh tokens to get new access tokens after the current one expires, without requiring the user to log in again.

Refresh tokens are only issued when the `Refresh Token` grant type is enabled for your application. They are sent only to the {{product_name}} token endpoint and must never be forwarded to resource servers.

!!! warning
    A valid refresh token can get new access tokens at any time. Store refresh tokens securely — treat them with the same care as passwords or other long-lived credentials.

## Refresh token rotation

By default, whenever the refresh token is exchanged for a new access token, {{product_name}} issues the same refresh token back, as long as it has not expired.

When **Renew refresh token** is enabled, {{product_name}} invalidates the current refresh token and issues a new one on each exchange. This limits exposure if a token is stolen — the old token becomes invalid immediately on use.

To configure rotation settings for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#refresh-token).

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}

## Graceful refresh token rotation

When **Renew refresh token** is enabled, missing token delivery (for example, due to a dropped network connection) forces the client to re-authenticate. Enabling **Graceful refresh token rotation** lets the old refresh token stay usable for a short grace window after rotation, so the client can recover without re-authentication.

The following runtime rules apply during the grace window.

- **Replay inside the grace window.** If the client replays the old refresh token (RT0, the original token) inside the grace window, {{product_name}} issues a new access token and a new refresh token, and revokes the rotated token (RT1, the replacement token). Only one child of the parent token is honoured at a time; the most recent replay always wins.
- **Using the new refresh token closes the grace window.** Once the client successfully uses the rotated token (RT1), the previous gracefully-rotated token (RT0) is immediately revoked. Any later attempt to replay RT0 returns `400 invalid_grant`.
- **Reuse limit.** If the old refresh token is replayed more times than the configured limit within the window, further replays return `400 invalid_grant`.
- **Grace window expiry.** If the old refresh token is replayed after the validity period has elapsed, the request returns `400 invalid_grant`.

To configure the graceful rotation validity period and reuse limit, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#graceful-refresh-token-rotation).
{% endif %}

## Token lifetime

Refresh tokens have a configurable validity period. When **Renew refresh token** is enabled, the expiry behavior of the renewed token depends on the **Extend expiry time of renewed refresh token** setting.

- When enabled (default), the renewed refresh token is issued with a fresh validity period starting from the time of renewal.
- When disabled, the renewed refresh token carries the remaining validity period of the original refresh token.

Once a refresh token expires, the client must restart the authorization flow to get new tokens.

## Revocation

A refresh token can be revoked before it expires. Common triggers include a user signing out, a password change, or an explicit revocation request by the application.

When a refresh token is revoked, it can no longer be used to get new access tokens, and any associated access tokens are also invalidated. Applications should handle a revocation response by redirecting the user to re-authenticate.

!!! note
    To configure refresh token expiry and rotation settings for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#refresh-token).
