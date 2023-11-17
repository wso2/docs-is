# Password recovery for users

Users can recover a forgotten password from an application sign-in page by following the steps below.

## Prerequisites

Administrators should [enable password recovery]({{base_path}}/guides/user-accounts/password-recovery/) for users in the organization.

## Recover a forgotten password

!!! note
    Users onboarded from a read-only remote user store are not able to recover their passwords through the My Account portal.

To reset the password, the user should follow these steps.

1. Go to a login page via a business application or the [My Account portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

    ![Recover your password]({{base_path}}/assets/img/guides/organization/self-service/customer/recover-your-password.png){: width="400" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

2. Click **Forgot password?**

3. Enter your username and click **Send Reset Link**. An email notification will be sent to your email address.

    ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/forgot-your-password.png){: width="400" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Open the email you received and click **Reset Password**.

5. Enter a new password and click **Proceed**.

!!! note
    If the user is already signed in to the My Account portal, the password can be reset from there. Learn how to [change password from the My Account portal]({{base_path}}/guides/user-self-service/change-password).

## Check password recovery email
Users can also check the email address to which their password recovery information is sent.

1. In the My Account portal, navigate to **Security** > **Account Recovery**.

    ![Account recovery in {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/users/account-recovery.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

2. Click the eye icon, to check the recovery email address.

3. Click **Done**.