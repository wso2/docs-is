---
template: templates/complete-guide.html
read_time: 10 mins
---

Enable HTTPS on the WSO2 Identity Server transport layer in each region. Apply the same TLS configuration on all nodes across all regions.

!!! note "Before this step"
    TLS certificates for regional and global hostnames are available. The hostname configuration step is complete on all nodes.

{% include "../../deploy/security/configure-transport-level-security.md" %}

!!! tip "Verify"
    On one node per region, run `openssl s_client -connect <regional-hostname>:9443 -brief 2>/dev/null | head -5`. The certificate CN or SAN should match the regional hostname.
