# Database Configuration and Schema Setup

With the RDS instance running and WSO2 IS extracted on both nodes, the next step is to verify that the nodes can reach the database, create the WSO2 schema, apply the required SQL scripts, and update the `deployment.toml` configuration file on each node.

---

## Install the MySQL Client on Both Nodes

EC2 instances do not include the MySQL client by default. Install it on both nodes to enable direct database connectivity from the command line.

```bash
sudo apt update
sudo apt install mysql-client-core-8.0 -y
```

**Verify the installation:**
```bash
mysql --version
```

Expected output:
```
mysql  Ver 8.0.xx for Linux on x86_64 (MySQL Community Server - GPL)
```

---

## Verify Connectivity to the RDS Instance

Run the following on **both nodes** to confirm they can reach the database:

```bash
mysql -h <RDS_ENDPOINT> -P 3306 -u <MASTER_USERNAME> -p
```

Replace `<RDS_ENDPOINT>` with your actual RDS hostname (e.g., `wso2isdb.xxxxxxxxx.us-east-2.rds.amazonaws.com`) and `<MASTER_USERNAME>` with the username set during RDS creation.

Enter the password when prompted. A successful connection shows:

```
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is ...
Server version: 8.0.x MySQL Community Server
```

If both nodes connect successfully, the VPC networking and security group rules are configured correctly.

---

## Create the WSO2 Database Schema

From the MySQL prompt (on either node), create a dedicated database for WSO2 IS:

```sql
CREATE DATABASE wso2db;
```

Creating a dedicated schema keeps WSO2 IS data isolated from any other applications sharing the same RDS instance.

---

## Grant Database Permissions

Grant full privileges to the master user on the new schema:

```sql
GRANT ALL PRIVILEGES ON wso2db.* TO '<MASTER_USERNAME>'@'%';
FLUSH PRIVILEGES;
```

The `%` wildcard allows connections from any host. This is safe in this setup because the RDS security group restricts port `3306` access to EC2 nodes within the VPC only.

---

## Verify the Schema

Confirm the schema was created successfully:

```sql
SHOW DATABASES;
```

Expected output should include:

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| wso2db             |
+--------------------+
```

Exit the MySQL client:

```sql
EXIT;
```

---

## Apply the WSO2 IS Database Scripts

WSO2 IS includes SQL scripts that create the tables required for user management, identity operations, and consent management. Run each script against the `wso2db` schema from the command line on either node.

**Core tables (user management):**
```bash
mysql -h <RDS_ENDPOINT> -u <MASTER_USERNAME> -p wso2db \
  < ~/is-server/wso2is/dbscripts/mysql.sql
```

Creates tables prefixed with `UM_` for user management and core WSO2 IS functionality.

**Identity tables:**
```bash
mysql -h <RDS_ENDPOINT> -u <MASTER_USERNAME> -p wso2db \
  < ~/is-server/wso2is/dbscripts/identity/mysql.sql
```

Creates tables prefixed with `IDN_` for handling authentication flows, tokens, claims, and identity workflows.

**Consent tables:**
```bash
mysql -h <RDS_ENDPOINT> -u <MASTER_USERNAME> -p wso2db \
  < ~/is-server/wso2is/dbscripts/consent/mysql.sql
```

Creates tables prefixed with `CONSENT_` for storing user consent records.

!!! note
    All scripts target the same `wso2db` database. After running all three, the schema will contain tables prefixed with `UM_`, `IDN_`, and `CONSENT_`.

**Verify the tables were created:**
```bash
mysql -h <RDS_ENDPOINT> -u <MASTER_USERNAME> -p wso2db -e "SHOW TABLES;"
```

---

## Configure deployment.toml on Both Nodes

The `deployment.toml` file is the primary configuration file for WSO2 IS. Open it on each node and update the database settings.

```bash
cd ~/is-server/wso2is/repository/conf
nano deployment.toml
```

### Node 1 — Primary Node

```toml
[server]
hostname = "<Node-1-Public-IP>"
node_ip = "0.0.0.0"
base_path = "https://$ref{server.hostname}:${carbon.management.port}"

[super_admin]
username = "admin"
password = "admin"
create_admin_account = true

[database.identity_db]
type = "mysql"
url = "jdbc:mysql://<RDS_ENDPOINT>:3306/wso2db?useSSL=false&allowPublicKeyRetrieval=true"
username = "<MASTER_USERNAME>"
password = "<MASTER_PASSWORD>"
driver = "com.mysql.cj.jdbc.Driver"

[database.shared_db]
type = "mysql"
url = "jdbc:mysql://<RDS_ENDPOINT>:3306/wso2db?useSSL=false&allowPublicKeyRetrieval=true"
username = "<MASTER_USERNAME>"
password = "<MASTER_PASSWORD>"
driver = "com.mysql.cj.jdbc.Driver"
```

### Node 2 — Secondary Node

```toml
[server]
hostname = "<Node-2-Public-IP>"
node_ip = "0.0.0.0"
base_path = "https://$ref{server.hostname}:${carbon.management.port}"

[super_admin]
username = "admin"
password = "admin"
create_admin_account = false

[database.identity_db]
type = "mysql"
url = "jdbc:mysql://<RDS_ENDPOINT>:3306/wso2db?useSSL=false&allowPublicKeyRetrieval=true"
username = "<MASTER_USERNAME>"
password = "<MASTER_PASSWORD>"
driver = "com.mysql.cj.jdbc.Driver"

[database.shared_db]
type = "mysql"
url = "jdbc:mysql://<RDS_ENDPOINT>:3306/wso2db?useSSL=false&allowPublicKeyRetrieval=true"
username = "<MASTER_USERNAME>"
password = "<MASTER_PASSWORD>"
driver = "com.mysql.cj.jdbc.Driver"
```

### Key Configuration Differences Between Nodes

| Setting | Node 1 | Node 2 | Reason |
|---------|--------|--------|--------|
| `hostname` | Node 1 public IP | Node 2 public IP | Each node identifies itself individually |
| `create_admin_account` | `true` | `false` | Only one node should create the default admin — running it on both causes a conflict |
| Database settings | Identical | Identical | Both nodes share the same RDS instance |

Save and exit each file with `CTRL + O`, `Enter`, then `CTRL + X`.

---

## Start WSO2 IS and Verify the Database Connection

### Start Node 1

```bash
cd ~/is-server/wso2is/bin
./wso2server.sh
```

Monitor the startup logs:

```bash
tail -f ~/is-server/wso2is/repository/logs/wso2carbon.log
```

Look for log entries confirming:

- Successful database connection
- Table initialization without errors
- Server started on port `9443`

### Start Node 2

Once Node 1 has fully started, start Node 2 using the same commands:

```bash
cd ~/is-server/wso2is/bin
./wso2server.sh
```

Monitor its logs as well to confirm no database errors appear on the second node.

---

## Database Configuration Checklist

| Checkpoint | Expected State |
|------------|----------------|
| MySQL client installed | Both nodes — `mysql --version` returns a version string |
| RDS connectivity | Both nodes connect successfully via `mysql -h ...` |
| `wso2db` schema created | Visible in `SHOW DATABASES` output |
| Privileges granted | `GRANT ALL PRIVILEGES` executed and flushed |
| SQL scripts applied | `UM_`, `IDN_`, `CONSENT_` tables visible in `SHOW TABLES` |
| `deployment.toml` updated | Correct RDS endpoint, credentials, and node hostname on both nodes |
| `create_admin_account` | `true` on Node 1 only, `false` on Node 2 |
| WSO2 IS started | No database errors in `wso2carbon.log` on either node |
