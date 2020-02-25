# Password Grant with OAuth 2.0 Playground

This page guides you through using a **sample Playground application** to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Password](insertlink) grant type.

----

{! fragments/oauth-playground.md !}

----

## Try Password grant 

1.  Enter the following details.

    - **Authorization Grant Type:** Resource Owner
    
    - **Client ID:** The OAuth Client Key recieved when registering the service provider.

	- **Client Secret:** The Client Secret recieved when registering the service provider.
    
    - **Resource Owner User Name:** Username (e.g., `admin`)

	- **Resource Owner Password:** Password (e.g., `admin`)

	- **Authorize Endpoint:** https://localhost:9443/oauth2/authorize

	- **Token Endpoint:** https://localhost:9443/oauth2/token

	<img name='password-with-playground' src='../../assets/img/samples/password-with-playground.png' class='img-zoomable'/>
    
2. Click **Authorize**. 

	The playground application will send an
	[authorization request](https://tools.ietf.org/html/rfc6749#section-4.1.1)
	to the **authorize** endpoint of the WSO2 Identity Server using the
	following format.
	
	```java tab="Request Format"
	POST
	https://<host>:<port>/oauth2/token
	Authorization: Basic [Base64encode(Client-ID>:<ClientSecret>)]
	Content-Type: application/x-www-form-urlencoded

	grant_type=password&username=<Resource Owner User Name>&password=<Resource Owner Password>
	```
	
	```java tab="Sample Request"
	POST
	https://localhost:9443/oauth2/token
	Authorization: Basic Q3g0TEtGTk9iZXVYb2N4N3hnT3B6NXZmekZvYTogVWRUNm5XbnFXWkdnNDFHWnI5TXBTWGs5eU04YQ==
	Content-Type: application/x-www-form-urlencoded

	grant_type=password&username=admin&password=admin
	``` 

3. Log in with user credentials (e.g., admin/admin). At this point, the application receives the access token. 

4. Enter the **Introspection Endpoint** (i.e, https://localhost:9443/oauth2/introspect) and click **Get TokenInfo** to get the token   information. 

	For more information, see [OAuth Token Introspection](insertlink).

5.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  

	<img name='access-token-info' src='../../assets/img/samples/access-token-info.png' class='img-zoomable'/>

