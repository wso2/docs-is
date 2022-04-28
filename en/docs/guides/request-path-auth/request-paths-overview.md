# Overview

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
for the initial authentication request. 

A request path authenticator will get executed only if the initial authentication request brings the applicable set of credentials with it. This does not need any end-user interaction with the Identity Server. Once request path authentication is successfully completed, the authentication framework is notified.

The framework will then decide no more authentication is needed and hand over the control to the corresponding response builder of the inbound authenticator.

The following types of request path authenticators can be used to
achieve this.

-   [Basic Auth Request Path Authentication](basic-auth-request-path-authentication.md)
-   [OAuth Request Path Authentication](oauth-request-path-authentication.md)