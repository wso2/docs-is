# Register a standard-based application
When you integrate an application with {{ product_name }}, the first step is to register your app from the {{ product_name }} Console. If you choose the standard-based application type when you register your app, it allows you to configure the protocol settings (OIDC, SAML or WS-Federation) from scratch.

You can also use the standard-based application type in the following scenarios:

- Integrate a web/mobile application with the password grant type. The application types for, single- page applications and, traditional web applications and mobile applications do not support password grant type as it is not recommended.
- Access the [management APIs]({{base_path}}/apis/) of {{ product_name }}.

!!! note
    Alternatively, you can register using an application type that has configurations optimized for specific applications.

    - [Register an SPA]({{base_path}}/guides/applications/register-single-page-app/)
    - [Register an OIDC web application]({{base_path}}/guides/applications/register-single-page-app/)
    - [Register a SAML web application]({{base_path}}/guides/applications/register-saml-web-app/)

## Register an application

To register an application:

1. On the {{ product_name }} Console, go to **Applications**.
2. Click **New Application** and select **Standard-Based Application**.

    ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/register-an-sba.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Provide an application name and select the other options based on your requirements.

    !!! note
        - You can choose OIDC, SAML or WS-Federation as the standard protocol for your application. See the complete list of [OIDC]({{base_path}}/references/app-settings/oidc-settings-for-app/), [SAML]({{base_path}}/references/app-settings/saml-settings-for-app/) and [WS-Federation]({{base_path}}/references/app-settings/ws-federation-settings-for-app/) configurations.
        - If you use OIDC, you can configure a management app, which can access the management APIs in {{ product_name }}. Learn about [invoking management APIs]({{base_path}}/apis/#get-access-to-apis/).

4. Click **Register** to complete the registration.

    !!! note
        If you have enabled **Allow sharing with organizations** while registering the application, you will see a popup window with the following options.

        ![Share the application with organizations]({{base_path}}/assets/img/guides/applications/share-application.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        <table>
            <tr>
                <th>Option</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>Share with all organizations</td>
                <td>If selected, the application will be shared with all existing organizations and any new organizations you may create in the future.</td>
            </tr>
            <tr>
                <td>Share with only selected organizations</td>
                <td>If selected, you can select the organizations you wish to share the application with.</td>
            </tr>
        </table>

## What's Next?

- [Configuring an OIDC application]({{base_path}}/references/app-settings/oidc-settings-for-app/)
- [Configuring a SAML application]({{base_path}}/references/app-settings/saml-settings-for-app/)
- [Configuring a WS-Federation application]({{base_path}}/references/app-settings/ws-federation-settings-for-app/)
