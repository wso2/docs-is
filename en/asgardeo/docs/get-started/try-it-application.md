# Try login with Asgardeo

The following guide explains how you can quickly test login with Asgardeo using the **Try it** application provided by Asgardeo.

!!! note "Before you begin"
    - Create an account in Asgardeo.
    - Create a user in Asgardeo (only users can login to applications created in Asgardeo). </b>

    Refer [create your Asgardeo account]({{base_path}}/get-started/create-asgardeo-account/) to learn more.

## Asgardeo Try It app

**Try It** is a test application that we have already set up and configured for you to quicky integrate authenticators and see how Asgardeo login works with applications.

Let's try a simple login flow in the Asgardeo Try It application:

1. On the [Asgardeo Console](https://console.asgardeo.io/login), navigate to **Home** and click **Try login with the Try It app**.

2. A dialog box appears prompting you to create a user account. Click **Continue** to proceed if you have a user account. If not, click the link for **creating a user** and follow the instructions.

   ![Get set](../assets/img/guides/applications/get-set.png)

   !!! note "Create a user"

    The dialog box only appears the first time you are using the Try it application.

3. When you are ready with the user account, click **Continue** to proceed.

    !!! note
        The process creates the **Asgardeo Try It** Application in the **Applications** section and redirects you to the login page of the application.

4. Use credentials of a user to log in to the application.

## Customize the login flow

To try out a customized login flow:

1. On the Asgardeo Console, go to **Applications**, and select the **Asgardeo Try It** application.

2. Go to the **Sign-in Method** tab of the application and select the authentication method that you wish to try:

    - [Social login](../../guides/authentication/social-login/)
    - [Standard-based login](../../guides/authentication/enterprise-login/)
    - [Passwordless login](../../guides/authentication/passwordless-login/)
    - [Multi-factor authentication](../../guides/authentication/mfa/)


    ![Try It application](../assets/img/guides/applications/try-it-image.png)

    !!! note
        Alternatively, to customize the login flow, navigate to **Home** and click the gear icon that appears next to the **Try login with the Try It app** card after you have tried the default login at least once.

3. Once you **Update** the sign-in methods, click **Try Login** to try the customized login flow.

!!! note
    Note that the **Try It** application is a preview app which allows you to make limited configurations. Learn about all the configurations available in Asgardeo in our [guides](../../guides/).