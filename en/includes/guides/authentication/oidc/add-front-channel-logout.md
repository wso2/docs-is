
{% if product_name == "WSO2 Identity Server" %}
# Implement front-channel logout

Front-channel logout lets the authorization server notify client applications to end a user's session through the user's browser via iframes.

Use front-channel logout when client applications cannot accept server-to-server (back-channel) requests but can receive browser-delivered logout notifications.

For protocol details see the OpenID specification: [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html).

### Configure front-channel logout URL
If your application support OIDC Frontchannel logout, you can configure the logout URL of the application in the Console. That endpoint can listen to OIDC Frontchannel logout requests from {{ product_name }}, and terminate the application's sessions.

To get started, you need to have an application registered in {{ product_name }}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).


To configure Frontchannel logout URL:

1. On the {{ product_name }} Console, go to Applications.

2. Click on your Applications and click Protocol section.

3. Enter the front channel logout URL of your application under `Front channel logout URL`
   
   ![oidc-logout]({{base_path}}/assets/img/guides/oidc-logout/oidc-frontchannel-logout-configuration.png)

## How it works

![oidc-front-channel-logout-scenario]({{base_path}}/assets/img/guides/oidc-logout/oidc-frontchannel-logout-scenario.png)

The front-channel logout flow works as follows:

1. User initiates a logout request via an application.
2. {{ product_name }} terminates the user's session.
3. {{ product_name }} responds with an HTML page that embeds an iframe for each application that has a front-channel logout URI configured.
5. After successful logout, if the client provided a valid `post_logout_redirect_uri` as part of the RP-initiated logout, the user agent is redirected there (not shown in the figure).

!!! note
        **Cross-site cookie considerations**

        Front-channel logout uses GET requests delivered via iframes to notify client domains. While GET requests in iframes have good browser support, modern browsers restrict third-party cookies and cross-site tracking, which can cause logout to fail.

        *Recommendations:*

        - Prefer [back-channel logout]({{base_path}}/guides/authentication/oidc/add-back-channel-logout/) for reliable server-to-server session termination, as it does not depend on browser cookie policies.
        - Consider hosting applications on subdomains of a shared parent domain (for example, `app1.example.com` and `app2.example.com`) so cookies can use `Domain=.example.com` and become first-party.

## Try it out

This demonstration uses two playground applications to show how front-channel logout works when a user logs out from one app and {{ product_name }} notifies other apps with active sessions.

### Prerequisites

- [Register two OIDC applications with {{ product_name }}]({{base_path}}/guides/applications/register-oidc-web-app/). 
- [Download two instances of the playground application](https://github.com/wso2/samples-is/releases/download/v4.5.2/playground2.war). Rename the second file to `playground3.war`.
- This guide uses `Playground_app1` and `Playground_app2` as example application names.

- Configure the sample applications:

    1. Copy the downloaded `playground*.war` files into `<TOMCAT_HOME>/apache-tomcat-<version>/webapps`.
    2. Start the Tomcat server.
    3. If required, update the `<param-value>` parameters for `serverUrl`, `username` and `password` in each application's `WEB-INF/web.xml`.
    4. Restart Tomcat if you changed the `WEB-INF/web.xml` files.

### Configure front-channel logout URLs

1. Configure front-channel logout for `Playground_app1`:

    1. In the {{ product_name }} Console, go to **Applications** and select the OIDC application for `Playground_app1`.
    2. Go to the **Protocol** tab and enter the following:

        | Field name    | Value |
        |---------------|-------|
        | Grant type    | Code |
        | Front channel logout URL | http://localhost:8080/playground3/fclogout |

    3. Click **Update**.

2. Configure front-channel logout for `Playground_app2`:

    1. In the {{ product_name }} Console, go to **Applications** and select the OIDC application for `Playground_app2`.
    2. Go to the **Protocol** tab and enter the following:

        | Field name    | Value |
        |---------------|-------|
        | Grant type    | Code |
        | Front channel logout URL | http://localhost:8080/playground2/fclogout |

    3. Click **Update**.

### Test the flow

1. Open the `Playground_app1` application at: http://localhost:8080/playground2/

2. Click **Import Photos** and provide the following values when authorizing:

    | Field name | Value |
    |------------|-------|
    | Authorization Grant Type | `Code` |
    | Client ID | The OAuth Client ID for `Playground_app1` |
    | Callback URL | `http://localhost:8080/playground2/oauth2client` |
    | Authorize Endpoint | `https://localhost:9443/oauth2/authorize` |

3. Click **Authorize** and sign in. Confirm you receive an ID token and the app shows you as logged in.

4. Open the `Playground_app2` application at: http://localhost:8080/playground3/ and repeat steps 2–3 for `Playground_app2`.

5. Click **Logout** in one of the playground applications. The authorization server will render a front-channel logout page that triggers browser-based calls to each registered front-channel logout endpoint.

6. Reload the other application. You should be redirected to its login page and the logged-in user should be cleared.

You have successfully configured and tested OIDC front-channel logout. Check the browser developer console and Tomcat logs to observe the front-channel logout requests and responses.

{% endif %}