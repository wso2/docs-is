# Share applications with organizations

Applications in the organization (root) can be shared with child organizations. Once an application is shared with an organization, an organization's users can log in to the application.

Follow the steps below to share your applications with organizations.

1. Login to your organization (root) on the {{ product_name }} Console.
2. Go to **Applications** and select the application that you want to share with your organizations.
3. Go to the **Shared Access** tab and select **Share with only selected organizations**.

    !!! note
        Select **Share with all organizations** if you want to share your application with all existing organizations and any new organizations you may create in the future.

4. Select the organizations you wish to share your application with.

    ![Share application with organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/share-application.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the configurations.
6. Go to the **Protocol** tab of the application, be sure that the following [grant types]({{base_path}}/references/grant-types/) are allowed.

    - Client Credential
    - Code
    - Organization Switch

    !!! note
        The `Organization Switch` grant will only be visible after you share the application with organizations.

7. Click **Update** to save the changes.


Once you have shared the application with an organization, check if the following settings are in place for the application.

- Ensure the **SSO** authenticator is added to the login flow of the application. This adds the **Sign in with SSO** option to the application login screen so that organization users can log in using their credentials. Check its availability in the **Login Flow** tab of the application.

    ![Sign-in-method-options]({{base_path}}/assets/img/guides/organization/manage-organizations/sso-signin-method.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- Ensure the application is available in the organization. To check this, switch to the organization and verify that the application is listed in the **Applications** section.

    ![Shared Guardio Insurance Application]({{base_path}}/assets/img/guides/organization/manage-organizations/fragmented-app.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- While in the organization, select the shared application and ensure the username and password authenticator is enabled in the login flow. The organization users can then use the **Sign In with SSO** option to log in using their credentials.

To try out a complete use case, see [Try a B2B use case]({{base_path}}/guides/organization-management/try-a-b2b-use-case/).
