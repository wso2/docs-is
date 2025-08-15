# Email domain based organization discovery

In Business-to-Business (B2B) applications, seamlessly authenticating users from external organizations remains essential. This ensures a smooth user experience.

One way to achieve this involves **email domain-based organization discovery**. With this feature, your application can provide a customized login experience. The experience depends on the domain of the user's email address.

For example, when users log in with an `@xyz.com` email address, the system automatically redirects them to the login screen customized for the `XYZ` organization. This provides a familiar and consistent experience.

This guide explains how you may use {{product_name}} to configure email domain-based organization discovery for your B2B applications.

## Scenario

**Guardio Insurance** serves as an insurance provider. *Best Car Mart* and *Glory Car Mart* represent two of its customer organizations.

When a user enters an email address to log into the Guardio Insurance platform, the system needs to resolve the user's organization. It does this based on the email domain. Then it redirects them to the respective organization's login screen.

![Email domain based organization discovery scenario]({{base_path}}/assets/img/guides/organization/manage-organizations/email-domain-based-organization-discovery.png){: width="700" style="display: block; margin: 0;"}

In this example scenario:

- User Alice with email `alice@bcmart.com` should go to the login screen of `Best Car Mart` organization.
- User Bob and Ben, with emails `bob@gcmart.com` and `ben@glory.com` should go to the login screen of `Glory Car Mart` organization.

## Enable email domain based organization discovery

