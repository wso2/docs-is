# Passwordless login with HYPR

[HYPR](https://www.hypr.com/) is a passwordless authentication method that allows users to log in to applications using biometrics on their devices. As a FIDO-certified platform, HYPR eliminates risks prevalent in password-based authentication, such as phishing and password reuse.

This guide explains how you can use HYPR to add passwordless login to applications registered in the Identity Server.

## Prerequisites

- You need to configure the HYPR environment and have access to the HYPR control center. Learn how to do it in the [HYPR documentation](https://docs.hypr.com/hyprcloud/docs/cc-std).
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.

## Set up the authenticator
The HYPR authenticator has been introduced as a connector for IS 6.2.0. In order to use this authenticator, first, you should download the connector from the WSO2 Connector Store.

### Download and install the HYPR authenticator

To download and install the HYPR connector:

1. Download the [HYPR Authenticator](https://store.wso2.com/store/assets/isconnector/details/9fae98d3-26a6-4b1f-a356-f58b08d060ed) from the WSO2 connector store.
2. Copy and paste the downloaded `.jar` file to `<IS_HOME>/repository/components/dropins`.
3. Download the [HYPR artifacts](https://store.wso2.com/store/assets/isconnector/details/9fae98d3-26a6-4b1f-a356-f58b08d060ed) from the WSO2 connector store and extract the `.zip` file.
4. Copy the `org.wso2.carbon.identity.application.authenticator.hypr.common-1.0.3.jar` file from the extracted folder and paste it to `<IS_HOME>/repository/components/lib`.

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
    ```

### Deploy the HYPR login page

To deploy the HYPR login page from the extracted artifacts folder, copy the `hyprlogin.jsp` and paste it to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint` folder.

## Configure HYPR as a federated authenticator

To configure WSO2 IS with HYPR as a federated authenticator.

1. On the Management console, go to **Main** > **Identity** > **Identity Providers** > **Add**.
2. Enter an **Identity Provider Name**, **Display Name**, and **Description**.
4. Expand the **Federated Authenticators** > **HYPR Configuration** and fill in the following details:

    | Field name    | Description   |
    |---------------|---------------|
    | Enable        | Select this to enable HYPR authenticator for the login flow of the application    |
    | Default       | Select this if the HYPR authenticator should be the default authenticator for the application    |
    | Base URL      | This refers to the base URL you received from HYPR upon creating a tenant for your organization.  |
    | Relying Party App ID  | This refers to the App ID you received for the application you created in the HYPR Control Center.    |
    | API Token     | This refers to a new API token that is specifically generated for the HYPR App via the Control Center.    |

    ![HYPR configurations]({{base_path}}/assets/img/guides/hypr-configurations.png)

6. Click **Update** to save the configurations.

## Enable HYPR login for the application

To configure HYPR as an authenticator for your application:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.
2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.
3. Expand the **Local and Outbound Authentication Configuration** section.
4. For **Authentication Type**, select the **Federated Authentication** option and then select the identity provider name of the configured HYPR authenticator from the list.
    ![Add HYPR authenticator to application]({{base_path}}/assets/img/guides/add-hypr-to-app.png)
5. Click **Update** to save the configurations.

## Try it out

1. Access the following sample PickUp application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`
2. Click **Login**, enter your username, and click **Continue**.
3. A push notification will be sent to your smartphone. Perform the necessary actions on your smart device.

    Upon successful verification on your smart device, you will be logged into the application successfully.