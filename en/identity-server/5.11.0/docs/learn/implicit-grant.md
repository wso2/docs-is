# Implicit Grant

### Recommended use

The implicit grant type is optimized for public clients known to operate
a particular redirection URI. It is mainly used for clients that are not
capable of keeping the client’s own credentials secret; for example a
'JavaScript only' application. Since the access token is encoded into
the redirect URI, it may be exposed to other parties other than the
client, including the resource owner. Therefore, access tokens issued
via this grant type should be treated as public knowledge and must have
very limited permissions when interacting with the API server. For
example, an access token that was granted using the authorization code
grant could have the required permission that allows it to be used to
delete resources owned by the user. However, an access token granted
through the implicit flow should only be able to read resources and
never perform any destructive operations.

### The flow

The implicit grant type is similar to authorization code grant type as
it will be redirected to an authorization server. However, unlike the
authorization code grant type, it will be redirected along with an
access token instead of an authorization code. The implicit grant type
does not authenticate the client and instead relies on the presence of
the resource owner and the registration of the redirection URI.

The diagram below illustrates the implicit grant flow.

![oauth-implicit-grant-diagram](../assets/img/using-wso2-identity-server/oauth-implicit-grant-diagram.png)


!!! info "Support for refresh token grant - No"
	This grant type doesn't issue a refresh token which can be used to obtain new access tokens using the [refresh token grant](../../learn/refresh-token-grant).


!!! info "Related Topics"
    See the [Try Implicit Grant](../../learn/try-implicit-grant) topic to try out
    a sample of it with WSO2 Identity Server and WSO2 OAuth2 Playground.
