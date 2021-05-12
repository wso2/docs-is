# SAML2 Artifact Binding

There are several bindings or methods introduced with the SAML Specification such as HTTP Redirect Binding, HTTP POST Binding, and HTTP Artifact Binding. The SAML Artifact Binding uses a special token to transport sensitive information between two parties. 

WSO2 Identity Server (WSO2 IS) supports acquiring SAML protocol messages
via HTTP Artifact Binding according to section 3.5 of the [SAML 2.0 core
specification](http://www.oasis-open.org/committees/download.php/35711/sstc-saml-core-errata-2.0-wd-06-diff.pdf). Once a user is authenticated successfully, the WSO2 Identity Server issues a SAML artifact in the place of the actual SAML response. The
service provider application can acquire this artifact and use it as a
reference to obtain the actual SAML response from WSO2 Identity Server.
The following sections guide you through configuring SAML artifact
binding and trying it out with a sample application.

You can use HTTP artifact binding for instances where the SAML requester
and responder need to communicate with each other using an HTTP user
agent as an intermediary, but its limitations preclude or discourage
the transmission of an entire message (or message exchange) through it.
This may be due to some technical reasons or the reluctance to expose
the message content to the intermediary (where encryption is not
practical).

In the HTTP artifact binding, the SAML request, the SAML response, or
both are transmitted by reference using a small stand-in called an
*artifact.* A separate, synchronous binding, such as the SAML SOAP
binding, is used to exchange the artifact for the actual protocol
message using the artifact resolution protocol. When using the HTTP
artifact binding for the SAML \<Response\> message, SAML permits the
artifact to be delivered via the browser using either an HTTP POST or
HTTP Redirect response.

SAML artifact is a short, opaque string which will have the ability of
an artifact receiver to identify the issuer of the artifact, resistance
to tampering and forgery, uniqueness, and compactness.

The format of a SAML artifact is shown below:

![saml-artifact-format](/assets/img/concepts/saml-artifact-format.png)

The diagram below shows the process of SAML Artifact Binding.

![saml-artifact-binding](/assets/img/concepts/saml-artifact-binding.png) 

1.  The user wants to access a resource in the service and goes to the service using the browser. 

2.  The service needs the user’s authentication to grant access. So it creates a SAML authentication request and sends it to the IDP, through the user agent. In most cases, this call is a browser redirection (302).

3.  The IDP asks the user to log in.

4.  Once the authentication is successful, the IDP sends a special key known as the SAML Artifact to the service, through the user agent. 

5.  The service makes a back channel call to the IDP’s Artifact Resolution Endpoint with the SAML artifact.

6.  The IDP sends the actual SAML Response to the service.


!!! info "Related Topics"

    [Quick Start: Use SAML Artifact Binding](../../../quick-starts/use-artifact-binding-sample)

    [Guides: Use SAML2 Artifact Binding](../../../guides/login/use-artifact-binding/)