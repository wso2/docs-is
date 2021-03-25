# Pass OIDC Authentication Request Parameters in a Request Object

This page guides you through passing a set of request parameters as its claims using a JWT in a [request object](../../../references/concepts/authentication/request-object). 
If you want to pass any sensitive parameter with the authentication request which needs additional security you can pass it as a request object.

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/request-object" rel="nofollow noopener">Try it with the sample</a>

----

## Create  a service provider

{!fragments/register-a-service-provider.md!}

----

{!fragments/encrypt-id-tokens.md!}

----

!!! info "Related Topics"
    - [Concept: Request Object](../../../references/concepts/authentication/request-object)
    - [Demo: OpenID Connect Request Object](../../../quick-starts/request-object)
    - [Guide: Use Advanced Parameters in Authentication Requests](../oidc-parameters-in-auth-request)