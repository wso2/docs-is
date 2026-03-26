---
template: templates/complete-guide.html
read_time: 10 mins
---

Deploy a load balancer in each region to front that region's cluster. You also need a global load balancer or DNS-based routing policy to direct traffic to the active region — this step covers the per-region configuration.

!!! note "Before this step"
    All nodes within each region are running and show the correct Hazelcast member count. Port 9443 is reachable on each node from its regional load balancer.

{% include "../../deploy/front-with-the-nginx-load-balancer.md" %}

!!! tip "Verify"
    Run `curl -k -o /dev/null -s -w "%{http_code}" https://<regional-hostname>/console` against each regional load balancer. Each should return `200`.
