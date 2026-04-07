---
template: templates/deployment-guide.html
read_time: 15 mins
---

Apply product, OS, and network-level hardening before directing production traffic to this deployment. On Kubernetes, also review pod security contexts, network policies, and RBAC rules as part of the hardening process.

!!! note "Before this step"
    WSO2 Identity Server is deployed and running (previous step complete). Hardening is the last configuration step before final verification.

{% include "../../deploy/security/security-guidelines/index.md" %}

!!! tip "Verify"
    Restart all pods (for example, with `kubectl rollout restart deployment/<name>`) and confirm a clean startup before proceeding to the deployment checklist.
