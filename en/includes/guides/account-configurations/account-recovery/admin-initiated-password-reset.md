# Admin initiated password reset

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0" ) %}
Administrators can initiate password reset for users. Once an administrator initiates a password reset, the user's current password becomes invalid and they must complete the password reset process to regain access to their account.
{% else %}
Administrators can initiate password reset for users. Once initiated, an email will be sent to the user with a password reset link which can be used to reset the password.
{% endif %}

To configure admin-initiated password reset:

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Under **Account Recovery**, click on **Admin Initiated Password Reset**.

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0" ) %}
3. Select one of the following methods:
    * **Email Link**: Users receive an email containing a password recovery link. Clicking the link initiates the password reset flow.
    * **Email OTP**: Users receive a one-time password (OTP) via email. They can use this OTP to log in once, which will then initiate the password reset flow.
    * **SMS OTP**: Users receive a one-time password (OTP) via SMS. They can use this OTP to log in once, which will then initiate the password reset flow.
{% else %}
3. Check the option to **Enable password reset via recovery email**.
{% endif %}

4. Click **Update** to save the changes.

## Offline Password Reset

Offline Password Reset allows administrators to initiate a password reset without sending a password reset link or OTP to the user. An OTP is generated and stored in the user's claims.

To configure Offline Password Reset:

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Under **Account Recovery**, click on **Admin Initiated Password Reset**.
3. Select **Enable Password Reset Offline**.
4. Click **Update** to save the changes.

To initiate an offline password reset for a user:

1. Set the `http://wso2.org/claims/identity/adminForcedPasswordReset` claim to `true` for the required user.
2. The system generates an OTP and stores it in the user's `http://wso2.org/claims/oneTimePassword` claim.
3. Open the user's profile in the Management Console and copy the value of the **One Time Password** claim.
4. Provide the OTP to the user. The user can use it to log in to the My Account application.
5. After logging in with the OTP, the user is prompted to set a new password.
6. After setting the new password, the user can log in using the new password.

!!! note
    Offline Password Reset does not require an email notification to deliver the OTP.

![Admin Initiated Password Reset Configuration]({{base_path}}/assets/img/guides/account-configurations/admin-initiated-password-reset.png){: width="600" style="display: block; margin: 0;"}

!!! info
    Once an administrator initiates a password reset, the user's previous password will be invalidated immediately. The user must complete the password reset process using the provided method to regain access to their account.
