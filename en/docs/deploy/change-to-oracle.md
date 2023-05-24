# Change to Oracle

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use Oracle for this purpose.
    
---

## Datasource configurations

{!./includes/datasource-config.md !}
                       
After setting up the Oracle database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that Oracle database by following the instructions given below.

---

### Change the default datasource

### Minimum configurations for changing default datasource to Oracle
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{!./includes/db-basic-config.md !}  
 
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
        
    1.  Execute database scripts.
    
        Execute the scripts in the following file, against the database created.
                    
        - `<IS-HOME>/dbscripts/oracle.sql`
        
3. If you have a requirement to use the workflow feature, see 
    [Change the default database of BPS database]({{base_path}}/deploy/change-datasource-bpsds)
    
4.  Download the Oracle JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder  

---
            
### Advanced database configurations

Apart from the basic configurations specified above, WSO2 Identity Server supports some advanced database configurations as well.

-	`WSO2_IDENTITY_DB` related configurations that should be added to the `deployment.toml` file.
    
	``` toml
	[database.identity_db.pool_options]
	maxActive = "80"
	maxWait = "360000"
	minIdle ="5"
	testOnBorrow = true
	validationQuery="select 1 from dual"
	validationInterval="30000"
	defaultAutoCommit=false
	commitOnReturn=true
	```
   
-	`WSO2_SHARED_DB` `deployment.toml` related configurations that should be added to the `deployment.toml` file.
	
	```toml
	[database.shared_db.pool_options]
	maxActive = "80"
	maxWait = "360000"
	minIdle ="5"
	testOnBorrow = true
	validationQuery="select 1 from dual"
	validationInterval="30000"
	defaultAutoCommit=false
	commitOnReturn=true
  	```

{!./includes/db-config-table.md !}


---
  
## Configure the connection pool behavior on return 

{!./includes/connection-pool-behavior.md !}

### Configure the connection pool to commit pending transactions on connection return
        
{!./includes/commit-pending.md !}

### Configure the connection pool to rollback pending transactions on connection return

{!./includes/rollback-pending.md !}

