# Authentication

To access [management APIs]({{base_path}}/apis/)  in Asgardeo, you need to first get an access token from your organization for the API operations that you want to access. You can then use this access token to securely invoke those API operations.

Follow the instructions given below.

## Get an access token

Follow the steps given below to get an access token with the required permissions.

1. [Register a management app](#register-a-management-app)
2. [Request an access token](#request-an-access-token)

### Register a management app

Use the **standard-based** app type to register an OIDC management app:

1. On the Asgardeo Console, go to **Applications**.
2. Click **New Application** and select **Standard-Based Application** to open the following:

    ![Register a standard based application]({{base_path}}/assets/img/apis/management-apis/register-a-sba.png){: width="600" style="display: block; margin: 0;"}

3. Provide an application name.
4. Select **OIDC Standard-Based Application** as the app type and then select the **Management Application** checkbox.

    !!! note
        Learn more about [OIDC configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/).

5. Click **Register** to complete the registration.
6. Go to the **Protocol** tab and select **Client Credential** as the grant type for the application.

The client credentials for your application are displayed in the protocol tab as shown below.

![Obtain the client ID and client secret of the app]({{base_path}}/assets/img/apis/management-apis/obtain-client-credentials.png){: width="600" style="display: block; margin: 0;"}

!!! note
    The client ID and client secret are sensitive information that must be protected. See the [best practices](#best-practices) before you proceed.

### Request an access token

You can now request an access token from the token endpoint by specifying the internal scopes (permission level) that you require to access.

!!! note
    See the relevant API reference docs for the list of internal scopes for each API.

Use the following cURL command format in your request:

``` js
curl -X POST \
https://api.asgardeo.io/t/<org_name>/oauth2/token \
-u  '<client_id>:<client_secret>' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&scope=<scope>'
```

Replace the following variables in the above request.

<table>
    <tr>
        <th>Variable</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>org_name</code></td>
        <td>Name of your organization on Asgardeo.</td>
    </tr>
        <tr>
        <td><code>client_id</code></td>
        <td>Client ID of your application. This is generated when registering the application in Asgardeo.</td>
    </tr>
        <tr>
        <td><code>client_secret</code></td>
        <td>Client secret of your application. This is generated when registering the application in Asgardeo.</td>
    </tr>
        <tr>
        <td><code>scope</code></td>
        <td>The scope corresponding to the API you want to use.See the relevant API reference docs for the list of internal scopes for each API.</td>
    </tr>
</table>

#### Sample access token

Shown below is a sample access token that you will receive in the response.

``` text
61985b0e-26c3-38b7-acff-b18ad934eafc 
```

## Access the API
You can now use the access token as an **Authorization Bearer** header to access the management APIs.

This is a sample cURL command template for the request.

``` js
curl -X GET "https://api.asgardeo.io/t/<org_name>/scim2/Users" 
-H "accept: application/scim+json" 
-H "Authorization: Bearer <access_token>"
```

## Best practices

When invoking the management APIs we recommend the following best practices:

- If the ``client_id`` and ``client_secret`` are compromised, anyone can use them to invoke the client credentials grant and get an access token with all the access levels of the admin. Therefore, we highly recommend not to share the client id and client secret.
- If required, the administrator can set a higher expiry time for the application token through the application configurations in the Asgardeo Console.
- When you request an access token, be sure that it is specific to the scopes that are required for a specific task. This allows you to mitigate the risk of token misuse when you share it with other developers.