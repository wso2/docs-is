---
template: templates/deployment-guide.html
read_time: 5 mins
---

Set the production hostname on every node in every region. Each region typically uses a region-specific hostname (for example, `is-us.example.com`) alongside a global hostname that resolves to the active region.

!!! note "Before this step"
    DNS records for your regional and global hostnames are configured. TLS certificates covering those hostnames are ready.

{% include "../../../../../includes/deploy/change-the-hostname.md" %}

!!! tip "Verify"
    Run `grep 'hostname' <IS_HOME>/repository/conf/deployment.toml` on each node. The value should match the region-specific hostname for that node.
