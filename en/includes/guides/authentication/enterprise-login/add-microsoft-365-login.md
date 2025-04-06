# Add login with Microsoft 365

You can connect Microsoft 365 as an authenticator to your applications using {{ product_name }} and enable users to log in with their Microsoft 365 accounts.

Follow this guide for instructions.


## Register {{ product_name }} on Microsoft
You need to register {{ product_name }} as an OAuth2.0 application on Microsoft.

!!! note
    For detailed instructions, you can follow the [Microsoft documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/walkthrough-register-app-azure-active-directory){:target="_blank"}.

1. Sign in to the [Azure Portal](https://portal.azure.com/){:target="_blank"} using an account with administrator permission.

    !!! note
        You must use an account in the same Microsoft 365 subscription (tenant) with which you intend to register the app.

2. On the Azure portal, go to **Azure Services** > **Microsoft Entra ID**.

3. Click **Add** and select **App registration** from the list.

4. Provide the required information for app registration.

    ![Register an application on the Azure Portal]({{base_path}}/assets/img/guides/idp/microsoft-idp/register-an-application-microsoft-365.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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
            <td>Select the supported account type. If you wish for users to use only Microsoft 365 accounts, select either the first or the second option. Learn more about account types in the [Microsoft documentation](https://learn.microsoft.com/en-us/security/zero-trust/develop/identity-supported-account-types){:target="_blank"}.
        </tr>
        <tr>
            <td>Redirect URI</td>
             <td>Select <b>Web</b> as the platform and provide the URL to redirect after the login is completed.<br><b>Value:</b> <code>https://localhost:9443/commonauth</code></td>
        </tr>
    </table>

5. Click **Register** to create the application.

    !!! note
        Take note of the client ID after the application is created.

Now, let's generate a client secret for the application.

1. Go to **Certificates & secrets** on the left navigation and click **+ New client secret**.

2. Enter a description for the client secret and select the expiry time.

3. Click **Add** to add the client secret.

    !!! note "Important"
        Take note of the generated **Value**. Azure will allow copying this value only once. This value is the newly generated client secret for your Microsoft connection in {{ product_name }}.


## Register the Microsoft 365 IdP

Now, let's register the Microsoft IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.

2. Click **Create Connection** and select **Custom Connector**.

3. Provide a name and a description for the connector and click **Finish**.

      ![Create a custom connector]({{base_path}}/assets/img/samples/microsoft-365-custom-connector.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. On the created custom connector, go to the **Settings** tab.

5. Click **New Authenticator**, select **Office 365** and click **Next**.

6. Enter the following details of the Microsoft identity provider and click **Finish**:

    ![Add Microsoft IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/microsoft-idp/add-microsoft-365-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

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
      <tr>
          <td>Additional Query Parameters</td>
          <td>Additional parameters that will be sent in the authorization request. Learn more about URI parameters in the [Microsoft documentation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-oapx/65aeaef4-5553-43cd-b778-6e89f126717c){: target="#"}.

      </tr>
    </table>  


## Enable Microsoft 365 login

{% include "../../../guides/fragments/add-login/enterprise-login/add-microsoft-365-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with Microsoft 365**.

    ![Login with Microsoft]({{base_path}}/assets/img/guides/idp/microsoft-idp/sign-in-with-microsoft-365.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in using an existing Microsoft 365 account.

!!! note
    When a user successfully logs in with Microsoft 365 for the first time, a **user** account is created in the {{ product_name }} Console with the Microsoft 365 username. Microsoft will manage this new user account.

## Configure user attributes

{% include "../../fragments/manage-connection/manage-attributes.md" %}

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login) documentation.

