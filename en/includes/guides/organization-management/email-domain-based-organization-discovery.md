# Email domain based organization discovery

In the realm of Business-to-Business (B2B) scenarios, it's essential to efficiently manage users from different organizations.
One way to achieve this is through organization discovery based on criteria such as email domain and user attributes.
{{ product_name }} offers a solution for email domain-based organization discovery.

The primary purpose of email domain based discovery is to route B2B users from various organizations to their respective authentication options based on their email addresses.

This guide explains how to configure and use email domain-based organization discovery in {{ product_name }}.

## Scenario

Consider **Guardio Insurance** is a B2B SaaS provider and `Best Car Mart` and `Glory Car Mart` are two of its customer/partner organizations.
Guardio Insurance wants to resolve the organization of a user based on the email domain of the user's email address and route them to the respective authentication options.

![Email domain based organization discovery scenario]({{base_path}}/assets/img/guides/organization/manage-organizations/email-domain-based-organization-discovery.png){: width="700" style="display: block; margin: 0 auto;"}

User Alice with email `alice@bcmart.com` should be routed to the authentication options provided by the `Best Car Mart` organization,
and user Bob and Ben, with emails `bob@gcmart.com` and `ben@glory.com` should be routed to the authentication options provided by the `Glory Car Mart` organization.

## Enable email domain based organization discovery

!!! note
    - This feature is can only be used when email address is configured as the username.
    - Enabling email domain based organization discovery feature, and adding email domain mapping against the organizations is permitted only for the organization (root).

### Using the Console

1. Login to the organization (root) from the {{ product_name }} Console. 
2. On the {{ product_name }} Console, go to **Login & Registration**, and click **Email Domain Discovery** under **Organization Settings**.
3. Turn on the toggle to enable email domain based organization discovery.

    ![Enable email domain based organization discovery]({{base_path}}/assets/img/guides/organization/manage-organizations/enable-email-domain-based-organization-discovery.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

### Using the API

1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_organization_config_add` scope.

2. Use the obtained access token to execute the following cURL.

    ``` curl
    curl --location --request POST 'https://{{ host_name }}{{ organization_path_param }}/api/server/v1/organization-configs/discovery' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <access_token>' \
    --data '{
        "properties": [
            {
                "key": "emailDomain.enable",
                "value": true
            }
        ]
    }'
    ```

## Configure email domains for organizations

### Prerequisites

You need to:
    - enable email domain based organization discovery for the organization (root).
    - have registered organizations in {{ product_name }}. See [Manage organizations]({{base_path}}/guides/organization-management/manage-organizations/) for instructions.

### Using the Console

1. On the {{ product_name }} Console, go to **Login & Registration**.
2. Click **Email Domain Discovery** under **Organization Settings**.
3. Click **+Assign Email Domains**.

    ![Assign Email Domain]({{base_path}}/assets/img/guides/organization/manage-organizations/assign-email-domains.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Select the organization you want to claim an email domain from the dropdown under **Organization Name**.
5. Type the email domain you want to claim for the selected organization under **Email Domains** and press enter. Here you can add one or more email domains. 

    ![Assign Email Domain for Best Car Mart]({{base_path}}/assets/img/guides/organization/manage-organizations/assign-email-domains-bestcarmart.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

6. Click **Assign**.

!!! note
    - If the organization has any email domain mapping:
        During the onboarding process of a user to an organization, the user's username (which is an email) undergoes a check against the assigned email domains of that organization. 
        If there's a match, the user is successfully onboarded to the organization. However, if there is no match, the user onboarding process will fail.
    - While the organization (root) have enabled email domain based organization discovery, it is not compulsory to configure an email domain mapping for every organization in the hierarchy. 
        If an organization doesn't have an email domain mapping, the user onboarded to that organization can have any email domain other than an email domain of organizations in the hierarchy.

### Using the API

1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_organization_discovery_update` scope.

2. Use the obtained access token to execute the following cURL.

    ``` curl
    curl --location --request POST 'https://{{ host_name }}{{ organization_path_param }}3/api/server/v1/organizations/discovery' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <access_token>' \
    --data '{
        "attributes": [
            {
                "type": "emailDomain",
                "values": [
                    "bcmart.com"
                ]
            }
        ],
        "organizationId": "<organization-id>"
    }'
    ```

## Update configured email domains of organizations

### Using the Console

1. On the {{ product_name }} Console, go to **Login & Registration**,
2. Click **Email Domain Discovery** under **Organization Settings**.
3. Click **Edit** of the organization you want to update the email domains.

    ![Edit Email Domain]({{base_path}}/assets/img/guides/organization/manage-organizations/edit-email-domains.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Update the email domains in **Email Domains** and click **Update**.

!!! warning
    Changing the email domain mappings may result in existing users being unable to log in to the B2B applications due to organization discovery failures.

### Using the API

1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_organization_discovery_update` scope.

2. Use the obtained access token to execute the following cURL.

    ``` curl
    curl --location --request PUT 'https://{{ host_name }}{{ organization_path_param }}/api/server/v1/organizations/<organization-id>/discovery' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <access_token>' \
    --data '{
        "attributes": [
            {
                "type": "emailDomain",
                "values": [
                    "bcmart.com",
                    "bestcars.com"
               ]
            }
        ]
    }'
    ```
   
## Try it out

1. Set up the `Guardio-Business-App` as a [B2B application]({{base_path}}/guides/organization-management/try-a-b2b-use-case/#set-up-the-applications).

2. [Create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) on the {{ product_name }} Console with `Best Car Mart` as the **Organization Name**.

3. [Configure the email domain mapping](#configure-email-domains-for-organizations) for the `Best Car Mart` organization as follows:
    - Organization Name: `Best Car Mart`
    - Email Domain: `bcmart.com`

4. [Switch]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations) to the `Best Car Mart` organization on the {{ product_name }} Console.
 
5. Onboard a new user to `Best Car Mart` organization with following information. You can either set a password for the user or invite user to set the password.
    <table>
        <tr>
            <th>Username and Email</th>
            <td>A unique email address to identify the user.<br>
                `alice@bcmart.com`
            </td>
        </tr>
        <tr>
            <th>First Name</th>
            <td>First name of the user.<br>
                `Alice`
            </td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>Last name of the user.<br>
                `Charlotte`
        </td>
        </tr>
    </table>
   
6. Try to log in to the `Guardio-Business-App` by selecting `Sign In With SSO`.

7. Input the username (which is an email) of `Alice` in `Best Car Mart` organization.
   
    ![Email input for SSO login]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-sso-login.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

8. After resolving the organization from the email, Alice will be redirected to the authentication option of `Best Car Mart`.

    ![Best Car Mart login]({{base_path}}/assets/img/guides/organization/manage-organizations/bestcarmart-login.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}
