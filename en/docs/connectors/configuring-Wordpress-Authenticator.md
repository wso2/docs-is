# Configuring Wordpress Authenticator

The Wordpress authenticator allows you to authenticate users using
Wordpress through the WSO2 Identity Server. This page provides
instructions on how to configure the Wordpress authenticator and the
WSO2 Identity Server for logging into a sample app.

You can find more information in the following sections.

This is tested for the Wordpress API version 1.0. Wordpress
Authenticator is supported by Identity Server 5.1.0 upwards.

-   [Configuring the Wordpress
    App](#ConfiguringWordpressAuthenticator-ConfiguringtheWordpressApp)
-   [Deploying travelocity.com sample
    app](#ConfiguringWordpressAuthenticator-Deployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringWordpressAuthenticator-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringWordpressAuthenticator-Configuringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringWordpressAuthenticator-Testingthesample)

### Configuring the Wordpress App

1.  Place the authenticator .jar file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download the
    .jar(org.wso2.carbon.identity.authenticator.wordpress) file from the
    [wso2
    store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22Wordpress%22)
    .  

    !!! note
    
        If you want to upgrade the Wordpress Authenticator in your existing
        IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

2.  Navigate to <https://developer.wordpress.com/apps> and log in.

    !!! note
    
        **Note** : You can either use your Wordpress developer account
        credentials or your own Google account credentials to log in.
    

3.  Click **Create New Application**.

    ![](attachments/49092145/76747300.png){width="871"}

4.  Enter the following details in the window that appears.
    -   **Name** - TestApp
    -   **Description** - Application for testing purposes
    -   **Website URL** - https://localhost:9443/commonauth
    -   **Redirect URLs** - https://localhost:9443/commonauth
    -   **Javascript Origins** - <https://localhost:9443>
    -   **Type** - web client

        !!! tip
        
                Make sure to answer the mathematical question that is asked
                (e.g., What is 5+2 ?).
        

5.  Click **Create**.  
    Now you have finished configuring Wordpress so copy the **Client
    ID** and **Client Secret** for use in the Identity Server.  
    ![](attachments/49092145/49226414.png){width="693"}

### Deploying travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To configure this, see [deploying travelocity.com sample
app](_Deploying_the_Sample_App_).

### Configuring the identity provider

Now you must configure the WSO2 Identity Server by [adding a new
identity
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
    ![](attachments/49092145/76747356.png){width="242"}
4.  Enter the following details for the Identity Provider.

    -   **Identity Provider Name** - WordpressIdP
    -   **Alias** - <https://localhost:9443/oauth2/token>

    ![](attachments/49092145/76747375.png){width="672"}

5.  Go to **Wordpress Configuration** under **Federated Authenticators**
    and enter the required details.

    !!! tip
    
        Make sure to enter the client Id, client secret, and callback URL
        based on the [wordpress application that you
        created](#ConfiguringWordpressAuthenticator-clientsecret).
    

    | Field         | Description                                                                                                                                                                                          | Sample value                                                     |
    |---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
    | Enable        | Selecting this option enables Wordpress to be used as an authenticator for users provisioned to the Identity Server.                                                                                 | Selected                                                         |
    | Default       | Selecting the Default checkbox signifies that Wordpress is the main/default form of authentication. This removes the selection made for any other default check-boxes for other authenticators.      | Selected                                                         |
    | Client Id     | This is the username from the Wordpress application.                                                                                                                                                 | 56002                                                            |
    | Client Secret | This is the password from the Wordpress application. Click the **Show** button to view the value you enter.                                                                                          | LxLvRoWplkvva4WMdOWAxrcghOVlxrH8RHJ96XWlXVaZi6pZDgXsvPhLHhzGqeCF |
    | Callback URL  | This is the URL to which the browser should be redirected after the authentication is successful. It should have the following format: `               https://(host-name):(port)/acs              ` | <https://localhost:9443/commonauth>                              |

6.  Click **Register**.

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
      
    ![](https://lh6.googleusercontent.com/qsYmfJRbhzqeKB_WHare-nLYmSL3DItCUqx3627JsK8aF0AibTUNO-s4DyG5Zx_bp0wfH_10Ap6dJ2ngKNYBtlgOCHZBSoKqhNbVac0DEWZ49C4Gpej3mzFoQpP2Z6XFP6iYkUCf){width="500"}
5.  Now set the configuration as follows:  
    1.  **Issuer** : travelocity.com
    2.  **Assertion Consumer URL** :
        <http://localhost:8080/travelocity.com/home.jsp>
6.  Select the following check-boxes:
    1.  **Enable Response Signing**.
    2.  **Enable Single Logout**.
    3.  **Enable Attribute Profile**.
    4.  **Include Attributes in the Response Always**.
7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
8.  Go to the **Local and Outbound Authentication Configuration**
    section.
9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.  
      
    ![](attachments/49092145/49226418.png){width="500"}
10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    . E.g., [http://localhost:8080/travelocity.com  
      
    ](http://localhost:8080/travelocity.com)
    ![](attachments/49092145/49226416.png){width="500"}
2.  Click the link to log in with SAML from WSO2 Identity Server.
3.  You are redirected to the Wordpress login page. Enter your Wordpress
    credentials.  
      
    ![](attachments/49092145/49226419.png){width="500"}
4.  Click **Log In** to authenticate the user.  
      
    ![](attachments/49092145/49226420.png){width="500"}
5.  You will be taken to the home page of the travelocity.com app.  
    ![](attachments/49092145/49226421.png){width="500"}

  

3847

3877

1251

514

515

964

1574

1785

1788
