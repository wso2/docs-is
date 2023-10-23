# Configure tenant-based adaptive authentication

This page guides you through configuring tenant-based adaptive authentication for a sample web application.

----

## Scenario

Consider a scenario with two tenant domains, `abc.com` and `123.com`. For users logging into the application through `abc.com`, the login flow in applications should be stepped up with TOTP as follows:  

1. Basic authentication (username and password)
2. TOTP

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [add two new tenants]({{base_path}}/guides/tenants/tenant-mgt/) with the following specifications:

    | Field name    | Tenant 1  | Tenant 2  |
    |---------------|-----------|-----------|
    | **Domain**    | abc.com    | 123.com   |
    | **Usage Plan for Tenant** | Demo   | Demo |
    | **First Name**    | Alex  | Kim   |
    | **Last Name** | Doe   | Doe   |
    | **Admin Username**    | alex  | kim   |
    | **Admin Password**    | alex321   | kim321    |
    | **Email** | alex_d@gmail.com  | kim_d@gmail.com  |

----

## Configure tenant-based authentication

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Select **SaaS application** under **Basic Information**, to enable users from other tenant domains to log in to your application.

    ![Enable servie provider as a SaaS application]({{base_path}}/assets/img/guides/enable-saas-app.png)

4. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

5. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

6. In the **Templates** section, click on the **`+`** corresponding to the **Tenant-Based** template.  

    ![Tenant based template]({{base_path}}/assets/img/samples/tenant-based-template.png)

7. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        - The authentication script prompts the second step of authentication for users that belong to the tenant domains named `abc.com` and `xyz.com`.
        - By default, `TOTP` will be added as the second authentication step.

8. Click **Update** to save the configurations.

----

## Try it out

1. Log out of the management console and log in with the **abc.com** tenant admin's credentials (i.e., `alex@abc.com`).  

2. [Create a new user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) in the `abc.com` tenant named `chris` with login permission.

3. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

4. Click **Login** and enter Chris's credentials. The username should be appended with the domain to which Chris belongs, i.e., `chris@abc.com`.

5. You will be prompted to enter your `TOTP` code, enter the code and click **Sign In**.  

    ![TOTP authenticator]({{base_path}}/assets/img/samples/totp-code-verification.png)

6. Logout from the application and log in with Kim's credentials. Kim is the admin of the **123.com** tenant domain, which is not in the tenant domains specified in the script.

Note that you are successfully logged in to the application after only going through the basic authentication step.
