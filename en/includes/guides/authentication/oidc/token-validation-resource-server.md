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

{% if product_name == "WSO2 Identity Server" %}

### Username format

By default, the `username` field for a local user is returned in the fully qualified format, for example, `admin@carbon.super`. For a user in a secondary user store, the user store domain is included as well, for example, `SECONDARY/john@carbon.super`.

To control this format from the application's **Subject** settings, add the following to the `<IS_HOME>/repository/conf/deployment.toml` file and restart the server:

```toml
[oauth]
build_subject_identifier_from_sp_config = true
```

!!! warning "This setting applies to the entire server"

    - `build_subject_identifier_from_sp_config` is `false` by default. While it is `false`, the **Subject** settings of an application have no effect, and `username` is always returned in the fully qualified format shown above.
    - The setting applies to every application on the server, not only the one you are configuring.
    - **Include user domain** and **Include organization name** are disabled by default, so an application whose **Subject** settings were never configured also starts returning a shortened `username` as soon as you enable this setting. Review those settings on your other applications first.

To configure the format for an application, go to **Applications**, select the application, and open the **User Attributes** tab. For details on the available options, see [Include the user store and organization domains in the subject]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#include-the-user-store-and-organization-domains-in-the-subject).

The following table shows the `username` returned for the user `john` in the `SECONDARY` user store, with `build_subject_identifier_from_sp_config` enabled:

| Include user domain | Include organization name | `username` |
| ------------------- | ------------------------- | ---------- |
| Disabled | Disabled | `john` |
| Enabled | Disabled | `SECONDARY/john` |
| Disabled | Enabled | `john@carbon.super` |
| Enabled | Enabled | `SECONDARY/john@carbon.super` |

!!! note

    - The `PRIMARY` user store domain is never added to the subject identifier, so **Include user domain** has no visible effect for users in the primary user store.
    - When both options are enabled, the result is the same as the default fully qualified format. For the user above, `username` is `SECONDARY/john@carbon.super` both with and without `build_subject_identifier_from_sp_config`, so enabling the setting produces no visible change.
    - **Assign alternate subject identifier** does not change the `username` field of the introspection response for local users.
{% endif %}

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
