# Client Credentials Grant with OAuth 2.0 Playground

This page guides you through using a sample Playground application to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Client Credentials]({{base_path}}/references/concepts/authorization/client-credential-grant/) grant type.

----

## Set up the sample application

{!./includes/oauth-playground.md !}

----

## Try Client Credentials grant 

The following cURL command can be used to try this grant type.

!!! abstract ""
    **Request Format**
    ```curl
    curl -v -X POST --basic -u <oauth_client_key>:<oauth_client_secret> -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=client_credentials" <token_endpoint>
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=client_credentials" https://localhost:9443/oauth2/token
    ```

You will receive the following response with the access token.

```
{
    "access_token":"16ab408c-0f31-3321-8bed-313e836df373",
    "token_type":"Bearer",
    "expires_in":2986
}
```


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

