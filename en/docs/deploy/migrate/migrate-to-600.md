# Migrating to 6.0.0
This document guides you through the migration process from earlier versions of WSO2 Identity Server to Identity Server 6.0.0.

## Before you begin

See the instructions on [preparing for migration]({{base_path}}/setup/migrating-preparing-for-migration) section.

## Step 1: Migrate artifacts and configs

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

### Tenants

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

## Step 2: Run the migration client

To download the **migration resources**, visit [the latest release tag](https://github.com/wso2-extensions/identity-migration-resources/releases/latest) and download the wso2is-migration-x.x.x.zip under **Assets**. Unzip it to a local directory.

!!! Note
    - **x.x.x** of `wso2is-migration-x.x.x.zip` denotes the
    version number of the most recently-released migration resources.
    - The directory where the `wso2is-migration-x.x.x.zip` is unziped will be referred to as ` <IS_MIGRATION_TOOL_HOME> `.

### Dry run

Before doing the actual migration, it is recommended to do a dry run and analyze the generated report for any recommendations related to the migration. 

Dry-run capability in the userstore migrator will allow the migration utility to validate the system for the userstore configurations and generate a report regarding the migration compatibility. In the generated migration report, 
if there are any warnings in the generated migration report, it is recommended to contact the WSO2 support to identify the best migration strategy.

Follow the steps given below.

1.  Configure the migration report path using the value of `reportPath`, `<IS_HOME>/migration-resources/migration-config.yaml` in the `migration-config.yaml`. 
This path should be an absolute path. 

2.  Run the migration utility with system property, `dryRun`. Following is a sample command. 

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

### Set up the client

1. Copy the ` org.wso2.carbon.is.migration-x.x.x.jar ` file in the `<IS_MIGRATION_TOOL_HOME>/dropins` directory into the ` <NEW_IS_HOME>/repository/components/dropins ` directory.

2. Copy migration-resources directory to the `<NEW_IS_HOME>` root directory.

3. Ensure that the property values are as follows in the `<NEW_IS_HOME>/migration-resources/migration-config.yaml` file.

    !!! note
        The `currentVersion` is the current WSO2 Identity Server version that you are using.

    ``` bash
    migrationEnable: "true"

    currentVersion: "5.7.0"

    migrateVersion: "6.0.0"
    ```

    -   If you have multiple tenants and multiple userstores and you only need to migrate a few of them, refer to the configuration section below. If you need to migrate all of them, use the `migrateAll` property (This is set to `true` by default).  

        | Property Name | Description |
        | ------------- | ----------- |
        | migrateAll | Migrate all the tenants and all the userstore domains in it. |
        | reportPath | Absolute path for the dry report. This is required in the dry run mode. |

    -   The following configurations are only needed to migrate a few tenants. The format should be similar to the one mentioned below. `Tenant-param` is a place holder name to represent each tenant uniquely, e.g., tenant1.

        ``` bash  
        -
        name: "UserIDMigrator"
        order: 7
        parameters:
            <tenant-param>:
        ```

        | Property Name | Description |
        | ------------- | ----------- |
        | tenantDomain | Domain name of the tenant (Mandatory) |
        | increment | Number of users to be updated in each iteration (Optional) |
        | startingPoint | This denotes where the migration should start from (Offset). This is useful if the migration stopped in the middle and needs to restart. (Optional) |
        | scimEnabled | Whether SCIM is enabled for userstores in this tenant. (Optional) |
        | migratingDomains | List of comma-separated domain names that should be migrated to this domain (Optional) |
        | forceUpdateUserId | Marks whether user IDs should be updated in case there is an existing ID. (Optional) |

    -   If the userstore is an LDAP userstore and SCIM is enabled for that userstore, migrating that userstore is not required. As SCIM will create a user ID for the users in that userstore, the SCIM ID can be used as the unique user ID. To do that, change `user_id_attribute` to the value of the SCIM ID, in the `<IS_HOME>/repository/conf/deployment.toml` file.

### Run the client

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

## Step 3: (Optional) Migrate secondary user stores

These steps should be carried out for the old database before the migration. A backup of UM database should be taken and database triggers should be set to update the backup database based on the updates of the live database. After performing the following steps the backup database should be migrated to the next version.

1.  If you have JDBC secondary userstores with SCIM disabled, execute the following queries on the UM database. This will add a `UM_USER_ID` column to the `UM_USER` table with a random `UUID` as the default value for `UM_USER_ID`.

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

2.  If you have JDBC secondary userstores with SCIM enabled, execute the following queries on the UM database.

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

3.  If the result of the above query is `scimId`, then follow this step. Otherwise, skip this and move on to step-4.  

    If the result of the above query is `scimId`, it means the default mapped attribute(scimId) of `http://wso2.org/claims/userid` or the default local claim (`http://wso2.org/claims/userid`) mapped to the `urn:ietf:params:scim:schemas:core:2.0:id` claim is not updated in the WSO2 IS server. 
    Hence, the following queries are used to update `UM_USER_ID` of `UM_USER` with a SCIM Id based on the mapped attribute `scimId`.

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

4.  If the result of the above query is something different from `scimId`, it means the local claim mapped to the `urn:ietf:params:scim:schemas:core:2.0:id`  claim is different from `http://wso2.org/claims/userid` or the mapped attribute for the local claim `http://wso2.org/claims/userid` is different from `scimId`. Hence the following queries are used to update `UM_USER_ID` of `UM_USER` with a SCIM Id based on the updated mapped attribute.

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