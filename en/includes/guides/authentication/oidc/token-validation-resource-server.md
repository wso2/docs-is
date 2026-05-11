# Validate tokens at a resource server

While resource servers can validate JSON Web Tokens (JWT) locally, opaque access tokens don't carry authorization information that a resource server can decode. The resource server must validate the token by querying the authorization server.

{{product_name}} supports token validation through the **OAuth 2.0 Token Introspection endpoint** defined in [RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662){: target="_blank"}.

`https://<IS_HOST>:<IS_PORT>/oauth2/introspect`

The resource server sends the access token to this endpoint, and the authorization server responds with metadata about the token, such as its validity, scopes, and expiry time.

## Prerequisites

By default, to invoke the introspection endpoint, the caller must have the `internal_oauth2_introspect` scope.

- To customize the scopes callers must present, add the following to `<IS_HOME>/repository/conf/deployment.toml`.

    ```toml
    [resource_access_control.introspect]
    scopes = ["internal_oauth2_introspect"]
    ```

- To **remove all scope requirements** and allow any authenticated caller to introspect tokens, set `scopes` to an empty list.

    ```toml
    [resource_access_control.introspect]
    scopes = []
    ```

    !!! warning "Not recommended for production"
        Removing all scope requirements allows any authenticated user or application to call the introspection endpoint.

## Invoke the introspection endpoint

The resource server can authenticate to the introspection endpoint using one of the following methods.

### With user credentials

By default, the introspection endpoint supports basic authentication with user credentials.

=== "Request format"

    ```bash
    curl --location --request POST https://localhost:9443/oauth2/introspect \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <Base64Encoded(Username:Password)>' \
    --data-urlencode 'token={access_token}'
    ```

=== "Request sample"

    ```bash
    curl --location --request POST https://localhost:9443/oauth2/introspect \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --data-urlencode 'token=94e325b7-77c8-32c2-a6ff-d7be430bf785'
    ```

!!! warning "Avoid using high-privileged credentials"
    Don't use super administrator or highly privileged user credentials when invoking the introspection endpoint.  
    Instead, create a user with the least privileges required to call the API.

### With client credentials

By default, {{product_name}} only supports basic authentication with user credentials. You can enable client authentication and allow applications to call the introspection endpoint using their client ID and client secret.

1. To enable authentication with client credentials, add the following configuration to `<IS_HOME>/repository/conf/deployment.toml`.

    ```toml
    [[resource.access_control]]
    context="(.*)/oauth2/introspect(.*)"
    http_method="all"
    secure=true
    allowed_auth_handlers="BasicClientAuthentication"
    ```

2. Invoke the endpoint using the client ID and client secret.

    !!! info

        Ensure that the application can request this scope. Learn more about [authorizing applications to consume API resources]({{base_path}}/guides/authorization/api-authorization/api-authorization/#authorize-apps-to-consume-api-resources/).

    === "Request format"

        ```bash
        curl --location --request POST https://localhost:9443/oauth2/introspect \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --user '<client_id>:<client_secret>' \
        --data-urlencode 'token={access_token}'
        ```

    === "Request sample"

        ```bash
        curl --location --request POST https://localhost:9443/oauth2/introspect \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --user 'iieV1ARKSmFCImV0XvKS4sPfWfEa:oMw72n4Gr3gSp8RGCw6dM1EjSqYa' \
        --data-urlencode 'token=94e325b7-77c8-32c2-a6ff-d7be430bf785'
        ```

## Introspection responses

The authorization server responds to the introspection request with a JSON object containing metadata about the token. The responses change slightly based on the token type.

### User tokens

WSO2 Identity Server issues user access tokens during user interactions, such as when users sign in. An access token represents the user and their permissions.

For a provided user token, the response looks like the following:

=== "Access token"

    ```json
    {
    "aut": "APPLICATION_USER",
    "nbf": 1629961093,
    "scope": "openid profile",
    "active": true,
    "token_type": "Bearer",
    "exp": 1629968693,
    "iat": 1629961093,
    "client_id": "Wsoq8t4nHW80gSnPfyDvRbiC__Eb",
    "username": "admin@carbon.super"
    }
    ```

=== "Refresh token"

    ```json
    {
    "nbf": 1629961093,
    "scope": "openid profile",
    "active": true,
    "token_type": "Refresh",
    "exp": 1630047493,
    "iat": 1629961093,
    "client_id": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
    "username": "admin@carbon.super"
    }
    ```

=== "Invalid token"

    ```json
    {"active":false}
    ```

### Application tokens

Applications receive application tokens through grant types like the client credentials grant, which don't involve any user interaction. These tokens represent the application itself rather than an individual user.

For a provided application token, the response looks like the following:

```json
{
  "nbf": 1629961093,
  "scope": "openid profile",
  "active": true,
  "token_type": "Bearer",
  "exp": 1629968693,
  "iat": 1629961093,
  "client_id": "Wsoq8t4nHW80gSnPfyDvRbiC__Eb"
}
```

!!! warning "Deprecated behavior"

    Previously, the introspection response for application access tokens included the   `username` attribute, which contained the username of the application owner. This attribute will no longer be included in the introspection response.

    If your application's access tokens still return the response, it is likely that your application is out-of-date. If so, update your application through the WSO2 Identity Server Console by navigating to the relevant application under the Applications section.

    Once updated, the username attribute will no longer be included in the introspection response. Therefore, before updating, ensure that your application does not rely on the username attribute and remove any such dependencies.
