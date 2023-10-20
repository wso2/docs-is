# Changing to Remote H2

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data.
The following sections describe how to replace the default H2 databases
with Remote H2:

!!! warning "H2 is not recommended in production"
    The embedded H2 database is NOT recommended in enterprise testing and
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Please use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    You can use the embedded H2 database in development environments and as
    the local registry in a registry mount.
    

## Datasource configurations

A datasource is used to establish the connection to a database. By
default, `WSO2_IDENTITY_DB` and `WSO2_SHARED_DB` datasources are used to connect
to the default  H2 database. 

- `WSO2_SHARED_DB` - The database which stores registry and user management
                     data.
- `WSO2_IDENTITY_DB` - The database specific for the identity server which stores
                       identity related data
                       
After setting up the H2 database, You can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB`, or both to that H2 database by following the instructions given below.

## Changing the default datasource

**Minimum Configurations for changing default datasource to H2**
 
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
            url = "jdbc:h2:tcp://localhost/~/registryDB;create=true"
            username = "regadmin"
            password = "regadmin"
            driver = "org.h2.Driver"
            [database.identity_db.pool_options]
            maxActive = "80"
            maxWait = "60000"
            minIdle = "5"
            testOnBorrow = true
            validationQuery="SELECT 1"
            validationInterval="30000"
            defaultAutoCommit=false
           ```
       
       1. Execute database scripts.
        
          Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files, against the database created.
           
           - `<IS-HOME>/dbscripts/identity/h2.sql`
           - `<IS-HOME>/dbscripts/identity/uma/h2.sql`
           - `<IS-HOME>/dbscripts/consent/h2.sql`
         
   2. `WSO2_SHARED_DB`
        
       1. Configure the `deployment.toml` file.

           ``` toml
            [database.shared_db]
            url = "jdbc:h2:tcp://localhost/~/registryDB;create=true"
            username = "regadmin"
            password = "regadmin"
            driver = "org.h2.Driver"
            [database.identity_db.pool_options]
            maxActive = "80"
            maxWait = "60000"
            minIdle = "5"
            testOnBorrow = true
            validationQuery="SELECT 1"
            validationInterval="30000"
            defaultAutoCommit=false
           ```
           
       1. Executing database scripts.
        
          Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against the database created.
                      
           - `<IS-HOME>/dbscripts/h2.sql`
       
   3.  Download the H2 JDBC driver for the version, you are using and
            copy it to the `<IS_HOME>/repository/components/lib` folder  
    
    !!! note     
        In earlier versions WSO2 Identity Server had the option to create databases automatically using the 
        -DSetup option  **from [January 2018 onwards](https://wso2.com/products/carbon/release-matrix/) 
        WSO2 Identity Server has deprecated the** **`              -DSetup             `** **option**
        Note that the proper practice is for the DBA to run the DDL statements manually so that the DBA
        can examine and optimize any DDL statement (if necessary) based on the DBA best practices that are in
        place within the organization.  
           
            

**Advanced Database Configurations.**

Apart from the basic configurations specified above, WSO2 Identity Server supports some advanced database configurations as well.

- `WSO2_IDENTITY_DB` `deployment.toml` configurations:
    
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
   
- `WSO2_SHARED_DB` `deployment.toml` configurations:
        
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
    <td>Indicates whether objects will be validated before being borrowed from the pool. If the object fails to 
    validate, it will be dropped from the pool, and another attempt will be made to borrow another.</td>
    </tr>
    <tr class="even">
    <td><p><strong>defaultAutoCommit</strong></p></td>
    <td>Indicates whether to commit database changes automatically or not.</td>
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
    

## Configuring the connection pool behavior on return 

By default, when a database connection is returned to the pool, the product rolls back the pending transactions if `defaultAutoCommit=true`. 

However, if required, you can disable the latter mentioned default behavior by disabling the JDBC-Pool JDBC interceptor, `ConnectionRollbackOnReturnInterceptor`, and setting the connection pool behavior on return via the datasource configurations using one of the following options.

**Configure the connection pool to commit pending transactions on connection return**  
        
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
  4.  Disable the `               defaultAutoCommit              ` property
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
            
**Configure the connection pool to rollback pending transactions on connection return**

  1.  Navigate to the
        `<IS_HOME>/repository/conf/deployment.toml`            `
        file.
  2.  Disable the
        `                defaultAutoCommit               ` property by
        defining it as `false`.

  3.  Set the `                rollbackOnReturn               `
        property to the datasources as true.


    - `WSO2_IDENTITY_DB` `deployment.toml` configurations:
        
       ``` toml
       [database.identity_db.pool_options]
        defaultAutoCommit="false"
        rollbackOnReturn="true"
       ```
       
    - `WSO2_SHARED_DB` `deployment.toml` configurations:
            
       ``` toml
       [database.shared_db.pool_options]
        defaultAutoCommit="false"
        rollbackOnReturn="true"
       ```

The elements in the above configuration are described below:

 | **Element**          | **Description**                                                                                                                                                                                                                                                                                                                                                                            |
 |----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | **commitOnReturn**   | If `defaultAutoCommit` =false, then you can set `commitOnReturn ` =true, so that the pool 
 |                      | can complete the transaction by calling the commit on the connection as it is returned to the pool. However,If the  
 |                      | `  rollbackOnReturn` =true then this attribute is ignored. The default value is false. |
 |                      |
 | **rollbackOnReturn** | If `                defaultAutoCommit               ` =false, then you can set `                rollbackOnReturn               ` =true so that the pool can terminate the transaction by calling rollback on the connection as it is returned to the pool. The default value is false.                                                                                                     |


    
