# Login and registration settings inheritance

In {{product_name}}, child organizations inherit configurations related to login and registration from their parent organizations. Child organizations can make their own customizations to these inherited settings.

Organization administrators can access these settings in the {{product_name}} Console under **Login & Registration**.

## How it works

Inheritance for login and registration configurations works as follows:

- Child organizations inherit settings from the nearest ancestor with a custom configuration. If no ancestor has customized settings, the default value applies.

- Organizations can customize their own settings, overriding the inherited values. These overridden settings then pass down to the organization’s descendants.

- Organizations can also revert their customizations, restoring the inherited values.

!!! note "Important"
    Child organizations can't override `Idle Session Timeout` and `Remember Me Period` configurations related to session management.

## Configure login and registration settings

To learn how to configure login and registration flows, see the following guides:

- [Admin initiated password reset]({{base_path}}/guides/account-configurations/account-recovery/admin-initiated-password-reset)
- [Password recovery]({{base_path}}/guides/account-configurations/account-recovery/password-recovery)
- [Username recovery]({{base_path}}/guides/account-configurations/account-recovery/username-recovery)
- [Bot detection]({{base_path}}/guides/account-configurations/login-security/bot-detection)
- [Login attempts security]({{base_path}}/guides/account-configurations/login-security/login-attempts)
- [Password validation]({{base_path}}/guides/account-configurations/login-security/password-validation)
- [Session management]({{base_path}}/guides/account-configurations/login-security/session-management)
- [Account disabling]({{base_path}}/guides/account-configurations/account-disabling)
- [Notification settings]({{base_path}}/guides/account-configurations/notification-settings)
