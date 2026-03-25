---
template: templates/complete-guide.html
read_time: 10 mins
---

Create separate keystores for token signing, data encryption, and TLS. Mount these into your pods as Kubernetes Secrets — never bake keystore files into container images.

!!! note "Before this step"
    TLS is configured (previous step complete). The JDK `keytool` utility is available to generate keystores locally before mounting them as Secrets.

{% include "../../../../../includes/deploy/security/keystores/index.md" %}

!!! tip "Verify"
    After deploying with the new keystores, check pod logs for any `KeyStore` or `KeyManager` errors. A clean startup confirms the keystores mounted and loaded correctly.
