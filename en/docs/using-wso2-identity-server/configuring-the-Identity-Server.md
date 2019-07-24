# Configuring the Identity Server

This section provides you with detailed information on how to configure
the WSO2 Identity Server from the start. The following diagram depicts
the normal flow of events you would follow.

![](../../assets/img//103329390/103329391.png)

As per the above diagram, when setting up the Identity Server, you would
configure the following in the order mentioned.

-   **[Databases](https://docs.wso2.com/display/ADMIN44x/Working+with+Databases)  
    ** When configuring the Identity Server, the first step to do is to
    set up the databases. This includes creating the database and
    populating it with the various tables that are required. Once you
    have set up the databases, configure the datasources to point to the
    databases created. See [Setting up the Physical
    Database](https://docs.wso2.com/display/ADMIN44x/Setting+up+the+Physical+Database)
    for information on setting up the database with its tables and
    configuring the datasources.  

-   **[User stores](_Configuring_the_Realm_)  
    ** The next step is to configure user stores. These can be either
    primary or secondary user stores. Instead of using the user store
    that comes inbuilt with the product, you can configure your own user
    store with the Identity Server. See [Configuring User
    Stores](_Configuring_User_Stores_) or information on user store
    configurations.  

-   **[Users, roles and
    permissions](_Configuring_Users_Roles_and_Permissions_)**  
    You can now add users and assign roles to the user stores. Each role
    can have specific permissions. See [Configuring Users, Roles and
    Permissions](_Configuring_Users_Roles_and_Permissions_) for more
    information on working with users, roles and permissions.  
      

-   **[Claims](_Claim_Management_)**  
    You can map a set of attributes from the underlying user store to a
    set of defined claims. See [Claim Management](_Claim_Management_) to
    work with claim dialects and provide mapping instructions.  
      

-   [**Features**](https://docs.wso2.com/display/ADMIN44x/Working+with+Features)  
    Install any additional features you need for the Identity Server. A
    common feature that can be installed is the key manager feature when
    [configuring IS as the key
    manager](https://docs.wso2.com/display/CLUSTER420/Configuring+the+Identity+Server+5.0.0+with+the+API+Manager+1.8.0+or+1.7.0)
    in a distributed WSO2 API Manager set up. See
    [Features](https://docs.wso2.com/display/ADMIN44x/Working+with+Features)
    for more information.  

-   **[Setting up
    Keystores](https://docs.wso2.com/display/ADMIN44x/Using+Asymmetric+Encryption)**  
    Create and add a keystore to manage keys that are stored in the
    database. This is very useful in WS-Security scenarios. See [Using
    Asymmetric
    Encryption](https://docs.wso2.com/display/ADMIN44x/Using+Asymmetric+Encryption)
    in the WSO2 Product Administration Guide for more information.  

-   **[Tenants](_Creating_and_Managing_Tenants_)**  
    Add and view tenants. This feature enables users to have a
    customized experience. See [Creating and Managing
    Tenants](_Creating_and_Managing_Tenants_) for more information. Also
    see [Email Templates](_Email_Templates_) for more information on
    customizing automated emails for users configured under specific
    tenants.  

-   **[Management
    console](../../setup/getting-started-with-the-management-console)  
    ** Once you have configured the user stores, you can configure
    various tools available to you in the [management
    console](../../setup/getting-started-with-the-management-console). See [Using
    WSO2 Identity Server](_Using_WSO2_Identity_Server_) for information
    on working with the features in the **Main** menu.

    **Management console features**

    You can do the following using the tools available in the
    **Configure** menu.

    -   [Set up
        logging](https://docs.wso2.com/display/ADMIN44x/Monitoring+Logs+using+Management+Console)
    -   [Working with Server Roles](_Server_Roles_)

    On the **[Tools](_Using_Tools_)** menu, you can do the following.

    -   [Work with the SAML2 toolkit](_Using_the_SAML2_Toolkit_)
    -   [Work with the TryIt tool](_Using_the_XACML_TryIt_Tool_)

    On the **[Monitor](_Monitoring_the_Identity_Server_)** menu, you can
    do the following.

    -   [View system statistics](_System_Statistics_)
    -   [View system logs](_System_Logs_)
    -   [Work with SOAP tracer](../../using-wso2-identity-server/soap-tracer_)

-   **[Identity
    providers](_Adding_and_Configuring_an_Identity_Provider_)**  
    Once everything else is configured, you can add an identity
    provider. You can link this to the user store you configured and
    also specify which protocols you wish to use to configure your IdP.
    See the [architecture](_Architecture_) of the Identity Server to see
    how the identity provider configurations are used in the bigger
    picture.  
-   **[Service
    providers](_Adding_and_Configuring_a_Service_Provider_)**  
    Finally, configure the service provider to integrate with the
    identity provider and the Identity Server. You can link this to the
    user store you configured and also specify which protocols you wish
    to use to configure your SP. See the [architecture](_Architecture_)
    of the Identity Server to see how the service provider
    configurations are used in the bigger picture.  
