{% set product_name = "WSO2 Identity Server" %}
# Add HYPR login

[HYPR](https://www.hypr.com/) is a passwordless authentication method that allows users to log in to applications using biometrics on their devices. As a FIDO-certified platform, HYPR eliminates risks prevalent in password-based authentication such as phishing, and password reuse.

This guide explains how you can use  HYPR to add passwordless login to applications registered in your {{ product_name }} organization.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

- You need to configure the HYPR environment and have access to the HYPR control center. Learn how to do it in the [HYPR documentation](https://docs.hypr.com/hyprcloud/docs/cc-std).

## Register application in HYPR

Follow the steps below to register your application in the HYPR control center.

!!! note
    You can follow the [HYPR documentation](https://docs.hypr.com/hyprcloud/docs/cc-adv-application-new) for detailed instructions.

1. Go to the HYPR control center and click **Add Application**.
    <!-- ![Add application in HYPR control center]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-add-app.png) -->

2. Select **Web** as the channel and click **Next**.
    <!-- ![Select channel as web]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-web-channel.png) -->

3. Select **Custom Solution** as the IdP provider and click **Next**.
    <!-- ![Select IdP]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-select-idp.png) -->

4. Enable push notifications and click **Next**.
    <!-- ![Enable push notifictions]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-enable-push-notifications.png) -->

5. Add your Firebase configurations and click **Next**.

    !!! note
        To enable push notifications, you need to configure Firebase and obtain a project ID and an API key. To learn how to do this, follow the [guide in HYPR](https://docs.hypr.com/hyprcloud/docs/cc-adv-configuring-push-notifications-firebase).

    <!-- ![Add Firebase configurations]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-add-firebase-configs.png) -->

6. Complete the app details form and click **Done** to create the application.

7. Select your application from the **Choose an App** menu and note down the App ID.

## Create an API token in HYPR

When you register HYPR as a connection in {{ product_name }}, you need to provide an API token, which {{ product_name }} can use to access HYPR APIs.

Follow the steps below to obtain an API token.

1. Go to the HYPR control center and select your application.

2. Under **Advanced Config**, click **Access Tokens**.
    <!-- ![Select access tokens]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-access-tokens.png) -->
3. Click **Create Token**, provide a unique name for your token, select **API Token** as the token type, and click **Next**.
    <!-- ![Create an access token]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-create-token.png) -->

4. Select **User Management** and **Authentication** as the permission types and click **Next**.
    <!-- ![Select the permission level for the access token]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-permissions-api-token.png) -->

5. Take a note of the API token that you have created.

    !!! warning
        The token is only shown once.

## Set up the authenticator
The HYPR authenticator has been introduced as a connector for IS 7.0.0. In order to use this authenticator, first, you should download the connector from the WSO2 Connector Store.

### Download and install the HYPR authenticator

To download and install the HYPR connector:

