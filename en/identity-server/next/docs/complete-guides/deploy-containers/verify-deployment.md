---
template: templates/complete-guide.html
read_time: 10 mins
---

Run the deployment checklist to confirm this container deployment is production-ready. Work through each item and resolve any gaps before directing real user traffic here.

!!! note "Before this step"
    The deployment is running and security hardening is applied (previous step complete).

{% include "../../deploy/deployment-checklist.md" %}

!!! tip "Verify"
    Complete a full end-to-end authentication flow: sign in to `https://<hostname>/console` with admin credentials, then test a user sign-in through a connected application to confirm the deployment is working correctly.
