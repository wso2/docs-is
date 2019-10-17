# Changing to Embedded H2

The following sections describe how to replace the default H2 database
with Embedded H2:

!!! warning "H2 is not recommended in production"
    The embedded H2 database is NOT recommended in enterprise testing and
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Please use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    You can use the embedded H2 database in development environments and as
    the local registry in a registry mount.
    
    
!!! tip "Before you begin"
    You need to set up Embedded H2 before following the steps to configure
    your product with it. For more information, see [Setting up Embedded
    H2](../../administer/setting-up-embedded-h2).
    

### Setting up datasource configurations

A datasource is used to establish the connection to a database. By
default, `         WSO2_CARBON_DB        ` datasource is used to connect
to the default  H2 database, which stores registry and user management
data. After setting up the Embedded H2 database to replace the default
H2 database, either [change the default configurations of the
datasource](#changing-the-default-datasource), or
[configure a new datasource](#configuring-new-datasources-to-manage-registry-or-user-management-data)
to point it to the new database as explained below.

#### Changing the default datasource

Follow the steps below to change the type of the default datasource.

Edit the default datasource configuration in the \<
`         IS_HOME>/repository/conf/deployment.toml file as shown below.

``` toml
[database.identity_db]
url = "jdbc:h2:repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000"
username = "wso2carbon"
password = "wso2carbon"
driver = "org.h2.Driver"
[database.identity_db.pool_options]
maxActive = "50"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
validationInterval="30000"
defaultAutoCommit=false

[database.shared_db]
url = "jdbc:h2:repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000"
username = "wso2carbon"
password = "wso2carbon"
driver = "org.h2.Driver"
[database.shared_db.pool_options]
maxActive = "50"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
validationInterval="30000"
defaultAutoCommit=false
```

The elements in the above configuration are described below:

<table>
<thead>
<tr class="header">
<th>Element</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>url</strong></td>
<td>The URL of the database. The default port for a DB2 instance is 50000.</td>
</tr>
<tr class="even">
<td><strong>username</strong> and <strong>password</strong></td>
<td>The name and password of the database user</td>
</tr>
<tr class="odd">
<td><strong>driverClassName</strong></td>
<td>The class name of the database driver</td>
</tr>
<tr class="even">
<td><strong>maxActive</strong></td>
<td>The maximum number of active connections that can beallocated  atthe same time from this pool. Enter any negative value to denote an unlimited number of active connections.</td>
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
<td>The indication of whether objects will be validated before being borrowed from the pool. If the object fails to validate, it will be dropped from the pool, and another attempt will be made to borrow another.</td>
</tr>
<tr class="even">
<td><strong>validationQuery</strong></td>
<td>The SQL query that will be used to validate connections from this pool before returning them to the caller.</td>
</tr>
<tr class="odd">
<td><strong>validationInterval</strong></td>
<td>The indication to avoid excess validation, and only run validation at the most, at this frequency (time in milliseconds). If a connection is due for validation but has been validated previously within this interval, it will not be validated again.</td>
</tr>
<tr class="even">
<td><strong>defaultAutoCommit</strong></td>
<td><p>This property is <strong>not</strong> applicable to the Carbon database in WSO2 products because auto committing is usually handled at the code level, i.e., the default auto commit configuration specified for the RDBMS driver will be effective instead of this property element. Typically, auto committing is enabled for RDBMS drivers by default.</p>
<p>When auto committing is enabled, each SQL statement will be committed to the database as an individual transaction, as opposed to committing multiple statements as a single transaction.</p></td>
</tr>
</tbody>
</table>

For more information on other parameters that can be defined in the \<
`          IS_HOME>/repository/conf/datasources/         `
`          master-datasources.xml         ` file, see [Tomcat JDBC Connection Pool](http://tomcat.apache.org/tomcat-7.0-doc/jdbc-pool.html#Tomcat_JDBC_Enhanced_Attributes)
.

    

| **Element**          | **Description**                                                                                                                                                                                                                                                                                                                                                                |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **commitOnReturn**   | If `              defaultAutoCommit             ` =false, then you can set `              commitOnReturn             ` =true, so that the pool can complete the transaction by calling the commit on the connection as it is returned to the pool. However, If `              rollbackOnReturn             ` =true then this attribute is ignored. The default value is false. |
| **rollbackOnReturn** | If `              defaultAutoCommit             ` =false, then you can set `              rollbackOnReturn             ` =true so that the pool can terminate the transaction by calling rollback on the connection as it is returned to the pool. The default value is false.                                                                                                 |

**Configuring the connection pool behavior on return** When a database connection is returned to the pool, by default  the
product rolls back the pending transactions if defaultAutoCommit =true.
However, if required you can disable the latter mentioned default
behavior by disabling the
`          ConnectionRollbackOnReturnInterceptor         `, which is a
JDBC-Pool JDBC interceptor, and setting the connection pool behavior on
return via the datasource configurations by using the following options.


-   **Configure the connection pool to commit pending transactions on connection return**  
    1.  Navigate to either one of the following locations based on your
        OS.
        -   On Linux/Mac OS:
            `               <IS_HOME>/bin/wso2server.sh/              `
        -   On Windows:
            `               <IS_HOME>\bin\wso2server.bat              `
    2.  Add the following JVM option:

        ``` java
        -Dndatasource.disable.rollbackOnReturn=true \
        ```

    3.  Navigate to the
        `             <IS_HOME>/repository/conf/datasources/master-datasources.xml            `
        file.
    4.  Disable the `             defaultAutoCommit            ` by
        defining it as false.
    5.  Add the `              commitOnReturn             ` property and
        set it to true for all the datasources, including the custom
        datasources.

        ``` html/xml
        <datasource>
            ...
                <definition type="RDBMS">
                    <configuration>
                        ...
                        <defaultAutoCommit>false</defaultAutoCommit>
                        <commitOnReturn>true</commitOnReturn>    
                        ...
                    </configuration>
                </definition>
        </datasource>
        ```

-   **Configure the connection pool to rollback pending transactions on connection return**

    1.  Navigate to the
        `             <IS_HOME>/repository/conf/datasources/master-datasources.xml            `
        file.
    2.  Disable the `              defaultAutoCommit             ` by
        defining it as false.

    3.  Add the `              rollbackOnReturn             ` property
        to the datasources.

        ``` html/xml
        <datasource>
            ...
                <definition type="RDBMS">
                    <configuration>
                        ...
                        <defaultAutoCommit>false</defaultAutoCommit> 
                        <rollbackOnReturn>true</rollbackOnReturn>
                        ...
                    </configuration>
                </definition>
        </datasource>
        ```

#### Configuring new datasources to manage registry or user management data

Follow the steps below to configure new datasources to point to
the new database(s) you create to manage registry and/or user management
data separately.

1.  Add a new datasource with similar configurations as the
    [`           WSO2_CARBON_DB          `
    datasource](#changing-the-default-datasource) above
    to the \<
    `          IS_HOME>/repository/conf/datasources/         `
    `          master-datasources.xml         ` file. Change its
    elements with your custom values. For instructions, see [Setting
    up datasource configurations.](#setting-up-datasource-configurations)

2.  If you are setting up a separate database to store registry-related
    data, update the following configurations in the \<
    `           IS_HOME>/repository/conf/          `
    `           registry.xml          ` `          ` file.

    ``` xml
    <dbConfig name="wso2registry">
        <dataSource>jdbc/MY_DATASOURCE_NAME</dataSource>
    </dbConfig>
    ```

3.  If you are setting up a separate database to store user management
    data, update the following configurations in the \<
    `           IS_HOME>/repository/conf/          `
    `           user-mgt.xml          ` file.

    ``` xml
    <Configuration>
        <Property name="dataSource">jdbc/MY_DATASOURCE_NAME</Property>
    </Configuration>
    ```

### Creating database tables

To create the database tables, connect to the database that you created
earlier and run the following scripts in the H2 shell or web console:

-   To create tables in the registry and user manager database (
    `           WSO2CARBON_DB          ` ), use the below script:

    ``` java
    <IS_HOME>/dbscripts/h2.sql
    ```

Follow the steps below to run the script in Web console:

1.  Run the `         ./h2.sh         ` command to start the Web
    console.
2.  Copy the script text from the SQL file.
3.  Paste it into the console.
4.  Click **Run**.
5.  Restart the server.

    !!! info 
        You can create database tables automatically **when starting the
        product for the first time** by using the
        `            -Dsetup           ` parameter as follows:

        -   For Windows:
            `              <IS_HOME>/bin/wso2server.bat -Dsetup             `

        -   For Linux:
            `              <IS_HOME>/bin/wso2server.sh -Dsetup             `

        !!! warning "Deprecation of -DSetup"
            When proper Database Administrative (DBA) practices are followed,
            the systems (except analytics products) are not granted DDL (Data
            Definition) rights on the schema. Therefore, maintaining the
            `             -DSetup            ` option is redundant and typically
            unusable. **As a result, from [January 2018 onwards](https://wso2.com/products/carbon/release-matrix/) WSO2 has
            deprecated the `              -DSetup             ` option**. Note that the proper practice is for the DBA to run the DDL
            statements manually so that the DBA can examine and optimize any DDL
            statement (if necessary) based on the DBA best practices that are in
            place within the organization.
    
