# Manage User Sessions and Logout

This page guides you through [managing user sessions and logout]({{base_path}}/references/concepts/authentication/session-management) for OpenID Connect applications with WSO2 Identity Server.

## Register a service provider

{!./includes/register-a-service-provider.md!}

{!./includes/oauth-app-config-basic.md!}

## Configure to sign the ID token with the user's tenant domain

1. Expand the **Local & Outbound Authentication Configuration** section and select **Use tenant domain in local subject identifier** to sign the ID token with the user's tenant domain.
    
    ![use-tenant-domain-in-subject.png]({{base_path}}/assets/img/guides/use-tenant-domain-in-subject.png)
    
2. Click **Update** to save the changes.

!!! note
        **Alternatively,** to sign the ID token with the service provider's
        tenant domain, open the `deployment.toml` file
        found in the `<IS_HOME>/repository/conf` folder and
        set the following property to true.
    
        ```toml
        [oauth.oidc.id_token]
        sign_with_sp_key=true
        ```

----

## Keep the user session live

In WSO2 Identity Server, you can use an authorization endpoint to increase the session idle time.

To do this, add an iframe to the service provider application which sends a `prompt=none` call to the OAuth2 authorization endpoint after each iteration of n minutes and refreshes the user session at the server-end. A sample iframe is shown below.

``` xml
<iframe id="refresh_iframe" src="#" style="width:0;height:0;border:0; border:none;"></iframe><script>setInterval(function(){document.getElementById('refresh_iframe').src
="https://localhost:9443/oauth2/authorize prompt=none&scope=openid&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fplayground2%2Fprompt-none callback.jsp&client_id=7x72byIYC40dlCuu6bovOTdK2MMa";},300000);</script>
```

----

## Try it

### Set up the sample

-       Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.       

-       It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

- Download the sample from GitHub.

    1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

    2. [Download](https://github.com/wso2/samples-is/releases/download/v4.5.2/playground2.war) the `playground2.war` file from the latest release assets.     
    
### Deploy the sample

Deploy this sample web app on a web container.

1.  Copy the `playground2.war` file from the latest release assets
    folder into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder.

2.  Start the Tomcat server.

	!!! note 
		To check the sample application, navigate to
		`http://<TOMCAT_HOST>:<TOMCAT_PORT>/playground2/oauth2.jsp`
		on your browser.

		For example,
		`http://wso2is.local:8080/playground2/oauth2.jsp`

3.	Update the `                    param-value                   `
	parameter in the
	`                    WEB-INF/web.xml                   `
	file with the server URL of WSO2 Identity Server if
	required.  

	Make sure to enter the port the application is running on,
	in the URL. If you have started the Identity Server with a
	port offset, then the respective port needs to be
	configured here.

	``` java
	<init-param>
		<description>serverUrl</description>
		<param-name>serverUrl</param-name>
		<param-value>https://localhost:9443/services/</param-value>
	</init-param>
	```
	
	!!! Note 
		Note that `localhost` is the server that hosts WSO2 Identity
		Server and `9443` is the default SSL port of it. Since playground application is accessing the admin
		service `OAuth2TokenValidationService`, you should have the
		correct serverUrl, username, and password.
		
4.	Update
	**`                     param-value                    `**
	parameter with credentials of an admin user if required.

	``` java
	<init-param>
		<description>userName</description>
		<param-name>userName</param-name>
		<param-value>admin</param-value>
	</init-param>
	<init-param>
		<description>password</description>
		<param-name>password</param-name>
		<param-value>admin</param-value>
	</init-param>
	```

5.	Restart Apache Tomcat and access
	`                    http://wso2is.local:8080/playground2/                   ` .

	By default Tomcat runs on port 8080. If you have configured
	it to run on a different port make sure to update the URL
	and then access the playground application.

### Log out

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
        
    <img name='authorization-code' src='{{base_path}}/assets/img/samples/authorization-code.png' class='img-zoomable' alt='Authorization code'/>
    
5.  You will receive the access token. You can also enter the **UserInfo
    Endpoint** as
    `                     https://localhost:9443/oauth2/userinfo                  `
    to use the received access token to obtain user claims if needed.  
    <img name='access-token' src='{{base_path}}/assets/img/samples/access-token.png' class='img-zoomable' alt='Access token'/> 
    
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

    <img name='sesion-state' src='{{base_path}}/assets/img/samples/session-state.png' class='img-zoomable' alt='Browser console'/> 

9. Go back to the browser window of the playground3 app, and click
    **Logout**. Click **Approve** when prompted for consent.
    
10. Go back to the browser window of the playground2 app. You will see
    that the home page has loaded. If you check the console logs, you
    will note that the the playground2 app’s RP iframe has initiated a
    passive authentication request and has received an error since the
    end user session has ended. This means the app has successfully
    handled this as a single logout scenario.  
   <img name='import-photos' src='{{base_path}}/assets/img/samples/import-photos.png' class='img-zoomable' alt='Import photos'/> 


!!! tip "Redirect to a logout URL after RP-initiated logout"
    
    You can specify a logout URL so that the application redirects to a
    particular page after the RP sends the OpenID Connect logout request.
    For more information on how to configure the redirect logout, see
    [OpenID Connect Logout URL
    Redirection]({{base_path}}/guides/login/oidc-logout-url-redirection/).

        
!!! info "Related topics"
    - [Concept: Manage User Sessions and Logout]({{base_path}}/references/concepts/authentication/session-management)
    - [Guide: Manage User Sessions and Logout]({{base_path}}/guides/login/session-management-logout)

