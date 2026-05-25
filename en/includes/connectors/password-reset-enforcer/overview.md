# Password Reset Enforcer

Password Reset Enforcer lets you enforce password reset upon expiration as part of an application's authentication flow. When a user signs in with an expired password, {{product_name}} redirects the user to the password reset screen before completing authentication.

You can use this connector to:

- Ensure users update passwords on a defined schedule.
- Block access to an application until the user resets an expired password.
- Apply your organization’s password validation rules during password reset.

Configure password expiration rules from the {{product_name}} Console. For instructions, see [Password validation]({{base_path}}/guides/account-configurations/login-security/password-validation/).

![Password Reset Enforcer overview]({{base_path}}/assets/img/connectors/password-reset-enforcer/password-reset-enforcer-overview.png)

How it works,

- A user starts a sign-in flow to your application.
- {{product_name}} evaluates password expiration based on your configured password expiration rules.
- If the password has expired, {{product_name}} shows the password reset screen.
- After the user resets the password successfully, {{product_name}} continues the authentication flow.

