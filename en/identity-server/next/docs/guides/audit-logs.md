{% set product_name = "WSO2 Identity Server" %}
{% set toml_config = "## Enable the V2 Audit Logs

To enable v2 audit logs in the WSO2 Identity Server, add the following configuration to the `deplyment.toml` file.

``` toml
[system.parameter]
enableV2AuditLogs=true
``` " %}

{% include "../../../../includes/guides/logging/audit-logs.md" %}