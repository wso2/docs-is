# Configure OpenID Connect Back-Channel Logout

This page guides you through configuring [OpenID Connect back-channel logout]({{base_path}}/references/concepts/authentication/back-channel-logout) between OpenID Connect Relying Parties (RP) or client applications.

!!! Note
    When a session is terminated via the [Session Management REST API]({{base_path}}/apis/session-mgt-rest-api), 
    WSO2 Identity Server will send a back-channel logout notification.

## Register a service provider

1. Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2. Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3. Enter `playground2` in the **Service Provider Name** text box, and click **Register**.

    ![Add new service provider]({{base_path}}/assets/img/fragments/register-sp-playground.png)

4. Expand the **Inbound Authentication Configuration** section and then the **OAuth/OpenID Connect Configuration** and click **Configure**.
    
5. Fill in the form that appears. For the **Allowed Grant Types**, you can disable the ones you do not require or block.

    !!! note
        The **custom** grant type will only appear on the UI if you have configured the JWT grant
        type. The value specified as the `name`
        of the `oauth.custom_grant_type` in the `deployment.toml` file when
        creating the custom grant type is the value that will appear on the
        UI. For more information on writing a custom grant type, see
        [Write a Custom OAuth 2.0 Grant Type]({{base_path}}/references/extend/oauth2/write-a-custom-oauth-2.0-grant-type).
        
6. Fill the **Callback Url** field. 

    Example : `http://wso2is.local:8080/playground2/oauth2client`
    
    ![Configure OAuth OIDC]({{base_path}}/assets/img/fragments/configure-oauth-oidc.png)

    !!! tip
        For more information on other advanced configurations
        refer, [Advanced OpenID Connect]({{base_path}}/guides/login/oidc-parameters-in-auth-request/).

7. Click **Add**. Note that `client key` and `client secret` get generated.
  
    ![Generated OAuth client key and secret]({{base_path}}/assets/img/fragments/generated-key-secret.png) 

## Discover the logout endpoint

To enable OIDC back-channel logout, the relying party/client application needs to obtain the OpenID Provider's logout endpoint URL.

- If you are using WSO2 Identity Server as the identity provider, do the following to view the logout endpoint URL. 

    1. Click **Identity Providers > Resident**. 

    2. Expand **Inbound Authentication Configuration** and then expand **OAuth2/OpenID Connect Configuration**. 

        Note the listed identity provider's **Logout Endpoint URL**. 
        
        ![oidc-logout-url]({{base_path}}/assets/img/guides/oidc-logout-url.png)

- If you are using a different identity provider, use the [OpenID Connect discovery]({{base_path}}/guides/login/oidc-discovery) endpoint to obtain the OpenID Provider's logout endpoint URL. The logout endpoint URL can be discovered using the `end_session_endpoint` parameter in the OIDC Discovery response.

## Configure back-channel single logout

{!./includes/edit-oauth-oidc-configs.md!}

5. Select **Enable OIDC Backchannel Logout** and enter the Logout URL as `http://localhost:8080/playground2/bclogout`.

    !!! info
        The **Logout URL** is the service provider's back-channel logout endpoint URL to which the logout token is sent to.

6. Click **Update** to save the changes.

----

Next, repeat the instructions in the above three sections to deploy another instance of the Playground sample application by downloading another copy of the `playground2.war` file, renaming it to `playground3.war`, and creating a new service provider called "playground3". 

Ensure to replace all values that refer to "playground2" with "playground3" including the callback and logout URLs. 

----

## Try it out

Follow the steps given below to set up the Playground application.

### Set up the sample

-   Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.

-   It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

-   Download the sample from GitHub.

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

You are directed to the landing page of the sample application. Click on **Import Photos** and the following
page appears.  

<img name='playground-app' src='{{base_path}}/assets/img/samples/play-ground-with-check-session.png' class='img-zoomable'/>

!!! tip "Troubleshooting tip"

	If you are getting the following error, the sample applications do not have a keystore in them.
	Therefore, you may get this error after changing the tomcat hostname because the public key of the WSO2 Identity Server does
	not exist in the Java certificate store.

	``` java
	javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: 			sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	```

### Log out

1. Access the following URLs on a browser window: `http://wso2is.local:8080/playground2/`

2. Click **Import Photos** and enter the following details.

    - **Authorization Grant Type:** Implicit
    
    - **Client ID:** The OAuth Client Key received when registering the "playground2" service provider.
    
    - **Callback URL:** `http://wso2is.local:8080/playground2/oauth2client`

	- **Authorize Endpoint:** `https://localhost:9443/oauth2/authorize`
    
    <img name='implicit-with-playground' src='{{base_path}}/assets/img/samples/implicit-with-playground.png' class='img-zoomable' alt='Implicit flow with Playground'/>
	
3. Click **Authorize**. 

4. Log in with user credentials (e.g., admin/admin). At this point, the application receives the ID token. 

	<img name='implicit-id-token' src='{{base_path}}/assets/img/samples/implicit-id-token.png' class='img-zoomable' alt='ID token'/>

5. Now, access the following URL on a browser window to access "playground3": `http://wso2is.local:8080/playground3/`

6. Repeat steps 1-4 for the "playground3" application.

7. Click **Logout** on one of the applications. You will be prompted to consent to the logout. 

8. Provide consent. You will receive confirmation of sucessful logout. 

9. Now, go to the other application and reload the page. Note that you are redirected to the login page of the playground application and you will see that the **Logged in user** has changed to `null`. 

You have successfully configured and tried out OIDC back-channel logout. You can check out the Tomcat logs on the terminal window to see the back-channel logout flow. 

----

!!! info "Related topics"
    - [Concept: OpenID Connect Back-Channel Logout]({{base_path}}/references/concepts/authentication/back-channel-logout)
    <!-- - [Quick Start: OpenID Connect Back-Channel Logout]({{base_path}}/quick-starts/oidc-backchannel-logout-sample) -->

