---
template: templates/deployment-guide.html
read_time: 15 mins
---

Point each regional cluster at an external RDBMS. You will configure cross-region database replication in the next step — this step establishes the connection configuration that replication will build on.

!!! note "Before this step"
    An external RDBMS is running in each region. You have database credentials and the JDBC driver JAR ready for each region's database server.

{% include "../../../../../includes/deploy/configure/databases/clustering.md" %}

!!! tip "Verify"
    Start one node per region temporarily. Confirm no JDBC connection errors appear in `<IS_HOME>/repository/logs/wso2carbon.log`. Stop the servers before continuing.
