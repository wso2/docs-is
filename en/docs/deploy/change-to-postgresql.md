# Change to PostgreSQL

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use PostgreSQL for this purpose.

---

## Datasource configurations

{! fragments/datasource-config.md !}
                       
After setting up the PostgreSQL database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that PostgreSQL database by following the instructions given below.

---

## Change the default datasource

### Minimum configurations for changing the default datasource to PostgreSQL
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. Following are the basic configurations and their descriptions. 

{! fragments/db-basic-config.md !} 
 
A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

    1. Configure the `deployment.toml` file.

        ``` toml
        [database.identity_db]
        type = "postgre"
        hostname = "localhost"
        name = "testdb"
        username = "regadmin"
        password = "regadmin"
        port = "5432"
        ```
    
    2.  Execute database scripts.
    
        Execute the scripts in the following files, against the database created.
        
        - `<IS-HOME>/dbscripts/identity/postgresql.sql`
        - `<IS-HOME>/dbscripts/identity/uma/postgresql.sql`
        - `<IS-HOME>/dbscripts/consent/postgresql.sql`
        
2. `WSO2_SHARED_DB`
    
    1.  Configure the `deployment.toml` file.

        ``` toml
        [database.shared_db]
        type = "postgre"
        hostname = "localhost"
        name = "testdb"
        username = "regadmin"
        password = "regadmin"
        port = "5432"
        ```
        
    2.  Execute database scripts.
    
        Execute the scripts in the `<IS-HOME>/dbscripts/postgresql.sql` file against the database created.
        
3. If you have a requirement to use the workflow feature, see [Change the default database of BPS database](../../../deploy/change-datasource-bpsds).
    
4.  Download the Postgres JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.  

---           

### Advanced database configurations

{! fragments/db-advanced-config.md !}

---
  
## Configure the connection pool behavior on return 

{! fragments/connection-pool-behavior.md !}

### Configure the connection pool to commit pending transactions on connection return
        
{! fragments/commit-pending.md !}

### Configure the connection pool to rollback pending transactions on connection return

{! fragments/rollback-pending.md !}