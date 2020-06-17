# Manage User Sessions and Logout

This page guides you through [managing user sessions and logout](../../../concepts/authentication/session-management) of a web application using a **sample application** called Playground.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/session-management-logout"   rel="nofollow noopener">I have my own application</a>

----

(TODO: dev-portal-fragment)
{!fragments/register-a-service-provider.md!}
{!fragments/oauth-app-config-basic.md!}
{!fragments/local-outbound.md!}

---

(TODO: dev-portal-fragment)
{!fragments/deploying-sample-apps.md!}
{!fragments/deploy-playground.md!}

---
    
## Configure the playground application

1.  Enter the following values and click **Authorize**.  
    -   **Authorization Grant Type:** Authorization Code (with this
        sample you can only test OIDC for the Authorization Code flow)
    -   **Client Id:** Enter the client ID (OAuth Client Key under
        Registering the relying Application, step 4) of the registered
        playground2 application
    -   **Scope:** `            openid           `
    -   **Callback URL:**
        `            http://wso2is.local:8080/playground2/oauth2client           `
    -   **Authorize Endpoint:**
        `            https://localhost:9443/oauth2/authorize           `
    -   **Logout Endpoint:**
        `            https://localhost:9443/oidc/logout           `
    -   **Session Iframe Endpoint:**
        `            https://localhost:9443/oidc/checksession?client_id=<clientID of playground2 application>           `


2.  Log in with the user credentials and click **Approve Always** at the
    consent page.

    In order to enable single logout (SLO) you must use the **Approve
    Always** option. If this is not done, the passive request will not
    work, and without passive requests, the SLO protocol will not work. 
    Do this to avoid errors during execution.

    <img name='playground-login' src='../../assets/img/samples/playground-login.png' class='img-zoomable'/>

3.  Once it is successfully authenticated, the OpenIDConnect
    Provider(OP) will redirect back to the client application with the
    authorization code and the session state. You can see this in the
    logs of the console, as seen below.
    
4.  Enter the following values and click **Get Access Token** to receive
    the ID token and access token.  
    -   **Callback URL:**
        `                         http://wso2is.local:8080/playground2/oauth2client                       `
    -   **Access Token Endpoint:**
        `                         https://localhost:9443/oauth2/token                       `
    -   **Client Secret:** Enter the client secret of playground2
        application
        
    <img name='authorization-code' src='../../assets/img/samples/authorization-code.png' class='img-zoomable'/>
    
5.  You will receive the access token. You can also enter the **UserInfo
    Endpoint** as
    `                     https://localhost:9443/oauth2/userinfo                  `
    to use the received access token to obtain user claims if needed.  
    <img name='access-token' src='../../assets/img/samples/access-token.png' class='img-zoomable'/> 
    
6.  Access the following URL on a separate window of the browser, and
    click on **Import Photos:**
    `          http://wso2is.local:8080/playground2/         `
    
    !!! note 
        For this scenario we need two relying party applications.
        To do this, make a copy of the playground2.war file that
        was generated when you set up the sample webapp, 
        and rename it as playground3.war in the same location. 
        Repeat the above steps for the playground3 application.
        
7.  Repeat steps 2-6 to invoke the **playground3** application. Make
    sure to change the **Callback URL**, **Client Id** and **Client
    secret** corresponding to **playground3** application when you
    follow the steps.
    
    !!! Tip 
        Step 3 will not be prompted to you as there is already a
        valid session and WSO2 Identity Server will apply SSO for the second
        application.

8.  Once you receive the authorization code for the playground3 app,
    open the browser console of the playground2 app. You will see that
    the RP iframe of playground2 has initiated a passive authentication
    request as the session state changed. Since the response has been
    received, the app will update it’s session state value and keep
    polling the OP iframe again.

    <img name='sesion-state' src='../../assets/img/samples/session-state.png' class='img-zoomable'/> 

9. Go back to the browser window of the playground3 app, and click
    **Logout**. Click **Approve** when prompted for consent.
10. Go back to the browser window of the playground2 app. You will see
    that the home page has loaded. If you check the console logs, you
    will note that the the playground2 app’s RP iframe has initiated a
    passive authentication request and has received an error since the
    end user session has ended. This means the app has successfully
    handled this as a single logout scenario.  
   <img name='import-photos' src='../../assets/img/samples/import-photos.png' class='img-zoomable'/> 


!!! tip
    
    Redirect to a logout URL after RP-initiated logout
    
    You can specify a logout URL so that the application redirects to a
    particular page after the RP sends the OpenID Connect logout request.
    For more information on how to configure the redirect logout, see
    [OpenID Connect Logout URL
    Redirection](../../learn/openid-connect-logout-url-redirection/).

-----

!!! info "Related Topics"
    - [Concept: Manage User Sessions and Logout](../../../concepts/authentication/session-management)
    - [Guide: Manage User Sessions and Logout](../../../guides/login/session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../../../guides/login/oidc-backchannel-logout)
