# OpenID Connect Dynamic Client Registration

[Open ID Connect](http://openid.net/connect/) enables clients (relying
party) to verify the identity and obtain profile information of the end
user based on the authentication performed by an authorization server,
in an interoperable and REST-like manner. Client applications must be
registered before they can login end-users with OpenID Connect or
receive OAuth 2.0 access tokens. The following section provides
information on how an OpenID Connect Relying party can dynamically
register with the end user's OpenID provider.

### How it works

To register a new client at the authorization server:

1.  Client discovers the client registration endpoint. The registration
    endpoint URL is discoverable via
    [WebFinger](http://openid.net/specs/openid-connect-discovery-1_0.html)
    . For more information on discovering the client registration
    endpoint, see [OpenID Connect Discovery](../../learn/openid-connect-discovery)
    .
2.  Client sends an HTTP POST message to the client registration
    endpoint with client metadata parameters that the client chooses to
    specify for itself during the registration.
3.  The authorization server assigns a unique client identifier (client
    ID) and optionally, a client secret.
4.  The authorization server associates the metadata given in the
    request with the issued client ID.

!!! tip
    To view sample requests and responses, see the [REST API swagger docs on
    OAuth2 Dynamic Client
    Registration](../../develop/using-the-openid-connect-dynamic-client-registration-rest-apis/)
    .
    
