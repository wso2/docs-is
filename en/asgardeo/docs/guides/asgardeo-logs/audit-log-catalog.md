# Audit log catalog

The following are the audit logs generated in Asgardeo, grouped by category.

## Actions

| Audit Log | Description |
|---|---|
| `activate-action` | An action was activated. |
| `add-action` | A new action was added. |
| `delete-action` | An action was deleted. |
| `update-action` | An action was updated. |
| `deactivate-action` | An action was deactivated. |

## Application management

| Audit Log | Description |
|---|---|
| `create-application` | A new application was created. |
| `delete-application` | An application was deleted. |
| `update-application` | An application was updated. |
| `create-oauth-application` | A new OAuth application was created. |

## Application sharing

| Audit Log | Description |
|---|---|
| `processing-share-application-with-all-orgs` | An application was shared with all organizations. |
| `processing-unshare-application-from-all-orgs` | An application was unshared from all organizations. |
| `processing-unshare-application-from-selected-orgs` | An application was unshared from selected organizations. |
| `processing-share-application-with-selected-orgs` | An application was shared with selected organizations. |

## Connections

| Audit Log | Description |
|---|---|
| `Add-IDP` | A new connection was added. |
| `Delete-IDP` | A connection was deleted. |
| `Update-IDP` | A connection was updated. |

## Flow management

| Audit Log | Description |
|---|---|
| `update-flow-config-INVITED_USER_REGISTRATION` | The invited user registration flow configuration was updated. |
| `update-flow-PASSWORD_RECOVERY` | The password recovery flow was updated. |
| `update-flow-config-PASSWORD_RECOVERY` | The password recovery flow configuration was updated. |
| `update-flow-INVITED_USER_REGISTRATION` | The invited user registration flow was updated. |
| `update-flow-config-REGISTRATION` | The registration flow configuration was updated. |
| `update-flow-REGISTRATION` | The registration flow was updated. |

## Organization management

| Audit Log | Description |
|---|---|
| `add-organization` | A new organization was added. |
| `delete-organization` | An organization was deleted. |
| `update-organization` | An organization was updated. |

## Role management

| Audit Log | Description |
|---|---|
| `add-role` | A new role was created. |
| `update-users-of-role` | Users of a role were updated. |
| `delete-role` | A role was deleted. |
| `get-users-of-role` | Users of a role were retrieved. |
| `update-groups-of-role` | Groups of a role were updated. |
| `update-permissions-of-role` | Permissions of a role were updated. |
| `update-role-name` | A role name was updated. |
| `Update users list of role by id` | Users list of a role was updated by ID. |

## Session Management

| Audit Log | Description |
|---|---|
| `TerminateSession` | A user session was terminated. |

## System operations

| Audit Log | Description |
|---|---|
| `Kill-All-Agents-In-User-Store` | All agents in a user store were terminated. |
| `Kill-All-Agents-In-Tenant` | All agents in a tenant were terminated. |
| `resource-creation-via-impersonation` | A resource was created via impersonation. |

## Tenant management

| Audit Log | Description |
|---|---|
| `Add-Tenant` | A new tenant was added. |

## Token management

| Audit Log | Description |
|---|---|
| `Generate-Access-Token-For-Remote-User-Store` | An access token was generated for a remote user store. |
| `issue-access-token` | An access token was issued. |
| `ISSUE-SYSTEM-TOKEN` | A system token was issued. |
| `PostTokenIssue` | A token was issued via the password grant. |
| `Revoke-All-Access-Tokens-For-Remote-User-Store` | All access tokens for a remote user store were revoked. |
| `validate-scope` | OAuth scope validation was performed. |

## User management

| Audit Log | Description |
|---|---|
| `add-group` | A new group was added. |
| `add-user` | A new user was added. |
| `credential-update-by-administrator` | User credentials were updated by an administrator. |
| `credential-update-by-user` | User credentials were updated by the user. |
| `delete-group` | A group was deleted. |
| `delete-user` | A user was deleted. |
| `delete-user-claim-value` | A user claim value was deleted. |
| `set-user-claim-value` | A user claim value was set. |
| `set-user-claim-values` | Multiple user claim values were set. |
| `update-group-name` | A group name was updated. |
| `Account Enable` | A user account was enabled. |
| `Account Disable` | A user account was disabled. |
| `create-federated-user-association` | A federated user association was created. |
