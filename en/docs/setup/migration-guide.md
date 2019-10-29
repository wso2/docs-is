# Migrating to 5.9.0

This section walks you through the steps you need to follow to upgrade
WSO2 Identity Server to version 5.9.0. In this
section, `         <OLD_IS_HOME>        ` is the directory that current Identity
Server resides in, and `         <NEW_IS_HOME>        ` is the
directory that WSO2 Identity Server 5.9.0 resides in. 

### Should I migrate?

WSO2 recommends upgrading to the latest version in order to ensure that
users receive the latest updates for the product.

-   For a high level overview of what has been added, changed, or
    deprecated in this release, see [About this
    release](../../get-started/about-this-release).
-   For a detailed overview of behavioral changes in this release, see
    [What Has Changed](../setup/migrating-what-has-changed).
    
### Prerequisites

#### Disabling versioning in the registry configuration
If there are frequently updating registry properties, having the versioning enabled for 
registry resources in the registry can lead to unnecessary growth in the registry related
tables in the database. To avoid this, with WSO2 Identity Server 5.9.0 we have disabled 
versioning by default.

Therefore, when migrating to IS 5.9.0 it is **required** to turn off the registry versioning in your
current WSO2 Identity Server and run the below scripts against the database that is used by the registry.
Alternatively it is possible to turn on registry versioning in IS 5.9.0 and continue. But this is
highly not recommended and these configurations should only be changed once.

!!! info "Turning off registry versioning in your current IS and running the scripts"
    Open the `registry.xml` file in the `<OLD_IS_HOME>/repository/conf` directory.
    Set the `versioningProperties`, `versioningComments`, `versioningTags` and `versioningRatings`
    false.
    
    ```
    <staticConfiguration>
          <versioningProperties>false</versioningProperties>
          <versioningComments>false</versioningComments>
          <versioningTags>false</versioningTags>
          <versioningRatings>false</versioningRatings>
    </staticConfiguration>
    ```
    
    !!! warning
        If the above configurations are already set as false you should not run the below scripts.
    
    When these configurations are turned off we need to remove the versioning detatils from the
    database in order for the registry resources to work properly. Choose the relevant DB type and run the
    script against the DB that the registry resides in.
    
    ??? info "DB Scripts"
        ```tab="H2"
        -- Update the REG_PATH_ID column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        -- Delete versioned tags, were the PATH_ID will be null for older versions --
        delete from REG_RESOURCE_PROPERTY where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_RATING where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_TAG where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_COMMENT where REG_PATH_ID is NULL;
        
        delete from REG_PROPERTY where REG_ID NOT IN (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY);
        
        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG);
        
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT);
        
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING);
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        ```
    
        ```tab="DB2"
        -- Update the REG_PATH_ID column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION)
        /
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION)
        /
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION)
        /
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION)
        /
        
        -- Delete versioned tags, were the PATH_ID will be null for older versions --
        delete from REG_RESOURCE_PROPERTY where REG_PATH_ID is NULL
        /
        delete from REG_RESOURCE_RATING where REG_PATH_ID is NULL
        /
        delete from REG_RESOURCE_TAG where REG_PATH_ID is NULL
        /
        delete from REG_RESOURCE_COMMENT where REG_PATH_ID is NULL
        /
        delete from REG_PROPERTY where REG_ID NOT IN (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY)
        /
        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG)
        /
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT)
        /
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING)
        /
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION)
        /
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION)
        /
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION)
        /
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION)
        /
        
        ```
    
        ```tab="MSSQL"
        -- Update the REG_PATH_ID column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        -- Delete versioned tags, were the PATH_ID will be null for older versions --
        delete from REG_RESOURCE_PROPERTY where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_RATING where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_TAG where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_COMMENT where REG_PATH_ID is NULL;
        
        delete from REG_PROPERTY where REG_ID NOT IN (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY);
        
        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG);
        
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT);
        
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING);
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        ```

        ```tab="MySQL"
        -- Update the REG_PATH_ID column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        -- Delete versioned tags, were the PATH_ID will be null for older versions --
        delete from REG_RESOURCE_PROPERTY where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_RATING where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_TAG where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_COMMENT where REG_PATH_ID is NULL;
        
        delete from REG_PROPERTY where REG_ID NOT IN (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY);
        
        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG);
        
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT);
        
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING);
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        ```
    
        ```tab="Oracle"
        -- Update the REG_PATH_ID column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION)
        /
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION)
        /
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION)
        /
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_PATH_ID=(SELECT REG_RESOURCE.REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION)
        /
        
        -- Delete versioned tags, were the PATH_ID will be null for older versions --
        delete from REG_RESOURCE_PROPERTY where REG_PATH_ID is NULL
        /
        delete from REG_RESOURCE_RATING where REG_PATH_ID is NULL
        /
        delete from REG_RESOURCE_TAG where REG_PATH_ID is NULL
        /
        delete from REG_RESOURCE_COMMENT where REG_PATH_ID is NULL
        /
        delete from REG_PROPERTY where REG_ID NOT IN (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY)
        /
        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG)
        /
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT)
        /
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING)
        /
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_TAG.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION)
        /
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_PROPERTY.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION)
        /
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_COMMENT.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION)
        /
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_RATING.REG_RESOURCE_NAME=(SELECT REG_RESOURCE.REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION)
        /
        
        ```
        
        ```tab="PostgreSQL"
        -- Update the REG_PATH_ID column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_PATH_ID=(SELECT REG_PATH_ID FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        -- Delete versioned tags, were the PATH_ID will be null for older versions --
        delete from REG_RESOURCE_PROPERTY where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_RATING where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_TAG where REG_PATH_ID is NULL;
        
        delete from REG_RESOURCE_COMMENT where REG_PATH_ID is NULL;
        
        delete from REG_PROPERTY where REG_ID NOT IN (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY);
        
        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG);
        
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT);
        
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING);
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        ```
       
