# Changing to MySQL

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use MySQL for this purpose. 

## Setting up datasource configurations

A datasource is used to establish the connection to a database. By
default, `WSO2_IDENTITY_DB` and `WSO2_SHARED_DB` datasources are used to connect
to the default  H2 database. 

- `WSO2_SHARED_DB` - The database which stores registry and user management
                     data.
- `WSO2_IDENTITY_DB` - The database specific for the identity server which stores
                       identity related data
                       
After setting up the MySQL database. You can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that MySQL database by following below instructions.

### Changing the default datasource

1.  **Minimum Configurations for changing default datasource to MySQL.**
 
 Configurations can be done by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 
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
      <td><strong>type</strong></td>
      <td>The type of the database.</td>
      </tr>
      <tr class="even">
      <td><strong>hostname</strong></td>
      <td>The hostname of the host where database is hosted.</td>
      </tr>
      <tr class="even">
      <td><strong>port</strong></td>
      <td>The port of the database.</td>
      </tr>
      <tr class="even">
      <td><strong>name</strong></td>
      <td>The name of the database.</td>
      </tr>
      </table>   
 
 A Sample configuration is given below.

   1. `WSO2_IDENTITY_DB` 
    
       1. `deployment.toml` Configurations

           ``` toml
           [database.identity_db]
           type = "mysql"
           hostname = "localhost"
           name = "regdb"
           username = "regadmin"
           password = "regadmin"
           port = "3306"
           ```
       
       1. Executing database scripts.
        
          Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files, against the database created.
           
           - `<IS-HOME>/dbscripts/identity/mysql.sql`
           - `<IS-HOME>/dbscripts/identity/uma/mysql.sql`
           - `<IS-HOME>/dbscripts/consent/mysql.sql`
         
   2. `WSO2_SHARED_DB`
        
       1. `deployment.toml` Configurations

           ``` toml
           [database.shared_db]
           type = "mysql"
           hostname = "localhost"
           name = "regdb"
           username = "regadmin"
           password = "regadmin"
           port = "3306"
           ```
           
       1. Executing database scripts.
        
          Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against the database created.
                      
           - `<IS-HOME>/dbscripts/mysql.sql`
           
   3. If you have a requirement in using workflow feature follow, 
       [Changing the default database of BPS database](../../setup/changing-datasource-bpsds)
       
   4.  Download the MySQL JDBC driver for the version you are using and
            copy it to the `<IS_HOME>/repository/components/lib` folder  
    
    !!! note     
        In earlier versions, WSO2 Identity Server had the option to create databases automatically using the 
        `-DSetup` option.  **From [January 2018 onwards](https://wso2.com/products/carbon/release-matrix/) 
        WSO2 Identity Server has deprecated the** **`              -DSetup             `** **option**.

        Note that the proper practice is for the Database Administrator(DBA) to run the DDL statements manually; so that the DBA
        can examine and optimize any DDL statement (if necessary) based on the DBA best practices that are in
        place within the organization.  
           
            

   2.**Advanced Database Configurations.**

Apart from above basic configurations WSO2 Identity Server supports advanced database configurations.

- `WSO2_IDENTITY_DB` `deployment.toml` Configurations.
    
   ``` toml
   [database.identity_db.pool_options]
    maxActive = "80"
    maxWait = "60000"
    minIdle = "5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
   ```
   
- `WSO2_SHARED_DB` `deployment.toml` Configurations.
        
   ``` toml
   [database.shared_db.pool_options]
    maxActive = "80"
    maxWait = "60000"
    minIdle = "5"
    testOnBorrow = true
    validationQuery="SELECT 1"
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
    <td>Whether objects will be validated before being borrowed from the pool. If the object fails to validate, it will be dropped from the pool, and another attempt will be made to borrow another.</td>
    </tr>
    <tr class="even">
    <td><p><strong>defaultAutoCommit</strong></p></td>
    <td>Whether to commit database changes automatically or not.</td>
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
  
!!! info "Configuring the connection pool behavior on return" 
    When a
    database connection is returned to the pool, by default the product
    rolls back the pending transactions if `defaultAutoCommit =true`.
    However, if required you can disable the latter mentioned default
    behavior by disabling the ` ConnectionRollbackOnReturnInterceptor `,
    which is a JDBC-Pool JDBC interceptor, and setting the connection pool
    behavior on return via the datasource configurations by using the
    following options.
    
    

### Configure the connection pool to commit pending transactions on connection return  
        
  1.  Navigate to either one of the following locations based on your OS.
        -   On Linux/Mac OS:
            `                 <IS_HOME>/bin/wso2server.sh/                `
        -   On Windows:
            `                 <IS_HOME>\bin\wso2server.bat                `
  2.  Add the following JVM option:

       ``` java
       -Dndatasource.disable.rollbackOnReturn=true \
       ```

  3.  Navigate to the
        `               <IS_HOME>/repository/conf/deployment.toml              `
        file.
  4.  Disable the `               defaultAutoCommit              `
        by defining it as `false`.
  5.  Add the `                commitOnReturn               `
        property and set it to true.
                         
    - `WSO2_IDENTITY_DB` `deployment.toml` Configurations.
        
       ``` toml
       [database.identity_db.pool_options]
        defaultAutoCommit="false"
        commitOnReturn="true"
       ```
       
    - `WSO2_SHARED_DB` `deployment.toml` Configurations.
            
       ``` toml
       [database.shared_db.pool_options]
        defaultAutoCommit="false"
        commitOnReturn="true"
       ```    
            
### Configure the connection pool to rollback pending transactions on connection return

  1.  Navigate to the
        `<IS_HOME>/repository/conf/deployment.toml`            `
        file.
  2.  Disable the
        `                defaultAutoCommit               ` by
        defining it as `false`.

  3.  Set the `                rollbackOnReturn               `
        property to the datasources as true.


    - `WSO2_IDENTITY_DB` `deployment.toml` Configurations.
        
       ``` toml
       [database.identity_db.pool_options]
        defaultAutoCommit="false"
        rollbackOnReturn="true"
       ```
       
    - `WSO2_SHARED_DB` `deployment.toml` Configurations.
            
       ``` toml
       [database.shared_db.pool_options]
        defaultAutoCommit="false"
        rollbackOnReturn="true"
       ```

The elements in the above configuration are described below:

 | **Element**          | **Description**                                                                                                                                                                                                                                                                                                                                                                            |
 |----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | **commitOnReturn**   | If `                defaultAutoCommit               ` =false, then you can set `                commitOnReturn               ` =true, so that the pool can complete the transaction by calling the commit on the connection as it is returned to the pool. However, If `                rollbackOnReturn               ` =true then this attribute is ignored. The default value is false. |
 | **rollbackOnReturn** | If `                defaultAutoCommit               ` =false, then you can set `                rollbackOnReturn               ` =true so that the pool can terminate the transaction by calling rollback on the connection as it is returned to the pool. The default value is false.                                                                                                     |


    
