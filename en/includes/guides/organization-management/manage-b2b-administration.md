# Administration of organizations

This guide explains how you can delegate and carry out administration for organizations.

## Implement an administration portal

You can implement an administration portal for your application using {{ product_name }}'s [organization APIs]({{base_path}}/apis/organization-apis/). Through your administration portal, you should expose the following administrative features for your organization.

!!! note "Before you begin"
    You need to authorize your application to use organization APIs. Learn how to [authorize APIs to an application]({{base_path}}/guides/api-authorization/).

### Manage users

The organization administrator should be able to onboard new users and administrators to the organization.

The administration portal in your application may use the [user management - SCIM2 API]({{base_path}}/apis/organization-apis/org-user-mgt/#/) to manage users. Also, you may use [group management - SCIM2 API]({{base_path}}/apis/organization-apis/org-group-mgt/#/) and [role management - SCIM2 API]({{base_path}}/apis/organization-apis/org-role-mgt/#/) to manage groups and roles for users.

### Onboard identity providers

An organization may have a requirement to onboard an external identity provider (IdP) for the following purposes:

- Authenticating users to various applications.
- Branding the login interfaces to suit the organization.
- Enabling custom login experiences to different user groups.

The administration portal can leverage the [identity provider API]({{base_path}}/apis/organization-apis/org-idp-mgt/#/) to manage such external IdPs.

### Define application login flows

Organization administrators should be able to customize the login flow of the application by setting the number of authentication steps and the login options available for each step.

The administration portal in your application should use the [application management API]({{base_path}}/apis/organization-apis/org-application-mgt/#/) to manage application login flows.

### Extend administration tasks

Explore the [organization APIs]({{base_path}}/apis/organization-apis/) of {{ product_name }} that are available for you to enable all the required administration capabilities from your administration portal.

!!! note
    See the instructions on [enabling SSO]({{base_path}}/guides/organization-management/try-a-b2b-use-case/) to try out a B2B organization login use case.

{% if product_name == "WSO2 Identity Server" %}

## Use the Console as the administration portal

{{ product_name }} Console can also function as an administration portal for your B2B application which is accessible through the following URL:
```
https://<hostname>:<port>/t/<root organization name>/o/<organization id>/console.
```

However, the following limitations apply.
<ul>
    <li>The Console is not customizable</li>
    <li> The Console will not reflect the branding customizations for your organization.</li>
    <li>The login flow for the Console does not adhere to the customizations done for the application. (You may change the login flow for the Console under <b>Console settings</b> \>  <b>Login Flow</b>.)</li>
    <li>The Console access is governed by separate roles and are not linked to your B2B application roles.</li>
</ul>  

!!! note
    As the B2B SaaS provider, you can copy the organization URL and share it with your customers/partners. Also, you may integrate the Console URL with your application to provide a seamless experience for your customers/partners.

    To locate your organization URL,

    1. Log in to the {{ product_name }} Console.
    2. Go to **Organizations** and select the organization that you want to share the URL of.
    3. Switch to that organization.
    4. Go to **Console Settings** and click **Copy** next to the **Console URL**.

    ![Copy organization space URL]({{base_path}}/assets/img/guides/organization/manage-organizations/sub-org-console-access-url.png){: width="600" style="display: block; margin: 0;"}


{% endif %}
