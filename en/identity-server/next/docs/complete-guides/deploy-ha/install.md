---
template: templates/complete-guide.html
read_time: 10 mins
---

Install WSO2 Identity Server on each cluster node. Repeat these steps on every node — all nodes must run the same version.

!!! note "Before this step"
    Java 11, 17, or 21 is installed and `JAVA_HOME` is set on each node. Run `java -version` to confirm.

{% include "../../deploy/get-started/install.md" %}

!!! tip "Verify"
    On each node, run `<IS_HOME>/bin/wso2server.sh --version`. The same version string should display on all nodes.
