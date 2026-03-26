WSO2 Identity Server uses an external RDBMS for all persistent data. Cross-region
data replication is handled at the database level using your RDBMS vendor's native
replication or a third-party replication tool.

## Replication scope

Decide which data to replicate across regions based on your RTO and RPO requirements:

| Data type | Examples | Replication recommendation |
|---|---|---|
| Identity and entitlement data | Users, passwords, attributes, roles | Replicate for active-active; partition for active-passive |
| Configuration data | Applications, identity providers, policies | Replicate across all regions |
| Operational data | Sessions, OAuth 2.0 tokens, logs | Typically not replicated; generated per-region |

## Setting up database replication

Configure replication using your RDBMS vendor's tooling:

- **PostgreSQL** — Use streaming replication or logical replication.
- **MySQL / MariaDB** — Use MySQL Group Replication or binary log-based replication.
- **Oracle** — Use Oracle Data Guard or Oracle GoldenGate.
- **MSSQL** — Use Always On Availability Groups or transactional replication.

Refer to [Disaster recovery deployment patterns]({{base_path}}/deploy/disaster-recovery/disaster-recovery-deployment-patterns/)
and [Understanding disaster recovery]({{base_path}}/deploy/disaster-recovery/understanding-disaster-recovery/) for architecture decisions.

## Configure WSO2 Identity Server datasources

Point each regional WSO2 Identity Server cluster to its local (primary) database replica.
Configure the replicated database as a standby. In active-passive setups, update the
datasource configuration to point to the standby database during failover.

Update `deployment.toml` on each regional node:

```toml
[database.identity]
url = "jdbc:postgresql://<regional-db-host>:5432/wso2is"
username = "wso2isuser"
password = "wso2ispassword"
driver = "org.postgresql.Driver"
```
