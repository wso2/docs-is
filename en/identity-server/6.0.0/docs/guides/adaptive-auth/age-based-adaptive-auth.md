# Configure user age-based adaptive authentication

This page guides you through configuring user age-based adaptive authentication for a sample web application.

----

## Scenario

Consider a scenario where users younger than 18 should be prevented from signing in to an application and redirected to an error message.

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [update claims]({{base_path}}/guides/dialects/edit-claim-mapping) to support `BirthDate` by default.
    1. On the management console, go to **Claims > List**, select `http://wso2.org/claims`.
    2. Click on **Edit** corresponding to the **BirthDate** claim
    3. Select the **Supported By Default** checkbox to enable the birthdate claim.
- You need to [add two users]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) with login permissions, and [update the age]({{base_path}}/guides/identity-lifecycles/update-profile) as specified:

    1. Username: `Alex`; Age: `< 18 years`
    2. Username: `Kim`; Age: `> 18 years`

----

## Configure user age-based authentication

To configure user-age-based authentication:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to the **User-Age-Based** template.
    ![User age based template]({{base_path}}/assets/img/samples/user-age-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        By default, `TOTP` will be added as the second authentication step. You can update this with any authentication method.


7. Click **Update** to save your configurations.

----

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter Kim's credentials. You will be successfully logged in to the application.  

3. Logout of the application and login as `Alex`.

    ![Error message based on age validation]({{base_path}}/assets/img/samples/age-validation.png)

    You will be restricted from logging in as Alex is underage.
