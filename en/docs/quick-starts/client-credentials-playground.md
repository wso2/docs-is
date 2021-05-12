# Client Credentials Grant with OAuth 2.0 Playground

This page guides you through using a **sample Playground application** to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Client Credentials](../../../references/concepts/authorization/client-credential-grant/) grant type.

----

{! fragments/oauth-playground.md !}

----

## Try Client Credentials grant 

1.  Enter the following details.

    - **Authorization Grant Type:** Client Credentials
    
    - **Client ID:** The OAuth Client Key recieved when registering the service provider.

	- **Client Secret:** The Client Secret recieved when registering the service provider.

	- **Access Token Endpoint:** `https://<IS_HOST>:<IS_PORT>/oauth2/token`

		![client-credential](/assets/img/samples/client-credentials-with-playground.png)
    
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

	grant_type=client_credentials
	```
	
	```java tab="Sample Request"
	POST
	https://localhost:9443/oauth2/token
	Authorization: Basic Q3g0TEtGTk9iZXVYb2N4N3hnT3B6NXZmekZvYTogVWRUNm5XbnFXWkdnNDFHWnI5TXBTWGs5eU04YQ==
	Content-Type: application/x-www-form-urlencoded

	grant_type=client_credentials
	``` 

3. Log in with user credentials (e.g., `admin`/`admin`). At this point, the application receives the access token. 

4. Enter the **Introspection Endpoint** (i.e, `https://<IS_HOST>:<IS_PORT>/oauth2/introspect`) and click **Get TokenInfo** to get the token   information. 

5.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  

	![access token](/assets/img/samples/access-token-info.png)



