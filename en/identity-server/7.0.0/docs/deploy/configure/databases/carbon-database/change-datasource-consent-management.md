# Change the Default Datasource for Consent Management

WSO2 Identity Server is shipped with an embedded H2 database for storing data. 
These default databases are located in the `<IS_HOME>/repository/database` directory 
of the pack.

By default, consent management data is stored in the identity database (IDENTITY_DB) with 
Identity and UMA data. However, you can separate consent specific data into a separate 
datasource to any database type that is supported by WSO2 Identity Server.

!!! note
    For more information about databases, see 
    [Work with Databases]({{base_path}}/deploy/configure/databases) and [Set Up Separate Databases for Clustering]({{base_path}}/deploy/set-up-separate-databases-for-clustering).

Following are the sample configuration for each database type.

??? Example "PostgreSQL"
    
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:postgresql://localhost:5432/gregdb"
        username = "regadmin"
        password = "regadmin"
        driver = "org.postgresql.Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/consent/postgresql.sql` file against 
        the created database.    
          
??? Example "MySQL"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:mysql://localhost:3306/IAMtest?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/consent/mysql.sql` file against 
        the created database.    
            
??? Example "DB2"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:db2://192.168.108.31:50000/test"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/consent/db2.sql` file against 
        the created database.    


??? Example "MSSQL"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:sqlserver://localhost:1433;databaseName=test;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "pass#word2"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/consent/mssql.sql` file against 
        the created database.    

??? Example "Oracle"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:oracle:thin:@localhost:1521/ORCLPDB"
        username = "IS590Test"
        password = "ora12c"
        driver = "oracle.jdbc.OracleDriver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/consent/oracle.sql` file against 
        the created database.    

---

## Advanced database configurations

Apart from above basic configurations, WSO2 Identity Server supports advanced database 
configurations. Add the following configurations to the `<IS_HOME>/repository/conf/
deployment.toml` file under the corresponding `[[datasource]]` tag.

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

Once when we separate out the consent database from `WSO2IdentityDB`, we need to add the 
following configuration to the `deployment.toml` file to specify WSO2 Identity Server to 
use a separate datasource instead of the default `IDENTITY_DB`.

```
[authentication.consent]
data_source="jdbc/WSO2CONSENT_DB"
```  

!!! note "Sample Config"
    If you have correctly configured, the `deployment.toml` file should have an entry 
    similar to the following config. 
    
    The following sample configuration is for a separate **PostgreSQL** consent 
    management database.
    
    ```
    [[datasource]]
    id="WSO2CONSENT_DB"
    url = "jdbc:postgresql://localhost:5432/gregdb"
    username = "regadmin"
    password = "regadmin"
    driver = "org.postgresql.Driver"
    jmx_enable=false
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    
    [authentication.consent]
    data_source="jdbc/WSO2CONSENT_DB"
    ``` 