# Self registration

Enable users to self-register and create their own accounts within the organization on {{product_name}}.

## Configuration instructions

To set up self-registration, follow these steps:

1. On the {{product_name}} Console, go to **Login & Registration** > **User Onboarding** > **Self Registration**.
2. Toggle the switch to enable self-registration.
3. Configure the additional settings such as account verification, auto-login, and notification emails as needed.
4. Click **Update** to save the changes.

![Self Registration Configuration]({{base_path}}/assets/img/guides/account-configurations/self-registration.png){: width="900" style="display: block; margin: 0;"}

## Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Account Verification</code></td>
    <td>When enabled, requires users to verify their accounts as part of registration.</td>
  </tr>
  <tr>
    <td><code>Account verification link expiry time</code></td>
    <td>Time in minutes until the account verification link expires.</td>
  </tr>
  <tr>
    <td><code>Activate account immediately</code></td>
    <td>If selected, the new account is activated immediately after registration without waiting for account confirmation.</td>
  </tr>
  <tr>
    <td><code>Enable auto login</code></td>
    <td>If selected, the user will be automatically logged in after registration.</td>
  </tr>
  <tr>
    <td><code>Send sign up confirmation email</code></td>
    <td>A confirmation email is sent upon successful self-registration if this option is enabled.</td>
  </tr>
</table>
