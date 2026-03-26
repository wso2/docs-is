---
template: templates/complete-guide.html
read_time: 10 mins
---

Create separate keystores for token signing, data encryption, and TLS on every node. In a multi-region deployment, use the same signing and encryption keystores across all regions so tokens issued in one region are valid in another.

!!! note "Before this step"
    TLS is configured (previous step complete). The JDK `keytool` utility is available on each node.

{% include "../../../../../includes/deploy/security/keystores/index.md" %}

!!! tip "Verify"
    Start one node per region temporarily. Confirm no `KeyStore` or `KeyManager` errors appear in `wso2carbon.log`. Stop the servers before continuing.
