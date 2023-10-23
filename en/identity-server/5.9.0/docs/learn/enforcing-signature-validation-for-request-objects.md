# Enforcing Signature Validation for Request Objects

The tutorial [Passing OIDC Authentication Request Parameters in a
Request
Object](../../learn/passing-oidc-authentication-request-parameters-in-a-request-object)
describes how you can pass OIDC authentication request parameters in a
request object via WSO2 Identity Server (WSO2 IS). Request objects can
either be signed or unsigned. Therefore, if you want to only accept
signed request objects in an authorization request, you need to enable
request object signature validation in the OAuth/OIDC configuration of
the service provider.

This tutorial walks you through the steps you need to follow to enforce
signature validation for request objects.

Follow the steps below to configure a service provider to only accept
request objects that are signed:

1.  Start WSO2 Identity Server and access the Management Console via
    `                     https://localhost:9443/carbon/                   `.
    
2.  Navigate to **Service Providers\>Add**, enter a name for the new
    service provider and click **Register.**
3.  Expand the **Inbound Authentication Configuration** section, then
    expand the **OAuth2/OpenID Connect Configuration,** and click
    **Configure.**

4.  Select **Enable Request Object Signature Validation** to enforce
    signature validation for request object.
5.  Click **Add**.

To verify that signature validation is successfully enforced, send a
plain JWT instead of a signed one in the authorization code grant
request.

If signature validation is successfully enforced, the request should get
rejected and you should see an error page as follows:

![signature-validation-successful](../assets/img/tutorials/signature-validation-successful.png)
