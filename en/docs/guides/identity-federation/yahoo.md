# Configure Yahoo as a federated authenticator

Yahoo can be used as a federated authenticator in WSO2 Identity
Server. 

Follow the steps given below to configure the Identity Server to
authenticate users using their Yahoo user accounts.

## Create a Yahoo app
    
1.  [Create a Yahoo developer account](https://developer.yahoo.com/oauth2/guide/openid_connect/getting_started.html#getting-started-setup=).
2.  You need to have an application registered in Yahoo. 

    !!! Info
        See [Getting Started](https://developer.yahoo.com/oauth2/guide/openid_connect/getting_started.html) for instructions.
   
    ![yahoo-configuration]({{base_path}}/assets/img/guides/yahoo-configuration.png)

{!./includes/register-an-identity-provider.md !}
3. Expand the **OAuth2/OpenID Connect Configuration** section and specify the following values:

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Enable</td>
            <td>Selecting this option enables Yahoo to be used as an authenticator for users provisioned to WSO2 Identity Server.</td>
        </tr>
        <tr>
            <td>Default</td>
            <td>Selecting the <b>Default</b> checkbox signifies that Yahoo is the main/default form of authentication. This removes the selection made for any other <b>Default</b> checkboxes for other authenticators.</td>
        </tr>
        <tr>
            <td>Client Id</td>
            <td>
                This is the username from the Yahoo application.
            </td>
        </tr>
      <tr>
            <td>Client Secret</td>
            <td>This is the password from the Yahoo application. Click <b>Show</b> to view the value you enter.</td>
        </tr>
      <tr>
            <td>Authorization Endpoint URL</td>
            <td>
                <p>This is a standard OAuth Authorization Endpoint URL of Yahoo.</p>
                <code>https://api.login.yahoo.com/oauth2/request_auth</code>.
            </td>
        </tr>
       <tr>
            <td>Token Endpoint URL</td>
            <td>
                <p>This is a standard OAuth Token Endpoint URL of Yahoo.</p>
                <code>https://api.login.yahoo.com/oauth2/get_token</code>.
            </td>
        </tr>
          <tr>
            <td>Callback URL</td>
            <td>
                <p>This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: <code>https://(host-name):(port)/commonauth</code>.</p>
                <b>Example</b>: <code>https://localhost:9443/commonauth</code>.
            </td>
        </tr>
          <tr>
            <td>Userinfo Endpoint URL</td>
            <td>
                <p>This is a standard UserInfo Endpoint URL of Yahoo.</p>
                <code>https://api.login.yahoo.com/openid/v1/userinfo</code>.
            </td>
        </tr>
       
   
    </table>