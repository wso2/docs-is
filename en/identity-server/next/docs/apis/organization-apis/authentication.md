{% set host_name = "localhost:9443" %}

# Authentication for organization APIs

To access the management APIs of organizations in {{ product_name }}, you must first get an access token from your organization for the API operations you want to execute. You can then use this access token to invoke those API operations securely.

The following is a high-level diagram of how to authenticate to organization APIs.

![Get access to for organization APIs]({{base_path}}/assets/img/apis/organization-apis/organization-authentication.png){: style="display: block; margin: 0;"}

Follow the steps given below to get an access token with the required permissions.

1. [Register an OIDC application](#register-an-oidc-application)
2. [Authorize APIs to application](#authorize-apis-to-application)
3. [Request for authorization code](#get-the-authorization-code)
4. [Request an access token against the organization (root)](#step-1-for-the-organization-root)
5. [Request an access token against the organization](#step-2-for-the-organization)

## Register an OIDC application

Use the **standard-based** app type to register an OIDC app:

1. On the {{ product_name }} Console, go to **Applications**.
2. Click **New Application** and select **Standard-Based Application** to open the following:

    ![Register a standard based application]({{base_path}}/assets/img/apis/management-apis/register-a-sba.png){: width="600" style="display: block; margin: 0;"}

3. Provide an application name.
4. Select **OIDC Standard-Based Application** as the application type.

    !!! note
        Learn more about [OIDC configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/).

5. Click **Register** to complete the registration.
6. Click **Share Application** to share the application with organizations.
7. Go to the **Protocol** tab and select [Authorization Code]({{base_path}}/references/grant-types/#authorization-code-grant) and [Organization Switch]({{base_path}}/references/grant-types/#organization-switch-grant) as the grant types for the application.
8. Configure **Authorized redirect URLs**.

The client credentials for your application are displayed in the protocol tab, as shown below.

![Obtain the client ID and client secret of the app]({{base_path}}/assets/img/apis/management-apis/obtain-client-credentials.png){: width="600" style="display: block; margin: 0;"}

!!! note
    The client ID and client secret are sensitive information that must be protected. See the [best practices](#best-practices) before you proceed.

## Authorize APIs to application

1. Go to the **Authorized API** tab of [the created application](#register-an-oidc-application).
2. Authorize the organization APIs you intend to invoke.

!!! note
    Learn more about [Authorize API to application]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app).

## Assign roles to application

1. Go to the **Roles** tab of [the created application](#register-an-oidc-application).
2. Select Role Audience and associate roles with the necessary permissions for API invocation.

!!! note
    The user seeking authentication must possess the necessary privileges to invoke APIs within the organization. 
    This user should be a member of a role that has the required permissions, and this role should be associated with the application in the organization that accesses the API.

## Get the authorization code
First, your application must initiate a login request to the authorization endpoint of {{ product_name }}. After redirecting to {{ product_name }}, the user should be prompted with a login page if the user is not authenticated.

**Request Format**
``` bash
https://{{ host_name }}/oauth2/authorize?response_type=code&redirect_uri={redirect_uri}&client_id={client_id}
```

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>response_type</code><Badge text="Required" type="mandatory"/></td>
    <td>Required grant type. Use <code>code</code> to represent the authorization code grant type.</td>
  </tr>
  <tr>
    <td><code>redirect_uri</code><Badge text="Required" type="mandatory"/></td>
    <td>This is where the response is redirected to at the end of the process. This needs to be the same as one of the URLs given in the registered apps.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
    <td>The client ID obtained when registering the application in {{ product_name }}.</td>
  </tr>
</table>

## Get access tokens
In this flow, the application needs to get tokens for the organization and exchange the obtained token to get an access token for the organization.

Let's see how this works:

### Step 1: For the organization (root)
After receiving the authorization code, the application has to exchange it to get the tokens given below:

- `access_token`
- `id_token`

The application has to provide its credentials and get the tokens.

**Token request**
``` curl
curl --location --request POST 'https://{{ host_name }}/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=<authorization_code>' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'client_id=<client_id>' \
--data-urlencode 'client_secret=<client_secret>' \
--data-urlencode 'redirect_uri=<redirect_uri>'
```

This token request has the following parameters:

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
   <tr>
      <td><code>code</code><Badge text="Required" type="mandatory"/></td>
      <td>The authorization code received from the authorization request.</td>
    </tr>
  <tr>
    <td><code>grant_type</code><Badge text="Required" type="mandatory"/></td>
    <td>The grant type. Here we are using the <code>authorization_code</code> grant.</td>
  </tr>
  <tr>
    <td><code>redirect_uri</code><Badge text="Required" type="mandatory"/></td>
    <td>This is where the response is redirected to at the end of the process.</td>
  </tr>
</table>

### Step 2: For the organization

You can now request an access token from the token endpoint by exchanging the access token of the organization (root) and specifying the internal scopes (permission level) you require to access the API.

!!! note
    See the relevant API reference docs for the list of internal scopes for each API.

Use the following cURL command format in your request:

``` js
curl -X POST \
'https://{{ host_name }}/oauth2/token' \
--header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=organization_switch' \
--data-urlencode 'token=<access token from step 1>' \
--data-urlencode 'scope=<required scopes>' \
--data-urlencode 'switching_organization=<organization id>'
```

Replace the following variables in the above request.

<table>
    <tr>
        <th>Variable</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
        <td>Client ID of your application. This is generated when registering the application in {{ product_name }}.</td>
    </tr>
    <tr>
        <td><code>client_secret</code><Badge text="Required" type="mandatory"/></td>
        <td>Client secret of your application. This is generated when registering the application in {{ product_name }}.</td>
    </tr>
        <tr>
        <td><code>token</code><Badge text="Required" type="mandatory"/></td>
        <td>The access token obtained for the root organization.</td>
    </tr>
    </tr>
    <tr>
        <td><code>scope</code><Badge text="Required" type="mandatory"/></td>
        <td>The scope corresponding to the API you want to use. See the relevant API reference docs for the list of internal scopes for each API.</td>
    </tr>
    <tr>
        <td><code>switching_organization</code><Badge text="Required" type="mandatory"/></td>
        <td>The organization ID of the organization you are switching to.</td>
    </tr>
</table>

## Best practices

When invoking the management APIs, we recommend the following best practices:

- If the ``client_id`` and ``client_secret`` are compromised, anyone can use them to invoke the client credentials grant and get an access token with all the access levels of the admin. Therefore, we highly recommend not sharing the client id and client secret.
- If required, the administrator can set a higher expiry time for the application token through the application configurations in the {{ product_name }} Console.
- When you request an access token, be sure it is specific to the scopes required for a specific task. This allows you to mitigate the risk of token misuse when you share it with other developers.
