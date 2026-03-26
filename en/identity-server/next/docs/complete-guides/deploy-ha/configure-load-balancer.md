---
template: templates/complete-guide.html
read_time: 10 mins
---

Front the cluster with a load balancer to distribute client traffic across nodes and provide transparent failover. The load balancer must preserve session affinity for the WSO2 Identity Server management Console; the authentication APIs are stateless and do not require it.

!!! note "Before this step"
    All WSO2 Identity Server cluster nodes are running. Hazelcast clustering shows all nodes in the member list. Port 9443 is reachable on each node from the load balancer.

{% include "../../deploy/front-with-the-nginx-load-balancer.md" %}

!!! tip "Verify"
    Run `curl -k -o /dev/null -s -w "%{http_code}" https://<load-balancer-hostname>/console`. The response should be `200`.
