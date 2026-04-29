# Usage

This guide explains how to enforce password reset upon expiry for an application using Password Reset Enforcer.

## Prerequisites

- [Set up Password Reset Enforcer]({{base_path}}/connectors/password-reset-enforcer/set-up/) in your {{product_name}} installation.
- Enable and configure password expiry in your organization.

  1. On the {{product_name}} Console, go to **Login & Registration** > **Password Validation**.
  2. Enable **Password Expiration**.
  3. Select the users to whom the password expiry policy should apply using **Enforce password expiry for**.

## Choose the password expiry enforcement scope

When **Password Expiration** is enabled, the **Enforce password expiry for** setting controls how password expiry enforcement is applied.

- **All application login flows** (default): Applies the password expiry policy to all users during sign-in, regardless of the application they access. For applications with **Password Reset Enforcer** in the login flow, enforcement is triggered inline at the configured step and the organization-wide enforcement is skipped for those applications.

- **Selected application login flows**: Disables organization-wide password expiry enforcement. Enforces password expiry only when users sign in to applications that explicitly include **Password Reset Enforcer** in the login flow.

    !!! info
        To enforce password expiry for a specific application, add **Password Reset Enforcer** as an authentication step in the application's login flow.

        See [Configure login flows]({{base_path}}/guides/authentication/) for instructions.

    !!! tip
        By default, users are automatically signed in after they reset an expired password.

        To require users to sign in again from the beginning of the login flow, use the `passwordResetComplete` property in the authentication context of your adaptive script and call the `fail()` function.

        ```js
        var onLoginRequest = function(context) {
          executeStep(1, {
            onSuccess: function(context) {
              // Step 2: Password reset enforcer authenticator.
              executeStep(2, {
                onSuccess: function(context) {
                  var isPasswordResetComplete = context.passwordResetComplete;
                  if (isPasswordResetComplete === true) {
                    var parameterMap = {'errorCode': 'password_reset_complete', 'errorMessage': 'Your password has been successfully reset due to expiry.', "errorURI":'https://localhost:9443/authenticationendpoint/retry.do'};
                    fail(parameterMap);
                  }
                }
              });
            }
          });
        };
        ```

## Add Password Reset Enforcer to an application's login flow

1. On the {{product_name}} Console, go to **Applications**.

2. Select the application.

3. Go to the **Login Flow** tab.

4. Add **Password Reset Enforcer** as an authentication step.

5. Click **Update** to save the changes.

## Verify the behavior

1. Ensure the user account has an expired password based on your configured password expiration rules.

2. Start a sign-in flow to the application.

3. Confirm that {{product_name}} redirects the user to the password reset screen before completing authentication.

!!! note
    Password Reset Enforcer supports both redirect-based and app-native authentication flows.
