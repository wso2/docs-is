# Request Path Authentication

A request path authenticator is a special type of local authenticator
meant to authenticate requests that contain the user’s credentials. This
means that you can use the Single-Sign-On mechanism without having an
identity provider login page to prompt the end user for credentials.

Once the initial request is handed over to the authentication framework
from an inbound authenticator, the authentication framework communicates
with the service provider configuration component to find the set of
request path authenticators registered with the service provider
corresponding to the current authentication request. Then, the framework
will check whether there is any request path authenticator applicable
for the initial authentication request. In other words, a request path
authenticator will get executed only if the initial authentication
request brings the applicable set of credentials with it.The request
path authenticators always requires the user credentials to be present
in the initial authentication request itself. This does not need any
end-user interaction with the Identity Server. Once the request path
authentication is successfully completed, the request path authenticator
will notify the authentication framework. The framework will then decide
no more authentication is needed and hand over the control to the
corresponding response builder of the inbound authenticator.

The following types of request path authenticators can be used to
achieve this.

-   [Basic Auth Request Path
    Authentication](../../learn/basic-auth-request-path-authentication)
-   [OAuth Request Path
    Authentication](../../learn/oauth-request-path-authentication)

For more information on how request path authentication works, see [Try
Request Path Authentication](../../learn/try-request-path-authentication).
