# Change the Default Datasource for Agent Identities

WSO2 Identity Server ships with an embedded H2 database for storing data. These default databases are located in the `<IS_HOME>/repository/database` directory.

Agent identity data is stored in the agent database (AGENT). You can use any database type that is supported by WSO2 Identity Server.

!!! note
    For more information about databases, see 
    [Work with Databases]({{base_path}}/deploy/configure/databases) and [Set Up Separate Databases for Clustering]({{base_path}}/deploy/set-up-separate-databases-for-clustering).

Following are the sample configuration for each database type.

??? Example "PostgreSQL"
    
    1.  Configure the `<IS_HOME>/repository/conf/deployment.toml` file.
        
        ```
        [datasource.AgentIdentity]
        id = "AgentIdentity"
        url = "jdbc:postgresql://localhost:5432/AgentDB"
        username = "regadmin"
        password = "regadmin"
        driver = "org.postgresql.Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS_HOME>/dbscripts/identity/agent/postgresql.sql` file against 
        the created database.    
          
??? Example "MySQL"

    1.  Configure the `<IS_HOME>/repository/conf/deployment.toml` file.
        
        ```
        [datasource.AgentIdentity]
        id = "AgentIdentity"
        url = "jdbc:mysql://localhost:3306/AgentDB?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS_HOME>/dbscripts/identity/agent/mysql.sql` file against 
        the created database.    
            
??? Example "DB2"
    1.  Configure the `<IS_HOME>/repository/conf/deployment.toml` file.
        ```
        [datasource.AgentIdentity]
        id = "AgentIdentity"
        url = "jdbc:db2://192.168.108.31:50000/AgentDB"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS_HOME>/dbscripts/identity/agent/db2.sql` file against 
        the created database.    


??? Example "MSSQL"
    1.  Configure the `<IS_HOME>/repository/conf/deployment.toml` file.
        ```
        [datasource.AgentIdentity]
        id = "AgentIdentity"
        url = "jdbc:sqlserver://localhost:1433;databaseName=AgentDB;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "pass#word2"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 

        Execute the scripts in the `<IS_HOME>/dbscripts/identity/agent/mssql.sql` file against 
        the created database.

??? Example "Oracle"
    1.  Configure the `<IS_HOME>/repository/conf/deployment.toml` file.
        ```
        [datasource.AgentIdentity]
        id = "AgentIdentity"
        url = "jdbc:oracle:thin:@localhost:1521/AGENTDB"
        username = "IS590Test"
        password = "ora12c"
        driver = "oracle.jdbc.OracleDriver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS_HOME>/dbscripts/identity/agent/oracle.sql` file against 
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

!!! note "Sample Config"
    If you have correctly configured, the `deployment.toml` file should have an entry 
    similar to the following config. 
    
    The following sample configuration is for a separate **PostgreSQL** consent 
    management database.
    
    ```
    [datasource.AgentIdentity]
    id = "AgentIdentity"
    url = "jdbc:postgresql://localhost:5432/AgentDB"
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
    ``` 
