# Configuring the datasources

1. Create the databases. See [Setting up the Physical Database](../../administer/setting-up-the-physical-database) in the WSO2 Administration Guide for db scripts and more information. This tutorial demonstrates deployment with a user management database (`WSO2UMDB`) and an identity database (`IDENTITYDB`). This section demonstrates deployment with a user management database (`WSO2UMDB`) and an identity database (` IDENTITYDB`) .

    !!! tip
        Alternatively, you can create more databases for each type of data to separate the data logically. Note that this will NOT make a difference in performance and is not actually neccessary. 
        However, if you do wish to separate the data logically into separate databases, see the [Setting Up Separate Databases for Clustering](../../setup/setting-up-separate-databases-for-clustering) topic.

2. Configure the datasource for the databases in both nodes of your cluster in the  `master-datasources.xml`   file found in the  `<IS_HOME>/repository/conf/datasources` folder.  The code block below shows a sample configuration of the user mangement database and identity database for a mysql database.  For instructions on how to configure the datasource depending on the type of database you created, see [Changing the Carbon Database](../../administer/../../administer/changing-the-carbon-database).

    ??? example "Click to see the sample configuration of master-datasource.xml"
        ```xml
        <datasources>
            <datasource>
                <name>WSO2_CARBON_DB</name>
                <description>The datasource used for registry and user manager</description>
                <jndiConfig>
                    <name>jdbc/WSO2CarbonDB</name>
                </jndiConfig>
                <definition type="RDBMS">
                    <configuration>
                        <url>jdbc:h2:./repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000</url>
                        <username>wso2carbon</username>
                        <password>wso2carbon</password>
                        <driverClassName>org.h2.Driver</driverClassName>
                        <maxActive>50</maxActive>
                        <maxWait>60000</maxWait>
                        <testOnBorrow>true</testOnBorrow>
                        <validationQuery>SELECT 1</validationQuery>
                        <validationInterval>30000</validationInterval>
                        <defaultAutoCommit>false</defaultAutoCommit>
                    </configuration>
                </definition>
            </datasource>
            <datasource>
                <name>WSO2UserStore</name>
                <description>The User Store</description>
                <jndiConfig>
                    <name>jdbc/WSO2UserStore</name>
                </jndiConfig>
                <definition type="RDBMS">
                    <configuration>
                        <url>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2UMDB?autoReconnect=true&amp;useSSL=false</url>
                        <username>wso2carbon</username>
                        <password>wso2carbon</password>
                        <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                        <maxActive>80</maxActive>
                        <maxWait>60000</maxWait>
                        <minIdle>5</minIdle>
                        <testOnBorrow>true</testOnBorrow>
                        <validationQuery>SELECT 1</validationQuery>
                        <validationInterval>30000</validationInterval>
                        <defaultAutoCommit>false</defaultAutoCommit>
                    </configuration>
                </definition>
            </datasource>
            <datasource>
                <name>WSO2_IDENTITY_DB</name>
                <description>The datasource used for registry, user management and identity</description>
                <jndiConfig>
                    <name>jdbc/WSO2IdentityDS</name>
                </jndiConfig>
                <definition type="RDBMS">
                    <configuration>
                        <url>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2_IDENTITY_DB?autoReconnect=true&amp;useSSL=false</url>
                        <username>wso2carbon</username>
                        <password>wso2carbon</password>
                        <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                        <maxActive>80</maxActive>
                        <maxWait>60000</maxWait>
                        <minIdle>5</minIdle>
                        <testOnBorrow>true</testOnBorrow>
                        <validationQuery>SELECT 1</validationQuery>
                        <validationInterval>30000</validationInterval>
                        <defaultAutoCommit>false</defaultAutoCommit>
                    </configuration>
                </definition>
            </datasource>
        </datasources>
        ```

    ??? example "Click to see the sample configuration of bps-datasource.xml"
        ```xml
        <datasource>
            <name>BPS_DS</name>
            <description></description>
            <jndiConfig>
                <name>bpsds</name>
            </jndiConfig>
            <definition type="RDBMS">
                <configuration>
                    <url>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2_IDENTITY_DB autoReconnect=true&amp;verifyServerCertificate=false&amp;useSSL=true</url>
                    <username>wso2carbon</username>
                    <password>wso2carbon</password>
                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                    <maxActive>100</maxActive>
                    <maxWait>10000</maxWait>
                    <maxIdle>20</maxIdle>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                    <useDataSourceFactory>false</useDataSourceFactory>
                    <defaultAutoCommit>false</defaultAutoCommit>
                </configuration>
            </definition>
        </datasource>
        ```

