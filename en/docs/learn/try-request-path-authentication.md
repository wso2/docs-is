# Try Request Path Authentication

This section demonstrates the use of the basic auth request path
authenticator and the OAuth request path authenticator with the WSO2
playground sample. Follow the instructions below to try out this
scenario (Steps 1-6 are common for both authenticators).  See [Request
Path Authentication](../../learn/request-path-authentication) for more
information.

1.  Start the WSO2 Identity Server and log in to the management console.
2.  Navigate to **Service Providers\>Add**, enter a name for the new
    service provider and click **Register.**
3.  Expand the **Inbound Authentication Configuration** section, then
    the **OAuth2/OpenID Connect Configuration** and click **Configure.**
    For more information, see [Configuring OAuth/OpenID
    Connect](../../learn/configuring-oauth2-openid-connect-single-sign-on).
    
    !!! info 
        Use the following **Callback URL** when configuring OAuth for WSO2
        playground: http://wso2is.local:8080/playground2/oauth2client

    ![request-path-callback-url](../assets/img/using-wso2-identity-server/request-path-callback-url.png) 

4.  Click **Add** and take note of the **Client Key** that is generated
    as you will need this later on.  
    ![note-client-key](../assets/img/using-wso2-identity-server/note-client-key.png) 
5.  Expand the **Local & Outbound Authentication Configuration** section
    and then the **Request Path Authentication Configuration** section.
6.  Select the relevant authenticator for request path authentication
    from the drop-down and click **Add.**
    -   Select **basic-auth** for the basic auth request path
        authenticator.
    -   Select **oauth-bearer** from the drop-down for the OAuth request
        path authenticator.  
        ![select-oauth-bearer](../assets/img/using-wso2-identity-server/select-oauth-bearer.png) 
7.  Click **Update** to save changes to the service provider.
8.  Now you can use [Playground
    sample](../../learn/setting-up-the-sample-webapp)
    application to test the configured request path authenticator. Start
    the tomcat server and visit the URL
    http://wso2is.local:8080/playground2/oauth2.jsp.
9.  Fill in the details on the screen that appears according to the
    local authenticator you selected for request path authentication.
    Identity Server will not prompt the login page since it can
    authenticate the user from the information available in the request.

**Basic-auth authenticator**

-   **Authorization Grant Type:** Authorization Code or Implicit
-   **Client ID:** (the client id received at the application
    registration)
-   **Callback URL:**
    `                               http://wso2is.local:8080/playground2/oauth2client                             `

-   **Access Token Endpoint** :
    `               https://localhost:9443/oauth2/token              `

-   **Authorize Endpoint:**
    `                               https://localhost:9443/oauth2/authorize?sectoken=                              <sec_token>              `

    !!! info 
        The sectoken in the Authorize Endpoint will be the
        `                username:password               ` in Base64
        encoded format. You can use a [Base64
        encoder](https://www.base64encode.org/) to encode this. For
        instance, the username and password admin:admin, is "
        `                sectoken=YWRtaW46YWRtaW4=".               `

**OAuth authenticator**

-   **Authorization Grant Type:** Resource Owner (password grant)
-   **Client ID:** (the client id received at the application
    registration)
-   **Client Secret:** (client secret received at the application
    registration)
-   **Resource Owner User Name:** (username)
-   **Resource Owner Password:** (password of the user)
-   **Callback URL:**
    `                               http://wso2is.local:8080/playground2/oauth2client                             `

-   **Access Token Endpoint:**
    `                               https://localhost:9443/oauth2/token                             `

    !!! info
        Once you receive the access token, you can use the following
        **Access Token Endpoint** :
        `                                 https://localhost:9443/oauth2/authorize?access_token=                                <access_token>               `
