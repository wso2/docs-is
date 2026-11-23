{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

# Manage profile attributes

Profile attributes control which fields can be stored on a profile and how they behave. Manage them from the **Customer Data** page in the console, under **Profile Attributes**.

For a conceptual overview of attribute types, mutability, and merge strategies see [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes).

---

## View profile attributes

{% set steps %}

1. From the console, go to **Customer Data** and select **Profile Attributes**.
2. The list shows every attribute defined for your organization, each tagged with its scope.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl '{{content.cds.baseUrl}}/cds/api/v1/profile-schema' \
      -H 'Authorization: Bearer <access_token>'
    ```

    The response holds the attributes of every scope. To get the attributes of one scope, call `GET /profile-schema/<scope>`, for example `/profile-schema/traits`. The request needs the `internal_cds_profile_schema_view` scope.
{% else %}
{{ steps }}
{% endif %}

Attributes sourced from {{ product_name }} claims appear in the **Identity Attributes** section and are managed by the system — their type and mutability are read-only.

![Profile Attribute View]({{base_path}}/assets/img/guides/customer-data/profile-attribute-view.png){: width="auto" style="display: block; margin: 0;"}

---

## Add an attribute

{% set steps %}

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
    - **Merge strategy** — `Overwrite` or `Combine`. Choose `Combine` for attributes where both pre- and post-merge values should be kept (e.g. interest tags).
4. Click **Finish**.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X POST '{{content.cds.baseUrl}}/cds/api/v1/profile-schema/traits' \
      -H 'Authorization: Bearer <access_token>' \
      -H 'Content-Type: application/json' \
      -d '[
        {
          "attribute_name": "traits.interests",
          "display_name": "Interests",
          "value_type": "string",
          "multi_valued": true,
          "merge_strategy": "combine"
        }
      ]'
    ```

    The body is an array, so one request can add several attributes. For an application data attribute, post to `/profile-schema/application_data` and set `application_identifier` to the application. `mutability` defaults to `readWrite`. The request needs the `internal_cds_profile_schema_create` scope.
{% else %}
{{ steps }}
{% endif %}

![Scopes]({{base_path}}/assets/img/guides/customer-data/scopes.gif){: width="auto" style="display: block; margin: 0;"}

---

## Edit an attribute

{% set steps %}

1. Click the edit icon of the attribute in the list.
2. Update the fields you want to change.
3. Click **Update**.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X PUT '{{content.cds.baseUrl}}/cds/api/v1/profile-schema/traits/<attribute_id>' \
      -H 'Authorization: Bearer <access_token>' \
      -H 'Content-Type: application/json' \
      -d '{ "display_name": "Customer interests" }'
    ```

    Only the fields in the body change. Take the `attribute_id` from the list of attributes. The request needs the `internal_cds_profile_schema_update` scope.
{% else %}
{{ steps }}
{% endif %}

Attributes synced from {{ product_name }} cannot be edited from here — change the corresponding claim in {{ product_name }} and the attribute set will reflect it automatically.

---

## Delete an attribute

{% set steps %}

1. Click the delete icon of the attribute in the list.
2. Confirm the deletion.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X DELETE '{{content.cds.baseUrl}}/cds/api/v1/profile-schema/traits/<attribute_id>' \
      -H 'Authorization: Bearer <access_token>'
    ```

    A sub-attribute cannot be deleted while it is part of a complex attribute. The request needs the `internal_cds_profile_schema_delete` scope.
{% else %}
{{ steps }}
{% endif %}

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
