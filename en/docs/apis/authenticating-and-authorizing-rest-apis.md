# Authenticate and Authorize REST APIs

This section guides you through securing REST services and understanding how requests to REST APIs are authenticated and authorized in WSO2 Identity Server.

The requests that are sent via REST APIs are intercepted by tomcat valves and authenticated and authorized by an OSGI service. There are two OSGi services that provide the authentication and authorization service based on its own handlers. You can write your own handlers for both authentication and authorization and register them in OSGI if you wish to do so. For more information, see [Writing a Custom Local Authenticator](../../extend/writing-a-custom-local-authenticator)

---

## REST API authentication

WSO2 Identity Server supports three ways of API authentication: 
    -   Basic authentication: Uses the user’s credentials in the API invocation
    -   OAuth 2 common flows: Obtains a token using an oauth2 flow and uses it to invoke the API
    -   Client certificate-based: Uses Mutual SSL to authenticate in order to consume the APIs

!!! note 
    Unless one of the above authentication elements is sent in an API invocation request, the 401 Unauthorized HTTP response will be returned.

--- 

## Secure resources

From 5.9.0 onwards, all endpoints are secured by default. To configure user role permissions, use the following configuration:

1.  Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.

2.  Specify the resource that you want to secure as shown below.

| Parameter            | Description                                                                                                                                                 | Sample Value                                               |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| **context** | This defines the resource context relative to the root context, which needs to be secured.                                                                  | `                 /api/identity/*                `         |
| **secured**          | This specifies whether to enable or disable security in the given resource context.                                                                         | `                 true                `                    |
| **http_method**      | This defines the method as `                 all                `, `                 post                `, `                 get                `, etc. | `                 all                `                     |
| **permissions**      | This defines the user role permission that is required to authorize the resource. You can enter multiple permission strings in a comma-separated list.      | `                 /permission/admin/login                ` |
| **scope**      | This defines scopes that an access token requires to access the resource. You can enter multiple scopes in a comma-separated list.     | `                 internal_idp_create                ` |


```toml tab="Example"
[resource.access_control]
context = "/api/identity/*"
secured = true
http_method = "all"
permissions = ["p1","p2"]
scope = ["scope1", "scope2"]
```

---

## Configure intermediate certificate validation

Configuring intermediate certificate validation enables you to restrict certificates that are used during mutualSSL authentication to certificates that are signed by the defined issuers(`cert_cns`). 

Add the following configuration to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` folder. 

```toml tab="Config"
[intermediate_cert_validation]
enable=true
cert_cns=["cert_CN_list"]
exempt_contexts=["endpoint_list"]
```

```toml tab="Sample"
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
    When using intermediate certificate validation, note that `CN` will be taken as the `username` instead of retrieving it from the header therefore, the incoming certificate request CN should ideally be the username of the user who is sending the request. 

    The certificate CN should be in the following formats for the following cases.
    
    - If the user is in the primary userstore, the incoming cert CN should be just the `<username>` e.g., `john`.
    - If the user is in a secondary userstore, the incoming cert CN should be `<userstore_domain>/<username>` e.g., `SECONDARY/john`.
    - If the user is not a super tenant and belongs to the primary userstore, the incoming cert CN should be `<username@tenant_doman>` e.g., `john@abc.com`.
    - If the user is not a super tenant and belongs to a secondary userstore, the incoming cert CN should be `<userstore_domain>/<username@tenant_doman>` e.g.,             `SECONDARY/john@abc.com`.


----

## Scope-based authorization for REST APIs

Authorization for the APIs in WSO2 Identity Server is enforced at the endpoint level using **permissions**. Each secured endpoint has a predefined minimum level of permission that is required to be able to consume the endpoint. In order to access a particular endpoint, the user has to belong to a **role** that includes the defined permissions. WSO2 Identity Server now supports scope-based API authorization for internal REST APIs.

When obtaining a token to consume the API, you can define the scope corresponding to the permission required to consume the API.

For example, let's assume that a user whose username is Alex, wants to retrieve the challenges available by calling the **/{user-id}/challenges** GET API available in [Challenge Question](../../apis/challenge-rest-api) REST API. This requires the user-id as an input. 
To retrieve the challenges, Alex requires `/permission/admin/manage/identity/identitymgt/view` permission and `internal_identity_mgt_view` scope. Hence,Alex can invoke the following cURL command with `scope=internal_identity_mgt_view` and obtain a token.

``` java tab="Request"
curl -v -X POST -H "Authorization: Basic <base64encoded clientId:clientSecrect>" -k -d "grant_type=password&username=alex&password=alex123&scope=somescope" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

``` java tab="Sample Request"
curl -k -X POST -H "Authorization: Basic MUxGVzl5NERkYzZxaHVGQnBLX1JyOHA0WU1FYTpDUGl5V0hTeVp6VmJmRTFzanFNc2Vrc053Szhh" -k -d "grant_type=password&username=alex&password=alex123&scope=internal_identity_mgt_view" -H "Content-Type: application/x-www-form-urlencoded" 'https://localhost:9443/oauth2/token'
```

When the above cURL command is called, a token of the following format will be generated. If the user that requests the token has sufficient permissions to the scope defined in the request, the response will contain the scope specified in the above command. 


``` java tab="Sample Response"
{"access_token":"bf01d540-fa67-314f-9ff3-3ed5ef9fa5bd",
"Refresh_token":"dc3906cc-34f9-376c-a6f4-1c2e6b9626c7",
"Scope":"internal_identity_mgt_view",
"token_type":"Bearer",
"expires_in":3600}
```

If the response with the generated token contains the scope specified in the cURL request, the received access token can be used to consume the API that requires the particular scope.

!!! note
     To obtain a token with all the scopes corresponding to the permissions assigned to the user, you can use **scope=SYSTEM**. It will generate a token with all the scopes corresponding to the permissions of the user.   
   
--- 

!!! info "Related Links"
    -   See [Scopes Corresponding to Permissions Required to Invoke API Calls](../../references/scopes-corresponding-to-api-permissions) 
    for a list of scopes corresponding to the permissions required for different REST APIs.

    -   The permissions and scopes required for each REST API can be found under API description in the corresponding
    API Documentation in the [REST APIs](../../apis/rest-apis) section.
