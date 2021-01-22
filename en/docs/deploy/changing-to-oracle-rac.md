# Change to Oracle RAC

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use Oracle RAC for this purpose.

---

## Datasource configurations

A datasource is used to establish the connection to a database. By
default, `WSO2_IDENTITY_DB` and `WSO2_SHARED_DB` datasources are used to connect
to the default  H2 database. 

- `WSO2_SHARED_DB` - The datasource which stores registry and user management
                     data.
- `WSO2_IDENTITY_DB` - The datasource specific for the identity server which stores
                       identity related data
                       
After setting up the Oracle RAC database. You can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that Oracle RAC database by following below instructions.

---

### Change the default datasource

### Minimum configurations for changing default datasource to Oracle RAC
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

<table>
<thead>
<tr class="header">
<th>Element</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td><strong>username</strong> and <strong>password</strong></td>
<td>The name and password of the database user.</td>
</tr>
<tr class="even">
<td><strong>driver</strong></td>
<td>The jdbc driver of the database.</td>
</tr>
<tr class="even">
<td><strong>url</strong></td>
<td>The url of the database.</td>
</tr>
</table>   
 
 A sample configuration is given below.

   1. `WSO2_IDENTITY_DB` 
    
       1. Configure the `deployment.toml` file.

           ``` toml
            [database.identity_db]
            url = "jdbc:oracle:thin:@(DESCRIPTION=(LOAD_BALANCE=on)
                               (ADDRESS=(PROTOCOL=TCP)(HOST=racnode1) (PORT=1521))
                               (ADDRESS=(PROTOCOL=TCP)(HOST=racnode2) (PORT=1521))
                               (CONNECT_DATA=(SERVICE_NAME=rac)))"
            username = "regadmin"
            password = "regadmin"
            driver = "oracle.jdbc.OracleDriver"
            [database.identity_db.pool_options]
            maxActive = "80"
            maxWait = "60000"
            minIdle = "5"
            testOnBorrow = true
            validationQuery="SELECT 1 FROM DUAL"
            validationInterval="30000"
            defaultAutoCommit=false
           ```
       
       2. Execute database scripts.
        
          Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files, against the database created.
           
           - `<IS-HOME>/dbscripts/identity/oracle_rac.sql`
           - `<IS-HOME>/dbscripts/identity/uma/oracle_rac.sql`
           - `<IS-HOME>/dbscripts/consent/oracle_rac.sql`
         
   2. `WSO2_SHARED_DB`
        
       1. Configure the `deployment.toml` file.

           ``` toml
            [database.shared_db]
            url = "jdbc:oracle:thin:@(DESCRIPTION=(LOAD_BALANCE=on)
                               (ADDRESS=(PROTOCOL=TCP)(HOST=racnode1) (PORT=1521))
                               (ADDRESS=(PROTOCOL=TCP)(HOST=racnode2) (PORT=1521))
                               (CONNECT_DATA=(SERVICE_NAME=rac)))"
            username = "regadmin"
            password = "regadmin"
            driver = "oracle.jdbc.OracleDriver"
            [database.shared_db.pool_options]
            maxActive = "80"
            maxWait = "60000"
            minIdle = "5"
            testOnBorrow = true
            validationQuery="SELECT 1 FROM DUAL"
            validationInterval="30000"
            defaultAutoCommit=false
           ```
           
       2. Execute database scripts.
        
          Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against the database created.
                      
           - `<IS-HOME>/dbscripts/oracle_rac.sql`
           
   3. If you have a requirement in using workflow feature follow, 
       [Changing the default database of BPS database](../../../deploy/changing-datasource-bpsds)
       
   4.  Download the Oracle RAC JDBC driver for the version, you are using and
            copy it to the `<IS_HOME>/repository/components/lib` folder  
    
    !!! note     
        In earlier versions WSO2 Identity Server had the option to create databases automatically using the 
        -DSetup option  **from [January 2018 onwards](https://wso2.com/products/carbon/release-matrix/) 
        WSO2 Identity Server has deprecated the** **`              -DSetup             `** **option**
        Note that the proper practice is for the DBA to run the DDL statements manually so that the DBA
        can examine and optimize any DDL statement (if necessary) based on the DBA best practices that are in
        place within the organization.  
           
---      

### Advanced database configurations

Apart from the basic configurations specified above, WSO2 Identity Server supports some advanced database configurations as well.

- `WSO2_IDENTITY_DB` `deployment.toml` configurations:
    
   ``` toml
   [database.identity_db.pool_options]
    maxActive = "80"
    maxWait = "60000"
    minIdle = "5"
    testOnBorrow = true
    validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=false
   ```
   
- `WSO2_SHARED_DB` `deployment.toml` configurations:
        
   ``` toml
   [database.shared_db.pool_options]
    maxActive = "80"
    maxWait = "60000"
    minIdle = "5"
    testOnBorrow = true
    validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=false
   ```

The elements in the above configuration are described below:   
<table>
<tr class="even">
<td><strong>maxActive</strong></td>
<td>The maximum number of active connections that can be allocated at the same time from this pool. Enter any negative value to denote an unlimited number of active connections.</td>
</tr>
<tr class="odd">
<td><strong>maxWait</strong></td>
<td>The maximum number of milliseconds that the pool will wait (when there are no available connections) for a connection to be returned before throwing an exception. You can enter zero or a negative value to wait indefinitely.</td>
</tr>
<tr class="even">
<td><strong>minIdle</strong></td>
<td>The minimum number of active connections that can remain idle in the pool without extra ones being created, or enter zero to create none.</td>
</tr>
<tr class="odd">
<td><p><strong>testOnBorrow</strong></p></td>
<td>Indicates Whether objects will be validated before being borrowed from the pool. If the object fails to 
validate, it will be dropped from the pool, and another attempt will be made to borrow another.</td>
</tr>
<tr class="even">
<td><p><strong>defaultAutoCommit</strong></p></td>
<td>Indicates Whether to commit database changes automatically or not.</td>
</tr>
<tr class="odd">
<td><strong>validationInterval</strong></td>
<td>The indication to avoid excess validation, and only run validation at the most, at this frequency (time in milliseconds). If a connection is due for validation, but has been validated previously within this interval, it will not be validated again.</td>
</tr>
<tr class="even">
<td><strong>defaultAutoCommit</strong></td>
<td><div class="content-wrapper">
<p>This property is <strong>not</strong> applicable to the Carbon database in WSO2 products because auto committing is usually handled at the code level, i.e., the default auto commit configuration specified for the RDBMS driver will be effective instead of this property element. Typically, auto committing is enabled for RDBMS drivers by default.</p>
<p>When auto committing is enabled, each SQL statement will be committed to the database as an individual transaction, as opposed to committing multiple statements as a single transaction.</p>
</td>
</tr>
</tbody>
</table>

!!! info  
    For more information on other parameters that can be defined in
    the `<IS_HOME>/repository/conf/deployment.toml` file, see [Tomcat
    JDBC Connection
    Pool](http://tomcat.apache.org/tomcat-9.0-doc/jdbc-pool.html#Tomcat_JDBC_Enhanced_Attributes).
  
    
    