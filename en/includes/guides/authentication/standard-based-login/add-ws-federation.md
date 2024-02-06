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

!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application, go to the **Sign-in Method** tab and add WS-Federation from your preferred editor:

    !!! note "Recommendations"
        {{ product_name }} recommends adding your social and enterprise connections to the first authentication step, as they are used for identifying the user.

    ---
    === "Classic Editor"
        To add WS-Federation login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the step, select your WS-Federation IdP, and click **Add**.

            ![Add WS-Fed identity provider login in {{ product_name }}]({{base_path}}/assets/img/guides/idp/ws-fed-idp/enable-ws-fed-login-with-basic.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add WS-Federation login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your WS-Federation connection.

            ![Add OIDC IdP login in Asgardeo with visual editor]({{base_path}}/assets/img/guides/idp/ws-fed-idp/add-ws-fed-idp-with-visual-editor.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}
    ---

3. Click **Update** to save your changes.


## Add groups to the connection

{% include "../../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../../fragments/manage-connection/delete-connection.md" %}
