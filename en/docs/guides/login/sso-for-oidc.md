# Enable Single Sign-On for an OIDC Web Application

This page guides you through enabling [single sign-on](../../../references/concepts/single-sign-on) (SSO) for an OIDC application using WSO2 Identity Server.

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/sso-for-oidc-apps" rel="nofollow noopener">Try it with the sample</a>

----

## Create a service provider

{!fragments/register-a-service-provider.md!}

----

## Basic OAuth/OpenID Connect configuration

{!fragments/oauth-app-config-basic.md!}

{!fragments/oauth-app-config-advanced-tip.md!}

----

!!! info "Related topics"
    - [Concept: Single Sign-On](../../../references/concepts/single-sign-on)
    - [Quick Start: Single Sign-On for an OpenID Connect Application](../../../quick-starts/sso-for-oidc-apps)
    - [Guide: Manage User Sessions](../session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)