# SAML 2.0 Bearer Assertion Profile for OAuth 2.0

One of the very first complements to the OAuth 2.0 specification is the
SAML 2.0 Bearer Assertion Profile for OAuth 2.0. This page describes the following SAML 2.0 Assertion scenarios.

-   Using SAML 2.0 assertions as authorization grants
-   Using SAML 2.0 assertions for client authentication

Out of the two scenarios, the former is the one that is more
commonly needed in enterprises. WSO2 Identity Server supports this
process.

An OAuth 2.0 authorization server can accept
SAML 2.0 assertions from OAuth 2.0 clients as a means of resource owner
authentication and authorization. Additionally, it can exchange it with
OAuth 2.0 access tokens in order to access protected resources on behalf
of the resource owner.

Many existing enterprises that have implemented SOA (Service Oriented Architecture),
rely on SAML. In the case of WSO2 Identity Server, SAML is used in its Web SSO feature
and STS feature. Such enterprises could face a situation where they now
need to consume OAuth protected resources through APIs. OAuth and OAuth
2.0 in particular are more recent specifications compared to SAML. An
enterprise that has already got a working SAML 2.0-based SSO
infrastructure between itself and the service provider (SP), would prefer
to use the existing trust relationship between the identity provider
(IdP) and the service provider, even if the OAuth authorization server
is entirely different from the IdP. Enterprises are going to love it, especially if there could be a cut in the number 
of steps performed in the OAuth 2.0 dance to obtain an access token. This could be due to the fact that the clients have
already authenticated themselves to the IdP and the resource owner has authenticated itself and authorized the client.
The SAML 2.0 Bearer Assertion Profile for OAuth 2.0 is the
answer to the question of how we leverage on the existing trust
relationship between the SP and the IdP, by presenting the SAML 2.0
token to the authorization server and exchanging it directly to an OAuth
2.0 access token.


![SAML 2.0 flow]({{base_path}}/assets/img/concepts/saml-2.0-flow.jpg)

!!! info "Related topics"
        - [Guide: Set Up SAML2 Bearer Assertion Profile]({{base_path}}/guides/access-delegation/saml2-bearer-assertion-profile)
        <!-- - [Quick Start: Set Up SAML2 Bearer Assertion Profile]({{base_path}}/quick-starts/saml2-bearer-assertion-profile) -->
