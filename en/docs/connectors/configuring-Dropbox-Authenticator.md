# Configuring Dropbox Authenticator

This page provides instructions on how to configure the Dropbox
authenticator and the WSO2 Identity Server to log in to a sample app.
You can find more information in the following sections.

This is tested for the Dropbox API version 1.0. Dropbox Authenticator is
supported by WSO2 Identity Server versions 5.1.0, 5.2.0 and 5.3.0.

-   [Configuring the Dropbox
    App](#ConfiguringDropboxAuthenticator-ConfiguringtheDropboxApp)
-   [Deploying travelocity.com sample
    app](#ConfiguringDropboxAuthenticator-Deployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringDropboxAuthenticator-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringDropboxAuthenticator-Configuringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringDropboxAuthenticator-Testingthesample)

### Configuring the Dropbox App

1.  Place the authenticator .jar file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download the
    .jar(org.wso2.carbon.identity.authenticator.dropbox) file from the
    [wso2
    store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22dropbox%22)
    .

    !!! note
    
        If you want to upgrade the Dropbox Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

2.  Navigate to <https://www.dropbox.com/developers/apps> and create a
    new app. You must create or have a Dropbox account for this.

    ![](attachments/49091441/75106368.png) 

3.  Enter the name of your new app and click **Create App**.
4.  Specify the redirect URI as <https://localhost:9443/commonauth> in
    the window that appears.  
5.  Now you have finished configuring Dropbox. Copy the **App key** and
    **App Secret** from the above page.

### Deploying travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To configure this, see [deploying travelocity.com sample
app](_Deploying_the_Sample_App_).

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](https://docs.wso2.com/display/IS510/Running+the+Product).
2.  Log in to the [management
    console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
4.  Give a suitable name for **Identity Provider Name**.  
    ![](attachments/49091441/75106398.png) 
5.  Go to **Dropbox Configuration** under **Federated Authenticators**.
6.  Enter the values as given in the above figure.

    | Field         | Description                                                                                                                                                                                                  | Sample Value                        |
    |---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
    | Enable        | Selecting this option enables Dropbox to be used as an authenticator for users provisioned to WSO2 Identity Server.                                                                                          | Selected                            |
    | Default       | Selecting the **Default** checkbox specifies Dropbox as the main/default form of authentication. If selected, any other authenticators that have been selected as **Default** will be unselected by WSO2 IS. | Selected                            |
    | Cliend Id     | The app key from the Dropbox application.                                                                                                                                                                    | owqfgrlhowmgypa                     |
    | Client Secret | The app secret from the Dropbox application. Click the **Show** button to see the value.                                                                                                                     | lmcbrqwb14algwy\|                   |
    | Callback URL  | The URL to which the browser should be redirected to after the authentication is successful. Follow this format: https://(host-name):(port)/acs .                                                            | <https://localhost:9443/commonauth> |

7.  Click **Register**.

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.
2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.
3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.  
    ![](attachments/49091441/49224550.png){height="250"}
5.  Now set the configuration as follows:  
    1.  Issuer: travelocity.com
    2.  Assertion Consumer URL:
        <http://localhost:8080/travelocity.com/home.jsp>
6.  Select the following check-boxes:
    1.  Enable Response Signing.
    2.  Enable Single Logout.
    3.  Enable Attribute Profile.
    4.  Include Attributes in the Response Always.
7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
8.  Go to the **Local and Outbound Authentication Configuration**
    section.
9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.  
      
    ![](attachments/49091441/49224551.png) 
10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, navigate to the following URL:
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    . E.g., <http://localhost:8080/travelocity.com>  
    [![](attachments/49091441/49224552.png) ](http://localhost:8080/travelocity.com)
2.  Click the link to log in with SAML from the WSO2 Identity Server.
3.  You are redirected to the Dropbox login page. Enter your Dropbox
    credentials.  
      
    ![](attachments/49091441/49224553.png) 
4.  You are then taken to the home page of the travelocity.com app.  
    ![](attachments/49091441/49224554.png) 

  

3544

4301

6422

1257

512

961

1585

1791

1795
