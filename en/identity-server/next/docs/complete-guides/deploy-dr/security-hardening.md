---
template: templates/deployment-guide.html
read_time: 15 mins
---

Apply product, OS, and network-level hardening on every node in every region before directing production traffic to this deployment.

!!! note "Before this step"
    Regional failover is configured and tested. Hardening is the last configuration step before final verification.

{% include "../../deploy/security/security-guidelines/index.md" %}

!!! tip "Verify"
    Restart all nodes across all regions and confirm a clean startup in `wso2carbon.log`. Then proceed to the deployment checklist.
