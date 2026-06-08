# Access tokens

An access token is a short-lived credential that a client presents to a resource server to prove authorization to act on behalf of a user or application. {{product_name}} issues access tokens as part of OAuth 2.0 authorization flows.

Access tokens are sent in the HTTP `Authorization: Bearer` header when calling protected APIs. They represent delegated authorization — what the client is permitted to do — rather than who the user is.

## Token types

{{product_name}} supports the following access token types.

- **Opaque**: Opaque tokens are plain text tokens. If a resource server wants to know information related to an opaque token, it has to call the introspection endpoint and receive information related to tokens. An example for an opaque token response is shown below.

    ```json
    {
      "access_token": "9fac7747-bb2d-46be-bef2-a95b2f69f8b2",
      "scope": "openid",
      "id_token": "<id-token>",
      "token_type": "Bearer",
      "expires_in": 3522
    }
    ```

- **JWT**: JWT tokens are self-contained verifiable access tokens. If a resource server wants to know the information related to that token, it can decode the token and get the required information without any additional network calls. An example for a JWT token response is shown below.

    ```json
    {
      "access_token": "<JWT>",
      "scope": "openid",
      "id_token": "<id-token>",
      "token_type": "Bearer",
      "expires_in": 3600
    }
    ```

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
!!! note
    By default, the `scope` claim in JWT access tokens uses a space-separated string format (e.g., `"scope": "openid profile email"`). This format complies with the **JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens ([RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html))**.

    You can change this to a JSON array format (e.g., `"scope": ["openid", "profile", "email"]`), but this is **not recommended** as it deviates from the standard specification.

    If you still require this configuration, it can be applied at two levels:

    - **Application level**: Set the `enableJwtScopeAsArray` property in the application's `accessToken` configuration via the [Application Management API]({{base_path}}/apis/{% if product_name == "Asgardeo" %}application-management{% else %}application-rest-api{% endif %}/). This overrides the organization-level setting for the specific application.
    {% if product_name == "WSO2 Identity Server" %}
    - **Organization level**: Use the [Server Configuration API]({{base_path}}/apis/configs-rest-api/#tag/Inbound-Authentication-Configurations/operation/updateOAuth2InboundAuthConfig) to set the `enableJwtScopeAsArray` property. This applies to all applications in the organization unless overridden at the application level.
    {% endif %}
    {% if product_name == "Asgardeo" %}
    - **Organization level**: Set the `enableJwtScopeAsArray` property via the following API. This applies to all applications in the organization unless overridden at the application level.

        Get an access token with the `internal_config_update` scope and use it to execute the following cURL:

        ``` curl
        curl --location --request PATCH 'https://api.asgardeo.io/t/<organization_name>/api/server/v1/configs/authentication/inbound/oauth2' \
        --header 'Content-Type: application/json' \
        --header 'Authorization: Bearer <access_token>' \
        --data '{
            "enableJwtScopeAsArray": true
        }'
        ```
    {% endif %}
{% endif %}

## How access tokens are validated

How a resource server validates an access token depends on the token type.

- **Opaque tokens** must be validated by calling the {{product_name}} introspection endpoint. The endpoint returns the token's active state, subject, scopes, and expiry information.
- **JWT tokens** can be validated locally by verifying the token signature against {{product_name}}'s public keys and checking the standard claims:
  - `exp` — the token must not have expired.
  - `nbf` — the token must not be used before this time.
  - `iss` — the issuer must match your {{product_name}} organization's token endpoint.
  - `aud` — the audience must include the identifier of your resource server or client.

If the access token has expired or is otherwise invalid, the resource server returns `HTTP 401 Unauthorized`. The client should then get a new access token using a refresh token, or restart the authorization flow.

Learn how to implement token validation at a resource server in [Validate access tokens at a resource server]({{base_path}}/guides/authentication/oidc/token-validation-resource-server/).

## Token binding

Token binding securely links an access token to the specific client device that obtained it. If an attacker intercepts a bound token, they cannot replay it from a different device or context.

Learn more about [token binding types supported by {{product_name}}]({{base_path}}/references/token-binding/).

## Token lifetime

{{product_name}} issues access tokens with a configurable validity period. Two separate expiry settings apply depending on how the token was issued.

- **User access token expiry time** — applies to tokens issued on behalf of a user through flows such as the authorization code grant.
- **Application access token expiry time** — applies to tokens issued directly to an application using the `client_credentials` grant type.

Once an access token expires, the client must get a new one. If a refresh token was issued alongside the access token, the client can exchange it for a new access token without requiring the user to log in again.

!!! note
    To configure access token type, expiry, and binding settings for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token).
