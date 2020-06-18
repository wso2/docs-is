# Configure SAML 2.0 Front Channel logout

This page guides you through [configuring SAML front channel logout](TODO:insert-link-to-concept) for applications with WSO2 Identity Server. This will ensure that the user is logged out from all configured applications with a single logout request via one of the applications. 

---

This guide assumes you have your own applications. If you wish to try out this flow with sample applications, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/saml-front-channel-logout" rel="nofollow noopener">Try it with the sample</a>

---

The instructions below guide you through configuring SAML 2.0 front channel Logout. 

Register your applications with WSO2 Identity Server. Make sure you have a service provider configured in WSO2 Identity Server for every application that you are going to try out this feature.  

Register a Service Provider

TODO: dev-portal-fragment

---
Configure the SAML Application

TODO: dev-portal-fragment

---

{! fragments/saml-app-front-channel-configs !}


--- 

Follow the instructions to download the SAML metadata for your applications. 

TODO: dev-portal-fragment

Once you have configured all your applications, access them in separate tabs in your browser. When you logout from one application, it should log you out from all the configured applications. 

!!! info "Related Topics"
    -   [Concept: Configuring SAML Front Channel Logout](TODO:insert-link-to-concept)
    -   [Guide: Configure SAML 2.0 Front Channel Logout](../../../quick-starts/saml-front-channel-logout)
