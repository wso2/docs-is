# Add Email OTP login

Email OTP is a form of passwordless authentication. It allows users to log in by providing a one-time passcode sent to their email instead of entering a password.

## Prerequisites
- To get started, you need to [register an application with {{ product_name }}](../../applications/). You can register your own application or use one of the [sample applications](../../get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account](../../get-started/create-asgardeo-account/#create-a-user) in {{ product_name }}.

    !!! note
        You cannot use an administrator account to log in to an application.

## Enable Email OTP login for an app

Follow the steps given below to enable **Email OTP** login to the login flow of your application.

1. On the {{ product_name }} Console, use one of the following options to start:
    - Option 1: Go to **Applications**.
    - Option 2: Go to **Connections > Passwordless** and for the Email OTP connection, click **Set up**.

2. Select the application for which Email OTP login needs to be enabled.
3. Go to the **Sign-in Method** tab:

    - If you haven’t already built a login flow for your application, select **Add Email OTP login** to build one.
        ![Configuring email OTP login in {{ product_name }}](../../../assets/img/guides/passwordless/email-otp/add-email-otp-login.png)

    - If you have an already built login flow, add the `Email OTP` authenticator as the first authentication step.
        ![Customize the login flow](../../../assets/img/guides/passwordless/email-otp/add-email-otp-login-step.png)

4. Click **Update** to save your changes.

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, enter your username and press **Continue**.

    ![Sign In with email OTP in {{ product_name }}](../../../assets/img/guides/passwordless/email-otp/email-otp-login-page.png){: width="400"}

    You will be redirected to the below email OTP page.

    ![Email OTP submit page](../../../assets/img/guides/passwordless/email-otp/email-otp-submit-page.png){: width="400"}

4. Check your inbox for the email containing the one-time passcode. The email reads as follows.

    ![Email OTP email](../../../assets/img/guides/passwordless/email-otp/email-otp-email.png){: width="400"}

5. Enter the received passcode in the email OTP page and click on **Continue**.
