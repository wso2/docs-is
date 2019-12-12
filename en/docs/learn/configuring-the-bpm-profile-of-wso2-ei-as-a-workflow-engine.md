# Configuring the BPM Profile of WSO2 EI as a Workflow Engine

Follow the steps given below to configure the Business Process
Management (BPM) profile of WSO2 EI so that it integrates and runs with
WSO2 Identity Server to define work flows.

!!! tip "Before you begin!"  
    Make sure to download [WSO2 Enterprise Integrator](https://wso2.com/integration) (WSO2 EI) version 6.5.0. The BPM profile is packaged inside WSO2 EI.
    
!!! info 
    The `<EI_HOME>/wso2/business-process` is referred to as `<BPM_HOME>` throughout this document.

1.  Create a separate database to store the user information using the relevant DB schema. For example, you can execute the following DB scripts to create a MYSQL database.  

    ```sql
    <IS_HOME>/dbscripts/mysql.sql
    <IS_HOME>/dbscripts/identity/mysql.sql
    ```
2.  Configure the user management database in both the IS and the BPM server. Add the following configurations with appropriate values in both the servers. Make sure that the URLs mention the name of the database you created in the previous step and the username and password are corresponding to your MySQL instance.     

    1.  In <IS_HOME>/repository/conf/deployment.toml, 

        ```toml
        [database.identity_db]
        type = "mysql"
        url = "jdbc:mysql://localhost:3306/newdb?useSSL=false"
        username = "root"
        password = "Jan@1234"
        driver = "com.mysql.jdbc.Driver"
        validationQuery = "SELECT 1"
        
        [database.shared_db]
        type = "mysql"
        url = "jdbc:mysql://localhost:3306/newdb?useSSL=false"
        username = "root"
        password = "Jan@1234"
        driver = "com.mysql.jdbc.Driver"
        validationQuery = "SELECT 1"
        ```

    
    2.  In <EI_HOME\>/wso2/business-process/conf/datasources/master-datasources.xml,

        ```xml
        <datasource>
        <name>WSO2_CARBON_DB</name>
        <description>The datasource used for registry and user manager</description>
        <jndiConfig>
            <name>jdbc/WSO2CarbonDB</name>
        </jndiConfig>
        <definition type="RDBMS">
            <configuration>
                <url>jdbc:mysql://localhost:3306/newdb</url>
                <username>root</username>
                <password>Jan@1234</password>
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
4.  Download the [MySQL JDBC driver](https://dev.mysql.com/downloads/connector/j/5.1.html) for the version you are using and       copy it to both `<IS_HOME>/repository/components/lib` and `<EI_HOME>/bin` folders.

5.  Change the following configuration in the deployment.toml file in the `<IS_HOME>/repository/conf` directory. 
    
    ```toml
    [user_store]
    type = "database"
    ```

6.  Start WSO2 IS if you have not started it already and the WSO2 EI business-process profile using the following commands. Alternatively for running the products in Windows, execute `wso2server.bat`. 

    ```curl
    cd <IS_HOME>/bin 
    ./wso2server.sh
    ```
    
    ```curl 
    cd <EI_HOME>/bin
    ./business-process.sh
    ```
7.  To test if the BPM profile has been configured in WSO2 Identity Server, create a user in the WSO2 Identity Server Management Console. Now when you navigate to the list of users in Business Process Server Management Console, the user created previously should be present. 
 
### What's Next?

Now you need to create a new work flow definition. For more information, see [Adding a New Workflow Definition](../../learn/adding-a-new-workflow-definition).


