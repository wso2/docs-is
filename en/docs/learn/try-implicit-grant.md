# Try Implicit Grant

The Implicit Grant is one of the four grant types in the OAuth 2.0
specification. For more information about this grant type, see [Implicit
Grant](../../learn/implicit-grant).

#### **Running the application**

!!! note
    
    Before you begin, you must first [set up the sample
    webapp.](../../learn/setting-up-the-sample-webapp)
    

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.
2.  Enter the following details and click **Authorize**.

    Authorization Grant Type: Implicit  
    Client ID: (the client id received at the application
    registration)  
    Callback URL: <http://wso2is.local:8080/playground2/oauth2client>  
    Authorize Endpoint: <https://localhost:9443/oauth2/authorize>

    ![running-implicit-grant-type](../assets/img/using-wso2-identity-server/running-implicit-grant-type.png) 

3.  Log in with the user.  
    ![sign-in-with-pkce](../assets/img/using-wso2-identity-server/sign-in-with-pkce.png)

4.  Click Approve to consent to this action.  
    ![approve-consent-with-pkce](../assets/img/using-wso2-identity-server/approve-consent-with-pkce.png)

5.  At this point the application receives the Access Token. Enter the
    introspection endpoint (i.e,
    <https://localhost:9443/oauth2/introspect> ) and click **Get
    TokenInfo** to get the token information.

    ![implicit-grant-token-info](../assets/img/using-wso2-identity-server/implicit-grant-token-info.png)

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

6.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  
    ![implicit-token-info](../assets/img/using-wso2-identity-server/implicit-token-info.png) 

!!! info "Related Topics"
    -   See [Invoke the OAuth Introspection
        Endpoint](../../learn/invoke-the-oauth-introspection-endpoint)
        to invoke the OAuth introspection endpoint using cURL commands.
