---
template: templates/deployment-guide.html
read_time: 10 mins
---

Enable HTTPS on the WSO2 Identity Server transport layer. In Kubernetes deployments, TLS is typically terminated at the Ingress controller, but WSO2 Identity Server still requires its own TLS configuration for inter-service communication and the management Console.

!!! note "Before this step"
    TLS certificates are available as Kubernetes Secrets or in a secrets manager your deployment can access. The hostname step is complete.

{% include "../../deploy/security/configure-transport-level-security.md" %}

!!! tip "Verify"
    After deploying, run `kubectl exec -it <pod-name> -- openssl s_client -connect localhost:9443 -brief 2>/dev/null | head -3`. The certificate CN or SAN should match the configured hostname.
