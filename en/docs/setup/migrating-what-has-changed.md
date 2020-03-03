# What Has Changed

WSO2 Identity Server 5.9.0 brings a range of new features and major improvements. In IS 5.9.0, the following 
aspects have been changed compared to the previous IS versions.

## Changes to Resource Access Control
WSO2 Identity Server maintains a set of resources that requires user authentication. 
In previous versions, if a resource is not mentioned in the configuration, it was 
allowed to be accessed without user authentication. In WSO2 Identity Server 5.9.0, 
the configuration is changed to deny any request to a resource that is not 
mentioned in the configuration. In addition, the resources which do not require any
user authentication,  has to be explicitly mentioned in the
`deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.
    
!!! note "Resource definition order"
    The order in which the resource are defined is important for permission that are defined for resources under 
    `ResourceAccessControl`. The entries at the top get precedence over the entries at the bottom.
    
    As all new resources and permissions are added to the top, they get precedence over the already defined 
    resources/permissions. A new resource can be added to the resource access control using the following config.
    You can add the config to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.
    
    ```toml
    [[resource.access_control]]
    context="<resource>"
    secure="<true/false>"
    http_method="<method>"
    permissions=["<permission>"]
    ```

!!! note "NOTE"    
    **To revert back to the previous behaviour**, add the following configuration to 
    the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.
    
    ```toml
    [resource_access_control]
    default_access = "allow"
    ```
        
## Log printing
WSO2 Identity Server has a log printing mechanism. With WSO2 Identity Server 5.9.0, a correlation Id is 
added to all the places where the logs are printed. 

!!! info "Correlation Id"
    The **correlation Id** is used to correlate the method calls made for a request. The correlation Id is 
    printed after the timestamp.
    
    ```tab="Sample log"
    [2019-09-10 20:36:09,181] [16667e80-6470-425b-b63a-253f096c7e69]  INFO {org.wso2.carbon.core.services.util.CarbonAuthenticationUtil} - 'admin@wso2.com [1]' logged in at [2019-09-10 20:36:09,180+0530]
    ```

!!! note "NOTE"
    To get the previous format in error logs, change the the `log4j2.properties` file in the 
    `<IS-Home>/repository/conf` directory as shown below.
        
    | **New Format**                                                                                                                  | **Old Format**                                                                                             |
    |---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
    | <code>appender.CARBON_CONSOLE.layout.pattern = [%d] [%X{Correlation-ID}] %5p {%c} - %m%ex%n </code>                             |<code> appender.CARBON_CONSOLE.layout.pattern = [%d] %5p {%c} - %m%ex%n </code>                             |
    | <code>appender.CARBON_LOGFILE.layout.pattern = TID: [%tenantId] [%appName] [%d] [%X{Correlation-ID}] %5p {%c} - %m%ex%n</code>  |<code> appender.CARBON_LOGFILE.layout.pattern = TID: [%tenantId] [%appName] [%d] %5p {%c} - %m%ex%n </code> |
    | <code>appender.AUDIT_LOGFILE.layout.pattern = TID: [%tenantId] [%d] [%X{Correlation-ID}] %5p {%c} - %m%ex%n</code>              |<code> appender.AUDIT_LOGFILE.layout.pattern = TID: [%tenantId] [%d] %5p {%c} - %m%ex%n </code>             |

        
## Storing the username in consent management
WSO2 Identity Server supports obtaining user consent at user authentication. Consent management 
in previous Identity Server versions, enforced case-sensitive usernames. But, Identity 
Server 5.9.0 supports case-insensitive usernames by default. 

!!! note "NOTE"
    If you are using a case-sensitive 
    username configuration, add the following configuration to the `deployment.toml` in file in 
    `<IS_HOME>/repository/conf/` directory.
    
    ```toml
    [user_store]
    use_case_sensitive_username_for_cache_keys = true
    ```

## Changes to the OIDC discovery response
WSO2 Identity Server has an OpendID discovery service that can be called by using 
the `https://{server-ip}/oauth2/oidcdiscovery/.well-known/openid-configuration` endpoint. 

