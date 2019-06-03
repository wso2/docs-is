# OAuth 2.0 Grant Types

Grant types are used to authorize access to protected resources in
different ways. This section lists out the main OAuth2 grant types
supported by WSO2 Identity Server.

-   [Authorization Code Grant](_Authorization_Code_Grant_)
-   [Implicit Grant](_Implicit_Grant_)
-   [Resource Owner Password Credentials
    Grant](_Resource_Owner_Password_Credentials_Grant_)
-   [Client Credentials Grant](_Client_Credentials_Grant_)
-   [Refresh Token Grant](_Refresh_Token_Grant_)
-   [Kerberos Grant](_Kerberos_Grant_)

!!! note
    
    Identity Server 5.4.0 provides more control over issuing id tokens and
    user claims for client-credential grant type. To facilitate this, the
    following configurations should be added to the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file
    in order to register new `         ScopeHandlers        ` and
    `         ScopeValidators        ` .
    
    ``` xml
    <OAuth>
    ....
        <ScopeHandlers>
            <ScopeHandler class="org.fully.qualified.class.name.CustomScopeHandler">
               <Property name="foo">foo-value</Property>
            </ScopeHandler>    
        </ScopeHandlers>
    
        <ScopeValidators>
            <ScopeValidator class="org.fully.qualified.class.name.ExtendedScopeValidator" scopesToSkip="scope1 scope2">
                <Property name="foo-property">foo-value</Property>
            </ScopeValidator>
        <ScopeValidators>
    ```
    
    Further, by configuring the `         <IdTokenAllowed>        ` property
    to `         true        ` or `         false        ` along with the
    above configuration, you can turn on or turn off the process of issuing
    ID tokens for the grant types that have the `         openid        `
    scope. By default, `         IdTokenAllowed        ` is set to
    `         true        ` , you can allow it to issue
    `         id_tokens        ` for all grant types that have the
    `         openid        ` scope. By configuring it to false, you can
    stop issuing ID tokens.  
    **Note:** You can not turn off the process of issuing ID tokens for the
    `         authorization_code        ` grant type.
    
    By configuring the `         <IsRefreshTokenAllowed>        ` property
    to `         true        ` or `         false        ` along with the
    above configuration, you can turn on or turn on the process of issuing
    refresh tokens. By default, `         IsRefreshTokenAllowed        ` is
    set to `         true        ` , and `        ` you can allow it to
    issue refresh tokens for all grant types. By configuring it to
    `         false        ` , you can stop issuing refresh tokens.  
    **Note:** By default, i ssuing ID token for
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
    
