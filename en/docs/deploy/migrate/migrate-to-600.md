# Migrating to 6.0.0
This document guides you through the migration process from earlier versions of WSO2 Identity Server to Identity Server 6.0.0.

## Before you begin

See the [preparing for migration]({{base_path}}/setup/migrating-preparing-for-migration) section.

### Step 1: Upgrade the databases

Follow the steps given below to perform database updates:

1. To download the **migration resources**, visit [the latest release tag](https://github.com/wso2-extensions/identity-migration-resources/releases/latest) and download the wso2is-migration-x.x.x.zip under **Assets**. Unzip it to a local directory.

    !!! Note
        - **x.x.x** of `wso2is-migration-x.x.x.zip` denotes the
        version number of the most recently-released migration resources.
        - The directory where the `wso2is-migration-x.x.x.zip` is unziped will be referred to as ` <IS_MIGRATION_TOOL_HOME> `.

2. Copy the ` org.wso2.carbon.is.migration-x.x.x.jar ` file in the `<IS_MIGRATION_TOOL_HOME>/dropins` directory into the ` <NEW_IS_HOME>/repository/components/dropins ` directory.

3. Copy migration-resources directory to the `<NEW_IS_HOME>` root directory.

4. Ensure that the property values are as follows in the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file.

    ``` java
    migrationEnable: "true"

    currentVersion: "5.7.0"

    migrateVersion: "6.0.0"
    ```

    !!! note
        Here, the `currentVersion` is the current WSO2 Identity Server version that you are using.

??? note "If you are using PostgreSQL"
    During the migration, "uuid-ossp" extension is created in the database. In order to create this extension, the database user should have the '**Superuser**' permission.
    If the user is not already a superuser, assign the permission before starting the migration.

        ALTER USER <user> WITH SUPERUSER;


??? info "If you are using DB2"
    Verify that the indexes are in the TS32K tablespace. If not, move indexes to the TS32K tablespace. The index tablespace in the `IDN_OAUTH2_ACCESS_TOKEN`  and `IDN_OAUTH2_AUTHORIZATION_CODE` tables need to be moved to the existing TS32K tablespace in order to support newly added table indexes. `SQLADM` or `DBADM` authority is required in order to invoke the `ADMIN_MOVE_TABLE` stored procedure. You
    must also have the appropriate object creation authorities,
    including authorities to issue the **SELECT** statement on the source
    table, and to issue the **INSERT** statement on the target table.

    ??? info "Click here to see the stored procedure" 
    
        Replace the `<TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>` and `<TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>` tags with the respective schema for the table. 


        ``` sql
        CREATE BUFFERPOOL BP32K IMMEDIATE SIZE 250 AUTOMATIC PAGESIZE 32K;

        CREATE LARGE TABLESPACE TS32K PAGESIZE 32K MANAGED by AUTOMATIC STORAGE BUFFERPOOL BP32K;

        CALL SYSPROC.ADMIN_MOVE_TABLE(
        <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>,
        'IDN_OAUTH2_ACCESS_TOKEN',
        (SELECT TBSPACE FROM SYSCAT.TABLES WHERE 
        TABNAME = 'IDN_OAUTH2_ACCESS_TOKEN' AND 
        TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>),
        'TS32K',
        (SELECT TBSPACE FROM SYSCAT.TABLES WHERE 
        TABNAME = 'IDN_OAUTH2_ACCESS_TOKEN' AND 
        TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_ACCESS_TOKEN_TABLE>),
        '',
        '',
        '',
        '',
        '',
        'MOVE');

        CALL SYSPROC.ADMIN_MOVE_TABLE(
        <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>,
        'IDN_OAUTH2_AUTHORIZATION_CODE',
        (SELECT TBSPACE FROM SYSCAT.TABLES WHERE 
        TABNAME = 'IDN_OAUTH2_AUTHORIZATION_CODE' AND 
        TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>),
        'TS32K',
        (SELECT TBSPACE FROM SYSCAT.TABLES WHERE 
        TABNAME = 'IDN_OAUTH2_AUTHORIZATION_CODE' AND 
        TABSCHEMA = <TABLE_SCHEMA_OF_IDN_OAUTH2_AUTHORIZATION_CODE_TABLE>),
        '',
        '',
        '',
        '',
        '',
        'MOVE');
        ```

    If you recieve an error due to missing `SYSTOOLSPACE` or `SYSTOOLSTMPSPACE` tablespaces, create those tablespaces manually using the following script prior to executing the stored procedure given above. 
    For more information, see [SYSTOOLSPACE and SYSTOOLSTMPSPACE table spaces](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_10.5.0/com.ibm.db2.luw.admin.gui.doc/doc/c0023713.html) in the IBM documentation.

    ``` sql
    CREATE TABLESPACE SYSTOOLSPACE IN IBMCATGROUP
      MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
      EXTENTSIZE 4;

    CREATE USER TEMPORARY TABLESPACE SYSTOOLSTMPSPACE IN IBMCATGROUP
      MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
      EXTENTSIZE 4;
    ```

## Step 2: Migrate artifacts and configs

!!! note
    Note that `<OLD_IS_HOME>` is the directory that the current Identity Server resides in, and `<NEW_IS_HOME>` is the directory that WSO2 Identity Server 6.0.0 resides in.

Once all the above prerequisites have been met, follow the instructions given below to migrate to the latest version.

### Components

-  If you have manually added any JAR files to the `<OLD_IS_HOME>/repository/components/lib` directory, copy and paste those JARs in the `<NEW_IS_HOME>/repository/components/lib` directory.

-  If you have manually added any custom OSGI bundles to the `<OLD_IS_HOME>/repository/components/dropins` directory, copy those OSGI bundles to the `<NEW_IS_HOME>/repository/components/dropins` directory.

-  **Custom components**
    
    In WSO2 Identity Server 6.0.0, a major upgrade has been made to the kernel and the main components. Any custom OSGI bundles which are added manually should be recompiled with new dependency versions that are relevant to the new WSO2 IS version.  All custom OSGI components reside in the `<OLD_IS_HOME>/repository/components/dropins` directory.

    1. Get the source codes of the custom OSGI components located in the `dropins` directory.

    2. Change the dependency versions in the relevant POM files according to the WSO2 IS version that you are upgrading to, and compile them. The compatible dependency versions can be found [here](https://github.com/wso2/product-is/blob/v6.0.0-rc1/pom.xml).

    3. If you come across any compile time errors, refer to the WSO2 IS code base and make the necessary changes related to that particular component version.

    4. Add the compiled JAR files to the `<NEW_IS_HOME>/repository/components/dropins` directory.

    5. If there were any custom OSGI components in `<OLD_IS_HOME>/repository/components/lib` directory, add newly compiled versions of those components to the `<NEW_IS_HOME>/repository/components/lib`  directory.

### Resources

!!! info
    If you have a WSO2 Subscription, it is highly recommended to reach [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa) before attempting to proceed with the configuration migration.

Copy the `.jks` files from the `<OLD_IS_HOME>/repository/resources/security` directory and paste them in the `<NEW_IS_HOME>/repository/resources/security` directory.

!!! note
    From WSO2 Identity Server 5.11.0 onwards, it is required to use a certificate with the RSA key size greater than 2048. If you have used a certificate that has a weak RSA key (key size less than 2048) in the previous IS version, add the following configuration to `<NEW_IS_HOME>/repository/conf/deployment.toml` to configure internal and primary keystores. 

    ```toml
    [keystore.primary]
    file_name = "primary.jks"
    type = "JKS"
    password = "wso2carbon"
    alias = "wso2carbon"
    key_password = "wso2carbon"

    [keystore.internal]
    file_name = "internal.jks"
    type = "JKS"
    password = "wso2carbon"
    alias = "wso2carbon"
    key_password = "wso2carbon"
    ```

    Make sure to point the internal keystore to the keystore that is copied from the previous WSO2 Identity Server version. The primary keystore can be pointed to a keystore with a certificate that has a strong RSA key.

### Renants

If you have created tenants in the previous WSO2 Identity Server version that contain resources, copy the content from `<OLD_IS_HOME>/repository/tenants` directory, to the `<NEW_IS_HOME>/repository/tenants` directory.

### User stores

If you have created secondary user stores in the previous WSO2 IS version, copy the content in the `<OLD_IS_HOME>/repository/deployment/server/userstores` directory to the `<NEW_IS_HOME>/repository/deployment/server/userstores` directory.

### Webapps

If you have deployed custom webapps in the previous WSO2 Identity Server, update the webapps to be compatible with IS 6.0.0 and copy the webapps to `<NEW_IS_HOME>/repository/deployment/server/webapps` directory. See [What Has Changed]({{base_path}}/setup/migrating-what-has-changed) to learn about the changes, if any, need to be made to the webapps.

### Configurations

1. Ensure that you have migrated the configurations into the new version as advised in [preparing for migration section.]({{base_path}}/setup/migrating-preparing-for-migration/#migrating-the-configurations)

2. Make sure that all the properties in the `<IS_HOME>/repository/conf/deployment.toml` file such as the database configurations are set to the correct values based on the requirement.

3. Replace the `<NEW_IS_HOME>/repository/conf/email/email-admin-config.xml` file with `<OLD_IS_HOME>/repository/conf/email/email-admin-config.xml`.

4. If you're migrating from a version prior to 5.11.0, configure the **SymmetricKeyInternalCryptoProvider** as the default internal cryptor provider.

    1. Generate your own secret key using a tool like OpenSSL.

        ```tab="Example"
        openssl enc -nosalt -aes-128-cbc -k hello-world -P
        ```

    2. Add the configuration to the `<NEW_IS_HOME>/repository/conf/deployment.toml` file.

        ```toml
        [encryption]
        key = "<provide-your-key-here>"
        ```

    3. Open the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file. The following two migrators are configured under **migratorConfigs** for 5.11.0.
        - EncryptionAdminFlowMigrator
        - EncryptionUserFlowMigrator

    4. Open the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file. Change the value of `transformToSymmetric` to `true` as shown below.

        ```yaml 
        name: "KeyStorePasswordMigrator"
        order: 9
        parameters:
        schema: "identity"
        currentEncryptionAlgorithm: "RSA"
        migratedEncryptionAlgorithm: "RSA/ECB/OAEPwithSHA1andMGF1Padding"
        transformToSymmetric: "true"
        ```

    Under each migrator's parameters, find the property value of **currentEncryptionAlgorithm** and ensure that it matches with the value of the `org.wso2.CipherTransformation` property found in the `<OLD_IS_HOME>/repository/conf/carbon.properties` file.

## Step 3: Run the migration client

1. Start the WSO2 Identity Server 6.0.0 with the following command to execute the migration client.

    -   Linux/Unix:

        ```bash 
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    -   Windows:

        ```bash
        wso2server.bat -Dmigrate -Dcomponent=identity
        ```

2. Stop the server once the migration client execution is complete.

## Step 4: (Optional) Sync DBs for Zerro down time

!!! warning
    Proceed with this step only if you have opted in for [Zero down time migration]({{base_path}}/setup/migrating-preparing-for-migration/#zero-down-time-migration).
    If not, your migration task is complete now. You can omit the following steps.

1. Start the data sync tool with the following command pointing to the `sync.properties` file.
This will start syncing data created in the old WSO2 Identity Server database after taking the database dump 
to the new WSO2 Identity Server database.
    ```bash
    sh wso2server.sh -DsyncData -DconfigFile=<path to sync.properties file>/sync.properties
    ```

2. Monitor the logs in the sync tool to see how many entries are synced at a given time and to keep track of the progress in the data sync process. The following line will be printed in the logs in each table you have specified, that has no data to be synced.

    ```tab="Sample"
    [2019-02-27 17:26:32,388]  INFO {org.wso2.is.data.sync.system.pipeline.process.BatchProcessor} -  No data to sync for: <TABLE_NAME>
    ```

    !!! info
        If you have some traffic to the old version of the WSO2 Identity Server, the number of entries to be synced might not become zero at any time. In that case, observe the logs to decide on a point where the number of entries that are synced is low.

3. When the data sync is complete, switch the traffic from the old setup to the new setup.

4. Allow the sync client to run for some time to sync the entries that were not synced before switching the deployments. When the number of entries synced by the sync tool becomes zero, stop the sync client.

## Step 5: Verify the migration

After the migration is complete, proceed to the following verification steps.

+ Monitor the system health (CPU, memory usage etc).
+ Monitor the WSO2 logs to see if there are errors logged in the log files.
+ Run functional tests against the migrated deployment to verify that all the functionalities are working as expected.

!!! note
    If you see any problems in the migrated system, revert the traffic back to the previous setup and investigate the problem.

!!! tip
    If the id token validation for the **Console** and **My Account** applications are failing, see [Validation of issuer in .well-known endpoint URL]({{base_path}}/setup/migrating-what-has-changed/#validation-of-issuer-in-well-known-endpoint-url).