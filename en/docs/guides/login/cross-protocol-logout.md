# Cross-Protocol Logout

This page guides you through enabling [cross-protocol logout](TODO) across different protocols such as SAML and OpenID Connect in WSO2 Identity Server. 

-----

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/cross-protocol-sample" rel="nofollow noopener">Try it with the sample</a>

----

{!fragments/register-a-service-provider.md!}

----

{!fragments/saml-app-config-basic.md!}

----

**Next, register a service provider and configure authentication for it with a different protocol.**

----

{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

----

!!! info "Related Topics"
    - [Single Sign-On](../enable-single-sign-on)
    - [SAML Back-Channel Logout](TODO)
    - [OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [OpenID Connect Logout URL Redirection](../oidc-logout-url-redirection)