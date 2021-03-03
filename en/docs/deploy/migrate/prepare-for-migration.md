# Prepare for migration

!!! note
    Before you follow this section, see [Before you begin](../../../deploy/migrate/migration-guide) to read on 
    prerequisites.

!!! note
    In this section, `<OLD_IS_HOME> ` is the directory that current Identity
    Server resides in, and `<NEW_IS_HOME>` is the
    directory that WSO2 Identity Server 5.11.0 resides in. 

!!! info "Important" 
    Before proceeding with the migration, change the following property to `false` in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [super_admin]
    create_admin_account = false 
    ```

---

## Groups and Roles Migration 

With WSO2 Identity Server 5.11.0, groups and roles are separated. For more information, see [What Has Changed in 5.11.0](../../../deploy/migrate/what-has-changed#group-and-role-separation).

---

## Migrate custom components

In WSO2 Identity Server 5.11.0 we have done a major upgrade to our kernel and our main components. 
Any custom OSGI bundles which are added manually should be recompiled with new dependency versions 
that are relevant to the new WSO2 IS version.  All custom OSGI components reside in the 
`<OLD_IS_HOME>/repository/components/dropins` directory.

1.  Get the source codes of the custom OSGI components located in the dropins directory. 

2.  Change the dependency versions in the relevant POM files according to the WSO2 IS version that 
    you are upgrading to, and compile them. The compatible dependency versions can be found 
    [here](https://github.com/wso2/product-is/blob/v5.11.0-rc1/pom.xml). 

3.  If you come across any compile time errors, refer to the WSO2 IS code base and make the 
    necessary changes related to that particular component version.

4.  Add the compiled JAR files to the `<NEW_IS_HOME>/repository/components/dropins` directory.

5.  If there were any custom OSGI components in `<OLD_IS_HOME>/repository/components/lib` directory, 
    add newly compiled versions of those components to the `<NEW_IS_HOME>/repository/components/lib`  directory.

---
    
## Migrate the configurations

Refer to the relevant feature documents and
[What Has Changed](../../../deploy/migrate/what-has-changed) to do the configuration migration.

!!! info
    If you have a WSO2 Subscription, it is highly recommended to reach 
    [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa)
    before attempting to proceed with the configuration migration.

---

## Zero downtime migration

!!! info
    If you do not require a zero down time migration, then you can directly proceed to the
    next section, [Migrating to 5.11.0](../../../deploy/migrate/migrate-to-5110).
    
A typical WSO2 Identity Server deployment requires an update or upgrade from time to time, 
usually when there’s a patch, or critical security upgrade for products used in the solution, 
or an upgrade to a newer version. To address this situation while avoiding downtime, system 
admins and DevOps follow blue-green deployments to roll out updates.

??? Info "Blue-Green Migration"
    ![blue-green-migration](../../../assets/img/deploy/migrate/blue-green-wso2-identity-server.png)
    
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

1.  Create a new databases for the new WSO2 Identity Server version (5.11.0) 
    that you are migrating to.
2.  Unzip a WSO2 Identity Server 5.11.0 distribution (use a WUM updated distribution 
    if available). This will be used as the data sync tool between the Identity 
    Server versions. We will refer to WSO2 Identity Server distribution as 
    “**data sync tool**” and location as `<SYNC-TOOL-HOME>`. 
3.  Copy the [sync client jar]( https://maven.wso2.org/nexus/content/groups/wso2-public/org/wso2/carbon/identity/migration/resources/org.wso2.is.data.sync.client/1.0.134/org.wso2.is.data.sync.client-1.0.134.jar) file to the `<SYNC-TOOL-HOME>/repository/components/dropins` directory.
4.  Replace the `log4j2.properties` file located in `<SYNC-TOOL-HOME>/repository/conf` 
    with the log4j2.properties file from [here](../assets/attachments/migration/log4j2.properties). 
    This will create a separate log file `syn.log` in the `<SYNC-TOOL-HOME>/repository/logs` directory 
    which will contain the sync tool related logs.
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
        | IDN_OAUTH2_ACCESS_TOKEN       | OAuth 2.0 tokens                                        | Need to sync if the tokens created during the migration period needs to be valid after migration.                                                                         |
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

8.  Start the sync tool with the following command.
    +   If you want to create the required tables and trigger directly on the database.
        ```bash
        sh wso2server.sh -DprepareSync -DconfigFile=<path to sync.properties file>/sync.properties
        ```
    +   If you want to generate the DDL scripts for the required tables and trigger 
        (after generating you need to manually execute them) on the database.
        ```bash
        sh wso2server.sh -DprepareSync -DgenerateDDL -DconfigFile=<path to sync.properties file>/sync.properties
        ```
    This will generate the required triggers and the metadata tables to sync the data between the databases used for 
    the 2 versions of the identity server. At the moment below tables are supported to be synced.
        +   IDN_IDENTITY_USER_DATA
        +   IDN_OAUTH2_ACCESS_TOKEN
        +   IDN_OAUTH2_ACCESS_TOKEN_SCOPE
        +   IDN_OAUTH2_AUTHORIZATION_CODE
    
9.  Create database dumps from the old databases (databases used in the old version of the WSO2 Identity Server) 
and restore in the new databases created.

10. Proceed to the next section [Migrating to 5.11.0](../../../deploy/migrate/migrate-to-5110).
