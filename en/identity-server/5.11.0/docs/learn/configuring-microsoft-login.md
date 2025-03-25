# Configuring Microsoft login

Microsoft login can be used as a federated authenticator in the
Identity Server. Do the following to configure the Identity Server to
authenticate users using their Microsoft accounts.

# Configure Microsoft login as a federated authenticator

Microsoft login can be used as a federated authenticator in the
Identity Server.

Follow the steps given below to configure WSO2 Identity Server to
authenticate users with their Microsoft accounts.

## Register WSO2 Identity Server on Microsoft

You need to register WSO2 Identity Server as an OAuth2.0 application on Microsoft Entra ID.

!!! note
    For detailed instructions, you can follow the [Microsoft documentation](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app){:target="_blank"}.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/){:target="_blank"} using an account with administrator permission.

    !!! note
        You must use an account in the same Microsoft 365 subscription (tenant) with which you intend to register the app.

2. Go to **Identity** > **Applications** > **App registrations** and select **New registration**.

3. Click **Add** and select **App registration** from the list.

4. Provide the required information for app registration.

   ![Register an application on the Microsoft Entra admin center]({{base_path}}/assets/img/guides/idp/microsoft-idp/register-an-application.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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
            <td>Select the supported account type. <br><b>Value: </b><code>Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (e.g., Skype, Xbox)</code></td>
        </tr>
        <tr>
            <td>Redirect URI</td>
            <td>Select <b>Web</b> as the platform and provide the URL to redirect after the login is completed.<br><b>Value:</b> <code>{{product_url_format}}/commonauth</code></td>
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
        Take note of the generated **Value**. Microsoft Entra will allow copying this value only once. This value is the newly generated client secret for your Microsoft connection in WSO2 Identity Server.


!!! tip "Before you register the Microsoft IdP"

    1.  Sign in to the WSO2 Identity Server [Management
        Console](../../setup/getting-started-with-the-management-console)
        at `          https://<Server Host>:9443/carbon         ` using your
        `          username         ` and `          password         ` .
    

1.  To navigate to the federated authenticators configuration section,
    do the following.
    1.  Sign in. Enter your username and password to log on to the
        [Management
        Console](../../setup/getting-started-with-the-management-console).
        
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Identity Providers**.  
        For more information, see [Adding and Configuring an Identity
        Provider](../../learn/adding-and-configuring-an-identity-provider).
        
    3.  Fill in the details in the **Basic Information** section.

2.  Expand the **Federated Authenticators** link.

3.  Expand the **Microsoft (Hotmail, MSN, Live) Configuration** form.  
    ![microsoft-configuration](../assets/img/tutorials/microsoft-configuration.png)
    
4.  Fill in the following fields where relevant.  
    Prior to configuring, you need to have an application created in
    Microsoft login.

    | Field         | Description                                                                                                                                                                                                                | Sample value                                                                                                                                                     |
    |---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Enable        | Selecting this option enables Microsoft to be used as an authenticator for users provisioned to the Identity Server.                                                                                                       | Selected                                                                                                                                                         |
    | Default       | Selecting the **Default** check box signifies that Microsoft is the main/default form of authentication. This removes the selection made for any other **Default** checkboxes for other authenticators.                    | Selected                                                                                                                                                         |
    | Client Secret | This is the password from the Microsoft login application. Click the **Show** button to view the value you enter.                                                                                                           | 12ffb4dfb2fed67a00846b42126991f8                                                                                                                                 |
    | Callback URL  | This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: `                               https://(host-name):(port)/acs                             ` | [https://localhost:9443/commonauth](https://www.google.com/url?q=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&sa=D&sntz=1&usg=AFQjCNG7dB10sZ-F07Du9Q5fT-mVDMfobg) |
    | Client Id     | This is the username from the Microsoft login application.                                                                                                                                                                  | 1421263438188909                                                                                                                                                 |

!!! info "Related Topics"

	-   Identity Federation is part of the process of configuring an
		identity provider. For more information on how to configure an
		identity provider, see [Configuring an Identity
		Provider.](../../learn/adding-and-configuring-an-identity-provider)
