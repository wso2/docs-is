{% if product == "asgardeo" %}

# Manage profile attributes

Profile attributes control which fields can be stored on a profile and how they behave. Manage them from **Customer Data** → **Profile Attributes** in the console.

For a conceptual overview of attribute types, mutability, and merge strategies see [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes).

---

## View profile attributes

1. From the console, go to **Customer Data** → **Profile Attributes**.
2. The list shows every attribute defined for your organization, grouped by scope (`identity_attributes`, `traits`, `application_data`).

Attributes sourced from {{ product_name }} claims appear under `identity_attributes` and are managed by the system — their type and mutability are read-only.

![Profile Attribute View]({{base_path}}/assets/img/guides/customer-data/profile-attribute-view.png){: width="auto" style="display: block; margin: 0;"}

---

## Add an attribute

1. Click **New attribute**.
2. Fill in:
    - **Attribute name** — including the scope prefix (e.g. `traits.preferred_language`).
    - **Display name** — optional, human-readable label.
    - **Value type** — see [supported value types]({{base_path}}/guides/customer-data/concepts/profile-attributes#supported-value-types).
    - **Mutability** — controls whether the value can be changed once set.
    - **Merge strategy** — `overwrite` or `combine`. Choose `combine` for attributes where both pre- and post-merge values should be retained (e.g. interest tags).
    - **Multi-valued** — required when using `combine`.
    - **Canonical values** — optional, for enumerated string values.
    - **Application identifier** — required for `application_data` attributes.
3. Click **Save**.

![Scopes]({{base_path}}/assets/img/guides/customer-data/scopes.gif){: width="auto" style="display: block; margin: 0;"}

---

## Edit an attribute

1. Click an attribute in the list.
2. Update the fields you want to change.
3. Click **Save**.

Attributes synced from {{ product_name }} cannot be edited from here — change the corresponding claim in {{ product_name }} and the attribute set will reflect it automatically.

---

## Delete an attribute

1. Click the attribute, then click **Delete**.
2. Confirm the deletion.

Existing profile data stored under the attribute is dropped.

---

## What happens when you change `merge_strategy`

`merge_strategy` is applied on **future** unification runs only. Existing master profiles are not re-merged when you change the strategy.

If you switch a single-valued attribute to `combine`, also set **Multi-valued** to `true` — otherwise the merge will fall back to `overwrite`.

---

## Related

- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) — concepts and field reference.
- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — rules match on the attributes defined here.
{% endif %}
