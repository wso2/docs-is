---
template: templates/deployment-guide.html
read_time: 10 mins
---

Create separate keystores for token signing, data encryption, and TLS. Using the default `wso2carbon.jks` for all three purposes is a security risk — a compromised keystore affects signing, encryption, and transport security simultaneously.

!!! note "Before this step"
    TLS is configured (previous step complete). The JDK `keytool` utility is available on each node.

{% include "../../../../../includes/deploy/security/keystores/index.md" %}

!!! tip "Verify"
    Start one node temporarily. Check `wso2carbon.log` for any `KeyStore` or `KeyManager` errors. A clean startup confirms keystores are loaded correctly. Stop the server before continuing.
