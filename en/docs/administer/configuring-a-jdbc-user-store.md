# Configuring a JDBC User Store

User management functionality is provided by default in all WSO2
Carbon-based products and is configured in the
`         deployment.toml       ` file found in the
`         <IS_HOME>/repository/conf/        ` directory. This
documentation explains the process of setting up a primary user store
for your system.

!!! info "The default User Store"
    The primary user store that is configured by default in WSO2 Identity Server
    is an LDAP user store, This database is used by the Authorization Manager (for user authentication
    information) as well as the User Store Manager (for defining users and
    roles).

We can specify the type of user store that we are using in the `         deployment.toml       ` file. 
If we specified it as a JDBC user store by default,  For detailed guide on configuring 
RDBMS database as a datasource see  [Working With Databases](../../administer/working-with-databases).

### Step 1: Changing the default User store.

To configure a JDBC user store as the primary user store, you need to 
change the `         [user_store]        ` section in the
`         <IS_HOME>/repository/conf/deployment.toml        ` file.

1. Replace the default `user_store` configuration as follows.

    ``` toml
    [user_store]
    type = "database"
    ```
   By default it will use the  `database.shared_db` 
   configurations in the `         deployment.toml       `  file. As the datasource configuration.
   
   If you have a requirement of changing the `database.shared_db` configuration see 
   [Working With Databases](../../administer/working-with-databases).
   
   `database.shared_db` is used to store the both registry and user management related data. If you 
   are having a requirement of using a datasource specified for the user management please follow . Otherwise you do 
   step 2.
    
2. Specify the datasource that you want to use.
    
    1. Create a database on a [any supported RDBMS database](../../administer/working-with-databases). 
    2. Following are the example configuration for each database type.
        
??? example "PostgreSQL"
    
    1. deployment.toml Configurations.
        ```
        [database.user]
        url = "jdbc:postgresql://localhost:5432/gregdb"
        username = "regadmin"
        password = "regadmin"
        driver = "org.postgresql.Driver"
        
        [realm_manager]
        data_source = "WSO2USER_DB"
        ```
        
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the database created.    
            
          - `<IS-HOME>/dbscripts/postgresql.sql`
          
    3. Download the PostgreSQL JDBC driver for the version you are using and
                   copy it to the `<IS_HOME>/repository/components/lib` folder 

??? example "MySQL"

    1. deployment.toml Configurations.
        ```
        [database.user]
        url = "jdbc:mysql://localhost:3306/IAMtest?useSSL=false"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        
        [realm_manager]
        data_source = "WSO2USER_DB"
        ```
    
    2. Executing database scripts. 

        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the database created.    
            
          - `<IS-HOME>/dbscripts/mysql.sql`

    3. Download the MySQL JDBC driver for the version you are using and
                   copy it to the `<IS_HOME>/repository/components/lib` folder          

??? example "DB2"

    1. deployment.toml Configurations.
        ```
        [database.user]
        url = "jdbc:db2://192.168.108.31:50000/test"
        username = "db2inst1"
        password = "db2inst1"
        driver = "com.ibm.db2.jcc.DB2Driver"
        
        [realm_manager]
        data_source = "WSO2USER_DB"
        ```    
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the database created.    
            
          - `<IS-HOME>/dbscripts/db2.sql`
   
    3. Download the DB2 JDBC driver for the version you are using and
                   copy it to the `<IS_HOME>/repository/components/lib` folder 

??? example "MSSQL"

    1. deployment.toml Configurations.
        ```
        [database.user]
        url = "jdbc:sqlserver://localhost:1433;databaseName=test;SendStringParametersAsUnicode=false"
        username = "sa"
        password = "pass#word2"
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        
        [realm_manager]
        data_source = "WSO2USER_DB"
        ```
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the database created.      
            
          - `<IS-HOME>/dbscripts/mssql.sql`
          
    3. Download the MSSQL JDBC driver for the version you are using and
                   copy it to the `<IS_HOME>/repository/components/lib` folder  
    

??? example "Oracle"

    1. deployment.toml Configurations.
        ```
        [database.user]
        url = "jdbc:oracle:thin:@localhost:1521/ORCLPDB"
        username = "IS590Test"
        password = "ora12c"
        driver = "oracle.jdbc.OracleDriver"
        
        [realm_manager]
        data_source = "WSO2USER_DB"
        ```
    2. Executing database scripts. 
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against 
        the database created.    
            
          - `<IS-HOME>/dbscripts/oracle.sql`
          
    3. Download the OracleJ DBC driver for the version you are using and
                   copy it to the `<IS_HOME>/repository/components/lib` folder  
        
!!! tip 
    `USER MANAGER TABLES` scripts starts with a `UM` example: `UM_TENANT` 
        
4.  For advanced user store functions there are user store properties
    that are configurable for each user store type. For more information these properties, see
    [Properties of Primary User Stores](../../administer/working-with-properties-of-user-stores).


    The sample for the external JDBC user store consists of properties
    pertaining to various SQL statements. This is because the schema may
    be different for an external user store, and these adjustments need
    to be made in order to streamline the configurations with WSO2
    products.

3.  Add the `           PasswordHashMethod          ` property to the
    `           UserStoreManager          ` configuration by adding configuration
    to `deployment.toml`, For example:

    ``` toml
    [user_store.properties]
    "PasswordHashMethod" = "SHA"
    ```

    The `           PasswordHashMethod          ` property specifies how
    the password should be stored. It usually has the following values:

    -   `            SHA           ` - Uses SHA digest method.
    -   `            MD5           ` - Uses MD 5 digest method.
    -   `            PLAIN_TEXT           ` - Plain text passwords.

    In addition, it also supports all digest methods in
    <http://docs.oracle.com/javase/6/docs/api/java/security/MessageDigest.html>
    .

4.  If you are setting up an external JDBC user store, you need to set
    the following property to 'true' to be able to create roles in the
    primary user store.

    ``` toml
    [user_store.properties]
    "WriteGroups" = false
    ```

### Step 2: Updating the system administrator

The **admin** user is the super tenant that will be able to manage all
other users, roles and permissions in the system by using the management
console of the product. Therefore, the user that should have admin
permissions is required to be stored in the user store when you start
the system for the first time. If the JDBC user store is read-only, then
we need to always use a user ID that is already in the user store as the
super tenant. Otherwise, if the JDBC user store can be written to, you
have the option of creating a new admin user in the user store when you
start the system for the first time. For information on configuring the
system administrator user, see [Configuring the System
Administrator](../../learn/configuring-the-system-administrator).

These two alternative configurations can be done as explained below.

-   If the user store is read-only, find a valid user that already
    resides in the RDBMS. For example, say a valid username is AdminSOA.
    Update the `           [super_admin]         ` section of your
    configuration as shown below. You do not have to update the password
    element as it is already set in the user store.

    ``` xml
    [super_admin]
    username = "AdminSOA"
    password = "admin"
    create_super_admin = false
    ```

-   If the user store can be written to, you can add the super tenant
    user to the user store. Therefore, `           <AddAdmin>          `
    should be set to `           true          ` as shown below.

    ``` xml
    [super_admin]
    username = "admin"
    password = "admin"
    create_super_admin = true
    ```

In the `deployment.toml`, set the value of the
`         MultiTenantRealmConfigBuilder        ` property to
`         org.wso2.carbon.user.core.config.multitenancy.SimpleRealmConfigBuilder        `, For example:

   ``` toml
   [user_store.properties]
   "MultiTenantRealmConfigBuilder" = "org.wso2.carbon.user.core.config.multitenancy.SimpleRealmConfigBuilder"
   ```
