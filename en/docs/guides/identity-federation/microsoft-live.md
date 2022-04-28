# Configure Microsoft Live as a federated authenticator

Microsoft Windows Live can be used as a federated authenticator in the
Identity Server.

Follow the steps given below to configure WSO2 Identity Server to
authenticate users with their Microsoft Live user accounts.

## Create a Microsoft Live app

1.  [Register an application on Windows Live](https://msdn.microsoft.com/en-us/library/hh826541.aspx).
2.  You need to have an application created in Windows live.

    !!! Info
        See [Configuring your app](https://msdn.microsoft.com/en-us/library/hh826541.aspx) for instructions.

{! fragments/register-an-identity-provider.md !}
4.  Expand the **Microsoft (Hotmail, MSN, Live) Configuration** section and specify the following values:  
   
    ![microsoft-configuration](../../assets/img/guides/microsoft-configuration.png)
    
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

