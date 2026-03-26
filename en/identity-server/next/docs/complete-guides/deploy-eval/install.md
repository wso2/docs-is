---
template: templates/complete-guide.html
read_time: 10 mins
---

Install WSO2 Identity Server on your evaluation machine. The embedded H2 database ships pre-configured — no external database setup is required for this path.

!!! note "Before this step"
    Confirm Java 11, 17, or 21 is installed and `JAVA_HOME` is set. Run `java -version` to verify.

{% include "../../deploy/get-started/install.md" %}

!!! tip "Verify"
    Run `<IS_HOME>/bin/wso2server.sh --version` (Linux/macOS) or `<IS_HOME>\bin\wso2server.bat --version` (Windows). The version string should display without errors.
