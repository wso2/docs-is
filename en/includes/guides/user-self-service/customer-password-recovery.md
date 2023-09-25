# Password recovery for users

!!! warning
   The **My Account** portal is in <Badge text="preview " type="warn" vertical="middle" /> mode. We are working on adding more features to enhance the experience of the user.

[Users](../../guides/users/manage-customers/) can recover a forgotten password by following the instructions on the {{ product_name }} sign-in page.

Alternatively, if the account owner is already signed in to the self-service portal, the password can be updated [using the My Account portal](../../guides/user-self-service/change-password/).

## Prerequisites

[Password recovery](../../guides/user-accounts/password-recovery/) should be enabled for business users in the organization.

## Recover password

!!! note
   Users onboarded from a **read-only remote user store** do not have the capability of recovering their password on the My Account portal.

To reset the password, the account owner should follow these steps.

1. Go to the login page via a business application or the [My Account portal](../../guides/user-self-service/customer-self-service-portal/).

   ![Recover your password](../../assets/img/guides/organization/self-service/customer/recover-your-password.png)

2. Click **Forgot password?**
3. Enter your username and click **Send Reset Link**.
   ![Forgot your password](../../assets/img/guides/organization/self-service/customer/forgot-your-password.png)

   An email notification is sent to your email address.

4. Open the email you received and click **Reset Password**.
   ![Reset password email](../../assets/img/guides/organization/self-service/customer/reset-password-email.png)
5. Enter new password and **Proceed**.

Now you have reset your password and can sign in using your new password.

## Check password recovery email
Users can also check the email address to which their password recovery information is sent to.

1. In the user's MyAccount portal, navigate to **Security > Account Recovery**.
    ![Account recovery in {{ product_name }} MyAccount](../../assets/img/guides/users/account-recovery.png)
2. Click the **eye** icon, to check the recovery email address.
   !!! warning The recovery email address will be the user's email address. This cannot be updated.
3. Click **Done**.
