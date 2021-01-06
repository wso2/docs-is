# Changing to MariaDB

By default, WSO2 Identity Server uses the embedded H2 database as the database for storing user management and registry data. Given below are the steps
you need to follow in order to use MariaDB for this purpose. 

## Datasource configurations

A datasource is used to establish the connection to a database. By
default, `WSO2_IDENTITY_DB` and `WSO2_SHARED_DB` datasources are used to connect
to the default  H2 database. 

- `WSO2_SHARED_DB` - The datasource which stores registry and user management
                     data.
- `WSO2_IDENTITY_DB` - The datasource specific for the identity server which stores
                       identity related data
                       
After setting up the MariaDB database, you can point the `WSO2_IDENTITY_DB` or 
`WSO2_SHARED_DB` or both to that MariaDB database by following the instructions given below.

## Changing the default datasource

Add the configurations to change to MariaDB in the `<IS-HOME>/repository/conf/deployment.toml` file. A sample configuration is given below.

```toml 
[user_store]
type = "database_unique_id"

[database.identity_db]
type = "mariadb"
url = "jdbc:mariadb://172.17.0.2:3306/elevbeta3snap1"
username = "root"
password = "mypass"
[database.identity_db.pool_options]
maxActive = "80"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
validationInterval="30000"
defaultAutoCommit=false


[database.shared_db]
type = "mariadb"
url = "jdbc:mariadb://172.17.0.2:3306/elevbeta3snap1"
username = "root"
password = "mypass"
[database.shared_db.pool_options]
maxActive = "80"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
validationInterval="30000"
```
