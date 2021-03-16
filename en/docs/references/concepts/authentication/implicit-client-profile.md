# Implicit Client Profile

In this flow, the client does not make a request to the token endpoint but instead 
receives the access token directly from the authorization endpoint without explicit client authentication (front channel communication). The targeted 
clients for this profile should be user agent-based clients which are [public clients](insertlink) (e.g., single page applications)
that can not maintain the confidentiality of their clients. Comparatively, this flow is less secure, thus refresh 
tokens are not allowed and do not guarantee long-lived access tokens. 

The following diagram shows how authentication happens using this client profile.

![implicit-client-profile](../../assets/img/concepts/implicit-client-profile.png)


1. The client prepares an authentication request containing the desired request parameters and the client sends the 
request to the authorization server.
2. The authorization server authenticates the end-user and obtains end-user consent/authorization.
3. The authorization server sends the end-user back to the client with an ID token and, if requested, an access token.
4. The client passes the access token to the resource server.
5. The resource server serves the client with the requested information based on the access token validity. 

