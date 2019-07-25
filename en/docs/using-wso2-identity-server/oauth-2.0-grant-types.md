# OAuth 2.0 Grant Types

Grant types are used to authorize access to protected resources in
different ways. This section lists out the main OAuth2 grant types
supported by WSO2 Identity Server.

-   [Authorization Code Grant](../../using-wso2-identity-server/authorization-code-grant)
-   [Implicit Grant](../../using-wso2-identity-server/implicit-grant)
-   [Resource Owner Password Credentials
    Grant](../../using-wso2-identity-server/resource-owner-password-credentials-grant)
-   [Client Credentials Grant](../../using-wso2-identity-server/client-credentials-grant)
-   [Refresh Token Grant](../../using-wso2-identity-server/refresh-token-grant)
-   [Kerberos Grant](../../using-wso2-identity-server/kerberos-grant)

!!! note
    
    WSO2 Identity Server provides more control over issuing id tokens and
    user claims for client-credential grant type. To facilitate this, add the following configurations to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder in order 
    to register new `         ScopeHandlers        ` and
    `         ScopeValidators        ` .
    
    ``` toml
    [oauth.custom_scope_validator]
    class = "org.fully.qualified.class.name.CustomScopeValidator"
    ```
    
    Further, by configuring the `         <IdTokenAllowed>        ` property
    to `         true        ` or `         false        ` along with the
    above configuration, you can turn on or turn off the process of issuing
    ID tokens for the grant types that have the `         openid        `
    scope. By default, `         IdTokenAllowed        ` is set to
    `         true        `, you can allow it to issue
    `         id_tokens        ` for all grant types that have the
    `         openid        ` scope. By configuring it to false, you can
    stop issuing ID tokens.  
    **Note:** You can not turn off the process of issuing ID tokens for the
    `         authorization_code        ` grant type.
    
    By configuring the `         <IsRefreshTokenAllowed>        ` property
    to `         true        ` or `         false        ` along with the
    above configuration, you can turn on or turn on the process of issuing
    refresh tokens. By default, `         IsRefreshTokenAllowed        ` is
    set to `         true        `, and `        ` you can allow it to
    issue refresh tokens for all grant types. By configuring it to
    `         false        `, you can stop issuing refresh tokens.  
    **Note:** By default, issuing ID token for
    `         client_credentials        ` grant type is disabled as it is
    logically invalid.
    
    ``` xml
    <SupportedGrantType>
        <GrantTypeName>client_credentials</GrantTypeName>
        <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.token.handlers.grant.ClientCredentialsGrantHandler</GrantTypeHandlerImplClass>
        <IsRefreshTokenAllowed>false</IsRefreshTokenAllowed>
        <IdTokenAllowed>false</IdTokenAllowed>
    </SupportedGrantType>
    ```
    
