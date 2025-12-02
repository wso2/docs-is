# Invite user to set password

Allow administrator to invite users to set their own passwords during the onboarding process in {{product_name}}.

## Configuration instructions

For inviting users to set their password, follow these instructions:

{% if (is_version is defined and is_version > "7.1.0") or product_name == "Asgardeo" %}
1. On the {{product_name}} Console, go to **Login & Registration** > **User Onboarding** > **Invite User to Set Password**.
2. Enable the **Invite User to Set Password** feature to invite user to set the password after user creation.
3. From **Choose invitation method**, select Email Link to send an invitation link. Alternatively, select OTP (delivered via Email or SMS) to start the invitation flow.
4. Set the **Invitation link/OTP expiry time** in minutes.
This defines how long the password setup invitation email or OTP remains valid.
    - For infinite validity, set -1
    - Setting 0 causes immediate expiry
5. If you want to send an account activation confirmation notification, enable the **Send account activation notification**.
6. Select the **Lock account until password is set** to lock the user account during user creation.
7. Configure the OTP code options from **OTP Code Configuration**: enable uppercase, lowercase, and numeric characters, then set the desired OTP code length.

    !!! note
        When using OTP invitation method, users can use the received OTP as a temporary password to log in. The system redirects users to the password setup page after login to create their permanent password.

8. Click **Update** to save the changes.
{% else %}
1. On the {{product_name}} Console, go to **Login & Registration** > **User Onboarding** > **Invite User to Set Password**.
2. Check the **Enable email invitations for user password setup** to send an email to the user to set the password after user creation.
3. Select the **Enable account lock on creation** to lock the user account during user creation.
4. If you want to send an account activation confirmation email, enable the **Send account activation email**.
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
    <td>Select the method for sending password setup invitations:<br>
        • Email with password setup link<br>
        • Email with OTP code<br>
        • SMS with OTP code</td>
  </tr>
  <tr>
    <td><code>Invitation link/OTP expiry time</code></td>
    <td>Defines the validity period in minutes for the password setup invitation link or OTP.<br>
        • Set -1 for infinite validity<br>
        • Set 0 for immediate expiry</td>
  </tr>
  <tr>
    <td><code>Send account activation notification</code></td>
    <td>When enabled, users receive a confirmation notification after activating their account.</td>
  </tr>
  <tr>
    <td><code>Lock account until password is set</code></td>
    <td>When enabled, the system locks the user account upon creation until the user creates their password.</td>
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

## Try out invite user to set password

This section demonstrates how to use the invite user to set password feature, including how administrators can invite users and how end users experience the password setup process.

### Invite a user to set password

Follow these steps to invite a user to set their password:

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Click **Add User** > **Single User**.

3. Enter the required user details such as username, first name, and last name.

4. In the **Password setup method** section, select **Invite the user to set their own password**.

5. Click **Next** and then **Finish** to create the user.

The user receives an invitation based on your configured method:

- **Email link**: The user receives an email with a link to set their password.
- **Email OTP**: The user receives an email containing an OTP code.
- **SMS OTP**: The user receives an SMS containing an OTP code.

### Resend password setup invitation

If the user doesn't receive the invitation or the invitation expires, you can resend it using one of the following methods:

#### Resend via console

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Locate the user in the users list.

3. Click the **Edit** icon (pencil icon) next to the user.

4. In the user profile view, click **Resend Invite** or **Reset Password** (depending on your version).

5. Confirm the action to send a new invitation to the user.

#### Resend via API

You can also resend the password setup invitation programmatically using the API.

{% if product_name == "Asgardeo" %}
To resend the password setup invitation, use the following curl command:
{% else %}
To resend the password setup invitation, use the [Resend Code API]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#tag/Self-Register/paths/~1resend-code/post) as shown below:
{% endif %}

!!! abstract ""

    === "Request format"

        ```curl
        curl -X 'POST' \
        'https://{{ host_name }}/api/identity/user/v1.0/resend-code' \
        -H 'Authorization: Bearer <access_token>' \
        -H 'Content-Type: application/json' \
        -d '{
            "user": {
                "username": "<USERNAME>",
                "realm": "<REALM>"
            },
            "properties": [{
                "key": "RecoveryScenario",
                "value": "ADMIN_FORCED_PASSWORD_RESET_VIA_EMAIL_LINK"
                }]
            }'
        ```

    === "Sample request"

        ```curl
        curl -X 'POST' \
        'https://{{ host_name_example }}/api/identity/user/v1.0/resend-code' \
        -H 'Authorization: Bearer <access_token>' \
        -H 'Content-Type: application/json' \
        -d '{
            "user": {
                "username": "alex",
                "realm": "PRIMARY"
            },
            "properties": [{
                "key": "RecoveryScenario",
                "value": "ADMIN_FORCED_PASSWORD_RESET_VIA_EMAIL_LINK"
                }]
            }'
        ```

    ---
    **Response**
    ```
    HTTP/1.1 201 Created
    ```

    !!! note
        Ensure that the username provided is without the user store domain prefix, and the realm parameter specifies the relevant user store domain name.

### User experience flow

This section describes the complete password setup experience from the end user's perspective.

#### Setup password using email link

If you configured the email link invitation method, users receive an email with a password setup link. The user experience is as follows:

1. The user receives an email invitation with the subject **Set your password**.

2. The user opens the email and clicks the **Set Password** link.

3. The system opens the password setup page in the browser.

4. The user enters their new password and confirms it by entering it again.

5. The user clicks **Submit** to complete the password setup.

6. The system displays a success message confirming that the password has been set.

7. If the **Send account activation notification** option is enabled, the user receives a confirmation email.

8. The user can now sign in to the application using their username and the newly created password.

#### Setup password using OTP

If you configured the OTP invitation method (via email or SMS), users receive an OTP code. The user experience is as follows:

1. The user receives the OTP code through email or SMS.

2. The user has two options to complete the password setup:

    **Option 1: Using the password recovery endpoint**

    - The user navigates to the password recovery page of the application.
    - The user enters their username.
    - The user selects the option to use the OTP.
    - The user enters the OTP code received.
    - The system validates the OTP and displays the password setup page.
    - The user enters and confirms their new password.
    - The user submits the form to complete the password setup.

    **Option 2: Using basic authentication**

    - The user navigates to the application login page.
    - The user enters their username and uses the OTP code as the password.
    - The system validates the OTP and automatically redirects the user to the password setup page.
    - The user enters and confirms their new password.
    - The user submits the form to complete the password setup.

3. After successfully setting the password, the system displays a success message.

4. If the **Send account activation notification** option is enabled, the user receives a confirmation email.

5. The user can now sign in to the application using their username and the newly created password.

!!! note
    - The invitation link or OTP is valid only for the duration specified in the **Invitation link/OTP expiry time** configuration.
    - If the invitation expires, users should contact an administrator to resend the invitation.
    - If the **Lock account until password is set** option is enabled, the user account remains locked until the user completes the password setup.

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
