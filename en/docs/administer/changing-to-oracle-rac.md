# Changing to Oracle RAC

By default, WSO2 products use the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use an Oracle RAC database for this
purpose.

!!! tip "Before you begin"
    You need to set up Oracle RAC before following the steps to configure
    your product with Oracle RAC. For more information, see [Setting up
    Oracle RAC](../../administer/setting-up-oracle-rac).
    

### Setting up datasource configurations

A datasource is used to establish the connection to a database. By
default, `         WSO2_CARBON_DB        ` datasource is used to connect
to the default  H2 database, which stores registry and user management
data. After setting up the Oracle RAC database to replace the default H2
database, either change the default configurations of the
`          WSO2_CARBON_DB         ` datasource, or configure a new datasource to point it to the new database as explained below.

#### Changing the default datasource

Follow the steps below to change the type of the default datasource.
1.  Edit the default datasource configuration in the
    `           <IS_HOME>/repository/conf/deployment.toml          ` file as shown below.

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

    The elements in the above configuration are described below:

    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
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
    <td>The maximum number of active connections that can be allocated  at the same time from this pool. Enter any negative value to denote an unlimited number of active connections.</td>
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
    <td>The indication to avoid excess validation, and only run validation at the most, at this frequency (time in milliseconds). If a connection is due forvalidation,but has been validated previously within this interval, it will not be validated again.</td>
    </tr>
    <tr class="even">
    <td><strong>defaultAutoCommit</strong></td>
    <td><p>This property is <strong>not</strong> applicable to the Carbon database in WSO2 products because auto committing is usually handled at the code level, i.e., the default auto commit configuration specified for the RDBMS driver will be effective instead of this property element. Typically, auto committing is enabled for RDBMS drivers by default.</p>
    <p>When auto committing is enabled, each SQL statement will be committed to the database as an individual transaction, as opposed to committing multiple statements as a single transaction.</p></td>
    </tr>
    </tbody>
    </table>

    !!! info 
        For more information on other parameters that can be defined in
        the \<
        `            IS_HOME>/repository/conf/datasources/           `
        `            master-datasources.xml           ` file, see [Tomcat JDBC Connection Pool](http://tomcat.apache.org/tomcat-7.0-doc/jdbc-pool.html#Tomcat_JDBC_Enhanced_Attributes).

#### Configuring new datasources to manage registry or user management data

Follow the steps below to configure new datasources to point to the new
databases you create to manage registry and/or user management data
separately.

1.  Add a new datasource with similar configurations as the
    [`           WSO2_CARBON_DB          `
    datasource](#changing-the-default-wso2-carbon-db-datasource) above
    to the 
    `          <IS_HOME>/repository/conf/datasources/master-datasources.xml         ` file. Change its
    elements with your custom values. For instructions, see [Setting up datasource configurations.](#setting-up-datasource-configurations)
2.  If you are setting up a separate database to store registry-related
    data, update the following configurations in the \<
    `           IS_HOME>/repository/conf/          `
    `           registry.xml          ` file.

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

### Creating the database tables

To create the database tables, connect to the database that you created
earlier and run the following scripts in SQL\*Plus:

1.  To create tables in the registry and user manager database (
    `           WSO2CARBON_DB          ` ), use the below script:

    ``` powershell
        SQL> @$<IS_HOME>/dbscripts/oracle.sql
    ```

2.  Restart the server.

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
            deprecated the** **`              -DSetup             `** **option**
           . Note that the proper practice is for the DBA to run the DDL
            statements manually so that the DBA can examine and optimize any DDL
            statement (if necessary) based on the DBA best practices that are in
            place within the organization.
    