In previous versions, the response values of the `request_parameter_supported` and `claims_parameter_supported` 
properties were as follows.
```
"request_parameter_supported": "true",
"claims_parameter_supported": "true",
```

In WSO2 Identity Server 5.9.0 the values for above properties have been changed to `boolean` instead of `string`.
```
"request_parameter_supported": true,
"claims_parameter_supported": true,
```

## Redirecting to callbackUrl in OAuth flow errors
In previous Identity Server versions, when an error occurs while using the OAuth 2.0 flow, the 
user was redirected to an error page at the `authenticationendpoint/oauth2_error.do` URL. According to the 
specification, unless the provided `redirect URI` and `client Id` are invalid, the user should be redirected 
to the provided redirect URI.  

For WSO2 Identity Server 5.9.0 to be specification-compliant, unless the provided `redirect URI` or 
`client Id` are invalid, the user will be redirected to the given redirect URI with the `error`, `error_description`,
 and `state` parameters set to the query component of the redirection URI.

!!! note "NOTE"
    To achieve the previous behaviour, add the following configuration to the `deployment.toml` in 
    `<IS_HOME>/repository/conf/` directory.
    
    ```toml
    [oauth]
    redirect_to_idp_error_page_on_error=true
    ```

## Redirecting to PostLogoutUri in user consent denial for OIDC logout
When a user rejects the OIDC logout consent, in earlier versions of the WSO2 Identity Server the user was redirected to 
the `oauth2_error.do` page with _“access_denied - End User denied the logout request”_ error message. Custom 
parameters such as “oauthErrorCode” and “oauthErrorMsg” were used to explain the issue to the user.

In WSO2 Identity Server 5.9.0, the user will be redirected to `postLogoutUri` with the parameters `error`  and 
`error_description` which are defined in the OIDC specification. 

!!! note "NOTE"
    To achieve previous behaviour, add the following configuration to the `deployment.toml` in 
    `<IS_HOME>/repository/ conf/` directory.
    
    ```toml
    [oauth.oidc]
    redirect_to_post_logout_uri_on_consent_denial = false
    ```

## Scope validation for token issuing
WSO2 Identity Server supports scope validation when issuing tokens for 
[OAuth Service Providers](../../learn/validating-oauth-access-token-scope-using-xacml-policies-during-token-issuance/). 

In previous Identity Server versions, this capability was not available when issuing tokens for 
Authorization Code and Implicit grant types. Identity Server 5.9.0 supports 
these by default when using a scope validator.

!!! note "NOTE"
    To achieve the previous behaviour, add the following configuration to 
    the `deployment.toml` in `<IS_HOME>/repository/conf/` directory.
    
    ```toml
    [oauth.scope_validator.authz_implicit]
    enable = false
    ```

## Authentication Endpoint and Account Recovery Endpoint
In earlier versions of the WSO2 Identity Server the `authenticationendpoint` and the 
`accountrecoveryendpoint` was packed in as `war` files in the `<IS_HOME>/repository/ 
deployment/server/webapps/` directory. In WSO2 Identity Server 5.9.0 the exploded war files are packed.

## Log4j upgrade
WSO2 Identity Server 5.9.0 has switched from log4j to log4j2. You will notice that there is a 
`log4j2.properties` file in the `<IS_HOME>/repository/conf/` directory instead of the 
`log4j.properties` file.

!!! warning
    Taking the `log4j.properties` file from your old WSO2 Identity Server and adding it to WSO2 Identity 
    Server 5.9.0 will no longer work. 
    Refer [Migrating to log4j2](../../setup/migrating-to-log4j2) to see how to add a log appender or a 
    logger to the `log4j2.properties` file.
    
!!! note "Migrating to JDK 11"
    If you are migrating to JDK 11, you need to change the signature of the adaptive authentication 
    script method since the improvements done for the _Nashorn Engine_ to support ES6 in JDK 9 made 
    the following method signature unsupported.
    
    **Unsupported method signature**
    ```javascript
    function getAge(birthDate) {
        ...   
    }
    ```
    **Supported method signature**
    ```javascript
    var getAge = function (birthDate) {
        ...
    };
    ``` 
