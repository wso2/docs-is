# Change to MariaDB

By default, WSO2 Identity Server uses the embedded H2 database as the database for storing user management and registry data. Follow the same steps and use the same database scripts, drivers, and configurations given in the documentation: [Changing to MySQL](change-to-mysql.md) in order to use MariaDB instead of the embedded H2 database.

---

## Datasource configurations

{% include "../../../../includes/datasource-config.md" %}

After setting up the MariaDB database, you can point `WSO2_IDENTITY_DB` or `WSO2_SHARED_DB` or both to the MariaDB database by following the instructions given below.

---

## Change the default datasource

Add the following configurations to change to MariaDB in the `<IS_HOME>/repository/conf/deployment.toml` file. A sample configuration is given below.

```toml
[user_store]
type = "database_unique_id"

[database.identity_db]
type = "mariadb"
url = "jdbc:mariadb://172.17.0.2:3306/elevbeta3snap1?useBulkStmts=false"
username = "root"
password = "mypass"

[database.identity_db.pool_options]
maxActive = "80"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
validationInterval="30000"
defaultAutoCommit=false
commitOnReturn=true

[database.shared_db]
type = "mariadb"
url = "jdbc:mariadb://172.17.0.2:3306/elevbeta3snap1?useBulkStmts=false"
username = "root"
password = "mypass"

[database.shared_db.pool_options]
maxActive = "80"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
validationInterval="30000"
defaultAutoCommit=false
commitOnReturn=true
```
