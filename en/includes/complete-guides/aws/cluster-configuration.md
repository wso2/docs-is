# Cluster Configuration

With both nodes installed and the database schema in place, this section covers the final configuration differences between the primary and secondary nodes, starting the WSO2 IS server on each, and confirming that NGINX distributes traffic correctly across the cluster.

---

## Node Configuration Overview

The two nodes share the same base configuration but differ in a few key areas. The table below highlights what changes between them.

| Setting | Node 1 (Primary) | Node 2 (Secondary) | Reason |
|---------|-------------------|---------------------|--------|
| `hostname` | Node 1 public IP or domain | Node 2 public IP or domain | Each node identifies itself independently |
| `create_admin_account` | `true` | `false` | Prevents a duplicate admin account conflict when Node 2 starts |
| `node_ip` | `0.0.0.0` | `0.0.0.0` | Binds to all interfaces on each node |
| Database endpoint | Same RDS endpoint | Same RDS endpoint | Both nodes read and write to the shared database |

---

## Configure Node 1 — Primary

SSH into Node 1 and open the `deployment.toml` file:

```bash
ssh -i ~/Downloads/wso2is-keypair.pem ubuntu@<Node-1-Public-IP>
cd ~/is-server/wso2is/repository/conf
nano deployment.toml
```

Apply the following configuration:

```toml
[server]
hostname = "<Node-1-Public-IP-or-Domain>"
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

[transport.https.properties]
proxyPort = 443
```

Save and exit with `CTRL + O`, `Enter`, then `CTRL + X`.

---

## Configure Node 2 — Secondary

SSH into Node 2 and open the `deployment.toml` file:

```bash
ssh -i ~/Downloads/wso2is-keypair.pem ubuntu@<Node-2-Public-IP>
cd ~/is-server/wso2is/repository/conf
nano deployment.toml
```

Apply the following configuration:

```toml
[server]
hostname = "<Node-2-Public-IP-or-Domain>"
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

[transport.https.properties]
proxyPort = 443
```

Save and exit.

---

## Start WSO2 IS on Both Nodes

Start Node 1 first. Node 2 should only be started after Node 1 has fully initialized, as Node 1 is responsible for creating the admin account and initializing the database schema on first boot.

### Start Node 1

```bash
cd ~/is-server/wso2is/bin
./wso2server.sh
```

Monitor the startup logs:
```bash
tail -f ~/is-server/wso2is/repository/logs/wso2carbon.log
```

Wait until you see a log entry similar to:
```
[2024-...] INFO  {org.wso2.carbon.core.internal.CarbonCoreActivator} - WSO2 Carbon started in ... sec
```

This confirms Node 1 is fully started and the database has been initialized.

### Start Node 2

Once Node 1 is fully running, SSH into Node 2 and start the server:

```bash
cd ~/is-server/wso2is/bin
./wso2server.sh
```

Monitor the logs:
```bash
tail -f ~/is-server/wso2is/repository/logs/wso2carbon.log
```

Confirm Node 2 starts without database errors. Since `create_admin_account = false`, Node 2 will connect to the existing schema without attempting to recreate it.

---

## Verify NGINX Load Balancing

Confirm that the NGINX upstream block on your NGINX instance references both nodes using their private IPs:

```nginx
upstream wso2_backend {
    server <Node-1-Private-IP>:9443;
    server <Node-2-Private-IP>:9443;
}
```

NGINX uses a round-robin algorithm by default, distributing each incoming request alternately between the two nodes.

**Reload NGINX after any upstream changes:**
```bash
sudo systemctl reload nginx
```

---

## Verify the Cluster

Access the WSO2 IS admin console through NGINX:

```
https://wso2-is-test.com/console
```

Log in with the credentials set in `deployment.toml` (default: `admin` / `admin`).

**Confirm cluster behavior:**

- Any user, application, or configuration created through the console is stored in the shared RDS database.
- Both nodes read from and write to the same database, so changes are immediately visible regardless of which node handles a given request.
- If one node becomes unavailable, NGINX continues routing traffic to the remaining node.

---

## Cluster Configuration Checklist

| Checkpoint | Expected State |
|------------|----------------|
| Node 1 `deployment.toml` | `hostname` set, `create_admin_account = true` |
| Node 2 `deployment.toml` | `hostname` set, `create_admin_account = false` |
| Both nodes database config | Same RDS endpoint and credentials |
| Both nodes `proxyPort` | Set to `443` |
| Node 1 started first | Fully initialized before Node 2 starts |
| Node 2 started | No database errors in logs |
| NGINX upstream | Both node private IPs listed on port `9443` |
| Admin console | Accessible at `https://wso2-is-test.com/console` |
