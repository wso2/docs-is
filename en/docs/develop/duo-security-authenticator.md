# Configuring Duo Security Authenticator

The Duo Security authenticator allows you to authenticate a user using
Duo Security through WSO2 Identity Server . The Duo Security
provisioning connector enables you to provision users using Duo
Security. Duo Security provides security beyond passwords.

This topic provides instructions on how to configure the Duo Security
app and the Identity Server. A sample app is used to demonstrate this
integration. See the following sections for more information.

!!! info 
    You must have the [Duo Security
    Android](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en)
    or [iOS
    application](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8)
    installed on your mobile device to use this authenticator and
    connector.  
    Download the  provisioning connector, authenticator and artifacts from
    [the
    store](https://store.wso2.com/store/assets/isconnector/details/ef24e15b-8a53-4b8d-898e-108a04dc8f73).

!!! info 
    This is tested for the Duo Security API version V2.

See the following sections for more information.  

### Configuring the Duo Security app

1.  Go to <https://duo.com> and click free signup and register.
2.  Log in to Duo Security. Click **Applications** from the left panel
    and then click the **Protect an Application** button.  
    ![](../../assets/img/51486739/51451210.png) 
3.  In the **Protect an Application** page, select **Auth API** from
    the list. **Auth API** credentials are **mandatory .**  
    ![](../../assets/img/51486739/51451211.png)
    
4.  Once the integration is created, you are given a **Secret key** and
    an **Integration key** for your integration. You can use these along
    with your Duo host when accessing Duo Security APIs.  
    ![](../../assets/img/51486739/53284889.png) 
5.  You can also configure the **Admin API** credentials if you need to
    validate the mobile numbers. When you verify the mobile number, use
    only these credentials. Navigate back to the **Protect an
    Application** page and select **Admin API** from the list. Once the
    Integration is created, you are given a **Secret key** and an
    **Integration key** for your integration.  
    ![](../../assets/img/51486739/51451212.png) 

    !!! warning "Important"
        If you can not see the type “Admin API” in the
        dropdown, contact the Duo team through <support@duosecurity.com> and
        ask for Admin API permission.

    When configuring the Admin API, select the **Grant read resource**
    permission.  
    ![](../../assets/img/51486739/66617570.png)

    !!! tip
        This step is mandatory if you need to verify the user's
        mobile number in the user store with the mobile number in Duo
        Security. This is configured in step 4 of [Deploying Duo Security
        artifacts](#duo-security-artifacts)
        .
    

### Deploying Duo Security artifacts

To download the authenticator and artifacts, go to [the WSO2
store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22duo%22)
.

1.  Place the `            duoauthenticationendpoint.war           `
    file into the
    `            <IS_HOME>/repository/deployment/server/webapps           `
    directory.
2.  Place the
    `             org.wso2.carbon.identity.authenticator.duo-1.0.2.jar            `
    file into the
    `             <IS_HOME>/repository/components/dropins            `
    directory.

    !!! note
        If you want to upgrade the Duo Authenticator in your existing IS
        pack, please refer [upgrade
        instructions.](../../develop/upgrading-an-authenticator)
    

3.  Place the [okio-1.9.0.jar](https://github.com/square/okio/tree/okio-parent-1.9.0#download) into the
    `             <IS_HOME>/repository/components/lib            `
    directory.

    !!! tip
        You may have done this step already if you configured the [Duo
        Security Provisioning
        Connector](../../develop/configuring-duo-security-provisioning-connector). If
        so, you can skip this step.
    
    <a name = "duo-security-artifacts"></a>
4.  Optionally, to verify the user store user's mobile number with the
    same user's mobile number in Duo Security, add the following to the
    `             <IS_HOME>/repository/conf/identity/application-authentication.xml            `
    file under the `             <AuthenticatorConfigs>            `
    section. This verification only requires the Admin API credentials.

    ``` java
    <AuthenticatorConfig name="DuoAuthenticator" enabled="true">
         <Parameter name="EnableMobileVerification">true</Parameter>
    </AuthenticatorConfig>
    ```

!!! tip
    Duo Security mainly uses Mobile Phone two-factor authentication to ensure secure login.
    
!!! warning "Important"
    When you update the mobile claim in user profile, use
    the same format of mobile number with country code as you registered in
    the DUO site. (i.e +9477\*\*\*\*\*\*\*) 

### Deploying travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To do this, see the topic on [deploying the travelocity.com sample
app](../../develop/deploying-the-sample-app).

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](../../setup/running-the-product).
2.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
3.  In the **Identity** section under the **Main** tab of the management
    console, click **Add** under **Identity Providers**.
4.  Give a suitable name as the **Identity Provider Name**.
5.  Go to **Duo Configuration** under **Federated Authenticators**.  
    ![](../../assets/img/51486739/51451222.png) 
6.  Enter the values for **Integration Key**, **Secret Key**, **Admin
    Integration Key**, **Admin Secret Key** ( Admin Integration Key
    and Admin Secret Key are optional) and **Host**, as indicated in
    the above figure.
7.  Select both check-boxes to **Enable** the Duo Authenticator and make
    it the **Default**.
8.  Click **Register**.

You have now added the identity provider.  

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.

3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.
    ![](../../assets/img/48283197/48220892.png) 

5.  Now do the following configurations.

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** :
        [http://localhost:8081/travelocity.com/home.jsp](http://localhost:8080/travelocity.com/home.jsp)

6.  Select the following check boxes:
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.  
        ![](../../assets/img/51486739/51451223.png) 

7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
8.  Go to **Local and Outbound Authentication Configuration** section.
9.  Select the **Advanced Configuration** radio button option.  
    ![](../../assets/img/51486739/51451225.png) 
10. Add the basic authentication as the first step and Duo
    authentication as the second step and click **Update** to save the
    changes.  
    ![](../../assets/img/51486739/51451226.png) 

You have now added and configured the service provider.  

### Testing the sample

1.  To test the sample, go to the following URL:
    `            http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/.           `  
    E.g: <http://localhost:8080/travelocity.com>

2.  Click the link to log in with SAML from WSO2 Identity Server.  
    ![](../../assets/img/48283197/48220894.png) 

3.  The basic authentication page appears. Log in using your username
    and password.  
    ![](../../assets/img/51486739/51451227.png) 
4.  You are directed to the Duo Security authentication page.  
    ![](../../assets/img/51486739/53284890.png) 
5.  If your verification is successful, you are taken to the home page
    of the travelocity.com app.  
    ![](../../assets/img/51486739/53284894.png) 
