# Change to IBM DB2

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use DB2 for this purpose.
    
---

## Datasource configurations

{% include "../../../../includes/datasource-config.md" %}
                       
After setting up the DB2 database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB`, or both to the DB2 database by following the instructions given below.

---

## Change the default datasource

### Minimum configurations for changing default datasource to DB2
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{% include "../../../../includes/db-basic-config.md" %}

A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

	1. Configure the `deployment.toml` file.

		``` toml
		[database.identity_db]
		type = "db2"
		hostname = "localhost"
		name = "regdb"
		username = "regadmin"
		password = "regadmin"
		port = "50000"
		```
	
	1. Execute database scripts.
	
		Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files, against the database created.
		
		- `<IS-HOME>/dbscripts/identity/db2.sql`
		- `<IS-HOME>/dbscripts/consent/db2.sql`

		!!! info 
			While running the DB2 scripts via the terminal, use the following DB2 command to run the DB2 scripts with the delimeter "/" since the default delimiter script for DB2 is ";". 
			```xml
			db2 -td/ -f db2.sql
			```		
		
2. `WSO2_SHARED_DB`
	
	1.	Configure the `deployment.toml` file.

		``` toml
		[database.shared_db]
		type = "db2"
		hostname = "localhost"
		name = "regdb"
		username = "regadmin"
		password = "regadmin"
		port = "50000"
		```
		
	1.	Execute database scripts.
	
		Execute the scripts in the `<IS-HOME>/dbscripts/db2.sql` file, against the database created.
		
3.	If you have a requirement in using workflow feature, follow [Change the default database of BPS database]({{base_path}}/deploy/configure/databases/carbon-database/change-datasource-bpsds).
	
4.	Download the DB2 JDBC driver for the version, you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.  

---

### Advanced database configurations

{% include "../../../../includes/db-advanced-config.md" %}

{% include "../../../../includes/db-config-table.md" %}

---

## Configure the connection pool behavior on return 

{% include "../../../../includes/connection-pool-behavior.md" %}

### Configure the connection pool to commit pending transactions on connection return
        
{% include "../../../../includes/commit-pending.md" %}

### Configure the connection pool to rollback pending transactions on connection return

{% include "../../../../includes/rollback-pending.md" %}
