# Enable Authentication with OAuth Request Path Authenticator

This page guides you through enabling request path authentication using a bearer token
for an OpenID Connect web application using a **sample application** called Playground2. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/basic-auth-request-path" rel="nofollow noopener">I have my own application</a>

----

{!fragments/deploying-sample-apps.md!}

----

{!fragments/register-an-application-oauth-request-path.md!}

----

{!fragments/deploy-playground.md!}


{!fragments/deploy-playground-with-sec-token.md!}


 **OAuth authenticator**
 
 -   **Authorization Grant Type:** Resource Owner (password grant)
 -   **Client ID:** The client id received at the application registration  
 -   **Client Secret:** The client secret received at the application registration 
 -   **Resource Owner User Name:** User Name
 -   **Resource Owner Password:** Password of the user
 -   **Callback URL:**
     `                               http://wso2is.local:8080/playground2/oauth2client                             `
 
 -   **Access Token Endpoint:**
     `                               https://localhost:9443/oauth2/token                             `
 
!!! info
    Once you receive the access token, you can use the following for authorizing.
    ```https://localhost:9443/oauth2/authorize?access_token=<access_token>```
         

!!! tip "Troubleshooting tip"

	If you are getting the following error, the sample applications do not have a keystore in them.
	Therefore, you may get this error after changing the tomcat hostname because the public key of the WSO2 Identity Server does
	not exist in the Java certificate store.

	``` java
	javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: 			sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	```

!!! info "Related Links"
     -   [Authenticate with Basic Auth Request Path Authenticator](../../guides/basic-auth-request-path)
     -   [Enable Authentication with Basic Auth Request Path Authenticator](../../quick-starts/basic-auth-request-path-sample)
     -   [Authenticate with OAuth Request Path Authenticator](../../guides/oauth-request-path)
     
           
