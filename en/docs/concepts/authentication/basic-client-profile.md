# Basic Client Profile

The OpenID Connect basic client profile is based on the authorization code flow. This flow consists of two round trips. 

These calls are to:

1. Obtain the one-time password by calling the authorization endpoint and sharing the user credentials. This flow uses the [front channel](insertlink). 

2. Exchange the one-time password with an [access token](insertlink) by calling the token endpoint. This flow requires (back channel)
client authentication using ‘client id’ and ‘client secret’. 

This approach is recommended for [confidential clients](insertlink) 
who can maintain the confidentiality of their credentials (e.g., web apps). As the tokens are not visible via the user 
agents, this flow is more secure and allows for [refresh tokens](insertlink), which guarantees long-lived access.

The following diagram shows how authentication happens using this client profile.

![basic-client-profile](../../assets/img/concepts/basic-oidc-profile.png)


1. The client prepares an authentication request containing the desired request parameters and the client sends the 
request to the authorization server.
2. The authorization server authenticates the end-user and obtains end-user consent/authorization.
3. The authorization server sends back an authorization code to the client.
4. The client requests a response using the authorization code at the token endpoint. It passes the 'client id' and 
'client secret' along with the request.
5. The authorization server sends back the access token and the ID token with the response.
6. The client passes the access token to the resource server.
7. The resource server serves the client with the requested information based on the access token validity. 

