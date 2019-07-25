# Try Password Grant

The Password Grant is one of the four grant types in the OAuth 2.0
specification. For more information about this grant type, see [Resource
Owner Password Credentials
Grant](https://docs.wso2.com/display/IS530/Resource+Owner+Password+Credentials+Grant)
.

#### **Running the application**

!!! note
    
    Before you begin, you must first [set up the sample
    webapp.](https://docs.wso2.com/display/IS530/Setting+Up+the+Sample+Webapp)
    

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.
2.  Enter the following details and click **Authorize**.

    Authorization Grant Type: Resource Owner  
    Client ID: (the client id received at the application
    registration)  
    Client Secret: (client secret received at the application
    registration)  
    Resource Owner User Name: (username)  
    Resource Owner Password: (password of the user)  
    Authorize Endpoint:
    [https://localhost:9443/oauth2/](https://localhost:9443/oauth2/authorize)
    [token](https://localhost:9443/oauth2/token)

    If you have configured the service provider in a tenant, you have to
    add the tenant domain as a query parameter to the access token
    endpoint.

    If the tenant domain is *[wso2.com](http://wso2.com)*, access token
    endpoint will be as follows.

    Access Token Endpoint:
    <https://localhost:9443/oauth2/token?tenantDomain=wso2.com>

    ![]( ../../assets/img/103329939/103329942.png) 

3.  At this point the application receives the Access Token. Enter the
    introspection endpoint (i.e,
    <https://localhost:9443/oauth2/introspect> ) and click **Get
    TokenInfo** to get the token information.  
    ![]( ../../assets/img/103329939/103329940.png){height="250"}

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on OAuth 2.0 Token Introspection

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
    ![]( ../../assets/img/103329939/103329943.png) 

**Related Topics**

-   See [Invoke the OAuth Introspection
    Endpoint](https://docs.wso2.com/display/IS530/Invoke+the+OAuth+Introspection+Endpoint)
    to invoke the OAuth introspection endpoint using cURL commands.
