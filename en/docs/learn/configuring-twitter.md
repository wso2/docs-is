# Configuring Twitter

Twitter can be used as a federated authenticator in WSO2 Identity
Server. Follow the steps below to configure WSO2 Identity Server to
authenticate users using their Twitter login credentials:

!!! tip "Before you begin"
    
    1.  Go to <https://twitter.com/> , create an account, and [register an
        application on
        Twitter](http://docs.inboundnow.com/guide/create-twitter-application/)
        .
    2.  Sign in to the WSO2 Identity Server [Management
        Console](../../setup/getting-started-with-the-management-console)
        at `          https://<Server Host>:9443/carbon         ` using your
        `          username         ` and `          password         ` .
    
In the WSO2 Identity Server management console, 

1.  Navigate to the **Identity Provider** section under **Main \>
    Identity** menu-item.
2.  Click **Add**.
3.  Provide values for the following fields under the **Basic
    Information** section: For more information, see
    [Adding and Configuring an Identity
        Provider](../../learn/adding-and-configuring-an-identity-provider/#adding-an-identity-provider).

4.  Expand **Twitter Configuration** under **Federated Authenticators**
    .
    ![twitter-config-federated-auth.png](../assets/img/tutorials/twitter-config-federated-auth.png)
    Fill in the following fields details according to the application
    [registered in the Twitter](http://docs.inboundnow.com/guide/create-twitter-application/):

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>This option enables Twitter to be used as an authenticator for user provisioned to the WSO2 Identity Server.</td>
    <td>Checked</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>This options sets the Twitter to be used as the default authentication mechanism. If you have already selected any other Identity Provider as the default federated authenticator, selecting this option deselects it.</td>
    <td>Checked</td>
    </tr>
    <tr class="odd">
    <td>API Key</td>
    <td>This is the <code>               consumer key              </code> generated at the Twitter application registration.</td>
    <td><code>               wuerRmdgwlqX0oE1WNDdsh17o              </code></td>
    </tr>
    <tr class="even">
    <td>API Secret</td>
    <td>This is the <code>               consumer secret              </code> generated at the Twitter application registration.</td>
    <td><div class="row">
    <code>                771tqnkpcbRyTBSCRQvVud1x8j1uQlCDpNZo3hRG0s4cEtsFky               </code>
    </div></td>
    </tr>
    <tr class="odd">
    <td>Callback URL</td>
    <td><p>This is the Callback URL you entered at the Twitter application registration. This is the URL to which the browser should be redirected after the authentication is successful.</p>
    <p>URL format: <code>                https://&lt;host-name&gt;:&lt;port&gt;/acs               </code></p>
    <p>The acs indicates the Assertion Consumer URL of the WSO2 Identity Server endpoint that accepts the responses sent by Twitter.</p></td>
    <td><code>                               https://wso2.com:9443/commonauth                             </code></td>
    </tr>
    </tbody>
    </table>

5.  Click **Register**.
