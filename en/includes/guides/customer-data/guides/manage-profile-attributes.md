{% if product == "asgardeo" %}

# Manage profile attributes

Profile attributes control which fields can be stored on a profile and how they behave. Manage them from the **Customer Data** page in the console, under **Profile Attributes**.

For a conceptual overview of attribute types, mutability, and merge strategies see [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes).

---

## View profile attributes

1. From the console, go to **Customer Data** and select **Profile Attributes**.
2. The list shows every attribute defined for your organization, each tagged with its scope.

Attributes sourced from {{ product_name }} claims appear in the **Identity Attributes** section and are managed by the system — their type and mutability are read-only.

![Profile Attribute View]({{base_path}}/assets/img/guides/customer-data/profile-attribute-view.png){: width="auto" style="display: block; margin: 0;"}

---

## Add an attribute

1. Click **Add Profile Attribute**.
2. In the **General Details** step, fill in:
    - **Scope** — `Traits` or `Application Data`.
    - **Application** — required for `Application Data` attributes. Select the application the attribute belongs to.
    - **Attribute name** — the name of the attribute (e.g. `preferred_language`). The scope prefix is added automatically.
    - **Display name** — optional, human-readable label.
    - **Description** — optional, a short description of the attribute.
3. Click **Next** and, in the **Type & Configuration** step, fill in:
    - **Value type** — see [supported value types]({{base_path}}/guides/customer-data/concepts/profile-attributes#supported-value-types).
    - **Mutability** — controls whether the value can be changed once set.
    - **Allow multiple values** — select if the attribute holds an array of values. Required when the merge strategy is `Combine`.
    - **Merge strategy** — `Overwrite` or `Combine`. Choose `Combine` for attributes where both pre- and post-merge values should be retained (e.g. interest tags).
4. Click **Finish**.

![Scopes]({{base_path}}/assets/img/guides/customer-data/scopes.gif){: width="auto" style="display: block; margin: 0;"}

---

## Edit an attribute

1. Click the edit icon of the attribute in the list.
2. Update the fields you want to change.
3. Click **Update**.

Attributes synced from {{ product_name }} cannot be edited from here — change the corresponding claim in {{ product_name }} and the attribute set will reflect it automatically.

---

## Delete an attribute

1. Click the delete icon of the attribute in the list.
2. Confirm the deletion.

Existing profile data stored under the attribute is dropped.

---

## What happens when you change `merge_strategy`

`merge_strategy` is applied on **future** unification runs only. Existing master profiles are not re-merged when you change the strategy.

If you switch a single-valued attribute to `combine`, also select **Allow multiple values** — otherwise the merge will fall back to `overwrite`.

---

## Related

- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) — concepts and field reference.
- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — rules match on the attributes defined here.
{% endif %}
