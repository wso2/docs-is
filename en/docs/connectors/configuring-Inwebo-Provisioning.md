# Configuring Inwebo Provisioning

This topic provides instructions on how to configure the Inwebo app and
how to provision the users from WSO2 Identity Server. See the following
sections for more information.

-   [Configuring the Inwebo
    app](#ConfiguringInweboProvisioning-ConfiguringtheInweboapp)
-   [Deploying Inwebo
    artifacts](#ConfiguringInweboProvisioning-DeployingInweboartifacts)
-   [Deploying travelocity.com sample
    app](#ConfiguringInweboProvisioning-Deployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringInweboProvisioning-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringInweboProvisioning-Configuringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringInweboProvisioning-Testingtheprovisioningconnector)

### Configuring the Inwebo app

1.  Go to <http://www.inwebo.com/> and click free signup and register an
    account for your enterprise.
2.  Activate your email notification and activate your account.
3.  Navigate to <https://www.myinwebo.com/> .
4.  Go to Administration console from the right side toggle menu and get
    the Service Id of admin user.  
      
    ![](attachments/50505066/51251911.png){width="300"}
5.  Navigate to Secure Sites and download the certificate for API access
    (.p12 format).
6.  Go to MyInweboAccount and navigate to My Devices, click add a Device
    button. The following window appears.  
      
    ![](attachments/50505066/50683079.png){width="500"}
7.  Download Inwebo app in your mobile or any other devices. Add the
    above secure site ID or scan the QR code to activate the account.

### Deploying Inwebo artifacts

1.  Place the provisioning connector .jar file
    (org.wso2.carbon.identity.provisioning.connector.inwebo-1.0.0.jar) into
    the
    `             <IS_HOME>/repository/components/dropins            `
    directory.

    !!! note
    
        If you want to upgrade the Inwebo Provisioning Connector (.jar) in
        your existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

2.  To download the authenticator and artifacts, go to
    [https://store.wso2.com/store/assets/isconnector/inwebo-provisioning](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22Inwebo%22)
    .  

### Deploying travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To configure this, see [Deploying the Sample
App](_Deploying_the_Sample_App_).

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) , copy the
    [axis2\_inwebo.xml](https://github.com/wso2-extensions/identity-outbound-provisioning-inwebo/blob/master/component/provisioning-connector/resources/axis2_inwebo.xml)
    into the `           <IS-HOME>/repository/conf/axis2          `
    directory and [start  up the Identity
    Server](https://docs.wso2.com/display/IS510/Running+the+Product).
2.  Log in to the [management
    console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  In the **Identity** section under the **Main** tab of the management
    console, click **Add** under **Claims**.
4.  Add a new claim for **Language.**  
    **  
    ** ****![](attachments/50505066/50685963.png){width="500"}****
5.  Click **Add** under **Identity Providers**.
6.  Expand the **Claim Configuration** section and select **Define
    Custom Claim Dialect** under **Basic Claim Configuration** section.
    **  
    **
7.  Click **Add Claim Mapping** and add the following claims.  
      
    ![](attachments/50505066/50685960.png){width="500"}
8.  Expand the **Advanced Claim Configuration** section.
9.  Select the Claim URI you added from the **Provisioning Claim
    Filter** dropdown and click **Add Claim**. Enter a default value
    for each **Claim URI** as shown in the following image.  
      
    ![](attachments/50505066/50685961.png){width="500"}  
    The default value for **language** should be either "fr" or "en".
10. Give a suitable name as the **Identity Provider Name** and fill out
    the fields.  
    ![](attachments/50505066/50685962.png){width="500"}

    Properties

    -   Status can be 0 or 1.

        -   0: login is active

        -   1: login is blocked (authentication requests will be
            rejected)

    <!-- -->

    -   Role can be 0 or 1 or 2.

        -   0: user

        -   1: manager of the service (can create, modify and delete
            users)

        -   2: administrator of the service (can also modify parameters
            of the service in the Administration Console)

    <!-- -->

    -   Access can be 0 or 1.

        -   0: service bookmarks are not associated to this user

        -   1: all service bookmarks are associated to this user

    <!-- -->

    -   Code Type can be 0 or 1 or 2.

        -   0: An activation code is generated, valid immediately for 15
            minutes

        -   1: An "inactive" activation code, valid for 3 weeks, is
            generated (it will become active later on, thanks to
            loginActivateCode)

        -   2: An activation link, valid for 3 weeks, is generated.
            LoginSendByMail must be used immediately after

11. Go to **Inwebo Provisioning Configuration** under **Outbound
    Provisioning Connectors**.

12. Enter the values for the required fields. You should use Service Id,
    P12Password and P12FILE path values of the Inwebo app which you
    created.

13. Click Register.

You have now added the identity provider.

### Configuring the resident service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  Select 'Resident Service Provider' under the 'Service Providers' and
    add the created Inwebo identity provider in 'Outbound Provisioning
    Configuration' .

    ![](attachments/50505066/50683359.png){width="800"}

3.  Click ' Update' to save the changes.

You have now added and configured the service provider.

### Testing the provisioning connector

1.  Click 'Add' under 'Users and Roles' and create a new user.

2.  Enter the User Name and Password for the new user and hit
    'Finish'.  
    [![](attachments/50505066/50683376.png){width="800"}](http://localhost:8080/travelocity.com)

3.  Go to
    <https://www.myinwebo.com/console/admin/customer/service/manage/users>
    and check the newly created user.

    ![](attachments/50505066/50683385.png){width="800"}
