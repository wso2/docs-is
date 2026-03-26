---
template: templates/complete-guide.html
read_time: 15 mins
---

Apply product, OS, and network-level security hardening before directing production traffic to this cluster. These settings reduce the attack surface and are required by most compliance frameworks including SOC 2, ISO 27001, and PCI-DSS.

!!! note "Before this step"
    The cluster is functionally complete — all previous steps are done and verified. Hardening is the last configuration step before final verification.

{% include "../../deploy/security/security-guidelines/index.md" %}

!!! tip "Verify"
    Restart all nodes after applying hardening settings and confirm a clean startup in `wso2carbon.log`. The deployment checklist in the next step covers the key hardening items in detail.
