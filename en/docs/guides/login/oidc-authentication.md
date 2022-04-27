# OpenID Connect Authentication

When you implement authentication in your applications using the OpenID Connect specification, you can use one of the following flows:

<table>
    <tr>
        <th>Authorization code flow</th>
        <td>
            This returns an authorization code via the front channel, and requires client authentication using client ID and client secret so that the token endpoint can issue the access token via the back channel.
        </td>
    </tr>
    <tr>
        <th>Implicit flow</th>
        <td>
            This generates requested tokens at the authorization endpoint, and does not require the client secret for client authentication. This flow happens via the front channel.
        </td>
    </tr>
    <tr>
        <th>Hybrid flow</th>
        <td>
            This is a combination of basic flow and implicit flow, which allows you to request a combination of code, identity token, and access token via the front channel. This flow can obtain authorization codes and tokens from the authorization endpoint, and can also request tokens from the token endpoint.
        </td>
    </tr>
</table>

The authentication flow determines how the id token and access token
should return to the client.

WSO2 Identity Server supports all the above OpenID Connect
authentication flows, and the `response_type` value
specified in an authorization request determines the authentication flow
that is to be used.

The following table describes the flow that gets selected depending on
the `         response_type        ` value you specify in an
authorization request:

| `response_type` | Flow                    |
|----------------------------------------------------|-------------------------|
| `             code            `                    | Authorization code flow |
| `             id_token            `                | Implicit flow           |
| `             id_token token            `          | Implicit flow           |
| `             code token            `              | Hybrid flow             |
| `              code id_token             `         | Hybrid flow             |
| `             code id_token token            `     | Hybrid flow             |

See the following topics for more information on each OpenID Connect
flow for authentication:

- [OIDC Authorization Code Flow](../openid-connect-basic-client-profile)
- [OIDC Implicit Flow](../openid-connect-implicit-client-profile)
- [OIDC Hybrid Flow](../openid-connect-hybrid-flow)