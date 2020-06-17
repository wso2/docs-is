# Enable Login for a Custom Web Application

WSO2 Identity Server provides a way to decouple authentication functionality from the standard authentication protocols such as OAuth 2.0, OpenID Connect, SAML 2.0 and WS-Federation, etc. 

With this approach, the logic for processing an inbound authentication request will be written as an OSGi component (pluggable Java artifacts) called an inbound authenticator. To integrate an application which is not written based on a standard protocol, you can write a custom inbound authenticator and plug it to WSO2 Identity Server.

---

This guide assumes you have your own web application and a custom inbound authenticator. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/webapp-custom-sample" rel="nofollow noopener">Try it with the sample</a>

----

{!fragments/deploying-sample-apps.md!}

----

## Deploy the inbound authenticator

Copy the authenticator to the ```<IS_HOME>/repository/components/dropins``` directory.

----

(TODO: dev-portal-fragment)

{!fragments/register-a-service-provider.md!}

4. Expand **Inbound Authentication Configuration** and select the relevant configurations according to the custom inbound authenticator you deployed.

-----

!!! info "Related Topics"
    - [Demo: Enable Login for a Sample Custom Web Application](../../../quick-starts/webapp-custom-sample)
    - [Guide: Write a Custom Inbound Protocol](TODO:insert-link)
