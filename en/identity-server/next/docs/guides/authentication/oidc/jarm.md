
{% set disable_jarm = "## Disable JARM

By default, JARM response modes are enabled in {{product_name}}.

To disable JARM, add the following configurations to the `deployment.toml` file of {{product_name}}:

```toml
[oauth.jarm]
enable = false
```" %}

{% include "../../../../../../includes/guides/authentication/oidc/jarm.md" %}