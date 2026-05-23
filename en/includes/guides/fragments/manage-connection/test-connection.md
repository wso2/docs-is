<!-- markdownlint-disable-next-line -->

You can verify that your connection is configured correctly by running a test against the federated identity provider. {{ product_name }} initiates an authentication request to the IdP and displays the result, letting you confirm that the connection works before using it in an application's login flow.

To test a connection:

1. On the {{ product_name }} Console, go to **Connections**.
2. Click on the connection you want to test.
3. Click **Test Connection** on the connection's page.

    ![Test Connection button on a connection page]({{base_path}}/assets/img/guides/idp/test-connection/test-connection-button.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. {{ product_name }} redirects you to the federated identity provider's login page. Authenticate using a valid account from that IdP.
5. After a successful authentication, you are redirected back to {{ product_name }}, and the test results are displayed.

    ![Test results page showing a successful connection test]({{base_path}}/assets/img/guides/idp/test-connection/test-connection-results.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

The results page shows three tabs:

<table>
    <tr>
        <th>Tab</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>ID Token</td>
        <td>Displays the decoded header and payload of the ID token returned by the federated IdP. Use this to verify that the token is well-formed and that expected claims such as <code>sub</code>, <code>iss</code>, and <code>aud</code> are present.</td>
    </tr>
    <tr>
        <td>Claim Mappings</td>
        <td>Lists the claims received from the IdP alongside the local claims they are mapped to in {{ product_name }}. Use this to confirm that claim mappings are resolving as expected.</td>
    </tr>
    <tr>
        <td>Diagnosis</td>
        <td>Provides a step-by-step diagnostic log of the connection test. Each entry shows the stage, outcome, and any error details, making it easier to pinpoint configuration issues.</td>
    </tr>
</table>

!!! note
    You can click **Rerun Test** at any time to run the connection test again without leaving the results page.

If the test fails, review the **Diagnosis** tab for error details and verify the connection settings such as the client ID, client secret, and endpoint URLs.
