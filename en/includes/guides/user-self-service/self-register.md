# Self-register as a user

If an administrator has enabled self-registration for an organization, users can sign up and create their own accounts without the involvement of an administrator.

!!! note
    Learn how administrators can [enable self-registration]({{base_path}}/guides/user-self-service/configure-self-service-portal/#enabledisable-the-my-account-portal) in an organization.

## Self-registration methods

There are two ways that a user can self-register to an organization in {{ product_name }}.

### via My Account

To self-register from the My Account portal, the user should follow these steps.

1. Go to the My Account Portal.

    ![Self register to organization]({{base_path}}/assets/img/guides/organization/self-service/customer/create-an-account.png){: width="400" style="display: block; margin: 0;"}

2. Click **Register**.

3. Follow the steps to [sign-up using an email](#sign-up-using-an-email).

### via an application

To self-register from an application, users should follow these steps.

1. Access the application URL.
2. Click **Register**
3. Select one of the following options to sign up:

    - Click **Continue with email** and follow the steps to [sign up using an email](#sign-up-using-an-email).
    - Sign-up using any of the other authenticators as shown below.

      ![Account verification email notification]({{base_path}}/assets/img/guides/organization/self-service/customer/self-registration-select-a-method.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Sign up using an email

A user can sign-up to an organization in {{ product_name }} using an email, [via My Account portal](#via-my-account) or [via an application](#via-an-application).

The user can follow the steps below to sign up using an email.

1. Click **Continue with email** on the sign-up screen.

2. Enter the email address, password, and any other information that the application requests.

    ![Account verification email notification]({{base_path}}/assets/img/guides/organization/self-service/customer/self-registration-form.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note

        - Administrators can change which attributes users need to enter during the sign up process. Learn how to [update user attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes) so that they are displayed in the user profile.
        {% if product_name == "Asgardeo" %}
        - Users can either be allowed to use the email as the username or be asked to enter a separate username. Learn how to [configure username requirements]({{base_path}}/guides/user-accounts/account-login/username-validation/).
        {% endif %}

3. Click **Sign Up** to create the account.

4. If **Account Verification** is enabled, the user can confirm the account from the email.

    ![Account verification email notification]({{base_path}}/assets/img/guides/organization/self-service/customer/account-verification-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}