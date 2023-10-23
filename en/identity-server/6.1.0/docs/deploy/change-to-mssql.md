# Change to MS SQL

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use MS SQL for this purpose.

---    

## Set up datasource configurations

{!./includes/datasource-config.md !}
                       
After setting up the MS SQL database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that MS SQL database by following the instructions given below.

---

## Change the default datasource

### Minimum configurations for changing default datasource to MS SQL
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{!./includes/db-basic-config.md !}  
 
A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

    1. Configure the `<IS-HOME>/repository/conf/deployment.toml` file.

        ``` toml
        [database.identity_db]
        type = "mssql"
        hostname = "localhost"
        name = "regdb"
        username = "regadmin"
        password = "regadmin"
        port = "1433"
        ```
    
    2. Execute database scripts.
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files against the database created.
        
        - `<IS-HOME>/dbscripts/identity/mssql.sql`
        - `<IS-HOME>/dbscripts/identity/uma/mssql.sql`
        - `<IS-HOME>/dbscripts/consent/mssql.sql`
        
2. `WSO2_SHARED_DB`
    
    1.  Configure the `<IS-HOME>/repository/conf/deployment.toml` file.

        ``` toml
        [database.shared_db]
        type = "mssql"
        hostname = "localhost"
        name = "regdb"
        username = "regadmin"
        password = "regadmin"
        port = "1433"
        ```
        
    2.  Execute database scripts.
    
        Execute the scripts in the `<IS-HOME>/dbscripts/mssql.sql` file, against the database created.
        
3. If you have a requirement in using workflow feature follow, 
    [Change the default database of BPS database]({{base_path}}/deploy/change-datasource-bpsds)
    
4.  Download the MS SQL JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.  


---

### Advanced database configurations

{!./includes/db-advanced-config.md !}

{!./includes/db-config-table.md !}
---
  
## Configure the connection pool behavior on return 

{!./includes/connection-pool-behavior.md !}

### Configure the connection pool to commit pending transactions on connection return
        
{!./includes/commit-pending.md !}

### Configure the connection pool to rollback pending transactions on connection return

{!./includes/rollback-pending.md !}