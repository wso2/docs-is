# Change the Default Datasource for Session Storage

This document guides you to configure a separate database for storing session related information.

WSO2 Identity Server is shipped with an embedded H2 database for storing data. 
These default databases are located in the `<IS_HOME>/repository/database` directory 
of the pack.

By default, session data is stored in the identity database (IDENTITY_DB) with 
Identity and UMA data. However, you can separate session specific data into a separate 
datasource to any database type that is supported by WSO2 Identity Server.

!!! note
    For more information about databases, see 
    [Work with Databases]({{base_path}}/deploy/work-with-databases) and [Set Up Separate Databases for Clustering]({{base_path}}/deploy/set-up-separate-databases-for-clustering).

Following are the sample configuration for each database type.

??? Example "PostgreSQL"
    
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [datasource.WSO2SessionDB]
        id = "WSO2SessionDB"
        url = "jdbc:postgresql://localhost:5432/sessiondb"
        username = "root"
        password = "root"
        driver = "org.postgresql.Driver"
        jmxEnabled = false
        ```
        
    2.  Execute the following scripts against the created database.    
    
        ```
        DROP TABLE IF EXISTS IDN_AUTH_SESSION_STORE;
        CREATE TABLE IDN_AUTH_SESSION_STORE (
            SESSION_ID VARCHAR(100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BYTEA,
            TIME_CREATED BIGINT,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        );

        DROP TABLE IF EXISTS IDN_AUTH_TEMP_SESSION_STORE;
        CREATE TABLE IDN_AUTH_TEMP_SESSION_STORE (
            SESSION_ID VARCHAR(100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BYTEA,
            TIME_CREATED BIGINT,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        );

        -- IDN_AUTH_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_SESSION_TIME ON IDN_AUTH_SESSION_STORE (TIME_CREATED);
        CREATE INDEX IDX_IDN_AUTH_SSTR_ST_OP_ID_TM ON IDN_AUTH_SESSION_STORE (OPERATION, SESSION_TYPE, SESSION_ID, TIME_CREATED);
        CREATE INDEX IDX_IDN_AUTH_SSTR_ET_ID ON IDN_AUTH_SESSION_STORE (EXPIRY_TIME, SESSION_ID);
        
        -- IDN_AUTH_TEMP_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_TMP_SESSION_TIME ON IDN_AUTH_TEMP_SESSION_STORE (TIME_CREATED);
        ```
          
??? Example "MySQL"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [datasource.WSO2SessionDB]
        id = "WSO2SessionDB"
        url = "jdbc:mysql://localhost:3306/sessiondb?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.cj.jdbc.Driver"
        jmxEnabled = false
        ```
        
    2.  Execute the following scripts against the created database.    

        ```
        CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BLOB,
            TIME_CREATED BIGINT,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        )DEFAULT CHARACTER SET latin1 ENGINE INNODB;

        CREATE TABLE IF NOT EXISTS IDN_AUTH_TEMP_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BLOB,
            TIME_CREATED BIGINT,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        )DEFAULT CHARACTER SET latin1 ENGINE INNODB;

        -- IDN_AUTH_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_SESSION_TIME ON IDN_AUTH_SESSION_STORE (TIME_CREATED);
        CREATE INDEX IDX_IDN_AUTH_SSTR_ST_OP_ID_TM ON IDN_AUTH_SESSION_STORE (OPERATION, SESSION_TYPE, SESSION_ID, TIME_CREATED);
        CREATE INDEX IDX_IDN_AUTH_SSTR_ET_ID ON IDN_AUTH_SESSION_STORE (EXPIRY_TIME, SESSION_ID);
        
        -- IDN_AUTH_TEMP_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_TMP_SESSION_TIME ON IDN_AUTH_TEMP_SESSION_STORE (TIME_CREATED);
        ```
            
??? Example "DB2"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [datasource.WSO2SessionDB]
        id = "WSO2SessionDB"
        url = "jdbc:db2://localhost:50000/sessiondb"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        jmxEnabled = false
        ```

    2.  Execute the following scripts against the created database.    
    
        ```
        CREATE TABLE IDN_AUTH_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BLOB,
            TIME_CREATED BIGINT NOT NULL,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT NOT NULL,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        )
        /

        CREATE TABLE IDN_AUTH_TEMP_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BLOB,
            TIME_CREATED BIGINT NOT NULL,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT NOT NULL,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        )
        /

        -- IDN_AUTH_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_SESSION_TIME ON IDN_AUTH_SESSION_STORE (TIME_CREATED)
        /
        CREATE INDEX IDX_IDN_AUTH_SSTR_ST_OP_ID_TM ON IDN_AUTH_SESSION_STORE (OPERATION, SESSION_TYPE, SESSION_ID, TIME_CREATED)
        /
        CREATE INDEX IDX_IDN_AUTH_SSTR_ET_ID ON IDN_AUTH_SESSION_STORE (EXPIRY_TIME, SESSION_ID)
        /
        
        -- IDN_AUTH_TEMP_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_TMP_SESSION_TIME ON IDN_AUTH_TEMP_SESSION_STORE (TIME_CREATED)
        /
        ```   


??? Example "MSSQL"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [datasource.WSO2SessionDB]
        id = "WSO2SessionDB"
        url = "jdbc:sqlserver://localhost:1433;databaseName=sessiondb;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "password"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        jmxEnabled = false
        ```

    2.  Execute the following scripts against the created database.    
    
        ```
        IF NOT  EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[DBO].[IDN_AUTH_SESSION_STORE]') AND TYPE IN (N'U'))
        CREATE TABLE IDN_AUTH_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT VARBINARY(MAX),
            TIME_CREATED BIGINT,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        );

        IF NOT  EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[DBO].[IDN_AUTH_TEMP_SESSION_STORE]') AND TYPE IN (N'U'))
        CREATE TABLE IDN_AUTH_TEMP_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT VARBINARY(MAX),
            TIME_CREATED BIGINT,
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME BIGINT,
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        );

        -- IDN_AUTH_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_SESSION_TIME ON IDN_AUTH_SESSION_STORE (TIME_CREATED);
        CREATE INDEX IDX_IDN_AUTH_SSTR_ST_OP_ID_TM ON IDN_AUTH_SESSION_STORE (OPERATION, SESSION_TYPE, SESSION_ID, TIME_CREATED);
        CREATE INDEX IDX_IDN_AUTH_SSTR_ET_ID ON IDN_AUTH_SESSION_STORE (EXPIRY_TIME, SESSION_ID);
        
        -- IDN_AUTH_TEMP_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_TMP_SESSION_TIME ON IDN_AUTH_TEMP_SESSION_STORE (TIME_CREATED);
        ```   

