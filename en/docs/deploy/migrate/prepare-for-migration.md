# Preparing for migration

Before you start the migration, see the instructions given here.

!!! note
    In this section, `<OLD_IS_HOME>` is the directory that current Identity
    Server resides in, and `<NEW_IS_HOME>` is the
    directory that WSO2 Identity Server 6.0.0 resides in.
    
## Prerequisites

1. Review what has been changed in this release. For a detailed list of changes from 5.11.0 to 6.0.0, see [What Has Changed]({{base_path}}/setup/migrating-what-has-changed).

2. Before you migrate, refer to [Migration Process]({{base_path}}/setup/migration-process/) to get an understanding on the migration process.

3. You can use the [Update Management Tool](https://updates.docs.wso2.com/en/latest/) (UMT) to get any
    fixes or latest updates for this release.

4. Take a backup of the existing database used by the current WSO2 Identity Server. This backup is necessary in case the migration causes any issues in the existing database.

5. Download WSO2 Identity Server 6.0.0 and unzip it in the `<NEW_IS_HOME>` directory.

6. Before proceeding with the migration, change the following property to `false` in the `<NEW_IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [super_admin]
    create_admin_account = false 
    ```

!!! note

     - If you are migrating from a version below IS 5.9.0 with a **JDBC primary userstore** configured, use the following configuration to disable the use of **Unique ID Userstore Managers** during the migration.
     ```toml
     [user_store]
     type = "database"
     ```
     As the former (non-unique ID) userstore managers are no longer supported, this configuration **must** be changed to the Unique ID Userstore Manager after the migration is complete to ensure proper functionality in IS 6.0.0 by using the configuration below.
     ```toml
     [user_store]
     type = "database_unique_id"
     ```
     - If you are migrating from a version below IS 5.10.0, make sure to disable the Groups and Roles Separation feature during the migration.
     ```toml
     [authorization_manager.properties]
     GroupAndRoleSeparationEnabled = false
     ```
     After the migration is complete, this configuration can be changed to enable the feature if it is required.
     
     - It is recommended to run the [token cleanup scripts]({{base_path}}/setup/removing-unused-tokens-from-the-database/) before migration to clean the expired, inactive, and revoked tokens/codes. This reduces the time taken for migration.

## Prepare for Groups and Roles separation

With WSO2 Identity Server 5.11.0, groups and roles are separated. For more information, see [What Has Changed in 5.11.0](https://is.docs.wso2.com/en/5.11.0/setup/migrating-what-has-changed#group-and-role-separation). 

However, you may or may not have opted not to use the new groups and roles feature in your WSO2 IS 5.11.0 deployment. When you migrate from WSO2 IS 5.11.0 to WSO2 IS 6.0.0, you can choose whether to continue with the old functionality or to switch to the new groups and roles functionality.

!!! info "Backward compatibility"

    Groups and roles separation improvements brings enhanced clarity, and improved performance to the product. All of these improvements and behavioural changes are introduced in a way that existing deployments can adapt to the new state as easily as possible.

    However, it’s inevitable to bring all the goodness with zero compromises. Therefore, if you opt to use this, some applications, customizations, and integration flows might need some changes to fully adapt to these improvements. Alternatively, you can choose to disable this functionality in WSO2 IS 6.0.0 and continue to use the old way of working.

### Overview

Following changes have been made to the product claims.

<table>
    <tr>
        <th>Claim</th>
        <th>Change</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>wso2.role</td>
        <td>Modified</td>
        <td>
            <ul>
                <li>Removed <b>supported by default</b>.</li>
                <li>Updated display name to <b>Roles and groups</b>.</li>
                <li>Updated description to <b>Include both userstore groups and internal roles</b>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>wso2.roles</td>
        <td>New</td>
        <td>
            <ul>
                <li>Display name: <b>Roles</b>.</li>
                <li>AttributionID <b>Roles</b>.</li>
                <li>Description <b>Roles</b>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>wso2.roles</td>
        <td>New</td>
        <td>
            <ul>
                <li>Display name: <b>Roles</b>.</li>
                <li>AttributionID <b>Roles</b>.</li>
                <li>Description <b>Roles</b>.</li>
                <li><b>Supported by default</b> configured as <code>true</code>.</li>
                <li><b>read-only</b> configured as <code>true</code>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>wso2.groups</td>
        <td>Modified</td>
        <td>
            <ul>
                <li><b>Supported by default</b> configured as <code>true</code>.</li>
                <li><b>read-only</b> configured as <code>true</code>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>OIDC group</td>
        <td>Modified</td>
        <td>
            Mapped local claim to the <code>wso2.groups</code> claim.
        </td>
    </tr>
    <tr>
        <td>OIDC roles</td>
        <td>New</td>
        <td>
            Mapped to the <code>wso2.roles</code> local claim.
        </td>
    </tr>
    <tr>
        <td>SCIM2 roles.default</td>
        <td>Modified</td>
        <td>
            Mapped to the <code>wso2.roles</code> local claim.
        </td>
    </tr>
</table>

Please note that following abbreviations are used in the sections below.

* wso2.role claim = http://wso2.org/claims/role
* wso2.roles claim = http://wso2.org/claims/roles
* wso2.groups claim = http://wso2.org/claims/groups

### Enable Groups and Roles separation

If you want to use the new groups and roles functionality in WSO2 IS 6.0.0, be mindful of the following recommendations

!!! Note
    * All claim configurations are already configured OOTB in the fresh pack, and will be done via the migration client for migrating deployments. No need to configure these manually.
    * Any custom external claim mapped to the wso2.role claim should be mapped to either wso2.roles or wso2.groups claim as per the requirement of the custom use case.
    * Our recommendation is to fix any consuming client to become compatible with these changes. But if somehow the above configs need to be reverted (possibly in a migrated deployment), it can be done via the Identity Server [Claim Management REST APIs]({{base_path}}/apis/claim-management-rest-api/).
  
-   **Utilizing carbon kernel level support**

    The following abstract userstore manager APIs: `getUserClaimValues()`, `getUsersClaimValues()`, 
    `getUserClaimValuesWithID()`, `getUsersClaimValuesWithID()` now support both ```wso2.roles``` and ```wso2.groups``` claims properly. We recommend modifying custom extensions to request wso2.roles or wso2.groups via above APIs rather depending on wso2.role claim.

-   **Service provider role mapping and identity provider role mapping restrictions**

     We recommend removing existing SP and IdP role mappings which use groups, and utilize roles to achieve the same functionality.

-   **OIDC group claim return groups**

     OIDC group claim does not return internal roles anymore. We recommend modifying applications and custom extensions to utilize this behaviour. If roles are required, utilize the OIDC roles claim.

-   **Obtaining roles via the SAML assertion**

     We recommend applications and custom extensions to switch from wso2.role to the wso2.roles claim in the SAML assertion.

-   **SCIM2 roles.default claim returns roles and groups claim return groups**

     Previously, the ```roles.default``` claim in SCIM2 returned both groups and roles as it was mapped to the wso2.roles claim. Going forward, it is mapped to the ```wso2.roles``` claim, where only roles are returned. In order to get groups, `urn:ietf:params:scim:schemas:core:2.0:User:groups` claim should be used instead since with this improvement it is returning groups as intended.

-   **Groups and roles in SCIM2 user response**

     Previously users and roles in the SCIM2 user response returned as a single comma-separated entity. However, that has been changed, and now they return as separate complex entities. We recommend modifying clients that consume this response.

### Disable Groups and Roles separation

If it's mandatory to preserve previous behaviour and avoid enabling the improvements mentioned above, follow the steps given below.

1.  Add the following configuration (enabled by default) to the `<IS-Home>/repository/conf/deployment.toml` file.

    ```java
    [authorization_manager.properties]
    group_and_role_separation_improvements_enabled = false
    ```

    !!! Note
        But this configuration option only ensures that the code-level logic is reverted to the previous behaviour. If the improvements are already applied (fresh IS server pack and a migrated pack with group-role migration step completed), these claim configuration changes needs to be reverted manually in both tenants and super-tenant prior setting the above config to false. To do this, please refer to the claim changes introduced with this effort and revert them manually or via a script.

2.  To stop claim data migration related to the groups vs roles improvements during the migration, open migration-configs.yaml file and remove the 5th step from 6.0.0 migration section prior to the migration.

    ```java
    - name: "ClaimDataMigrator"
        order: 5
        parameters:
        overrideExistingClaims: "true"
        useOwnDataFile: "true"
    ```

## Disabling versioning in the registry configuration
If there are frequently updating registry properties, having the versioning enabled for
registry resources in the registry can lead to unnecessary growth in the registry related
tables in the database. To avoid this, we have disabled versioning by default in Identity
Server 6.0.0.

Therefore, when migrating to IS 6.0.0 it is **required** to turn off the registry versioning in your
current Identity Server and run the below scripts against the database that is used by the registry.

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
        If the above configurations are already set as `false` you should not run the below scripts.
    
    When the above configurations are turned off, we need to remove the versioning detatils from the
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
        
        create index REG_RESOURCE_PROPERTY_REG_PROPERTY_ID_INDEX ON REG_RESOURCE_PROPERTY(REG_PROPERTY_ID);

        create index REG_PROPERTY_REG_ID_INDEX ON REG_PROPERTY(REG_ID);

        delete from REG_PROPERTY WHERE NOT EXISTS (select REG_PROPERTY_ID from REG_RESOURCE_PROPERTY where REG_PROPERTY.REG_ID=REG_RESOURCE_PROPERTY.REG_PROPERTY_ID);

        delete from REG_TAG where REG_ID NOT IN (select REG_TAG_ID from REG_RESOURCE_TAG);
        
        delete from REG_COMMENT where REG_ID NOT IN (select REG_COMMENT_ID from REG_RESOURCE_COMMENT);
        
        delete from REG_RATING where REG_ID NOT IN (select REG_RATING_ID from REG_RESOURCE_RATING);
        
        -- Update the REG_PATH_NAME column mapped with the REG_RESOURCE table --
        UPDATE REG_RESOURCE_TAG SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_TAG.REG_VERSION);
        
        UPDATE REG_RESOURCE_PROPERTY SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_PROPERTY.REG_VERSION);
        
        UPDATE REG_RESOURCE_COMMENT SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_COMMENT.REG_VERSION);
        
        UPDATE REG_RESOURCE_RATING SET REG_RESOURCE_NAME=(SELECT REG_NAME FROM REG_RESOURCE WHERE REG_RESOURCE.REG_VERSION=REG_RESOURCE_RATING.REG_VERSION);
        
        drop index REG_RESOURCE_PROPERTY_REG_PROPERTY_ID_INDEX;

        drop index REG_PROPERTY_REG_ID_INDEX;
        ```
