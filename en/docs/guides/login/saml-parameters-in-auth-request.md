# Use Advanced Paramters in Authentication Requests

This page guides you through sending [SAML](TODO:insert-link-to-concept) parameters with the SAML authentication request. 

-----

## RelayState

The `RelayState` parameter is used so that an application can pass some value to the identity provider along with the authentication request and get the same value back with the `Response`. This value can be any string and can be useful for the application logic (e.g., when there is a failure, redirecting to the URL that comes as the `RelayState` parameter is one way that this can be used).

-   For an inbound request to WSO2 Identity Server, if the `RelayState` parameter is present, WSO2 IS sends back the same value in the response.

-   For federation using SAML2, WSO2 Identity Server uses the `RelayState` parameter to pass the session index, which is required to continue the authentication flow after receiving authentication response.

You can use the `RelayState` parameter as follows.

```
<https://localhost:9443/samlsso?spEntityID=foo.com&RelayState=http://localhost:8080/foo.com/my-home.jsp>
```

This request will authenticate and redirect the user to the URL in the `RelayState` parameter itself.

-----

## IsPassive

The `IsPassive` parameter is used to indicate to the identity provider whether WSO2 Identity Server should authenticate the user without any user interaction. This is done using the session cookie if the user has already been authenticated and a valid session cookie already exists. If this parameter is set to `true`, WSO2 IS authenticates the user using the existing session cookie. 

You can use the `IsPassive` parameter as follows.  

```
https://localhost:9443/samlsso?spEntityID=foo.com&IsPassive=true
```

------

## forceAuthn

The `forceAuth` parameter is used to force authentication. If this parameter is set to `true` the user will be forced to re-authenticate even if a valid session for that user exists with WSO2 Identity Server already. 

```
https://localhost:9443/samlsso?spEntityID=foo.com&tenantDomain=abc.com&forceAuthn=true
```

-----

!!! info "Related Topics"
    - [Concept: SAML](TODO:insert-link-to-concept)
    - [Guide: Single Sign-On](../enable-single-sign-on)
    - [Guide: Enable Login for a SAML Application](../webapp-saml)
    - [Guide: SAML Authentication Error Codes](TODO:insertlink)

