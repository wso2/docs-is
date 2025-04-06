# Share applications with organizations

Applications in the root organization can be shared with child organizations. Once an application is shared with an organization, organization users may log in to the applications.

You may share the following applications with organizations.

- Registered applications - Any application that you register in {{product_name}}.

- My Account portal - The self-service portal available for users of the root organization.

## Share a registered application

Follow the steps below to share a registered application with organizations.

1. Login to the root organization on the {{ product_name }} Console.

2. Go to **Applications** and select the application that you want to share with organizations.

3. Go to its **Shared Access** tab and do one of the following:

    - Select **Share with all organizations** for the application to be shared with all existing organizations and new organizations you may create in the future.

    -   Select **Share with only selected organizations** and select the relevant organizations.

        ![Share application with organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/share-application.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the configurations.
5. Go to the **Protocol** tab of the application and under **Allowed grant types**, ensure the following [grant types]({{base_path}}/references/grant-types/) are selected.

    - Client Credential
    - Code
    - Organization Switch

    !!! note

        The `Organization Switch` grant will only be visible after you have shared the application with one or more organizations.

6. Click **Update** to save the changes.

!!! tip

    Once you have shared the application with an organization, check if the following settings are in place for the application.

    - For registered applications, ensure the **SSO** authenticator is added to the login flow of the application. This adds the **Sign in with SSO** option to the application login screen so that organization users can log in using their credentials. Check its availability in the **Login Flow** tab of the application.

        ![Sign-in-method-options]({{base_path}}/assets/img/guides/organization/manage-organizations/sso-signin-method.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - Ensure the application is available in the organization. To check this, switch to the organization and verify that the application is listed in the **Applications** section.

        ![Shared Guardio Insurance Application]({{base_path}}/assets/img/guides/organization/manage-organizations/fragmented-app.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - While in the organization, select the shared application and ensure the username and password authenticator is enabled in the login flow. The organization users can then use the **Sign In with SSO** option to log in using their credentials.

## Share the My Account Portal

{% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}
The My Account portal is the self-service portal provided by {{product_name}} for users of an organization. Through the portal, organization users have access to services such as updating user information, registering biometrics for authentication and more.

The My Account portal is, by default, shared with your organizations and users may access the My Account portal through the following link:

``` bash
{{root_org_url}}/o/{organization-id}/myaccount
```

!!! note

    Learn more about the [My Account portal]({{base_path}}/guides/user-self-service/configure-self-service-portal/)

If you wish to restrict access to the My Account portal to some or all organizations,

1. Login to the root organization on the {{ product_name }} Console.

2. Go to **Applications** and on the top of the page, select the **Settings** icon corresponding to **My Account**.

3. Go to its **Shared Access** tab and do one of the following:

    - Select **Do not share with any organization** to restrict any existing organizations or future organizations you may create from accessing the My Account portal.

    - Select **Share with only selected organizations** and select the organizations that you wish to grant access to the My Account portal.

4. Click **Update** to save the changes.

{% else %}
The My Account portal is the self-service portal provided by {{product_name}} for users of the root organization. Through the portal, root organization users have access to services such as updating user information, registering biometrics for authentication and more. By sharing the portal with child organizations, you enable child organization users to access all My Account services within the context of their respective organizations.

Once shared, the My Account portal will be available for organization users through the following link:

``` bash
{{root_org_url}}/o/{organization-id}{{myaccount_path}}
```

!!! note

    - Learn more about the [My Account portal]({{base_path}}/guides/user-self-service/configure-self-service-portal/)
    - If you decide not to share the My Account portal with customer/partner organizations, be sure to
        - remove any references to the My Account portal from your email templates. See [customizing email templates]({{base_path}}/guides/branding/customize-email-templates/) for instructions.
        - set up an access URL for your B2B application so that once users complete password reset flows, they are redirected to it instead of the My Account portal.

To share the My Account portal with organizations,

1. Login to the root organization on the {{ product_name }} Console.

2. Go to **Applications** and on the top of the page, select the **Settings** icon corresponding to **My Account**.

3. Go to its **Shared Access** tab and do one of the following:

    - Select **Share with all organizations** for the application to be shared with all existing organizations and new organizations you may create in the future.

    -   Select **Share with only selected organizations** and select the relevant organizations.

4. Click **Update** to save the changes.
{% endif %}
