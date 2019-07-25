# Upgrading from the Previous Release

This section walks you through the steps you need to follow to upgrade
from WSO2 Identity Server 5.7.0 to WSO2 Identity Server 5.8.0. In this
section, `         <OLD_IS_HOME>        ` is the directory that Identity
Server 5.7.0 resides in, and `         <NEW_IS_HOME>        ` is the
directory that Identity Server 5.8.0 resides in. 

### Should I migrate?

WSO2 recommends upgrading to the latest version in order to ensure that
users receive the latest updates for the product.

-   For a high level overview of what has been added, changed, or
    deprecated in this release, see [About this
    release](../../getting-started/about-this-release).
-   For a detailed overview of behavioral changes in this release, see
    [Understanding What Has Changed](../../setup/understanding-what-has-changed).

### Preparing for migration

Follow this guide before you begin migration.

1.  Review what has been changed in this release. For a detailed list of
    the behavioral and architectural changes from 5.7.0 to 5.8.0, see
    [Behavioral Changes](../../setup/understanding-what-has-changed) .

2.  This release is a WUM-only release. This means that there are no
    manual patches. You can use WSO2 Update Manager (WUM) to get any
    fixes or latest updates for this release.

    **If you are upgrading to use this version in your production
    environment** , use WSO2 Update Manager to get the latest updates
    available for WSO2 IS 5.8.0. For more information on how to use WSO2
    Update Manager, see [Updating WSO2
    Products](https://docs.wso2.com/display/updates/Using+WSO2+Update+Manager)
    .

3.  Take a backup of the existing database used by Identity Server
    5.7.0. This backup is necessary in case the migration causes issues
    in the existing database.
4.  We recommend running the [cleanup
    scripts](../../using-wso2-identity-server/removing-unused+tokens+from+the+database)
    before migration to clean the expired, inactive, and revoked
    tokens/codes. This reduces the time taken for migration.
5.  The `           CONN_APP_KEY          ` unique constraint has been
    modified in the 5.8.0 release for Oracle and PostgreSQL databases.
    See the note below only for details. This step is only required i f
    you are using an Oracle or PostgreSQL database.

    !!! note
        In the existing
        `               IDN_OAUTH2_ACCESS_TOKEN              ` table of your
        database, there may be access tokens that correspond to the same
        `               consumer_id              ` and the same user for the
        same scope. In this release, the
        `               CON_APP_KEY              ` unique constraint for
        Oracle and PostgreSQL databases has been modified to prevent this.
        There fore, it is recommended to remove or modify such entries in
        the database table before migration. You can run the following query
        against your database to examine how many active access token
        entries violating the modified
        `               CON_APP_KEY              ` unique constraint, are
        present in the
        `               IDN_OAUTH2_ACCESS_TOKEN              ` table.

        ``` java
        SELECT CONSUMER_KEY_ID, AUTHZ_USER, USER_DOMAIN, TENANT_ID, TOKEN_SCOPE_HASH, USER_TYPE, TOKEN_STATE, COUNT(*) 
                FROM IDN_OAUTH2_ACCESS_TOKEN
                GROUP BY CONSUMER_KEY_ID, AUTHZ_USER, USER_DOMAIN, TENANT_ID, TOKEN_SCOPE_HASH, USER_TYPE, TOKEN_STATE 
                HAVING COUNT(*)>1 AND TOKEN_STATE='ACTIVE'
        ```

    !!! warning "Disabling the migrator"

        By default, the WSO2 IS data migration client handles this by
        modifying any active access tokens that are violating the
        constraint. However, if you wish to disable the migrator, remove or
        comment out the following configuration from the migration yaml
        file.

        WSO2 recommends this constraint change and therefore **does not** recommend disabling it during migration. The constraint
            change also provides an additional performance boost.
        
        ``` java
            -
            name: "SchemaMigrator"
            order: 3
            parameters:
                location: "step3"
                schema: "identity"
        ```

### Migrating the configurations

You can use one of the following approaches to migrate depending on your
production environment.

-   **Migrate by applying custom configurations to 5.8.0**

    **This approach is recommended if:**

    -   You have done very few configuration changes in your previous
        version of WSO2 IS. These configuration changes have been
        tracked and are easy to redo.

    **Steps:**

    1.  If you have made configuration changes to the config files in
        your previous version of WSO2 IS, update the files in the
        `              <NEW_IS_HOME>/repository/conf             `
        directory with your own configurations.
    2.  For a detailed list of the behavioral changes and configuration
        changes from 5.7.0 to 5.8.0, see [Understanding What Has
        Changed](../../setup/understanding-what-has-changed) . You can scroll
        through each table for details about what has changed in this
        release.
    3.  Proceed to the [Migrating the embedded LDAP user
        store](#UpgradingfromthePreviousRelease-MigratingtheembeddedLDAPuserstore)
        section to proceed with the rest of the migration.

-   **Migrate by updating existing configurations with what's new in
    5.7.0**

    **This approach is recommended if:**

    -   You have done many configuration changes in your previous
        version of WSO2 IS.
    -   These configurations have not been tracked completely and/or are
        difficult to redo.

    **Steps:**

    1.  Make a copy of the
        `              <OLD_IS_HOME>/repository/conf             `
        directory. (Do not change the original configs. You may use it
        as a backup in case there are any issues)
    2.  Apply the configuration changes made in this release to your
        copy of the `               conf              ` directory
        according to the features that you require . For a detailed list
        of configuration changes, see [Configuration
        changes](../../setup/understanding-what-has-changed#UnderstandingWhatHasChanged-Configurationchanges)
        .

    3.  Replace the
        `               <NEW_IS_HOME>/repository/conf              `
        directory with the modified copy of the
        `               <OLD_IS_HOME>/repository/conf              `
        directory.

    4.  Proceed to the [Migrating the embedded LDAP user
        store](#UpgradingfromthePreviousRelease-MigratingtheembeddedLDAPuserstore)
        section to proceed with the rest of the migration.

### Migrating the embedded LDAP user store

WSO2 does not recommend using the embedded LDAP userstore that is
shipped with WSO2 Identity Server in a production environment. However,
if migration of the embedded LDAP is required, follow the instructions
below to migrate the existing WSO2 IS LDAP user store to the new version
of WSO2 IS.

1.  Copy the `          <OLD_IS_HOME>/repository/data         ` folder
    to `          <NEW_IS_HOME>/repository/data         ` folder.
2.  Restart the server to save the changes.

### Migrating the data

To upgrade to the latest version of WSO2 Identity Server, you need to
upgrade the userstore database. Note that there are no registry schema
changes between versions.

Follow the steps below to perform the upgrade.

1.  Download Identity Server 5.8.0 and unzip it in the
    `          <NEW_IS_HOME>         ` directory.
2.  If you are using a **DB2** environment, move indexes to the the
    TS32K Tablespace. The index tablespace in the '
    `           IDN_OAUTH2_ACCESS_TOKEN          ` ' and '
    `           IDN_OAUTH2_AUTHORIZATION_CODE          ` ' tables need
    to be moved to the existing TS32K tablespace in order to support
    newly added table indexes.

    !!! note     
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

    !!! tip "Troubleshooting"     
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

3.  Do the following database updates:  
    1.  Download the [migration
        resources](../../assets/attachments/wso2is-5.8.0-migration.zip?)
        and unzip it to a local directory. This directory is referred to
        as `             <IS5.8.0_MIGRATION_TOOL_HOME>            ` .

    2.  Copy the
        `             org.wso2.carbon.is.migration-5.8.0.jar            `
        and the `             snakeyaml-1.16.0.wso2v1.jar            `
        found in the
        `             <IS5.8.0_MIGRATION_TOOL_HOME>/dropins            `
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

        migrateVersion: "5.8.0"
        ```

4.  If you manually added any custom OSGI bundles to the
    `          <OLD_IS_HOME>/repository/components/dropins         `
    directory, copy those to the
    `          <NEW_IS_HOME>/repository/components/dropins         `
    directory.
5.  If you manually added any JAR files to the
    `           <OLD_IS_HOME>/repository/components/lib          `
    directory, copy those and paste in the
    `           <NEW_IS_HOME>/repository/components/lib          `
    directory.

6.  Copy the `           .jks          ` files from the
    `           <OLD_IS_HOME>/repository/resources/security          `
    directory and paste in the
    `           <NEW_IS_HOME>/repository/resources/security          `
    directory.

7.  If you have created tenants in the previous WSO2 Identity Server
    version and if there are any resources in the
    `          <OLD_IS_HOME>/repository/tenants         ` directory,
    copy the content to the
    `          <NEW_IS_HOME>/repository/tenants         ` directory.
8.  If you have created secondary user stores in the previous WSO2 IS
    version, copy the content in the
    `           <OLD_IS_HOME>/repository/deployment/server/userstores          `
    directory to the
    `           <NEW_IS_HOME>/repository/deployment/server/userstores          `
    directory.

9.  Start the Identity Server 5.8.0 with the following command to
    perform the data migration for all components.

    1.  Linux/Unix:

        ```bash 
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    2.  Windows:

        ```bash
        wso2server.bat -Dmigrate -Dcomponent=identity
        ```

10. Once the migration is successful, stop the server and start using
    the appropriate command.  
    1.  Linux/Unix:

        ``` xml
        sh wso2server.sh
        ```

    2.  Windows:

        ``` xml
        wso2server.bat
        ```

### Verifying the migration

Follow the steps below to verify if the migration has been completed
successfully.

1.  Go through the logs and check if each migration step has completed
    successfully without any error logs.

2.  Run functional tests against the migrated deployment to verify that
    all functionality is working as expected.
