# APIs - Overview

WSO2 Identity Server exposes most of the features via REST APIs. Those APIs are categorized into four main categories based on the usage.

 - System APIs - APIs that are used to manage the WSO2 Identity Server system.
 - Management APIs - APIs that are consumed by an application as WSO2 Identity Server as the Identity Provider.
 - Organization APIs - APIs that are consumed by the B2B SaaS applications for organization-level operations.
 - End User APIs - APIs that are used for all operations on the currently authenticated user.

!!! info
    Two OSGi services provide authentication and authorization services for REST APIs based on their handlers.
    
    <!-- TODO You can write your handlers for authentication and authorization and register them in OSGI. For more information, refer to [Write a Custom Local Authenticator]({{base_path}}/references/extend/federation/write-a-custom-local-authenticator).-->


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
curl -X GET "https://localhost:9443/api/server/v1/applications?limit=30&offset=0" -H "accept: application/json" -H "Authorization: Basic <Base64(username:password)>"
```

!!! warning "Avoid using super admin credentials for API authentication"

    When invoking APIs using basic authentication, never use the super admin or any high-privileged user credentials. Instead, create a user with the least privileges required to invoke the API and use that user's credentials.

---

### OAuth-based authentication
This authentication method requires users to obtain an OAuth2 token and then use it to invoke the APIs. If the API you wish to invoke has `Password`, `Client-credentials`, or `AuthorizationCode` as the authentication requirement, use the following request format to obtain a bearer token.

!!! info "Before you begin"
    - You need to [create a standard-based application or an M2M application]({{base_path}}/guides/applications) based on the requirement.
    - Expand the relevant API definition on the docs and obtain the **scope** required to invoke the API.
    - [Authorize the relevant API and required scopes]({{base_path}}/guides/api-authorization/) to the created application.
    - If you are using a grant type other than `client credentials` grant, ensure that you've configured the relevant roles for the application with the necessary permissions to access the API. Additionally, assign these roles to the user who wants to obtain the token.

!!! abstract
    **Password Grant Request**
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

!!! abstract
    **Client Credentials Grant Request**
    ```
    curl https://localhost:9443/oauth2/token -k -H "Authorization: Basic Base64 (<clientid>:<client-secret>)" -H "Content-Type: application/x-www-form-urlencoded" \--data-urlencode '"grant_type=client_credentials" --data-urlencode "scope=<scope>"
    ```
    **Sample request**
    ```
    curl https://localhost:9443/oauth2/token -k -H "Authorization: Basic d21VRm5oY2xlWFJNSFFZb29iUkx5VGY0TUxFYTowc0doU0dOOG4zMXJFQnpSRjkyYlN1dG5IRUFh" -H "Content-Type: application/x-www-form-urlencoded" \--data-urlencode '"grant_type=client_credentials" --data-urlencode "scope=internal_application_mgt_view"
    ```
    **Sample response**
    ```
    {
        "access_token": "decc891e-4bee-3831-a321-38b1db1fece0",
        "scope": "internal_application_mgt_view",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

The variables used in the cURL request are as follows: 

| Variable  | Description                                                                                                                                                                                               | Sample value  |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `clientid`    | Client ID of your application. This is generated when registering the service provider on IS.                                                                                                             | `wmUFnhcleXRMHQYoobRLyTf4MLEa`   |
| `clientsecret`    | Client secret of your application. This is generated when registering the service provider on IS.                                                                                                         | `0sGhSGN8n31rEBzRF92bSutnHEAa`   |
| `Base64 (<clientid>:<client-secret>)` | The base64 encoded value of `clientid:clientsecret`.                                                                                                                                                      | `d21VRm5oY2xlWFJNSFFZb29iUkx5VGY0TUxFYTowc0doU0dOOG4zMXJFQnpSRjkyYlN1dG5IRUFh`    |
| `username`    | Username of the user trying to invoke the API.                                                                                                                                                            | `alex`  |
| `password`    | Password of the user trying to invoke the API.                                                                                                                                                            | `alex@123`  |
| `scope`   | The scope corresponding to the API you want to use. See the relevant API reference docs for each API's list of internal scopes. To request multiple scopes, include them in the request, separating each scope with spaces. | `internal_login`   |

#### Access the API
You can now use the access token as an Authorization Bearer header to access the APIs.

This is a sample cURL command template for the request.

```curl
curl -X GET "https://localhost:9443/api/users/v1/me/sessions" -H "accept: application/json” -H Authorization: Bearer <access_token>"
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

### Client certificate authentication mappings 

WSO2 Identity Server now supports two configuration models for mapping client certificates to users or system accounts. These mappings provide flexibility when securing System REST APIs with mTLS.

---

#### 1. Authentication with no user header

This mode is used for **machine-to-machine (M2M)** calls where no `WSO2-Identity-User` header is present. In this scenario certificates are mapped to **system users**.

| Configuration | Possible Value | Description |
|---------------|----------------|-------------|
| `[client_certificate_based_authentication] enable` | `true` | Enables mTLS-based authentication for System REST APIs. |
| `trusted_issuer` | `"C=AU, ST=Northern, L=Colombo, O=WSO2, OU=IAM, CN=RootCA, emailAddress=ca@wso2.com"` | Distinguished name (DN) of the permitted certificate issuer. |
| `cert_thumbprint` | `"78:9B:25:49:5A:A6:DA:74:9C:F7:A8:90:CE:B9:21:EA:EC:C7:22:2A:B3:77:41:1B:6D:48:22:91:98:A9:FD:47"` or `*` | Exact certificate fingerprint, or `*` to allow all issued by the trusted issuer. |
| `allowed_system_user` | `"admin"` or `"*"` | The system user mapped to the certificate. `*` means any system user. |

**Supported patterns:**

| Trusted Issuer | Thumbprint | Allowed System User | Description                                                                                                                  |
|----------------|------------|---------------------|------------------------------------------------------------------------------------------------------------------------------|
| Specific DN    | *          | *                   | Any certificate from the trusted issuer can be used by any system user.<br/> WSO2 doesn't recommend this for production use. |
| Specific DN    | *          | system_user         | Any certificate from the trusted issuer can be used by the specified system user.                                            |
| Specific DN    | Specific   | system_user         | Certificates with a listed thumbprint can be used by the specified system user.<br/> **Recommended pattern**.                |
| Specific DN    | Specific   | *                   | Certificates with a listed thumbprint can be used by any system user.                                                        |

**Example:**

```toml
[client_certificate_based_authentication]
enable = true

[[client_certificate_based_authentication.system_thumbprint_mapping]]
trusted_issuer = "C=US, ST=TX, L=Colombo, O=WSO2, OU=IAM, CN=RootCA, emailAddress=iam@wso2.com"
cert_thumbprint = "78:9B:25:49:5A:A6:DA:74:9C:F7:A8:90:CE:B9:21:EA:EC:C7:22:2A:B3:77:41:1B:6D:48:22:91:98:A9:FD:47"
allowed_system_user = "admin"
```
#### 2. Authentication with `WSO2-Identity-User` header

This mode is used when the client presents both a **certificate** and a **user header**. The certificates are mapped to **application users**.

---

##### Configuration parameters

| Configuration | Possible Value | Description |
|---------------|----------------|-------------|
| `[client_certificate_based_authentication] enable` | `true` | Enables mTLS-based authentication for System REST APIs. |
| `trusted_issuer` | `"C=AU, ST=Northern, L=Colombo, O=WSO2, OU=IAM, CN=RootCA, emailAddress=ca@wso2.com"` | Distinguished name (DN) of the permitted certificate issuer. |
| `cert_thumbprint` | `"78:9B:25:49:..."` or `*` | Exact certificate fingerprint, or `*` to allow all issued by the trusted issuer. |
| `allowed_username` | `["admin", "user@tenant.com"]` or `["*"]` | List of usernames allowed to authenticate with this certificate. |

---

##### Supported patterns

| Trusted Issuer | Thumbprint | Allowed Usernames | Description                                                                                                    |
|----------------|------------|-------------------|----------------------------------------------------------------------------------------------------------------|
| Specific DN    | *          | [*]               | Any certificate from the trusted issuer can be used by any user.<br/>️ It's not recommended for production use. |
| Specific DN    | *          | [user1, user2]    | Any certificate from the trusted issuer can be used by specific users.                                         |
| Specific DN    | Specific   | [user1, user2]    | Certificates with a listed thumbprint can be used by the specified users.<br/> **Recommended pattern**.        |
| Specific DN    | Specific   | [*]               | Certificates with a listed thumbprint can be used by any user.                                                 |

---

##### Example

```toml
[client_certificate_based_authentication]
enable = true

[[client_certificate_based_authentication.user_thumbprint_mapping]]
trusted_issuer = "C=AU, ST=Northern, L=Colombo, O=WSO2, OU=IAM, CN=RootCA, emailAddress=ca@wso2.com"
cert_thumbprint = "78:9B:25:49:5A:A6:DA:74:9C:F7:A8:90:CE:B9:21:EA:EC:C7:22:2A:B3:77:41:1B:6D:48:22:91:98:A9:FD:47"
allowed_username = ["admin", "user@tenant.com"]
```

!!! note
WSO2 doesn't recommend using wildcards in production unless it necessitates.
For stronger security, bind certificates to specific users or system accounts wherever possible.

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