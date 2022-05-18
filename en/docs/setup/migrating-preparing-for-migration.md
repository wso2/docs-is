# Preparing for migration

!!! note
    Before you follow this section, see [Before you begin](../../setup/migration-guide) to read on 
    prerequisites.

!!! note
    In this section, `<OLD_IS_HOME>` is the directory that current Identity
    Server resides in, and `<NEW_IS_HOME>` is the
    directory that WSO2 Identity Server 6.0.0 resides in. 

!!! info "Important" 
    Before proceeding with the migration, change the following property to `false` in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [super_admin]
    create_admin_account = false 
    ```
        
## Groups and Roles Migration 

With WSO2 Identity Server 5.11.0, groups and roles are separated. For more information, see [What Has Changed in 5.11.0](../../../5.11.0/setup/migrating-what-has-changed#group-and-role-separation).

## Groups and Roles Improvements Migration

With WSO2 Identity Server 6.0.0, groups and roles improvements are introduced. For more information, see [Group and role separation](../../../5.11.0/setup/migrating-what-has-changed/#group-and-role-separation).

Please note that following abbreviations are used in the sections below.

* wso2.role claim = http://wso2.org/claims/role
* wso2.roles claim = http://wso2.org/claims/roles
* wso2.groups claim = http://wso2.org/claims/groups

Please refer to the below sections related to this improvement.

### Claim configuration changes

Following changes have been made to the product claims.

* wso2.role claim - Modified
  * Removed `supported by default`
  * Updated display name to `Roles and groups`
  * Updated description to `Include both userstore groups and internal roles`
* wso2.roles claim - New
  * Display name : Roles 
  * AttributeID:  roles
  * Description: Roles
  * `Supported by default` configured as true
  * `read-only` configured as true
* wso2.groups claim - Modified
  * `supported by default` configured as true
  * `read-only` configured as true
* OIDC group claim - Modified
  * Updated mapped local claim to wso2.groups claim
* OIDC roles claim - New
  * Mapped to the local claim wso2.roles
* SCIM2 roles.default claim - Modified
  * Updated mapped local claim to wso2.roles claim
    
#### Migration preparation for claim changes
* All claim configurations are already configured OOTB in the fresh pack, and will be done via the 
  migration client for migrating deployments. No need to configure these manually.
* Any custom external claim mapped to the wso2.role claim should be mapped to either wso2.roles 
  or wso2.groups claim as per the requirement of the custom use case.
* Our recommendation is to fix any consuming client to become compatible with these changes. 
  But if somehow the above configs need to be reverted (possibly in a migrated deployment), it can 
  be done via the Identity Server [Claim Management REST APIs](../develop/claim-management-rest-api.md).
  
### Utilizing carbon kernel level support

The following abstract userstore manager APIs: `getUserClaimValues()`, `getUsersClaimValues()`, 
`getUserClaimValuesWithID()`, `getUsersClaimValuesWithID()` now support both wso2.roles 
and wso2.groups claims properly. We recommend modifying custom extensions to request wso2.roles or wso2.groups
via above APIs rather depending on wso2.role claim.

### Service provider role mapping and identity provider role mapping restrictions

We recommend removing existing SP and IdP role mappings which use groups, and utilize roles to achieve the same functionality.

### OIDC group claim return groups

OIDC group claim does not return internal roles anymore. We recommend modifying applications and  
custom extensions to utilize this behaviour. If roles are required, utilize the OIDC roles claim.

### Obtaining roles via the SAML assertion

We recommend applications and custom extensions to switch from wso2.role to the wso2.roles claim in 
the SAML assertion.

### SCIM2 roles.default claim returns roles and groups claim return groups

Previously, the roles.default claim in SCIM2 returned both groups and roles as it was mapped to 
the wso2.roles claim. Going forward, it is mapped to the wso2.roles claim, where only roles are 
returned. In order to get groups, `urn:ietf:params:scim:schemas:core:2.0:User:groups` claim should 
be used instead since with this improvement it is returning groups as intended.

### Groups and roles in SCIM2 user response

Previously users and roles in the SCIM2 user response returned as a single comma-separated entity. 
However, that has been changed, and now they return as separate complex entities. We recommend 
modifying clients that consume this response.

### Backward compatibility

Groups and roles separation improvements brings enhanced clarity, and improved performance to the 
product. However, it’s inevitable to bring all the goodness with zero compromises. Therefore, as 
mentioned above, some applications, customizations, and integration flows might need some changes 
to fully adapt to these improvements.

Nevertheless, all of the above improvements and the behavioural changes are introduced in a way 
that existing deployments can adapt to the new state as easily as possible. However, if it's 
mandatory to preserve previous behaviour and avoid enabling the improvements mentioned above, the 
following configuration option(enabled by default) can be used in the `<IS-Home>/repository/conf/deployment.toml` file.

```java
[authorization_manager.properties]
group_and_role_separation_improvements_enabled = false
```

But this configuration option only ensures that the code level logic is reverted to the previous behaviour.
If the improvements are already applied(fresh IS server pack and a migrated pack with group-role migration step completed), these
claim configuration changes needs to be reverted manually in both tenants and super-tenant prior setting the above config to false. To do this, 
please refer to the claim changes introduced with this effort and revert them manually or via a script.

In order to stop claim data migration related to the groups vs roles improvements during the 
migration, open migration-configs.yaml file and remove the 5th step from 6.0.0 migration section prior to the migration.

```java
  - name: "ClaimDataMigrator"
     order: 5
     parameters:
       overrideExistingClaims: "true"
       useOwnDataFile: "true"
```

## Migrating custom components

In WSO2 Identity Server 6.0.0, we have done a major upgrade to our kernel and our main components. 
Any custom OSGI bundles which are added manually should be recompiled with new dependency versions 
that are relevant to the new WSO2 IS version.  All custom OSGI components reside in the 
`<OLD_IS_HOME>/repository/components/dropins` directory.

1.  Get the source codes of the custom OSGI components located in the `dropins` directory. 

2.  Change the dependency versions in the relevant POM files according to the WSO2 IS version that 
    you are upgrading to, and compile them. The compatible dependency versions can be found 
    [here](https://github.com/wso2/product-is/blob/v6.0.0-rc1/pom.xml). 

3.  If you come across any compile time errors, refer to the WSO2 IS code base and make the 
    necessary changes related to that particular component version.

4.  Add the compiled JAR files to the `<NEW_IS_HOME>/repository/components/dropins` directory.

5.  If there were any custom OSGI components in `<OLD_IS_HOME>/repository/components/lib` directory, 
    add newly compiled versions of those components to the `<NEW_IS_HOME>/repository/components/lib`  directory.
    
## Migrating the configurations

Refer to the relevant feature documents and
[What Has Changed](../../setup/migrating-what-has-changed) to do the configuration migration.

!!! info
    If you have a WSO2 Subscription, it is highly recommended to reach 
    [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa)
    before attempting to proceed with the configuration migration.
    
## Zero down time migration

!!! info
    If you do not require a zero down time migration, then you can directly proceed to the
    next section, [Migrating to 6.0.0](../../setup/migrating-to-600).
    
A typical WSO2 Identity Server deployment requires an update or upgrade from time to time, 
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

1.  Create a new databases for the new WSO2 Identity Server version (6.0.0) 
    that you are migrating to.
2.  Unzip a WSO2 Identity Server 6.0.0 distribution (use a WUM updated distribution 
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

10. Proceed to the next section [Migrating to 6.0.0](../../setup/migrating-to-600).
