# Change to Oracle RAC

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use Oracle RAC for this purpose.

---

## Datasource configurations

{% include "../../../../includes/datasource-config.md" %}
                       
After setting up the Oracle RAC database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that Oracle RAC database by following the instructions given below.

---

### Change the default datasource

### Minimum configurations for changing default datasource to Oracle RAC
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{% include "../../../../includes/db-basic-config.md" %}
 
A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

    1. Configure the `deployment.toml` file.

        ``` toml
        [database.identity_db]
        url = "jdbc:oracle:thin:@(DESCRIPTION=(LOAD_BALANCE=on)
                            (ADDRESS=(PROTOCOL=TCP)(HOST=racnode1) (PORT=1521))
                            (ADDRESS=(PROTOCOL=TCP)(HOST=racnode2) (PORT=1521))
                            (CONNECT_DATA=(SERVICE_NAME=rac)))"
        username = "regadmin"
        password = "regadmin"
        driver = "oracle.jdbc.OracleDriver"
        [database.identity_db.pool_options]
        maxActive = "80"
        maxWait = "60000"
        minIdle = "5"
        testOnBorrow = true
        validationQuery="SELECT 1 FROM DUAL"
        validationInterval="30000"
        defaultAutoCommit=false
        ```
    
    2. Execute database scripts.
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files against the database created.
        
        - `<IS-HOME>/dbscripts/identity/oracle_rac.sql`
        - `<IS-HOME>/dbscripts/consent/oracle_rac.sql`
        
2. `WSO2_SHARED_DB`
    
    1.  Configure the `deployment.toml` file.

        ``` toml
        [database.shared_db]
        url = "jdbc:oracle:thin:@(DESCRIPTION=(LOAD_BALANCE=on)
                            (ADDRESS=(PROTOCOL=TCP)(HOST=racnode1) (PORT=1521))
                            (ADDRESS=(PROTOCOL=TCP)(HOST=racnode2) (PORT=1521))
                            (CONNECT_DATA=(SERVICE_NAME=rac)))"
        username = "regadmin"
        password = "regadmin"
        driver = "oracle.jdbc.OracleDriver"
        [database.shared_db.pool_options]
        maxActive = "80"
        maxWait = "60000"
        minIdle = "5"
        testOnBorrow = true
        validationQuery="SELECT 1 FROM DUAL"
        validationInterval="30000"
        defaultAutoCommit=false
        ```
        
    2.  Execute database scripts.
    
        Execute the scripts in the `<IS-HOME>/dbscripts/oracle_rac.sql` file against the database created.
        
3. If you have a requirement in using workflow feature follow, 
    [Change the default database of BPS database]({{base_path}}/deploy/configure/databases/carbon-database/change-datasource-bpsds)
    
4.  Download the Oracle RAC JDBC driver for the version, you are using and
        copy it to the `<IS_HOME>/repository/components/lib` folder   
               
---      

### Advanced database configurations

{% include "../../../../includes/db-advanced-config.md" %}

{% include "../../../../includes/db-config-table.md" %}
