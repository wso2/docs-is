# Passwordless login with Magic Link

Magic Link is a form of passwordless authentication. It allows users to log in by clicking a link sent to their email instead of entering a password.

## Prerequisites
- You need to [configure the email sending module](../../../deploy/configure-email-sending).
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [update the user profile]({{base_path}}/guides/identity-lifecycles/update-profile) of the users with an email address.

## Configure Magic Link as an authenticator

To configure Magic Link as an authenticator:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section.

4. For **Authentication Type**, select the **Local Authentication** option and then select **Magic Link** from the list.

5. Click **Update** to save the configurations.

## Try it out

1. Access the following sample PickUp application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`
2. Click **Login**, enter your username, and click **Continue**.
3. Check your inbox for the magic link email. The email reads as follows:
    ![Magic Link email](../../assets/img/guides/magic-link-email.png)
4. Open the Magic Link by clicking **Sign In** on the same browser as your application.
   
    !!! note
        This is not supported in the private windows of Safari browser.

You will now be logged into the application successfully.
