# Role management

{{ product_name }} supports role management through different versions of the SCIM2 Roles API.

!!! note
    {{ product_name }} deprecated the `SCIM 2.0 Roles API (v2)` API.

## Roles API (V3)

The SCIM2 Roles V3 API introduces a permission model that separates role metadata management and role assignment operations. This allows administrators to delegate responsibilities more precisely—for example, allowing one set of users to create and edit roles, while another manages user and group assignments.

!!! note
    You can't register `SCIM2 Roles V1/V2 API` and `SCIM2 Roles V3 API` under the same application. Before you register the `SCIM2 Roles V3 API`, remove the `SCIM2 Roles V1/V2 API` resource.

**Key changes in V3:**

- The `internal_role_mgt_update` permission handled both role metadata updates and role assignments. V3 splits these operations as below:

  - `internal_role_mgt_meta_update`: for metadata updates.

  - `internal_role_mgt_users_update`: for user assignments.

  - `internal_role_mgt_groups_update`: for group assignments.

- Console roles with permissions `Roles` lose assignment privileges under V3. To keep role assignment capabilities, update these roles to include `Role Assignments` permissions.

### Register SCIM2 Roles V1/V2 API under an application

1. If you have registered `SCIM2 Roles V1/V2 API` resource already, remove it by clicking on the bin button next to the `SCIM2 Roles V1/V2 API`.
2. Add `SCIM2 Roles V3 API` by following this [API Authorization with Role Based Access Control guide]({{base_path}}/guides/authorization/api-authorization/api-authorization).
3. Update existing application role with the `SCIM2 Roles V3 API` permissions by following this [Edit permissions of a role guide]({{base_path}}/guides/users/manage-roles/#edit-permissions-of-a-role).
