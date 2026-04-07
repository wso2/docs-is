---
template: templates/deployment-guide.html
read_time: 10 mins
---

Enable HTTPS on the WSO2 Identity Server transport layer using your production TLS certificate. Without this step, all client-to-server traffic passes in plain text and browser security warnings prevent users from accessing the Console.

!!! note "Before this step"
    Your TLS certificate (PEM or JKS) for the production hostname is available. The hostname configuration step is complete.

{% include "../../deploy/security/configure-transport-level-security.md" %}

!!! tip "Verify"
    Start one node temporarily. Run `openssl s_client -connect <hostname>:9443 -brief 2>/dev/null | head -5` to confirm the certificate CN or SAN matches your hostname. Stop the server before continuing.
