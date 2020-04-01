# Implicit Grant with OAuth 2.0 Playground

This page guides you through using a **sample Playground application** to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Implicit](insertlink) grant type.

----

{! fragments/oauth-playground.md !}

----

## Try Implicit grant 

1.  Enter the following details.

    - **Authorization Grant Type:** Implicit
    
    - **Client ID:** The OAuth Client Key recieved when registering the service provider.
    
    - **Callback URL:** http://wso2is.local:8080/playground2/oauth2client

	- **Authorize Endpoint:** https://localhost:9443/oauth2/authorize
    
    <img name='implicit-with-playground' src='../../assets/img/samples/implicit-with-playground.png' class='img-zoomable'/>
	
2. Click **Authorize**. 

	The playground application will send an
	[authorization request](https://tools.ietf.org/html/rfc6749#section-4.1.1)
	to the **authorize** endpoint of the WSO2 Identity Server using the
	following format.
	
	```java tab="Request Format"
	https://<host>:<port>/oauth2/authorize?response_type=token
	&client_id=<client-ID>
	&redirect_uri=<callback-url>
	&scope=<scope>
	```
	
	```java tab="Sample Request"
	https://localhost:9443/oauth2/authorize?response_type=id_token+token
	&client_id=Cx4LKFNObeuXocx7xgOpz5vfzFoa
	&redirect_uri=http://wso2is.local:8080/playground2/oauth2client
	&scope=openid
	``` 

3. Log in with user credentials (e.g., admin/admin). At this point, the application receives the ID token. 

	<img name='implicit-id-token' src='../../assets/img/samples/implicit-id-token.png' class='img-zoomable'/>
	


