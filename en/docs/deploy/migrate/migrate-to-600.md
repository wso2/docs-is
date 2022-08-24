# Migrating to 6.0.0
This document guides you through the migration process from earlier versions of WSO2 Identity Server to Identity Server 6.0.0.

## Before you begin

See the instructions on [preparing for migration]({{base_path}}/deploy/migrate/prepare-for-migration).

## Step 1: Migrate artifacts and configs

!!! note
    Note that `<OLD_IS_HOME>` is the folder that the current Identity Server resides in, and `<NEW_IS_HOME>` is the folder that WSO2 Identity Server 6.0.0 resides in.

Once all the rerequisites are met, follow the instructions given below to migrate to WSO2 IS 6.0.0.

### Components

Follow the instructions given below to migrate any component artifacts.

-  If you have manually added any JAR files to the `<OLD_IS_HOME>/repository/components/lib` folder, copy those JARs to the `<NEW_IS_HOME>/repository/components/lib` folder.

-  If you have manually added any custom OSGI bundles to the `<OLD_IS_HOME>/repository/components/dropins` folder, copy those OSGI bundles to the `<NEW_IS_HOME>/repository/components/dropins` folder.

-  **Custom components**
    
    In WSO2 Identity Server 6.0.0, a major upgrade has been made to the kernel and the main components. Any custom OSGI bundles which are added manually should be recompiled with new dependency versions that are relevant to the new WSO2 IS version.  All custom OSGI components reside in the `<OLD_IS_HOME>/repository/components/dropins` folder.

    1. Get the source codes of the custom OSGI components located in the `dropins` folder.

    2. Change the dependency versions in the relevant POM files according to the WSO2 IS version that you are upgrading to (WSO2 IS 6.0.0) and compile them. 
    
        !!! info
            The compatible dependency versions can be found [here](https://github.com/wso2/product-is/blob/v6.0.0-rc1/pom.xml).

    3. If you come across any compile time errors, refer to the WSO2 IS code base and make the necessary changes related to that particular component version.

    4. Add the compiled JAR files to the `<NEW_IS_HOME>/repository/components/dropins` folder.

    5. If there were any custom OSGI components in `<OLD_IS_HOME>/repository/components/lib` folder, add newly compiled versions of those components to the `<NEW_IS_HOME>/repository/components/lib` folder.

### Resources

Copy the `.jks` files from the `<OLD_IS_HOME>/repository/resources/security` folder to the `<NEW_IS_HOME>/repository/resources/security` folder.

!!! note
    From WSO2 Identity Server 5.11.0 onwards, it is required to use a certificate with the RSA key size greater than 2048. If you have used a certificate that has a weak RSA key (key size less than 2048) in the previous WSO2 IS version, add the following configuration to the `<NEW_IS_HOME>/repository/conf/deployment.toml` file to configure internal and primary keystores. 

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

    Also, make sure to add the public key of the primary keystore to the client trust store copied from the previous IS.

    - Export the public key from your primary keystore file using the following command  
    `keytool -export -alias wso2carbon -keystore primary.jks -file <public key name>.pem`

    - Import the public key you extracted to the `client-truststore.jks` file by using the following command  
    `keytool -import -alias wso2carbon -file <public key name>.pem -keystore client-truststore.jks -storepass wso2carbon`

### Tenants

If you have created tenants in the previous WSO2 Identity Server version that contain resources, copy the content from the `<OLD_IS_HOME>/repository/tenants` folder to the `<NEW_IS_HOME>/repository/tenants` folder.

!!! note
    If you are migrating from IS 5.8.0 or below, delete the `eventpublishers` and `eventstreams` folders from each tenant in the `tenants` folder when copying to IS 6.0.0. Make sure to **backup** the `tenants` folder before deleting the subfolders. You can use the following set of commands to find and delete all the relevant subfolders at once.
    ```
    cd <NEW_IS_HOME>/repository/tenants
    find . -type d -name 'eventpublishers' -exec rm -rf {} +
    find . -type d -name 'eventstreams' -exec rm -rf {} +
    ```

### User stores

If you have created secondary user stores in the previous WSO2 IS version, copy the content in the `<OLD_IS_HOME>/repository/deployment/server/userstores` folder to the `<NEW_IS_HOME>/repository/deployment/server/userstores` folder.

!!! note
    - If you are migrating from a version prior to IS 5.5.0, you need to make the following changes in the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file (see Step 2 for instructions for downloading migration resources).

        - Remove all `UserStorePasswordMigrators` from versions above your previous IS version. User store password migration will be done by the `EncryptionAdminFlowMigrator` in version 5.11.0.
    
        ```toml
        name: "UserStorePasswordMigrator"
        order: 5
        parameters:
          schema: "identity"
        ```

        - Change the `currentEncryptionAlgorithm` to `RSA` in `EncryptionAdminFlowMigrator` of version 5.11.0
    
        ```toml
        name: "EncryptionAdminFlowMigrator"
        order: 1
        parameters:
          currentEncryptionAlgorithm: "RSA"
          migratedEncryptionAlgorithm: "AES/GCM/NoPadding"
          schema: "identity"
        ```

    - If you are migrating from a version prior to IS 5.10.0, you need to update the `UserStoreManager` class name in the XML files of your user stores with its respective **Unique ID userstore manager** class name according to the table below.

        | Deprecated Userstore Manager | Unique ID Userstore Manager |
        | ------------- | ----------- |
        | ReadWriteLDAPUserStoreManager | UniqueIDReadWriteLDAPUserStoreManager |
        | ActiveDirectoryUserStoreManager | UniqueIDActiveDirectoryUserStoreManager |
        | ReadOnlyLDAPUserStoreManage | UniqueIDReadOnlyLDAPUserStoreManager |
        | JDBCUserStoreManager | UniqueIDJDBCUserStoreManager |

    - Make sure to update the JDBC driver class name used in the userstore XML file if the current class is deprecated.

### Webapps

If you have deployed custom webapps in the previous WSO2 Identity Server, update the webapps to be compatible with WSO2 IS 6.0.0 and copy the webapps to the `<NEW_IS_HOME>/repository/deployment/server/webapps` folder. 

!!! info
    See [What Has Changed]({{base_path}}/setup/migrating-what-has-changed) to learn about the changes (if any) that need to be made to the webapps.

### Configurations

!!! info
    If you have a WSO2 Subscription, it is highly recommended to reach [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa) before attempting to proceed with the configuration migration.

1. Make sure that all the properties in the `<IS_HOME>/repository/conf/deployment.toml` file such as the database configurations are set to the correct values based on the requirement.

2. Replace the `<NEW_IS_HOME>/repository/conf/email/email-admin-config.xml` file with `<OLD_IS_HOME>/repository/conf/email/email-admin-config.xml`.

3. If you're migrating from a version prior to WSO2 IS 5.11.0, configure the **SymmetricKeyInternalCryptoProvider** as the default internal cryptor provider.

    1. Generate your own secret key using a tool like OpenSSL.

        ```tab="Example"
        openssl enc -nosalt -aes-128-cbc -k hello-world -P
        ```

    2. Add the configuration to the `<NEW_IS_HOME>/repository/conf/deployment.toml` file.

        ```toml
        [encryption]
        key = "<provide-your-key-here>"
        ```

    3. Open the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file and note that the following two migrators are configured under **migratorConfigs** for 5.11.0:

        - EncryptionAdminFlowMigrator
        - EncryptionUserFlowMigrator

    4. Open the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file and change the value of `transformToSymmetric` to `true` as shown below.

        ```yaml 
        name: "KeyStorePasswordMigrator"
        order: 9
        parameters:
        schema: "identity"
        currentEncryptionAlgorithm: "RSA"
        migratedEncryptionAlgorithm: "RSA/ECB/OAEPwithSHA1andMGF1Padding"
        transformToSymmetric: "true"
        ```

    5.  Under each migrator's parameters, find the property value of **currentEncryptionAlgorithm** and ensure that it matches the value of the `org.wso2.CipherTransformation` property found in the `<OLD_IS_HOME>/repository/conf/carbon.properties` file.

## Step 2: Run the migration client

To download the **migration resources**:

1.  Go to the [latest release tag](https://github.com/wso2-extensions/identity-migration-resources/releases/latest) and download the `wso2is-migration-x.x.x.zip` under **Assets**. 
2.  Unzip it to a local folder.

    !!! Note
        - **x.x.x** of `wso2is-migration-x.x.x.zip` denotes the version number of the most recently-released migration resources.
        - The folder of the `wso2is-migration-x.x.x.zip` will be referred to as `<IS_MIGRATION_TOOL_HOME>`.

3. Copy the ` org.wso2.carbon.is.migration-x.x.x.jar ` file in the `<IS_MIGRATION_TOOL_HOME>/dropins` folder into the ` <NEW_IS_HOME>/repository/components/dropins ` folder.

4. Copy the **migration-resources** folder to the `<NEW_IS_HOME>` root folder.

### Dry run

Before doing the actual migration, it is recommended to do a dry run and analyze the generated report for any recommendations related to the migration. 

Dry-run capability of the migrator allows you to validate the system for the user store configurations and to generate a report regarding the migration compatibility. If there are any warnings in the migration report, it is recommended to contact WSO2 support to identify the best migration strategy.

Follow the steps given below to perform the dry run.

1.  Configure the migration report path using the `reportPath` value in the `<IS_HOME>/migration-resources/migration-config.yaml` file. 

    !!! info
        Use **one** of the following methods when configuring the report path:  

           - Create a text file. Provide the absolute path for that text file for all `reportPath` parameters. All results from the dry run will be appended to this text file.
           - Create separate directories to store dry run reports of every migrator having the `reportPath` parameter. Provide the absolute paths of these directories for the `reportPath` of the relevant migrator. Dry run result of each migrator will be created in their specific report directories according to the timestamp.

    !!! important 
        The `reportPath` should be added under a `parameters` attribute in the `migration-config.yaml` file. The `reportPath` attribute and, in some cases, the `parameters` attribute is commented out by default. Both these attributes should be uncommented and the report path value should be added as a string for all migrators which support dry run within the current IS version and the target IS version.

2.  Run the migration utility with the `dryRun` system property:

    -   On Linux/MacOS

        ``` bash 
        sh wso2server.sh -Dmigrate -Dcomponent=identity -DdryRun
        ```

    -   On Windows

        ``` bash
        wso2server.bat -Dmigrate -Dcomponent=identity -DdryRun
        ```
 
Once this is executed, you can analyze the generated report that resides in the provided location.

### Set up the databases

Note the following database requirements before running the migration tool.

-   **If you are using PostgreSQL**
  
    During the migration, the "uuid-ossp" extension is created in the database. To create this extension, the database user should have the '**Superuser**' permission. If the user is not already a super user, assign the permission before starting the migration.

    ```
    ALTER USER <user> WITH SUPERUSER;
    ```

-   **If you are using DB2**

    Verify that the indexes are in the TS32K tablespace. If not, move indexes to the TS32K tablespace. The index tablespace in the `IDN_OAUTH2_ACCESS_TOKEN`  and `IDN_OAUTH2_AUTHORIZATION_CODE` tables need to be moved to the existing TS32K tablespace in order to support newly added table indexes. 
    
    The `SQLADM` or `DBADM` authority is required in order to invoke the `ADMIN_MOVE_TABLE` stored procedure. You must also have the appropriate object creation authorities, including authorities to issue the **SELECT** statement on the source table and to issue the **INSERT** statement on the target table.

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

    If you recieve an error due to missing `SYSTOOLSPACE` or `SYSTOOLSTMPSPACE` tablespaces, create those tablespaces manually using the following script prior to executing the stored procedure given above: 
    
    For more information, see [SYSTOOLSPACE and SYSTOOLSTMPSPACE table spaces](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_10.5.0/com.ibm.db2.luw.admin.gui.doc/doc/c0023713.html) in the IBM documentation.

    ``` sql
    CREATE TABLESPACE SYSTOOLSPACE IN IBMCATGROUP
      MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
      EXTENTSIZE 4;

    CREATE USER TEMPORARY TABLESPACE SYSTOOLSTMPSPACE IN IBMCATGROUP
      MANAGED BY AUTOMATIC STORAGE USING STOGROUP IBMSTOGROUP
      EXTENTSIZE 4;
    ```

### Set up the client

To set up the migration client for execution, apply the following configurations to the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file:

!!! note
    The `currentVersion` is the current WSO2 Identity Server version that you are using.

``` bash
migrationEnable: "true"

currentVersion: "5.11.0"

migrateVersion: "6.0.0"
```

-   If you have multiple tenants and multiple user stores and you only need to migrate a few of them, use the configurations given below.

    | Property Name | Description |
    | ------------- | ----------- |
    | migrateAll | Migrate all the tenants and all the user store domains in it. This is set to `true` by default. |

-   If you are only migrating a few tenants, apply the configurations given below. 

    !!! info
        Note that `Tenant-param` is a place holder to represent a unique tenant, e.g., tenant1.

    ``` bash  
    -
    name: "UserIDMigrator"
    order: 7
    parameters:
        <tenant-param>:
    ```

    Given below are the parameters you can use in the above configuration:

    | Property Name | Description |
    | ------------- | ----------- |
    | tenantDomain | (Mandatory) Domain name of the tenant. |
    | increment | (Optional) Number of users to be updated in each iteration. |
    | startingPoint | (Optional) This denotes from where the migration should start (Offset). This is useful if the migration stopped in the middle and needs to restart. |
    | scimEnabled | (Optional) Specifies whether SCIM is enabled for user stores in this tenant. |
    | migratingDomains | (Optional) List of comma-separated domain names that should be migrated to this domain. |
    | forceUpdateUserId | (Optional) Marks whether user IDs should be updated if there is an existing ID. |

-   If the user store is an LDAP and SCIM is enabled for that userstore, migrating that userstore is not required. As SCIM creates a user ID for the users in that user store, the SCIM ID can be used as the unique user ID. To do that, change `user_id_attribute` to the value of the SCIM ID, in the `<IS_HOME>/repository/conf/deployment.toml` file.

### Run the client

Now, let's run the migration client to upgrade the databases.

1. Start the WSO2 Identity Server 6.0.0 with the following command to execute the migration client.

    -   Linux/Unix:

        ```bash 
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    -   Windows:

        ```bash
        wso2server.bat -Dmigrate -Dcomponent=identity
        ```

2. **Restart** the server once the migration client execution is complete.

## Step 3: (Optional) Migrate secondary user stores

These steps should be carried out for the old database before the migration. A backup of the UM database should be taken and database triggers should be set to update the backup database based on the updates of the live database. After performing the following steps, the backup database should be migrated to the next version:

1.  If you have JDBC secondary user stores with SCIM disabled, execute the following queries on the UM database: 

    !!! info
        This adds a `UM_USER_ID` column to the `UM_USER` table with a random `UUID` as the default value for `UM_USER_ID`.

    ```sql tab="Postgresql"
    /* User should have the Superuser permission */
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    ALTER TABLE UM_USER
        ADD COLUMN UM_USER_ID CHAR(36) DEFAULT uuid_generate_v4(),
        ADD CONSTRAINT UM_USER_UUID_CONSTRAINT UNIQUE(UM_USER_ID);
    ```

    ```sql tab="Oracle"
    ALTER TABLE UM_USER
        ADD (
            UM_USER_ID CHAR(36) DEFAULT LOWER(regexp_replace(rawtohex(sys_guid()), '([A-F0-9]{8})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{12})', '\1-\2-\3-\4-\5')))
    /

    ALTER TABLE UM_USER ADD UNIQUE (UM_USER_ID)
    /
    ```

    ```sql tab="Oracle_rac"
    ALTER TABLE UM_USER
        ADD (
            UM_USER_ID CHAR(36) DEFAULT LOWER(regexp_replace(rawtohex(sys_guid()), '([A-F0-9]{8})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{12})', '\1-\2-\3-\4-\5')))
    /

    ALTER TABLE UM_USER ADD UNIQUE (UM_USER_ID)
    /
    ```

    ```sql tab="MySQL"
    ALTER TABLE UM_USER ADD COLUMN UM_USER_ID CHAR(36) NOT NULL DEFAULT 'NONE';
    UPDATE UM_USER SET UM_USER_ID = UUID();
    ALTER TABLE UM_USER ADD UNIQUE(UM_USER_ID, UM_TENANT_ID);
    ```

    ```sql tab="MySQL_cluster"
    ALTER TABLE UM_USER ADD COLUMN UM_USER_ID CHAR(36) NOT NULL DEFAULT 'NONE';
    UPDATE UM_USER SET UM_USER_ID = UUID();
    ALTER TABLE UM_USER ADD UNIQUE(UM_USER_ID, UM_TENANT_ID);
    ```

    ```sql tab="MS SQL"
    ALTER TABLE UM_USER
        ADD UM_USER_ID CHAR(36) DEFAULT LOWER(NEWID()) NOT NULL,
        UNIQUE(UM_USER_ID);
    ```

    ```sql tab="H2"
    ALTER TABLE UM_USER ADD COLUMN (UM_USER_ID CHAR(36) DEFAULT RANDOM_UUID());
    ALTER TABLE UM_USER ADD UNIQUE (UM_USER_ID);
    ```

    ```sql tab="DB2" 
    CREATE OR REPLACE FUNCTION NEWUUID()
    RETURNS CHAR(36)
    BEGIN
        DECLARE @UUID CHAR(32);
        SET @UUID=LOWER(HEX(RAND()*255) || HEX(RAND()*255));
        RETURN LEFT(@UUID,8)||'-'||
            SUBSTR(@UUID,9,4)||'-'||
            SUBSTR(@UUID,13,4)||'-'||
            SUBSTR(@UUID,17,4)||'-'||
            RIGHT(@UUID,12);
    END
    /

    ALTER TABLE UM_USER ADD COLUMN UM_USER_ID CHAR(36) NOT NULL DEFAULT 'NONE'
    /
    CALL SYSPROC.ADMIN_CMD('REORG TABLE UM_USER')
    /

    UPDATE UM_USER SET UM_USER_ID = NEWUUID()
    /
    CALL SYSPROC.ADMIN_CMD('REORG TABLE UM_USER')
    /
    ```

2.  If you have JDBC secondary user stores with SCIM enabled, execute the following queries on the UM database.

    ```sql tab="PostgreSQL"
    SELECT DISTINCT t.ATTRIBUTE_NAME
         FROM IDN_CLAIM_MAPPED_ATTRIBUTE AS t
         WHERE t.LOCAL_CLAIM_ID IN (SELECT t2.MAPPED_LOCAL_CLAIM_ID
         FROM IDN_CLAIM_MAPPING AS t2
         JOIN IDN_CLAIM AS t1
         ON t1.ID = t2.EXT_CLAIM_ID
         WHERE t1.CLAIM_URI = 'urn:ietf:params:scim:schemas:core:2.0:id');
    ```

    ```sql tab="Oracle"
    select DISTINCT t.ATTRIBUTE_NAME
    	  FROM IDN_CLAIM_MAPPED_ATTRIBUTE t
      	  WHERE t.LOCAL_CLAIM_ID IN ( SELECT t2.MAPPED_LOCAL_CLAIM_ID
          FROM IDN_CLAIM_MAPPING t2
          JOIN IDN_CLAIM t1
          ON t1.ID = t2.EXT_CLAIM_ID
          WHERE t1.CLAIM_URI = 'urn:ietf:params:scim:schemas:core:2.0:id'   
    )
    /
    ```

    ```sql tab="MySQL"
    SELECT DISTINCT t.ATTRIBUTE_NAME 
       FROM IDN_CLAIM_MAPPED_ATTRIBUTE t 
       WHERE t.LOCAL_CLAIM_ID IN(
       SELECT t2.MAPPED_LOCAL_CLAIM_ID
       FROM IDN_CLAIM_MAPPING t2 
       JOIN IDN_CLAIM t1
       ON t1.ID = t2.EXT_CLAIM_ID 
       WHERE t1.CLAIM_URI ='urn:ietf:params:scim:schemas:core:2.0:id' 
    ) ;
    ```

    ```sql tab="MS SQL" 
    SELECT DISTINCT t.ATTRIBUTE_NAME 
         FROM IDN_CLAIM_MAPPED_ATTRIBUTE AS t
         WHERE t.LOCAL_CLAIM_ID IN ( SELECT t2.MAPPED_LOCAL_CLAIM_ID
         FROM IDN_CLAIM_MAPPING AS t2
         JOIN IDN_CLAIM AS t1
         ON t1.ID = t2.EXT_CLAIM_ID
         WHERE t1.CLAIM_URI = 'urn:ietf:params:scim:schemas:core:2.0:id'
    );
    ```

3.  Based on the result of the above query, follow the relevant instructions given below.  

    -   If the result of the above query is `scimId`, execute the following queries to update `UM_USER_ID` of `UM_USER` with a SCIM Id based on the mapped attribute `scimId`:

        !!! info
            If the result of the above query is `scimId`, it means that the default mapped attribute (scimId) of `http://wso2.org/claims/userid` or the default local claim (`http://wso2.org/claims/userid`) mapped to the `urn:ietf:params:scim:schemas:core:2.0:id` claim is not updated in your WSO2 IS.  

        ```sql tab="PostgreSQL"
        CREATE OR REPLACE FUNCTION update_um_user_id()	returns int 
        LANGUAGE plpgsql
        AS $$
        DECLARE 
        count_rows int;
        cur_um_attr cursor for select T2.um_attr_value, T1.um_id
                  from um_user_attribute  T2
                    join um_user T1
                    on T1.um_Id = T2.um_user_id 
                    where T2.um_attr_name ='scimId';
                  
        rec_um_attr RECORD;		
        BEGIN
          count_rows = 0;	
          open cur_um_attr;
            LOOP
                  fetch cur_um_attr into rec_um_attr;
              exit when not found;
          
                update um_user
                set um_user_id=rec_um_attr.um_attr_value
                where um_id = rec_um_attr.um_id;	
              
            count_rows = count_rows + 1;
            END LOOP;			
          close cur_um_attr;
        return count_rows;		
        END;
        $$;
        select update_um_user_id();
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        update um_user set um_user_id=uuid_generate_v4() where um_user_id = 'N';
        ```

        ```sql tab="Oracle"
        DECLARE
        v_um_attr_value varchar2(100);
        v_um_id number;
        CURSOR cur_um_attr IS
              select T2.um_attr_value, T1.um_id
                from um_user_attribute  T2
                  join um_user T1
                  on T1.um_Id = T2.um_user_id 
                  where T2.um_attr_name ='scimId';    
        BEGIN	

          OPEN cur_um_attr;
          LOOP
            FETCH cur_um_attr INTO v_um_attr_value, v_um_id;
              IF cur_um_attr%NOTFOUND THEN
                      EXIT;
                    END If;
                  
                  update um_user
              set um_user_id = v_um_attr_value
              where um_id =  v_um_id;		
              
          END LOOP;
          CLOSE cur_um_attr; 
          
        END;
        /
        ```

        ```sql tab="My SQL"
        ALTER TABLE UM_USER ADD COLUMN UM_USER_ID CHAR(36) NOT NULL DEFAULT 'NONE';
        ALTER TABLE UM_USER ADD UNIQUE(UM_USER_ID, UM_TENANT_ID);
        DELIMITER $$
        CREATE FUNCTION update_um_user_id() RETURNS int
        DETERMINISTIC 
        BEGIN
          DECLARE count_rows int;
          DECLARE um_usr_attr_value varchar(100);
          DECLARE um_id int;
          DECLARE done INT DEFAULT FALSE;
          DECLARE cur_um_attr CURSOR FOR 
        SELECT
          T2.UM_ATTR_VALUE,
          T1.UM_ID 
        FROM
          UM_USER_ATTRIBUTE T2 
          JOIN
              UM_USER T1 
              ON T1.UM_ID = T2.UM_USER_ID 
        WHERE
          T2.UM_ATTR_NAME = 'scimId';
        DECLARE CONTINUE HANDLER FOR NOT FOUND 
        SET
          done = TRUE;
        SET
          count_rows = 0;
        OPEN cur_um_attr;
        read_loop: loop FETCH cur_um_attr INTO um_usr_attr_value,
        um_id;
        IF done 
        THEN
          LEAVE read_loop;
        END
        IF;
        UPDATE
          UM_USER 
        SET
          UM_USER_ID = um_usr_attr_value 
        WHERE
          UM_ID = um_id;
        SET
          count_rows = count_rows + 1;
        END
        loop;
        CLOSE cur_um_attr;
        RETURN count_rows;
        END
        $$ DELIMITER ;
        SELECT
          update_um_user_id();
        UPDATE
          UM_USER 
        SET
          UM_USER_ID = UUID() 
        WHERE
          UM_USER_ID IS NULL;
        ```

        ```sql tab="MS SQL" 
        IF NOT EXISTS(SELECT * FROM sys.columns WHERE Name = 'UM_USER_ID' 
                  AND object_id = OBJECT_ID('UM_USER'))
        BEGIN
        ALTER TABLE UM_USER ADD UM_USER_ID CHAR(36) DEFAULT 'N' 
        END
        BEGIN
          DECLARE @count_rows int
          DECLARE @um_attr_value varchar(100)
          DECLARE @um_id int

            DECLARE cur_um_attr CURSOR LOCAL FOR select T2.UM_ATTR_VALUE, T1.UM_ID
                  from UM_USER_ATTRIBUTE T2
                    join UM_USER T1
                    on T1.UM_ID = T2.UM_USER_ID 
                    where T2.um_attr_name ='scimId'      	

          SET @count_rows = 0

          OPEN cur_um_attr	
          -- loop through a cursor
          FETCH NEXT FROM cur_um_attr INTO @um_attr_value, @um_id
            WHILE @@FETCH_STATUS = 0
                BEGIN 	
                update UM_USER 
                set UM_USER_ID = @um_attr_value
                where UM_ID =  @um_id	
              
              SET @count_rows = @count_rows + 1
              FETCH NEXT FROM cur_um_attr INTO @um_attr_value, @um_id
            END 	
            
          CLOSE cur_um_attr
        END;

        update UM_USER set UM_USER_ID =LOWER(NEWID())  where UM_USER_ID='N' ;
        ```

    -   If the result of the above query is something different from `scimId`, execute the following queries to update `UM_USER_ID` of `UM_USER` with a SCIM Id based on the updated mapped attribute. 

        !!! info
            This means that the local claim mapped to the `urn:ietf:params:scim:schemas:core:2.0:id` claim is different from `http://wso2.org/claims/userid` or the mapped attribute for the local claim `http://wso2.org/claims/userid` is different from `scimId`.

        ```sql tab="PostgreSQL"
        CREATE OR REPLACE FUNCTION update_um_user_id()	returns int 
        LANGUAGE plpgsql
        AS $$
        DECLARE 
        count_rows int;
        cur_um_attr CURSOR FOR SELECT T2.um_attr_value, T1.um_id 
          FROM   um_user_attribute T2 
          JOIN   um_user T1 
          ON     T1.um_id = T2.um_user_id 
          WHERE  T2.um_attr_name IN 
                ( 
                        SELECT T.attribute_name 
                        FROM   idn_claim_mapped_attribute AS T 
                        WHERE  T.local_claim_id IN 
                              (      SELECT T3.mapped_local_claim_id 
                                      FROM   idn_claim_mapping AS T3 
                                      JOIN   idn_claim         AS T4 
                                      ON     T4.id = T3.ext_claim_id 
                                      WHERE  T4.claim_uri = 'urn:ietf:params:scim:schemas:core:2.0:id') );
                  
        rec_um_attr RECORD;		
        BEGIN
          count_rows = 0;	
          open cur_um_attr;
            LOOP
                  fetch cur_um_attr into rec_um_attr;
              exit when not found;
          
                update um_user
                set um_user_id=rec_um_attr.um_attr_value
                where um_id = rec_um_attr.um_id;	
              
            count_rows = count_rows + 1;
            END LOOP;			
          close cur_um_attr;
        return count_rows;		
        END;
        $$;
        select update_um_user_id();
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        update um_user set um_user_id=uuid_generate_v4() where um_user_id = 'N';
        ```

        ```sql tab="Oracle"
        DECLARE
        v_um_attr_value varchar2(100);
        v_um_id number;
        CURSOR cur_um_attr IS
                select DISTINCT t.ATTRIBUTE_NAME
                FROM IDN_CLAIM_MAPPED_ATTRIBUTE t
                  WHERE t.LOCAL_CLAIM_ID IN ( SELECT t2.MAPPED_LOCAL_CLAIM_ID
                  FROM IDN_CLAIM_MAPPING t2
                  JOIN IDN_CLAIM t1
                  ON t1.ID = t2.EXT_CLAIM_ID
                  WHERE t1.CLAIM_URI = 'urn:ietf:params:scim:schemas:core:2.0:id'   
        )
            
        BEGIN	

          OPEN cur_um_attr;
          LOOP
            FETCH cur_um_attr INTO v_um_attr_value, v_um_id;
              IF cur_um_attr%NOTFOUND THEN
                      EXIT;
                    END If;
                  
                  update um_user
              set um_user_id = v_um_attr_value
              where um_id =  v_um_id;		
              
          END LOOP;
          CLOSE cur_um_attr; 
          
        END;
        /
        ```

        ```sql tab="My SQL" 
        ALTER TABLE UM_USER ADD COLUMN UM_USER_ID CHAR(36) NOT NULL DEFAULT 'NONE';
        ALTER TABLE UM_USER ADD UNIQUE(UM_USER_ID, UM_TENANT_ID);
        DELIMITER $$ CREATE FUNCTION update_um_user_id() RETURNS int DETERMINISTIC 
        BEGIN
          DECLARE count_rows int;
          DECLARE um_usr_attr_value varchar(100);
          DECLARE um_id int;
          DECLARE done INT DEFAULT FALSE;
          DECLARE cur_um_attr CURSOR FOR 
        SELECT
          T2.UM_ATTR_VALUE,
          T1.UM_ID 
        FROM
          UM_USER_ATTRIBUTE T2 
          join
              UM_USER T1 
              on T1.UM_ID = T2.UM_USER_ID 
        WHERE
          T2.UM_ATTR_NAME in 
          (
              SELECT
                T.ATTRIBUTE_NAME 
              FROM
                IDN_CLAIM_MAPPED_ATTRIBUTE as T 
              WHERE
                T.LOCAL_CLAIM_ID in 
                (
                    SELECT
                      T3.MAPPED_LOCAL_CLAIM_ID 
                    FROM
                      IDN_CLAIM_MAPPING as T3 
                      JOIN
                          IDN_CLAIM as T4 
                          on T4.ID = T3.EXT_CLAIM_ID 
                    WHERE
                      T4.CLAIM_URI = 'urn:ietf:params:scim:schemas:core:2.0:id' 
                )
          )
        ;
        DECLARE CONTINUE HANDLER FOR NOT FOUND 
        SET
          done = TRUE;
        SET
          count_rows = 0;
        OPEN cur_um_attr;
        read_loop: loop FETCH cur_um_attr INTO um_usr_attr_value,
        um_id;
        IF done 
        THEN
          LEAVE read_loop;
        END
        IF;
        UPDATE
          UM_USER 
        SET
          UM_USER_ID = um_usr_attr_value 
        WHERE
          UM_ID = um_id;
        SET
          count_rows = count_rows + 1;
        END
        loop;
        CLOSE cur_um_attr;
        RETURN count_rows;
        END
        $$ DELIMITER ;
        SELECT
          update_um_user_id();
        UPDATE
          UM_USER 
        SET
          UM_USER_ID = UUID() 
        WHERE
          UM_USER_ID IS NULL;
        ```

        ```sql tab="MS SQL" 
        IF NOT EXISTS(SELECT * FROM sys.columns WHERE Name = 'UM_USER_ID' 
                  AND object_id = OBJECT_ID('UM_USER'))
        BEGIN
        ALTER TABLE UM_USER ADD UM_USER_ID CHAR(36) DEFAULT 'N' 
        END
        BEGIN
          DECLARE @count_rows int
          DECLARE @um_attr_value varchar(100)
          DECLARE @um_id int

            DECLARE cur_um_attr CURSOR LOCAL FOR SELECT T2.um_attr_value, T1.um_id 
              FROM um_user_attribute T2 
              JOIN um_user T1 
              ON T1.um_id = T2.um_user_id 
              WHERE  T2.um_attr_name 
                  IN (SELECT T.attribute_name 
                                  FROM   idn_claim_mapped_attribute AS T 
                                  WHERE  T.local_claim_id IN 
                                          (SELECT T3.mapped_local_claim_id 
                                          FROM   idn_claim_mapping AS T3 
                                          JOIN idn_claim AS T4 
                                          ON T4.id = T3.ext_claim_id 
                                          WHERE T4.claim_uri = 'urn:ietf:params:scim:schemas:core:2.0:id'))       	

          SET @count_rows = 0
                OPEN cur_um_attr	
          -- loop through a cursor
          FETCH NEXT FROM cur_um_attr INTO @um_attr_value, @um_id
            WHILE @@FETCH_STATUS = 0
                BEGIN 	
                UPDATE UM_USER 
            SET UM_USER_ID = @um_attr_value
            where UM_ID =  @um_id	
              
            SET @count_rows = @count_rows + 1
            FETCH NEXT FROM cur_um_attr INTO @um_attr_value, @um_id
              END 	
            
          CLOSE cur_um_attr
        END;

        UPDATE UM_USER SET UM_USER_ID =LOWER(NEWID())  WHERE UM_USER_ID='N' ;
        ```

## Step 4: (Optional) Sync DBs for Zero downtime

!!! warning
    Proceed with this step only if you have opted for [Zero down time migration]({{base_path}}/setup/migrating-preparing-for-migration/#zero-down-time-migration). 
    
    If not, your migration task is complete by now and you can omit the following steps.

1. Start the data sync tool pointing to the `sync.properties` file:

    !!! info
        This starts syncing data created in the old WSO2 Identity Server database after taking the database dump to the new WSO2 Identity Server database.

    ```bash
    sh wso2server.sh -DsyncData -DconfigFile=<path to sync.properties file>/sync.properties
    ```

2. Monitor the logs in the sync tool to see how many entries are synced at a given time and to keep track of the progress in the data sync process: 

    !!! info
        The following line will be printed in the logs of each table you have specified that has no data to be synced.

    ```tab="Sample"
    [2019-02-27 17:26:32,388]  INFO {org.wso2.is.data.sync.system.pipeline.process.BatchProcessor} -  No data to sync for: <TABLE_NAME>
    ```

    !!! info
        If you have some traffic to the old version of WSO2 Identity Server, the number of entries to be synced might not become zero at any time. In that case, observe the logs to decide on a point where the number of entries that are synced is low.

3. When the data sync is complete, switch the traffic from the old setup to the new setup.

4. Allow the sync client to run for some time to sync the entries that were not synced before switching the deployments. 

When the number of entries synced by the sync tool becomes zero, stop the sync client.

## Step 5: Verify the migration

After the migration is complete, proceed to the following verification steps:

- Monitor the system health (CPU, memory usage etc).
- Monitor the WSO2 logs to see if there are errors logged in the log files.
- Run functional tests against the migrated deployment to verify that all the functionalities are working as expected.

!!! note
    - If you see any problems in the migrated system, revert the traffic to the previous setup and investigate the problem.
    - If the id token validation for the **Console** and **My Account** applications are failing, see [Validation of issuer in .well-known endpoint URL]({{base_path}}/setup/migrating-what-has-changed/#validation-of-issuer-in-well-known-endpoint-url).
