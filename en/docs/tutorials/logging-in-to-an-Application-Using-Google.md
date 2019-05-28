# Logging in to an Application Using Google

This tutorial guides you through configuring Google and WSO2 Identity
Server (WSO2 IS) to enable users to log in to your application using
their Google credentials. In this tutorial, Google is configured as a
SAML2 federated identity provider (IdP) and a sample application called
"Pickup" acts as the service provider. Follow the instructions in the
sections below to set this up.

-   [Set up Google as a SAML
    IdP](#LoggingintoanApplicationUsingGoogle-SetupGoogleasaSAMLIdP)
-   [Configure Google as a SAML IdP in WSO2
    IS](#LoggingintoanApplicationUsingGoogle-ConfigureGoogleasaSAMLIdPinWSO2IS)
-   [Set up the sample
    application](#LoggingintoanApplicationUsingGoogle-Setupthesampleapplication)
-   [Trying it out](#LoggingintoanApplicationUsingGoogle-Tryingitout)

!!! tip
    
    Before you begin:
    
    1.  [Create a Google
        domain](https://www.bettercloud.com/monitor/the-academy/create-google-apps-domain-three-easy-steps/)
        .
    2.  [Download](https://tomcat.apache.org/download-80.cgi) and
        [install](https://tomcat.apache.org/download-80.cgi) Apache Tomcat
        version 8.\*.\* or higher.
    3.  Install WSO2 IS version 5.7.0. by downloading the
        [installer](https://wso2.com/identity-and-access-management/install/)
        .
    4.  Open the `           /etc/hosts          ` file, add the following
        entry, and restart your computer.  
        To avoid any IP address conflicts, ensure that this is the only
        entry for this IP address in the `           /etc/hosts          `
        file.
    
        !!! warning
            
                This step is only required if you wish to use a WSO2 IS sample
                application to try out this scenario. If you wish to use your own
                application instead, you can skip this step.
            

    ``` xml
    127.0.0.1       localhost.com
    ```


### Set up Google as a SAML IdP

1.  Access the Google Admin console by navigating to this URL:
    <https://admin.google.com/> .
2.  Log in using your administrator account.
3.  Click **Admin Console** .
4.  Click **Apps** and then click **SAML apps** .

    If you do not see the Apps button on the home page, click **More
    Controls** at the bottom of the page.

    ![](attachments/103331619/103331625.png){width="850"}

5.  Click on the **+**
    ![](attachments/103331619/103331632.png){width="38"} icon found at
    the bottom-right of the page.
6.  Click **SETUP MY OWN CUSTOM APP**  
    ![](attachments/103331619/103331631.png){width="517"}
7.  Click **Download** next to the **IDP Metadata** field to download
    the Google identity provider metadata.  
    A `          GoogleIDPMetadata.xml         ` file is downloaded on
    to your machine.  
    ![](attachments/103331619/103331630.png){width="531"}
8.  Click **Next** and enter an **Application Name** and **Description**
    for your application. This is the name and description that your
    users will see.  
    You can also upload an image of your logo.
9.  Click **Next** and enter the following details.

    In this tutorial, the **Start URL** configured below is the homepage
    URL of a WSO2 IS sample application called "Pickup".

    1.  **ACS URL:**
        `                         https://localhost:9443/commonauth                       `
    2.  **Entity ID:** `            wso2is1           `
    3.  **Start URL** :
        `                         http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp                       `
    4.  **Name ID Format:** `            EMAIL           `
        `                       `
        ![](attachments/103331619/103331629.png){width="525"}

10. Click **Next** and then click **Finish** .
11. Once the application is configured, click **Edit Service** and
    change the **Service Status** to **ON** . You can turn on the
    service for everyone or for some users only.

### Configure Google as a SAML IdP in WSO2 IS

1.  Start WSO2 Identity Server by navigating to
    `           <IS_HOME>/bin/          ` folder and running the
    following command.

    -   [**Windows**](#b31a646df7634910b4d66298ea91127d)
    -   [**Linux/Unix**](#0a624a8c58004a5ba2cbc2f8c89966f9)

    ``` java
    .\wso2server.bat
    ```

    ``` java
        sh wso2server.sh
    ```

2.  Log in to the management console using admin/admin credentials.
3.  Click **Add** under **Identity Providers** on the **Main** tab.
4.  Enter "GoogleIdP" as the identity provider name and expand
    **Federated Authenticators\>SAML2 Web SSO Configuration** .
5.  Select **Enable SAML2 Web SSO** and enter "wso2is1" as the **Service
    Provider Entity ID** .

    The **Service Provider Entity ID** value should be equal to the
    value you entered as the Entity ID when configuring Google.

6.  Select **Metadata File Configuration** as the **Mode** and upload
    the `          GoogleIDPMetadata         ` .xml file you downloaded
    earlier.  
    ![](attachments/103331619/103331628.png){width="598"}
7.  Click **Register** to save the identity provider configurations.
8.  Once the IdP is registered, it is listed under Identity
    Providers. Click **Edit** and expand **Federated
    Authenticators\>SAML2 Web SSO Configuration** .  
    ![](attachments/103331619/103331627.png){width="667"}
9.  Select **Enable Logout** and enter "
    https://accounts.google.com/logout" as the Logout URL .
    ![](attachments/103331619/103331626.png){width="687"}
10. Click **Update** to save the changes.

### Set up the sample application

!!! warning
    
    The instructions in this section are only required if you are using the
    Pickup sample application to try out this scenario. Skip the
    instructions in this section if you are using your own application
    instead.
    

1.  Download the
    [saml2-web-app-pickup-dispatch.com.war](attachments/103330657/103330678.war)
    file.
2.  Copy the .war file and paste it inside the
    `          <TOMCAT_HOME>/webapps         ` directory.
3.  Log in to the WSO2 IS management console.

4.  On the **Main** tab, click **Service Providers \> Add** and add a
    new service provider called
    `           saml2-web-app-pickup-dispatch.com          `  
    For more information about configuring a service provider, see
    [Adding and Configuring a Service
    Provider](_Adding_and_Configuring_a_Service_Provider_) .

5.  Expand the **Inbound Authentication configuration \> SAML2 Web SSO
    configuration** section, and click **Configure** .
6.  Fill in the following fields.

    -   **Issuer:**
        `             saml2-web-app-pickup-dispatch.com            `
    -   **Assertion Consumer URL:**
        `                           http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/consumer                         `

7.  Leave the rest of the default configurations as it is and click
    **Register** .

8.  Expand **Local and Outbound Configuration** and select **Federated
    Authentication** .
9.  Select "GoogleIdP" (the identity provider you created before) as the
    federated authenticator.
    ![](attachments/103331619/103331621.png){width="455" height="256"}
10. Click **Update** to save.

### Trying it out

1.  Access the Pickup sample application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>
2.  Click **Login** . You are redirected to the Google login page.  
    ![](attachments/103331619/103331620.png){width="222"}
3.  Sign in using your Google credentials. You are redirected to the
    Pickup sample homepage.
4.  On a new tab on your browser, access the following URL:
    [https://mail.google.com](https://mail.google.com/) .

    Note that you are automatically logged in to your Gmail using single
    sign-on (SSO).

5.  Next, logout from the Pickup application. To logout, click on your
    username on the top-left corner and click **Logout** .
6.  Access the Gmail tab. Note that you are logged out of Gmail using
    single logout.
