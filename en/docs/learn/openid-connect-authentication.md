# OpenID Connect Authentication

Based on the OpenID Connect specification, authentication can follow any
of the following flows:

-   **Authorization code flow** : This returns an authorization code via
    the front channel, and requires client authentication using client
    ID and client secret so that the token endpoint can issue the access
    token via the back channel.
-   **Implicit flow** : This generates requested tokens at the
    authorization endpoint, and does not require the client secret for
    client authentication. This flow happens via the front channel
-   **Hybrid flow** : This is a combination of basic flow and implicit
    flow, which allows you to request a combination of code, identity
    token, and access token via the front channel. This flow can obtain
    authorization codes and tokens from the authorization endpoint, and
    can also request tokens from the token endpoint.

The authentication flow determines how the id token and access token
should return to the client.

WSO2 Identity Server supports all the above OpenID Connect
authentication flows, and the `         response_type        ` value
specified in an authorization request determines the authentication flow
that is to be used.

The following table describes the flow that gets selected depending on
the `         response_type        ` value you specify in an
authorization request:

| Specified `             response_type            ` | Flow                    |
|----------------------------------------------------|-------------------------|
| `             code            `                    | Authorization code flow |
| `             id_token            `                | Implicit flow           |
| `             id_token token            `          | Implicit flow           |
| `             code token            `              | Hybrid flow             |
| `              code id_token             `         | Hybrid flow             |
| `             code id_token token            `     | Hybrid flow             |

See the following topics for more information on each OpenID Connect
flow for authentication:

-   [OpenID Connect Basic Client
    Profile](../../learn/openid-connect-basic-client-profile)
-   [OpenID Connect Implicit Client
    Profile](../../learn/openid-connect-implicit-client-profile)
-   [OpenID Connect Hybrid Flow](../../learn/openid-connect-hybrid-flow)

  
