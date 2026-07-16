{% if product == "asgardeo" %}

<h1>Enable customer data service</h1>

The Customer Data Service is disabled by default. Enable it for your organization from the **Customer Data** page in the console.

## Enable Customer Data Service

1. On the console, go to **Customer Data** in the left navigation pane.
2. Turn on the **Enable Customer Data Service** toggle.

Once enabled, the page shows the profiles collected for your organization, along with the **Profile Attributes** and **Unification Rules** configurations.

![Enable Customer Data Service]({{base_path}}/assets/img/guides/customer-data/enable-cds-toggle.png){: width="auto" style="display: block; margin: 0;"}

## Disable Customer Data Service

To turn the feature off again,

1. On the console, go to **Customer Data** in the left navigation pane.
2. Turn off the **Enable Customer Data Service** toggle.

Existing profile, attribute, and unification rule data is preserved while the feature is disabled.

## Next steps

- Learn what a [Profile]({{base_path}}/guides/customer-data/concepts/profiles) is and how anonymous activity gets attached to a user.
- Review the [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) defined for your organization.
- Configure [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) that decide when two profiles should be merged.
{% endif %}
