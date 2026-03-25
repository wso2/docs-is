---
template: templates/complete-guide.html
read_time: 10 mins
---

Run the deployment checklist across all regions. Also confirm that database replication is active and that a failover test routes traffic to the secondary region as expected.

!!! note "Before this step"
    All previous steps are complete across all regions. All regional clusters are running with the correct Hazelcast member counts.

{% include "../../deploy/deployment-checklist.md" %}

!!! tip "Verify"
    Simulate a regional failure by stopping all nodes in the primary region. Confirm DNS or the global load balancer routes traffic to the secondary region and users can authenticate within your target recovery time.
