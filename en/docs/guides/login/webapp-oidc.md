# Enable Login for an OIDC Web Application

This page guides you through enabling login for an [OpenID Connect]({{base_path}}/references/concepts/authentication/intro-oidc) web application.

{!./includes/pickup-dispatch-oidc.md!}

----

## Try it out

Now, let's log in to the application.

1. Start the Tomcat server and access the following URL on your browser: `http://localhost:8080/pickup-dispatch/home.jsp`.

2. Click **Login** and enter your user credentials.

3. Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

You have successfully configured authentication for a SAML application.

!!! info "Related topics"
    - [Concept: OpenID Connect]({{base_path}}/references/concepts/authentication/intro-oidc)
    - [Guide: Advanced OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced)
    - [Guide: Authorization Code Grant]({{base_path}}/guides/access-delegation/authorization-code/)
    - [Guide: Manage User Sessions]({{base_path}}/guides/login/session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout]({{base_path}}/guides/login/oidc-backchannel-logout)
    - [Guide: OpenID Connect Discovery]({{base_path}}/guides/login/oidc-discovery)