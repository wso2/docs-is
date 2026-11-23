{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
{% set cd_name = "Customer Data Directory" if product_name == "WSO2 Identity Server" else "Customer Data Service" %}
{% set cd_lower = "Customer Data Directory" if product_name == "WSO2 Identity Server" else "customer data service" %}

<h1>Enable {{ cd_lower }}</h1>

The {{ cd_name }} is disabled by default. Enable it for your organization from the **Customer Data** page in the console.

{% if product_name == "WSO2 Identity Server" %}
!!! note "Before you begin"
    The {{ cd_name }} has to be deployed and connected to {{ product_name }}.

Enabling the {{ cd_name }} for an organization also creates an application named **Customer Data Service** in it, through which the service calls {{ product_name }} for that organization. The application cannot be edited or deleted.
{% endif %}

## Enable {{ cd_lower }}

1. On the console, go to **Customer Data** in the left navigation pane.
2. Turn on the **Enable Customer Data Service** toggle.

Once enabled, the page shows the profiles collected for your organization, along with the **Profile Attributes** and **Unification Rules** configurations.

![Enable Customer Data Service]({{base_path}}/assets/img/guides/customer-data/enable-cds-toggle.png){: width="auto" style="display: block; margin: 0;"}

## Disable {{ cd_lower }}

To turn the feature off again,

1. On the console, go to **Customer Data** in the left navigation pane.
2. Turn off the **Enable Customer Data Service** toggle.

Existing profile, attribute, and unification rule data is preserved while the feature is disabled.

## Next steps

- Learn what a [Profile]({{base_path}}/guides/customer-data/concepts/profiles) is and how anonymous activity gets attached to a user.
- Review the [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) defined for your organization.
- Configure [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) that decide when two profiles should be merged.
{% endif %}
