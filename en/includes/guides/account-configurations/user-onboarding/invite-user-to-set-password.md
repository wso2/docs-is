# Invite user to set password

Allow administrator to invite users to set their own passwords during the onboarding process in {{product_name}}.

## Configuration instructions

For inviting users to set their password, follow these instructions:


1. On the {{product_name}} Console, go to **Login & Registration** > **User Onboarding** > **Invite User to Set Password**.
2. Check the **Enable email invitations for user password setup** to send an email to the user to set the password after user creation.
3. Select the **Enable account lock on creation** to lock the user account during user creation.
4. If you want to send an account activation confirmation email, enable the **Send account activation email**.
{% if (is_version is defined and is_version > "7.1.0") or product_name == "Asgardeo" %}
5. Select either Email Link to send an invitation link. Alternatively, choose OTP (delivered via Email or SMS) to start the invitation flow.
6. Set the **Invitation link/OTP expiry time** in minutes. This defines how long the password setup invitation email or OTP remains valid. For infinite validity, set -1. Setting 0 causes immediate expiry.
7. Configure the OTP code options: enable uppercase, lowercase, and numeric characters, then set the desired OTP code length.
8. Click **Update** to save the changes.
{% else %}
5. Set the **Password setup invitation code expiration time** in minutes to define how long the password setup invitation e-mail would be valid. For infinite validity period, set -1. Setting 0 will cause immediate expiry of the invitation.
6. Click **Update** to save the changes.
{% endif %}

![Invite User to Set Password Configuration]({{base_path}}/assets/img/guides/account-configurations/invite-user-to-set-password.png){: width="700" style="display: block; margin: 0;"}

## Parameters

{% if (is_version is defined and is_version > "7.1.0") or product_name == "Asgardeo" %}
<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Choose invitation method</code></td>
    <td>Select the method for sending password setup invitations: • Email with password setup link • Email with OTP code • SMS with OTP code</td>
  </tr>
  <tr>
    <td><code>Invitation link/OTP expiry time</code></td>
    <td>Defines the validity period in minutes for the password setup invitation link or OTP. Set -1 for infinite validity. Set 0 for immediate expiry.</td>
  </tr>
  <tr>
    <td><code>Send account activation notification</code></td>
    <td>When enabled, users receive a confirmation email after activating their account.</td>
  </tr>
  <tr>
    <td><code>Lock account until password is set</code></td>
    <td>When enabled, the system locks the user account upon creation until the user sets their password.</td>
  </tr>
  <tr>
    <td><code>Include uppercase letters in OTP</code></td>
    <td>When enabled, the generated OTP codes will include uppercase letters (A-Z).</td>
  </tr>
  <tr>
    <td><code>Include lowercase letters in OTP</code></td>
    <td>When enabled, the generated OTP codes will include lowercase letters (a-z).</td>
  </tr>
  <tr>
    <td><code>Include numbers in OTP</code></td>
    <td>When enabled, the generated OTP codes will include numeric digits (0-9).</td>
  </tr>
  <tr>
    <td><code>OTP code length</code></td>
    <td>Set the number of characters in the generated OTP codes.</td>
  </tr>
</table>
{% else %}
<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Enable user email verification</code></td>
    <td>Triggers a verification notification during user creation if enabled.</td>
  </tr>
  <tr>
    <td><code>Enable account lock on creation</code></td>
    <td>Locks the user account during creation to prevent unauthorized access.</td>
  </tr>
  <tr>
    <td><code>Send account activation email</code></td>
    <td>Sends an email to users for account activation if enabled.</td>
  </tr>
  <tr>
    <td><code>Password Setup Invitation Code Expiration Time</code></td>
    <td>Defines the validity period in minutes for the password setup code sent to users. For infinite validity period, set -1.</td>
  </tr>
</table>
{% endif %}
