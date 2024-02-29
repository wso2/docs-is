# Share applications with organizations

Applications in the [organization (root)]({{base_path}}/guides/{{root_org_description_path}}) will become available to organizations when you share them. Once an application is shared with an organization, its users can log in to the application using [SSO]({{base_path}}/guides/organization-management/try-a-b2b-use-case) login option.

Follow the steps below to share your applications with organizations.

1. Login to your organization (root) on the {{ product_name }} Console.
2. Go to **Applications** and select the application that you want to share with your organizations.
3. Go to the **Shared Access** tab and select **Share with only selected organizations**.

    !!! note
        Select **Share with all organizations** if you want to share your application with all existing organizations and any new organizations you may create in the future.

4. Select the organizations you wish to share your application with.

    ![Share application with organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/share-application.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the configurations.
6. Go to the **Protocol** tab of the application, be sure that the following [grant types]({{base_path}}/references/grant-types/) are allowed, and click **Update**.

    !!! note
        Note that the `Organization Switch` grant will only be visible after you share the application with organizations.

      - Client Credential
      - Code
      - Organization Switch

Note the following:

- Go to the **Login Flow** tab of the application and ensure that the **SSO** authenticator is added if the application is shared to at least one existing organization.
  If you share the application selecting **Share with all organizations** option, even if you haven't onboarded any organizations at the moment, the **SSO** authenticator will be added automatically following the creation of the first organization.

    !!! note
        This adds the **Sign in with SSO** option to the application login screen so that organization users can log in using their credentials.

  ![Sign-in-method-options]({{base_path}}/assets/img/guides/organization/manage-organizations/sso-signin-method.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- Switch to the relevant organization and ensure that your application is available under **Applications** as a shared app.

  ![Shared Guardio Insurance Application]({{base_path}}/assets/img/guides/organization/manage-organizations/fragmented-app.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- Go to the **Login Flow** tab of the shared app and see that login with username and password is enabled.

Once an application is shared with an organization, its users can use the **Sign In with SSO** option to log in using their credentials.

To try out a complete use case, see [Try a B2B use case]({{base_path}}/guides/organization-management/try-a-b2b-use-case/).
