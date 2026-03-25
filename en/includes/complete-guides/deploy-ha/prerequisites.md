Before you begin, confirm that the following are in place:

**Compute**

- Two or more machines meeting the [system requirements]({{base_path}}/deploy/get-started/install/#system-requirements) (minimum 4 vCPUs, 4 GB RAM per node)
- Java Development Kit (JDK) 11, 17, or 21 installed on each node and set as `JAVA_HOME`

**Database**

- An external RDBMS: PostgreSQL, MySQL, Oracle, MSSQL, or MariaDB
- Database credentials and JDBC driver for your selected database

**Network**

- A load balancer (NGINX or a cloud-native load balancer)
- TLS certificates for the production hostname
- DNS A records pointing the production hostname to the load balancer

**Access**

- SSH or console access to all nodes
- Administrative access to the database server

!!! note
    If you are deploying for the first time, complete [Path A: Evaluation]({{base_path}}/complete-guides/deploy-eval/introduction/) first to familiarize yourself with WSO2 Identity Server.
