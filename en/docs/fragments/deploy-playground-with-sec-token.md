 
   6.   Fill in the details on the screen that appears according to the local authenticator you selected for request path 
        authentication. Identity Server will not prompt the login page since it can authenticate the user from the 
        information available in the request.
   
   **Basic-auth authenticator**
           
   -   **Authorization Grant Type:** Authorization Code or Implicit
   -   **Client ID:** (the client id received at the application registration 
   -   **Callback URL:**
               `                               http://wso2is.local:8080/playground2/oauth2client                             `
           
   -   **Access Token Endpoint** :
               `               https://localhost:9443/oauth2/token              `
           
   -   **Authorize Endpoint:**
               `                               https://localhost:9443/oauth2/authorize?sectoken=                              <sec_token>              `

!!! info 
    The sectoken in the Authorize Endpoint will be the `username:password` in Base64
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