# Token validation by resource servers

Access tokens provide limited authorization to resources within a resource server. The resource server is responsible for validating these tokens before granting access. Token validation differs based on the [type of the access tokens]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token) that the resource server receives.

## Validate JWT tokens

A JSON Web Token (JWT) is a self-contained token. This means that the resource server does not need to interact with the identity provider to validate tokens. The payload of a sample decoded JWT token is as shown below.

```json
{
  "sub": "Alica@bifrost.com",
  "aut": "APPLICATION_USER",
  "aud": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "nbf": 1623904805,
  "azp": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "scope": "openid",
  "iss": "{{product_url_sample}}/oauth2/token",
  "exp": 1623908405,
  "iat": 1623904805,
  "jti": "9fac7747-bb2d-46be-bef2-a95b2f69f8b2"
}
```

## Validate opaque tokens

Unlike JWT tokens, opaque tokens are non-transparent. This means that the authorization information is not readily available to resource servers and they should interact with the identity provider to validate and extract the relevant information. OAuth2.0 supports [token introspection](https://datatracker.ietf.org/doc/html/rfc7662){:target="_blank"} to inspect access tokens and refresh tokens.

{{ product_name }} provides the following endpoint to perform token validation. 

``` 
{{product_url_format}}/oauth2/introspect
```
=== "Request format"

    ```bash
    curl --location --request POST {{product_url_format}}/oauth2/introspect \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <Base64Encoded(ClientID:ClientSecret)>' \
    --data-urlencode 'token={access_token}'
    ```

=== "Request sample"
  
    ```bash
    curl --location --request POST '{{ product_url_sample }}/oauth2/introspect' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Cookie: atbv=646b0ed2-c501-4b17-9251-94112013a718' \
    --header 'Authorization: Basic V3NvcTh0NG5IVzgwZ1NuUGZ5RHZSYmlDX19FYTp6MEM3OXpsb3B4OGk3QnlPdzhLMTVBOWRwbFlh' \
    --data-urlencode 'token=94e325b7-77c8-32c2-a6ff-d7be430bf785'
    ```

### User access token response

User access tokens are tokens generated through user interactions, such as logging in by entering credentials. The access token represents the user and the user's permissions.

The following response will be returned for the provided user access token:

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
  "username": "{{ username }}"
}
```

The following response will be returned for the provided refresh token:

```json
{
  "nbf": 1629961093,
  "scope": "openid profile",
  "active": true,
  "token_type": "Refresh",
  "exp": 1630047493,
  "iat": 1629961093,
  "client_id": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "username": "{{ username }}"
}
```

If the token you used is invalid, you will get the following response:

```json
{'active':false}
```

!!! note
    See the [OAuth2.0 introspection request](https://datatracker.ietf.org/doc/html/rfc7662#section-2.1){:target="_blank"} for details.

### Application access token response

Application access tokens are tokens obtained through grant types like the [client_credentials]({{base_path}}/references/grant-types/#client-credentials-grant) grant, without any user involvement. Unlike user-bound tokens, application access tokens represent the application itself rather than an individual user.

The introspection response for Application access Ttkens follows the format shown below:

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

    Previously, the introspection response for application access tokens included the `username` attribute, which contained the application owner's username. This attribute will no longer be included in the introspection response.
    
    If your application's access tokens still return the response, it is likely that your application is out-of-date. If so, update your application through the {{product_name}} Console by navigating to the relevant application under the **Applications** section.

    Once updated, the `username` attribute will no longer be included in the introspection response. Therefore, before updating, ensure that your application does not rely on the `username` attribute and remove any such dependencies.
