# Login and registration configuration inheritance

In {{product_name}}, login and registration settings are managed at the organization level. Child organizations inherit these configurations from their parent, while still allowing for organization-specific customizations.

## How it works

The inheritance for login and registration configurations is as follows:

- Configuration settings are inherited hierarchically. An organization receives its settings from the nearest ancestor with a custom configuration. If no ancestor has a custom setting, the default value is applied.
- Any organization can override an inherited value. This new setting will then be inherited by all of its descendant organizations. An override can be reverted at any time to restore the inherited configuration.

## Configure login and registration flows

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
