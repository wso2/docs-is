# WSO2 Identity Server Installation

This section covers transferring the WSO2 Identity Server distribution package to both nodes, extracting it into the installation directory, and installing the MySQL JDBC connector so WSO2 IS can communicate with the RDS database.

Run all commands on **both nodes** unless stated otherwise.

---

## Prerequisites

Before proceeding, confirm the following on each node:

| Requirement | How to Verify |
|-------------|---------------|
| EC2 instances running | EC2 Dashboard → Instances → Status: Running |
| SSH access working | `ssh -i "wso2is-keypair.pem" ubuntu@<Node-Public-IP>` |
| Java installed and `JAVA_HOME` set | `java -version` and `echo $JAVA_HOME` |
| RDS instance available | RDS Dashboard → Status: Available |
| RDS endpoint, port, username, and password noted | Stored from the database setup section |
| `~/is-server` directory exists | `ls ~/is-server` |

---

## Transfer the WSO2 IS Package to Both Nodes

Download the WSO2 Identity Server distribution package from the [WSO2 website](https://wso2.com/identity-server/) and transfer it to both EC2 nodes from your local machine.

!!! note
    Run the `scp` commands below from your **local terminal**, not from inside the EC2 instances.

```bash
cd ~/Downloads

# Transfer to Node 1
scp -i wso2is-keypair.pem wso2is-<version>.zip ubuntu@<Node-1-Public-IP>:~/is-server/

# Transfer to Node 2
scp -i wso2is-keypair.pem wso2is-<version>.zip ubuntu@<Node-2-Public-IP>:~/is-server/
```

Replace `<version>` with your WSO2 IS release version and `<Node-Public-IP>` with the respective public IP of each node.

| `scp` Parameter | Purpose |
|-----------------|---------|
| `-i wso2is-keypair.pem` | Authenticates using your private key |
| `wso2is-<version>.zip` | The WSO2 IS distribution package |
| `ubuntu@<IP>:~/is-server/` | Destination path on the EC2 node |

---

## Extract and Prepare the Package

SSH into each node and run the following:

```bash
cd ~/is-server

# Extract the package
unzip wso2is-<version>.zip

# Rename to a standard folder name
mv wso2is-<version> wso2is
```

Using a consistent folder name (`wso2is`) across both nodes simplifies configuration, scripting, and future upgrades.

**Verify the extraction:**
```bash
ls ~/is-server/
```

Expected output:
```
wso2is  wso2is-<version>.zip
```

---

## Install the MySQL JDBC Connector

WSO2 IS needs the MySQL Connector/J library to communicate with the RDS database. This connector must be placed in the WSO2 IS library directory on both nodes.

### Step 1 — Download the Connector

1. Go to the [MySQL Connector/J download page](https://dev.mysql.com/downloads/connector/j/).
2. Select the version compatible with your MySQL RDS engine version.
3. Choose **Platform Independent** and download the **Compressed TAR Archive** (`.tar.gz`).

### Step 2 — Transfer the Connector to Both Nodes

Run from your **local terminal**:

```bash
cd ~/Downloads

# Transfer to Node 1
scp -i wso2is-keypair.pem mysql-connector-j-<version>.tar.gz ubuntu@<Node-1-Public-IP>:~/is-server/

# Transfer to Node 2
scp -i wso2is-keypair.pem mysql-connector-j-<version>.tar.gz ubuntu@<Node-2-Public-IP>:~/is-server/
```

### Step 3 — Install the Connector on Each Node

SSH into each node and run the following:

```bash
cd ~/is-server

# Extract the archive
tar -xvzf mysql-connector-j-<version>.tar.gz

# Copy the JAR into the WSO2 IS library directory
cp mysql-connector-j-<version>/mysql-connector-j-<version>.jar \
  ~/is-server/wso2is/repository/components/lib/

# Remove the archive and extracted folder
rm -rf mysql-connector-j-<version> mysql-connector-j-<version>.tar.gz
```

| Command | Purpose |
|---------|---------|
| `tar -xvzf` | Extracts the compressed archive |
| `cp ... /lib/` | Places the JAR where WSO2 IS can load it at startup |
| `rm -rf` | Cleans up extracted files to keep the directory tidy |

**Verify the connector is in place:**
```bash
ls ~/is-server/wso2is/repository/components/lib/ | grep mysql
```

Expected output:
```
mysql-connector-j-<version>.jar
```

---

## Installation Checklist

Confirm the following before moving to the database configuration section:

| Checkpoint | Expected State |
|------------|----------------|
| WSO2 IS package transferred | Present in `~/is-server/` on both nodes |
| Package extracted | `~/is-server/wso2is/` directory exists on both nodes |
| MySQL connector transferred | Connector archive received on both nodes |
| Connector JAR installed | Present in `~/is-server/wso2is/repository/components/lib/` |
| Temporary files removed | No leftover `.tar.gz` or extracted connector folders |
