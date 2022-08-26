# Enable Login for a SAML Web Application

This page guides you through enabling login for a [SAML]({{base_path}}/references/concepts/authentication/intro-saml/) web application.

{!./includes/pickup-dispatch-saml.md!}

## Try it out

Now, let's log in to the application.

1. Start the Tomcat server and access the following URL on your browser: `http://localhost:8080/saml2-web-app-pickup-dispatch.com`.

2. Click **Login** and enter your user credentials.

3. Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

You have successfully configured authentication for a SAML application.

!!! info "Related topics"
    - [Concept: SAML]({{base_path}}/references/concepts/authentication/intro-saml/)
    - [Quick Start: SAML Authentication]({{base_path}}/get-started/sample-use-cases/single-sign-on/#try-sso-with-saml-20)
    - [Guide: Advanced SAML Configurations]({{base_path}}/guides/login/saml-app-config-advanced/)
    - [Guide: SAML Front-Channel Logout]({{base_path}}/guides/login/saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout]({{base_path}}/guides/login/saml-back-channel-logout)
