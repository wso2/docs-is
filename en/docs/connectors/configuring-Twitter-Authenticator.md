# Configuring Twitter Authenticator

This page provides instructions on how to configure the Twitter
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

This is tested with the Twitter API version 1.1 which uses OAuth 1.0a.
Twitter Authenticator is supported by Identity Server 5.1.0 upwards.

-   [Deploying Twitter
    artifacts](#ConfiguringTwitterAuthenticator-DeployingTwitterartifactsDeployingTwitterartifacts)
-   [Configuring the Twitter
    App](#ConfiguringTwitterAuthenticator-ConfiguringtheTwitterAppConfiguringtheTwitterApp)
-   [Deploying travelocity.com sample
    app](#ConfiguringTwitterAuthenticator-Deployingtravelocity.comsampleappDeployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringTwitterAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringTwitterAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringTwitterAuthenticator-TestingthesampleTestingthesample)

### Deploying Twitter artifacts

-   Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).

-   Place the Twitter authenticator .jar file (
    `           org.wso2.carbon.extension.identity.authenticator.twitter.connector-X.X.X.jar          `
    ) into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. This can be downloaded from [the WSO2
    Store](https://store.wso2.com/store/assets/isconnector/details/51bc4245-9c97-4839-9e3c-c177b20145ee)
    .

    !!! note
    
        If you want to upgrade the Twitter Authenticator in your existing IS
        pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

### Configuring the Twitter App

1.  Create an account at <https://twitter.com> and log in.
2.  Navigate to https://apps.twitter.com/ and click **Create New App**.

    -   Provide an application name and description.
    -   For this tutorial, enter `            https://           `
        `            127.0.0.1           ` as the website URL. It is
        used as a placeholder since application used for the tutorial is
        not publicly available.
    -   Give the **Callback URL** as
        `             https://<HOST_NAME_OF_IS>:9443/commonauth            `
        . For example:
        `                                          https://apps.customhost.com:9443/commonauth                                       `
        .

        Note

        If the Identity Server is running on your local machine, add an
        entry as mentioned below and use this host name (here
        `                             apps.customhost.com                           `
        ) in your twitter callback url.

        `              127.0.0.1       apps.customhost.com             `

    -   Click **Create your Twitter application**.

    ![](attachments/50515587/75109897.png){width="600"}

    !!! note
    
        **Callback URL** is the URL to which the browser should be
        redirected after the authentication is successful. It should have
        this format:
        `                       https://(host-name):(port)/acs                     `
        . Here ACS URL (Assertion Consumer URL) is the endpoint in WSO2
        Identity Server which accepts the response sent by Google.
    

3.  After creating the app, go to the **Keys and Access Tokens** tab to
    get the **API Key** and **API Secret**. These are the **Consumer
    Key** and **Consumer Secret** values shown.  
    Example:  
    ![](attachments/50515587/75109896.png){width="600"}

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](_Deploying_the_Sample_App_)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](#ConfiguringTwitterAuthenticator-Configuringtheidentityprovider)
and [service
provider](#ConfiguringTwitterAuthenticator-Configuringtheserviceprovider)
.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by adding a new identity
provider. For more information about the Identity Providers, see
[Configuring an Identity
Provider](http://docs.wso2.com/identity-server/Configuring+an+Identity+Provider)
.

1.  [Run the WSO2 Identity
    Server](https://docs.wso2.com/display/IS510/Running+the+Product).

2.  Log in to the [management
    console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
4.  Give a suitable name for **Identity Provider Name**. Expand
    **Federated Authenticators** and expand ****TwitterAuthenticator
    Configuration****.  
    ![](attachments/50515587/51249933.png){width="800" height="664"}  
    Enter the values as given when you [created the twitter
    application](#ConfiguringTwitterAuthenticator-twitter-app).

    -   Select both checkboxes to ****Enable** the Twitter
        authenticator** and make it the Default. **  
        **
    -   **API Key** : Consumer Key for your app.
    -   **API Secret** : Consumer Secret for your app.
    -   **Callback URL** : Service Provider's URL where code needs to be
        sent (e.g., https://apps.customhost.com:9443/commonauth )

5.  Click **Register**.

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Service Providers** section, click **Add** under the
    **Main** tab.

3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

5.  Now set the configuration as follows:

    1.  **Issuer** : `             travelocity.com            `

    2.  **Assertion Consumer URL** :
        `                           http://localhost:8080/travelocity.com/home.jsp                         `  
        Click A **dd** to add the assertion consumer URL.

    3.  Select the following check-boxes:

    <!-- -->

    1.  -   **Enable Response Signing**.

        -   **Enable Single Logout**.

        -   **Enable Attribute Profile**.

        -   **Include Attributes in the Response Always**.  

6.  Click **Register** to save the changes. Now you will be sent back to
    the **Service Providers** page.

7.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

8.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.

    ![](attachments/50515587/51249934.png){width="600"}

9.  Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp          `
    . E.g., http://localhost:8080/travelocity.com

2.  Click the option available to log in with SAML from the WSO2
    Identity Server.

    ![](attachments/50515587/80723423.png){width="500"}

    You are navigated to the Twitter application. Enter the username and
    password of your Twitter account to log in.  
    Example:  
    ![](attachments/50515587/75109949.png){width="500"}

3.  Once the authentication is complete, you will be taken to the home
    page of the travelocity.com app.  
    Example:  
    ![](attachments/50515587/75109950.png){width="500"}
