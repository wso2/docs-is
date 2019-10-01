# What Has Changed

In Identity Server 5.9.0 the following have changed.

### Changes to Resource Access Control
WSO2 Identity Server maintains a set of resources that requires user authentication. 
In previous versions, if a resource is not mentioned in the configuration, it was 
allowed to be accessed without user authentication. In WSO2 Identity Server, 
the configuration is changed to deny any request to a resource that is not 
mentioned in the configuration. In addition, the resources that need not require any
user authentication,  has to be explicitly mentioned in the
`deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.

To revert back to the previous behaviour, add the following configuration to 
the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.

```
[resource_access_control]
default_access = ”allow”
```
    
!!! note "Resource definition order"
    The order in which the resource are defined is important for permission that are defined for resources under 
    `ResourceAccessControl`. The entries at the top get precedence over the entries at the bottom.
    
    As all new resources and permissions are added to the top, they get precedence over the already defined 
    resources/permissions. A new resource can be added to the resource access control using the following config.
    You can add the config to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.
    
    ```
    [[resource.access_control]]
    context="<resource>"
    secure="<true/false>"
    http_method="<method>"
    permissions=["<permission>"]
    ```
    
        
### Log printing
WSO2 Identity Server has a log printing mechanism. With WSO2 Identity Server 5.9.0, a correlation Id is 
added to all the places where the logs are printed. 

!!! info "Correlation Id"
    The **correlation Id** is used to correlate the method calls made for a request. The correlation Id is printed after the timestamp.

```tab="Sample"
[2019-09-10 20:36:09,181] [16667e80-6470-425b-b63a-253f096c7e69]  INFO {org.wso2.carbon.core.services.util.CarbonAuthenticationUtil} - 'admin@wso2.com [1]' logged in at [2019-09-10 20:36:09,180+0530]
```

Follow the table below to change the log format to the previous format in 
the `log4j2.properties` file in the `<IS-Home>/repository/conf` directory.

| **New Format**                                                                                                                  | **Old Format**                                                                                             |
|---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| <code>appender.CARBON_CONSOLE.layout.pattern = [%d] [%X{Correlation-ID}] %5p {%c} - %m%ex%n </code>                             |<code> appender.CARBON_CONSOLE.layout.pattern = [%d] %5p {%c} - %m%ex%n </code>                             |
| <code>appender.CARBON_LOGFILE.layout.pattern = TID: [%tenantId] [%appName] [%d] [%X{Correlation-ID}] %5p {%c} - %m%ex%n</code>  |<code> appender.CARBON_LOGFILE.layout.pattern = TID: [%tenantId] [%appName] [%d] %5p {%c} - %m%ex%n </code> |
| <code>appender.AUDIT_LOGFILE.layout.pattern = TID: [%tenantId] [%d] [%X{Correlation-ID}] %5p {%c} - %m%ex%n</code>              |<code> appender.AUDIT_LOGFILE.layout.pattern = TID: [%tenantId] [%d] %5p {%c} - %m%ex%n </code>             |


### Storing of username in consent management 
WSO2 Identity Server supports obtaining user consent at user authentication.  Consent management 
in previous WSO2 Identity Server versions, enforced case-sensitive usernames. WSO2 Identity 
Server 5.9.0 by default supports case-insensitive usernames. If you are using a case-sensitive 
username configuration, add the following configuration to the `deployment.toml` in file in the 
`<IS_HOME>/repository/conf/` directory.

```
[user_store]
use_case_sensitive_username_for_cache_keys = true
```

### Changes to the OIDC discovery (/.well-known/openid- configuration) response
WSO2 Identity Server has an OpendID discovery service that can be called by calling 
the `https://{server-ip}/oauth2/oidcdiscovery/.well-known/openid-configuration` endpoint. 

Earlier the response values of the `request_parameter_supported` and `claims_parameter_supported` properties were 
as follows.
```
"request_parameter_supported": "true",
"claims_parameter_supported": "true",
```

In WSO2 Identity Server 5.9.0 these properties are as given below.
```
"request_parameter_supported": true,
"claims_parameter_supported": true,
```

### Redirecting to callbackUrl in OAuth flow errors
When an error occurs while using the OAuth 2.0 flow in WSO2 Identity Server, the user is redirected to an 
error page at the`authenticationendpoint/oauth2_error.do` URL. According to the specification, unless the 
provided `redirect URI` and `client Id` are invalid, the user should be redirected to the provided redirect URI.  
For WSO2 Identity Server 5.9.0 to be specification-compliant, unless the provided `redirect URI` or `client Id` are 
invalid the user will be redirected to the given redirect URI with the error code, error message, and state 
parameters to the query component of the redirection URI.

To revert back to the previous behaviour, add the following configuration to the `deployment.toml` file, in 
the `<IS_HOME>/repository/conf/` directory.

```
[oauth]
redirect_to_idp_error_page_on_error=true
```

### Scope validation for token issuing
WSO2 Identity Server supports scope validation when issuing tokens for 
[OAuth Service Providers](). 

In previous WSO2 Identity Server versions,  this capability was not available when issuing tokens for 
Authorization code and Implicit grant types. WSO2 Identity Server 5.9.0 supports 
these by default when using a scope validator.

To revert back to the previous behaviour, add the following configuration to 
the `deployment.toml` file, in the `<IS_HOME>/repository/conf/` directory.

```
[oauth.scope_validator.authz_implicit]
enable = false
```

### Authentication Endpoint and Account Recovery Endpoint
In earlier versions of the WSO2 Identity Server the `authenticationendpoint` and the `accountrecoveryendpoint` was packed
in as `war` files in the `<IS_HOME>/repository/deployment/server/webapps/` directory. In WSO2 Identity Server 5.9.0 the exploded war
files are packed.

### Log4j upgrade
WSO2 Identity Server 5.9.0 switched from log4j to log4j2. You will notice that there is a `log4j2.properties` file in the
`<IS_HOME>/repository/conf/` directory instead of the `log4j.properties` file.

!!! warning
    Taking the `log4j.properties` file from your old WSO2 Identity Server and adding it to WSO2 Identity Server 5.9.0 will
    no longer work. Refer [Migrating to log4j2](../../setup/migrating-to-log4j2) to see how to add a log appender or a 
    logger to the `log4j2.properties` file.
    

