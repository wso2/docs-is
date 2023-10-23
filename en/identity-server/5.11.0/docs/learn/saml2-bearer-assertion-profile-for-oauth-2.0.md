# SAML2 Bearer Assertion Profile for OAuth 2.0

One of the very first complements to the OAuth 2.0 specification is the
SAML2 Bearer Assertion Profile for OAuth 2.0. This page talks about the
following two scenarios for the SAML2.0 Assertion.

-   Using SAML2.0 assertions as authorization grants
-   Using SAML2.0 assertions for client authentication

Among the above two scenarios, the former is the one that is more
commonly needed in enterprises. The WSO2 Identity Server supports this
process.

WSO2 Identity Server as an OAuth 2.0 Authorization Server can accept
SAML2 Assertions from OAuth 2.0 clients as means of resource owner
authentication and authorization. Additionally, it can exchange it with
OAuth 2.0 access tokens in order to access protected resources on behalf
of the resource owner.

Many existing enterprises that have implemented SOA, rely on SAML. In
the case of WSO2 Identity Server, SAML is used in its Web SSO feature
and STS feature. Such enterprises could face a situation where they now
need to consume OAuth protected resources through APIs. OAuth and OAuth
2.0 in particular are more recent specifications compared to SAML. An
enterprise that has already got a working SAML2.0 based SSO
infrastructure between itself and the Service Provider (SP) would prefer
to use the existing trust relationship between the Identity Provider
(IDP) and the Service Provider, even if the OAuth Authorization Server
is entirely different from the IDP. Especially if there could be a cut
down in the number of steps performed in the OAuth 2.0 dance in
obtaining an access token due to the fact that the clients have already
authenticated themselves to the IDP and the resource owner has
authenticated themself and authorized the client, enterprises are going
to love it. The SAML2 Bearer Assertion Profile for OAuth 2.0 is the
answer to the question of how we leverage on the existing trust
relationship between the SP and the IDP, by presenting the SAML 2.0
token to the authorization server and exchanging it directly to an OAuth
2.0 access token.

![saml-2.0-flow]( ../assets/img/using-wso2-identity-server/saml-2.0-flow.jpg)

!!! info "Related Topics"
	-   To try the SAML2.0 Assertion grant type with WSO2 Identity Server,
	    see [Setting up a SAML2 Bearer Assertion Profile for OAuth
	    2.0](../../learn/setting-up-a-saml2-bearer-assertion-profile-for-oauth-2.0).
	-   For more information on how to use SAML2.0 assertions for client
	    authentication, see [SAML 2.0 Web SSO](../../learn/saml-2.0-web-sso).
