# Register a standard-based application

To integrate an application with {{product_name}}, you need to register it through the {{product_name}} Console. Registering a standard-based application lets you configure protocol settings (OIDC, SAML{% if product=="is"%} , WS-Fed{% endif%}) from scratch.

## Register an application

To register an application:

1. On the {{ product_name }} Console, go to **Applications**.
2. Click **New Application** and select **Standard-Based Application**.

    ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/register-an-sba.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Provide an application name.

4. Select your application's protocol and enter values for the related settings:

    === "OAuth 2.0 & OpenID Connect"

        Configure the following options:

        - **FAPI Compliant Application** - Check this box to restrict your application to use only FAPI-compliant protocol options. See [Register a FAPI-compliant application]({{base_path}}/guides/applications/register-a-fapi-compliant-app/) for more information.

    === "SAML"

        Select a configuration method and follow the related steps:

        === "Manual"
        
            Configure the following options:

            - **Issuer** - A unique identifier for your application. This should match the `Issuer` value in incoming SAML authentication requests.
            - **Assertion consumer service URLs** - URL in your application where {{product_name}} sends the SAML response after a successful login.
            
        === "File Based"

            Upload an XML file that contains the required metadata.

        === "URL Based"
            Configure the following options:
            
            - **Meta URL** - Provide a URL to fetch the required metadata.

    === "WS-Federation"
        Configure the following options:

        - **Realm** - Unique identifier for your application.

        - **Reply URL** - The URL in your application where {{product_name}} sends the response after a successful login.

5. If you have set up [organizations]({{base_path}}/guides/organization-management/), select **Allow sharing with organizations** to make this application available to them. You can customize sharing options in step 7.

6. Click **Register** to complete the registration.

7. If you enabled Allow sharing with organizations in step 5, a dialog appears prompting you to choose how to share the application. Select the appropriate option and click **Share Application** to proceed.

    ![Share the application with organizations]({{base_path}}/assets/img/guides/applications/share-application.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Share with all organizations</td>
            <td>The application will be shared with all existing organizations and any new organizations you may create in the future.</td>
        </tr>
        <tr>
            <td>Share with only selected organizations</td>
            <td>You can select the organizations you wish to share the application with.</td>
        </tr>
    </table>

## Configure protocol-specific settings

Now that you've registered your standard-based application with basic settings, you can access a broader range of configuration options. Use the following pages to explore and customize these settings according to your needs.

- [OIDC configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/)
- [SAML configurations]({{base_path}}/references/app-settings/saml-settings-for-app/)
- [WS-Federation configurations]({{base_path}}/references/app-settings/ws-federation-settings-for-app/)
