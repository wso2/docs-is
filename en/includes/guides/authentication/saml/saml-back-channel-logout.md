# Back-channel logout

This guide explains SAML back-channel logout and how to implement it with WSO2 Identity Server.

## Overview

SAML logout enables a user to log out of an application and automatically log out of other applications without needing to manually log out from each application. You can implement log out in two ways:

- **Asynchronous binding (front-channel logout)** - Uses the user’s browser and redirects to propagate logout requests. Simpler but less reliable, as it depends on the browser session being active.
- **Synchronous binding (back-channel logout)** - Uses direct server-to-server communication to log out users from all connected applications reliably. End-to-end security can be ensured using mutually authenticated TLS (MTLS).

**Back-channel logout** provides reliable, consistent logout across all applications because the logout requests are exchanged directly between servers. This server-to-server communication doesn't rely on the user's browser, ensuring that all sessions are terminated even if the user closes the tab or loses connectivity. The following diagrams explain the two use cases for which you can use back-channel logout.

=== "Service Provider (SP)-initiated logout"

    SP-initiated logout occurs when the user starts the logout process from a Service Provider (SP) application, rather than from the Identity Provider (IdP) directly.

    ![SP-initiated back-channel logout]({{base_path}}/assets/img/guides/authentication/saml/back-channel-sp-initiated-logout.png)

    During this flow,

    - The SP generates an SP-initiated logout request and send it to the Identity Provider (IdP).

    - IdP sends logout requests to all the SPs that have enabled Single Logout (SLO).

    - Since the user has an active session in Application B, it will invalidate its local session associated with the session index ID. This repeats for all session participants.

    - IdP sends a logout response to Application A.

    - Application A invalidates the user session associated with the session index ID and redirects the user to the logout page.

=== "Identity Provider (IdP)-initiated logout"

    IdP-initiated logout occurs when the user triggers the logour process directly from the Identity Provider (IdP).

    ![IdP-initiated back-channel logout]({{base_path}}/assets/img/guides/authentication/saml/back-channel-idp-initiated-logout.png)

    During this flow,

    - The user triggers a logout directly from the IdP.

    - IdP sends logout requests to all the SPs in the same SAML SSO session (Application A and Application B).

    - All SPs invalidate their local user sessions.

    - IdP redirects the user to a pre-configured logout page.

## Enable and configure Back channel logout

For your applications to seamlessly logout, follow the steps below:

1. On the WSO2 Identity Server Console, go to **Applications** and select your registered SAML application.

2. In the Protocol tab of your application, under **Single Logout Profile**,

    - select the **Enable SLO** checkbox.

    - select the **Logout method** as **Back Channel**.

    - enter a **Single logout response URL**. During SP-initiated logout, after {{product_name}} receives the initial LogoutRequest from your application and completes the logout process, it sends the corresponding LogoutResponse to this URL. This defaults to your application's Assertion Consumer Service (ACS).

    - enter a **Single logout request URL**. When a user initiates logout from another service provider or from {{product_name}} directly, {{product_name}} will notify your application by sending a logout request to this URL. This defaults to your application's Assertion Consumer Service (ACS).

    - Under **IdP initiated single logout**,

        - select the checkbox to enable it.

        - enter the **Return to URLs** to set up a URL in your application that the user should be redirected after logout. This defaults to your application's Assertion Consumer Service (ACS).

    !!! note

        Learn more about [SAML 2.0 application configurations]({{base_path}}/references/app-settings/saml-settings-for-app/).

3. Click **Update** to save the changes.

## Try it out

The following guide walks you through setting up sample applications to see SAML back-channel logout in action.

### Set up the samples

1. Download and install [Apache Tomcat version 8.X](https://tomcat.apache.org/tomcat-8.5-doc/building.html){: target="_blank"}.

2. Download the [pickup dispatch](https://github.com/wso2/samples-is/releases/download/v4.6.2/saml2-web-app-pickup-dispatch.com.war) and the [pickup manager](https://github.com/wso2/samples-is/releases/download/v4.6.2/saml2-web-app-pickup-manager.com.war) sample applications.

3. Copy the `saml2-web-app-pickup-dispatch.com.war` and the `saml2-web-app-pickup-manager.com.war` files into the `/webapps` folder of your Tomcat installation.

4. Start the Tomcat server.

!!! note

    Learn more about the /webapps directory location and Tomcat commands in the [Tomcat documentation](https://tomcat.apache.org/tomcat-8.0-doc/deployer-howto.html){: target="_blank"}.

### Configure Cross Origin Cross-Origin Resource Sharing (CORS)

SAML2 POST Binding sends the SAML response via browser POST, creating a cross-origin request when the SP and {{product_name}} use different domains. To Configure {{product_name}} to allow requests from the SP’s domain,

1. Open the `IS_HOME/repository/conf/deployment.toml` file and add the following configurations.

    ```toml
    [cors]
    allow_generic_http_requests = true
    allow_any_origin = false
    allowed_origins = [
        "http://localhost:8080" 
    ]
    allow_subdomains = false
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

    !!! note

        If your are using a different URL, add that as an allowed origin.

2. Restart {{product_name}}.

### Integrate application with {{product_name}}

To integrate the sample applications,

1. [Register your SAML applications in {{product_name}}]({{base_path}}/guides/applications/register-saml-web-app/) with the following information.

    - Pickup dispatch:

        - **Issuer** - saml2-web-app-pickup-dispatch.com
        - **Assertion Consumer URL** - http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp

    - Pickup manager:

        - **Issuer** - saml2-web-app-pickup-manager.com
        - **Assertion Consumer URL** - http://localhost.com:8080/saml2-web-app-pickup-manager.com/home.jsp

2. On the **Protocol** tab of the created applications, [configure back-channel logout settings](#enable-and-configure-back-channel-logout).

3. Click **Update** to save the changes.

!!! note

    - The sample application has request and response signing enabled by default. If you want to try the flow without dealing with certificates, open the `<APP_HOME>/WEB-INF/classes/sso.properties` file and set all signing-related properties to false:

        ```bash
        SAML2.EnableResponseSigning=false
        SAML2.EnableAssertionSigning=false
        SAML2.EnableRequestSigning=false
        SAML2.EnableArtifactResolveSigning=false
        ```

    - If you prefer to keep the default signing behavior, extract the application's public certificate from `<APP_HOME>/WEB-INF/classes/wso2carbon.p12` and upload it to {{product_name}} under your application's **Protocol** > **Certificates**.

    - If you enable response signing, make sure to also enable **Protocol** > **Response Signing** > **Sign SAML responses** in your registered application, and upload the IdP certificate to the application (You can find it from the **Info** tab of your application).

### Try back-channel logout

Now that you have set the sample applications, follow the steps to try out back-channel logout.

1. Open both applications in separate browser tabs.

    ```bash
    http://localhost:8080/saml2-web-app-pickup-dispatch.com
    http://localhost:8080/saml2-web-app-pickup-manager.com
    ```

2. Log into the pickup dispatch application using your credentials.

3. Log into the pickup manager application. Since you already have an active session in Pickup Dispatch, you will be automatically signed in through SSO.

4. Log out of the pickup dispatch application. You will automatically be logged out of the pickup manager application.
