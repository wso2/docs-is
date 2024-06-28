{% set host_name = "localhost:9443" %}
{% set host_name_example = "localhost:9443" %}

# Access organization APIs

To access organization APIs in {{ product_name }}, you must first get an access token. Follow the steps given below to get an access token with the required permissions.

## Step 1: Register an OIDC application

Follow the steps below to register an application:

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application** to open the following:

    ![Register a standard based application]({{base_path}}/assets/img/apis/management-apis/register-a-sba.png){: width="600" style="display: block; margin: 0;"}

3. Provide an application name.

4. Select **OAuth 2.0 OpenID Connect** as the application protocol.

5. Click **Register** to complete the registration.

6. Click **Share Application** to share the application with organizations.

7. Go to the **Protocol** tab and,
 
    - select [Authorization Code]({{base_path}}/references/grant-types/#authorization-code-grant) and [Organization Switch]({{base_path}}/references/grant-types/#organization-switch-grant) as the grant types for the application.

    - configure authorized redirect URLs for your application.

    !!! note
        Learn more about [OIDC configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/).

8. Take note of the client credentials displayed in the **Protocol** tab.

    ![Obtain the client ID and client secret of the app]({{base_path}}/assets/img/apis/management-apis/obtain-client-credentials.png){: width="800" style="display: block; margin: 0;"}


## Step 2: Authorize the application to consume API resources

Applications must be provided with the relevant permissions to consume API resources. To authorize the application,

1. On the {{product_name}} Console, go to **Applications**.

2. Select the created application and go to its **API Authorization** tab.

3. Click **Authorize an API Resource** and provide the relevant details of the API resource. Repeat the step for the required APIs

    !!! tip
        Find the relevant scopes from the API definition of organization APIs.

4. Click **Finish** to save the changes.

!!! note
    For more information, refer to [API authorization]({{base_path}}/guides/api-authorization/).

## Step 3: Associate roles with an application

Two requirements must fulfill for a logged in user to receive an access token with the correct permissions.

- The user must be assigned to a role that is associated with the application.
- The role should permit the user to access the requested API resources and perform the requested actions.

Applications may be associated with roles made for the organization, or tailored specifically for the application. To associate roles with an application,

1. Go to the **Roles** tab of the created application.
2. Do one of the following:
    - Select **Role Audience** as **Application** and under **Assigned Roles**, select from the roles created specifically for the application.
    - Select **Role Audience** as **Organization** to associate all organization-level roles with the application.
3. Click **Update** to save the changes.

!!! note
    - Learn more about roles in [manage roles]({{base_path}}/guides/users/manage-roles/).
    - Learn more about API authorization in [API authorization with RBAC]({{base_path}}/guides/api-authorization/).


## Step 4: Get the authorization code

Your application must initiate a login request to the authorization endpoint of {{ product_name }}. After redirecting to {{ product_name }}, the user should be prompted with a login page if the user is not authenticated.

=== "Request format"

    ``` bash
    https://{{ host_name }}/oauth2/authorize?\
    response_type=code\
    &redirect_uri={redirect_uri}\
    &scope={space-separated list of scopes}\
    &client_id={client_id}
    ```
=== "Sample request"

    ``` bash
    https://{{ host_name_example }}/oauth2/authorize?\
    response_type=code\
    &redirect_uri=https://localhost:3000\
    &scope=openid internal_org_application_mgt_view\
    &client_id=z8RB6ysdDZhe4QO0zJAQzKbi6P4a
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
    <td><code>scope</code><Badge text="Required" type="mandatory"/></td>
    <td>The scope corresponding to the API you want to use. See the relevant API reference docs for the list of internal scopes for each API.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
    <td>The client ID obtained when registering the application in {{ product_name }}.</td>
  </tr>
</table>

## Step 5: Get access tokens

After receiving the authorization code, the application has to exchange it to get the `id_token` and the `access_token`. The method of obtaining these tokens differs depending on the type of user which can be one of the following.

  - A user that was created within the organization.
  - A parent organization user that was invited to join the organization.

### For a created user

A user created within the organization may use organization SSO to log in to the application. The access token received in this case can be directly used to access organization APIs.

The access token request is as shown below.

=== "Token request format"

    ``` bash
    curl --location --request POST 'https://{{ host_name }}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code={authorization_code}' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'client_id={client_id}' \
    --data-urlencode 'client_secret={client_secret}' \
    --data-urlencode 'redirect_uri={redirect_uri}'
    ```

=== "Sample request"

    ``` bash
    curl --location --request POST 'https://{{ host_name_example }}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code=97c85a59-a758-3a56-95cd-e71a505b493d' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'client_id=z8RB6ysdDZhe4QO0zJAQzKbi6P4a' \
    --data-urlencode 'client_secret=2mcunRfr56ght72Vf7phNUbQRgeOCmrnVkLJA4wa' \
    --data-urlencode 'redirect_uri=https://localhost:3000'
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


### For an invited user

If the organization user is an invited member of the parent organization, the user logs into the application using the credentials of the parent organization. The access token obtained in this process cannot be directly used to access organization APIs. It has to be exchanged using the [organization switch grant]({{base_path}}/references/grant-types/#organization-switch-grant). Let's see how this works:

1. Initiate the token request similar to that of a created user as above.

    === "Token request format"

        ``` bash
        curl --location --request POST 'https://{{ host_name }}/oauth2/token' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'code={authorization_code}' \
        --data-urlencode 'grant_type=authorization_code' \
        --data-urlencode 'client_id={client_id}' \
        --data-urlencode 'client_secret={client_secret}' \
        --data-urlencode 'redirect_uri={redirect_uri}'
        ```

    === "Sample request"

        ``` bash
        curl --location --request POST 'https://{{ host_name_example }}/oauth2/token' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'code=97c85a59-a758-3a56-95cd-e71a505b493d' \
        --data-urlencode 'grant_type=authorization_code' \
        --data-urlencode 'client_id=z8RB6ysdDZhe4QO0zJAQzKbi6P4a' \
        --data-urlencode 'client_secret=2mcunRfr56ght72Vf7phNUbQRgeOCmrnVkLJA4wa' \
        --data-urlencode 'redirect_uri=https://localhost:3000'
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

2. Exchange the user's access token obtained by logging into the parent organization using the following command.

    === "Token exchange request format"

        ``` js
        curl -X POST \
        'https://{{ host_name }}/oauth2/token' \
        --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=organization_switch' \
        --data-urlencode 'token={access token from step 1}' \
        --data-urlencode 'scope={required scopes}' \
        --data-urlencode 'switching_organization={organization id}'
        ```

    === "Sample exchange request"

        ``` js
        curl -X POST \
        'https://{{ host_name_example }}/oauth2/token' \
        --header 'Authorization: Basic ejhSQjZ5c2REWmhlNFFPMHpKQVF6S2JpNlA0YTp6MEM3OXpsb3B4OGk3QnlPdzhLMTVBOWRwbFlh' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=organization_switch' \
        --data-urlencode 'token=54bd024f-5080-3db5-9422-785f5d610605' \
        --data-urlencode 'scope=openid internal_org_application_mgt_view' \
        --data-urlencode 'switching_organization=9e394cbf-70bf-532a-955d-0ef34597f2ef'
        ```
    This token request has the following parameters:

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

## Step 6: Access the API

You can now use the access token to access APIs as follows:

```bash
curl -X GET https://{{ host_name }}/o/api/server/v1/applications \
-H "accept: application/json" \
-H "Authorization: Bearer <access_token>"
```

## Best practices

When invoking APIs, we recommend the following best practices:

- If the ``client_id`` and ``client_secret`` are compromised, anyone can use them to invoke the client credentials grant and get an access token with all the access levels of the admin. Therefore, we highly recommend not sharing the client id and client secret.
- If required, the administrator can set a higher expiry time for the application token through the application configurations in the {{ product_name }} Console.
- When you request an access token, make sure it is specific to the scopes required for a specific task. This allows you to mitigate the risk of token misuse when you share it with other developers.