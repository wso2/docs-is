# Configuring the BPM Profile of WSO2 EI as a Workflow Engine

Follow the steps given below to configure the Business Process
Management (BPM) profile of WSO2 EI so that it integrates and runs with
WSO2 Identity Server to define work flows.

!!! tip "Before you begin!"  
    Make sure to download [WSO2 Enterprise Integrator](https://wso2.com/integration) (WSO2 EI). The BPM profile is
    packaged inside WSO2 EI.
    
!!! info 
    The `<EI_HOME>/wso2/business-process` is referred to as `<BPM_HOME>` throughout this document.

1.  Create a separate database to store the user information using the relevant DB schema. For example, you can use the following DB schema to create a MYSQL database. 

    ```sql
    <IS_HOME>/dbscripts/mysql5.7.sql
    <IS_HOME>/dbscripts/identity/mysql-5.7.sql
    ```
2.  Configure the user management database in both the IS and the BPM server. Add the following configuration with appropriate values in both servers.

    1.  <IS_HOME>/repository/conf/deployment.toml 

        ```toml
        [database.shared_db]
        type = "shared_db"
        url = "jdbc:mysql://localhost:3306/WSO2SHARED_DB"
        username = "root"
        password = "root"
        driver = "com.mysql.jdbc.Driver"
        validationQuery = "SELECT 1"

    
    2.  <EI_HOME>/wso2/business-process/conf/datasources/master-datasources.xml

        ```xml
        <datasource>
        <name>WSO2_UM_DB</name>
        <description>The datasource used for registry and user manager</description>
        <jndiConfig>
            <name>jdbc/WSO2UM_DB</name>
        </jndiConfig>
        <definition type="RDBMS">
            <configuration>
                <url>jdbc:mysql://localhost:3306/wso2umdb</url>
                <username>root</username>
                <password>root</password>
                <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                <maxActive>80</maxActive>
                <maxWait>60000</maxWait>
                <minIdle>5</minIdle>
                <testOnBorrow>true</testOnBorrow>
                <validationQuery>SELECT 1</validationQuery>
                <validationInterval>30000</validationInterval>
            </configuration>
        </definition>
        </datasource>   
        ```

3.  Change the configuration in the user-mgt.xml file in the BPM server.

    Update the data source name property with the same JNDI name which you have used in the master-datasources.xml file.

    For example, 

    ```sql 
    <Property name="dataSource">jdbc/WSO2UM_DB</Property>
    ```
    Comment out the LDAP user store configuration and uncomment the JDBC user store configuration. 

    ```xml
    <!--UserStoreManager class="org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager">
   ....
    </UserStoreManager-->
    
    <UserStoreManager class="org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager">
    ....
    </UserStoreManager>
    ```

4.  Start WSO2 IS if you have not started it already and start the WSO2 EI business-process profile.

    ```curl 
    cd <EI_HOME>/bin
    ./business-process.sh
    ```

### What's Next?

Now you need to create a new work flow definition. For more information,
see [Adding a New Workflow
Definition](../../learn/adding-a-new-workflow-definition).


