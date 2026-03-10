## Validate opaque tokens using the OAuth2 introspection endpoint

Opaque access tokens do not contain authorization information that can be decoded by a resource server. Therefore, the resource server must validate the token by querying the authorization server.

WSO2 Identity Server supports token validation through the **OAuth 2.0 Token Introspection endpoint** defined in [RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662).

`https://<IS_HOST>:<IS_PORT>/oauth2/introspect`