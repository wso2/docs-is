# Authenticate with Basic Auth Request Path Authenticator

This page guides you through using the request path authenticator for basic authentication. 
The Basic Authentication Request Path Authenticator is engaged when user credentials (username and password) 
are sent along with a request for authentication. You can use this authentication mechanism if you wish to skip 
prompting the user with the login page during the authentication flow.

## Register a service provider

{!./includes/register-a-service-provider.md!}

----

## Configure the service provider

Now, let's configure the service provider you registered.

### Basic OAuth/OIDC

{!./includes/oauth-app-config-basic.md!}

<!--{!./includes/oauth-app-config-advanced-tip.md!}-->

### Local & Outbound

1. Expand the **Local & Outbound Authentication Configuration** section and then the **Request Path Authentication Configuration** section.

2. Select **Basic Auth** from the dropdown list and click **Add**.

    ![basic-auth-request-path-config]({{base_path}}/assets/img/fragments/basic-auth-request-path-config.png)

3. Click **Update** to save changes to the service provider.

## Configure the client application

Send the following requests via your application using the `<SEC_TOKEN>` in the authorization header, to the token endpoint. 

!!! tip
    The `<SEC_TOKEN>` in the authorization endpoint will be the `username:password` in Base64
    encoded format. You can use a [Base64 encoder](https://www.base64encode.org/) 
    to encode this. For instance, the username and password admin:admin, is "
    `YWRtaW46YWRtaW4=".
    
Replace the ` <SEC_TOKEN>`, `<CLIENT_ID>`, `<IS_HOST>`, `<IS_PORT>` and `<CALLBACK_URL>` tags with the relevant values.

!!! abstract ""
    **Request Format**   
    ```
    curl -v -X POST -H "Authorization: Basic <SEC_TOKEN>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "response_type=code&client_id=<CLIENT_ID>&redirect_uri=<CALLBACK_URL>&scope=openid&prompt=none"  http://<IS_HOST>:<IS_PORT>/oauth2/authorize
    ```
    ---
    **Response Format**
    ```
    Location: <callback_url>?code=<code>&session_state=<session_state>
    ```

!!! note
    RequestPath authentication will only skip prompting the login page and not the consent page.
    You can also skip prompting the user consent page using one of the following methods.
    
    * You can skip prompting consent for a particular request by sending the `prompt=none` attribute in the authorization request
    * You can skip prompting consent for an application by enabling the **Skip Login Consent** option on the management console.
    
	![skip consent]({{base_path}}/assets/img/guides/skip-consent.png)

    * You can skip re-prompting consent by selecting the **Approve always** option for an application and user before sending the request.
    * You can add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file to disable prompting
     consent for all applications in WSO2 Identity Server.
    
    ```xml
    [oauth]
    consent_prompt=false
    ```

!!! Troubleshooting Tip  
        If you have not disabled consent using the deployment.toml file as mentioned above, the response will be as follows.
    
        ```
        Location: https://localhost:9443/authenticationendpoint/oauth2_consent.do?loggedInUser=admin&application=plagroundapp&scope=openid&sessionDataKeyConsent=a14f4a5d-16bb-4e47-9c53-5eacee9828f2&spQueryParams=
        ```
    
        The consent page URL given in the response is the consent page that requires user interaction to either approve 
        or deny the authorization request. You can access the consent page URL via a web browser and either approve or 
        deny consent. The URL will then be redirected to the following page.
        
        ```
        <callback_url>?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
        ```

## Try it

Let's set up the sample app and log in.

### Set up the sample 

- Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.
        
- It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

-   [Download](https://github.com/wso2/samples-is/releases/download/v4.5.0/playground2.war)
   the `playground2.war` file from the latest release assets.

### Deploy the sample app

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

5.	Restart Apache Tomcat. 

### Log in

Now, let's log in to the application.

1. Access `http://wso2is.local:8080/playground2/` to open the application.

    !!! Note
        By default Tomcat runs on port 8080. If you have configured it to run on a different port make sure to update the URL and then access the playground application.  

2.   Fill in the details on the screen that appears according to the local authenticator you selected for request path authentication. Identity Server will not prompt the login page since it can authenticate the user from the information available in the request.

    **Basic Auth authenticator**
            
    -   **Authorization Grant Type:** Authorization Code or Implicit
    -   **Client ID:** The client id received at the application registration 
    -   **Callback URL:** ` http://wso2is.local:8080/playground2/oauth2client `                            `
    -   **Access Token Endpoint** : `https://localhost:9443/oauth2/token`
    -   **Authorize Endpoint:** `https://localhost:9443/oauth2/authorize?sectoken=                              <sec_token>`

!!! info 
    The sectoken in the authorization endpoint will be the `username:password` in Base64
    encoded format. You can use a [Base64
    encoder](https://www.base64encode.org/) to encode this. For
    instance, the username and password admin:admin, is "sectoken=YWRtaW46YWRtaW4=". 
           
!!! tip "Troubleshooting tip"

	If you are getting the following error, the sample applications do not have a keystore in them.
	Therefore, you may get this error after changing the tomcat hostname because the public key of the WSO2 Identity Server does
	not exist in the Java certificate store.

	``` java
	javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: 			sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	```

-----

!!! info "Related topics"
     -   [Guide: Authenticate with OAuth Request Path Authenticator](oauth-request-path.md)           
