{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
{% set cd_name = "Customer Data Directory" if product_name == "WSO2 Identity Server" else "Customer Data Service" %}

# Manage unification rules

Unification rules tell the {{ cd_name }} when two profiles should be recognized as the same person and merged. Manage them from the **Customer Data** page in the console, under **Unification Rules**.

For a conceptual overview see [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules).

---

## View unification rules

{% set steps %}

1. From the console, go to **Customer Data** and select **Unification Rules**.
2. The list shows every rule defined for your organization, ordered by priority. The lowest priority number is evaluated first.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl '{{content.cds.baseUrl}}/cds/api/v1/unification-rules' \
      -H 'Authorization: Bearer <access_token>'
    ```

    The response is an array of the rules, including those a parent organization shares. The request needs the `internal_cds_unification_rule_view` scope.
{% else %}
{{ steps }}
{% endif %}

![Unification rules list]({{base_path}}/assets/img/guides/customer-data/unification-rules-list.png){: width="auto" style="display: block; margin: 0;"}

---

## Create a rule

{% set steps %}

1. Click **Add Unification Rule**.
2. Fill in:
    - **Rule name** — human-readable name.
    - **Attribute** — the profile attribute to match on. Select the scope (e.g. `Identity Attributes`) and the attribute (e.g. `emailaddress`).
    - **What this attribute holds** — the kind of value the attribute carries, such as **Email address** or **Name**. This decides how values are compared and how much a match counts. See [what the attribute holds]({{base_path}}/guides/customer-data/concepts/unification-rules).
    - **How it is matched** — **Exact** matches only the same value. Dates, phone numbers and unique identifiers are put in a standard form first, so `ABC123` and `abc123` match as unique identifiers; names, email addresses and locations must be identical character for character. **Tolerant** also matches typos and spelling variations, so it finds duplicates exact matching misses, and sends more matches for an administrator to confirm.
    - **Priority** — lower numbers are evaluated first.
    - **Enable this rule immediately** — select this option to apply the rule when you create it.
3. Click **Create Rule**.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X POST '{{content.cds.baseUrl}}/cds/api/v1/unification-rules' \
      -H 'Authorization: Bearer <access_token>' \
      -H 'Content-Type: application/json' \
      -d '{
        "rule_name": "Email",
        "property_name": "identity_attributes.emailaddress",
        "attribute_type": "EMAIL",
        "unification_method": "deterministic",
        "priority": 1,
        "is_active": true
      }'
    ```

    | Field | Console |
    |---|---|
    | `rule_name` | **Rule name**. It cannot be changed later. |
    | `property_name` | **Attribute**, written `<scope>.<attribute>`. |
    | `attribute_type` | **What this attribute holds**: `PRIMITIVE_EXACT`, `FUZZY_STRING`, `NAME`, `EMAIL`, `PHONE`, `LOCATION`, `DATE` or `UNIQUE_ID`. |
    | `unification_method` | **How it is matched**: `deterministic` for **Exact**, `fuzzy` for **Tolerant**. |
    | `priority` | **Priority**. |
    | `is_active` | **Enable this rule immediately**. |

    The request needs the `internal_cds_unification_rule_create` scope.
{% else %}
{{ steps }}
{% endif %}

!!! note
    **Tolerant** is offered only for attribute kinds where it makes sense — names, email addresses, phone numbers, locations and other free text. Unique identifiers and dates are always compared exactly.

{% if product_name == "WSO2 Identity Server" %}
!!! note
    In {{ product_name }}, **Tolerant** matching is available only when it is turned on for the {{ cd_name }} deployment. It is off by default. While it is off, tolerant rules cannot be created and existing ones are evaluated as **Exact**. See [Configure tolerant matching]({{base_path}}/guides/customer-data/guides/configure-tolerant-matching).
{% endif %}

![Unification Rules]({{base_path}}/assets/img/guides/customer-data/unification-rules.png){: width="auto" style="display: block; margin: 0;"}

## Reorder a rule

{% set steps %}

Use the up and down arrows in the **Priority** column to change the order in which rules are evaluated.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X PATCH '{{content.cds.baseUrl}}/cds/api/v1/unification-rules/<rule_id>' \
      -H 'Authorization: Bearer <access_token>' \
      -H 'Content-Type: application/json' \
      -d '{ "priority": 2 }'
    ```

    The request needs the `internal_cds_unification_rule_update` scope.
{% else %}
{{ steps }}
{% endif %}

Reordering a rule does **not** retroactively merge or un-merge existing profiles — it only affects future unification runs.

---

## Disable a rule

{% set steps %}

Turn off the toggle of the rule in the list and confirm. The rule is skipped during evaluation but stays in the list and keeps its priority.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X PATCH '{{content.cds.baseUrl}}/cds/api/v1/unification-rules/<rule_id>' \
      -H 'Authorization: Bearer <access_token>' \
      -H 'Content-Type: application/json' \
      -d '{ "is_active": false }'
    ```

    The rule is skipped during evaluation but stays in the list and keeps its priority. Send `true` to turn it on again. The request needs the `internal_cds_unification_rule_update` scope.
{% else %}
{{ steps }}
{% endif %}

---

## Delete a rule

{% set steps %}

1. Click the delete icon of the rule in the list.
2. Confirm the deletion.

{% endset %}
{% if product_name == "WSO2 Identity Server" %}
=== "Console"

    {{ steps | indent(4) }}

=== "API"

    ```bash
    curl -X DELETE '{{content.cds.baseUrl}}/cds/api/v1/unification-rules/<rule_id>' \
      -H 'Authorization: Bearer <access_token>'
    ```

    The request needs the `internal_cds_unification_rule_delete` scope.
{% else %}
{{ steps }}
{% endif %}

Existing merges already recorded under this rule are not reversed.

---

## Related

- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — concepts and field reference.
- [Configure matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) — how high a match has to score before profiles are unified.
- [Review profile matches]({{base_path}}/guides/customer-data/guides/review-profile-matches) — decide on pairs the service held back.
- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) — the attribute set rules can match on.
{% endif %}
