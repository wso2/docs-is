# Change the Default Datasource for BPS

This document guides you to change the underlying databases that are
used in business process service(BPS) components.

By default WSO2 Identity Server uses the Embedded H2 database as the BPS
datasource. However, you can change this to any database type that is
supported by WSO2 Identity Server.

Following are the sample configuration for each database type.

??? example "PostgreSQL"
    
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [bps_database.config]
        url = "jdbc:postgresql://localhost:5432/gregdb"
        username = "regadmin"
        password = "regadmin"
        driver = "org.postgresql.Driver"

        [bps_database.config.pool_options]
        defaultAutoCommit=true
        commitOnReturn=true
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/bps/bpel/create/postgresql.sql` file against the created database.    

??? example "MySQL"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [bps_database.config]
        url = "jdbc:mysql://localhost:3306/IAMtest?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        ```
    
    2.  Execute the database scripts. 

        Execute the scripts in the `<IS-HOME>/dbscripts/bps/bpel/create/mysql.sql` file against the created database.    
         

??? example "DB2"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.

        ```
        [bps_database.config]
        url = "jdbc:db2://192.168.108.31:50000/test"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        ```   

    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/bps/bpel/create/db2.sql` file against the created database.    
         

??? example "MSSQL"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.

        ```
        [bps_database.config]
        url = "jdbc:sqlserver://localhost:1433;databaseName=test;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "pass#word2"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        ```

    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/bps/bpel/create/mssql.sql` file against the created database.    
         

??? example "Oracle"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [bps_database.config]
        url = "jdbc:oracle:thin:@localhost:1521/ORCLPDB"
        username = "IS590Test"
        password = "ora12c"
        driver = "oracle.jdbc.OracleDriver"
        ```

    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/bps/bpel/create/oracle.sql` file against the created database.    


**Advanced BPS Database Configurations**

Apart from the above basic configurations, WSO2 Identity Server supports the following advanced BPS database configurations.

   ``` toml
   [bps_database.config.pool_options]
   maxActive = "50"
   maxWait = "60000"
   minIdle = "5"
   testOnBorrow = true
   validationInterval = "30000"
   validationQuery = "SELECT 1; COMMIT"
   ```

The descriptions for the advanced configurations can be found in the [Performance Tuning]({{base_path}}/deploy/performance/performance-tuning-recommendations/#jdbc-pool-configuration) documentation.