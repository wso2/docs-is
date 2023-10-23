# Implicit Grant Type

The implicit grant type is optimized for [public clients]({{base_path}}/references/concepts/authorization/client-types/#public-clients) known to operate a particular redirection URI.
It is mainly used for clients that are not capable of keeping the client’s own credentials secret; for example a 'JavaScript only' application.
Since the access token is encoded into the redirect URI, it may be exposed to parties other than the client, including the resource owner.
Therefore, access tokens issued via this grant type should be treated as public knowledge and must have very limited permissions
when interacting with the API server. For example, an access token that was granted using the authorization code grant
could have the required permission that allows it to be used to delete resources owned by the user.

However, an access token granted through the implicit flow should only be able to read resources and never perform 
any destructive operations.

---

## How does it work?

The implicit grant type is similar to the [authorization code]({{base_path}}/references/concepts/authorization/authorization-code-grant) grant type as it will be redirected to an authorization server.
However, unlike the authorization code grant type, it will be redirected along with an access token
instead of an authorization code. The implicit grant type does not authenticate the client and instead relies
on the presence of the resource owner and the registration of the redirection URI.

The diagram below illustrates the implicit grant flow.


![Implicit grant flow]({{base_path}}/assets/img/concepts/implicit-grant-flow.png)


The URL below can be used to try this grant type.

``` powershell
<AUTHORIZATION_ENDPOINT>?response_type=token&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>
```

You will receive a response similar to the format below.

``` java
http://localhost:8080/playground2/oauth2client#access_token=131d4094-b94c-3714-9e73-672aa433248d&token_type=Bearer&expires_in=3410
```


!!! info "Support for refresh token grant"
	This grant type does not issue a refresh token which can be used to obtain new access tokens using the refresh token grant.
	[refresh token grant](refresh-token-grant.md).

!!! info "Related topics"
        - [Guide: OIDC Implicit Client Profile]({{base_path}}/guides/login/oidc-implicit-client-profile/)
        - [Guide: Implicit Grant]({{base_path}}/guides/access-delegation/implicit-playground/)
