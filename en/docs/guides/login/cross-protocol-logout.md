# Configure Cross-Protocol Logout

This page guides you through enabling cross-protocol logout across different protocols such as SAML and OpenID Connect in WSO2 Identity Server. 

-----

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/cross-protocol-logout-sample" rel="nofollow noopener">Try it with the sample</a>

----

## Register your SAML application with WSO2 Identity Server
{!fragments/register-a-service-provider.md!}

{!fragments/saml-app-config-basic.md!}

----

**Next, register a service provider and configure authentication for it with a different protocol.**

----

## Register your OpenID Connect application with WSO2 Identity Server

{!fragments/register-a-service-provider.md!}

{!fragments/oauth-app-config-basic.md!}

----

Once you have configured all your applications, access them in separate tabs in your browser. When you logout from one application, it should log you out from all the configured applications. 

!!! info "Related topics"
    - [Demo: Cross-Protocol Logout](../../../quick-starts/cross-protocol-logout-sample)
    - [Guide: Single Sign-On](../enable-single-sign-on)
    - [Guide: SAML Front-Channel Logout](../saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout](../saml-back-channel-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [Guide: OpenID Connect Logout URL Redirection](../oidc-logout-url-redirection)
    <!--- - [Concept: Cross-Protocol Logout](TODO:insert-link-to-concept)-->