# Share applications with sub organizations

Applications in the [primary business organization]({{base_path}}/guides/organization-management/manage-organizations/) will become available to sub organizations when you share them. Once an application is shared with a sub organization, its users can log in to the application using [Organization Login]({{base_path}}/guides/authentication/add-organization-login/).

Follow the steps below to share your primary applications with sub organizations.

1. Switch to your primary organization on the {{ product_name }} Console.
2. Go to **Applications** and select the application that you want to share with your sub organizations.
3. Go to the **Shared Access** tab and select **Share with only selected sub organizations**.

    !!! note
        Select **Share with all sub organizations** if you want to share your application with all existing sub organizations and any new sub organizations you may create in the future.

4. Select the sub organizations you wish to share your application with.

    ![Share application with suborganizations]({{base_path}}/assets/img/guides/organization/manage-organizations/share-application.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the configurations.
6. Go to the **Protocol** tab of the application, be sure that the following [grant types]({{base_path}}/references/grant-types/) are allowed, and click **Update**.

    !!! note
        Note that the `Organization Switch` grant will only be visible after you share the application with sub organizations.

    - Client Credential
    - Code
    - Organization Switch

Note the following:

- Go to the **Sign-in Method** tab of the application and ensure that the **SSO** authenticator is added.

    !!! note
        This adds the **Sign in with SSO** option to the application login screen so that sub organization users can log in using their credentials.

    ![Sign-in-method-options]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-login-signin-method.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

- Switch to the relevant sub organization and ensure that your application is available under **Applications** as a shared app.

    ![Fragmented Guardio Insurance Application]({{base_path}}/assets/img/guides/organization/manage-organizations/fragmented-app.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

- Go to the **Sign-in Method** tab of the shared app and see that login with username and password is enabled.

Once an application is shared with a sub organization, its users can use the **Sign In with SSO** option to log in using their credentials.

To try out a complete use case, see [Try a B2B use case]({{base_path}}/guides/organization-management/try-a-b2b-use-case/).
