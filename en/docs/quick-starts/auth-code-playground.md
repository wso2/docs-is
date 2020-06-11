# Authorization Code Grant with OAuth 2.0 Playground

This page guides you through using a **sample Playground application** to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Authorization Code](insertlink) grant type.

----

{! fragments/oauth-playground.md !}

----

{! fragments/authorization-grant.md !}

----

## Try Authorization Code grant 

1.  Enter the following details.

    - **Authorization Grant Type:** Authorization Code 

    - **Client ID:** The OAuth Client Key recieved when registering the service provider.

    - **Callback URL:** http://wso2is.local:8080/playground2/oauth2client

    - **Authorize Endpoint:** https://localhost:9443/oauth2/authorize

    - **Scope:** Any scope you wish to obtain the token for. To use the sample application with OpenID Connect, enter the value `openid` as the scope. This field is optional. 

	<img name='auth-code-without-pkce' src='../../assets/img/samples/auth-code-without-pkce.png' class='img-zoomable'/>

2. Fill the following two fields only if you wish to use [PKCE](insertlink). If you are not using PKCE, proceed to step 3.

	- **Use PKCE:** Select **Yes**. 

	- **PKCE Challenge Method:** Select the relevant method. For more information about the PKCE Challenge Methods, see [the specification](https://tools.ietf.org/html/rfc7636#section-4.2)

	<img name='auth-code-with-pkce' src='../../assets/img/samples/auth-code-with-pkce.png' class='img-zoomable'/>

3. Click **Authorize**. 

	The playground application will send an
	[authorization request](https://tools.ietf.org/html/rfc6749#section-4.1.1)
	to the **authorize** endpoint of the WSO2 Identity Server using the
	following format.

	```java tab="Request Format"
	https://<host>:<port>/oauth2/authorize?response_type=code
	&client_id=<client-ID>
	&redirect_uri=<callback-url>
	&scope=<scope>
	```

	```java tab="Sample Request"
	https://localhost:9443/oauth2/authorize?response_type=code
	&client_id=Cx4LKFNObeuXocx7xgOpz5vfzFoa
	&redirect_uri=http://wso2is.local:8080/playground2/oauth2client
	&scope=openid
	``` 

3. Log in with user credentials (e.g., admin/admin).  

4. Provide the requested consent and enter the following details on the screen that appears. 

    - **Callback URL:** http://wso2is.local:8080/playground2/oauth2client

    - **Access Token Endpoint:** https://localhost:9443/oauth2/token 

    - **Client Secret:** The client secret received when registering the service provider.

	- **PKCE Verifier:** This will be populated using the value generated in step 1 only if you are using PKCE. 

5. Click **Get Access Token**. At this point, the application receives the access token. 

6. Enter the **Introspection Endpoint** (i.e, https://localhost:9443/oauth2/introspect) and click **Get TokenInfo** to get the token information. 

	For more information, see [OAuth Token Introspection](insertlink).

7.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  

	<img name='access-token-info' src='../../assets/img/samples/access-token-info.png' class='img-zoomable'/>