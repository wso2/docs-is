# Login attempts

Secure user accounts from unauthorized access by configuring the login attempts policy in {{product_name}}.

## Configuration instructions

To manage login attempts settings, do the following:

1. In the {{product_name}} Console, go to **Login & Registration** > **Login Security** > **Login Attempts**.
2. Adjust the settings according to your security requirements.
3. Click **Update** to save the changes.

![Login Attempts Configuration]({{base_path}}/assets/img/guides/account-configurations/login-attempts.png){: width="900" style="display: block; margin: 0;"}

## Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Number of Consecutive Failed Login Attempts</code></td>
    <td>The count of consecutive incorrect login attempts before locking the account.</td>
  </tr>
  <tr>
    <td><code>Account Lock Duration</code></td>
    <td>The time in minutes an account stays locked after reaching the failed attempt limit.</td>
  </tr>
  <tr>
    <td><code>Account Lock Duration Increment Factor</code></td>
    <td>The rate at which the lock duration increases after successive lockouts.</td>
  </tr>
</table>

!!! Info
    - In the {{product_name}} login pages, a generic error message is displayed by default to end-users in the event of login failures. To show more specific error messages on the login page, the following properties can be configured in the `deployment.toml` file, which is located in the `<IS_HOME>/repository/conf` directory.

    Basic authenticator configurations:

    ```toml
        [authentication.authenticator.basic.parameters]
        showAuthFailureReason = true
        showAuthFailureReasonOnLoginPage = true
    ```

    Email OTP authenticator configurations:

    ```toml
        [authentication.authenticator.email_otp.parameters]
        showAuthFailureReason = true
        showAuthFailureReasonOnLoginPage = true
    ```

    TOTP authenticator configurations:

    ```toml
        [authentication.authenticator.totp.parameters]
        showAuthFailureReason = true
        showAuthFailureReasonOnLoginPage = true
    ```
