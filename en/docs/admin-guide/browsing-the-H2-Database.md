# Browsing the H2 Database

All WSO2 products are shipped with a default H2 database. In some
product scenarios, you may need to access a database table to see how it
works, to troubleshoot, or to try out the scenario.

Follow the instructions given below to connect to the H2 database and
browse through it.

!!! warning
    
    H2 is not recommended in production
    
    The embedded H2 database is NOT recommended in enterprise testing and
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Please use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    You can use the embedded H2 database in development environments and as
    the local registry in a registry mount.
    

1.  Open the
    `           <PRODUCT_HOME>/repository/conf/carbon.xml          `
    file and paste the following configuration.

    !!! tip
    
        Do not uncomment the existing
        `           <H2DatabaseConfiguration>          ` element. Just paste
        the following configuration below it.
    

    ``` java
    <H2DatabaseConfiguration>
            <property name="web"/>
            <property name="webPort">8082</property>
            <property name="webAllowOthers"/>        
    </H2DatabaseConfiguration>
    ```

2.  Restart the WSO2 product and access the following URL via your
    browser: [http://localhost:8082](http://localhost:8082/)

    !!! tip
    
        Tip: If you are logged in to the management console, logout before
        connecting to the database.
    

3.  Enter the following details and click **Connect** .
    1.  JDBC URL : jdbc:h2:\[file path to
        \<PRODUCT\_HOME\>/repository/database/WSO2CARBON\_DB\]
    2.  username : wso2carbon
    3.  password  : wso2carbon

The database tables are listed on the left. You can now browse through
them as required.
