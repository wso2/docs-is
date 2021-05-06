# Change to Oracle

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use Oracle for this purpose.
    
---

## Datasource configurations

{! fragments/datasource-config.md !}
                       
After setting up the Oracle database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that Oracle database by following the instructions given below.

---

### Change the default datasource

### Minimum configurations for changing default datasource to Oracle
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{! fragments/db-basic-config.md !}  
 
A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

    1. Configure the `deployment.toml` file.

        ``` toml
        [database.identity_db]
        type = "oracle"
        hostname = "localhost"
        sid = "regdb"
        username = "regadmin"
        password = "regadmin"
        port = "1521"
        ```
    
    1. Execute database scripts.
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files, against the database created.
        
        - `<IS-HOME>/dbscripts/identity/oracle.sql`
        - `<IS-HOME>/dbscripts/identity/uma/oracle.sql`
        - `<IS-HOME>/dbscripts/consent/oracle.sql`
        
2. `WSO2_SHARED_DB`
    
    1. Configure the `deployment.toml` file.

        ``` toml
        [database.shared_db]
        type = "oracle"
        hostname = "localhost"
        sid = "regdb"
        username = "regadmin"
        password = "regadmin"
        port = "1521"
        ```
        
    1. Execute database scripts.
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following file, against the database created.
                    
        - `<IS-HOME>/dbscripts/oracle.sql`
        
3. If you have a requirement to use the workflow feature, see 
    [Change the default database of BPS database](../../../deploy/change-datasource-bpsds)
    
4.  Download the Oracle JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder  

    !!! note     
        {! fragments/dsetup.md !} 

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

