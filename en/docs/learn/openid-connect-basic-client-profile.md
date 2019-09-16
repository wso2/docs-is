# OpenID Connect Basic Client Profile

This topic guides you through consuming an OpenID connect basic client
profile that is based on authorization code flow. The following steps
outline the flow according to the [OpenID
specification.](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)

1.  The client prepares an authentication request containing the desired
    request parameters.
2.  The client sends the request to the authorization server.
3.  The authorization server authenticates the end-user.
4.  The authorization server obtains end-user consent/authorization.
5.  The authorization server sends the end-user back to the client with
    an authorization code.
6.  The client requests a response using the authorization code at the
    token endpoint.
7.  The client receives a response that contains an ID token and an
    access token in the response body.
8.  The client validates the ID token and retrieves the end-user's
    subject identifier.

The following parameters are mandatory and have to be included in the
authorization request in order to execute this flow.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>scope</td>
<td>Specifies the behaviour of the request.<br />
<strong>Value: "openid"</strong></td>
</tr>
<tr class="even">
<td>response_type</td>
<td><p>Determines which authorization processing flow is to be used, including what parameters are returned from the endpoints used.<br />
<strong>Value: "code"</strong></p></td>
</tr>
<tr class="odd">
<td>client_id</td>
<td>The OAuth 2.0 Client Identifier valid at the authorization server.</td>
</tr>
<tr class="even">
<td>redirect_uri/callback_uri</td>
<td>The URI which the authorization server should send the response to.</td>
</tr>
</tbody>
</table>

!!! note "About oidc-scope-config.xml file"
    The `oidc-scope-config.xml` file enables grouping of
    claims that are bound to a scope value in OpenID Connect (OIDC). By
    default, the oidc-scope-config.xml file is located inside
    `{IS_Home}/repository/conf/identity` directory.
    
    This file can be modified to add custom scopes or claims. When the
    server starts, these configurations are stored in the registry located
    in `/oidc/` . You can customize claims or scopes from
    here as well. The returned clams from id token or user info endpoint
    will be decided based on both the requested scopes and requested claims.
    
    When requesting for an OIDC token, you can specify a scope value that is
    bound to a set of claims in the `oidc-scope-config.xml`
    file. When sending that OIDC token to the userinfo endpoint, only the
    claims that are common to both the oidc-scope-config.xml and the service
    provider claim configuration, will be returned.
    
!!! info "Related Topics"
    See the [Basic Client Profile with
    Playground](../../learn/basic-client-profile-with-playground) topic to try out
    this flow with the playground sample for OAuth in WSO2 Identity
    Server.
