
{% set disable_jarm = "## Disable JARM

By default, JARM response modes are enabled in WSO2 Identity Server.

To disable JARM, add the following configurations to the `deployment.toml` file of WSO2 Identity Server:

```toml
[oauth.jarm]
enable = false
```" %}

{% include "../../../../../../includes/guides/authentication/oidc/jarm.md" %}