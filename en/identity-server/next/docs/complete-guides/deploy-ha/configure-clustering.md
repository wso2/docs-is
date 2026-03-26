---
template: templates/complete-guide.html
read_time: 15 mins
---

Enable Hazelcast clustering so all nodes share session data and synchronize cache invalidation. Without clustering, a user authenticated on one node is unknown to other nodes, causing authentication errors behind the load balancer.

!!! note "Before this step"
    All nodes have identical configuration through the previous steps. TCP port 5701 (Hazelcast default) is open between all nodes.

{% include "../../deploy/configure-hazelcast.md" %}

!!! tip "Verify"
    Start all nodes. In each node's `wso2carbon.log`, look for a line matching `Members [N] {` where N equals your node count and all node IP addresses are listed.
