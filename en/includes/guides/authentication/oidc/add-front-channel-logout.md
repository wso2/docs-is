
{% if product_name == "WSO2 Identity Server" %}

# Implement OIDC front-channel logout

Front-channel logout lets the authorization server notify client applications to end a user's session through the user's browser via iframes.

Use front-channel logout when client applications cannot accept server-to-server (back-channel) requests but can receive browser-delivered logout notifications.

For protocol details see the OpenID specification: [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html).

## How it works

![oidc-front-channel-logout-scenario]({{base_path}}/assets/img/guides/oidc-logout/oidc-frontchannel-logout-scenario.png)

The front-channel logout flow works as follows:

1. The client application initiates a user logout.
2. {{ product_name }} terminates the user's session.
3. {{ product_name }} identifies all the client applications associated with the user's session.
4. {{ product_name }} responds with an HTML page that embeds an iframe for each application that has a front-channel logout URI configured.
5. Upon receiving the logout request, each client application validates the requests and proceeds to invalidate the corresponding user session.

## Configure front-channel logout URL

If your application supports OIDC front-channel logout, you can configure the logout URL of the application in the Console. That endpoint can listen to OIDC front-channel logout requests from {{ product_name }}, and terminate the application's sessions.

To get started, you need to have an application registered in {{ product_name }}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).

Follow the steps below to register the front-channel endpoint of your application with {{product_name}}.

!!! note "Before you begin"

    [Register your OIDC application]({{base_path}}/guides/applications/) in {{product_name}}.

1. On the {{product_name}} Console, go to **Applications** and select your OIDC application.

2. Go to the **Protocol** tab, and under **Logout URLs**, enter the **Front channel logout URL**.

       ![oidc-logout]({{base_path}}/assets/img/guides/oidc-logout/oidc-frontchannel-logout-configuration.png)

3. Click **Update** to save your configurations.

=== "Logout request format"

    ```url
    http://myapp.com?iss={{product_url_format}}/oauth2/token&sid={sid_value}
    ```

=== "Example request"

    ```url
    http://myapp.com?iss={{product_url_sample}}/oauth2/token&sid=15043ffc-****-****-****-9b107f7da38c
    ```

!!! note

    **Cross-site cookie considerations**

    Front-channel logout uses GET requests delivered via iframes to notify client domains. While GET requests in iframes have good browser support, modern browsers restrict third-party cookies and cross-site tracking, which can cause logout to fail.

    *Recommendations:*

    - Prefer [back-channel logout]({{base_path}}/guides/authentication/oidc/add-back-channel-logout/) for reliable server-to-server session termination, as it does not depend on browser cookie policies.
    - Consider hosting applications on subdomains of a shared parent domain (for example, `app1.example.com` and `app2.example.com`) so cookies can use `Domain=.example.com` and become first-party.

{% endif %}
