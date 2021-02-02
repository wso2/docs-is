# Change the Default Datasource for Consent Management

WSO2 Identity Server is shipped with an embedded H2 database for storing data. 
These default databases are located in the `<IS_HOME>/repository/database` directory 
of the product pack.

By default, consent management data is stored in the identity database (IDENTITY_DB) with 
Identity and UMA data. However, you can separate consent specific data into a separate 
data-source to any database type that is supported by WSO2 Identity Server.

!!! note
    For more information about databases, see 
    [Working with Databases](../../../deploy/working-with-databases) and 
    [Setting Up Separate Databases for Clustering](../../../deploy/setting-up-separate-databases-for-clustering).

Following are the sample configuration for each database type.

??? Example "PostgreSQL"
    1. deployment.toml Configurations.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:postgresql://localhost:5432/gregdb"
        username = "regadmin"
        password = "regadmin"
        driver = "org.postgresql.Driver"
        jmx_enable=false
        ```
        
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the created database.    
            
          - `<IS-HOME>/dbscripts/consent/postgresql.sql`
          
??? Example "MySQL"
    1. deployment.toml Configurations.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:mysql://localhost:3306/IAMtest?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        jmx_enable=false
        ```
        
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the created database.    
            
          - `<IS-HOME>/dbscripts/consent/mysql.sql`

??? Example "DB2"
    1. deployment.toml Configurations.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:db2://192.168.108.31:50000/test"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        jmx_enable=false
        ```
        
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the created database.    
            
          - `<IS-HOME>/dbscripts/consent/db2.sql`

??? Example "MSSQL"
    1. Deployment.toml Configurations.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:sqlserver://localhost:1433;databaseName=test;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "pass#word2"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        jmx_enable=false
        ```
        
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the created database.    
            
          - `<IS-HOME>/dbscripts/consent/mssql.sql`

??? Example "Oracle"
    1. deployment.toml Configurations.
        ```
        [[datasource]]
        id="WSO2CONSENT_DB"
        url = "jdbc:oracle:thin:@localhost:1521/ORCLPDB"
        username = "IS590Test"
        password = "ora12c"
        driver = "oracle.jdbc.OracleDriver"
        jmx_enable=false
        ```
        
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the created database.    
            
          - `<IS-HOME>/dbscripts/consent/oracle.sql`

---

## Advanced database configurations

Apart from above basic configurations, WSO2 Identity Server supports advanced database 
configurations. Add the following configurations to the `<IS_HOME>/repository/conf/
deployment.toml` file under the corresponding `[[datasource]]` tag.

``` tab="PostgreSQL"
pool_options.maxActive = "80"
pool_options.maxWait = "60000"
pool_options.minIdle = "5"
pool_options.testOnBorrow = true
pool_options.validationQuery="SELECT 1; COMMIT"
pool_options.validationInterval="30000"
pool_options.defaultAutoCommit=false
```

``` tab="MySQL"
pool_options.maxActive = "80"
pool_options.maxWait = "60000"
pool_options.minIdle = "5"
pool_options.testOnBorrow = true
pool_options.validationQuery="SELECT 1"
pool_options.validationInterval="30000"
pool_options.defaultAutoCommit=false
```

``` tab="DB2"
pool_options.maxActive = "80"
pool_options.maxWait = "360000"
pool_options.minIdle = "5"
pool_options.testOnBorrow = true
pool_options.validationQuery="SELECT 1"
pool_options.validationInterval="30000"
pool_options.defaultAutoCommit=false
```

``` tab="MSSQL"
pool_options.maxActive = "80"
pool_options.maxWait = "60000"
pool_options.minIdle = "5"
pool_options.testOnBorrow = true
pool_options.validationQuery="SELECT 1"
pool_options.validationInterval="30000"
pool_options.defaultAutoCommit=false
```

``` tab="Oracle"
pool_options.maxActive = "80"
pool_options.maxWait = "60000"
pool_options.minIdle = "5"
pool_options.testOnBorrow = true
pool_options.validationQuery="SELECT 1 FROM DUAL"
pool_options.validationInterval="30000"
pool_options.defaultAutoCommit=false
```

The elements in the above configuration are described below.   

<table>
<tr class="even">
<td><strong>maxActive</strong></td>
<td>The maximum number of active connections that can be allocated at the same time from this pool. 
Enter any negative value to denote an unlimited number of active connections.</td>
</tr>
<tr class="odd">
<td><strong>maxWait</strong></td>
<td>The maximum number of milliseconds that the pool will wait (when there are no available 
connections) for a connection to be returned before throwing an exception. You can enter 
zero or a negative value to wait indefinitely.</td>
</tr>
<tr class="even">
<td><strong>minIdle</strong></td>
<td>The minimum number of active connections that can remain idle in the pool without 
extra ones being created, or enter zero to create none.</td>
</tr>
<tr class="odd">
<td><p><strong>testOnBorrow</strong></p></td>
<td>Indicates whether objects will be validated before being borrowed from the pool. If 
the object fails to validate, it will be dropped from the pool, and another attempt 
will be made to borrow another.</td>
</tr>
<tr class="even">
<td><p><strong>defaultAutoCommit</strong></p></td>
<td>Indicates whether to commit database changes automatically or not.</td>
</tr>
<tr class="odd">
<td><strong>validationInterval</strong></td>
<td>The indication to avoid excess validation, and only run validation at the most, 
at this frequency (time in milliseconds). If a connection is due for validation, but has 
been validated previously within this interval, it will not be validated again.</td>
</tr>
<tr class="even">
<td><strong>defaultAutoCommit</strong></td>
<td><div class="content-wrapper">
<p>This property is <strong>not</strong> applicable to the Carbon database in WSO2 
products because auto committing is usually handled at the code level, i.e., the 
default auto commit configuration specified for the RDBMS driver will be effective 
instead of this property element. Typically, auto committing is enabled for RDBMS 
drivers by default.</p>
<p>When auto committing is enabled, each SQL statement will be committed to the 
database as an individual transaction, as opposed to committing multiple statements 
as a single transaction.</p>
</td>
</tr>
</tbody>
</table>
    
!!! info 
    For more information on other parameters that can be defined in
    the `<IS_HOME>/repository/conf/deployment.toml` file, see [Tomcat
    JDBC Connection
    Pool](http://tomcat.apache.org/tomcat-9.0-doc/jdbc-pool.html#Tomcat_JDBC_Enhanced_Attributes).


Once when we separate out consent database from `WSO2IdentityDB`, we need to add the 
following configuration to the `deployement.toml` file to specify WSO2 Identity Server to 
use a separate data-source instead of default `IDENTITY_DB`.

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