# Bitly Authenticator

The Bitly authenticator is configured as a federated authenticator in
WSO2 Identity Server to authenticate Bitly users to log in to your
organization’s applications.

![](../../assets/img/50518501/76746252.png)   


!!! info 
    To download the authenticator and other artifacts, go to
    [https://store.wso2.com/store/assets/isconnector/bitly](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22Bitly%22)
    .

# Configuring Bitly Authenticator

This page provides instructions on how to configure the Bitly
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

!!! info 
    This is tested for the Bitly API version 3. Bitly Authenticator is supported by Identity Server 5.1.0 upwards.


### Deploying Bitly artifacts

-   Download the Bitly Authenticator and artifcats from [the WSO2
    store](https://store.wso2.com/store/assets/isconnector/details/83ec7d04-46f1-426a-b4cb-1a169846212c)
    .

-   Place the
    `           org.wso2.carbon.identity.authenticator.bitly.connector-x.x.x.jar          `
    file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

    !!! note  
        If you want to upgrade the Bitly Authenticator (.jar) in your existing IS pack, please refer [upgrade instructions.](../../develop/upgrading-an-authenticator)
    

### Configuring the Bitly App

1.  Create a bitly account using the URL " <https://bitly.com/a/sign_up>
    ".
2.  Register your app at <https://bitly.com/a/oauth_apps>.  
    ![](../../assets/img/50518515/51251641.png) 

3.  Use <https://localhost:9443/commonauth> as the authorization
    callback URL when you register the client.

4.  Now you can get the clientId and clientSecret of your created app.  
    ![](../../assets/img/50518515/51252818.png) 

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](../../develop/deploying-the-sample-app)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](../../learn/adding-and-configuring-an-identity-provider)
and [service provider](../../learn/adding-and-configuring-a-service-provider).

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider).

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).

2.  Run the [WSO2 Identity
    Server](../../setup/running-the-product).
3.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
4.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
5.  Give a suitable name for **Identity Provider Name**.  
    ![](../../assets/img/50518515/51251655.png) 

6.  Navigate to **Bitly Configuration** under **Federated
    Authenticators**.

7.  Enter the values as given in the above figure.

    | Field         | Description                                                                                                                                                                                    | Sample Value                             |
    |---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
    | Enable        | Selecting this option enables Bitly to be used as an authenticator for users provisioned to the Identity Server.                                                                               | Selected                                 |
    | Default       | Selecting the **Default** checkbox signifies that Bitly is the main/default form of authentication. This removes the selection made for any other Default checkboxes for other authenticators. | Selected                                 |
    | Client Id     | This is the client ID received from the Bitly application.                                                                                                                                     | 3889862b0a9517bf2bcb2eed8d43f0be0576e735 |
    | Client Secret | This is the client secret received from the Bitly application. Click the **Show** button to view the value you enter.                                                                          | f841934f19cc59d1914f0865f3694b453b5fe583 |
    | Callback URL  | This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: https://(host-name):(port)/acs .                                 | https://localhost:9443/commonauth        |

8.  Select both checkboxes to **Enable** the Bitly authenticator and
    make it the **Default** authenticator.

9.  Click **Register**.

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Service Providers** section, click **Add** under the
    **Main** tab.

3.  Since you are using travelocity as the sample, enter
    `           travelocity.com          ` in the **Service Provider
    Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

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

8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the drop-down list
    under **Federated Authentication**.

    ![](../../assets/img/50518515/51252329.png) 

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp          `
    . E.g., <http://localhost:8080/travelocity.com>

2.  Login with SAML from the WSO2 Identity Server.

    ![](../../assets/img/50518515/103332428.png)  

3.  Enter your Bitly credentials in the prompted login page of Bitly .
    Once you log in successfully you will be taken to the home page of
    the travelocity.com app.
