# Grant Types

In OAuth 2.0 the term **grant type** refers to the way a client gets an access token.
The [specification](https://tools.ietf.org/html/rfc6749) defines four main grant types.

- [Authorization code grant type](../authorization-code-grant)

- [Implicit grant type](../implicit-grant)

- [Resource owner grant type](../resource-owner-grant)

- [Client credential grant type](../client-credential-grant)


Apart from the above four grant types, WSO2 Identity Server supports a few extension grants such as:

- [JWT grant type](..jwt-bearer-grant-type)

- [SAML bearer grant type](../saml2-bearer-assertion-profile)

- [Kerberos grant type](../kerberos-grant)


To renew the existing access token, WSO2 Identity Server supports the [Refresh token grant type](refresh-token-grant.md)

