# Administration of organizations

The following guides explain how to manage the administration tasks of organizations.

## Implement an administration portal

Commonly B2B business providers expose administrative functions to administrators of organizations through a separate administration portal in the B2B application.

The administration portal of your application should use [{{ product_name }}'s organization APIs]({{base_path}}/apis/organization-apis/) to perform administrative operations.

!!! note
    To access management APIs in {{ product_name }}, you need to register an application an authorize {{ product_name }} management APIs. Learn how to [authorize APIs to an application]({{base_path}}/guides/api-authorization/) in {{ product_name }}.

The following are some of the features that your administration portal should contain.

### Manage users

The organization administrator should be able to onboard new users (administrators and consumers) to the organization. The identities of these users are stored in the default {{ product_name }} user store.

The identity and access management requirements of these users will be managed by {{ product_name }}.

The administration portal in your application should use the [user management - SCIM2 API]({{base_path}}/apis/organization-apis/org-user-mgt/#/) to manage users.
Also, you should use [group management - SCIM2 API]({{base_path}}/apis/organization-apis/org-group-mgt/#/) and [role management - SCIM2 API]({{base_path}}/apis/organization-apis/org-role-mgt/#/) to manage users' groups and roles.

### Onboard identity providers

An organization may have an external identity provider (IdP) to manage the user identities of its employees and customers. Such an IdP may be already being used for the following purposes:

- Authenticating user logins to various applications.
- Branding the login interfaces to suit the organization.
- Enabling custom login experiences to different user groups.

The organization administrator can onboard such corporate IdPs to the organization in {{ product_name }} as a connection. These IdPs can then be set as a login option in your application.

The administration portal in your application should use the [identity provider API]({{base_path}}/apis/organization-apis/org-idp-mgt/#/) to manage external IdPs.

### Define application login flows

Organization administrators should be able to customize the login flows of the application to suit business needs.

For example, the administrator should be able to define the number of authentication steps that the application login flow needs and what login options should be available for each step.

The administration portal in your application should use the [application management API]({{base_path}}/apis/organization-apis/org-application-mgt/#/) to manage application login flows.

### Extend administration tasks

Explore the [organization APIs]({{base_path}}/apis/organization-apis/) of {{ product_name }} that are available for you to enable all the required administration capabilities from your administration portal.

!!! note
    See the instructions on [enabling SSO]({{base_path}}/guides/organization-management/try-a-b2b-use-case/) to try out a B2B organization login use case.

{% if product_name == "WSO2 Identity Server" %}

## Use Console as the administration portal of organizations

You can use the {{ product_name }} Console as the administration portal of your B2B application. 
Each customer/partner organization can access their space in the {{ product_name }} Console by accessing the URL `https://<hostname>:<port>/t/<root organization name>/o/<organization id>/console`.

### How to copy the URL of the organization space in the {{ product_name }} Console

B2B SaaS providers can copy the organization space URL in the {{ product_name }} Console and share it with their customers/partners.
Also, as the B2B SaaS provider you can integrate the Console URL with your application to provide a seamless experience for your customers/partners.

1. Log in to the {{ product_name }} Console.
2. Go to **Organizations** and select the organization that you want to share the URL of.
3. Switch to that organization.
4. Go to **Console Settings** and click **Copy** next to the **Console URL**.

    ![Copy organization space URL]({{base_path}}/assets/img/guides/organization/manage-organizations/sub-org-console-access-url.png){: width="600" style="display: block; margin: 0;"}

However, the following limitations apply when using the {{ product_name }} Console as the B2B administration portal.

1. The {{ product_name }} Console is a generic administration portal that is not tailored to the specific needs of your B2B application. You cannot customize the given feature set for different organizations.
2. The branding configured in your B2B vendor organization or the overridden branding customizations of each customer/partner organization is not reflected in the {{ product_name }} Console portal.
3. Even if the customer/partner organization change the login flow of the B2B business application, the organization level {{ product_name }} Console login flow will remain the same. 
If the organization level Console login flow needs to be customized, navigate to the **Login Flow** tab of **Console Settings** in the organization space and configure as required.
4. The Console application is managed via roles defined specifically for the {{ product_name }} Console application. Therefore, the roles of the {{ product_name }} Console are not directly linked to the roles of your B2B application.
As the B2B SaaS provider, you need to manage the roles of your B2B application separately.

{% endif %}
