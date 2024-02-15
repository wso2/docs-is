# Change to Remote H2

By default, WSO2 Identity Server uses the embedded H2 database as the database
for storing user management and registry data.
The following sections describe how to replace the default H2 databases
with Remote H2:

!!! warning "H2 is not recommended in production"
    The embedded H2 database is NOT recommended in enterprise testing and
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Please use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    You can use the embedded H2 database in development environments and as
    the local registry in a registry mount.

---   

## Datasource configurations

{% include "../../../../includes/datasource-config.md" %}
                       
After setting up the H2 database, You can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB`, or both to that H2 database by following the instructions given below.

---

## Change the default datasource

### Minimum configurations for changing default datasource to H2
 
You can configure the datasource by editing the default configurations in `<IS-HOME>/repository/conf/deployment.toml`. 

Following are the basic configurations and their descriptions. 

<table>
<thead>
<tr class="header">
<th>Element</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td><strong>username</strong> and <strong>password</strong></td>
<td>The name and password of the database user.</td>
</tr>
<tr class="even">
<td><strong>driver</strong></td>
<td>The jdbc driver of the database.</td>
</tr>
<tr class="even">
<td><strong>url</strong></td>
<td>The url of the database.</td>
</tr>
</table>   
 
A sample configuration is given below.

1. `WSO2_IDENTITY_DB` 

    1. Configure the `deployment.toml` file.

        ``` toml
        [database.identity_db]
        url = "jdbc:h2:tcp://localhost/~/registryDB;create=true"
        username = "regadmin"
        password = "regadmin"
        driver = "org.h2.Driver"
        [database.identity_db.pool_options]
        maxActive = "80"
        maxWait = "60000"
        minIdle = "5"
        testOnBorrow = true
        validationQuery="SELECT 1"
        validationInterval="30000"
        defaultAutoCommit=false
        ```
    
    1. Execute database scripts.
    
        Navigate to `<IS-HOME>/dbscripts`. Execute the scripts in the following files against the database created.
        
        - `<IS-HOME>/dbscripts/identity/h2.sql`
        - `<IS-HOME>/dbscripts/consent/h2.sql`
        
2. `WSO2_SHARED_DB`
    
    1. Configure the `deployment.toml` file.

        ``` toml
        [database.shared_db]
        url = "jdbc:h2:tcp://localhost/~/registryDB;create=true"
        username = "regadmin"
        password = "regadmin"
        driver = "org.h2.Driver"
        [database.identity_db.pool_options]
        maxActive = "80"
        maxWait = "60000"
        minIdle = "5"
        testOnBorrow = true
        validationQuery="SELECT 1"
        validationInterval="30000"
        defaultAutoCommit=false
        ```
        
    1.  Execute the database scripts.
    
        Execute the scripts in the `<IS-HOME>/dbscripts/h2.sql` file against the database created.
    
3.  Download the H2 JDBC driver for the version, you are using and copy it to the `<IS_HOME>/repository/components/lib` folder  

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