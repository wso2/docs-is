# Self Registration

Enable users to self-register and create their own accounts within the organization on {{product_name}}.

## Configuration Instructions

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
    <td>Auto Login</td>
    <td>Automatically logs in the user after successful registration if enabled.</td>
  </tr>
  <tr>
    <td>Sign Up Confirmation Email</td>
    <td>Send a confirmation email to users upon successful sign-up if enabled.</td>
  </tr>
  <tr>
    <td>SMS OTP Expiry Time</td>
    <td>The validity period of the SMS OTP for account verification.</td>
  </tr>
  <tr>
    <td>Callback URL Regex</td>
    <td>Regular expression to validate the callback URL for user registration.</td>
  </tr>
</table>
