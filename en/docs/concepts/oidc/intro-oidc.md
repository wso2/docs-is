# Introduction to OpenID Connect

### What is OpenID Connect ?
OpenID Connect is an authentication protocol which builds on top of the OAuth2.0 protocol. This is not a replacement to OAuth2.0, 
but an extension which the clients can request by including the 'openid' scope value in the Authorization Request. 
This protocol verifies user identity by authenticating the end user against the Authorization Server.

!!! info "WSO2 Identity Server is Open ID Certified !!!"
    Open ID foundation holds a certification program and grants Open ID Connect certificate for Open ID Providers who 
    conform to OIDC Profiles. WSO2 Identity Server is Open ID certified for following profiles. 
    
      - Basic OP
      - Impicit OP
      - Hybrid OP
      - Form Post OP

### Why OpenID Connect?
When authenticating to an online system, a user should be able to prove his identity to the system. 
A single user can have multiple identites (Passport number, NIC number, finger print) and proving identity to a system
can be done in many ways such as using credentials, biometric information, or any other mechanism. OpenID Connect provides a 
trustworthy, simple and effective mechanism for individuals to identify themselves to many application and service 
providers using one or more of their identities stored at a trusted identity provider (IdP).

OIDC provides a single login to multiple sites through an Identity Provider. It provides secure access to a client or an
application without the user sharing the credentials of the application by exchanging tokens. Apart from that, the clients
receive user identity related details in the format of jwt which is very easy to process and maintain. Even though this 
protocol is simple, it has more features that match the enterprise demand supporting a wider variety of client types such as 
web , mobile , desktop and  JavaScript clients.
 
In simple terms, OIDC is the solution and a single platform which performs both authentication and authorization.

### When to choose OIDC for which application ?
OIDC represents three flows of authentication :

    - Authorization code flow
    - Impicit flow
    - Hybrid flow

The different flows target different types of application clients.

| Flow                 | Usage         | 
| --------------------- | ------------- | 
| Authorization code flow | Mostly used by web and mobile applications when the clients can use typical ways to authenticate. (Ex: Proving user credentials)  |                            
| Implicit Flow           | Specially consumed by the mobile applications or the client side JavaScript applications that run in the browser where embedded credentials could be compromised. In this case the client should not be authenticated and tokens should be retrieved via the front channel.  |                              
| Hybrid Flow             | Front-end and back-end applications use this flow to receive tokens independently (when a client application wants an immediate use of user details which can be obtained through an ID token), while the exchange of the authorization code and the access token happens.  | 

### How does it work ?

The exact flow differs based on the authentication flow or the grant type.  However, OIDC in general allows web applications to authenticate users with an external server (OpenID Connect Provider - OP). Usually, the user information is picked from an external Identity Provider or sometimes the Identity Provider (IDP) may act as the OP as well. In this OIDC flow, all communication takes place via tokens.

The following steps explain how this protocol works in a simple manner.

  ![oidc-flow](../../assets/img/concepts/oidc-basic-flow.png)
  
  When a user needs to access an application and once he initiates the flow,
  
1. The client sends a request to the OP.
2. The OP authenticates the user and obtains the authorization.
3. The OP responds with an ID token and an access token.
4. The client application (Relying Party - RP) sends a request using the access token to obtain user information.
5. The user information returns claims.

