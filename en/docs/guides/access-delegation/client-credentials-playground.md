# Client Credentials Grant with OAuth 2.0 Playground

This page guides you through using a sample Playground application to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Client Credentials](../../references/concepts/authorization/client-credential-grant/) grant type.

----

## Set up the sample application

{! fragments/oauth-playground.md !}

----

## Try Client Credentials grant 

1.  Enter the following details.

    - **Authorization Grant Type**: Client Credentials
    
    - **Client ID**: The OAuth Client Key received when registering the service provider.

	- **Client Secret**: The Client Secret received when registering the service provider.

	- **Access Token Endpoint**: `https://<IS_HOST>:<IS_PORT>/oauth2/token`

		![Client credentials grant with Playground](../../assets/img/samples/client-credentials-with-playground.png)
    
2. Click **Authorize**. 

	The playground application will send an
	[authorization request](https://tools.ietf.org/html/rfc6749#section-4.1.1)
	to the **authorize** endpoint of the WSO2 Identity Server using the
	following format.
	
	!!! abstract ""
        **Request Format**
		```java
		POST
		https://<host>:<port>/oauth2/token
		Authorization: Basic [Base64encode(Client-ID>:<ClientSecret>)]
		Content-Type: application/x-www-form-urlencoded

		grant_type=client_credentials
		```
		---
        **Sample Request**
		```java
		POST
		https://localhost:9443/oauth2/token
		Authorization: Basic Q3g0TEtGTk9iZXVYb2N4N3hnT3B6NXZmekZvYTogVWRUNm5XbnFXWkdnNDFHWnI5TXBTWGs5eU04YQ==
		Content-Type: application/x-www-form-urlencoded

		grant_type=client_credentials
		```

3. Log in with user credentials (e.g., `admin`/`admin`). At this point, the application receives the access token. 

4. Enter the **Introspection Endpoint** (i.e, `https://<IS_HOST>:<IS_PORT>/oauth2/introspect`) and click **Get TokenInfo** to get the token   information. 

5. Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  

	![Access token information](../../assets/img/samples/access-token-info.png)

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

