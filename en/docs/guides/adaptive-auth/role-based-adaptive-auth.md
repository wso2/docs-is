# Configure Role-Based Adaptive Authentication

This page guides you through configuring role-based adaptive authentication for a sample web application.

----

## Scenario

Consider a scenario with two user roles, `admin` and `manager`. For users assigned to these roles, the login flow in applications should be stepped up with TOTP as follows:  

1. Basic authentication (username and password)
2. TOTP or Security Key/Biometrics (FIDO)

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [add a user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) named `Alex` with login permissions. Do not assign any roles to this user.

----

## Configure role-based authentication

To configure role-based authentication:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to **Role-Based** template.  

    ![Role based adaptive authentication template]({{base_path}}/assets/img/samples/role-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        By default, `TOTP` and `Security Key/Biometrics (FIDO)` will be added as the second authentication step. You can update this with any authentication method.

7. Click **Update** to save your configurations.

----

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter your admin account credentials.

3. You will be prompted to enter your `TOTP` or `Security Key/Biometrics (FIDO)` code. Enter any code and click **Sign In**.

    ![pickup sign in]({{base_path}}/assets/img/samples/pickup-step-two.png)

4. Log out of the application and log in again as `Alex`.

5. `Alex` will be able to log in to the application after the successful completion of basic authentication.
