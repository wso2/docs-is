# Configuring Duo Security Provisioning Connector

The Duo security provisioning connector and the authenticator work
together as a pair. First, create the user using the Duo Security
provisioning connector and then authenticate the user you created, using
the Duo Security authenticator.

This topic provides instructions on how to configure the Duo app and
how to provision the users from WSO2 Identity Server. See the following
sections for more information.

!!! info 
    You must have the [Duo Security
    Android](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en)
    or [iOS
    application](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8)
    installed on your mobile device to use this authenticator and
    connector.  
    Download the  provisioning connector, authenticator and artifacts from
    [the
    store](https://store.wso2.com/store/assets/isconnector/details/ef24e15b-8a53-4b8d-898e-108a04dc8f73)
    .

!!! info 
    This is tested for the Duo Security API version V2.

### Configuring the Duo Security app

1.  Go to [https://duo.com](https://duo.com/) and click free signup and
    register.
2.  Log in to Duo Security. Click **Applications** from the left panel
    and click the **Protect an Application** button.  
    ![](../../assets/img/51486739/51451210.png) 
3.  In the **Protect an Application** page, select **Admin API** from
    the list.  
    ![](../../assets/img/51486739/51451211.png) 

    !!! warning "Important"
        If you can not see the type “Admin API” in the
        dropdown, contact the Duo team through <support@duosecurity.com> and
        ask for Admin API permission.
    

4.  Once the Integration is created, you are given a **Secret key** and
    an **Integration key** for your integration. You can use these along
    with your Duo host when accessing duo security APIs.  
    ![](../../assets/img/51486739/51451212.png) 
5.  Make sure to enable " **Grant Write Resource** " permission to
    provisioning the users. Check the **Admin API** application settings
    in the Duo Admin Panel ( **Applications \> Admin API,** scroll down
    to **Settings** section **\>** **Permissions** ).

### Configuring user claim

1.  Log into the WSO2 Identity Server [Management
    Console](../../setup/getting-started-with-the-management-console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click [Add New
    Claim](../../learn/adding-claim-mapping).
4.  Select the **Dialect** from the dropdown provided and enter the
    required information.
5.  Add the following user claims under ' http://wso2.org/claims' .

![](../../assets/img/51486808/51451229.png) 

![](../../assets/img/51486808/51451230.png) 

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
        instructions.](../../develop/upgrading-an-authenticator)
    
-   Place the [okio-1.9.0.jar](https://github.com/square/okio/tree/okio-parent-1.9.0#download) into
    the `           <IS_HOME>/repository/components/lib          `
    directory.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider)
.

1.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
2.  In the **Main** menu, click **Add** under **Identity Providers**.
3.  Expand the **Claim Configuration** section and select **Define
    Custom Claim Dialect** under **Basic Claim Configuration** section.
4.  Click **Add Claim Mapping** and add the following claims.  
    ![](../../assets/img/51486808/51451231.png) 
5.  Go to **Duo Provisioning Configuration** under **Outbound
    Provisioning Connectors**. Give a suitable name as the **Identity
    Provider Name** and fill out the fields.  
    ![](../../assets/img/51486808/53284965.png) 
6.  Enter the values for the required fields. You should use Integration
    key, Secret key and Host values of the Duo app that you created.

7.  Click **Register**.

You have now added the identity provider.

### Configuring the resident service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Main** menu, click **Add** under **Service Providers**.
3.  Select **Resident Service Provider** in the Service Providers page
    and add the created Duo identity provider in the **Outbound
    Provisioning Configuration** as indicated in the figure below.  
    
    ![](../../assets/img/51486808/51451232.png) 

4.  Click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the provisioning connector

1.  In the **Main** menu, click **Add** under **Users and Roles** and
    create a new user.

2.  Enter the **User Name** and **Password** for the new user and click
    **Finish**.  
    ![](../../assets/img/51486808/51451233.png) 

3.  Go to <https://admin-xxxxxxxx.duosecurity.com/users> and check the
    newly created user.  
    ![](../../assets/img/51486808/57008458.png) 
