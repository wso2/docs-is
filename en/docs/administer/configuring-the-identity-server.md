# Configuring the Identity Server

This section provides you with detailed information on how to configure
the WSO2 Identity Server from the start. The following diagram depicts
the normal flow of events you would follow.

![WSO2 Identity Server configuration flow of events]( ../../assets/img/using-wso2-identity-server/identity-server-configuration-flow-of-events.png)

As per the above diagram, when setting up WSO2 Identity Server, you would
configure the following in the order mentioned.

-   **[Databases](../../admin-guide/working-with-databases)**  
    When configuring WSO2 Identity Server, the first step to do is to
    set up the databases. This includes creating the database and
    populating it with the various tables that are required. Once you
    have set up the databases, configure the datasources to point to the
    databases created. See [Setting up the Physical
    Database](../../admin-guide/setting-up-the-physical-database)
    for information on setting up the database with its tables and
    configuring the datasources.  

-   **[User stores](../../using-wso2-identity-server/configuring-the-realm)**  
    The next step is to configure user stores. These can be either
    primary or secondary user stores. Instead of using the user store
    that comes inbuilt with the product, you can configure your own user
    store with the Identity Server. See [Configuring User
    Stores](../../using-wso2-identity-server/configuring-user-stores) or information on user store
    configurations.

-   **[Users, roles and permissions](../../using-wso2-identity-server/configuring-users-roles-and-permissions)**  
    You can now add users and assign roles to the user stores. Each role
    can have specific permissions. See [Configuring Users, Roles and
    Permissions](../../using-wso2-identity-server/configuring-users-roles-and-permissions) for more
    information on working with users, roles and permissions.  
      

-   **[Claims](../../using-wso2-identity-server/claim-management)**  
    You can map a set of attributes from the underlying user store to a
    set of defined claims. See [Claim Management](../../using-wso2-identity-server/claim-management) to
    work with claim dialects and provide mapping instructions.  
      

-   **[Features](../../admin-guideworking-with-features)**  
    Install any additional features you need for WSO2 Identity Server. A
    common feature that can be installed is the key manager feature when
    [configuring IS as the key
    manager](../../admin-guide/configuring-wso2-identity-server-as-the-key-manager-in-wso2-api-manager)
    in a distributed WSO2 API Manager set up. See
    [Features](../../admin-guide/working-with-features)
    for more information.  

-   **[Setting up Keystores](../../admin-guide/using-asymmetric-encryption)**  
    Create and add a keystore to manage keys that are stored in the
    database. This is very useful in WS-Security scenarios. See [Using
    Asymmetric
    Encryption](../../admin-guide/using-asymmetric-encryption)
    in the WSO2 Product Administration Guide for more information.  

-   **[Tenants](../../using-wso2-identity-server/creating-and-managing-tenants)**  
    Add and view tenants. This feature enables users to have a
    customized experience. See [Creating and Managing
    Tenants](../../using-wso2-identity-server/creating-and-managing-tenants) for more information. Also
    see [Email Templates](../../using-wso2-identity-server/email-templates) for more information on
    customizing automated emails for users configured under specific
    tenants.  

-   **[Management console](../../setup/getting-started-with-the-management-console)**  
    Once you have configured the user stores, you can configure
    various tools available to you in the [management
    console](../../setup/getting-started-with-the-management-console). See [Using
    WSO2 Identity Server](../../using-wso2-identity-server/using-wso2-identity-server) for information
    on working with the features in the **Main** menu.

    !!! abstract "Management console features" 
        You can do the following using the tools available in the **Configure** menu.

        -   [Set up
            logging](../../admin-guide/monitoring-logs-using-management-console)
        -   [Working with Server Roles](../../using-wso2-identity-server/server-roles)

        On the **[Tools](../../using-wso2-identity-server/using-tools)** menu, you can do the following.

        -   [Work with the SAML2 toolkit](../../using-wso2-identity-server/using-the-saml2-toolkit)
        -   [Work with the TryIt tool](../../using-wso2-identity-server/using-the-xacml-tryit-tool)

        On the **[Monitor](../../using-wso2-identity-server/monitoring-the-identity-server)** menu, you can
        do the following.

        -   [View system statistics](../../using-wso2-identity-server/system-statistics)
        -   [View system logs](../../using-wso2-identity-server/system-logs)
        -   [Work with SOAP tracer](../../using-wso2-identity-server/soap-tracer)

-   **[Identity providers](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider)**  
    Once everything else is configured, you can add an identity
    provider. You can link this to the user store you configured and
    also specify which protocols you wish to use to configure your IdP.
    See the [architecture](../../getting-started/architecture) of the Identity Server to see
    how the identity provider configurations are used in the bigger
    picture.  
-   **[Service
    providers](../../using-wso2-identity-server/adding-and-configuring-a-service-provider)**  
    Finally, configure the service provider to integrate with the
    identity provider and the Identity Server. You can link this to the
    user store you configured and also specify which protocols you wish
    to use to configure your SP. See the [architecture](../../gettin-started/architecture)
    of the Identity Server to see how the service provider
    configurations are used in the bigger picture.  
