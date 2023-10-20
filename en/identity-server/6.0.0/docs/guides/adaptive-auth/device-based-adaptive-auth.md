# Configure device-based adaptive authentication

This page guides you through configuring device-based adaptive authentication for a sample web application.

----

## Scenario

Consider a scenario where users who log in to an application from a new device or browser should be prompted with TOTP as a second authentication step. The two authentication steps are as follows:

1. Username and password
2. TOTP

!!! note
    A cookie identifies the new device or browser. Therefore, once the cookie expires (this expiry time is specified in the authentication script), the same browser or device is considered a new device.

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [add a user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) named `Kim` with login permissions. Do not assign any roles to this user.

## Configure device-based authentication

To configure device-based authentication for an application:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to the **New-Device-Based** template.

    ![device-based-template]({{base_path}}/assets/img/samples/device-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        By default, `TOTP` will be added as the second authentication step. You can update this with any authentication method.

7. Update `deviceRememberPeriod` to specify how long the device should be considered a trusted device.

    ``` java
    var deviceRememberPeriod = 60 * 60 * 24 * 365 * 2; 
    ```

    !!! info
        Once this period has elapsed, the device is considered a new one. By default, the period is set to two years.

8. Click **Update** to save your configurations.

----

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter Kim's credentials.

3. You will be prompted to enter your `TOTP` code. Enter the code and click **Sign In**.

    ![TOTP]({{base_path}}/assets/img/samples/totp-code-verification.png)

4. Logout of the application and log in again using Kim's credentials on the same browser window. You will successfully log in to the application with only the basic authentication.

5. Open a new browser window of a different browser and access the PickUp application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

6. Click **Login** and enter Kim's credentials. 

7. You will be prompted to enter your `TOTP` code. Enter the code and click **Sign In**.


You are successfully logged in to the application.
