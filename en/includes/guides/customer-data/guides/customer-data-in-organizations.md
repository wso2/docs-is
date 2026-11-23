{% if product_name == "WSO2 Identity Server" and is_version > "7.2.0" %}

# Customer data in organizations

With [organizations]({{base_path}}/guides/organization-management/), a root organization serves business customers or partners through child organizations. The Customer Data Directory (CDD) gives each child organization its own profiles, while the root organization decides which child organizations use CDD and which profile attributes and unification rules they work with.

## Before you begin

- The CDD deployment has organization support turned on, with the following in `<CDD_HOME>/repository/conf/deployment.yaml`:

    ```yaml
    organization_management:
      enabled: true
    ```

- CDD is [enabled]({{base_path}}/guides/customer-data/enable-customer-data-service) in the root organization.

## What a child organization inherits

A child organization keeps its own profiles and review tasks. Everything else comes from the root organization, and is read-only in the child organization.

| | In a child organization |
|---|---|
| Profiles | Its own. A child organization's profiles are unified only with each other, never with the profiles of the root organization or of another child organization. |
| Review tasks | Its own. An administrator of the child organization reviews its matches. |
| Enablement | Follows the root organization. CDD is on in a child organization when it is on in the root organization and the [organization access](#choose-the-child-organizations-that-use-cdd) includes the child organization. |
| Identity attributes | Inherited from the root organization, as child organizations inherit its attributes in {{ product_name }}. They stay in sync through the root organization. |
| Traits and application data attributes | Only those the root organization [shares](#share-profile-attributes) with it. |
| Unification rules | Only those the root organization [shares](#share-unification-rules) with it. |
| Matching confidence | The [matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) settings of the root organization, including automatic unification. |
| Temporary profiles | Kept and cleaned up on the schedule of the root organization. |
| Consent categories | Those of the root organization. |
| Allowed origins | Those of the root organization. Its requests arrive under the path of the root organization. |

A child organization that is disabled or deleted in {{ product_name }} can no longer use CDD.

## Set up organizations

The root organization sets up its child organizations in the {{ product_name }} Console, or through the [CDD API]({{base_path}}/apis/customer-data-service-rest-api/) with an access token of the root organization.

### Sync the organization tree

CDD keeps its own copy of the organization tree, and needs it before you choose the child organizations that use CDD. Sync it once. After the first sync, {{ product_name }} sends CDD every child organization that is created, updated or deleted, so the tree stays current without another sync.

=== "Console"

    1. On the Console, go to **Customer Data** and select **Organization Access Settings**.
    2. Select **Sync organizations**.

    The sync runs in the background. When it completes, the page shows the organization access.

    ![Sync organizations]({{base_path}}/assets/img/guides/customer-data/organization-sync.png){: width="auto" style="display: block; margin: 0;"}

=== "API"

    ```bash
    curl -X POST "{{content.cds.baseUrl}}/cds/api/v1/organizations/sync" \
      -H "Authorization: Bearer <access_token>"
    ```

    The sync runs in the background. Check its state with `GET /organizations/sync-status`.

    The sync needs the `internal_cds_organization_update` scope, and the status `internal_cds_organization_view`.

If CDD was unreachable while organizations changed, sync again with the API.

### Choose the child organizations that use CDD

The organization access lists the child organizations that can use CDD. Until you set it, only the root organization uses CDD.

=== "Console"

    1. On the Console, go to **Customer Data** and select **Organization Access Settings**.
    2. Select who can use CDD besides the root organization:
        - **Do not allow other organizations to use Customer Data Service**
        - **Allow all organizations to use Customer Data Service**: every child organization, including those created later.
        - **Allow selected organizations to use Customer Data Service**
    3. If you allow selected organizations, select the checkbox of each child organization in the list. Select an organization to see its settings:
        - With **Allow its existing and future child organizations** selected, which is the default, the organizations below it can use CDD too, including those created later.
        - Clear it to allow the organization only.
    4. Select **Save**.

    ![Organization access]({{base_path}}/assets/img/guides/customer-data/organization-access.png){: width="auto" style="display: block; margin: 0;"}

=== "API"

    ```bash
    curl -X POST "{{content.cds.baseUrl}}/cds/api/v1/organizations/access-policies" \
      -H "Authorization: Bearer <access_token>" \
      -H "Content-Type: application/json" \
      -d '{
        "child_orgs": {
          "mode": "selected",
          "orgs": [
            { "org_id": "9b2e4c71-5d8a-4f3e-a6b0-2c7d1e8f4a95", "reach": "subtree" }
          ]
        }
      }'
    ```

    `child_orgs` decides which child organizations a policy reaches. Organization access, attribute sharing and rule sharing all use it.

    | `mode` | `reach` | Reaches |
    |---|---|---|
    | `all` | | Every child organization, including those created later. Leave `orgs` out. |
    | `selected` | `org` | The listed organization only. |
    | `selected` | `subtree` | The listed organization and every organization below it, including those created later. |

    A listed organization must be a direct child of the root organization. The root organization has at most one organization access policy: change it with `PUT /organizations/access-policies/{orgPolicyId}`, and remove it with `DELETE`. All three need the `internal_cds_organization_update` scope.

### Share profile attributes

Share each trait or application data attribute that child organizations need. Identity attributes are not shared: child organizations inherit them.

=== "Console"

    1. On the Console, go to **Customer Data** and select **Profile Attributes**.
    2. Select a trait or an application data attribute, and open its **Sharing** tab.
    3. Select how the attribute is shared:
        - **Do not share the attribute with any organization**
        - **Share the attribute with all organizations**: every child organization, including those created later.
        - **Share the attribute with selected organizations**: select the child organizations as you do for the [organization access](#choose-the-child-organizations-that-use-cdd). **Share with its existing and future child organizations** also shares it with the organizations below.
    4. Select **Save**.

    ![Share a profile attribute]({{base_path}}/assets/img/guides/customer-data/share-profile-attribute.png){: width="auto" style="display: block; margin: 0;"}

=== "API"

    ```bash
    curl -X POST "{{content.cds.baseUrl}}/cds/api/v1/profile-schema/traits/<attribute_id>/sharing-policies" \
      -H "Authorization: Bearer <access_token>" \
      -H "Content-Type: application/json" \
      -d '{ "child_orgs": { "mode": "all" } }'
    ```

    `child_orgs` takes the same values as for the [organization access](#choose-the-child-organizations-that-use-cdd). Sharing needs the `internal_cds_profile_schema_share_update` scope, and listing the policies of an attribute `internal_cds_profile_schema_share_view`.

- A complex attribute is shared with its sub-attributes, which cannot be shared alone.
- A child organization sees a shared attribute only while the organization access includes it.

### Share unification rules

Share each rule that child organizations should unify their profiles with.

=== "Console"

    1. On the Console, go to **Customer Data** and select **Unification Rules**.
    2. Select a rule, and open its **Sharing** tab.
    3. Select how the rule is shared, the same way as for a [profile attribute](#share-profile-attributes).
    4. Select **Save**.

    ![Share a unification rule]({{base_path}}/assets/img/guides/customer-data/share-unification-rule.png){: width="auto" style="display: block; margin: 0;"}

=== "API"

    ```bash
    curl -X POST "{{content.cds.baseUrl}}/cds/api/v1/unification-rules/<rule_id>/sharing-policies" \
      -H "Authorization: Bearer <access_token>" \
      -H "Content-Type: application/json" \
      -d '{ "child_orgs": { "mode": "all" } }'
    ```

    Sharing needs the `internal_cds_unification_rule_share_update` scope, and listing the policies of a rule `internal_cds_unification_rule_share_view`.

A shared rule runs in a child organization only when the child organization sees its attribute. A rule on an identity attribute always does. A rule on a trait or on application data needs that attribute shared with the same child organizations; until it is, the rule is listed in the child organization as inactive because its attribute is missing.

In a child organization, shared rules keep the order the root organization gave them.

### Stop sharing

In the **Sharing** tab of the attribute or rule, select **Do not share the attribute with any organization** or **Do not share the rule with any organization**, and select **Save**. With the API, delete the sharing policy.

Child organizations stop seeing the attribute or rule straight away. Profiles already unified in a child organization stay unified.

## Use CDD in a child organization

Administrators of a child organization [switch to it]({{base_path}}/guides/organization-management/manage-organizations/#switch-to-an-organization) in the Console and go to **Customer Data**. They manage its profiles and review tasks there. Shared profile attributes and unification rules are labelled **Shared**, and identity attributes **Inherited**. They cannot change them.

Applications and administrators of a child organization call CDD under the path of the child organization inside the root organization:

```text
{{content.cds.baseUrl}}/o/<organization_id>/cds/api/v1
```

They use an access token issued for the child organization, carrying the `iam-cds` audience. See [Access organization APIs]({{base_path}}/apis/organization-apis/authentication/).

| Scope | Allows |
|---|---|
| `internal_org_cds_profile_view`, `internal_org_cds_profile_create`, `internal_org_cds_profile_update`, `internal_org_cds_profile_delete` | Reading and managing the child organization's profiles. |
| `internal_org_cds_profile_link` | Linking an anonymous profile to a user. |
| `internal_org_cds_identity_resolution_view`, `internal_org_cds_identity_resolution_update` | Listing and deciding on review tasks. |
| `internal_org_cds_profile_schema_view` | Reading the profile attributes it inherits and is shared. |
| `internal_org_cds_unification_rule_view` | Reading the rules shared with it. |
| `internal_org_cds_admin_config_view` | Reading the settings it takes from the root organization. |
| `internal_org_cds_consent_category_view` | Reading consent categories. |

A child organization cannot change settings, create or change profile attributes and unification rules, or share anything.

## Related

- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes)
- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules)
- [Organization management]({{base_path}}/guides/organization-management/)

{% endif %}
