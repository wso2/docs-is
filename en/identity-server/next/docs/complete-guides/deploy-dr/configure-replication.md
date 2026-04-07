---
template: templates/deployment-guide.html
read_time: 20 mins
---

Configure your RDBMS to replicate identity data from the primary region to standby regions. WSO2 Identity Server stores all persistent state in the database, so replication at the database layer is the foundation of any disaster recovery strategy.

!!! note "Before this step"
    Database connections are configured and verified on all regional nodes (previous step complete). You have administrative access to the database servers in all regions.

{% include "../../../../../includes/complete-guides/deploy-dr/configure-replication.md" %}

!!! tip "Verify"
    Write a test record to the primary database and confirm it appears on the standby within your target replication lag. Most RDBMS platforms provide a replication status view or command — confirm replication lag is within acceptable limits before continuing.
