# Configuring Duo Security Provisioning Connector

This topic provides instructions on how to configure the Duo app and
how to provision the users from WSO2 Identity Server. See the following
sections for more information.

This is tested for the Duo Security API version V2.

-   [Configuring the Duo Security
    app](#ConfiguringDuoSecurityProvisioningConnector-ConfiguringtheDuoSecurityapp)
-   [Configuring user
    claim](#ConfiguringDuoSecurityProvisioningConnector-Configuringuserclaim)
-   [Deploying
    Duo artifacts](#ConfiguringDuoSecurityProvisioningConnector-DeployingDuoartifacts)
-   [Configuring the identity
    provider](#ConfiguringDuoSecurityProvisioningConnector-Configuringtheidentityprovider)
-   [Configuring the resident service
    provider](#ConfiguringDuoSecurityProvisioningConnector-Configuringtheresidentserviceprovider)
-   [Testing the provisioning
    connector](#ConfiguringDuoSecurityProvisioningConnector-Testingtheprovisioningconnector)

### Configuring the Duo Security app

1.  Go to [https://duo.com](https://duo.com/) and click free signup and
    register.
2.  Log in to Duo Security. Click **Applications** from the left panel
    and click the **Protect an Application** button.  
    ![](attachments/51486739/51451210.png){width="700" height="153"}
3.  In the **Protect an Application** page, select **Admin API** from
    the list.  
    ![](attachments/51486739/51451211.png){width="700" height="377"}

    !!! warning
    
        **Important** : If you can not see the type “Admin API” in the
        dropdown, contact the Duo team through <support@duosecurity.com> and
        ask for Admin API permission.
    

4.  Once the Integration is created, you are given a **Secret key** and
    an **Integration key** for your integration. You can use these along
    with your Duo host when accessing duo security APIs.  
    ![](attachments/51486739/51451212.png){width="700" height="278"}
5.  Make sure to enable " **Grant Write Resource** " permission to
    provisioning the users. Check the **Admin API** application settings
    in the Duo Admin Panel ( **Applications \> Admin API,** scroll down
    to **Settings** section **\>** **Permissions** ).

### Configuring user claim

1.  Log into the WSO2 Identity Server [Management
    Console](https://docs.wso2.com/identity-server/Getting+Started+with+the+Management+Console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims** .
3.  Click [Add New
    Claim](https://docs.wso2.com/identity-server/Adding+Claim+Mapping) .
4.  Select the **Dialect** from the dropdown provided and enter the
    required information.
5.  Add the following user claims under ' http://wso2.org/claims' .

![](attachments/51486808/51451229.png){width="700" height="286"}

![](attachments/51486808/51451230.png){width="700" height="289"}

### Deploying Duo artifacts

To download the authenticator and artifacts, go to [the WSO2
store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22Duo%22)
.

-   Place the provisioning connector .jar file
    (org.wso2.carbon.extension.identity.provisioning.connector.duo-1.0.1
    `            .jar           ` ) into the
    `            <IS_HOME>/repository/components/dropins           `
    directory.

    !!! note
    
        If you want to upgrade the Duo Provisioning Authenticator in your
        existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

-   Place the
    `                       okio-1.9.0.jar                     ` into
    the `           <IS_HOME>/repository/components/lib          `
    directory.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/identity-server/Configuring+an+Identity+Provider)
.

1.  Log in to the [management
    console](https://docs.wso2.com/identity-server/Getting+Started+with+the+Management+Console)
    as an administrator.
2.  In the **Main** menu, click **Add** under **Identity Providers** .
3.  Expand the **Claim Configuration** section and select **Define
    Custom Claim Dialect** under **Basic Claim Configuration** section.
4.  Click **Add Claim Mapping** and add the following claims.  
    ![](attachments/51486808/51451231.png){width="700" height="239"}
5.  Go to **Duo Provisioning Configuration** under **Outbound
    Provisioning Connectors** . Give a suitable name as the **Identity
    Provider Name** and fill out the fields.  
    ![](attachments/51486808/53284965.png){width="700" height="605"}
6.  Enter the values for the required fields. You should use Integration
    key, Secret key and Host values of the Duo app that you created.

7.  Click **Register** .

You have now added the identity provider.

### Configuring the resident service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Main** menu, click **Add** under **Service Providers** .
3.  Select **Resident Service Provider** in the Service Providers page
    and add the created Duo identity provider in the **Outbound
    Provisioning Configuration** as indicated in the figure below.  
    ![](attachments/51486808/51451232.png){width="700" height="113"}

4.  Click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the provisioning connector

1.  In the **Main** menu, click **Add** under **Users and Roles** and
    create a new user.

2.  Enter the **User Name** and **Password** for the new user and click
    **Finish** .  
    ![](attachments/51486808/51451233.png){width="400"}

3.  Go to <https://admin-xxxxxxxx.duosecurity.com/users> and check the
    newly created user.  
    ![](attachments/51486808/57008458.png){width="700"}
