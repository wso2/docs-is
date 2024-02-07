# Change to MySQL

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data. Given below are the steps
you need to follow in order to use MySQL for this purpose. 

---

## Datasource configurations

{% include "../../../../includes/datasource-config.md" %}
                       
After setting up the MySQL database. You can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that MySQL database by following the instructions given below.

---

## Change the default datasource

### Minimum configurations for changing default datasource to MySQL
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

{% include "../../../../includes/db-basic-config.md" %}
 
A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

    1. Configure the`deployment.toml` file.

        ``` toml
        [database.identity_db]
        type = "mysql"
        hostname = "localhost"
        name = "regdb"
        username = "regadmin"
        password = "regadmin"
        port = "3306"
        ```
    
    1. Execute database scripts.
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files, against the database created.
        
        - `<IS-HOME>/dbscripts/identity/mysql.sql`
        - `<IS-HOME>/dbscripts/consent/mysql.sql`
        
2. `WSO2_SHARED_DB`
    
    1.  Configure the `deployment.toml` file. 

        ``` toml
        [database.shared_db]
        type = "mysql"
        hostname = "localhost"
        name = "regdb"
        username = "regadmin"
        password = "regadmin"
        port = "3306"
        ```
        
    2.  Execute database scripts.
    
        Execute the scripts in the `<IS-HOME>/dbscripts/mysql.sql` file against the database created.
                         
    !!! note     
        Instead of defining `hostname`, `port`, and `name` separately, you can define the `url`
        of the database in the following format.
                    
        ``` toml
        type = "mysql"
        url = "jdbc:mysql://localhost:3306/regdb"
        username = "regadmin"
        password = "regadmin"
        ```

    !!! note
        As MySQL DB is inherently case-insensitive, it is recommended to deactivate the case-insensitive functionality of {{product_name}} when integrating with MySQL DB.
        Disabling this feature in {{product_name}} eliminates unnecessary processing, thereby potentially enhancing overall system performance.

        To disable case-insensitivity for the primary user store, open the `deployment.toml` file found in the `<IS-HOME>/repository/conf/` directory and add the following configurations to the primary user store.

        ``` toml
        [user_store.properties]
        CaseInsensitiveUsername = false
        UseCaseSensitiveUsernameForCacheKeys = false
        ```  
    
        For secondary user stores, add the following configurations to the `<userstore>.xml` file found in the `<IS_HOME>/repository/deployment/server/userstores` directory.

        ``` xml
        <Property name="CaseInsensitiveUsername">false</Property>
        <Property name="UseCaseSensitiveUsernameForCacheKeys">false</Property>
        ```

3. If you have a requirement in using workflow feature follow, 
    [Change the default database of BPS database]({{base_path}}/deploy/configure/databases/carbon-database/change-datasource-bpsds)
    
4.  Download the MySQL JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder  
          
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
