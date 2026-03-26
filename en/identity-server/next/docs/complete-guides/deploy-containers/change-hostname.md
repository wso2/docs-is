---
template: templates/complete-guide.html
read_time: 5 mins
---

Set the production hostname that WSO2 Identity Server advertises to clients. In Kubernetes, this is the hostname exposed via your Ingress or Route resource — it must match the hostname in your TLS certificate and DNS records.

!!! note "Before this step"
    DNS records for the production hostname point to your cluster's ingress IP address or load balancer. The TLS certificate for this hostname is available.

{% include "../../../../../includes/deploy/change-the-hostname.md" %}

!!! tip "Verify"
    Confirm `deployment.toml` inside your ConfigMap or mounted configuration file contains the correct `hostname` value before proceeding.
