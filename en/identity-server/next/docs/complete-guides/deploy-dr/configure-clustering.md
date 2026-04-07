---
template: templates/deployment-guide.html
read_time: 15 mins
---

Enable Hazelcast clustering within each region. Nodes in the same region cluster together; cross-region coordination is handled at the database layer in the next step, not through Hazelcast.

!!! note "Before this step"
    All nodes within each region have identical configuration. TCP port 5701 is open between nodes within the same region.

{% include "../../deploy/configure-hazelcast.md" %}

!!! tip "Verify"
    Start all nodes in one region. In each node's `wso2carbon.log`, confirm a `Members [N] {` line where N equals the per-region node count and only that region's IP addresses are listed.
