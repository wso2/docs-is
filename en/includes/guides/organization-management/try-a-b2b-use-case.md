{% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}
# Try a B2B use case

The following guide is a complete end-to-end use case on how to manage B2B (Business-to-Business) applications in {{ product_name }}.

## Scenario

- You are an administrator of Guardio Insurance, a company that provides insurance services to other organizations.

- Best Car Mart has a partnership with Guardio Insurance to provide life insurance policies to its employees. 

- Guardio Insurance shares the following platforms with Best Car Mart.

    - Guardio Insurance Administrative App - An administration portal for Guardio customers. Best Car Mart administrators can manage users, assign roles, configure enterprise Identity Providers (IdP), and customize the login flow for their employees using this portal.

    - Guardio Insurance Business App -  An application that provides insurance and claim settlement capabilities for their customers. Best Car Mart employees can access this portal for all their insurance needs.

![Organization login scenario]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-login-scenario.png){: width="700" style="display: block; margin: 0;"}

The following guides explain how a Guardio Insurance administrator can use {{product_name}} to implement the above scenario.

{% if product_name == "Asgardeo" %}
## Prerequisites

You should [create a root organization]({{base_path}}/guides/{{root_org_description_path}}). For this example, we have created a root organization named `Guardio Insurance`.
{% endif %}

## Onboard the organization

Guardio Insurance, as the service provider, functions as the organization (root). Best Car Mart should be set up as a child organization in Guardio Insurance.

Follow the [create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) guide and create an organization under the name Best Car Mart.


## Set up the administrative app

The next step is to set up the applications that needs to be shared with your child organizations. Let's start with the administrative app.

### Step 1: Register the administrative app
Follow the steps given below to register the Guardio Insurance administrative applications with {{ product_name }}.

1. Login into the organization (root).
2. [Register a traditional web application]({{base_path}}/guides/applications/register-oidc-web-app/) in your organization (root) with the following settings:

    <table>
        <tr>
            <th>Application Name</th>
            <td>Add a name for the application.</br>
                <code>Guardio-Admin-App</code>
            </td>
        </tr>
        <tr>
            <th>Protocol</th>
            <td>The authentication protocol to use.</br>
                <code>OpenID Connect</code>
            </td>
        </tr>
        <tr>
            <th>Authorized redirect URLs</th>
            <td>The URLs to which the authorization code is sent upon authentication and where the user is redirected upon logout.</br>
                <code>http://localhost:3001/api/auth/callback/wso2isAdmin</code>
                <code>http://localhost:3001</code>
            </td>
        </tr>
    </table>

### Step 2: Share the applications with organizations

Share the <b>Guardio-Admin-App</b> with the Best Car Mart organization. See instructions on how to [share applications with organizations]({{base_path}}/guides/organization-management/share-applications/).

!!! note

    When the application is shared with at least one organization, **Sign In with SSO** will be added as a login option in the application login screen, which organization users can use to log in.

### Step 3: Configure the application on {{ product_name }}
To configure the registered application on {{ product_name }}:

On the {{ product_name }} Console, go to **Applications** and select the application you registered.

**Protocol Configurations**

1. Go to the **Protocol** tab of the application, and configure the following values.

    !!!note
        If you have selected the `Traditional Web Application` template for application creation, the following values should have already been set properly.
        Otherwise, verify and update the values.

    <table>
        <tr>
            <th>Allowed Grant Types</th>
            <td> Select the following grant type:
                <ul>
                    <li>Code</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Authorization Redirect URLs</th>
            <td>The URLs to which the authorization code is sent upon authentication and where the user is redirected upon logout.</br>
                <ul>
                    <li><code>http://localhost:3001/api/auth/callback/wso2isAdmin</code></li>
                    <li><code>http://localhost:3001</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Allowed Origins</th>
            <td>Enter the allowed origins.</br>
                <code>http://localhost:3001</code>
            </td>
        </tr>
    </table>

    Take note of the `client_id` and `client_secret` generated for your applications.

2. Click **Update** to save your configurations.

**User Attribute Configurations**

1. Go to the **User Attributes** tab of the **Guardio Insurance Business App**.

2. Select `Email`, `First Name`, `Last Name`, and `Username` attributes.

3. Click **Update**.

**API Authorization**

