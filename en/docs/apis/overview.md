# APIs - Overview

Administrators can use REST APIs in WSO2 Identity Server to manage their organizations and application users can use these APIs to manage their logins and profiles.

!!! info
    Two OSGi services provide authentication and authorization services for REST APIs based on their handlers.
    
    You can write your handlers for authentication and authorization and register them in OSGI. For more information, refer to [Write a Custom Local Authenticator]({{base_path}}/references/extend/federation/write-a-custom-local-authenticator).


## Get access to APIs

At least one authentication element should be sent in an API invocation request to invoke the API successfully. If you fail to add the authentication element, the  API request will return a `401` unauthorized HTTP response.

WSO2 Identity Server supports the following API authentication methods:

- [Basic authentication](#basic-authentication)
- [OAuth-based authentication](#oauth-based-authentication)
- [Certificate-based authentication](#certificate-based-authentication)

### Basic authentication
This authentication method uses the user's credentials to invoke the APIs. If the API you wish to invoke has `Basic authentication` as the authentication requirement, use the following request format to access the API.

#### Access the API

This is a sample cURL command template for the request.

``` curl
curl -X GET "https://localhost:9443/t/carbon.super/api/server/v1/applications?limit=30&offset=0" -H "accept: application/json" -H "Authorization: Basic <Base64(username:password)>"
```

---

### OAuth-based authentication
This authentication method requires users to obtain an OAuth2 token and then use it to invoke the APIs. If the API you wish to invoke has `Password`, `Client-credentials`, or `AuthorizationCode` as the authentication requirement, use the following request format to obtain a bearer token.

!!! info "Before you begin"
    - You need to [create an application]({{base_path}}/guides/applications/register-sp) with **Management Application** enabled.
    - Expand the relevant API definition on the docs and obtain the **scope** required to invoke the API.

!!! abstract
    **Request**
    ```
    curl https://localhost:9443/oauth2/token -k -H "Authorization: Basic Base64 (<clientid>:<client-secret>)" -d "grant_type=password&username=<username>&password=<password>&scope=<scope>"
    ```
    **Sample request**
    ```
    curl https://localhost:9443/oauth2/token -k -H "Authorization: Basic d21VRm5oY2xlWFJNSFFZb29iUkx5VGY0TUxFYTowc0doU0dOOG4zMXJFQnpSRjkyYlN1dG5IRUFh" -d "grant_type=password&username=admin&password=admin&scope=internal_login"
    ```
    **Sample response**
    ```
    {
        "access_token":"846575e6-52b9-346d-95a5-cb0ff22d009f",
        "refresh_token":"9466cd69-4f9c-3675-861f-188a95bb60d3","scope":"internal_login","token_type":"Bearer",
        "expires_in":3600
    }
    ```

The variables used in the cURL request are as follows: 

| Variable  | Description   | Sample value  |
|-----------|---------------|---------------|
| `clientid`    | Client ID of your application. This is generated when registering the service provider on IS.  | `wmUFnhcleXRMHQYoobRLyTf4MLEa`   |
| `clientsecret`    | Client secret of your application. This is generated when registering the service provider on IS.  | `0sGhSGN8n31rEBzRF92bSutnHEAa`   |
| `Base64 (<clientid>:<client-secret>)` | The base64 encoded value of `clientid:clientsecret`.  | `d21VRm5oY2xlWFJNSFFZb29iUkx5VGY0TUxFYTowc0doU0dOOG4zMXJFQnpSRjkyYlN1dG5IRUFh`    |
| `username`    | Username of the user trying to invoke the API.  | `alex`  |
| `password`    | Password of the user trying to invoke the API.  | `alex@123`  |
| `scope`   | The scope corresponding to the API you want to use. See the relevant API reference docs for each API's list of internal scopes.  | `internal_login`   |

#### Access the API
You can now use the access token as an Authorization Bearer header to access the APIs.

This is a sample cURL command template for the request.

```curl
curl -X GET "https://localhost:9443/t/carbon.super/api/users/v1/me/sessions" -H "accept: application/json” -H Authorization: Bearer <access_token>"
```

---

### Certificate-based authentication
This authentication method uses mutual SSL to authenticate users and invoke the APIs.

If you opt for mutual SSL for API authentication, configuring intermediate certificate validation enables you only to use certificates that are signed by a defined list of issuers.

Add the following configuration to the `deployment.toml` file to enable this feature.

!!! abstract
    **Config**
    ```toml
    [intermediate_cert_validation]
    enable=true
    cert_cns=["cert_CN_list"]
    exempt_contexts=["endpoint_list"]
    ```
    ---
    **Sample**
    ```toml
    [intermediate_cert_validation]
    enable=true
    cert_cns=["wso2is.org"]
    exempt_contexts=["dcr","scim2"]
    ```

| Parameter           | Purpose  |
|---------------------|----------|
| `enable`          | Defines whether intermediate certificate validation is enabled or not.  |
| `cert_cns`       | Specifies the context paths of the intermediate certificates. Multiple context paths can be defined for multiple certificates as follows.  `cert_cns=["wso2is.org","abc.com"]`        |
| `exempt_contexts` | Specifies the context paths that need to be exempted from intermediate certificate validation. Multiple context paths can be defined as follows.  `exempt_contexts=["dcr","scim2"]` |


!!! info
    When using intermediate certificate validation, note that the **CN** will be taken as the `username` instead of retrieving it from the header. Therefore, the incoming certificate request CN should ideally be the username of the user sending the request.

    The certificate CN should be in the following formats for the following cases.
    
    - If the user is in the primary user store, the incoming cert CN should be `<username>`, e.g., `john`.
    - If the user is in a secondary user store, the incoming cert CN should be `<userstore_domain>/<username>`, e.g., `SECONDARY/john`.
    - If the user is not a super tenant and belongs to the primary user store, the incoming cert CN should be `<username@tenant_doman>`, e.g., `john@abc.com`.
    - If the user is not a super tenant and belongs to a secondary user store, the incoming cert CN should be `<userstore_domain>/<username@tenant_doman>` e.g., `SECONDARY/john@abc.com`.


## Additional configurations

This section covers the additional configurations that admins can use when using APIS.

### Secure resources

You can configure user role permissions to restrict access to resources. To do so, follow the guide below.

1. Open the **deployment.toml** file found in the **IS_HOME/repository/conf** directory.

2. In the `[resource.access_control]` section, specify the resource you want to secure along with the following parameters.

    | Parameter            | Description | Sample Value |
    |----------------------|-------------|--------------|
    | `context` | The resource context that needs to be secured relative to the root context. | `/api/identity/*`  |
    | `secured`         | Enable or disable security in the given resource context.  | `true`    |
    | `http_method`      | Specify an HTTP method i.e `all`, `post`, `get`, etc. | `all`  |
    | `permissions`     | The user role permission required to authorize the resource. You can enter multiple permission strings in a comma-separated list.      | `/permission/admin/ login` |
    | `scope`     | Scopes that an access token requires to access the resource. You can enter multiple scopes in a comma-separated list.     | `internal_idp_create` |
    | `allowed_auth_handlers` | This parameter defines the handlers that need to be engaged for the particular resource. The default value `all` implies that all available handlers are engaged with the resource.      | `                 BasicAuthentication                ` |

    !!! abstract
        **Example**
        ```toml
        [resource.access_control]
        context = "/api/identity/*"
        secured = true
        http_method = "all"
        permissions = ["p1","p2"]
        scope = ["scope1", "scope2"]
        allowed_auth_handlers = ["handler1", "handler2"]
        ```