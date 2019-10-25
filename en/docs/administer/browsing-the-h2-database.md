# Browsing the H2 Database

WSO2 Identity Server is shipped with a default H2 database. In some
product scenarios, you may need to access a database table to see how it
works, to troubleshoot, or to try out the scenario.

Follow the instructions given below to connect to the H2 database and
browse through it.

!!! warning "H2 is not recommended in production"
    The embedded H2 database is NOT recommended in enterprise evaluation, testing and
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Please use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    You can use the embedded H2 database in development environments and as
    the local registry in a registry mount.
    

1.  Open the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file and add the following configuration.

    ``` toml
    [database_configuration]
    enable_h2_console = "true"
    ```

2.  Restart the WSO2 Identity Server and access the following URL via your
    browser: [http://localhost:8082](http://localhost:8082/)

    !!! tip
        If you are logged in to the management console, logout before
        connecting to the database.
        
3.  WSO2 Identity Server ships with two datasources. They are by default connected 
    to the default  H2 database. 
    
    - `WSO2_SHARED_DB` - The database which stores registry and user management
                         data.
    - `WSO2_IDENTITY_DB` - The database specific for the identity server which stores
                           identity related data
                           
    After accessing the URL provided in step 2 you will be prompted to provide the following data. 
    
      <table>
      <thead>
      <tr class="header">
      <th>Element</th>
      <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr class="even">
      <td><strong>username</strong></td>
      <td>username of the database. By default `wso2carbon`</td>
      </tr>
      <tr class="even">
      <td><strong>password</strong></td>
      <td>password of the database. By default `wso2carbon`</td>
      </tr>
      <tr class="even">
      <td><strong>JDBC URL</strong></td>
      <td>location of the H2 database</td>
      </tr>
      </table>  
    
    Please refer the following for sample details that should be provided to connected to each database.
    
    ??? example "WSO2_IDENTITY_DB"
        
        1.  JDBC URL : `jdbc:h2:[file path to <IS_HOME>/repository/database/WSO2IDENTITY_DB]`
        2.  username : `wso2carbon`
        3.  password  : `wso2carbon`
    
    ??? example "WSO2_SHARED_DB"
    
        1.  JDBC URL : `jdbc:h2:[file path to <IS_HOME>/repository/database/WSO2SHARED_DB]`
        2.  username : `wso2carbon`
        3.  password  : `wso2carbon`


The database tables are listed on the left. You can now browse through
them as required.
