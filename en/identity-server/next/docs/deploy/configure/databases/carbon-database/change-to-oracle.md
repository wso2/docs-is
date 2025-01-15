# Change to Oracle

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use Oracle for this purpose.
    
---

## Datasource configurations

{% include "../../../../includes/datasource-config.md" %}
                       
After setting up the Oracle database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that Oracle database by following the instructions given below.

---

### Change the default datasource

### Minimum configurations for changing default datasource to Oracle
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{% include "../../../../includes/db-basic-config.md" %}
 
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
    
3.  Download the Oracle JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder  

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

{% include "../../../../includes/db-config-table.md" %}

### Using an alternate user to connect to database

When the database owner is not the user used to connect to the database, specify the parent schema in the datasource declarion.

	``` toml
	[database.identity_db.db_props]
	parentSchema = "<parent_schema_name>"

    [database.shared_db.db_props]
	parentSchema = "<parent_schema_name>"
	```

!!! note "Database user priviledges"

    When a custom database user is created, please note that the following privildges should be granted according to the purpose of the user.

    - Execute the below permissions on the database to perform DDL operations.
        - CREATE SESSION, ALTER SESSION, UNLIMITED TABLESPACE, CREATE VIEW, CREATE SEQUENCE, CREATE TABLE, CREATE PROCEDURE, CREATE TRIGGER, CREATE PUBLIC SYNONYM
            - ex: `GRANT CREATE SESSION TO <db-user>;`

    - Execute the below permissions on the database to perform DML operations.
        - CREATE SESSION, ALTER SESSION, UNLIMITED TABLESPACE
            - ex: `GRANT CREATE SESSION TO <db-user>;`

    - When a user accessing the tables is not the owner of the tables, the following permissions should be granted on the table.
        - SELECT, INSERT, DELETE, UPDATE
            - ex: `GRANT SELECT, INSERT, DELETE, <db-user>.<table-name>;`

    Please refer the offcial [oracle documentation](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/GRANT.html#GUID-20B4E2C0-A7F8-4BC8-A5E8-BE61BDC41AC3) for further details.

---
  
## Configure the connection pool behavior on return 

{% include "../../../../includes/connection-pool-behavior.md" %}

### Configure the connection pool to commit pending transactions on connection return
        
{% include "../../../../includes/commit-pending.md" %}

### Configure the connection pool to rollback pending transactions on connection return

{% include "../../../../includes/rollback-pending.md" %}
