# Add login with WS-Federation

You can add login with WS-Federation to your applications and enable users to log in with their external identities.
Follow this guide to register a WS-Federation connection and add it to the login flow of your application.


## Register the WS-Fedration IdP

Let's register the WS-Fed IdP in {{product_name}}.

1. On the {{ product_name }} Console, go to **Connections**.

2. Click **Create Connection** and select **Custom Connector**.

3. Provide a name and a description for the connector and click **Finish**.

      ![Create a custom connector]({{base_path}}/assets/img/samples/ws-fed-custom-connector.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. On the created custom connector, go to the **Settings** tab.

5. Click **New Authenticator**, select **WS-Federation** and click **Next**.

6. Enter the following details and click **Finish**.

    ![Configure the Ws-Fed connector]({{base_path}}/assets/img/samples/ws-fed-configure-connector.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
         <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Passive STS Realm</td>
            <td>Value of your choice that serves as the unique identifier for the realm.</br>
                e.g.<code>WSFederationHealthCare</code>
            </td>
        </tr>
        <tr>
            <td>Passive STS URL</td>
            <td>
            <p>Passive STS endpoint of the IdP.</br>
                e.g. for {{product_name}}, it is <code>https://localhost:9443/passivests</code></p>.
            </td>
        </tr>
        <tr>
            <td>Passive STS User ID Location</td>
            <td>Select whether the User ID is found in the <code>Name Identifier</code> as part of the authentication request or found among the claims.</td>
        </tr>
        <tr>
            <td>Enable SAML Assertion Signature Validation</td>
            <td>Select to enable validation for the signature sent over the SAML assertion.</td>
        </tr>
        <tr>
            <td>Enable SAML Assertion Audience Validation</td>
            <td>Select to enable validation for the audience attribute sent in the SAML assertion. </td>
        </tr>
        <tr>
            <td>Additional Query Parameters</td>
            <td>Include any other parameters that are required by the external IdP.</td>
        </tr>
    </table>


## Enable WS-Fed for login

{% include "../../../guides/fragments/add-login/standard-based-login/add-ws-federation.md" %}

## Configure user attributes

{% include "../../fragments/manage-connection/manage-attributes.md" %}