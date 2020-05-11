# OAuth2.0 Client Authentication

If the client type specified in the request is [confidential](client-types.md), the client and authorization server should establish a client authentication method 
suitable for the security requirements of the authorization server. This needs to be done ;

- To ensure the tokens are issued only to legitimate clients.

- Audit purposes

There are a few client authentication methods.

- Basic Authentication (client_secret_basic)

- Client Secret JWT Authentication (client_secret_jwt)

- Private Key JWT Client Authentication (private_key_jwt)

- Mutual TLS Authentication (tls_client_auth)

## client_secret_basic

In this client authentication method, the OAuth client uses [HTTP Basic Authentication Scheme](https://tools.ietf.org/html/rfc2617).

When deriving the authorization header value, it should be according to the following format.

`Authorization: Basic Base64encoded({client_id}:{client_secret})`

## client_secret_post

In this method, the credentials are passed in the request body as form parameters as follows.

`client_id=s6BhdRkqt3&client_secret=7Fjfp0ZBr1KtDRbnfVdmIw`

## private_key_jwt

Private Key JWT Client Authentication is an authentication method that can be used by clients to authenticate to the 
authorization server when using the token endpoint. In this authentication mechanism, it can authenticate clients that
have registered a public key with the authorization server and signed a JWT using that key.

The main steps of the flow are as follows.

1. OAuth2 client shares its public key with the Authorization Server.

2. OAuth2 client sends the JWT data signed with its private key to the token API.

3. Authorization Server extracts the signature and authenticates the client.


The JWT **must** contain some REQUIRED claim values and **may** contain some OPTIONAL claim values. For more information on the
required and optional claim values needed for the JWT for private_key_jwt authentication, click [here](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication).
The authentication token **must** be sent as the value of the client_assertion parameter. The value of the client_assertion_type parameter
**MUST** be ;

`urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

