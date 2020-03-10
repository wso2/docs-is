# Migrating to 5.10.0

Before you follow this section, see
[Before you begin](../../setup/migration-guide) and
[Preparing for migration](../../setup/migrating-preparing-for-migration)
sections to read the prerequisites.

!!! note
    In this section, `<OLD_IS_HOME> ` is the directory that current Identity
    Server resides in, and `<NEW_IS_HOME>` is the
    directory that WSO2 Identity Server 5.10.0 resides in. 

??? note "If you are using DB2"
    Move indexes to the the
    TS32K Tablespace. The index tablespace in the 
    `           IDN_OAUTH2_ACCESS_TOKEN          `  and 
    `           IDN_OAUTH2_AUTHORIZATION_CODE          ` tables need
    to be moved to the existing TS32K tablespace in order to support
    newly added table indexes.

    SQLADM or DBADM authority is required in order to invoke
    the `           ADMIN_MOVE_TABLE          ` stored procedure. You
    must also have the appropriate object creation authorities,
    including authorities to issue the SELECT statement on the source
    table and to issue the INSERT statement on the target table.
    

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

    If you recieve an error due to missing
    `               SYSTOOLSPACE              ` or
    `               SYSTOOLSTMPSPACE              ` tablespaces, create
    those tablespaces manually using the following script prior to
    executing the stored procedure given above. For more information,
    see [SYSTOOLSPACE and SYSTOOLSTMPSPACE table
    spaces](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_10.5.0/com.ibm.db2.luw.admin.gui.doc/doc/c0023713.html)
    in the IBM documentation.           

    ``` sql
        CREATE TABLESPACE SYSTOOLSPACE IN IBMCATGROUP
          MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
          EXTENTSIZE 4;
    
        CREATE USER TEMPORARY TABLESPACE SYSTOOLSTMPSPACE IN IBMCATGROUP
          MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
          EXTENTSIZE 4;
    ```

1.  If you manually added any custom OSGI bundles to the
    `          <OLD_IS_HOME>/repository/components/dropins         `
    directory, copy those OSGI bundles to the
    `          <NEW_IS_HOME>/repository/components/dropins         `
    directory.
    
    !!! warning "Important" 
        You may need to update the custom components to work with WSO2 Identity Server 5.10.0, 
        refer [Migrating custom components](../../setup/migrating-preparing-for-migration/#migrating-custom-components).
        If applicable migrate
        [Data Publishers](../../setup/migrating-data-publishers) and
        [Custom Scope validators](../../setup/migrating-custom-scope-validators)
        referring to the corresponding document.

2.  If you manually added any JAR files to the
    `           <OLD_IS_HOME>/repository/components/lib          `
    directory, copy and paste those JARs in the
    `           <NEW_IS_HOME>/repository/components/lib          `
    directory.

3.  Copy the `           .jks          ` files from the
    `           <OLD_IS_HOME>/repository/resources/security          `
    directory and paste in the
    `           <NEW_IS_HOME>/repository/resources/security          `
    directory.

    !!! note
        In WSO2 Identity Server 5.10.0, it is required to use a certificate with the RSA key size greater than 2048. If you have used a certificate that has a weak RSA key (key size less than 2048) in the previous IS version, add the following configuration to `<NEW_IS_HOME>/repository/conf/deployment.toml` file to configure internal and primary keystores. 

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
    
6. Ensure that you have migrated the configurations into NEW version as
   advised in
   [preparing for migration section.](../../setup/migrating-preparing-for-migration/#migrating-the-configurations)
   
7. Migrate [Log4j2 configurations](../../setup/migrating-to-log4j2).

8. Replace the `<NEW_IS_HOME>/repository/conf/email/email-admin-config.xml` file with
   `<OLD_IS_HOME>/repository/conf/email/email-admin-config.xml`   
    
9. Do the following to perform database updates:
    1.     To download the **migration resources**, visit [the latest release tag](https://github.com/wso2-extensions/identity-migration-resources/releases/latest) and download the wso2is-migration-x.x.x.zip under **Assets**.
          Unzip it to a local directory.
        
        !!! Note 
            - **x.x.x** of `wso2is-migration-x.x.x.zip` denotes the
            version number of the latest released migration resources. 
            - The
            directory where the `wso2is-migration-x.x.x.zip` is unziped
            will be referred to as ` <IS_MIGRATION_TOOL_HOME> `.

    2.   Copy the ` org.wso2.carbon.is.migration-x.x.x.jar ` file in the
        ` <IS_MIGRATION_TOOL_HOME>/dropins ` directory into the ` <NEW_IS_HOME>/repository/components/dropins `
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

        migrateVersion: "5.10.0"
        ```
        
        !!! note
            Here the `currentVersion` is the current WSO2 Identity Server version that you are using.

10.  Start the WSO2 Identity Server 5.10.0 with the following command to
    execute the migration client.

    1.  Linux/Unix:

        ```bash 
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    2.  Windows:

        ```bash
        wso2server.bat -Dmigrate -Dcomponent=identity
        ```

11.  Stop the server once the migration client execution is completed.
    
### **Executing the sync tool**

!!! warning
    Proceed with this step only if you have opt in for [Zero down time migration](../../setup/migrating-preparing-for-migration/#zero-down-time-migration).
    If not your migration task is completed now and you can omit the following steps.
    
1.  Start the data sync tool with the following command pointing to the  sync.properties file. 
This will start syncing data created in the old WSO2 Identity Server database after taking the database dump 
to the new WSO2 Identity Server database.
    ```bash
    sh wso2server.sh -DsyncData -DconfigFile=<path to sync.properties file>/sync.properties
    ```

2.  Monitor the logs in the sync tool to see how many entries are synced at a given time and progress of the data sync 
process. Following line will be printed in the logs for each table you have specified to sync if there are no 
data to be synced.

    ```tab="Sample"
    [2019-02-27 17:26:32,388]  INFO {org.wso2.is.data.sync.system.pipeline.process.BatchProcessor} -  No data to sync for: <TABLE_NAME>
    ```
    
    !!! info
        If you have some traffic to the old version of the WSO2 Identity Server, the number of entries to 
        be synced might not become zero at any time. In that case, watch for the logs and decide a point 
        that the number of entries that are synced is a lower value.

3.  When the data sync is completed, switch the traffic from the old setup to the new setup.

4.  Allow the sync client to run for some time to sync the entries that were not synced before switching 
the deployments. When the number of entries synced by the sync tool, becomes zero, stop the sync client.
    
### **Verifying the migration was successful**

After the migration is completed, proceed to the following verification steps.

+   Monitor the system health (CPU, memory usage etc).
+   Monitor the WSO2 logs to see if there are errors logged in the log files.
+   Run functional tests against the migrated deployment to verify that all functionality is working as expected.

If you see any problems in the migrated system, revert the traffic back to the previous setup and 
investigate the problem.
    
    
    
