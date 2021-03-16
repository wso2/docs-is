# End-User Authentication

OpenID Connect performs authentication to log in the **end-user**
or to determine whether the **end-user** is already logged in. 
The **Authorization Endpoint** is responsible for authenticating
the **end-user**. 

There are some mandatory and optional parameters
defined in the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#Authentication)
that should be used when performing an authentication request based on the authentication flow.  


End-user authentication can be done in two main ways.

1. **[Traditional request](traditional-authentication-request.md)**

    When using the traditional authentication request, the client has to pass the required parameters to invoke the 
    Authorization Endpoint based on the authentication flow.

2. **[Request Object](request-object.md)**

    When using the request object, it should be associated with either one of the following additional parameters.
    
    - request parameter
    - request_uri parameter