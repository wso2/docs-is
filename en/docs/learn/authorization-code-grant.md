# Authorization Code Grant

### Recommended use

The authorization code grant type is optimized for confidential clients.
It provides a few important security benefits such as the ability to
authenticate the client and transmission of the access token directly to
the client without passing it through the resource owner's user-agent
and potentially exposing it to others (including the resource owner).
This grant type is suitable when the resource owner is a user and the
client is a website.

### The flow

Instead of requesting authorization directly from the resource owner,
the client directs the resource owner to an authorization server. The
resource owner is then redirected back to the client with the
authorization code which the client will capture and exchange for an
access token in the background. Since this is a redirection-based flow,
the client must be able to interact with the resource owner's user-agent
and receive incoming requests (via redirection) from the authorization
server.

The diagram below illustrates the authorization code flow.

![oauth-authorization-code-grant-diagram](../../assets/img/using-wso2-identity-server/oauth-authorization-code-grant-diagram.png)

**Support for** [**refresh token grant**](../../using-wso2-identity-server/refresh-token-grant) -
**Yes**

!!! info "Related Topics"
    See the [Try Authorization Code
    Grant](../../using-wso2-identity-server/try-authorization-code-grant) topic to try out a sample of
    it with WSO2 Identity Server and WSO2 OAuth2 Playground.
