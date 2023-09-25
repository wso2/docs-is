# Self-register as a user

!!! warning
   The **My Account** portal is in <Badge text="preview " type="warn" vertical="middle" /> mode. We are working on adding more features to enhance the experience of the user.

A user can only self-register to {{ product_name }} organizations that have enabled [Self-registration](../../guides/user-accounts/configure-self-registration/).  


## Self-registration methods

There are two ways that a user can self-register to an organization in {{ product_name }}.

### via My Account portal

To self-register from the My Account portal, the user should follow these steps.

1. Go to the [My Account Portal](../../guides/user-self-service/customer-self-service-portal/)

   ![Self register to organization](../../assets/img/guides/organization/self-service/customer/recover-your-password.png)

2. Click **Create an account**.
3. Follow the steps to [sign-up using an email](#sign-up-using-an-email).

### via a business application

To self-register from a business application, the user should follow these steps.

1. Access the application URL.
2. Click **Create an account**
3. Select one of the following options to sign up:
   - Click **Continue with email** and follow the steps to [sign up using an email](#sign-up-using-an-email).
   - Sign-up using any of the other authenticators as shown below.

      ![Account verification email notification](../../assets/img/guides/organization/self-service/customer/self-registration-select-a-method.png)

## Sign up using an email

A user can sign-up to an organization in {{ product_name }} using an email, [via My Account portal](#via-my-account-portal) or [via a business application](#via-a-business-application).

To sign up using an email:

1. Click **Continue with email** on the sign-up screen and proceed.
2. Enter the email address, password, and any other information that the application requests.

   ![Account verification email notification](../../assets/img/guides/organization/self-service/customer/self-registration-form.png)

   !!! note
      - The user information requested when signing up can be changed by configuring [user attributes](../../guides/users/attributes/manage-attributes/#update-attributes).
      - By default, the user's username will be the **Email**.
      - Instead of using the email as the username, you can [configure the username](../../guides/user-accounts/account-login/username-validation/) to be an alphanumeric. Then,
      <ul>
         <li>
         the user will be asked to enter an alphanumeric username between the configured minimum and maximum lengths.
         </li>
         <li>the user's email can no longer be used as the username.</li>
      </ul>

3. Click **Sign Up** to create the account.

   !!! note
      If **Account Verification** is enabled for [self-registration](../../guides/user-accounts/configure-self-registration/) in your organization, an email is sent to the user's registered email address.

4. If **Account Verification** is enabled, the user can confirm the account from the email.

   ![Account verification email notification](../../assets/img/guides/organization/self-service/customer/account-verification-email.png)

Now, the user can log in to the My Account portal or any business applications in your organization. The email address is the username.

If the user tries to log in with an **unverified email address**, {{ product_name }} will show an error message saying that the account has not been verified and shows options to resend verification. This is applicable only if **Account Verification** is enabled for [self registration](../../guides/user-accounts/configure-self-registration/).

![Login with unverified email](../../assets/img/guides/organization/self-service/customer/login-with-unverified-email.png)