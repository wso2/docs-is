# Introduction to Refresh Token

### Refresh Token
A refresh token is a string, representing the authorization granted to the client by the resource owner. The string is 
usually opaque to the client. When an access token expires or becomes invalid, but the application still needs to access
a protected resource, there is no way to get a new access token without forcing the user to grant permission once again.
The solution is to use a **refresh token** which can be used to renew the token without prompting the user again.
 

![refresh-token](../../assets/img/concepts/refresh-token.png)

1. Client sends a request to the authorization server requesting an access token by passing the refresh token.
2. The authorization server validates the refresh token and grants a new access token to the client.
3. The client passes the access token to the authorization server.
4. Upon the  validity of the access token the resource server allows the client to consume the protected resource.

  
### Security Considerations
Refresh tokens are long-lived. If an attacker gets hold of a refresh token, it can be used to obtain a new access token.
Therefore, it is recommended to store these tokens securely and as a further precaution, the server admins should be 
able to revoke the token if needed.
