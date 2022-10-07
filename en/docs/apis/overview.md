# APIs - Overview

REST APIs in WSO2 Identity Server can be used by administrators to manage their organizations and by application users to manage their own logins and profiles.

!!! info
    There are two OSGi services that provide authentication and authorization services for REST APIs based on their own handlers.
    
    You can write your own handlers for both authentication and authorization and register them in OSGI. For more information, refer to [Write a Custom Local Authenticator]({{base_path}}/references/extend/federation/write-a-custom-local-authenticator).

## REST API authentication

WSO2 Identity Server supports the following API authentication methods:

- **Basic authentication** : Uses the user’s credentials to invoke the APIs.

- **OAuth2 common flows based authentication** : Obtains an OAuth2 token and uses it to invoke the APIs.
!!! info
    To invoke the APIs using OAuth2 common flows, create a new managed application in IS. Refer to [service provider creation guide]({{base_path}}/guides/applications/register-sp).

- **Client certificate-based authentication** : Uses mutual SSL to authenticate users and invoke the APIs.

Unless one of the above authentication elements is sent in an API invocation request, an API request will return a 401 Unauthorized HTTP response.

### Configure intermediate certificate validation

If you opt for mutual SSL for API authentication, configuring intermediate certificate validation enables you to only use certificates that are signed by a defined list of issuers.

To enable this feature, add the following configuration to the **deployment.toml** file in the **IS_HOME/repository/conf/** folder.

!!! abstract ""
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

| Parameter           | Purpose                                                                                                                                                                                     |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **enable**          | Defines whether intermediate certificate validation is enabled or not.                                                                                                                      |
| **cert_cns**        | Specifies the context paths of the intermediate certificates. Multiple context paths can be defined for multiple certificates as follows.  ``` cert_cns=["wso2is.org","abc.com"] ```        |
| **exempt_contexts** | Specifies the context paths that needs to be exempted from intermediate certificate validation.  Multiple context paths can be defined as follows.  ``` exempt_contexts=["dcr","scim2"] ``` |


!!! info
    When using intermediate certificate validation, note that the **CN** will be taken as the `username` instead of it being retrieved from the header. Therefore, the incoming certificate request CN should ideally be the username of the user who is sending the request.

    The certificate CN should be in the following formats for the following cases.
    
    - If the user is in the primary userstore, the incoming cert CN should just be `<username>` e.g., `john`.
    - If the user is in a secondary userstore, the incoming cert CN should be `<userstore_domain>/<username>` e.g., `SECONDARY/john`.
    - If the user is not a super tenant and belongs to the primary userstore, the incoming cert CN should be `<username@tenant_domain>` e.g., `john@abc.com`.
    - If the user is not a super tenant and belongs to a secondary userstore, the incoming cert CN should be `<userstore_domain>/<username@tenant_domain>` e.g.,             `SECONDARY/john@abc.com`.

## REST API Authorization 

### Secure resources using user role permissions

You can configure user role permissions to restrict access to resources. To do so, follow the guide below.

1.  Open the **deployment.toml** file found in the **IS_HOME/repository/conf** directory.

2.  Specify the resource that you want to secure along with the following parameters.

    | Parameter            |    Description                                                                                                                                                   | Sample Value                                               |
    |----------------------|    ---------------------------------------------------------------------------------------------------------------------   ----------------------------------------|------------------------------------------------------------|
    | **context** | The resource context that needs to be secured relative to the root context, .                                                                  | `                 /api/identity/*                `         |
    | **secured**          | Enable or disable security in the given resource     context.                                                                         | `                    true                `                    |
    | **http_method**      | Specify an HTTP method i.e `                 all                `, `                   post                `, `                 get                `, etc. | `                 all                   `                     |
    | **permissions**      | The user role permission that is required to authorize the resource. You can  enter multiple permission strings in a comma-separated list.      | `                 /permission/admin/login                ` |
    | **scope**      | Scopes that an access token requires to access the resource. You can enter multiple     scopes in a comma-separated list.     | `                 internal_idp_create                ` |

    !!! abstract ""
        **Example**
        ```toml
        [resource.access_control]
        context = "/api/identity/*"
        secured = true
        http_method = "all"
        permissions = ["p1","p2"]
        scope = ["scope1", "scope2"]
        ```


### Scope-based authorization for REST APIs

Each REST API endpoint in WSO2 Identity Server has a predefined minimum level of permission that is required to consume it. A user can be authorized to access an endpoint by being assigned to a role with the required permissions.

WSO2 Identity Server now supports scope-based API authorization for internal REST APIs. When obtaining a token to consume the API, you can define the scope that corresponds to the permissions required to consume the API.

#### Example scenario

Assume that a user whose username is Alex, wants to retrieve the challenge questions available by calling the **/{user-id}/challenges** GET API available in the [Challenge Question REST API]({{base_path}}/apis/challenge-rest-api).

To consume this endpoint, Alex requires `/permission/admin/manage/identity/identitymgt/view` permission and `internal_identity_mgt_view` scope. Hence, Alex can set the scope in the following cURL command and obtain a token.

!!! abstract ""
    **Request**
    ``` java
    curl -v -X POST -H "Authorization: Basic <base64encoded CLIENT_ID:CLIENT_SECRET>" -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>&scope=<SCOPE>" -H "Content-Type:application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```
    ---
    **Sample request**
    ```curl
    curl -k -X POST -H "Authorization: Basic MUxGVzl5NERkYzZxaHVGQnBLX1JyOHA0WU1FYTpDUGl5V0hTeVp6VmJmRTFzanFNc2Vrc053Szhh" -k -d "grant_type=password&username=alex&password=alex123&scope=internal_identity_mgt_view" -H "Content-Type: application/x-www-form-urlencoded" 'https://localhost:9443/oauth2/token'
    ```
    **Sample response**
    ```
    {
        "access_token":"bf01d540-fa67-314f-9ff3-3ed5ef9fa5bd",
        "refresh_token":"dc3906cc-34f9-376c-a6f4-1c2e6b9626c7",
        "scope":"internal_identity_mgt_view",
        "token_type":"Bearer",
        "expires_in":3600
    }
    ```

If the user has sufficient permissions to the scope defined in the request, the response will contain the relavent scope in the `scope` field of the response. The user can then use this access token to consume APIs that require this particular scope.


!!! tip
     You can set **scope=SYSTEM** in your cURL command to generate a token with all the scopes corresponding to the permissions of a user.


!!! info "Related topics"
    -   See [Scopes Corresponding to Permissions Required to Invoke REST API Calls]({{base_path}}/references/scopes-corresponding-to-rest-api-permissions) for a list of scopes corresponding to permissions.

    -   The permissions and scopes required for REST APIs can be found under each API definition.