
{% if product_name == "WSO2 Identity Server" %}
# Implement back-channel logout

Back-channel logout allows users to be logged out from a client application through direct communication of logout requests between the client application and the authorization server.

## How it works

The underlying message flow of OpenID Connect (OIDC) back-channel logout is as follows:

1. A user logout is initiated by either the client application or the authorization server.
2. The authorization server identifies all client applications associated with the user's session.
3. The authorization server generates a logout token, a special JWT containing specific claims, and sends it with a logout request to the logout endpoints of the identified client applications.
4. Upon receiving the logout token, each client application validates it and then invalidates the corresponding user session.

## Prerequisites
To get started, you need to:
  
- [Register two OIDC application with {{ product_name }}]({{base_path}}/guides/applications/register-oidc-web-app/). Application names used in this guide are `Playground_app1` and `Playground_app2`

- [Download two instances of the playground application](https://github.com/wso2/samples-is/releases/download/v4.5.2/playground2.war) as this guide uses the playground sample app. Rename the second file as `playground3.war`.

- Configure the sample applications;

    1. Copy the downloaded playground.war file into `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder.
    2. Start the Tomcat server.
    3. If required, update the `<param-value>` parameters for the `serverUrl`, `username` and `password` in the `WEB-INF/web.xml` file.
    4. Restart the Tomcat server, if you have done any changes to the `WEB-INF/web.xml` file.

## Configure back-channel logout

- To configure back-channel logout for `Playground_app1`:

    1. On the WSO2 Identity Server Console, go to **Applications** and select your OIDC application.
    2. Go to the **Protocol** tab and enter the following details:

        | Field Name    | Value |
        |---------------|-------|
        | Grant type    | Implicit  |
        | Back channel logout URL   | http://localhost:8080/playground3/bclogout    |

    3. Click **Update** to save your configurations.

- To configure back-channel logout for `Playground_app2`:

    1. On the WSO2 Identity Server Console, go to **Applications** and select your OIDC application.
    2. Go to the **Protocol** tab and enter the following details:

        | Field Name    | Value |
        |---------------|-------|
        | Grant type    | Implicit  |
        | Back channel logout URL   | http://localhost:8080/playground2/bclogout    |

    3. Click **Update** to save your configurations.

## Try it out

1. Access the **Playgrpund_app1** application using the following URL: http://localhost:8080/playground2/.

2. Click **Import Photos**.

3. Enter the following details:

    | Field name  | Value |
    |-------------|-------|
    | **Authorization Grant Type**  | `Implicit`  |
    | **Client ID**     | The OAuth Client ID received when registering the Playground_app1 in WSO2 Identity Server.  |
    | **Callback URL**  | `http://localhost:8080/playground2/oauth2client`  |
    | **Authorize Endpoint**  | `https://localhost:9443/oauth2/authorize` |

4. Click **Authorize**. You will be redirected to the WSO2 Identity Server login page.

5. Enter the credentials of your user account and click Sign In. You will now receive an ID Token.

6. Access the **Playground_app2** application using the follwoing URL: http://localhost:8080/playground3/

7. Repeat steps 2-5 for **Playground_app2** application with the following values:

    | Field name  | Value |
    |-------------|-------|
    | **Authorization Grant Type**  | `Implicit`  |
    | **Client ID**     | The OAuth Client ID received when registering the Playground_app2 in WSO2 Identity Server.  |
    | **Callback URL**  | `http://localhost:8080/playground3/oauth2client`  |
    | **Authorize Endpoint**  | `https://localhost:9443/oauth2/authorize` |

8. Click **Logout** on one of the applications. You will be prompted to consent to the logout.

9. Provide consent. You will receive confirmation of sucessful logout.

10. Now, go to the other application and reload the page. Note that you are redirected to the login page of the playground application and you will see that the **Logged in user** has changed to `null`.

You have successfully configured and tried out OIDC back-channel logout. You can check out the Tomcat logs on the terminal window to see the back-channel logout flow.

{% endif %}