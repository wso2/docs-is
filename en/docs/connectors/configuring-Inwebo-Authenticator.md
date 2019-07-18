# Configuring Inwebo Authenticator

This topic provides instructions on how to configure the Inwebo app and
the Identity Server to integrate using a sample app. See the following
sections for more information.

Inwebo Authenticator is supported by Identity Server version 5.1.0

-   [Configuring the Inwebo
    app](#ConfiguringInweboAuthenticator-ConfiguringtheInweboapp)
-   [Deploying Inwebo
    artifacts](#ConfiguringInweboAuthenticator-DeployingInweboartifacts)
-   [Deploying travelocity.com sample
    app](#ConfiguringInweboAuthenticator-Deployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringInweboAuthenticator-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringInweboAuthenticator-Configuringtheserviceprovider)
-   [Configuring user
    claim](#ConfiguringInweboAuthenticator-ConfiguringUserClaim)
-   [Testing the
    sample](#ConfiguringInweboAuthenticator-Testingthesample)

### Configuring the Inwebo app

1.  Go to <http://www.inwebo.com/> and click free signup and register.
2.  Activate your email notification and go to
    <https://www.myinwebo.com/> .
3.  Go to Administration console and get the Service Id of admin user.  
    ![](attachments/48276420/51252020.png){width="350"}  
4.  Navigate to Secure Sites and download the certificate for API access
    (.p12 format).
5.  Go to MyInweboAccount and navigate to My Devices, click add a Device
    button. The following window appears.
    ![](attachments/48276420/48206313.png)
6.  Download Inwebo app in your mobile or any other devices. Add the
    above secure site ID or scan the QR code to activate the account

### Deploying Inwebo artifacts

1.  Place the `            inweboauthenticationendpoint.war           `
    file into the
    `            <IS_HOME>/repository/deployment/server/webapps           `
    directory.
2.  Place the
    `             org.wso2.carbon.identity.authenticator.inwebo-1.0.0.jar            `
    file into the
    `             <IS_HOME>/repository/components/dropins            `
    directory.

    !!! note
    
        If you want to upgrade the Inwebo Authenticator in your existing IS
        pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

To download the authenticator and artifacts, go to
[https://store.wso2.com/store/assets/isconnector/inwebo](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22Inwebo%22)
.  

### Deploying travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To configure this, see [Deploying the Sample
App](_Deploying_the_Sample_App_) .

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
    console, click **Add** under **Identity Providers**.
4.  Give a suitable name as the **Identity Provider Name** and fill out
    the form to configure Inwebo by expanding **Inwebo Configuration**
    under **Federated Authenticators**.  
    ![](attachments/48276420/48214226.png) Fill in the following.  

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>Selecting this option enables Inwebo to be used as an authenticator for users provisioned to the Identity Server.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>Selecting the <strong>Default</strong> checkbox signifies that Inwebo is the main/default form of authentication. This removes the selection made for any other <strong>Default</strong> checkboxes for other authenticators.</td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td>Service ID</td>
    <td>Enter the Service ID of your Inwebo app.</td>
    <td>917</td>
    </tr>
    <tr class="even">
    <td>Certificate id</td>
    <td>This is the p12 password of the Inwebo app you created.</td>
    <td>fsh235xd3</td>
    </tr>
    <tr class="odd">
    <td>Configuration file</td>
    <td>This is the p12 file path values from the Inwebo app you created.</td>
    <td><br />
    </td>
    </tr>
    </tbody>
    </table>

5.  Click **Register**.

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
    ![](attachments/48276420/49222042.png){width="720"}

5.  Now set the configuration as follows:

    1.  Issuer : travelocity.com

    2.  Assertion Consumer URL :
        <http://localhost:8080/travelocity.com/home.jsp>

6.  Select the following check-boxes:
    1.  Enable Response Signing

    2.  Enable Assertion Signing

    3.  Enable Single Logout

    4.  Enable Attribute Profile

    5.  Include Attributes in the Response Always

7.  Click Update to save the changes. Now you will be sent back to the
    Service Providers page.

8.  Go to Local and Outbound Authentication Configuration section.

9.  Select the Advanced configuration radio button option .  

10. Add the basic authentication as first step and Inwebo authentication
    as the second step  
    ![](attachments/48276420/48211344.png){width="780" height="477"}

You have now added and configured the service provider.

### Configuring User Claim

1.  Go to Claims under IS Management Console
2.  Select Add New Claim
3.  Add new claim UserId (Change Claim Uri as (
    <http://wso2.org/claims/authentication/inwebo/userId> )  
    ![](attachments/48276420/49221143.png){width="780"}
4.  Go to Service provider, select travalocity.com→Edit → Claim
    configuration
5.  Update the claim UserId  
      
    ![](attachments/48276420/48214228.png){width="780"}
6.  Now go to Users and Roles
7.  Add the details and update the profile.  
      
    ![](attachments/48276420/48211847.png){width="780" height="718"}

### Testing the sample

1.  To test the sample, go to the following URL:
    [http://localhost:8080/travelocity.com
    ![](attachments/48276420/48206317.png){width="780"
    height="502"}](http://localhost:8080/travelocity.com)

2.  Click the link to log in with SAML from WSO2 Identity Server.

3.  Basic authentication page will be visible, use your IS username and
    password.

    ![](attachments/48276420/48214229.png){width="780"}

4.  Hit Click! Button to authenticate Inwebo .  
    ![](attachments/48276420/49221869.png){width="780" height="346"}
5.  You will get a notification in your external device(mobile).

    ![](attachments/48276420/49222015.jpg){width="400"}

6.  Enter your Inwebo PIN

    ![](attachments/48276420/49222016.jpg){width="400"}

7.  Click accept  
    ![](attachments/48276420/49222017.jpg){width="400"}
8.  Click ok and taken to the home page of the travelocity.com app

    ![](attachments/48276420/48211848.png){width="720" height="470"}  

  
