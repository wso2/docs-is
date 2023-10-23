# Authenticating and Authorizing REST APIs

This section guides you through securing REST services and how requests
to REST APIs are authenticated and authorized in WSO2 Identity Server.

The requests that are sent via REST APIs are intercepted by tomcat
valves and authenticated and authorized by an OSGI service. There are
two OSGi services that provide the authentication and authorization
service based on its own handlers.

-   WSO2 Identity Server supports three ways of API authentication. 
    -   Basic authentication: Uses the user’s credentials in the API invocation
    -   OAuth 2 common flows: Obtains a token using an oauth2 flow and uses it to invoke the API
    -   Client certificate-based: Uses Mutual SSL to authenticate in order to consume the APIs

!!! note 
    Unless one of the above authentication elements is sent in an API invocation request, the 401 Unauthorized HTTP response will be returned.
    
-   Authorization for the APIs is enforced at the endpoint level using **permissions**. Each secured endpoint has a predefined minimum level of permission that is required to be able to consume the endpoint. In order to access a particular endpoint, the user has to belong to a **role** that is in or above the defined permission level.

!!! note
    You can write your own handlers for both authentication and authorization and register them in OSGI.
    
## Secure resources

To specify the resources that you want to secure:

!!! note
    If you are using version 5.9.0 or above, you can skip this step since all the endpoints are secured by default from 5.9.0 onwards. However, the configuration mentioned below can be used to configure the user role permissions as well.  

1.  Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.

2.  Specify the resource that you want to secure as shown below.

| Parameter            | Description                                                                                                                                                 | Sample Value                                               |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| **context** | This defines the resource context relative to the root context, which needs to be secured.                                                                  | `                 /api/identity/*                `         |
| **secured**          | This specifies whether to enable or disable security in the given resource context.                                                                         | `                 true                `                    |
| **http_method**      | This defines the method as `                 all                `, `                 post                `, `                 get                `, etc. | `                 all                `                     |
| **permissions**      | This defines the user role permission that is required to authorize the resource. You can enter multiple permission strings in a comma-separated list.      | `                 /permission/admin/login                ` |

        
```toml tab="Example"
[resource.access_control]
context = "/api/identity/*"
secured = true
http_method = "all"
permissions = ["p1","p2"]
```

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
exempt_contexts=[]
```

| Parameter           | Purpose                                                                                                                                                                                     |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **enable**          | Defines whether intermediate certificate validation is enabled or not.                                                                                                                      |
| **cert_cns**        | Specifies the context paths of the intermediate certificates. Multiple context paths can be defined for multiple certificates as follows:  ` `cert_cns=["wso2is.org","abc.com"]`        |
| **exempt_contexts** | Specifies the context paths that need to be exempted from intermediate certificate validation. It is recommended to add this parameter and **leave it empty** as shown in the above sample. This is because authentication might fail for the exempted contexts. However, if you still require context paths to be exempted, you can list the context paths as follows: ``` exempt_contexts=["dcr","scim2"] ``` |


!!! info
    When using intermediate certificate validation, note that `CN` will be taken as the `username` instead of retrieving it from the header therefore, the incoming certificate request CN should ideally be the username of the user who is sending the request. 

    The certificate CN should be in the following formats for the following cases.
    
    - If the user is in the primary userstore, the incoming cert CN should be just the `<username>` e.g., `john`.
    - If the user is in a secondary userstore, the incoming cert CN should be `<userstore_domain>/<username>` e.g., `SECONDARY/john`.
    - If the user is not a super tenant and belongs to the primary userstore, the incoming cert CN should be `<username@tenant_doman>` e.g., `john@abc.com`.
    - If the user is not a super tenant and belongs to a secondary userstore, the incoming cert CN should be `<userstore_domain>/<username@tenant_doman>` e.g.,             `SECONDARY/john@abc.com`.
