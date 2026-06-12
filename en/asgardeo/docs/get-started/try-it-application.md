# Try login with WSO2 Identity Platform

The following guide explains how you can quickly test login with WSO2 Identity Platform using the **Try it** application provided by WSO2 Identity Platform.

!!! note "Before you begin"
    - Create an account in WSO2 Identity Platform.
    - Create a user in WSO2 Identity Platform (only users can login to applications created in WSO2 Identity Platform). </b>

    Refer [create your WSO2 Identity Platform account]({{base_path}}/get-started/create-asgardeo-account/) to learn more.

## WSO2 Identity Platform Try It app

**Try It** is a test application that we have already set up and configured for you to quickly integrate authenticators and see how WSO2 Identity Platform login works with applications.

Let's try a simple login flow in the WSO2 Identity Platform Try It application:

1. On the [WSO2 Identity Platform Console](https://console.asgardeo.io/login), navigate to **Home** and click **Try login with the Try It app**.

2. A dialog box appears prompting you to create a user account. Create a user account or if you already have one, click **Continue** to proceed.

3. You are directed to the WSO2 Identity Platform login screen. Use credentials of the user account you created above to log in to the application.

    ![Try It application]({{base_path}}/assets/img/get-started/try-it-login-screen.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Customize the login flow

You can use the various authenticators WSO2 Identity Platform offers to customize the login flow of the **Try it** application. To set up a custom login flow:

1. On the WSO2 Identity Platform Console, go to **Applications**, and select the **WSO2 Identity Platform Try It** application.

    !!! tip
        Alternatively, navigate to **Home** and click the gear icon that appear in the **Try login with the Try It app** card after you have set it up.

2. Go to the **Login Flow** tab of the application, select the authentication flow that you wish to try and click **Update**.

    ![Try It application]({{base_path}}/assets/img/get-started/custom-login-flow.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        Follow the guides below to learn how to configure the authentication flows.

        - [Add Social login]({{base_path}}/guides/authentication/social-login/)
        - [Add Passwordless login]({{base_path}}/guides/authentication/passwordless-login/)
        - [Add Multi-factor authentication]({{base_path}}/guides/authentication/mfa/)

3. Click **Try Login** to try the custom login flow.
