---
template: templates/deployment-guide.html
read_time: 15 mins
---

Configure the mechanism that detects a primary region failure and redirects traffic to the standby region. Failover can be automatic (via a global load balancer health check) or manual (via a DNS update) — choose the approach that matches your target recovery time and operational capabilities.

!!! note "Before this step"
    Database replication is running and verified (previous step complete). Regional load balancers are in place in all regions.

{% include "../../../../../includes/complete-guides/deploy-dr/configure-failover.md" %}

!!! tip "Verify"
    Perform a planned failover test: stop the primary region's nodes and confirm that traffic routes to the standby region within your target time. Verify that authentication flows complete against the standby. Restore the primary and confirm traffic returns to it.
