# Grant Types

In OAuth2.0 the term **grant type** refers to the way a client gets an access token.
The [specification](https://tools.ietf.org/html/rfc6749) defines four main grant types.

- [Authorization code grant type](/references/concepts/authorization/authorization-code-grant)

- [Implicit grant type](/references/concepts/authorization/implicit-grant)

- [Resource owner grant type](/references/concepts/authorization/resource-owner-grant)

- [Client credential grant type](/references/concepts/authorization/client-credential-grant)


Apart from the above four grant types, WSO2 Identity Server supports a few extension grants such as:

- [JWT grant type](/references/concepts/authorization/jwt-bearer-grant-type)

- [SAML bearer grant type](/references/concepts/authorization/saml2-bearer-assertion-profile)

- [Kerberos grant type](/references/concepts/authorization/kerberos-grant)


To renew the existing access token, WSO2 Identity Server supports the [Refresh token grant type](refresh-token-grant.md)

