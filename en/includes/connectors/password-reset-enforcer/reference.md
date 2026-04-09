# Reference

## Event handler configuration

Password Reset Enforcer uses an event handler named `passwordExpiry`.

```toml
[[event_handler]]
name = "passwordExpiry"
subscriptions = [
  "POST_UPDATE_CREDENTIAL",
  "POST_UPDATE_CREDENTIAL_BY_ADMIN",
  "POST_ADD_USER"
]

[event_handler.properties]
passwordExpiryInDays = "30"
enableDataPublishing = false
priorReminderTimeInDays = "0"
```

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>passwordExpiryInDays</code></td>
    <td>The number of days after which a user's password expires.</td>
  </tr>
  <tr>
    <td><code>priorReminderTimeInDays</code></td>
    <td>The reminder period in days before expiry.</td>
  </tr>
  <tr>
    <td><code>enableDataPublishing</code></td>
    <td>Enables publishing password expiry data for analytics use cases.</td>
  </tr>
</table>

## Password history

To prevent users from reusing previous passwords, configure **Password History Count**.

For instructions, see [Password validation]({{base_path}}/guides/account-configurations/login-security/password-validation/#password-history-count).

## Enforcement scope

When you enable **Password Expiration** under **Login & Registration** > **Password Validation**, use **Enforce password expiry for** to control where password expiry enforcement applies.

- **All application login flows** (default): Applies password expiry enforcement for all users upon sign-in. For applications that include **Password Reset Enforcer** in the login flow, enforcement happens inline at the configured step and the organization-wide enforcement is skipped for those applications.

- **Selected application login flows**: Disables organization-wide enforcement and applies password expiry enforcement only to applications that include **Password Reset Enforcer** in the login flow.

## App native and adaptive script support

Password Reset Enforcer supports API-based (App Native) authentication flows in addition to redirect-based flows.

WSO2 Identity Server also exposes `passwordResetComplete` in the authentication context to track whether the user completed a password reset during the current authentication session. You can use this in adaptive authentication scripts to conditionally control subsequent steps based on the outcome.
