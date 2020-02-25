# End-User Authentication

OpenID Connect performs authentication to log in the *End-User*
or to determine that the *End-User* is already logged in. 
The **Authorization Endpoint** is responsible for Authentication 
of the *End-User*. There are some mandatory and optional parameters
defined in the [**specification**](https://openid.net/specs/openid-connect-core-1_0.html#Authentication)
when performing an authentication request based on the authentication flow.  


End User Authentication can be done in two main ways.

- Traditional request

When using the traditional authentication request, the client has to pass the required parameters to invoke the 
Authorization Endpoint based on the authentication flow.

- [Request Object](request-object.md)

When using the request object, it should be associated with either one of the following additional parameters.

- request parameter

- request_uri parameter