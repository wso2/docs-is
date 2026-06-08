{% if product == "asgardeo" %}

<h1>Enable Customer Data Service <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div></h1>

!!! note

    The Customer Data Service is currently in **Preview**. Some features may be subject to changes in future releases.

The Customer Data Service is hidden behind Feature Preview while in Preview. Once you enable it for your organization, a new **Customer Data** entry appears in the left navigation pane.

## Enable from Feature Preview

1. Click on the user dropdown in the top right corner.
2. Select **Feature Preview**.
3. In the feature preview dialog, toggle **Customer Data Service** to **Enabled** and close the dialog.
4. **Customer Data** now appears in the left navigation pane.

![Enable Customer Data Service from Feature Preview]({{base_path}}/assets/img/guides/customer-data/feature-preview-cds-on.png){: width="auto" style="display: block; margin: 0;"}

## Disable Customer Data Service

To turn the feature off again

1. Click on the user dropdown in the top right corner.
2. Select **Feature Preview**.
3. Toggle **Customer Data Service** to **Disabled** and close the dialog.

The **Customer Data** entry is removed from the left navigation pane. Existing profile, attribute, and unification rule data is preserved while the feature is in Preview.

## Next steps

- Learn what a [Profile]({{base_path}}/guides/customer-data/concepts/profiles) is and how anonymous activity gets attached to a user.
- Review the [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) defined for your organization.
- Configure [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) that decide when two profiles should be merged.
{% endif %}