??? Example "Oracle"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [datasource.WSO2SessionDB]
        id = "WSO2SessionDB"
        url = "jdbc:oracle:thin:@localhost:1521/ORCLPDB"
        username = "user"
        password = "password"
        driver = "oracle.jdbc.OracleDriver"
        jmxEnabled = false
        ```

    2.  Execute the following scripts against the created database.    
    
        ```
        CREATE TABLE IDN_AUTH_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BLOB,
            TIME_CREATED NUMBER(19),
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME NUMBER(19),
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        )
        /

        CREATE TABLE IDN_AUTH_TEMP_SESSION_STORE (
            SESSION_ID VARCHAR (100) NOT NULL,
            SESSION_TYPE VARCHAR(100) NOT NULL,
            OPERATION VARCHAR(10) NOT NULL,
            SESSION_OBJECT BLOB,
            TIME_CREATED NUMBER(19),
            TENANT_ID INTEGER DEFAULT -1,
            EXPIRY_TIME NUMBER(19),
            PRIMARY KEY (SESSION_ID, SESSION_TYPE, TIME_CREATED, OPERATION)
        )
        /

        -- IDN_AUTH_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_SESSION_TIME ON IDN_AUTH_SESSION_STORE (TIME_CREATED)
        /
        CREATE INDEX IDX_IDN_AUTH_SSTR_ST_OP_ID_TM ON IDN_AUTH_SESSION_STORE (OPERATION, SESSION_TYPE, SESSION_ID, TIME_CREATED)
        /
        CREATE INDEX IDX_IDN_AUTH_SSTR_ET_ID ON IDN_AUTH_SESSION_STORE (EXPIRY_TIME, SESSION_ID)
        /
        
        -- IDN_AUTH_TEMP_SESSION_STORE --
        CREATE INDEX IDX_IDN_AUTH_TMP_SESSION_TIME ON IDN_AUTH_TEMP_SESSION_STORE (TIME_CREATED)
        /
        ``` 

---

## Advanced database configurations

Apart from above basic configurations, WSO2 Identity Server supports advanced database 
configurations. Add the following configurations to the `<IS_HOME>/repository/conf/
deployment.toml` file under the `[datasource.WSO2SessionDB.pool_options]` tag.

=== "PostgreSQL"
    ``` json
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1; COMMIT"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    ```

=== "MySQL"
    ``` json
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    ```

=== "DB2"
    ``` json
    pool_options.maxActive = "80"
    pool_options.maxWait = "360000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    ```

=== "MSSQL"
    ``` json
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    ```

=== "Oracle"
    ``` json
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1 FROM DUAL"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    ```

{% include "../../../../includes/db-config-table.md" %}

Once when we separate out the session database from `WSO2IdentityDB`, we need to add the 
following configuration to the `deployment.toml` file to specify WSO2 Identity Server to 
use a separate datasource instead of the default `IDENTITY_DB`.

```
[session]
data_source="jdbc/WSO2SessionDB"
```  

!!! note "Sample Config"
    If you have correctly configured, the `deployment.toml` file should have an entry 
    similar to the following config. 
    
    The following sample configuration is for a separate **PostgreSQL** consent 
    management database.
    
    ```
    [datasource.WSO2SessionDB]
    id = "WSO2SessionDB"
    url = "jdbc:postgresql://localhost:5432/sessiondb"
    username = "root"
    password = "root"
    driver = "org.postgresql.Driver"
    jmxEnabled = false

    [datasource.WSO2SessionDB.pool_options]
    validationQuery="SELECT 1; COMMIT"
    testOnBorrow = true
    maxActive=200
    maxWait = 60000
    minIdle = 5
    validationInterval="30000"
    defaultAutoCommit=false
    
    [session]
    data_source="jdbc/WSO2SessionDB"
    ``` 