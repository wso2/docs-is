---
template: templates/deployment-guide.html
read_time: 5 mins
---

Set the production hostname on every node. TLS certificates, OAuth redirect URLs, and session cookies all resolve against this value — leaving it as `localhost` causes authentication failures in production.

!!! note "Before this step"
    DNS A records for your production hostname point to the load balancer IP address. Your TLS certificate covers this hostname.

{% include "../../../../../includes/deploy/change-the-hostname.md" %}

!!! tip "Verify"
    Run `grep 'hostname' <IS_HOME>/repository/conf/deployment.toml` on each node. The value should match your production hostname exactly.
