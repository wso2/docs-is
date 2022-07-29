# Introduction to OpenID Connect

## What is OpenID Connect?

OpenID Connect (OIDC) is an authentication protocol that builds on top of the OAuth 2.0 protocol. It is not a replacement to OAuth 2.0, 
but an extension that clients can request by including the 'openid' scope value in the authorization request. 
This protocol verifies user identity by authenticating the end user against the authorization server.

!!! info "WSO2 Identity Server is OpenID Certified !!!"
    The OpenID foundation holds a certification program and grants an OpenID Connect certificate for OpenID Providers who 
    conform to OIDC Profiles. WSO2 Identity Server is OpenID certified for the following profiles. 
    
      - Basic OP
      - Impicit OP
      - Hybrid OP
      - Form Post OP

----

## Why OpenID Connect?

When logging in to an online system, the user should be able to prove his identity to the system. 
A single user can have multiple identities (e.g., passport number, NIC number, fingerprint) and proving their identity to a system
can be done using credentials, biometric information, or any other mechanism. OpenID Connect provides a 
trustworthy, simple, and effective mechanism for individuals to identify themselves to many applications and service 
providers using one or more of their identities stored at a trusted identity provider (IdP).

OIDC provides a single login to multiple sites through an identity provider. It provides secure access to a client or an
application without the user sharing the credentials of the application by exchanging tokens. Apart from that, the clients
receive user identity related details in the format of jwt, which is very easy to process and maintain. Although this 
protocol is fairly simple, it has more features that match the enterprise demand supporting a wider variety of client types such as 
web, mobile, desktop, and JavaScript clients.
 
In simple terms, OIDC is a solution and a single platform that performs both authentication and authorization.

----

## How to choose the right flow for an application?

OIDC represents three flows of authentication:

  - Authorization code flow
  - Impicit flow
  - Hybrid flow

The different flows target different types of application clients.

| Flow                 | Usage         | 
| --------------------- | ------------- | 
| Authorization code flow | Mostly used by web and mobile applications when the clients can use typical ways to authenticate (e.g., providing user credentials)  |                            
| Implicit flow           | This is specially consumed by mobile applications or the client side JavaScript applications that run in the browser where embedded credentials could be compromised. In this case, the client should not be authenticated and tokens should be retrieved via the front-channel.  |                              
| Hybrid flow             | Front-end and back-end applications use this flow to receive tokens independently (when a client application wants an immediate use of user details which can be obtained through an ID token), while the exchange of the authorization code and the access token happens.  | 

----

## How does it work?

The exact flow differs based on the authentication flow or the grant type.  However, OIDC in general allows web applications to authenticate users with an external server (i.e., OpenID Connect Provider - OP). Usually, the user information is picked from an external identity provider or sometimes the identity rovider (IdP) may act as the OP as well. In this OIDC flow, all communication takes place via tokens.

The following steps explain how this protocol works in a simple manner.

  ![oidc flow]({{base_path}}/assets/img/concepts/oidc-basic-flow.png)
  
Once a user attempts to access an application and initiates the flow: 
  
1. The client sends a request to the OP.
2. The OP authenticates the user and obtains the authorization.
3. The OP responds with an ID token and an access token.
4. The client application (Relying Party - RP) sends a request using the access token to obtain user information.
5. The user information returns claims.

## How OIDC login works

1. Obtain the `authorization_code` by sending an authorization request to the authorization endpoint.

    !!! abstract  ""
        **Request Format**
        ```
        https://<host>:<port>/oauth2/authorize?scope=openid&response_type=code
        &redirect_uri=<callback_url>
        &client_id=<oauth_client_key>
        ```
        ---
        **Sample Request**
        ```
        https://localhost:9443/oauth2/authorize?scope=openid&response_type=code
        &redirect_uri=https://localhost/callback
        &client_id=YYVdAL3lLcmrubZ2IkflCAuLwk0a
        ```

    You will receive the authorization code upon successful authorization.
    
    !!! abstract ""
        **Response Format**
        ```
        <callback_url>?code=<code>
        ```
        ---
        **Sample Response**
        ```
        https://localhost/callback?code=9142d4cad58c66d0a5edfad8952192
        ```

2. Obtain the access token by sending a token request to the token endpoint using the `code` received in step 1, and the `oauth_client_key` and `oauth_client_secret` obtained when configuring the service provider.

    !!! abstract ""
        **Request Format**
        ```
        curl -i -X POST -u <oauth_client_key>:<oauth_client_secret> -k -d 
        'grant_type=authorization_code&redirect_uri=<redirect_uri>
        &code=<code>' https://<host>:<port>/oauth2/token
        ```
        ---
        **Sample Request**
        ```
        curl -i -X POST -u YYVdAL3lLcmrubZ2IkflCAuLwk0a:azd39swy3Krt59fLjewYuD_EylIa -k -d 
        'grant_type=authorization_code
        &redirect_uri=https://localhost/callback&code=d827ec7e-1b8e-3d81-a4c0-2f7ff67ce844'
        https://localhost:9443/oauth2/token
        ```

3. For the token request, you will receive a response containing the access token, scope, and ID token similar to the sample response provided below.

    ``` java
    {
        "access_token":"80c7c0d7-070a-38ff-a1f4-d21a444cdb67",
        "refresh_token":"18917dd6-4566-3294-92a9-01ec89cccf4d",
        "scope":"openid"
        "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJjZTA5YTM1NjBhYzI4ZDc3YWNlZjJjYzQxZGUyNjEzZDMxY2NmOGQwYTgxYjRhNzY2ZTlhYTFmZDRlNjhhMzA5IiwiYXRfaGFzaCI6IncwUG1fVFp4TlFfQTBRUU91RjJESUEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoibzhIX0Fqc3FOSWkyd3g5LWVzcFo0dyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjE1ODc0NTM5LCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzgxMzksImlhdCI6MTYxNTg3NDUzOSwibm9uY2UiOiJhc2QifQ.LIoD9ltfqsxysMaC1b0kX-Ot4qL5GycpF5R-GIB_wBkQvN5BVEQZ4XV2t0t9GaQv1gSApsd6CtUAvV0haAqaNDElVcDQrmsyyHNzN0051biTQWQkoC4wwtO6_w1MSmgbH_aNVjQkBWt2vnaWtn6bt9sdZVxGRSb3_Amxdty_rDmiOzhJPwxZbkdPp1US0jmAn2XOoQQyH7e__qoXSjjoBAKXQtncJWAKtteDUBQTqVLj13TdS8dYqnEQByKNvhpz8rZjGaBV9pxtOWoqnbc3IMA4lX47Mpxl22ZqhIn0J6WCQ7nJtEkfx6XNHdatWZyG2x20pxbZkgya6sKAEoy3zw",
        "token_type":"Bearer",
        "expires_in":2286
    }
    ```

    The ID token contains basic user information. To check what is encoded within the ID token, you can use a tool such as <https://devtoolzone.com/decoder/jwt>.
