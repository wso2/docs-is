# Migrate Userstores

Before doing the actual user store migration, it is recommended to do a dry run and analyze the generated report for 
any recommendations related to the migration. 

---

## Dry run

Dry-run capability in the user store migrator will allow the migration utility to validate the system for the 
user store configurations and generate a report regarding the migration compatibility. In the generated migration report, 
if there are any warnings in the generated migration report, it is recommended to contact the WSO2 support to identify the best migration strategy.

---

### How to run

Configure the migration report path using the value of `reportPath`, `<IS_HOME>/migration-resources/migration-config.yaml` in the `migration-config.yaml`. 
This path should be an absolute path. 

Run the migration utility with system property “dryRun”. 

Ex:

``` bash tab="Unix/Linux"
sh wso2server.sh -Dmigrate -Dcomponent=identity -DdryRun
```

``` bash tab="Windows"
wso2server.bat -Dmigrate -Dcomponent=identity -DdryRun
```
 
After that analyze the generated report that resides in the provided location.

---

## Migrate userstores

If you have multiple tenants and multiple user stores and you only need to migrate a few of them, refer to the 
configuration section below. If you need to migrate all of them, use the `migrateAll` property (This is set to true by default).  

---

### Special scenarios

If the user store is an LDAP user store and SCIM is enabled for that user store, migrating that user store is not
 required. 
As SCIM will create a user ID for the users in that user store, the SCIM ID can be used as the unique user ID. To do that, 
change the `user_id_attribute` to the value of the SCIM ID, in the `<IS_HOME>/repository/conf/deployment.toml` file.

---

## Configurations

| Property Name | Description |
| ------------- | ----------- |
| migrateAll | Migrate all the tenants and all the user store domains in it. |
| reportPath | Absolute path for the dry report. This is required in the dry run mode. |


The following configurations are only needed to migrate a few tenants. The format should be similar to the one mentioned below. `Tenant-param` is a place holder name to represent each tenant uniquely, e.g., tenant1.

```  
-
  name: "UserIDMigrator"
  order: 7
  parameters:
    <tenant-param>:
```

| Property Name | Description |
| ------------- | ----------- |
| tenantDomain | Domain name of the tenant. (Mandatory) |
| increment | Number of users to be updated in each iteration. (Optional) |
| startingPoint | Where should the migration start from (Offset). This is useful if the migration stopped in the middle and needs to restart. (Optional) |
| scimEnabled | Whether SCIM is enabled for user stores in this tenant. (Optional) |
| migratingDomains | List of comma-separated domain names that should be migrated to this domain. (Optional) |
| forceUpdateUserId | Mark whether user IDs should be updated even though there is already an existing ID. (Optional) |

---

## Populate UserIds for the userstores

These steps should be carried out for the old database before the migration. A backup of UM database should be taken and database triggers should be set to update the backup database based on the updates of the live database. After performing the following steps the backup database should be migrated to the next version.

1.  If you have JDBC secondary user stores with SCIM disabled, execute the following queries on the UM database. This will add a `UM_USER_ID` column to the `UM_USER` table with a random `UUID` as the default value for `UM_USER_ID`.

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

3.  If the result of the above query is `scimId` then follow this step. Otherwise, skip this and move on to step-4.  

    If the result of the above query is `scimId`, it means the default mapped attribute(scimId) of `http://wso2.org/claims/userid` or the default local claim (`http://wso2.org/claims/userid`) mapped to the `urn:ietf:params:scim:schemas:core:2.0:id` claim is not updated in the WSO2 IS server. 
    Hence, the following queries are used to update the `UM_USER_ID` of `UM_USER` with SCIM Id based on the mapped attribute `scimId`.

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

4.  If the result of the above query is something different from `scimId`, it means the local claim mapped to the `urn:ietf:params:scim:schemas:core:2.0:id`  claim is different than   `http://wso2.org/claims/userid` or the mapped attribute for the local claim `http://wso2.org/claims/userid` is different than `scimId`. Hence the following queries are used to update the `UM_USER_ID` of `UM_USER` with SCIM Id based on the updated mapped attribute.

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
