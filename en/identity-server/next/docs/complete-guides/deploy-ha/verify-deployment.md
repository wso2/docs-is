---
template: templates/complete-guide.html
read_time: 10 mins
---

Run the deployment checklist to confirm this cluster is production-ready. Work through each item and resolve any gaps before directing real user traffic to this deployment.

!!! note "Before this step"
    All previous steps are complete. All cluster nodes are running and confirmed in the Hazelcast member list.

{% include "../../deploy/deployment-checklist.md" %}

!!! tip "Verify"
    Complete a full authentication flow through the load balancer: sign in to `https://<hostname>/console` with admin credentials, then verify a user sign-in flow through a test application to confirm the end-to-end flow.
