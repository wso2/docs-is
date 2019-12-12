# Configuring Instagram Authenticator

The Instagram authenticator allows users to log in to your
organization's applications using
[Instagram](https://www.instagram.com/), which is an online mobile
photo-sharing, video-sharing, and social networking service. The
Instagram authenticator is configured as a federated authenticator in
WSO2 Identity Server.

![](../assets/img/49091418/76746190.png)

This page provides instructions on how to configure the Instagram
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

!!! info 
	To download the authenticator and other artifacts, go to
	[https://store.wso2.com/store/assets/isconnector/instagram](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22Instagram%22)
	.

!!! info 
	This is tested with the Instagram API version 1.0 (v1). Instagram
	authenticator is supported by Identity Server 5.1.0 upwards.

### Deploying Instagram artifacts

-   Place the Instagram authenticator .jar file (
    `           org.wso2.carbon.extension.identity.authenticator.instagram.connector-X.X.X.jar          `
    ) into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download this from [the
    store](https://store.wso2.com/store/assets/isconnector/details/175db9b2-1aae-4402-adee-94c4acd751d2)
    .

    !!! note
        If you want to upgrade the Instagram Authenticator (.jar) in your existing IS pack, please refer [upgrade
        instructions.](../../develop/upgrading-an-authenticator)
    
### Configuring the Instagram App

1.  Download the **Instagram** app for iOS from the App Store, Android
    from Google Play Store or Windows Phone from the Windows Phone
    Store.
2.  Once the app is installed, tap to open it.
3.  Sign up and create an account using your email ID.
4.  Navigate to <https://www.instagram.com/> and log in using the
    credentials that you used to create the account.
5.  Navigate to <https://www.instagram.com/developer/> and click the '
    **Register Your Application** ' button and register a new client.
6.  Use <https://localhost:9443/commonauth> as the redirect URL when you
    register the client.  
    ![](../assets/img/49091422/49224545.png) 

    !!! note
        If you are getting an error while registering you may have to
        "Disable Content Security Policy". It is recommended to enable
        content security policy, once you registered into the app.
    

7.  From the app dashboard you can get the **clientId** and
    **clientSecret** for your created app.  

### Deploying travelocity.com sample app

The next step is to deploy and configure travelocity application. See 
[deploy the sample app](../../learn/deploying-the-sample-app/#deploying-the-travelocity-webapp) for more information 
on configuring travelocity application. 

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).
2.  Go to <https://api.instagram.com> in your browser, and then click
    the HTTPS trust icon on the address bar (e.g., the padlock next to
    the URL) to download the certificate. If you are using google chrome
    please follow the steps of [inspecting certificates in
    chrome](https://textslashplain.com/2017/05/02/inspecting-certificates-in-chrome/)
    to export the certificate.

3.  Import that certificate into the IS client keystore by running the
    following command on your command line.  
    `           keytool -importcert -file <certificate file> -keystore <           IS_HOME           >/repository/resources/security/client-truststore.jks -alias "Instagram"          `

    !!! note
        Note that 'wso2carbon' is the keystore password of the default
        client-truststore.jks file. We need the certificate in order to
        validate the signature. Otherwise, it is unable to prove that the
        response is sent by the relevant identity provider we configured.

4.  [Run the WSO2 Identity
    Server](../../setup/running-the-product).
5.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
6.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
7.  Give a suitable name for **Identity Provider Name** and configure
    the authenticator. To do this, navigate to **Instagram
    Configuration** under **Federated Authenticators** and fill the
    form.  
    ![](../assets/img/49091422/51251951.png)   
    Do the following configurations.

    | Field         | Description                                                                                                                                                                                            | Sample value                      |
    |---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
    | Enable        | Selecting this option enables Instagram to be used as an authenticator for users provisioned to the Identity Server.                                                                                   | Selected                          |
    | Default       | Selecting the **Default** checkbox signifies that Instagram is the main/default form of authentication. This removes the selection made for any other **Default** checkboxes for other authenticators. | Selected                          |
    | Client Id     | This is the username from the Instagram application.                                                                                                                                                   | aa6f12fd086e4b58a6707d5b61377a71  |
    | Client Secret | This is the password from the Instagram application. Click the **Show** button to view the value you enter.                                                                                            | fffc3f4808f34e01b0bc529ce78f5980  |
    | Callback URL  | This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: https://(host-name):(port)/acs.                                          | https://localhost:9443/commonauth |

8.  Select both checkboxes to **Enable** the Instagram authenticator and
    make it the **Default**.

9.  Click Register.

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  In the
    [previous section of this guide](#deploying-travelocity-sample-application)
    you have deployed and
    [registered the `travelocity.com` webapp](learn/deploying-the-sample-app/#configuring-the-service-provider).
    Let's edit the same service provider to configure `instagram` as the
    identity provider.

2.  Locate the "travelocity.com" service provider and navigate to the
    **Local and Outbound Authentication Configuration** section.

3.   Select the identity provider you created from the dropdown list
     under **Federated Authentication**.

    ![](../assets/img/49091422/49227071.png) 

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

**Related Topics**

For more information on service provider configuration, see [Configuring SAML2 Web
Single
Sign-On](../../learn/configuring-saml2-web-single-sign-on)
.

### Configuring claims

This involves [adding a new claim
mapping](../../learn/adding-claim-mapping) for
various user attributes related to Instagram.

-   In the **Main** menu, click **Add** under **Claims**.
-   Click **Add New Claim Dialect** to create the Instagram
    authenticator specific claim dialect.  
    ![](../assets/img/49091422/58473586.png) 
-   Specify the Dialect Uri as <http://wso2.org/instagram/claims> and
    create claims. It is required to create at least one claim under
    this new dialect. Therefore, create the claim for the Instagram user
    ID while creating the claim dialect. Enter the following values the
    form.
-   Click **Add** to add the new claim.
-   Similarly, you can create claims for all the public information of
    the Instagram user. Add the following claims under the dialect
    <http://wso2.org/instagram/claims>  
    ![](../assets/img/49091422/58473593.png) 

![](../assets/img/49091422/58473594.png)   


-   You can create the local claim to map it with the Instagram claim.
    Create the local claim **http://wso2.org/claims/profilepicture**
    with the map attribute **profile picture**.

![](../assets/img/49091422/58473595.png) 

  
### Configuring requested claims for travelocity.com

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the travelocity.com service provider.
3.  Expand the **Claim Configuration** section.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as indicated in the image below. Here you must add
    the claims you mapped in the Identity Provider claim configuration.

![](../assets/img/49091422/58473599.png) 

### Testing the sample

1.  To test the sample, go to the following URL: `
    http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp ` .
    E.g., <http://wso2is.local:8080/travelocity.com>

2.  Click the option available to login with SAML from the WSO2 Identity
    Server.

3.  Enter your Instagram credentials in the prompted login page of
    Instagram. Once you login successfully you will be taken to the home
    page of the [travelocity.com](http://travelocity.com) app.  

![](../assets/img/49091422/58473600.png) 