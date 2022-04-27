# Configure Yahoo as a federated authenticator

Yahoo can be used as a federated authenticator in WSO2 Identity
Server. 

Follow the steps given below to configure the Identity Server to
authenticate users using their Yahoo user accounts.

## Set up Yahoo
    
1. [Create a Yahoo developer account](https://developer.yahoo.com/oauth2/guide/openid_connect/getting_started.html#getting-started-setup=).
2. You need to have an application registered in Yahoo. 

!!! Info
    See [Getting Started](https://developer.yahoo.com/oauth2/guide/openid_connect/getting_started.html) for instructions.
   
  ![yahoo-configuration](../assets/img/tutorials/yahoo-configuration.png)

## Configure Yahoo as an IdP

1. Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console) at `https://<Server Host>:9443/carbon` using your `username` and `password`.
2. Go to **Main** --> **Identity** menu and click **Add** under **Identity Providers**.
3. Fill in the details in the **Basic Information** section.
4. Expand the **Yahoo Configuration** section and specify the following values:

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
                This is the username from the Yahoo application.
            </td>
        </tr>
    </table>