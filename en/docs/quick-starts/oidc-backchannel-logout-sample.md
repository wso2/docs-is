# Configure OpenID Connect Back-Channel Logout 

This page guides you through configuring [OpenID Connect (OIDC) Back-Channel logout](../../../concepts/authentication/back-channel-logout) between two sample Playground applications. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/oidc-backchannel-logout"   rel="nofollow noopener">I have my own application</a>

----

{!fragments/oauth-playground.md!}

----

{!fragments/oidc-backchannel-logout.md!}

    Enter `http://localhost:8080/playground2/bclogout` as the **Logout URL**.

----

Next, repeat the instructions in the above three sections to deploy another instance of the Playground sample application by downloading another copy of the `playground2.war` file, renaming it to `playground3.war`, and creating a new service provider called "playground3". 

Ensure to replace all values that refer to "playground2" with "playground3" including the callback and logout URLs. 

----

## Try it out

1. Access the following URLs on a browser window: <http://wso2is.local:8080/playground2/>

2. Click **Import Photos** and enter the following details.

    - **Authorization Grant Type:** Implicit
    
    - **Client ID:** The OAuth Client Key recieved when registering the "playground2" service provider.
    
    - **Callback URL:** http://wso2is.local:8080/playground2/oauth2client

	- **Authorize Endpoint:** https://localhost:9443/oauth2/authorize
    
    <img name='implicit-with-playground' src='../../assets/img/samples/implicit-with-playground.png' class='img-zoomable'/>
	
3. Click **Authorize**. 

4. Log in with user credentials (e.g., admin/admin). At this point, the application receives the ID token. 

	<img name='implicit-id-token' src='../../assets/img/samples/implicit-id-token.png' class='img-zoomable'/>

5. Now, access the following URL on a browser window to access "playground3": <http://wso2is.local:8080/playground3/>

6. Repeat steps 1-4 for the "playground3" application.

7. Click **Logout** on one of the applications. You will be prompted to consent to the logout. 

8. Provide consent. You will receive confirmation of sucessful logout. 

9. Now, go to the other application and reload the page. Note that you are redirected to the login page of the playground application and you will see that the **Logged in user** has changed to `null`. 

You have successfully configured and tried out OIDC back-channel logout. You can check out the Tomcat logs on the terminal window to see the back-channel logout flow. 

----

!!! info "Related Topics"
    - [Concept: OpenID Connect Back-Channel Logout](../../../concepts/authentication/back-channel-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../../guides/login/oidc-backchannel-logout)
    - [Guide: OpenID Connect Session Management](../../guides/login/session-management-logout)