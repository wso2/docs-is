# Add Magic Link login

Magic link is a form of passwordless authentication. It allows users to log in by clicking a link sent to their email instead of entering a password.

## Prerequisites

1. To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

2. You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/get-started/create-asgardeo-account/#create-a-user) in {{ product_name }}.

    !!! note
        You cannot use an administrator account to log in to an application.

## Enable Magic link login for an app

Follow the steps given below to enable **Magic link** login to the login flow of your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add Magic link login.

3. Go to the **Sign-in Method** tab of the application and add Magic link login from your preferred editor:

    ---
    === "Classic Editor"
        - If you haven’t already built a login flow for your application, select **Add Magic Link login** to build one.

        ![Configuring magic link login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login.png){: width="600"}

        - If you have an already built login flow, add the `Magic Link` authenticator as the first authentication step.

        ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login-step.png)

    === "Visual Editor"
        To add passwordless login with Magic link using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

        2. Select `Magic Link`.

        3. Click **Confirm** to add passwordless login with Magick Link to the sign-in flow.

            ![Configuring magic link login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login-with-visual-editor.png)
    ---

4. Click **Update** to save your changes.

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, enter your username and press **Continue**.

    ![Sign In magic link in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/magic-link/magic-link-login-page.png){: width="300"}

    You will be redirected to the below page.

    ![Magic link login notification page]({{base_path}}/assets/img/guides/passwordless/magic-link/magic-link-login-notification-page.png){: width="300"}

4. Check your inbox for the magic link email. The email reads as follows.

    ![Magic link email]({{base_path}}/assets/img/guides/passwordless/magic-link/magic-link-email.png){: width="400"}

5. Open the magic link by clicking **Sign In** on the **same browser** as your application.