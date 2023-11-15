# Try a B2B use case (with organization login)

The following guide is a complete end-to-end use case on how to manage B2B (Business-to-Business) applications in {{ product_name }}.

## Scenario

You are an administrator of **Guardio Insurance**, which is a company that provides its services to other business organizations.

**Best Car Mart** has a partnership with Guardio Insurance to provide life insurance policies to its employees. Guardio Insurance exposes its services to Best Car Mart's employees through its **Guardio Insurance App**.

The employees of Best Car Mart should be able to log in to the Guardio Insurance App to consume its services. The administrators of Best Car Mart will manage the users of its organization and also determine the login experience that their users should have.

![Organizatoin login scenario]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-login-scenario.png){: width="600" style="display: block; margin: 0 auto;"}

## Prerequisites
You should [create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-a-new-organization). For this example we have created an organization named `Guardio Insurance`.

## Set up the sub organization

As the administrator of **Guardio Insurance**, you need to first set up a sub organization.

### Step 1: Onboard the sub organization

[Create a sub  organization]({{base_path}}/guides/organization-management/manage-suborganizations/#create-a-suborganization) on the {{ product_name }} Console with `Best Car Mart` as the **Sub organization Name**.

### Step 2: Onboard a sub organization administrator

[Onboard an administrator]({{base_path}}/guides/organization-management/manage-b2b-administration/#onboard-suborganization-administrators) to the Best Car Mart organization using the values given below.

<table>
    <tr>
        <th>Username (Email)</th>
        <td>Enter an email address as the user name.</td>
    </tr>
    <tr>
        <th>First Name</th>
        <td>Enter the first name of the user.</br>
            <code>Alex</code>
        </td>
    </tr>
    <tr>
        <th>Last Name</th>
        <td>Enter the last name of the user.</br>
            <code>Doe</code>
        </td>
    </tr>
    <tr>
        <th>Password</th>
        <td>Set a temporary password for the user.</td>
    </tr>
</table>

## Set up the app
The following guides explain how you can share an application with sub organizations and allow sub organization users to log in to it using **SSO**.

Let's use the sample application, [Guardio Insurance app](https://github.com/wso2/samples-is/releases/download/v4.5.3/b2b-sample.zip), to explore this use case.

### Step 1: Register the app on {{ product_name }}

Follow the steps given below to register the Guardio Insurance App with {{ product_name }}.

1. Switch to the primary organization.
2. [Register a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/) in your primary organization with the following settings:

    <table>
        <tr>
            <th>Application Name</th>
            <td>Add a name for the application.</br>
                <code>guardio-app</code>
            </td>
        </tr>
        <tr>
            <th>Protocol</th>
            <td>The authentication protocol to use.</br>
                <code>OAuth2.0 OpenID Connect</code>
            </td>
        </tr>
        <tr>
            <th>Management Application</th>
            <td>Select this checkbox to indicate that the application has access to {{ product_name }}'s management APIs.</td>
        </tr>
    </table>

### Step 2: Share the app with sub organizations

Share the <b>Guardio Insurance app</b> with your <b>Best Car Mart</b> sub organization. See instructions on how to [share applications with sub organizations]({{base_path}}/guides/organization-management/share-applications/).

By doing so, you enable **Sign In with SSO** as a login option in the application login screen, which sub organization users can use to log in.

### Step 3: Configure the app on {{ product_name }}
To configure the registered application on {{ product_name }}:

1. On the {{ product_name }} Console, go to **Applications** and select the application you registered.
2. Go to the **Protocol** tab of the application, configure the following values.

    !!! note
        Note that the `Organization Switch` grant will only be visible after you share the application with sub organizations.

    <table>
        <tr>
            <th>Allowed Grant Types</th>
            <td> Select the following grant types:
                <ul>
                    <li>Client Credential</li>
                    <li>Code</li>
                    <li>Organization Switch</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Authorization Redirect URL</th>
            <td>Enter the URLs of the application to which users should be redirected after login and logout.</br>
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

    Take note of the `client_id` and `client_secret` generated for your application.

3. Click **Update** to save your configurations.

### Step 4: Set up the client app

To set up the client application:

1. Open the `config.json` file found in the `b2b-sample/guardio-insurance-sample-application` folder and update the following parameters:

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Value</th>
        </tr>
        <tr>
            <td><code>BaseOrganizationUrl</code></td>
            <td>The base URL of the organization.</td>
            <td><code>https://{{ host_name }}/t/{organization-name}</code>
            </td>
        </tr>
        <tr>
            <td><code>ClientId</code></td>
            <td>The client ID of the application created on {{ product_name }}.</td>
            <td>Client ID copied from step 1 above.</td>
        </tr>
        <tr>
            <td><code>ClientSecret</code></td>
            <td>The client secret of the application created on {{ product_name }}.</td>
            <td>Client secret copied from step 1 above.</td>
        </tr>
        <tr>
            <td><code>HostedUrl</code></td>
            <td>The URL of the client application.</td>
            <td><code>http://localhost:3000</code></td>
        </tr>
        <tr>
            <td><code>APIScopes</code></td>
            <td>The scopes required by the application to access user resources.</td>
            <td><code>openid</code>, <code>email</code>, <code>internal_login</code>, etc.</td>
        </tr>
        <tr>
            <td><code>Branding.name</code></td>
            <td>The branding name of your application.</td>
            <td><code>Guardio Insurance</code></td>
        </tr>
        <tr>
            <td><code>Branding.tag</code></td>
            <td>A branding tag line for your application.</td>
            <td><code>Anytime . Anywhere</code></td>
        </tr>
        <tr>
            <td><code>SharedApplicationName</code></td>
            <td>The application name you used to register the application in {{ product_name }}.</td>
            <td><code>Guardio Insurance App</code></td>
        </tr>
        <tr>
            <td><code>ImageBaseUrl</code></td>
            <td>Add the URL of {{ product_name }} Console to load images required for the sample application.</td>
            <td><code>https://console.asgardeo.io</code></td>
        </tr>
    </table>

    !!! note
        Remove the `SampleOrganization` section from the `config.json` file as it is not required for {{ product_name }} configurations.

2. To start the application, open a terminal, navigate to the `b2b-sample/guardio-insurance-sample-application` folder and execute the following commands:

    ```bash
    npm install
    ```

    ```bash
    npm run dev
    ```

## Try it out

The following guides explain how a sub organization user can log in to the sample application, **Guardio Insurance App** and how a sub organization administrator can use the built-in administration portal.

### Try out organization login

Follow the steps below to see how organization login works for a user in the **Best Car Mart** sub organization when logging into **Guardio Insurance App**.

1. Open the application by copying the following URL to your browser: `http://localhost:3000/`

    ![Guardio Application Login]({{base_path}}/assets/img/guides/organization/manage-organizations/guardio-app-login.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

2. Click **Sign In** and see that you are diverted to the {{ product_name }} login screen.

3. Click **Sign In with SSO** to specify the organization to which you are signing in.

4. Enter **Best Car Mart** as the organization name and click **Submit**.

    ![Sign in with SSO]({{base_path}}/assets/img/guides/organization/manage-organizations/sign-in-with-organization-login.png){: width="400" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Enter the username and password of a user who you have onboarded to Best Car Mart.

6. Click **Sign in** and grant permission for the application to access your user attributes.

    You have successfully logged into the **Guardio Insurance App** as a user of the **Best Car Mart** organization.

### Try out the administration portal

!!! note
    Learn how to build an administration portal for your B2B application in the [implement an administration portal]({{base_path}}/guides/organization-management/manage-b2b-administration/#implement-an-administration-portal) section.

**Best Car Mart** needs to manage its employees through an external IdP. As the administrator of Best Car Mart, Alex, is tasked with enabling login from the external IdP for Best Car Mart employees.

To configure an identity provider for **Guardio Insurance App**:

1. [Log in to the application](#try-out-organization-login) with the credentials of Alex.

2. On the application, go to **Settings** > **Identity Providers** and click **Add Identity Provider**.

    ![Logged into best auto mart]({{base_path}}/assets/img/guides/organization/manage-organizations/best-auto-mart-org-app.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Select **Google** if you are onboarding a Google IdP or **Enterprise** if you are onboarding an enterprise IdP.

    ![Select Identity Provider method]({{base_path}}/assets/img/guides/organization/manage-organizations/select-idp-method.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Provide the details specific to your IdP and click **Create**.

5. Click **Add to login flow** to enable this IdP as the login option for Best Car Mart users in the application.