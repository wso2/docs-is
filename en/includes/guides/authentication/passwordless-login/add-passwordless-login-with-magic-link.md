# Add Magic Link login

Magic link is a form of passwordless authentication. It allows users to log in by clicking a link sent to their email instead of entering a password.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

{{ admin_login_note}}

{{ configure_email_sender }}

## Enable Magic link login for an app

{% include "../../../guides/fragments/add-login/passwordless-login/add-magic-link-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, enter your username and press **Continue**.

    ![Sign In magic link in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/magic-link/magic-link-login-page.png){: width="300" style="border: 0.3px solid lightgrey;"}

    You will be redirected to the below page.

    ![Magic link login notification page]({{base_path}}/assets/img/guides/passwordless/magic-link/magic-link-login-notification-page.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Check your inbox for the magic link email. The email reads as follows.

    ![Magic link email]({{base_path}}/assets/img/guides/passwordless/magic-link/magic-link-email.png){: width="400" style="border: 0.3px solid lightgrey;"}

5. Open the magic link by clicking the **Sign In** button.

    !!! note
        Magic links support cross-browser functionality, allowing you to open the link and log in from any browser of your choice even if it is different from the one you used to initiate the login process.
        {{ disable_cross_browser_support }}