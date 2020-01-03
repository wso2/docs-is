# Try Password Grant

The Password Grant is one of the four grant types in the OAuth 2.0
specification. For more information about this grant type, see [Resource
Owner Password Credentials
Grant](../../learn/resource-owner-password-credentials-grant)
.

#### **Running the application**

!!! note "Before you begin" 
    You must first
    [set up the `playground` sample webapp.](../../learn/deploying-the-sample-app/#deploying-the-playground2-webapp)
    in order to try the following scenario.        

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.
2.  Enter the following details and click **Authorize**.

    **Authorization Grant Type:** Resource Owner  
    **Client ID:** (the client id received at the [application
                                    registration](../../learn/deploying-the-sample-app/#configuring-the-service-provider_1))  
    **Client Secret:** (client secret received at the [application
                                    registration](../../learn/deploying-the-sample-app/#configuring-the-service-provider_1))  
    **Resource Owner User Name:** (username)  
    **Resource Owner Password:** (password of the user)  
    **Authorize Endpoint:** https://localhost:9443/oauth2/authorize
    
    **Token Endpoint:** https://localhost:9443/oauth2/token

    ![password-grant-token-endpoint](../assets/img/using-wso2-identity-server/password-grant-token-endpoint.png) 
    
    !!! Tip 
        The playground application will send a token request to the
        **token** endpoint of the WSO2 Identity Server using the following
        format.
        ```java
        POST
        https://<host>:<port>/oauth2/token
        Authorization: Basic [Base64encode(Client-ID>:<ClientSecret>)]
        Content-Type: application/x-www-form-urlencoded
        
        grant_type=password&username=<Resource Owner User Name>&password=<Resource Owner Password>
        ```
            
        !!! Example
            ```java
            POST
            https://localhost:9443/oauth2/token
            Authorization: Basic Q3g0TEtGTk9iZXVYb2N4N3hnT3B6NXZmekZvYTogVWRUNm5XbnFXWkdnNDFHWnI5TXBTWGs5eU04YQ==
            Content-Type: application/x-www-form-urlencoded
            
            grant_type=password&username=admin&password=admin
            ``` 

3.  At this point the application receives the Access Token. Enter the
    introspection endpoint (i.e,
    <https://localhost:9443/oauth2/introspect> ) and click **Get
    TokenInfo** to get the token information.  

    ![password-grant-introspection-point](../assets/img/using-wso2-identity-server/password-grant-introspection-point.png)

    ??? note "Click here for more information on OAuth 2.0 Token Introspection"
        OAuth 2.0 Token Introspection defines a protocol that allows
        authorized protected resources to query the authorization server to
        determine the set of metadata for a given token that was presented
        to them by an OAuth Client. This metadata includes whether or not
        the token is currently active (or if it has expired or otherwise
        been revoked), what rights of access the token carries (usually
        conveyed through OAuth 2.0 scopes), and the authorization context in
        which the token was granted (including who authorized the token and
        which client it was issued to). Token introspection allows a
        protected resource to query this information regardless of whether
        or not it is carried in the token itself, allowing this method to be
        used along with or independently of structured token values.

4.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  
    ![password-grant-access-token](../assets/img/using-wso2-identity-server/password-grant-access-token.png) 

!!! info "Related Topics"
    -   See [Invoke the OAuth Introspection
        Endpoint](../../learn/invoke-the-oauth-introspection-endpoint)
        to invoke the OAuth introspection endpoint using cURL commands.
