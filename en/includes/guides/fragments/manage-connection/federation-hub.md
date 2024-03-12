Federation hub is a collection of multiple IdPs configured on WSO2 Identity Server. On the federation hub, each IdP is recognized by the **home realm identifier** of the IdP.

The following diagram illustrates an authentication flow involving a federated hub.
![fed-hub-home-realm-identifier]( {{base_path}}/assets/img/guides/federation-hub-flow.png)


!!! note
    On the application's login page, you can support either local and federated authentication or just federated authentication. This can be done by setting the `proxy_mode` configuration to one of the following modes:

    <table>
        <tr>
            <td><code>smart</code></td>
            <td>Allow both local and federated authentication </td>
        </tr>
        <tr>
            <td><code>dumb</code></td>
            <td>Allow only federated authentication. The home realm identifier must be configured to operate in this mode.  </br>If it is not configured, a separate screen should be displayed to get it from the user.</td>
        </tr>
    </table>
    Configure the `proxy_mode` by opening the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory
    and setting one of the above modes as follows.

    ```bash
    [authentication] 
    proxy_mode="smart"
    ```
To add a connection to federation hub,

1. On the {{ product_name }} Console, click **Connections** and select the relevant connection.

2. Go to the **Advanced** tab of the selected connection.

3. Turn on the **Federation Hub** toggle to add the connection.

4. Enter the **Home Realm Identifier**. This value is an identifier used when your application uses a federated IdP. If a user selects this IdP and sends an authentication request, the fidp query parameter will be populated with this value. (example: fidp = googleIdP)

5. Click **Update** to save the changes.