!!! note "Important"
    - The root organization only permits enabling this feature and mapping email domains to organizations.
    {% if product_name == "WSO2 Identity Server" %}
    - For this feature to work, make sure to [enable email address as the username]({{base_path}}/guides/users/attributes/enable-email-as-username/) so that users may log in to applications with their email addresses.
    {% endif %}
    - **For Just-In-Time (JIT) provisioning**: Set the Subject Attribute to `http://wso2.org/claims/emailaddress` in your external identity provider. See [Map email domains to organizations](#map-email-domains-to-organizations) below.

=== "Using the Console"

    To do so,

    1. Login to the root organization Console.
    2. Navigate to **Login & Registration**, and under **Organization Settings**, click **Organization Discovery**.
    3. Turn the toggle on to enable email domain based organization discovery.

        ![Enable email domain based organization discovery]({{base_path}}/assets/img/guides/organization/manage-organizations/enable-email-domain-based-organization-discovery.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    {% if (product_name == "WSO2 Identity Server") %}

    4. Select the **Email domain discovery for self-registration** checkbox if you want to allow users to discover organizations based on their email domain and self-register in them.

        !!! note
            For this to work, child organizations should have self-registration enabled. Currently, you can enable self-registration for all child organizations by adding the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

            ```
            [identity_mgt.user_self_registration]
            allow_self_registration = true
            ```

    {% endif %}

    5. [Map email domains to organizations](#map-email-domains-to-organizations).

=== "Using the API"

    To do so,

    1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_organization_config_add` scope.

    2. Use the obtained access token to execute the following command.

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

    5. [Map email domains to organizations](#map-email-domains-to-organizations).

## Map email domains to organizations

Mapping an email domain to an organization allows for a customized user experience, but this remains optional. When an organization have a mapped email domain, the behavior changes as follows:

- If an organization registers an email domain mapping:
    <!-- markdownlint-disable MD007 -->
    - A user can only onboard to the organization if the user's email domain matches one of the domains claimed by the organization.
    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version == "7.0.0") %}
    - Just-In-Time (JIT) provisioning during federated authentication only occurs if the user's email domain matches one of the domains claimed by the organization.

        !!! warning "Subject attribute mapping for JIT provisioning"
            When email domain-based organization discovery gets enabled, **JIT provisioning requires proper subject attribute mapping** to function successfully.

            For JIT provisioning to work correctly:

            - Configure the external identity provider with **User ID Claim URI** (Subject Attribute) set to `http://wso2.org/claims/emailaddress`.
            - This ensures the system can uniquely identify users during provisioning.

            **Why this matters**: Domain discovery relies on email addresses to resolve organizations. The subject attribute must map to the email claim to enable proper user provisioning.

            **Configure subject attribute mapping**: See [selecting the subject attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#select-an-alternate-subject-attribute) for OIDC applications and [selecting the subject attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-saml-app/#select-the-subject-attribute) for SAML applications.

    {% else %}
    - The system restricts federated authentication and Just-In-Time (JIT) provisioning for users logging in with email domains not claimed by the organization.

        !!! warning "Subject attribute mapping for federated authentication and JIT provisioning"
            When email domain-based organization discovery gets enabled, **federated authentication and JIT provisioning require proper subject attribute mapping**.

            For federated authentication and JIT provisioning to work correctly:

            - Configure the external identity provider with **User ID Claim URI** (Subject Attribute) set to `http://wso2.org/claims/emailaddress`.
            - This ensures the system can uniquely identify users during provisioning.

            **Why this matters**: Domain discovery relies on email addresses to resolve organizations. The subject attribute must map to the email claim to enable proper user provisioning.

            **Configure subject attribute mapping**: See [selecting the subject attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#select-an-alternate-subject-attribute) for OIDC applications and [selecting the subject attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-saml-app/#select-the-subject-attribute) for SAML applications.

    {% endif %}
    <!-- markdownlint-enable MD007: othervise the sub bullet points are not rendered properly. -->

- If not, a user can register to the organization with an email address of any domain (other than the domains claimed by other organizations).

=== "Using the Console"

    !!! note "Before you begin"

        - [Enable email domain based organization discovery](#enable-email-domain-based-organization-discovery) for the root organization.
        - Create the required organizations under the root organization. See [Manage organizations]({{base_path}}/guides/organization-management/manage-organizations/) for instructions.

    To do so,

    1. On the {{ product_name }} Console, go to **Login & Registration**.
    2. Under **Organization Settings**, click **Email Domain Discovery**.
    3. Click **Assign Email Domain**.

        ![Assign Email Domain]({{base_path}}/assets/img/guides/organization/manage-organizations/assign-email-domains.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Under **Organization Name**, select the organization.
    5. Under **Email Domains**, type the email domain you want to claim for the selected organization and press enter. You can add more than one email domain.

        ![Assign Email Domain for Best Car Mart]({{base_path}}/assets/img/guides/organization/manage-organizations/assign-email-domains-bestcarmart.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    6. Click **Assign**.

=== "Using the API"

    !!! note "Before you begin"

        - [Enable email domain based organization discovery](#enable-email-domain-based-organization-discovery) for the root organization.
        - Create the required organizations under the root organization. See [Manage organizations]({{base_path}}/guides/organization-management/manage-organizations/) for instructions.

    To do so,

    1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_organization_discovery_update` scope.

    2. Use the obtained access token to execute the following cURL.

        ``` curl
        curl --location --request POST 'https://{{ host_name }}{{ organization_path_param }}/api/server/v1/organizations/discovery' \
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

## Update email domain mappings

!!! warning
    Changing the email domain mappings may prevent existing users from logging in to the B2B applications due to organization discovery failures.

=== "Using the Console"

    To do so,

    1. On the {{ product_name }} Console, go to **Login & Registration**,
    2. Under **Organization Settings**, click **Email Domain Discovery**.
    3. Click **Edit** of the organization you want to update the email domains.

        ![Edit Email Domain]({{base_path}}/assets/img/guides/organization/manage-organizations/edit-email-domains.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Update the email domains in **Email Domains** and click **Update**.

=== "Using the API"

    To do so,

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

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}

Follow the sections below to try out each of the organization discovery scenarios.

### User login

{% endif %}
To try out user login,

1. Set up the Guardio business application by following [the B2B setup steps]({{base_path}}/guides/organization-management/try-a-b2b-use-case/#set-up-the-business-application).

2. Create an organization for *Best Car Mart* by following [the organization creation guide]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization).

3. Follow the guides in this page and enable email domain based organization discovery. Add the following email domain mapping.
    - Organization Name: `Best Car Mart`
    - Email Domain: `bcmart.com`

4. On the {{product_name}} Console, [switch]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations) to the *Best Car Mart* organization Console.

5. Onboard a new user to the *Best Car Mart* organization with the following information. You can either set a password for the user or invite the user to set the password.
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

6. Log in to the Guardio business app by selecting `Sign In With Single Sign-On (SSO)`.

    !!! note

        {% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}
        In {{product_name}} {{is_version}} from update level **7.0.0.88** onwards (Updates 2.0 model), you can bypass the `Sign In With SSO` page and go directly to your organization's login page by adding the following query parameters in the login request.
        {% else %}
        You can bypass the `Sign In With SSO` page and go directly to your organization's login page by adding the following query parameters in the login request.
        {% endif %} 
        
        - `login_hint`: The email address of the user that will be used to resolve the domain.
        - `fidp`: If you have additional B2C login options configured for the application, you can set this parameter to `OrganizationSSO` to direct users straight to the organization login page.


        Sample requests:

        === "OIDC"
            
            ```curl
            https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
            client_id=<client_id>
            &redirect_uri=<redirect_url>
            &scope=<scopes>
            &response_type=code
            &login_hint=<user_email>
            &fidp=OrganizationSSO
            ```
        === "SAML"
            
            ```curl
            https://{{host_name}}{{organization_path_param}}/samlsso?
            spEntityID=<app_entity_id>
            &login_hint=<user_email>
            &fidp=OrganizationSSO
            ```

7. Input the email address associated with the username for `Alice` within the *Best Car Mart* organization.

    ![Email input for Single Sign-On (SSO) login]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-sso-login.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

8. After resolving the organization from the email, the system redirects Alice to the authentication option of *Best Car Mart*.

    ![Best Car Mart login]({{base_path}}/assets/img/guides/organization/manage-organizations/bestcarmart-login.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}

### Self-registration

To try out self-registration,

1. Set up the Guardio business application by following [the B2B setup steps]({{base_path}}/guides/organization-management/try-a-b2b-use-case/#set-up-the-business-application).

2. Create an organization for *Best Car Mart* by following [the organization creation guide]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization).

3. Follow the guides in this page and enable email domain based organization discovery and email domain discovery for self-registration. Add the following email domain mapping.
    - Organization Name: `Best Car Mart`
    - Email Domain: `bcmart.com`

4. Navigate to the login page of the application configured in above step 1 and click **Register**.

    ![Application login page]({{base_path}}/assets/img/guides/organization/manage-organizations/application-login-page.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter an organization email with the domain `bcmart.com` and **Submit**.

    ![Email input for self-registration]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-self-registration.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. After resolving the organization from the email, the system redirects you to the self-registration page of the *Best Car Mart* organization.

    ![Self-registration form]({{base_path}}/assets/img/guides/organization/manage-organizations/self-registration-form.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Fill in the user details and click **Sign Up** to complete the registration.

{% endif %}
