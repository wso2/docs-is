---
template: templates/deployment-guide.html
read_time: 10 mins
---

Install WSO2 Identity Server on each node in each region. Every node across all regions must run the same version.

!!! note "Before this step"
    Java 11, 17, or 21 is installed and `JAVA_HOME` is set on each node in each region. Run `java -version` to confirm.

{% include "../../deploy/get-started/install.md" %}

!!! tip "Verify"
    On each node in each region, run `<IS_HOME>/bin/wso2server.sh --version`. The same version string must display on all nodes across all regions.
