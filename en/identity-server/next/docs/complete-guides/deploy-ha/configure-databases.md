---
template: templates/deployment-guide.html
read_time: 15 mins
---

Replace the embedded H2 database with an external RDBMS. In a clustered deployment, all nodes share the same external databases — the embedded H2 is node-local and cannot support multiple cluster members.

!!! note "Before this step"
    Your RDBMS is running and reachable from all cluster nodes. You have the JDBC driver JAR and database credentials ready.

{% include "../../../../../includes/deploy/configure/databases/clustering.md" %}

!!! tip "Verify"
    Start one node temporarily. In `<IS_HOME>/repository/logs/wso2carbon.log`, confirm no JDBC connection errors appear in the `DataSourceManager` entries. Stop the server before continuing to the next step.
