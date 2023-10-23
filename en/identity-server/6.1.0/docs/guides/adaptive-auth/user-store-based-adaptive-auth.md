# Configure user store-based adaptive authentication

This page guides you through configuring user store-based adaptive authentication for a sample web application.

This is useful if you want to add security for users logging in from other user store domains.

Using the user store-based adaptive authentication template, you can allow certain user store domains so that users from the allowed domains are prompted to perform an additional level of authentication, while users from any other user store domain can simply provide their credentials (basic authentication) to access a resource.

----

## Scenario

Consider a scenario where you want to step up authentication for users who belong to `EMPLOYEES` and `CONTRACTORS` user store domains. For users assigned to these user store domains, the login flow in applications should be stepped up with TOTP as follows:  

1. Basic authentication (username and password)
2. TOTP or FIDO

----

## Prerequisites

- See the [general prerequisites]({{base_path}}/guides/adaptive-auth/configure-adaptive-auth/#prerequisites-for-adaptive-authentication) for all adaptive authenticaiton scenarios.
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to set up a database. For this scenario, we will use an LDAP server.
- You need to configure a new user store:
    1. On the management console, go to **Main > Identity > User Stores > Add**.
    2. Create a user store named `EMPLOYEES` and add the following values for the fields.

        | Field name    | Value |
        |---------------|-------|
        | **Connection URL**    | ldap://localhost:10390    |
        | **Connection Name**   | uid=admin,ou=system   |
        | **Connection Password**   | secret    |
        | **User Search Base**  | ou=users,ou=system    |
        | **Username Attribute**    | uid   |
        | **User Search Filter**    | (&(objectClass=person)(uid=?))
    |
        | **User List Filter**  | (objectClass=person)
    |
        | **User ID Attribute** | uid   |
        | **User ID Search Filter** | (&(objectClass=person)(uid=?))    |

    3. Expand the **Optional** tab and add the following:

        | Field name    | Value |
        |---------------|-------|
        | **Group Search Base**    | ou=groups,ou=system    |

    4. Click **Update** to save the configurations.

- You need to [add two users]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) with login permissions, and add their **Domain** as specified:

    1. Username: `Alex`; Domain: `PRIMARY`
    2. Username: `Kim`; Domain: `EMPLOYEES`


## Configure user store-based authentication

To configure user store-based authentication:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to the **Role-Based** template.

    ![Userstore based authentication template]({{base_path}}/assets/img/samples/user-store-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        - The authentication script prompts the second step of authentication for users that belong to the user stores named `EMPLOYEES` and `CONTRACTORS`.
        - By default, `TOTP` will be added as the second authentication step. You can update this with any authentication method.

7. Click **Update** to save your configurations.

----

## Create an LDAP Server

1.  Open Apache Directory Studio.

2.  On the **LDAP Servers** tab found on the bottom left corner,click **New Server**.  

    ![new-server]({{base_path}}/assets/img/fragments/new-server.png)

3.  Select **LDAP server ApacheDS 2.0.0** and click **Finish**.  

    ![select-ldap-server]({{base_path}}/assets/img/fragments/select-ldap-server.png)

4.  Right-click on the newly created server and click **Open Configuration**.

    ![ldap-server-config]({{base_path}}/assets/img/fragments/ldap-server-config.png)

5.  Port offset the LDAP and LDAP server ports by changing the LDAP port to 10390 and the LDAP server port to 10637. This ensures that the embedded LDAP server running in the prior installation of WSO2 IS does not conflict with the current installation.

    ![ldap-port-offset]({{base_path}}/assets/img/fragments/ldap-port-offset.png)

6.  Right-click on the new server and click **Create a Connection**.  

    ![create-an-ldap-connection]({{base_path}}/assets/img/fragments/create-ldap-connection.png)

7.  Right-click on the server and click **Run** to start the server.

    ![run-ldap-server]({{base_path}}/assets/img/fragments/run-ldap-server.png) 

----

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter Alex's credentials.

    !!! info
        Note that Alex is successfully logged in to the application after going through only the basic authentication step.

3. Log out from the application and log in using Kim's credentials. 

    !!! info
        Note that Kim is prompted for the second step of authentication (i.e., TOTP) since she belongs to the user store domain `EMPLOYEES`, which is within the list of user stores that should be stepped up.  

4. Enter the TOTP code and click **Sign In**.  

    ![TOTP verification]({{base_path}}/assets/img/samples/totp-code-verification.png)  

    !!! tip
        Ensure that the LDAP server in Apache DS is running when attempting to log in as Kim.