# Configure login attempts-based adaptive authentication

This page guides you through configuring login attempts-based adaptive authentication for a sample web application.

----

## Scenario

Consider a scenario where you want a user who successfully logs in after three failed login attempts to perform an additional level of authentication to access a resource.

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [add a user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) named `Alex` with login permissions. Do not assign any roles to this user.
- You need to configure the maximum number of failed attempts allowed.
    1. On the management console, go to **Identity > Identity Providers > Resident**.
    2. Expand the **Login Attempts Security > Account Lock** section.
    3. Select **Lock user accounts**.
    4. Enter a value greater than `3` as the value for **Maximum failed login attempts**.

    !!! tip
        The **Maximum failed login attempts** should be greater than the number of failed login attempts you will consider for prompting two-factor authentication.

        In this sample, since we will prompt two-factor authentication after three failed login attempts, the **Maximum failed login attempts** should be greater than 3.   

----

## Configure login attempts-based authentication

To configure user-age-based authentication:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to the **Login-Attempts-Based** template.

    ![Tenant based template]({{base_path}}/assets/img/samples/login-attempts-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        - The authentication script defines a conditional step that executes the second authentication step (i.e., hardware key authenticator) only if the user logs in after a specific number of invalid login attempts (defined by the `invalidAttemptsToStepup` parameter) have been exceeded.
        - By default, `TOTP` will be added as the second authentication step. You can update this with any authentication method.

7. Click **Update** to save your configurations.

----

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and try to log in using an invalid password (make a failed login attempt).

3. Next, log in using the correct username and password.

    !!! info
        Note that the second factor of authentication is not prompted because the number of failed attempts allowed has not been exceeded yet.

4. Make invalid failed attempts until you exceed the allowed failed attempts.

5. Now that you have exceeded the number of allowed failed attempts, try to log in with the correct credentials.

5. You will be prompted to enter your `TOTP` code. Enter the code and click **Sign In**.

    ![TOTP authenticator]({{base_path}}/assets/img/samples/totp-code-verification.png)

!!! note
    The failed login attempts need not be made during a given time frame. Login attempts-based adaptive authentication is valid even if the user makes two login attempts now and the other in a few days before logging in with the correct credentials.