1. Download the [HYPR Authenticator](https://store.wso2.com/store/assets/isconnector/details/9fae98d3-26a6-4b1f-a356-f58b08d060ed) from the WSO2 connector store.
2. Copy and paste the downloaded `.jar` file to `<IS_HOME>/repository/components/dropins`.
3. Download the [HYPR artifacts](https://store.wso2.com/store/assets/isconnector/details/9fae98d3-26a6-4b1f-a356-f58b08d060ed) from the WSO2 connector store and extract the `.zip` file.
4. Copy the `org.wso2.carbon.identity.application.authenticator.hypr.common-*.jar` file from the extracted folder and paste it to `<IS_HOME>/repository/components/lib`.
5. Copy the `hypr` folder from the extracted folder and paste it to `<IS_HOME>/repository/resources/identity/extensions/connections`.

### Deploy the HYPR Rest API

To deploy the HYPR Rest API:

1. Copy the `api#hypr.war` file from the extracted artifacts folder and paste it to `<IS_HOME>/repository/deployment/server/webapps`.
2. Add the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [[resource.access_control]]
    context = "(.*)/api/hypr/v1/authentication/status/(.*)"
    secure = "false"
    http_method = "GET"

    [tenant_context]
    enable_tenant_qualified_urls = "true"
    enable_tenanted_sessions = "true"
    rewrite.custom_webapps=["/api/hypr/"]

    [console.ui]
    hiddenConnectionTemplates = []
    ```

### Deploy the HYPR login page

To deploy the HYPR login page from the extracted artifacts folder, copy the `hyprlogin.jsp` and paste it to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint` folder.

## Register HYPR in {{ product_name }}

Follow the steps below to register HYPR as a connection in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.

2. Click **Create Connection** and select **HYPR**.

3. Enter the following details and click **Finish**:
    <!-- ![Enter details to add HYPR to {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-add-connection.png) -->

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name to identify the connection.</td>
      </tr>
      <tr>
          <td>Relying Party App ID</td>
          <td>The App ID you receive when you [register your app in HYPR](#register-application-in-hypr).</td>
      </tr>
      <tr>
          <td>Base URL</td>
          <td>The base URL of your HYPR server deployment.</td>
      </tr>
      <tr>
          <td>API Token</td>
          <td>The token you recieve when you [create an API token in HYPR](#create-an-api-token-in-hypr).</td>
      </tr>
    </table>

## Enable HYPR login

!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the {{ product_name }} Console, go to **Applications**.

2. Go to the **Sign-in Method** tab of the application and add Magic link login from your preferred editor:

    ---
    === "Classic Editor"
        To add passwordless login with HYPR using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the same step and select your HYPR connection.

            ![Add HYPR to the login flow]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-enable-login.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
        
        3. Enable **Conditional Authentication** and add the following script.

            ``` js
            var onLoginRequest = function onLoginRequest(context) {

            var fedUser;
            executeStep(1,
                {
                    onSuccess: function (context) {
                        var idpName = context.steps[1].idp;

                        if (idpName === "HYPR") {
                            fedUser = context.currentKnownSubject;

                            var associatedUser = getAssociatedLocalUser(fedUser);
                            if (associatedUser == null) {
                                var claimMap = {};
                                claimMap["http://wso2.org/claims/username"] = fedUser.username;
                                var storedLocalUser = getUniqueUserWithClaimValues(claimMap, context);
                                if (storedLocalUser !== null) {
                                    doAssociationWithLocalUser(fedUser, storedLocalUser.username, 
                                        storedLocalUser.tenantDomain, storedLocalUser.userStoreDomain);
                                }
                            }
                        }
                    }
                });
            };
            ```

    === "Visual Editor"
        To add passwordless login with HYPR using the Visual Editor:
  
        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.
        
        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your HYPR connection.
            
            ![Add HYPR to the login flow using the visual editor]({{base_path}}/assets/img/guides/passwordless/hypr/add-hypr-login-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Expand the **Script Editor** and add the following script.

            ``` js
            var onLoginRequest = function onLoginRequest(context) {

                var fedUser;
                executeStep(1,
                    {
                        onSuccess: function (context) {
                            var idpName = context.steps[1].idp;

                            if (idpName === "HYPR") {
                                fedUser = context.currentKnownSubject;

                                var associatedUser = getAssociatedLocalUser(fedUser);
                                if (associatedUser == null) {
                                    var claimMap = {};
                                    claimMap["http://wso2.org/claims/username"] = fedUser.username;
                                    var storedLocalUser = getUniqueUserWithClaimValues(claimMap, context);
                                    if (storedLocalUser !== null) {
                                        doAssociationWithLocalUser(fedUser, storedLocalUser.username, 
                                            storedLocalUser.tenantDomain, storedLocalUser.userStoreDomain);
                                    }
                                }
                            }
                        }
                    });
            };
            ```

    ---

3. Click **Update** to save the sign-in flow.

## Try it out

!!! note "Before you begin"
    - Make sure you have a user account in the application registered in the HYPR control center.
    - Download the HYPR app to your mobile device and pair the device to your user account in HYPR.
    <br/>
    See [HYPR documentation](https://docs.hypr.com/hyprcloud/docs/mobile-app-overview) for more details.

Follow the steps given below:

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, click **Sign In With HYPR**.

    ![Sign in with HYPR]({{base_path}}/assets/img/guides/passwordless/hypr/hypr-sign-in-with-hypr.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Enter the username of an existing HYPR user.

5. Use the HYPR mobile application to complete the log in.