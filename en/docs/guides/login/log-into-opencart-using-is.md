# Logging in to OpenCart using the Identity Server

OpenCart is a popular open source platform facilitating trading products online, making it a one-stop solution for e-commerce businesses. This topic provides instructions on configuring OpenCart and WSO2 Identity Server (WSO2 IS) to enable users to log in to OpenCart using your WSO2 Identity Server credentials. In this tutorial, WSO2 Identity Server acts as the identity provider and the miniOrange SAML Single Sign on (SSO) third party plugin acts as the SAML 2.0 service provider which can be configured to establish the trust between the plugin and WSO2 IS to securely authenticate the user to the Opencart store.

## The flow

The diagram below demonstrates the flow of how OpenCart uses WSO2 Identity Server as a SAML2 federated authenticator to authenticate a user.

<!-- ![opencart-is-flow]({{base_path}}/assets/img/tutorials/opencart-is-flow.png) -->

!!! tip "Before you begin!"
    You need to have OpenCart installed. Refer: [https://docs.opencart.com/installation/](https://docs.opencart.com/installation/)

Let's get started!

## Configure OpenCart

### Install SAML SSO extension

1. Visit the [OpenCart extension store](https://www.opencart.com/index.php?route=marketplace/extension) and download 
the miniorange saml service provider extension.
    <!-- ![opencart-extension-store]({{base_path}}/assets/img/tutorials/opencart-extension-store.png) -->

2. Login to the OpenCart dashboard as administrator.

3. Navigate to **Extensions > Installer** from the admin dashboard.

4. Click on the **Upload** button and select the downloaded miniorange saml sp extension.
    <!-- ![opencart-miniorange-install]({{base_path}}/assets/img/tutorials/opencart-miniorange-install.png) -->

5. Navigate to **Extensions > Extensions** and choose the extension type as **Modules**.
    <!-- ![opencart-extensions-modules]({{base_path}}/assets/img/tutorials/opencart-extensions-modules.png) -->

6. In the module list, you will see MiniOrange SAML SP. Click on the install button, [ + ] .

### Configure the SAML SSO extension

1. Click on the **Edit** icon to start configuring the extension.
    <!-- ![opencart-edit-miniorange]({{base_path}}/assets/img/tutorials/opencart-edit-miniorange.png) -->

2. Provide an application name.

3. In the **Service Provider Metadata** tab, you will find the **SP Entity ID** and **ACS Url** which will be needed 
later for identity provider configurations.
    <!-- ![opencart-miniorange-sp-meta]({{base_path}}/assets/img/tutorials/opencart-miniorange-sp-meta.png) -->

4. In the **Identity Provider Setup** tab, provide the values for **Entity ID**, **Single Login URL** and
**SAML x509 Certificate**. These values should match with the SAML metadata values available in the identity provider.

    !!! tip "Extract SAML metadata values"

        1. Login to WSO2 IS as the administrator.
        2. Under the **Main** tab, select **Resident Identity Provider** under **Identity Providers**.
        3. Expand the **Inbound Authentication Configuration** section.
        4. Select **SAML2 Web SSO Configuration** and **Download SAML Metadata**.
        5. The downloaded xml file contains the relevant information required for the identity provider setup.

    <!-- ![opencart-miniorange-idp]({{base_path}}/assets/img/tutorials/opencart-miniorange-idp.png) -->

5. Add the relevant IdP attributes by navigating to **Attribute Mapping** tab.
    1. First name: ```http://wso2.org/claims/givenname```
    2. Last name: ```http://wso2.org/claims/lastname```

    <!-- ![opencart-miniorange-attribute-mapping]({{base_path}}/assets/img/tutorials/opencart-miniorange-attribute-mapping.png) -->

6. Save the configurations.

### Add the SAML SSO extension to view layout

1. Navigate to **Design > Layouts** from the admin dashboard. Select the **Edit** icon adjacent to Account.
    <!-- ![opencart-layout-edit]({{base_path}}/assets/img/tutorials/opencart-layout-edit.png) -->

2. Choose a preferred display position for the module and add it by selecting the MiniOrange SAML SP from the dropdown.
    <!-- ![opencart-miniorange-add-layout]({{base_path}}/assets/img/tutorials/opencart-miniorange-add-layout.png) -->

3. Save the settings after adding the module to the display.

## Configuring the service provider in WSO2 Identity Server

1. Sign in to the WSO2 Identity Server [Management Console]({{base_path}}/setup/getting-started-with-the-management-console/).

2. On the **Main** menu, click **Identity > Service Providers > Add**.

3. Fill in the **Service Provider Name** and provide a brief **Description** of the service provider. Only 
Service Provider Name is a required field and you can use Opencart-SP as the name for this example.

4. Expand **Claim Configuration**.
    1. Select **Use Local Claim Dialect**.
    2. For **Requested Claims**, add the following claim URIs.
        1. ```https://wso2.org/claims/lastname```
        2. ```https://wso2.org/claims/givenname```
    3. Set **Subject Claim URI** to ```https://wso2.org/claims/emailaddress```.

    <!-- ![opencart-is-claim-config]({{base_path}}/assets/img/tutorials/opencart-is-claim-config.png) -->

5. Expand the **Inbound Authentication Configuration > SAML2 Web SSO Configuration** section and click **Configure**.
    In the form that appears, fill out the following configuration details required for single sign-on. 
    For more details on these attributes, refer 
    [SAML2 Web SSO Configuration]({{base_path}}/learn/configuring-inbound-authentication-for-a-service-provider#configuring-inbound-authentication-with-saml2-web-sso).
    1. For the value of **Issuer**, provide the SP Entity ID obtained as Service Provider Metadata when configuring
    SAML SSO extension in OpenCart.
    2. For the value of **Assertion Consumer URL**, provide the ACS Url obtained as Service Provider Metadata when configuring SAML SSO extension in OpenCart.
    3. Uncheck **Enable Signature Validation in Authentication Requests and Logout Requests**.
    4. Check **Enable Attribute Profile** and **Include Attributes in the Response Always**.
    5. Save the configuration.

    <!-- ![opencart-is-saml-sp-config]({{base_path}}/assets/img/tutorials/opencart-is-saml-sp-config.png) -->

## Try it out

1. Visit the OpenCart site and click on login.
    <!-- ![opencart-login]({{base_path}}/assets/img/tutorials/opencart-login.png) -->

2. In the next view click on ‘Login with $app’ where $app is the application name you have provided when configuring the SSO extension.
    <!-- ![opencart-sso-login-button]({{base_path}}/assets/img/tutorials/opencart-sso-login-button.png) -->

3. You will be redirected to WSO2 Identity Server login page. Login by providing credentials of a user in WSO2 IS.
    <!-- ![opencart-is-sso-login]({{base_path}}/assets/img/tutorials/opencart-is-sso-login.png) -->

4. Upon successful login you will be logged in to OpenCart.
    <!-- ![opencart-sso-success.png]({{base_path}}/assets/img/tutorials/opencart-sso-success.png) -->

5. The user profile attributes configured in WSO2 Identity Server will be populated in the Personal details of your
account.
    <!-- ![opencart-sso-account-info.png]({{base_path}}/assets/img/tutorials/opencart-sso-account-info.png) -->