1. Go to the **API Authorization** tab and click on **+ Authorize an API Resource**.
2. From the **API Resources** drop-down select the following APIs listed under the **Organization APIs** category and add the corresponding **Authorized Scopes** provided below.

    <table>
        <tr>
            <th>API Resource</th>
            <th>Authorized Scopes</th>
        </tr>
        <tr>
            <th>SCIM2 Users API</th>
            <td>Scopes:
                <ul>
                    <li>View User</li>
                    <li>List User</li>
                    <li>Create User</li>
                    <li>Update User</li>
                    <li>Delete User</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>SCIM2 Roles API</th>
            <td>Scopes:</br>
                <ul>
                    <li>View Role</li>
                    <li>Update Role</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>SCIM2 Groups API</th>
            <td>Scopes:</br>
                <ul>
                    <li>View Group</li>
                    <li>Update Group</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Application Management API</th>
            <td>Scopes:</br>
                <ul>
                    <li>View Application</li>
                    <li>Update Application</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Identity Provider Management API</th>
            <td>Scopes:</br>
                <ul>
                    <li>View Identity Provider</li>
                    <li>Create Identity Provider</li>
                    <li>Update Identity Provider</li>
                    <li>Delete Identity Provider</li>
                </ul>
            </td>
        </tr>
    </table>

**Role Configurations**

