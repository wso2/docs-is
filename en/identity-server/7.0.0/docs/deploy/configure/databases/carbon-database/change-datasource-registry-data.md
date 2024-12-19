# Change the Default Datasources for the Registry Data

!!! note
    To deploy this update into production, you need to have a paid subscription. If you do not have a paid subscription, you can use this feature with the next version of WSO2 Identity Server when it is released. 
    
    If you have a paid subscription, this capability can be made available by applying update level 81 for WSO2 Identity Server 7.0.0 using the WSO2 Update Tool. For more information on updating WSO2 Identity Server using the WSO2 Update Tool, see [WSO2 Updates](https://updates.docs.wso2.com/en/latest/updates/overview/).
    
{% include "../../../../includes/registry-repositories.md" %}

These repositories use the default datasources as follows.

- WSO2_CARBON_DB: Used by the local repository.
- WSO2_SHARED_DB: Used by the configuration and governance repositories.

They can be changed to utilize alternate datasources as described below.

## Configure the Datasource

Following are the sample configuration for each database type.

??? Example "PostgreSQL"
    
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [[datasource]]
        id="WSO2CONFIG_DB"
        url = "jdbc:postgresql://localhost:5432/gregdb"
        username = "regadmin"
        password = "regadmin"
        driver = "org.postgresql.Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/postgresql.sql` file against 
        the created database.    

    3. Download the Postgres JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.
          
??? Example "MySQL"

    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        
        ```
        [[datasource]]
        id="WSO2CONFIG_DB"
        url = "jdbc:mysql://localhost:3306/IAMtest?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/mysql.sql` file against 
        the created database.   

    3. Download the MySQL JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.
            
??? Example "DB2"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [[datasource]]
        id="WSO2CONFIG_DB"
        url = "jdbc:db2://192.168.108.31:50000/test"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/db2.sql` file against 
        the created database.    

    3. Download the DB2 JDBC driver for the version, you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.

??? Example "MSSQL"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [[datasource]]
        id="WSO2CONFIG_DB"
        url = "jdbc:sqlserver://localhost:1433;databaseName=test;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "pass#word2"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/mssql.sql` file against 
        the created database.   

    3. Download the MS SQL JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder. 

??? Example "Oracle"
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.
        ```
        [[datasource]]
        id="WSO2CONFIG_DB"
        url = "jdbc:oracle:thin:@localhost:1521/ORCLPDB"
        username = "IS590Test"
        password = "ora12c"
        driver = "oracle.jdbc.OracleDriver"
        jmx_enable=false
        ```
        
    2.  Execute the database scripts. 
    
        Execute the scripts in the `<IS-HOME>/dbscripts/oracle.sql` file against 
        the created database.    

    3. Download the Oracle JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.

---

### Advanced database configurations

Apart from the above basic configurations, WSO2 Identity Server supports advanced database 
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

---

## Configure the Registry Databases

The following configurations can be added under the `[registry]` section in the `<IS-HOME>/repository/conf/deployment.toml` file.

```
[registry]
local_datasource = "jdbc/<id-of-the-datasource>"
gov_datasource = "jdbc/<id-of-the-datasource>"
config_datasource = "jdbc/<id-of-the-datasource>"
```

<table>
<thead>
<tr class="header">
<th>Configuration</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
    <td><strong>local_datasource</strong></td>
    <td>This is the jndi config name of the datasource for the local repository. 
    Here, this would be "jdbc/&lt;id&gt;" where <code>id</code> is the value configured in the 
    datasource configurations.</td>
</tr>
<tr class="odd">
    <td><strong>gov_datasource</strong></td>
    <td>This is the jndi config name of the datasource configured for the governance repository. 
    Here, this would be "jdbc/&lt;id&gt;" where <code>id</code> is the value configured in the 
    datasource configurations.</td>
</tr>
<tr class="even">
    <td><strong>config_datasource</strong></td>
    <td>This is the jndi config name of the datasource configured for the configuration repository.
    Here, this would be "jdbc/&lt;id&gt;" where <code>id</code> is the value configured in the 
    datasource configurations.</td>
</tr>
</tbody>
</table>

It is only necessary to add the configuration for the datasource which is being changed.
For example, if you wish to change only the governance and configuration datasources,
only the `gov_datasource` and `config_datasource` configurations would be necessary
as shown below.

```
[registry]
gov_datasource = "jdbc/<id-of-the-datasource>"
config_datasource = "jdbc/<id-of-the-datasource>"
```

!!! note "Sample Config"
    If you have correctly configured, the `deployment.toml` file should have an entry 
    similar to the following config. 
    
    The following sample configuration is for separate **MSSQL** governance and config 
    databases.

    ```
    [registry]
    gov_datasource = "jdbc/WSO2GOV_DB"
    config_datasource = "jdbc/WSO2CONFIG_DB"

    [[datasource]]
    id="WSO2GOV_DB"
    url = "jdbc:sqlserver://localhost:1433;databaseName=test1;SendStringParametersAsUnicode=false"
    username = "sa"
    password = "pass#word2"
    driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    jmx_enable=false
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false

    [[datasource]]
    id="WSO2CONFIG_DB"
    url = "jdbc:sqlserver://localhost:1433;databaseName=test2;SendStringParametersAsUnicode=false"
    username = "sa"
    password = "pass#word2"
    driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    jmx_enable=false
    pool_options.maxActive = "80"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=false
    ```
