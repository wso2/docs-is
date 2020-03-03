# Try Request Path Authentication

This section demonstrates the use of the basic auth request path
authenticator and the OAuth request path authenticator with the WSO2
playground sample. Follow the instructions below to try out this
scenario (Steps 1-6 are common for both authenticators).  See [Request
Path Authentication](../../learn/request-path-authentication) for more
information.

!!! note "Before you begin" 
    You must first
    [set up the `playground` sample webapp.](../../learn/deploying-the-sample-app/#deploying-the-playground2-webapp)
    in order to try the following scenario.

1.  Now you have deployed and
    [registered the `travelocity.com` webapp](learn/deploying-the-sample-app/#configuring-the-service-provider).
    Let's edit the same service provider to configure **request path
    authentication**.
     
2.  Expand the **Local & Outbound Authentication Configuration** section
    and then the **Request Path Authentication Configuration** section.
3.  Select the relevant authenticator for request path authentication
    from the drop-down and click **Add.**
    -   Select **basic-auth** for the basic auth request path
        authenticator.
    -   Select **oauth-bearer** from the drop-down for the OAuth request
        path authenticator.  
        ![select-oauth-bearer](../assets/img/using-wso2-identity-server/select-oauth-bearer.png) 
4.  Click **Update** to save changes to the service provider.
5.  Now you can use **Playground** application to test the configured
    request path authenticator. Visit the URL
    http://wso2is.local:8080/playground2/oauth2.jsp.
    
6.  Fill in the details on the screen that appears according to the
    local authenticator you selected for request path authentication.
    Identity Server will not prompt the login page since it can
    authenticate the user from the information available in the request.

**Basic-auth authenticator**

-   **Authorization Grant Type:** Authorization Code or Implicit
-   **Client ID:** (the client id received at the [application
                                    registration](../../learn/deploying-the-sample-app/#configuring-the-service-provider_1))  
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
-   **Client ID:** (the client id received at the the [application
                                    registration](../../learn/deploying-the-sample-app/#configuring-the-service-provider_1))  
-   **Client Secret:** (client secret received at the [application
                                    registration](../../learn/deploying-the-sample-app/#configuring-the-service-provider_1))  
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
