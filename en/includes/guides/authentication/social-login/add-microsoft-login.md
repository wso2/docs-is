# Add Microsoft login

You can add Microsoft login to your applications using {{ product_name }} and enable users to log in with their Microsoft account.

Follow this guide for instructions.


## Register {{ product_name }} on Microsoft
You need to register {{ product_name }} as an OAuth2.0 application on Microsoft.

!!! note
    For detailed instructions, you can follow the [Microsoft documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/walkthrough-register-app-azure-active-directory).

1. Sign in to the [Azure Portal](https://portal.azure.com/) using an account with administrator permission.

    !!! note
        You must use an account in the same Microsoft 365 subscription (tenant) with which you intend to register the app.

2. On the Azure portal, go to **Azure Services > Azure Active Directory**.
    ![Azure Active Directory service]({{base_path}}/assets/img/guides/idp/microsoft-idp/azure-active-directory.png){: width=600"}

3. Click **Add** and select **App registration** from the list.

4. Provide the required information for app registration.
    ![Register an application on the Azure Portal]({{base_path}}/assets/img/guides/idp/microsoft-idp/register-an-application.png){: width=600"}

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter a meaningful name for your application.</td>
        </tr>
        <tr>
            <td>Supported Account Type</td>
            <td>Select the supported account type. <br><b>Value: </b><code>Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g., Skype, Xbox)</code></td>
        </tr>
        <tr>
            <td>Redirect URI</td>
            <td>Select a platform according to your application and enter the redirect URI. <br><b>Value:</b> <code>https://api.asgardeo.io/t/{organization_name}/commonauth</code></td>
        </tr>
    </table>

5. Click **Register** to create the application.

    !!! note
        Take note of the client ID after the application is created.

Now, let's generate a client secret for the application.

1. Go to **Certificates & secrets** on the left navigation and click **+ New client secret**.
2. Enter a description for the client secret and select the expiry time.
3. Click **Add** to add the client secret.

    !!! note Important
        Take note of the generated **Secret ID**. Azure will allow copying this value only once.


## Register the Microsoft IdP

Now, let's register the Microsoft IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Microsoft**.
3. Enter the following details of the Microsoft identity provider and click **Finish**:

    ![Add Microsoft IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/microsoft-idp/add-microsoft-idp.png){: width=600"}

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name for this Microsoft identity provider.</td>
      </tr>
      <tr>
          <td>Client ID</td>
          <td>The client ID obtained from Microsoft.</td>
      </tr>
      <tr>
          <td>Client secret</td>
          <td>The client secret obtained from Microsoft.</td>
      </tr>
    </table>  

<!-- 4. If required, you can [disable JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/). -->  

??? note "Claim syncing for JIT-provisioned users"
    [JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/) is enabled by default for your external identity provider. If required, you can [disable JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/#disable-jit-user-provisioning).

    When a user with a local {{ product_name }} account uses the same email address to log in through an external identity provider, {{ product_name }} syncs the claims from the JIT-provisioned user account and the local account.

    According to the default behavior of {{ product_name }}, when JIT user provisioning is enabled, the user claims of the local user account are overridden by the user claims received from the external identity provider.

    You can use {{ product_name }}'s [identity provider APIs]({{base_path}}/apis/idp/#/operations/getJITConfig) to configure claim syncing between the external identity provider and the local user accounts. This gives you the flexibility to customize the claim syncing behavior according to your specific requirements.

After the Microsoft identity provider is created, go to the **Settings** tab and see the list of **scopes** to which Microsoft has granted permissions.

- **email**: Allows to view the user's email address.
- **openid**: Allows authentication using OpenID Connect and to obtain the ID token.
- **profile**: Allows to view the user's basic profile data.

!!! note
    {{ product_name }} needs these scopes to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Microsoft to the app. You can read the [Microsoft documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#openid-connect-scopes) to learn more.


## Enable Microsoft login

!!! note Before you begin
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application, go to the **Sign-in Method** tab and add Microsoft login from your preferred editor:

    !!! note "Recommendations"
        {{ product_name }} recommends adding your social and enterprise connections to the first authentication step, as they are used for identifying the user.

    ---
    === "Classic Editor"
        To add Microsoft login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the step, select your Microsoft identity provider, and click **Add**.

            ![Add Microsoft login in Asgardeo]({{base_path}}//assets/img/guides/idp/microsoft-idp/add-microsoft-with-basic.png){: width=700"}

    === "Visual Editor"
        To add Microsoft login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your Microsoft connection.

            ![Add Microsoft login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/idp/microsoft-idp/add-microsoft-login-with-visual-editor.png){: width=500"}

    ---

3. Click **Update** to save your changes.

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, **Sign in with Microsoft**.

    ![Login with Microsoft]({{base_path}}/assets/img/guides/idp/microsoft-idp/sign-in-with-microsoft.png){: width=300"}

4. Log in to Microsoft with an existing user account.

!!! note
    When a user successfully logs in with Microsoft for the first time, a **user** account is created in the {{ product_name }} Console with the Microsoft username. Microsoft will manage this new user account.

## Add groups to the connection

{% include "../../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../../fragments/manage-connection/delete-connection.md" %}