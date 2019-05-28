# Configuring Symantec VIP Authenticator

This topic provides instructions on how to configure the Symantec
VIP and the Identity Server to integrate using a sample app. See the
following sections for more information.

-   [Deploying Symantec VIP
    artifacts](#ConfiguringSymantecVIPAuthenticator-DeployingVIPartifactsDeployingSymantecVIPartifacts)
-   [Configuring the Symantec
    VIP provider](#ConfiguringSymantecVIPAuthenticator-ConfiguringtheVIPproviderConfiguringtheSymantecVIPprovider)
-   [Deploying travelocity.com
    sample](#ConfiguringSymantecVIPAuthenticator-Deployingtravelocity.comsampleDeployingtravelocity.comsample)
-   [Configuring the identity
    provider](#ConfiguringSymantecVIPAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringSymantecVIPAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Configuring User
    Claim](#ConfiguringSymantecVIPAuthenticator-ConfiguringUserClaimConfiguringUserClaim)
-   [Testing the
    sample](#ConfiguringSymantecVIPAuthenticator-TestingthesampleTestingthesample)

### Deploying Symantec VIP artifacts

1.  Place the authentication endpoint war file
    (semanticvipauthenticationendpoint.war) into the
    `           <IS_HOME>/repository/deployment/server/webapps          `
    directory.
2.  Place the authenticator .jar file
    (org.wso2.carbon.extension.identity.authenticator.semanticvip.connector-1.0.0.jar)
    into the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

### Configuring the Symantec VIP provider

This topic helps you to enable the VIP credential at VIP Manager and
setup the plaform. After enabling the credential, you can use that **VIP
Credential ID** to go with WSO2 Identity Server's Symantic VIP
Authenticator..

1.  Navigate to
    <https://manager.vip.symantec.com/vipmgr/createtrialaccount.v> and
    create a trial account (this may take few days to get approval).
2.  Download the **VIP Access** for
    [Desktop](https://idprotect.vip.symantec.com/desktop/download.v) or
    [Mobile](https://m.vip.symantec.com/home.v) .
3.  Once the account gets approved, navigate to
    <https://manager.vip.symantec.com/vipmgr/signin.v> and log into VIP
    Manager (use the security code generated from **VIP Access** ).
4.  Click on 'Credentials' tab and search the Credential by the ID (the
    Credential ID appears in **VIP Access** ). Enable the credential
    by selecting the option **Enable Credential** under the **Credential
    Status** .  
    ![](attachments/50510041/50686885.png){width="500"}
5.  Navigate to **Accounts** tab and click on **Manage VIP
    Certificates** from tabs pane in right side of the page.
6.  Click on **Request a Certificate** and then hit **Continue** .
7.  Enter the certificate name for the certificate and hit **Submit
    Request** .
8.  Select the format as **PKCS\#12** and give a valid password finally
    hit **Download Certificate** . Place this certificate in a location
    and use the path in the **Identity Provider** configuration.  
    ![](attachments/50510041/50686887.png){width="500"}
9.  In the properties file placed in resources folder, you can configure
    the Endpoint URL, Namespace URI and API version.
    -   `             vipURL            ` =
        <https://vipservices-auth.verisign.com/val/soap>
    -   `             vipURI            ` =
        <http://www.verisign.com/2006/08/vipservice>
    -   `             Version            ` =2.0

### Deploying travelocity.com sample

The next step is to [deploy the sample app](_Deploying_the_Sample_App_)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding a [identity
provider](https://docs.wso2.com/display/IS500/Working+with+the+Identity+Provider)
and [service
provider](https://docs.wso2.com/display/IS500/Working+with+the+Service+Provider)
.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](https://docs.wso2.com/display/IS510/Running+the+Product) .
2.  Log in to the [management
    console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  In the **Identity** section under the **Main** tab of the management
    console, click **Add** under **Identity Providers** .
4.  Give a suitable name as the **Identity Provider Name** .
5.  Go to Symantec VIP Configuration under Federated Authenticators.

6.  Enter the P12File and P12Password.

    ![](attachments/50510041/50686886.png){width="500"}

7.  Select both checkboxes to Enable Symantec VIP Authenticator and make
    it Default.

8.  Click Register .

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the Identity section under the Main tab, click Add under Service
    Providers .

3.  Enter travelocity.com in the Service Provider Name text box and
    click Register .

4.  In the Inbound Authentication Configuration section, click Configure
    under the SAML2 Web SSO Configuration section.  

    ![](attachments/50510041/50686888.png){width="500"}  

5.  Now set the configuration as follows:

    1.  Issuer : travelocity.com

    2.  Assertion Consumer URL :
        <http://localhost:8080/travelocity.com/home.jsp>

6.  Select the following check-boxes:
    1.  Enable Response Signing

    2.  Enable Single Logout

    3.  Enable Attribute Profile

    4.  Include Attributes in the Response Always

7.  Click Update to save the changes. Now you will be sent back to the
    Service Providers page.

8.  Go to Local and Outbound Authentication Configuration section.

9.  Select the Advanced configuration radio button option .

10. Add the basic authentication as first step and Symantec VIP
    authentication as second step  
    ![](attachments/50510041/50686889.png){width="500"}

You have now added and configured the service provider.

### Configuring User Claim

1.  Go to Claims under IS Management Console.
2.  Select Add New Claim.
3.  Add new claim VIP Credential ID (Change Claim URI as (
    <http://wso2.org/claims/vipcredentialid> ).  
      
    ![](attachments/50510041/50686891.png){width="500"}
4.  Now go to **Users and Roles** .
5.  Enter the **VIP Credential ID** and update the profile.  
    ![](attachments/50510041/50686892.png){width="500"}

### Testing the sample

1.  To  test the sample, go to the following URL:
    [http://localhost:8080/travelocity.com  
    ](http://localhost:8080/travelocity.com)

    [![](attachments/50510041/50686890.jpeg){width="500"}](http://localhost:8080/travelocity.com)

2.  Click the link to log in with SAML from WSO2 Identity Server.

3.  Basic authentication page will be visible, use your IS username and
    password.  
    ![](attachments/50510041/50686894.png){width="500"}

4.  You will be asked to enter the **Security Code** .Type the Security
    Code generated in **VIP Access** , If the authentication success,
    you will be taken to the home page of the travelocity.com app.

    ![](attachments/50510041/50686895.png){width="500"}  

    ![](attachments/50510041/50686896.png){width="500"}  
      
      

  
