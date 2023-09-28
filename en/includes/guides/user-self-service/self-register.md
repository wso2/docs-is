# Self-register as a user

If an organization has enabled self-registration, users can create an account in an Asgardeo organization without the involvement of an administrator.

!!! note
    Learn how administrators can [enable self-registration]({{base_path}}/guides/user-accounts/configure-self-registration/) in an organization.

## Self-registration methods

There are two ways that a user can self-register to an organization in {{ product_name }}.

### via My Account

To self-register from the My Account portal, the user should follow these steps.

1. Go to the My Account Portal.

    ![Self register to organization]({{base_path}}/assets/img/guides/organization/self-service/customer/recover-your-password.png){: width="300" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

2. Click **Create an account**.

3. Follow the steps to [sign-up using an email](#sign-up-using-an-email).

### via a business application

To self-register from a business application, users should follow these steps.

1. Access the application URL.
2. Click **Create an account**
3. Select one of the following options to sign up:

    - Click **Continue with email** and follow the steps to [sign up using an email](#sign-up-using-an-email).
    - Sign-up using any of the other authenticators as shown below.

      ![Account verification email notification]({{base_path}}/assets/img/guides/organization/self-service/customer/self-registration-select-a-method.png){: width="300" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

## Sign up using an email

A user can sign-up to an organization in {{ product_name }} using an email, [via My Account portal](#via-my-account) or [via a business application](#via-a-business-application).

To sign up using an email:

1. Click **Continue with email** on the sign-up screen.

2. Enter the email address, password, and any other information that the application requests.

    ![Account verification email notification]({{base_path}}/assets/img/guides/organization/self-service/customer/self-registration-form.png){: width="300" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note

        - Administrators can change the attributes requested when users sign up by configuring [user attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes).
        - By default, the Email is used as the username. Instead of using the email, administrators can let users enter a separate username. Learn how to [configure username requirements]({{base_path}}/guides/user-accounts/account-login/username-validation/).

3. Click **Sign Up** to create the account.

4. If **Account Verification** is enabled, the user can confirm the account from the email.

    ![Account verification email notification]({{base_path}}/assets/img/guides/organization/self-service/customer/account-verification-email.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. If a user attempts to log in using an unverified account, the user is displayed an error message as shown.

    !!! note
        This is applicable only if account verification is enabled when an administrator configures [self registration]({{base_path}}/guides/user-accounts/configure-self-registration/).

![Login with unverified email]({{base_path}}/assets/img/guides/organization/self-service/customer/login-with-unverified-email.png){: width="300" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}