!!! warning "Not recommended"
    If you decide to proceed with registry resource versioning enabled, Add the following
    configuration to the `deployment.toml` file of new WSO2 Identity Server. 
    `<NEW_IS_HOME>/repository/conf/deployment.toml`
    
    ```
    [registory.static_configuration]
    enable=false
    ```
    
    Note that changing these configuration should only be done before the initial Identity
    Server startup. If changes are done after the initial startup the registry resource created
    previously will not be available.
   
#### Migrating the Secondary Userstore Password to the Internal Keystore
Ideally, the internal keystore should be used for encrypting internal critical data. However, in previous versions of WSO2 
Identity Server, the secondary userstore passwords are encrypted using the primary keystore, 
which is also used to sign and encrypt tokens

In WSO2 Identity Server 5.9.0 we have moved the secondary userstore password encryption functionality from the 
primary keystore to the internal keystore.

Check this [link](https://docs.wso2.com/display/IS570/Migrating+the+Secondary+Userstore+Password+to+the+Internal+Keystore) 
to see the instructions on migrating the secondary userstore password to encrypt using internal keystore. 

### Preparing for migration

Follow this guide before you begin migration.

1.  Review what has been changed in this release. For a detailed list of
    changes from 5.8.0 to 5.9.0, see
    [What Has Changed](../setup/migrating-what-has-changed) .

2.  This release is a WUM-only release. This means that there are no
    manual patches. You can use WSO2 Update Manager (WUM) to get any
    fixes or latest updates for this release.

    **If you are upgrading to use this version in your production
    environment** , use WSO2 Update Manager to get the latest updates
    available for WSO2 IS 5.9.0. For more information on how to use WSO2
    Update Manager, see [Updating WSO2
    Products](https://docs.wso2.com/display/updates/Using+WSO2+Update+Manager).

3.  Take a backup of the existing database used by the current WSO2 Identity Server. 
    This backup is necessary in case the migration causes issues in the existing database.

4.  Download WSO2 Identity Server 5.9.0 and unzip it in the `<NEW_IS_HOME>` directory.

### Migrating custom components

In WSO2 Identity Server 5.9.0 we have done a major upgrade to our kernel and our main components. 
Any custom OSGI bundles which are added manually should be recompiled with new dependency versions that are relevant 
to the new WSO2 IS version.  All custom OSGI components reside in the `<OLD_IS_HOME>/repository/components/dropins` directory.

1.  Get the source codes of the custom OSGI components located in the dropins directory. 

2.  Change the dependency versions in the relevant POM files according to the WSO2 IS version that 
    you are upgrading to, and compile them. The compatible dependency versions can be found 
    [here](https://github.com/wso2/product-is/blob/v5.9.0-rc1/pom.xml). 

3.  If you come across any compile time errors, refer to the WSO2 IS code base and make the 
    necessary changes related to that particular component version.

4.  Add the compiled JAR files to the `<NEW_IS_HOME>/repository/components/dropins` directory.

5.  If there were any custom OSGI components in `<OLD_IS_HOME>/repository/components/lib` directory, 
    add newly compiled versions of those components to the `<NEW_IS_HOME>/repository/components/lib`  directory.
    
!!! warning “log4j Version”
WSO2 Identity Server 5.9.0 switched from log4j to log4j2. If any custom components are already using 
`carbon.logging` jar for logging purposes, make sure to update the custom components for logging to work 
with log4j2. For instructions, see [Migrating to log4j2](../../setup/migrating-to-log4j2).


### Migrating the configurations

Previous WSO2 Identity Server versions supported multiple configuration files 
such as <code>carbon.xml</code>, <code>identity.xml</code>, and <code>axis2.xml</code>. With the [new 
configuration model](../references/new-configuration-model) in WSO2 Identity Server 5.9.0, configurations are handled by the a single file named 
`deployment.toml` in the `<IS_HOME>/repository/conf` directory.

Refer to the relevant feature documents and [What Has Changed](../setup/migrating-what-has-changed.md)
to add the necessary configurations according to the new configuration model.

!!! info
    If you have a WSO2 Subscription it is highly recommended to reach WSO2 Support
    before attempting to proceed with the configuration migration.
    
### Migrating the embedded LDAP user store

WSO2 does not recommend using the embedded LDAP userstore that is
shipped with WSO2 Identity Server in a production environment. However,
if migration of the embedded LDAP is required, follow the instructions
below to migrate the existing WSO2 IS LDAP user store to the new version
of WSO2 IS.

1.  Copy the `          <OLD_IS_HOME>/repository/data         ` folder
    to `          <NEW_IS_HOME>/repository/data         ` folder.
2.  Restart the server to save the changes.

### Zero down time migration

!!! info
    If you do not require a zero down time migration then you can directly proceed to the
    next section [Executing the migration client](#executing-the-migration-client).
    
A typical WSO2 Identity Server deployment requires an update or upgrade from time to time; 
usually when there’s a patch, or critical security upgrade for products used in the solution, 
or an upgrade to a newer version. To address this situation while avoiding downtime, system 
admins and DevOps follow blue-green deployments to roll out updates.

??? Info "Blue-Green Migration"
    ![blue-green-migration](../assets/img/setup/blue-green-wso2-identity-server.png)
    
    A blue-green deployment is a change management strategy for releasing software. 
    Blue-green deployments require two identical hardware environments that are 
    configured the same way. While one environment is live and serving all production 
    traffic, the other environment remains idle. In the diagram below, the blue 
    environment is live and the green is idle.
    
    As you prepare a new version of WSO2 Identity Server to be deployed into production, 
    the final stage of testing takes place in an environment that is idle, i.e., in 
    this example, the green environment. Once you have deployed and fully tested the 
    deployment in green, you switch the load balancer so all incoming requests now 
    go to green instead of blue. The green environment is now live, and blue is idle.
    
This guide provides instructions to do a blue-green deployment with mission-critical services 
enabled in the deployment. At the moment WSO2 allows,
    <ul>
        <li>Authentication with</li>
        <ul style="list-style-type:circle; padding-left: 25px;">
            <li>OAuth 2.0 / OIDC</li>
            <li>SAML 2</li>
            <li>WS-Federation (Passive)</li>
        </ul>
    </ul>
Data created when using the above-mentioned services are synced from the old system to the new system. 
All the other data will not be preserved in the new system.

Now let's see how to do the blue-green deployment with WSO2 Identity Server.

1.  Create new databases for the new WSO2 Identity Server version (5.9.0) 
    that you are migrating to.
2.  Unzip a WSO2 Identity Server 5.9.0 distribution (use a WUM updated distribution 
    if possible). This will be used as the data sync tool between the Identity 
    Server versions. We will refer to this WSO2 Identity Server distribution as 
    “**data sync tool**” and location as `<SYNC-TOOL-HOME>`.
3.  Copy the [sync client jar](../assets/attachments/migration/org.wso2.is.data.sync.client-1.0.22.jar) file to the `<SYNC-TOOL-HOME>/repository/components/dropins` directory.
4.  Replace the `log4j2.properties` file located in `<SYNC-TOOL-HOME>/repository/conf` 
    with the log4j2.properties file from [here](../assets/attachments/migration/log4j2.properties). This will create a separate log 
    file `syn.log` in the `<SYNC-TOOL-HOME>/repository/logs` directory which will contain the sync 
    tool related logs.
5.  Add the data sources used in **source** and **target** WSO2 Identity Server deployments involved in the migration 
    to `deployment.toml` file located `<SYNC-TOOL-HOME>/repository/conf/deployment.toml`.
    
    ??? tip "A sample configuration written for the MySQL DB type will look this"
            
        ```
        [[datasource]]
        id="source"
        url="jdbc:mysql://localhost:3306/sourcedb"
        username="sourceUsername"
        password="sourcePassword"
        driver="com.mysql.jdbc.Driver"
        [datasource.pool_options]
        maxActive="80"
        maxWait="60000"
        minIdle="5"
        testOnBorrow="true"
        validationQuery="SELECT 1"
        validationInterval="30000"
        defaultAutoCommit="false"
        
        [[datasource]]
        id="target"
        url="jdbc:mysql://localhost:3306/targetdb"
        username="targetUsername"
        password="targetPassword"
        driver="com.mysql.jdbc.Driver"
        [datasource.pool_options]
        maxActive="80"
        maxWait="60000"
        minIdle="5"
        testOnBorrow="true"
        validationQuery="SELECT 1"
        validationInterval="30000"
        defaultAutoCommit="false"

        ```
                
6.  Create a property file with below properties as required and name it as `sync.properties`.
    
    | **Property**                             | **Description**                                                      | **Mandatory/Optional** | **Default value** |
    |------------------------------------------|----------------------------------------------------------------------|------------------------|-------------------|
    | sourceVersion={version}                  | Source product version                                               | Mandatory              | -                 |
    | targetVersion={version}                  | Target product version                                               | Mandatory              | -                 |
    | batchSize={batch_size}                   | Size of a sync batch                                                 | Optional               | 100               |
    | syncInterval={sync_interval}             | Interval in milliseconds between data sync batches                   | Optional               | 5000              |
    | syncTables={TBL_1,TBL_2}                 | Tables to be synced. Tables should be comma separated.               | Mandatory              | -                 |
    | identitySchema={source_jndi,target_jndi} | JNDI names of source and target data sources for an identity schema. | Mandatory              | -                 |

        
    ??? info "Tables that support syncing"
        
        | **Table**                     | **Purpose**                                             | **Recommendation**                                                                                                                                                       |
        |-------------------------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | IDN_IDENTITY_USER_DATA        | Identity claims when the identity data store is enabled | Usually recommended to sync if identity management features are enabled in the system.                                                                                   |
        | IDN_OAUTH2_ACCESS_TOKEN       | OAuth 2.0 tokens                                        | Need to sync if the tokens created during the migration period need to be valid after migration.                                                                         |
        | IDN_OAUTH2_ACCESS_TOKEN_SCOPE | OAuth 2.0 scopes                                        | If the IDN_OAUTH2_ACCESS_TOKEN is synced, this table also needs to be synced.                                                                                            |
        | IDN_OAUTH2_AUTHORIZATION_CODE | OAuth 2.0 authorization codes                           | Need to sync if the authorization codes created during the migration period need to be valid after migration. Not generally required since the validity period is small. |
    
    
    !!! tip
            A sample `sync.properties` file can be found [here](../assets/attachments/migration/sync.properties).
            

7.  Disable the endpoints in the WSO2 Identity Server that are not mission-critical for the maintenance window.
    
    ??? info "Currently traffic allowed endpoints"
        
        **For login common**
        
        | **Endpoint (pattern)**                 | **Use case**                               |
        |----------------------------------------|--------------------------------------------|
        | /commonauth                            | All authentication use cases               |
        | /authenticationendpoint                | All authentication use cases               |
        | /x509certificateauthenticationendpoint | Client certificate based authentication    |
        
        
        **For OAuth 2.0/OpenID Connect**
        
        | **Endpoint (pattern)** | **Use case**                  |
        |------------------------|-------------------------------|
        | /oauth2/token          | OAuth 2.0 token generation    |
        | /oauth2/userinfo       | OAuth 2.0 user info retrieval |
        | /oauth2/introspect     | OAuth 2.0 token introspection |
        | /oauth2/revoke         | OAuth 2.0 token revocation    |
        | /oauth2/authorize      | OAuth 2.0 authorization       |
        | /oauth2/jwks           | OAuth 2.0 jwks                |
        | /oidc/checksession     | OIDC session management       |
        | /oidc/logout           | OIDC logout                   |
        
        
        **For SAML2 Web SSO**
        
        | **Endpoint (pattern)** | **Use case**                  |
        |------------------------|-------------------------------|
        | /samlsso               | SAML 2.0 login                |
        
        
        **For WS-Federation (Passive)**
        
        | **Endpoint (pattern)** | **Use case**                  |
        |------------------------|-------------------------------|
        | /passivests            | Passive sts login             |
        
        
        **For the second factors in the login**
        
        | **Endpoint (pattern)**          | **Use case**             |
        |---------------------------------|--------------------------|
        | /smsotpauthenticationendpoint   | SMS OTP authentication   |
        | /totpauthenticationendpoint     | TOTP authentication      |
        | /emailotpauthenticationendpoint | Email OTP authentication |
        
        
        **For authorization XACML**
        
        | **Endpoint (pattern)**          | **Use case**             |
        |---------------------------------|--------------------------|
        | /api/identity/entitlement       | XACML REST Profile       |

8.  Start the sync tool with below command.
    +   If you want to create the required tables and triggers directly on the database.
        ```bash
        sh wso2server.sh -DprepareSync -DconfigFile=<path to sync.properties file>/sync.properties
        ```
    +   If you want to generate the DDL scripts for the required tables and triggers 
        (after generating you need to manually execute them on the database).
        ```bash
        sh wso2server.sh -DprepareSync -DgenerateDDL -DconfigFile=<path to sync.properties file>/sync.properties
        ```
    This will generate the required triggers and the metadata tables to sync the data between the databases used for 
    the 2 versions of the identity server. At the moment below tables are supported to be synced.
        +   IDN_IDENTITY_USER_DATA
        +   IDN_OAUTH2_ACCESS_TOKEN
        +   IDN_OAUTH2_ACCESS_TOKEN_SCOPE
        +   IDN_OAUTH2_AUTHORIZATION_CODE
    
9.  Create database dumps from the old databases (databases used in the old version of the WSO2 Identity Server) and restore 
    in the new databases created.    


### Executing the migration client

To upgrade to the latest version of WSO2 Identity Server, you need to
upgrade the userstore database. Note that there are no registry schema
changes between versions.

Follow the steps below to perform the upgrade.
    
??? note "If you are using DB2"
    Move indexes to the the
    TS32K Tablespace. The index tablespace in the '
    `           IDN_OAUTH2_ACCESS_TOKEN          ` ' and '
    `           IDN_OAUTH2_AUTHORIZATION_CODE          ` ' tables need
    to be moved to the existing TS32K tablespace in order to support
    newly added table indexes.

    SQLADM or DBADM authority is required in order to invoke
    the `           ADMIN_MOVE_TABLE          ` stored procedure. You
    must also have the appropriate object creation authorities,
    including authorities to issue the SELECT statement on the source
    table and to issue the INSERT statement on the target table.
    

    ??? info "Click here to see the stored procedure" 
        ``` java
        CALL SYSPROC.ADMIN_MOVE_TABLE(
        <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>,
        'IDN_OAUTH2_ACCESS_TOKEN',
        (SELECT TBSPACE FROM SYSCAT.TABLES where TABNAME = 'IDN_OAUTH2_ACCESS_TOKEN' AND TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>),
        'TS32K',
        (SELECT TBSPACE FROM SYSCAT.TABLES where TABNAME = 'IDN_OAUTH2_ACCESS_TOKEN' AND TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>),
        '',
        '',
        '',
        '',
        '',
        'MOVE');

        CALL SYSPROC.ADMIN_MOVE_TABLE(
        <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>,
        'IDN_OAUTH2_AUTHORIZATION_CODE',
        (SELECT TBSPACE FROM SYSCAT.TABLES where TABNAME = 'IDN_OAUTH2_AUTHORIZATION_CODE' AND TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>),
        'TS32K',
        (SELECT TBSPACE FROM SYSCAT.TABLES where TABNAME = 'IDN_OAUTH2_AUTHORIZATION_CODE' AND TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>),
        '',
        '',
        '',
        '',
        '',
        'MOVE');

        Where,

        <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE> and <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE> : Replace these schema’s with each respective schema for the table.
        ```

    If you recieve an error due to missing
    `               SYSTOOLSPACE              ` or
    `               SYSTOOLSTMPSPACE              ` tablespaces, create
    these tablespaces manually using the following script prior to
    executing the stored procedure given above. For more information,
    see [SYSTOOLSPACE and SYSTOOLSTMPSPACE table
    spaces](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_10.5.0/com.ibm.db2.luw.admin.gui.doc/doc/c0023713.html)
    in the IBM documentation.           

    ``` java
        CREATE TABLESPACE SYSTOOLSPACE IN IBMCATGROUP
          MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
          EXTENTSIZE 4;
    
        CREATE USER TEMPORARY TABLESPACE SYSTOOLSTMPSPACE IN IBMCATGROUP
          MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
          EXTENTSIZE 4;
    ```

1.  If you manually added any custom OSGI bundles to the
    `          <OLD_IS_HOME>/repository/components/dropins         `
    directory, copy those to the
    `          <NEW_IS_HOME>/repository/components/dropins         `
    directory.
    
    !!! note
        You may need to update the custom components to work with WSO2 Identity Server 5.9.0, 
        refer [Migrating custom components](#migrating-custom-components).

2.  If you manually added any JAR files to the
    `           <OLD_IS_HOME>/repository/components/lib          `
    directory, copy those and paste in the
    `           <NEW_IS_HOME>/repository/components/lib          `
    directory.

3.  Copy the `           .jks          ` files from the
    `           <OLD_IS_HOME>/repository/resources/security          `
    directory and paste in the
    `           <NEW_IS_HOME>/repository/resources/security          `
    directory.

4.  If you have created tenants in the previous WSO2 Identity Server
    version and if there are any resources in the
    `          <OLD_IS_HOME>/repository/tenants         ` directory,
    copy the content to the
    `          <NEW_IS_HOME>/repository/tenants         ` directory.
5.  If you have created secondary user stores in the previous WSO2 IS
    version, copy the content in the
    `           <OLD_IS_HOME>/repository/deployment/server/userstores          `
    directory to the
    `           <NEW_IS_HOME>/repository/deployment/server/userstores          `
    directory.
    
    !!! warning
        If you are using a version prior to WSO2 Identity Server 5.8.0, then do steps 6 to 9 
        otherwise directly proceed to step 9.
    
6.  Do the following database updates:  
    1.  Download the [migration resources](../assets/attachments/migration/wso2is-5.9.0-migration.zip)
        and unzip it to a local directory. This directory is referred to
        as `             <IS5.9.0_MIGRATION_TOOL_HOME>            ` .

    2.  Copy the
        `             org.wso2.carbon.is.migration-5.9.0.jar            `
     found in the
        `             <IS5.9.0_MIGRATION_TOOL_HOME>/dropins            `
        directory, and paste it in the
        `             <NEW_IS_HOME>/repository/components/dropins            `
        directory.

    3.  Copy migration-resources directory to the
        `             <NEW_IS_HOME>            ` root directory.

    4.  Ensure that the following property values are as follows in the
        `             migration-config.yaml            ` file found in
        the `             <NEW_IS_HOME>/migration-resources            `
        directory.

        ``` java
        migrationEnable: "true"

        currentVersion: "5.7.0"

        migrateVersion: "5.9.0"
        ```
        
        !!! note
            Here the `currentVersion` is the current WSO2 Identity Server version your using.

7.  Start the WSO2 Identity Server 5.9.0 with the following command to
    execute the migration client.

    1.  Linux/Unix:

        ```bash 
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    2.  Windows:

        ```bash
        wso2server.bat -Dmigrate -Dcomponent=identity
        ```

8. Stop the server once the task of migration client is completed.

9. Run the following DB script against the Identity DB.

    ```tab="H2"
    CREATE TABLE IF NOT EXISTS FIDO2_DEVICE_STORE (
                TENANT_ID INTEGER,
                DOMAIN_NAME VARCHAR(255) NOT NULL,
                USER_NAME VARCHAR(45) NOT NULL,
                TIME_REGISTERED TIMESTAMP,
                USER_HANDLE VARCHAR(200) NOT NULL,
                CREDENTIAL_ID VARCHAR(200) NOT NULL,
                PUBLIC_KEY_COSE VARCHAR(2048) NOT NULL,
                SIGNATURE_COUNT BIGINT,
                USER_IDENTITY VARCHAR(200) NOT NULL,
                PRIMARY KEY (TENANT_ID, DOMAIN_NAME, USER_NAME, USER_HANDLE));
    
    CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_APP_INFO (
                SESSION_ID VARCHAR (100) NOT NULL,
                SUBJECT VARCHAR (100) NOT NULL,
                APP_ID INTEGER NOT NULL,
                INBOUND_AUTH_TYPE VARCHAR (255) NOT NULL,
                PRIMARY KEY (SESSION_ID, SUBJECT, APP_ID, INBOUND_AUTH_TYPE));
    
    CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_META_DATA (
                SESSION_ID VARCHAR (100) NOT NULL,
                PROPERTY_TYPE VARCHAR (100) NOT NULL,
                VALUE VARCHAR (255) NOT NULL,
                PRIMARY KEY (SESSION_ID, PROPERTY_TYPE, VALUE));
    
    CREATE TABLE IF NOT EXISTS IDN_FUNCTION_LIBRARY (
                NAME VARCHAR(255) NOT NULL,
                DESCRIPTION VARCHAR(1023),
                TYPE VARCHAR(255) NOT NULL,
                TENANT_ID INTEGER NOT NULL,
                DATA BLOB NOT NULL,
                PRIMARY KEY (TENANT_ID,NAME));
    
    CREATE INDEX IF NOT EXISTS IDX_FIDO2_STR ON FIDO2_DEVICE_STORE(USER_NAME, TENANT_ID, DOMAIN_NAME, CREDENTIAL_ID, USER_HANDLE);
    
    ```

    ```tab="DB2"
    CREATE TABLE FIDO2_DEVICE_STORE (
              TENANT_ID INTEGER NOT NULL,
              DOMAIN_NAME VARCHAR(255) NOT NULL,
              USER_NAME VARCHAR(45) NOT NULL,
              TIME_REGISTERED TIMESTAMP,
              USER_HANDLE VARCHAR(64) NOT NULL,
              CREDENTIAL_ID VARCHAR(200) NOT NULL,
              PUBLIC_KEY_COSE VARCHAR(1024) NOT NULL,
              SIGNATURE_COUNT BIGINT,
              USER_IDENTITY VARCHAR(512) NOT NULL,
            PRIMARY KEY (CREDENTIAL_ID, USER_HANDLE))
    /
    
    CREATE TABLE IDN_AUTH_SESSION_APP_INFO (
              SESSION_ID VARCHAR (100) NOT NULL,
              SUBJECT VARCHAR (100) NOT NULL,
              APP_ID INTEGER NOT NULL,
              INBOUND_AUTH_TYPE VARCHAR (255) NOT NULL,
            PRIMARY KEY (SESSION_ID, SUBJECT, APP_ID, INBOUND_AUTH_TYPE)
    )
    /
    
    CREATE TABLE IDN_AUTH_SESSION_META_DATA (
              SESSION_ID VARCHAR (100) NOT NULL,
              PROPERTY_TYPE VARCHAR (100) NOT NULL,
              VALUE VARCHAR (255) NOT NULL,
            PRIMARY KEY (SESSION_ID, PROPERTY_TYPE, VALUE)
    )
    /
    
    CREATE TABLE IDN_FUNCTION_LIBRARY (
              NAME VARCHAR(255) NOT NULL,
              DESCRIPTION VARCHAR(1023),
              TYPE VARCHAR(255) NOT NULL,
              TENANT_ID INTEGER NOT NULL,
              DATA BLOB NOT NULL,
            PRIMARY KEY (TENANT_ID,NAME)
    )
    /
    
    CREATE INDEX IDX_FIDO2_STR ON FIDO2_DEVICE_STORE(USER_NAME, TENANT_ID, DOMAIN_NAME, CREDENTIAL_ID, USER_HANDLE)
    /
    
    ```

    ```tab="MSSQL"
    IF NOT  EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[DBO].[FIDO2_DEVICE_STORE]') AND TYPE IN (N'U'))
    CREATE TABLE FIDO2_DEVICE_STORE (
      TENANT_ID INTEGER,
      DOMAIN_NAME VARCHAR(255) NOT NULL,
      USER_NAME VARCHAR(45) NOT NULL,
      TIME_REGISTERED DATETIME,
      USER_HANDLE VARCHAR(64) NOT NULL,
      CREDENTIAL_ID VARCHAR(200) NOT NULL,
      PUBLIC_KEY_COSE VARCHAR(1024) NOT NULL,
      SIGNATURE_COUNT BIGINT,
      USER_IDENTITY VARCHAR(512) NOT NULL,
      PRIMARY KEY (CREDENTIAL_ID, USER_HANDLE)
    );
    
    IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[DBO].[IDN_AUTH_SESSION_APP_INFO]') AND TYPE IN (N'U'))
    CREATE TABLE IDN_AUTH_SESSION_APP_INFO (
      SESSION_ID VARCHAR (100) NOT NULL,
      SUBJECT VARCHAR (100) NOT NULL,
      APP_ID INTEGER NOT NULL,
      INBOUND_AUTH_TYPE VARCHAR (255) NOT NULL,
      PRIMARY KEY (SESSION_ID, SUBJECT, APP_ID, INBOUND_AUTH_TYPE)
    );
    
    IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[DBO].[IDN_AUTH_SESSION_META_DATA]') AND TYPE IN (N'U'))
    CREATE TABLE IDN_AUTH_SESSION_META_DATA (
      SESSION_ID VARCHAR (100) NOT NULL,
      PROPERTY_TYPE VARCHAR (100) NOT NULL,
      VALUE VARCHAR (255) NOT NULL,
      PRIMARY KEY (SESSION_ID, PROPERTY_TYPE, VALUE)
    );
    
    IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[DBO].[IDN_FUNCTION_LIBRARY]') AND TYPE IN (N'U'))
    CREATE TABLE IDN_FUNCTION_LIBRARY (
    	NAME VARCHAR(255) NOT NULL,
    	DESCRIPTION VARCHAR(1023),
    	TYPE VARCHAR(255) NOT NULL,
    	TENANT_ID INTEGER NOT NULL,
    	DATA VARBINARY(MAX) NOT NULL,
    	PRIMARY KEY (TENANT_ID,NAME)
    );
    
    IF NOT EXISTS (SELECT * FROM SYS.indexes WHERE name = 'IDX_FIDO2_STR' and object_id = OBJECT_ID('FIDO2_DEVICE_STORE'))
    CREATE INDEX IDX_FIDO2_STR ON FIDO2_DEVICE_STORE (USER_NAME, TENANT_ID, DOMAIN_NAME, CREDENTIAL_ID, USER_HANDLE);
    
    ```

    ```tab="MySQL"
    CREATE TABLE IF NOT EXISTS FIDO2_DEVICE_STORE (
      TENANT_ID INTEGER,
      DOMAIN_NAME VARCHAR(255) NOT NULL,
      USER_NAME VARCHAR(45) NOT NULL,
      TIME_REGISTERED TIMESTAMP,
      USER_HANDLE VARCHAR(64) NOT NULL,
      CREDENTIAL_ID VARCHAR(200) NOT NULL,
      PUBLIC_KEY_COSE VARCHAR(1024) NOT NULL,
      SIGNATURE_COUNT BIGINT,
      USER_IDENTITY VARCHAR(512) NOT NULL,
      PRIMARY KEY (CREDENTIAL_ID, USER_HANDLE)
    );
    
    CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_APP_INFO (
      SESSION_ID VARCHAR (100) NOT NULL,
      SUBJECT VARCHAR (100) NOT NULL,
      APP_ID INTEGER NOT NULL,
      INBOUND_AUTH_TYPE VARCHAR (255) NOT NULL,
      PRIMARY KEY (SESSION_ID, SUBJECT, APP_ID, INBOUND_AUTH_TYPE)
    );
    
    CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_META_DATA (
      SESSION_ID VARCHAR (100) NOT NULL,
      PROPERTY_TYPE VARCHAR (100) NOT NULL,
      VALUE VARCHAR (255) NOT NULL,
      PRIMARY KEY (SESSION_ID, PROPERTY_TYPE, VALUE)
    );
    
    CREATE TABLE IF NOT EXISTS IDN_FUNCTION_LIBRARY (
    	NAME VARCHAR(255) NOT NULL,
    	DESCRIPTION VARCHAR(1023),
    	TYPE VARCHAR(255) NOT NULL,
    	TENANT_ID INTEGER NOT NULL,
    	DATA BLOB NOT NULL,
    	PRIMARY KEY (TENANT_ID,NAME)
    );
    
    CREATE INDEX IDX_FIDO2_STR ON FIDO2_DEVICE_STORE(USER_NAME, TENANT_ID, DOMAIN_NAME, CREDENTIAL_ID, USER_HANDLE);
    
    ```

    ```tab="Oracle"
    CREATE TABLE FIDO2_DEVICE_STORE (
          TENANT_ID INTEGER,
          DOMAIN_NAME VARCHAR(255) NOT NULL,
          USER_NAME VARCHAR(45) NOT NULL,
          TIME_REGISTERED TIMESTAMP,
          USER_HANDLE VARCHAR(64) NOT NULL,
          CREDENTIAL_ID VARCHAR(200) NOT NULL,
          PUBLIC_KEY_COSE VARCHAR(1024) NOT NULL,
          SIGNATURE_COUNT NUMBER(19),
          USER_IDENTITY VARCHAR(512) NOT NULL,
          PRIMARY KEY (CREDENTIAL_ID, USER_HANDLE))
    /
    
    CREATE TABLE IDN_AUTH_SESSION_APP_INFO (
          SESSION_ID VARCHAR (100) NOT NULL,
          SUBJECT VARCHAR (100) NOT NULL,
          APP_ID INTEGER NOT NULL,
          INBOUND_AUTH_TYPE VARCHAR (255) NOT NULL,
          PRIMARY KEY (SESSION_ID, SUBJECT, APP_ID, INBOUND_AUTH_TYPE))
    /
    
    CREATE TABLE IDN_AUTH_SESSION_META_DATA (
          SESSION_ID VARCHAR (100) NOT NULL,
          PROPERTY_TYPE VARCHAR (100) NOT NULL,
          VALUE VARCHAR (255) NOT NULL,
          PRIMARY KEY (SESSION_ID, PROPERTY_TYPE, VALUE))
    /
    
    CREATE TABLE IDN_FUNCTION_LIBRARY (
          NAME VARCHAR(255) NOT NULL,
          DESCRIPTION VARCHAR(1023),
          TYPE VARCHAR(255) NOT NULL,
          TENANT_ID INTEGER NOT NULL,
          DATA BLOB NOT NULL,
          PRIMARY KEY (TENANT_ID,NAME))
    /
    
    CREATE INDEX IDX_FIDO2_STR ON FIDO2_DEVICE_STORE(USER_NAME, TENANT_ID, DOMAIN_NAME, CREDENTIAL_ID, USER_HANDLE)
    /
    
    ```
    
    ```tab="PostgreSQL"
    CREATE TABLE FIDO2_DEVICE_STORE (
            TENANT_ID INTEGER,
            DOMAIN_NAME VARCHAR(255) NOT NULL,
            USER_NAME VARCHAR(45) NOT NULL,
            TIME_REGISTERED TIMESTAMP,
            USER_HANDLE VARCHAR(64) NOT NULL,
            CREDENTIAL_ID VARCHAR(200) NOT NULL,
            PUBLIC_KEY_COSE VARCHAR(1024) NOT NULL,
            SIGNATURE_COUNT BIGINT,
            USER_IDENTITY VARCHAR(512) NOT NULL,
          PRIMARY KEY (CREDENTIAL_ID, USER_HANDLE));
    
    CREATE TABLE IDN_AUTH_SESSION_APP_INFO (
            SESSION_ID VARCHAR (100) NOT NULL,
            SUBJECT VARCHAR (100) NOT NULL,
            APP_ID INTEGER NOT NULL,
            INBOUND_AUTH_TYPE VARCHAR (255) NOT NULL,
          PRIMARY KEY (SESSION_ID, SUBJECT, APP_ID, INBOUND_AUTH_TYPE)
    );
    
    CREATE TABLE IDN_AUTH_SESSION_META_DATA (
            SESSION_ID VARCHAR (100) NOT NULL,
            PROPERTY_TYPE VARCHAR (100) NOT NULL,
            VALUE VARCHAR (255) NOT NULL,
          PRIMARY KEY (SESSION_ID, PROPERTY_TYPE, VALUE)
    );
    
    CREATE TABLE IDN_FUNCTION_LIBRARY (
            NAME VARCHAR(255) NOT NULL,
            DESCRIPTION VARCHAR(1023),
            TYPE VARCHAR(255) NOT NULL,
            TENANT_ID INTEGER NOT NULL,
            DATA BYTEA NOT NULL,
          PRIMARY KEY (TENANT_ID,NAME)
    );
    
    CREATE INDEX IDX_FIDO2_STR ON FIDO2_DEVICE_STORE(USER_NAME, TENANT_ID, DOMAIN_NAME, CREDENTIAL_ID, USER_HANDLE);

    ```
    
### Executing the sync tool

!!! warning
    Proceed with this step only if you have opt in for [Zero down time migration](#zero-down-time-migration).
    Otherwise your migration task is completed now and you can omit the following steps.
    
1.  Start the data sync tool with below command pointing to the  sync.properties file. This will start syncing data 
    created in the old WSO2 Identity Server database after taking the database dump to the new WSO2 Identity Server database.
    ```bash
    sh wso2server.sh -DsyncData -DconfigFile=<path to sync.properties file>/sync.properties
    ```

2.  Monitor the logs in the sync tool to see how many entries are synced at a given time and the data sync process is 
    completed. Below line will be printed in the logs for each table you have specified to sync if there are no 
    data to be synced.

    ```tab="Sample"
    [2019-02-27 17:26:32,388]  INFO {org.wso2.is.data.sync.system.pipeline.process.BatchProcessor} -  No data to sync for: <TABLE_NAME>
    ```
    
    !!! info
        If you have some traffic to the old version of the WSO2 Identity Server, the number of entries to be synced might 
        not become zero at any time. In that case, watch for the logs and decide on a point that the number of entries 
        that are synced is a lower value.

3.  When the data sync is completed, switch the traffic from the old setup to the new setup.

4.  Allow the sync client to run for some time to sync the entries that were not synced before switching the deployments. 
    When the number of entries synced by the sync tool, becomes zero, stop the sync client.
    
### Verifying the migration was successful

After the migration is completed do the following verification steps.

+   Monitor the system health (CPU, memory usage etc).
+   Monitor the WSO2 logs to see if there are errors logged in the log files.
+   Run functional tests against the migrated deployment to verify that all functionality is working as expected.

If you see any problems in the migrated system, revert the traffic back to the previous setup and investigate the problem.
    
    
    
