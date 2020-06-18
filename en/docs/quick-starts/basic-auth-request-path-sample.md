# Enable Authentication with Basic Auth Request Path Authenticator

This page guides you through enabling basic authentication using a request path authenticator for an OpenID Connect
web application using a **sample application** called Playground2. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/basic-auth-request-path" rel="nofollow noopener">I have my own application</a>

----

{!fragments/deploying-sample-apps.md!}

----

{!fragments/register-an-application-request-path.md!}

----

{!fragments/deploy-playground.md!}


{!fragments/deploy-playground-with-sec-token.md!}

   
   **Basic-auth authenticator**
           
   -   **Authorization Grant Type:** Authorization Code or Implicit
   -   **Client ID:** The client id received at the application registration 
   -   **Callback URL:**
               `                               http://wso2is.local:8080/playground2/oauth2client                             `
           
   -   **Access Token Endpoint** :
               `               https://localhost:9443/oauth2/token              `
           
   -   **Authorize Endpoint:**
               `                               https://localhost:9443/oauth2/authorize?sectoken=                              <sec_token>              `

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

!!! info "Related Links"
     -   [Enable Authentication with Basic Auth Request Path Authenticator](../../guides/basic-auth-request-path)
     -   [Authenticate with OAuth Request Path Authenticator](../../guides/oauth-request-path)
     -   [Enable Authentication with OAuth Request Path Authenticator](../../quick-starts/oauth-request-path-sample)
           
