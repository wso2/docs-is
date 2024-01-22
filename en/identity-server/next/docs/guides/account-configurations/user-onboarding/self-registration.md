# Self registration

Enable users to self-register and create their own accounts within the organization on {{product_name}}.

## Configuration instructions

To set up self-registration, follow these steps:

1. On the {{product_name}} Console, go to **User Onboarding** > **Self Registration**.
2. Toggle the **Enabled** switch to allow self-registration.
3. Configure the additional settings such as account verification, auto-login, and notification emails as needed.
4. Specify the **User self-registration SMS OTP expiry time** and the **User self-registration callback URL regex** for enhanced security.
5. Click **Update** to save the changes.

![Self Registration Configuration]({{base_path}}/assets/img/guides/account-configurations/self-registration.png)

## Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Account Verification</td>
    <td>When enabled, requires users to verify their accounts as part of registration.</td>
  </tr>
  <tr>
    <td>Account verification link expiry time</td>
    <td>Time in minutes until the account verification link expires.</td>
  </tr>
  <tr>
    <td>Activate account immediately</td>
    <td>If selected, the new account is activated immediately after registration without waiting for account confirmation.</td>
  </tr>
  <tr>
    <td>Enable auto login</td>
    <td>If selected, the user will be automatically logged in after registration.</td>
  </tr>
  <tr>
    <td>Send sign up confirmation email</td>
    <td>A confirmation email is sent upon successful self-registration if this option is enabled.</td>
  </tr>
</table>
