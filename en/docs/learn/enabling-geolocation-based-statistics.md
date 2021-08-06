# Enabling Geolocation Based Statistics

Follow the steps below to configure WSO2 IS Analytics Server to display
the regions of the users authenticated though WSO2 Identity Server.

1.  Create a Geo Location dataset by following the guide given [here](../../learn/creating-geo-location-data-set/).
    .
2.  Create the database by executing one of the scripts in the
    `           Geolocation Data/dbscripts          ` directory. In this
    example, `           mysql.sql          ` is executed.

    1.  Sign in to the mysql client by executing the command.

        ``` mysql
        mysql -u <MYSQL_USERNAME> -p
        ```

        Provide the mysql password when
        prompted.

    2.  Create the database by executing the following command.

        ``` mysql
        CREATE DATABASE GEO_LOCATION_DATA;
        USE GEO_LOCATION_DATA;
        ```

    3.  Run the
        `             Geolocation Data/dbscripts/mysql.sql            `
        script.

        ``` mysql
        source <PATH_OF_mysql.sql_SCRIPT>
        ```

    !!! tip
    
        You can also run the scripts using [MySQL
        Workbench](https://dev.mysql.com/downloads/workbench/). For
        detailed instructions, see [MySQL Documentation - The Workbench
        Scripting
        Shell](https://dev.mysql.com/doc/workbench/en/wb-scripting-shell.html)
        .
    

3.  Populate the data to the **BLOCKS** and **LOCATION** tables from the
    following files.

    -   `            Geolocation Data/data/BLOCKS.csv           `
    -   `            Geolocation Data/data/LOCATION.csv           `
        `                       `

    !!! tip
    
        For more information, see [MySQL Documentation - Data Export and
        Import](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import.html)
        .
    

    Alternatively you can navigate to the
    `           Geolocation Data/data          ` directory and run the
    following commands.

    1.  The command to populate data to the BLOCKS table:

        ``` mysql
        mysqlimport -u <mysql username> -p --ignore-lines=2 --fields-terminated-by=, --fields-optionally-enclosed-by='"' --local GEO_LOCATION_DATA <PATH_OF_BLOCKS.csv_FILE>
        ```

        Provide the mysql password when prompted.

    2.  The command to populate data to the LOCATION table:

        ``` mysql
        mysqlimport -u <mysql username> -p --ignore-lines=2 --fields-terminated-by=, --fields-optionally-enclosed-by='"' --local GEO_LOCATION_DATA <PATH_OF_LOCATION.csv_FILE>
        ```

        Provide the mysql password when
        prompted.

4.  Download a JDBC provider depending on the database you are using
    (MySQL in this example) from
    [here](https://www.mysql.com/products/connector/), and extract it.
5.  Copy the `          mysql-connector-java-<VERSION>.jar         ` to
    the `          <IS_ANALYTICS_HOME>/lib         ` directory.
6.  Configure the following in the
    `           <IS_ANALYTICS_HOME>/conf/worker/deployment.yaml          `
    file as given below.

    ```toml
    name: GEO_LOCATION_DATA
    description: "The data source used for geo location database"
    jndiConfig:
    name: jdbc/GEO_LOCATION_DATA
    definition:
    type: RDBMS
    configuration:
        jdbcUrl: '<GEO_LOCATION_DATBASE_URL>'
        username: <MYSQL_USERNAME>
        password: <MYSQL_PASSWORD>
        driverClassName: <MYSQL_DRIVER_CLASS_NAME>
        maxPoolSize: 50
        idleTimeout: 60000
        validationTimeout: 30000
        isAutoCommit: false
    ```

    1.  `             jdbcUrl            ` : This is the URL of the geo
        location data base, e.g.,
        `             jdbc:                           mysql://localhost:3306/GEO_LOCATION_DATA                         `
        .

    2.  `            username           ` : This is the mysql user name,
        e.g., `            wso2carbon           ` .
    3.  `            password           ` : This is the mysql password,
        e.g, `            wso2carbon           ` .
    4.  `            driverClassName           ` : This is the package
        name of the JDBC driver of your mysql connector, e.g.,
        `            com.mysql.jdbc.Driver           ` .

7.  Open the
    `          <IS_ANALYTICS_HOME>/wso2/worker/deployment/siddhi-files/IS_ANALYTICS_AUTHENTICATION_COMMON.sidddhi         `
    file.

    1.  Uncomment the line 120:
        `            (ifThenElse(geo:findCountryFromIP(remoteIp)=="", "N/A", geo:findCountryFromIP(remoteIp)) as region,)           `
        .
    2.  Comment out the line 121: `            (region,)           ` .

    !!! tip
    
        **For testing purposes**
    
        Follow the steps below to load test data to the system.
    
        1.  Navigate to the
            `            <IS_ANALYTICS_HOME>/samples/sample-clients/is-analytics-client           `
            directory on a command prompt.

        2.  Run the following command.
        
            ant -Dport=7612 -Dhost=0.0.0.0
            


8.  Restart WSO2 IS Analytics worker node.
