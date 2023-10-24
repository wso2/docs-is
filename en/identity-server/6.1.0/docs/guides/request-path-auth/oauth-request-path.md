# Authenticate with OAuth Request Path Authenticator

This page guides you through using the request path authenticator for token-based authentication. 
The OAuth Request Path Authenticator is engaged when an access token is sent along with a request for authentication.

## Register a service provider

{!./includes/register-a-service-provider.md!}

----

## Configure the service provider

Now, let's configure the service provider you registered.

### Basic OAuth/OIDC

{!./includes/oauth-app-config-basic.md!}

<!--{!./includes/oauth-app-config-advanced-tip.md!}-->

### Local & Outbound

{!./includes/local-outbound-for-request-path-oauth.md!}

----

## Configure the client application

Send the following requests via your application to connect your application to WSO2 IS.

1. Use the following cURL command to get a valid token using password grant type. Replace the `<CLIENT_ID>`, `<CLIENT_SECRET>`, `<USERNAME>`, `<PASSWORD>`, `<IS_HOST>`, and `<IS_PORT>` tags with the relevant values.

    !!! abstract ""
        **Request Format**    
        ```
        curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" https://<IS_HOST>:<IS_PORT>/oauth2/token
        ```
        ---
        **Response Format**
        ```
        {
            "token_type":"Bearer","expires_in":2655,
            "refresh_token":"2f03de95b8e196f78c94d07c23c9ef0a",
            "access_token":"7ee57bc28a3336ccb7818b499941e4e4"
        }
        ```

2. Send a cURL request using the access token you received as a response for step 1 in the authorization header, to the token endpoint. Replace the `<CLIENT_ID>`, `<REDIRECT_URI>`, `<IS_HOST>` and `<IS_PORT>` tags with the relevant values.

    !!! abstract ""
        **Request Format**    
        ```
        curl -v -X POST -H "Authorization: Bearer 7ee57bc28a3336ccb7818b499941e4e4" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid"  https://<IS_HOST>:<IS_PORT>/oauth2/authorize
        ```
        ---
        **Response Format**
        ```
        Location: <REDIRECT_URI>?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
        ```
    
3. Use the following cURL command to get an access token using the authorization code received in step2. Replace the `<CLIENT_ID>`, `<CLIENT_SECRET>`, `<REDIRECT_URI>`, `<IS_HOST>` and `<IS_PORT>` tags with the relevant values.

    !!! abstract ""
        **Request Format**    
        ```
        curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET>  -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&code=37c79c505960e90d5b25f62ce760c98c&scope=openid" https://<IS_HOST>:<IS_PORT>/oauth2/token
        ```
         ---
        **Response Format**
        ```
        { 
            "scope":"openid",
            "token_type":"Bearer",
            "expires_in":3600,
            "refresh_token":"70f202ca2e4ecf571d0b6d2e49af8f3a",
            "id_token":"eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0NjA0NTkzMTYsImV4cCI6MTQ2MDQ2MjkxNiwic3ViIjoiYWRtaW4iLCJhenAiOiJlN2VrQldVTVBITnFTNU5WQmhxNGhmNWZqMkVhIiwiYXRfaGFzaCI6IkhCWFVKQW50LWFMV3JxQlZJcTFoV2ciLCJhdWQiOlsiZTdla0JXVU1QSE5xUzVOVkJocTRoZjVmajJFYSJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJpYXQiOjE0NjA0NTkzMTZ9.PiqVn7B2vuICHmodnn9udjQrvGqRR-PZr-M8x8Xijg0bnAvzXY4hxqZ5luaLitBH2IgQ5p0Rh_gjPI7TWcQA7AK3iBCp7c29QY78hSSqt38_iG5bC0MYWoluH-jg5f3iyJ3aQ-DPAZexCXxEv65RPF5EDNfhA0fUFcsu79cb89k",
            "access_token":"7d6c01fb6bfaca22f01d9a24219cce45"
        }
        ```
 
    !!! Troubleshooting Tip 
            If you have not disabled consent, the response will be as follows.
        
            ``` 
            Location: https://localhost:9443/authenticationendpoint/oauth2_consent.do?loggedInUser=admin&application=plagroundapp&scope=openid&sessionDataKeyConsent=a14f4a5d-16bb-4e47-9c53-5eacee9828f2&spQueryParams=
            ```
        
            The consent page URL given in the response is the consent page that requires user interaction to either approve
            or deny the authorization request. You can access the consent page URL via a web browser and either approve or
            deny consent. The URL will then be redirected to the following page.
            
            ```
            <REDIRECT_URI>?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
            ```
------

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

-   [Download](https://github.com/wso2/samples-is/releases/download/v4.5.2/playground2.war)
   the `playground2.war` file from the latest release assets.

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

5.	Restart Apache Tomcat. 

### Log in

Now, let's log in to the application.

1. Access `http://wso2is.local:8080/playground2/` to open the application.

    !!! Note
        By default Tomcat runs on port 8080. If you have configured it to run on a different port make sure to update the URL and then access the playground application.  

2.   Fill in the details on the screen that appears according to the local authenticator you selected for request path authentication. Identity Server will not prompt the login page since it can authenticate the user from the information available in the request.

    **OAuth authenticator**

    -   **Authorization Grant Type:** Resource Owner (password grant)
    -   **Client ID:** The client id received at the application registration  
    -   **Client Secret:** The client secret received at the application registration 
    -   **Resource Owner User Name:** User Name
    -   **Resource Owner Password:** Password of the user
    -   **Scope**: `openid`
    -   **Access Token Endpoint:** `https://localhost:9443/oauth2/token`
 
!!! info

    Once you receive the access token, you can use the following for authorizing.
    ```https://localhost:9443/oauth2/authorize?access_token=<access_token>```
         
    Following is a sample cURL command you can use.
    ```
    curl --location --request POST 'https://localhost:9443/oauth2/authorize?access_token=<access_token>' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'client_id=<CLIENT_ID>' \
    --data-urlencode 'redirect_uri=<REDIRECT_URI>'\
    --data-urlencode 'scope=openid'
    ```

!!! tip "Troubleshooting tip"

	If you are getting the following error, the sample applications do not have a keystore in them.
	Therefore, you may get this error after changing the tomcat hostname because the public key of the WSO2 Identity Server does
	not exist in the Java certificate store.

	``` java
	javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: 			sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	```

------

!!! info "Related topics"
     -   [Guide: Authenticate with Basic Auth Request Path Authenticator](basic-auth-request-path.md)

           