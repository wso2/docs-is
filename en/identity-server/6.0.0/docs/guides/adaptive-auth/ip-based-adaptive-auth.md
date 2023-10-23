# Configure IP-based adaptive authentication

This page guides you through configuring IP-based adaptive authentication for a sample web application.

----

## Scenario

Consider a scenario where the internal IPs of an organization are as follows: `192.168.1.0/24`, `10.100.0.0/16`. The login flow should be stepped up with TOTP when users log in from outside this IP range as follows:

1. Username and password
2. TOTP

Users who log in from the internal network should be allowed to simply log in with their username and password.

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [add a user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) named `Alex` with login permissions. Do not assign any roles to this user.

## Configure IP-based authentication

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to the **IP-Based** template.

    ![IP-based template]({{base_path}}/assets/img/samples/ip-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        - The authentication script prompts the second step of authentication for users who log in from an IP address that is not included within the network range configured in the script.
        - By default, `TOTP` will be added as the second authentication step.

7. Update the `corpNetwork` variable; two-factor authentication should apply when users log in from outside this range.

    ``` java
    var corpNetwork = ['192.168.1.0/24', '10.100.0.0/16'];
    ```

8. Click **Update** to save your configurations.

----

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter Alex's credentials.

    !!! info
        Note that you are successfully logged in after only the basic authentication step because you are logging in from an IP address that is within the configured network.

3. Log out of the application, and log in with a user not belonging to the configured IP address range. TOTP authentication is prompted.

    ![TOTP authenticator]({{base_path}}/assets/img/samples/totp-code-verification.png)

    !!! tip
        You can also try this scenario with two different machines
        in different networks to simulate a real-world scenario.