1. Go to the **Roles** tab.
2. Select **Application** as Role Audience and click **+ New Role**.

    ![Create Application Roles - Initial view]({{base_path}}/assets/img/guides/organization/manage-organizations/create-roles.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the following details:

    <table>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr>
            <th>Role Name</th>
            <td>Enter a unique name to identify the role.</td>
            <td>GuardioAdministrator</td>
        </tr>
        <tr>
            <th>Select API Resource</th>
            <td>All the API resources added in step 2 will be listed. Add each API resource and check the box to include all permissions (scopes).</td>
            <td>
                <ul>
                    <li>SCIM2 Users API</li>
                    <li>SCIM2 Roles API</li>
                    <li>SCIM2 Groups API</li>
                    <li>Application Management API</li>
                    <li>Identity Provider Management API</li>
                </ul>
            </td>
        </tr>
    </table>

    ![Create Application Roles]({{base_path}}/assets/img/guides/organization/manage-organizations/application-role-api-resources.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Create**.

Upon successful creation the new application role will displayed under **Assigned Roles**.

![Created Application Role]({{base_path}}/assets/img/guides/organization/manage-organizations/assigned-roles.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Set up the business application
The following guides explain how you can share an application with organizations and allow organization users to log in to it using **SSO**.

Let's use the sample applications, [Guardio Insurance Business application and Guardio Insurance Administrative application](https://github.com/wso2/samples-is/tree/master/b2b-sample){:target="_blank"}, to explore this use case.

### Step 1: Register the business app

Follow the steps given below to register the Guardio Insurance business applications with {{ product_name }}.

1. Login into the organization(root).
2. [Register Traditional Web Applications]({{base_path}}/guides/applications/register-oidc-web-app/) in your organization (root) with the following settings:

    <table>
        <tr>
            <th>Application Name</th>
            <td>Add a name for the application.</br>
                <code>Guardio-Business-App</code>
            </td>
        </tr>
        <tr>
            <th>Protocol</th>
            <td>The authentication protocol to use.</br>
                <code>OpenID Connect</code>
            </td>
        </tr>
        <tr>
            <th>Authorized redirect URLs</th>
            <td>The URLs to which the authorization code is sent upon authentication and where the user is redirected upon logout.</br>
                <code>http://localhost:3000/api/auth/callback/wso2is</code>
                <code>http://localhost:3000</code>
            </td>
        </tr>
    </table>

### Step 2: Share the application with organizations

Share the <b>Guardio-Business-App</b> with your organizations. See instructions on how to [share applications with organizations]({{base_path}}/guides/organization-management/share-applications/).

When the application is shared with at least one organization, **Sign In with SSO** will be added as a login option in the application login screen, which organization users can use to log in.

### Step 3: Configure the application on {{ product_name }}
To configure the registered application on {{ product_name }}:

On the {{ product_name }} Console, go to **Applications** and select the application you registered.

**Protocol Configurations**

1. Go to the **Protocol** tab of the application, and configure the following values.

    !!!note
        If you have selected the `Traditional Web Application` template for application creation, the following values should have already been set properly.
        Otherwise, verify and update the values.

    <table>
        <tr>
            <th>Allowed Grant Types</th>
            <td> Select the following grant type:
                <ul>
                    <li>Code</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Authorization Redirect URLs</th>
            <td>The URLs to which the authorization code is sent upon authentication and where the user is redirected upon logout.</br>
                <ul>
                    <li><code>http://localhost:3000/api/auth/callback/wso2is</code></li>
                    <li><code>http://localhost:3000</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Allowed Origins</th>
            <td>Enter the allowed origins.</br>
                <code>http://localhost:3000</code>
            </td>
        </tr>
    </table>

    Take note of the `client_id` and `client_secret` generated for your applications.

2. Click **Update** to save your configurations.

**User Attribute Configurations**

1. Go to the **User Attributes** tab of the **Guardio Insurance Business App**.

2. Select `Email`, `First Name`, `Last Name`, and `Username` attributes.

3. Click **Update**.

## Set up the client applications

!!! note "Before you begin"
    Download the [sample b2b applications](https://github.com/wso2/samples-is/tree/master/b2b-sample){:target="_blank"}.

To set up the client applications:

1. Navigate to `b2b-samples/config.json` and update the following parameters:

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr>
            <td><code>CommonConfig.AuthorizationConfig.BaseOrganizationUrl</code></td>
            <td>The base URL of the organization (root).</td>
            <td><code>https://{{ host_name }}/t/{{ organization_name }}</code>
            </td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.AuthorizationConfig.ClientId</code></td>
            <td>The client ID of the Guardio-Business-App created on {{ product_name }}.</td>
            <td>Client ID copied from Guardio-Business-App in step 3 above.</td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.AuthorizationConfig.ClientSecret</code></td>
            <td>The client secret of the Guardio-Business-App created on {{ product_name }}.</td>
            <td>Client secret copied from Guardio-Business-App in step 3 above.</td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.ApplicationConfig.HostedUrl</code></td>
            <td>The URL of the Guardio-Business-App client application.</td>
            <td><code>http://localhost:3000</code></td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.ApplicationConfig.APIScopes</code></td>
            <td>The scopes required by the Guardio-Business-App application to access user resources.</td>
            <td><code>openid</code>, <code>email</code>, <code>profile</code>, <code>internal_login</code>, etc.</td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.ApplicationConfig.Branding.name</code></td>
            <td>The branding name of your application.</td>
            <td><code>Guardio Insurance</code></td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.ApplicationConfig.Branding.tag</code></td>
            <td>A branding tagline for your application.</td>
            <td><code>Anytime . Anywhere</code></td>
        </tr>
        <tr>
            <td><code>BusinessAppConfig.ManagementAPIConfig.SharedApplicationName</code></td>
            <td>The application name you used to register the Guardio Business application in {{ product_name }}.</td>
            <td><code>Guardio-Business-App</code></td>
        </tr>
           <tr>
            <td><code>BusinessAppConfig.ManagementAPIConfig.Userstore</code></td>
            <td>The userstore name where the organization users are managed.</td>
            <td><code>{{ userstore_name }}</code></td>
        </tr>
        <tr>
            <td><code>BusinessAdminAppConfig.AuthorizationConfig.ClientId</code></td>
            <td>The client ID of the Guardio-Admin-App created on {{ product_name }}.</td>
            <td>Client ID copied from Guardio-Admin-App in step 3 above.</td>
        </tr>
        <tr>
            <td><code>BusinessAdminAppConfig.AuthorizationConfig.ClientSecret</code></td>
            <td>The client secret of the Guardio-Admin-App created on {{ product_name }}.</td>
            <td>Client secret copied from Guardio-Admin-App in step 3 above.</td>
        </tr>
        <tr>
            <td><code>BusinessAdminAppConfig.ApplicationConfig.HostedUrl</code></td>
            <td>The URL of the Guardio-Admin-App client application.</td>
            <td><code>http://localhost:3001</code></td>
        </tr>
           <tr>
            <td><code>BusinessAdminAppConfig.ApplicationConfig.APIScopes</code></td>
            <td>The scopes required by the Guardio-Admin-App to do administrative tasks.</td>
            <td><code>openid</code>, <code>email</code>, <code>profile</code>, <code>internal_login</code>, 
                <code>internal_org_user_mgt_view</code>, <code>internal_org_user_mgt_list</code>, <code>internal_org_user_mgt_create</code>, <code>internal_org_user_mgt_update</code>, etc.</td>
        </tr>
        <tr>
            <td><code>BusinessAdminAppConfig.ApplicationConfig.Branding.name</code></td>
            <td>The branding name of your application.</td>
            <td><code>Guardio Insurance - Administrator Application</code></td>
        </tr>
        <tr>
            <td><code>BusinessAdminAppConfig.ApplicationConfig.Branding.tag</code></td>
            <td>A branding tagline for your application.</td>
            <td><code>Administrator Application</code></td>
        </tr>
    </table>

2. To start the **Guardio Insurance Business App**, open a terminal, navigate to the `b2b-sample` folder, and execute the following commands:

    !!! note
        Ensure that your system meets the specified minimum requirements:
            - Node version >= v16.16.0
            - NPM version >= 8.11.0

    ```bash
    npm install
    ```

    ```bash
    npx nx serve business-app
    ```

3. To start the **Guardio Insurance Administrative App**, open a terminal, navigate to the `b2b-sample` folder, and execute the following commands:

    ```bash
    npm install
    ```

    ```bash
    npx nx serve business-admin-app
    ```


## Try it out

The following sections explain how an organization user who has admin privileges of the **Guardio Insurance Administrative App** logs in and uses the administration portal.
Also, this guide explains how other organization users consume the **Guardio Insurance Business App**.

### Try out Sign In with SSO

Follow the steps below to see how organization login works for a user in the **Best Car Mart** organization when logging into **Guardio Insurance Business App**.

1. Open the application by copying the following URL to your browser: `http://localhost:3001/`

    ![Guardio Admin Application Login]({{base_path}}/assets/img/guides/organization/manage-organizations/guardio-admin-app-login.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Sign In** and see that you are diverted to the {{ product_name }} login screen.

3. Click **Sign In with SSO** to specify the organization to which you are signing in.

4. Enter **Best Car Mart** as the organization name and click **Submit**.

    ![Sign in with SSO]({{base_path}}/assets/img/guides/organization/manage-organizations/sign-in-with-sso.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter the username and password of a user whom you have onboarded to Best Car Mart.

6. Click **Sign in** and grant permission for the application to use.

    You have successfully logged into the **Guardio Insurance Administrative App** as a user of the **Best Car Mart** organization.

### Try out the administration portal

!!! note
    Learn how to build an administration portal for your B2B application in the [implement an administration portal]({{base_path}}/guides/organization-management/manage-b2b-administration/#implement-an-administration-portal) section.

**Best Car Mart** needs to manage its employees through an external IdP. As the administrator of Best Car Mart, Alex is tasked with enabling login from the external IdP for Best Car Mart employees.

To configure an identity provider for **Guardio Insurance Business App**:

1. [Log in to the application](#try-out-sign-in-with-sso) with the credentials of Alex.

2. On the application, go to **Settings** > **Identity Providers** and click **Add Identity Provider**.

    ![Best car mart IdP config]({{base_path}}/assets/img/guides/organization/manage-organizations/best-car-mart-idp-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select **Google** if you are onboarding a Google IdP or **Enterprise** if you are onboarding an enterprise IdP.

    ![Select Identity Provider method]({{base_path}}/assets/img/guides/organization/manage-organizations/select-idp-method.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!!note
        Make sure that the configured IdP will share the `Email`, `First Name`, `Last Name`, and `Username` attributes of the authenticating user with {{ product_name }}.

4. Provide the details specific to your IdP and click **Create**.

5. Click **Add to login flow** to enable this IdP as the login option for Best Car Mart users in the application.

6. Open the **Guardio Insurance Business App** by copying the following URL to your browser: `http://localhost:3000/`.

    ![Guardio Business Application Login]({{base_path}}/assets/img/guides/organization/manage-organizations/guardio-app-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. [Log in to the business application through the SSO option](#try-out-sign-in-with-sso). Now, the users in the configured external IdP can be logged into the application.

### Step 2: Onboard an organization administrator

As an administrator in Guardio insurance, now you can onboard administrators from Best Car Mart to the created organization.

To do so, follow the [sales-led approach]({{base_path}}/guides/organization-management/onboard-org-admins/sales-led-approach/) and create an administrator using the values given below.

1. Create the user with the following values.

    {{ user_details }}

2. Assign the created user to the **Guardio Administrator** role of the shared **Guardio-Admin-App** application.

{% else %}

{% include "./try-a-b2b-use-case-pet-care.md" %}

{% endif %}