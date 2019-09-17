# Configuring Reddit Authenticator

The Reddit authenticator is configured as a federated authenticator in
WSO2 Identity Server to authenticate Reddit users to log in to your
organization’s applications. Reddit is a platform for creating
communities and is made up of thousands of active communities (known as
"subreddits"), which are devoted to all sorts of different topics and
are created and maintained by regular users. The diagram below
illustrates the flow of the Reddit federated authenticator.

![](../../assets/img/50520527/76746184(../../learn/adding-claim-mapping)=border-simple,blur-border)

This page provides instructions on how to configure the Reddit
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

!!! info 
    This is tested for the Reddit API version 1.0. Reddit Authenticator is
    supported by Identity Server 5.1.0 upwards.


### Deploying Reddit artifacts

-   Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).

-   Download the Reddit authenticator from
    [here](https://store.wso2.com/store/assets/isconnector/details/45092602-8b7b-4f29-9d66-cc5b39990907)
    and add it to the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

    !!! note
        If you want to upgrade the Reddit Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](../../develop/upgrading-an-authenticator)
    

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
    ![](../../assets/img/50520620/51252148.png) 
4.  Now you can get the clientId and clientSecret of your created app.  
    ![](../../assets/img/50520620/51252150.png)   

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](../../develop/deploying-the-sample-app)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity provider](#configuring-the-identity-provider) and [service provider](#configuring-the-service-provider).

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by adding a new identity
provider. For more information about the Identity Providers, see
[Configuring an Identity
Provider](../../learn/adding-and-configuring-an-identity-provider).

1.  Go to <https://www.reddit.com/> in your browser, and click the HTTPS
    trust icon on the address bar (e.g., the padlock next to the URL in
    Chrome) to download the certificate.  
    Based on the  browser the steps to download the certificate changes.
    Click valid under Certificate (Chrome) or click Show certificate
    (Safari), expand the **Details** section and click the URL under CA
    Issuer to download the certificate.  
    Example: On Chrome

    ![](../../assets/img/50520620/75109985.png) 

    !!! note
        This is supported on Firefox and Safari browsers by default but it
        is not supported on some Chrome browsers.
    
        ??? note "Click here to know how to enable certificate downloading on Chrome."
            1.  Navigate to <chrome://flags/#show-cert-link> .
            2.  Click Enable to view the certificates.  
                ![](../../assets/img/50520620/75109981.png) 
            3.  Relaunch Chrome.
    

2.  Import that certificate into the IS client keystore.  
    `           keytool  -importcert -file <certificate file> -keystore  <IS>/repository/resources/security/client-truststore.jks -alias  "Reddit"          `

    !!! info 
        The default password of the client-truststore.jks is "wso2carbon".

3.  Run the [WSO2 Identity
    Server](../../setup/running-the-product).
4.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
5.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
6.  Give a suitable name for **Identity Provider Name**.  
    ![](../../assets/img/50520620/51252182.png) 
7.  Navigate to **RedditAuthenticator Configuration** under **Federated
    Authenticators**.
8.  Enter the values as given in the above figure.

    -   **Client Id** : Client Id for your web app.
    -   **Client Secret** : Client Secret for your web app.
    -   **Callback URL** : Service Provider's URL where code needs to be
        sent .

9.  Select both checkboxes to **Enable** the Reddit authenticator and
    make it the **Default**.

10. Click **Register**.

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

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** : http://localhost:8080/travelocity.com/home.jsp

6.  Select the following check-boxes:
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.  

7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.  
    ![](../../assets/img/50520620/51252181.png) 

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com          `
    .  
    E.g., http://localhost:8080/travelocity.com

2.  Login with SAML from the WSO2 Identity Server.

3.  Enter your Reddit credentials in the prompted login page of Reddit.
    Once you log in successfully you will be taken to the home page of
    the travelocity.com app.  