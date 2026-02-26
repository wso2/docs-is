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


{!./includes/register-an-identity-provider.md !}
4.  Expand the **Microsoft (Hotmail, MSN, Live) Configuration** section and specify the following values:  
   
    ![microsoft-configuration]({{base_path}}/assets/img/guides/microsoft-configuration.png)
    
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Enable</td>
            <td>Selecting this option enables Microsoft to be used as an authenticator for users provisioned to the Identity Server.</td>
        </tr>
        <tr>
            <td>Default</td>
            <td>Selecting the <b>Default</b> checkbox signifies that Microsoft is the main/default form of authentication. This removes the selection made for any other <b>Default</b> checkboxes for other authenticators.</td>
        </tr>
        <tr>
            <td>Client Secret</td>
            <td>This is the password from the Yahoo application. Click <b>Show</b> to view the value you enter.</td>
        </tr>
        <tr>
            <td>Callback URL</td>
            <td>
                <p>This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: <code>https://(host-name):(port)/acs</code>.</p>
                <b>Example</b>: <code>https://localhost:9443/commonauth</code>.
            </td>
        </tr>
        <tr>
            <td>Client Id</td>
            <td>
                This is the username from the Microsoft application.
            </td>
        </tr>
    </table>

