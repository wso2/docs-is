# Configuring Microsoft Azure AD Authenticator

!!! note
    
    **This documentation is for Office365 authenticator version 1.0.2.**
    
    -   **If you are using Office365 authenticator version 1.0.3, go to the
        [v1.0.3
        tag](https://github.com/wso2-extensions/identity-outbound-auth-office365/tree/v1.0.3/docs)
        of the identity-outbound-auth-office365 GitHub repository to view
        the documentation.**
    -   **If you are using Office365 authenticator version 1.0.4, go to the
        [v1.0.4
        tag](https://github.com/wso2-extensions/identity-outbound-auth-office365/tree/v1.0.4/docs)
        of the identity-outbound-auth-office365 GitHub repository to view
        the documentation.** **  
        **
    

This page provides instructions on how to configure the Microsoft Azure
AD authenticator and Identity Server using a sample app. This
authenticator is based on OpenID Connect. Follow the instructions in the
sections given below to configure this authenticator.

This is tested for the Office365 API version 2.0. The Microsoft Azure AD
Authenticator is supported by WSO2 Identity Server versions 5.1.0, 5.2.0
and 5.3.0.

-   [Deploying Office365 artifacts](#ConfiguringMicrosoftAzureADAuthenticator-DeployingOffice365artifactsDeployingOffice365artifacts)
-   [Configuring
    the  Office365 App](#ConfiguringMicrosoftAzureADAuthenticator-ConfiguringtheOffice365AppConfiguringtheOffice365App)
-   [Deploying travelocity.com sample
    app](#ConfiguringMicrosoftAzureADAuthenticator-Deployingtravelocity.comsampleappDeployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringMicrosoftAzureADAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringMicrosoftAzureADAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringMicrosoftAzureADAuthenticator-TestingthesampleTestingthesample)

### Deploying Office365 artifacts

1.  Place the
    `            org.wso2.carbon.extension.identity.authenticator.office365.connector-x.x.x.           `
    `            jar           ` file into the
    `            <IS_HOME>/repository/components/dropins           `
    directory. You can obtain this from the [WSO2
    store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22office365%22)
    .

    !!! note
    
        If you want to upgrade the Microsoft Azure AD Authenticator (.jar)
        in your existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

### Configuring the Office365 App

1.  Navigate to
    <https://products.office.com/en-us/business/compare-office-365-for-business-plans>
    to create an account for Office365.

2.  Associate an Azure subscription with Office 365 account (Azure AD).

    1.  If you have an existing Microsoft Azure subscription:
        1.  Log on to the [Microsoft Azure Management
            portal](https://manage.windowsazure.com/) with your existing
            Azure credentials.  
        2.  Select the **Active Directory** node, then select the
            **Directory** tab and, at the bottom of the screen, select
            **New**.  
            ![](attachments/50520581/51252169.png) 
        3.  On the **New** menu, select **Active Directory** \>
            **Directory** \> **Custom Create**.  
            ![](attachments/50520581/51252170.png) 
        4.  In **Add directory**, in the **Directory** drop-down box,
            select **Use existing directory**. Select **I am ready to
            be signed out**, and then select the check mark in the
            lower-right corner.  
            ![](attachments/50520581/51252171.png)   
              
            This takes you back to the Azure Management Portal.
        5.  Log in with your Office 365 account information. You will be
            prompted whether to use your directory with **Azure.**

            !!! warning
            
                        **Important:** To associate your Office 365 account with
                        Azure AD, you will need an Office 365 business account with
                        global administrator privileges.
            

        6.  Select **Continue** **,** and then **Sign out** now .
        7.  Close the browser and reopen the
            [portal](https://manage.windowsazure.com/). Otherwise, you
            will get an access denied error.
        8.  Log in again with your existing Azure credentials.
        9.  Navigate to the **Active Directory** node and, under
            **Directory**, you should now see your Office 365 account
            listed.

    2.  Alternatively , you will need to create a new Azure subscription
        and associate it with your Office 365 account in order to
        register and manage apps.  
        1.  Log on to Office 365. From the **Home** page, select the
            **Admin** icon to open the Office 365 admin center.  
            ![](attachments/50520581/51252172.png) 
        2.  In the **menu** page on the left side of the page, scroll
            down to **Admin** and select **Azure **AD**.**  
            **![](attachments/50520581/51252173.png) **

            !!! warning
            
                        ****Important:**** To open the Office 365 admin center and
                        access Azure AD, you will need an Office 365 business
                        account with global administrator privileges.
            

        3.  Create a new subscription. If you are using a trial version
            of Office 365, you will see a message informing you that
            Azure AD is limited to customers with paid services. You can
            still create a free trial 30-day Azure subscription, but you
            will need to perform a few extra steps:  
            ![](attachments/50520581/51252174.png) 
            1.  Select your country or region, and then choose
                **Azure subscription**.
            2.  Enter your personal information. For verification
                purposes, enter a telephone number at which you can be
                reached, and specify whether you want to be sent a text
                message or called.
            3.  Once you have received your verification code, enter it
                and choose **Verify code**.
            4.  Enter the payment information, check the agreement, and
                select **Sign up**. Your credit card will not be
                charged.
            5.  Once your Azure subscription is created, choose
                **Portal .**
            6.  The Azure Tour appears. You can view it, or click **X**
                to close it.

3.  Register a new application in the Azure classic portal.

    1.  Sign into the [Azure Management
        Portal](https://manage.windowsazure.com/) using your Azure
        credentials.
    2.  Click **Active Directory** on the left menu, then click on the
        **Directory** for your Office 365 developer site.  
        ![](attachments/50520581/51252175.png) 
    3.  On the top menu, click **Applications .** **  
        **
    4.  Click **Add** from the bottom menu.  
        ![](attachments/50520581/51252176.png) 
    5.  Click **Add an application my organization is developing**.  
        ![](attachments/50520581/51252177.png) 
    6.  Specify the application name and select **WEB APPLICATION AND/OR
        WEB API** for **Type**.  
    7.  Click the arrow icon on the bottom-right corner of the page.  
        ![](attachments/50520581/51252178.png) 
    8.  Specify a sign-on URL. You can specify
        `                                          https://localhost:9443/commonauth                                       `
        .  
    9.  Click the **checkbox** in the bottom right corner of the page.  
        ![](attachments/50520581/51252179.png) 
    10. Once the application has been successfully added, you will be
        taken to the Quick Start page for the application. From here,
        click **Configure** in the top menu.  

        !!! note
        
                On this page, note the client ID and client secret (key) as you
                will need it later when configuring Office365 as a federated
                authenticator.
        

        ![](attachments/50520581/76746011.png) 
        ![](attachments/50520581/76746012.png) 

    11. In **permissions to other applications**, click **Add**
        application .  
    12. Click **Office 365 Exchange Online**, and then click the check
        mark icon.  
        ![](attachments/50520581/51252184.png) 
    13. Under **permissions to other applications**, click the
        **Delegated Permissions** column for Office 365
        Exchange Online .  
    14. Click **Save** in the bottom menu.  
        ![](attachments/50520581/51252185.png) 

### Deploying [travelocity.com](http://travelocity.com) sample app

The next step is to [deploy the sample app](Deploying-the-Sample-App)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding a [service
provider](https://docs.wso2.com/display/IS530/Configuring+a+Service+Provider)
and an [identity
provider](https://docs.wso2.com/display/IS530/Configuring+an+Identity+Provider)
.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/display/IS530/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).
2.  Run the [WSO2 Identity
    Server](https://docs.wso2.com/display/IS530/Running+the+Product).
3.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
4.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
5.  Give a suitable name for **Identity Provider Name**. Refer
    [this](https://docs.wso2.com/display/IS530/Configuring+an+Identity+Provider#ConfiguringanIdentityProvider-Addinganidentityprovider)
    document for more information regarding the identity provider
    configurations.  
    ![](attachments/50520581/51252816.png) 
6.  Navigate to **Office365 Configuration** under **Federated
    Authenticators**.
7.  Enter the values as given in the above figure.  
    -   **Client Id** : Client Id for your app.
    -   **Client Secret** : Client Secret for your app.
    -   **Callback Url** : Service Provider's URL where code needs to be
        sent (
        `                                          https://localhost:9443/commonauth                                       `
        ).
8.  Select both checkboxes to **Enable** the Microsoft Azure AD
    authenticator and make it the **Default**.  
9.  Click **Register**.

You have now added the identity provider.

### Configuring the service provider

1.  Return to the management console.
2.  In the **Service Providers** section, click **Add** under the
    **Main** tab.
3.  Since you are using travelocity as the sample, enter
    [travelocity.com](http://travelocity.com) in the **Service Provider
    Name** text box and click **Register**.
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.
5.  Now set the configuration as follows:  
    1.  **Issuer** : [travelocity.com](http://travelocity.com)

    2.  **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp

6.  Select the following check-boxes:  
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.  
        ![](attachments/50520581/51252142.png) 

7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.
9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.  
    ![](attachments/50520581/51252143.png) 
10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/                       travelocity.com/index.jsp                     `
    . E.g., <http://localhost:8080/travelocity.com>
2.  Login with SAML from the WSO2 Identity Server.  
    ![](attachments/50520581/51252144.png) 
3.  Enter your Office365 credentials in the prompted login page of
    Microsoft.  
    ![](attachments/50520581/51252145.png) 
4.  Once you login successfully  you will be taken to the home page of
    the [travelocity.com](http://travelocity.com) app.  
    ![](attachments/50520581/51252146.png) 

  

  

  
