# Configuring Reddit Authenticator

This page provides instructions on how to configure the Reddit
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

This is tested for the Reddit API version 1.0. Reddit Authenticator is
supported by Identity Server 5.1.0 upwards.

-   [Deploying Reddit
    artifacts](#ConfiguringRedditAuthenticator-DeployingRedditartifactsDeployingRedditartifacts)
-   [Configuring the Reddit
    App](#ConfiguringRedditAuthenticator-ConfiguringtheRedditAppConfiguringtheRedditApp)
-   [Deploying travelocity.com sample
    app](#ConfiguringRedditAuthenticator-Deployingtravelocity.comsampleappDeployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringRedditAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringRedditAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringRedditAuthenticator-TestingthesampleTestingthesample)

### Deploying Reddit artifacts

-   Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) .

-   Download the Reddit authenticator from
    [here](https://store.wso2.com/store/assets/isconnector/details/45092602-8b7b-4f29-9d66-cc5b39990907)
    and add it to the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

    !!! note
    
        If you want to upgrade the Reddit Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

### Configuring the Reddit App

1.  Create a reddit account using the URL
    [https://www.reddit.com/](https://www.reddit.com/.) and log in.
2.  Navigate to https://www.reddit.com/prefs/apps and click are you a
    developer?create an app on the top left corner. Example:
3.  Create a web app.  
    Use
    `                     https://localhost:9443/commonauth                   `
    as the **about url** and **redirect uri** when creating the web
    app.  
    ![](attachments/50520620/51252148.png){width="750"}
4.  Now you can get the clientId and clientSecret of your created app.  
    ![](attachments/50520620/51252150.png){width="750"}  

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](_Deploying_the_Sample_App_)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](#ConfiguringRedditAuthenticator-ConfiguringanIdentityProvider)
and [service
provider](#ConfiguringRedditAuthenticator-ConfiguringaServiceProvider) .

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by adding a new identity
provider. For more information about the Identity Providers, see
[Configuring an Identity
Provider](http://docs.wso2.com/identity-server/Configuring+an+Identity+Provider)
.

1.  Go to <https://www.reddit.com/> in your browser, and click the HTTPS
    trust icon on the address bar (e.g., the padlock next to the URL in
    Chrome) to download the certificate.  
    Based on the  browser the steps to download the certificate changes.
    Click valid under Certificate (Chrome) or click Show certificate
    (Safari), expand the **Details** section and click the URL under CA
    Issuer to download the certificate.  
    Example: On Chrome

    ![](attachments/50520620/75109985.png){width="400"}

    !!! note
    
        This is supported on Firefox and Safari browsers by default but it
        is not supported on some Chrome browsers.
    
        ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here to know how to enable certificate downloading on Chrome.
    
        1.  Navigate to <chrome://flags/#show-cert-link> .
        2.  Click Enable to view the certificates.  
            ![](attachments/50520620/75109981.png){width="863" height="203"}
        3.  Relaunch Chrome.
    

2.  Import that certificate into the IS client keystore.  
    `           keytool  -importcert -file <certificate file> -keystore  <IS>/repository/resources/security/client-truststore.jks -alias  "Reddit"          `

    The default password of the client-truststore.jks is "wso2carbon".

3.  Run the [WSO2 Identity
    Server](https://docs.wso2.com/display/IS530/Running+the+Product) .
4.  Log in to the [management
    console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    as an administrator.
5.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add** .
6.  Give a suitable name for **Identity Provider Name** .  
    ![](attachments/50520620/51252182.png){width="750"}
7.  Navigate to **RedditAuthenticator Configuration** under **Federated
    Authenticators** .
8.  Enter the values as given in the above figure.

    -   **Client Id** : Client Id for your web app.
    -   **Client Secret** : Client Secret for your web app.
    -   **Callback URL** : Service Provider's URL where code needs to be
        sent .

9.  Select both checkboxes to **Enable** the Reddit authenticator and
    make it the **Default** .

10. Click **Register** .

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Service Providers** section, click **Add** under the
    **Main** tab.

3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register** .

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

5.  Now set the configuration as follows:

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp

6.  Select the following check-boxes:
    1.  **Enable Response Signing** .

    2.  **Enable Single Logout** .

    3.  **Enable Attribute Profile** .

    4.  **Include Attributes in the Response Always** .  
        ![](https://lh6.googleusercontent.com/qsYmfJRbhzqeKB_WHare-nLYmSL3DItCUqx3627JsK8aF0AibTUNO-s4DyG5Zx_bp0wfH_10Ap6dJ2ngKNYBtlgOCHZBSoKqhNbVac0DEWZ49C4Gpej3mzFoQpP2Z6XFP6iYkUCf){width="800"
        height="796"}

7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication** .  
    ![](attachments/50520620/51252181.png){width="750"}

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com          `
    .  
    E.g., http://localhost:8080/travelocity.com

2.  Login with SAML from the WSO2 Identity Server.

    ![](https://lh5.googleusercontent.com/q_O2Xna03g229TP1WsGtz8vzXC8zH1_LHkxdlw-FoYfYLgtvsQEFd8ABiatklW3DYP_CajueLWBVVPwIGLcP9Pvts5iGlzL8ni-S-a-bPrp--IEWJf9AnqzXzY8NSXjnZyn3qF2o)

3.  Enter your Reddit credentials in the prompted login page of Reddit.
    Once you log in successfully you will be taken to the home page of
    the travelocity.com app.  
