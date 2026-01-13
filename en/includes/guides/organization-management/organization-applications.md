# Manage applications in organizations

The following guide explains how organization administrators can create and manage applications within their organizations in {{ product_name }}.

## Create an application

Organization administrators can create applications directly within their organizations. These applications can access and consume the organization’s API resources. To create an application, it must meet the following conditions:

- Use OAuth2.
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

- Use only the following grant types: authorization code, client credentials, password, and refresh token.

- Use a standard-based application or an M2M application template.

{% else %}

- Use only the following grant types: client credentials, password and refresh token.

{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

You can use either the Console or the API to create an application in an organization.

=== "Using the Console"

    To create an application,

    1. On the {{ product_name }} Console, go to **Organizations** and switch to your desired organization.

    2. In the organization, go to **Applications**.

        ![Organization Application Create]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-create.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. Click **Add Application** and use either the **Standard-Based Application** or **M2M Application** template to create your application.

    ![Organization Application Templates]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-templates.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

=== "Using the API"

    To create an application,
    
    1. Get a bearer token with the `internal_org_application_mgt_create` scope. Learn more about [accessing organization APIs]     ({{base_path}}apis/organization-apis/authentication/)
    
    2. Use the [Application management REST API]({{base_path}}/apis/organization-apis/organization-application-mgt/#tag/Applications/operation/createApplication) to create an application in an organization.

{% else %}

To create an application,

1. Get a bearer token with the `internal_org_application_mgt_create` scope. Learn more about [accessing organization APIs]({{base_path}}/apis/organization-apis/authentication/).

2. Use the [Application management REST API]({{base_path}}/apis/organization-apis/organization-application-mgt/#tag/Applications/operation/createApplication) to create an application in an organization.

{% endif %}

## Edit an application

You can find the created applications in the **Application** section of your organization's Console. You can use the Console to make the following changes to these applications.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

- Protocol level configurations
- User attributes related configurations
- Login Flow configurations
- API Authorization for organization application
- Role management for organization application
- Advanced configurations

{% else %}

- Protocol level configurations
- User attributes related configurations
- API Authorization for organization application
- Role management for organization application

{% endif %}

![Organization Application Edit]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-edit.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Generate tokens for applications

The organization applications can use the following OAuth2 grant types to generate tokens.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

### Authorization code grant

Use the following steps to generate an authorization code and exchange it for an access token.

=== "Request format"

    ```bash
    {{ root_org_url }}/o/<ORG_ID>/oauth2/authorize
    ?response_type=code
    &redirect_uri=<APPLICATION_REDIRECT_URI>
    &client_id=<APPLICATION_CLIENT_ID>
    &scope=<REQUIRED_SCOPE/S>
    ```

=== "Sample request"

    ```bash
    {{ root_org_url }}/o/7e98b86f-63c7-41a1-8c56-c909a21a2615/oauth2/authorize
    ?response_type=code
    &redirect_uri=https://bestcarmart.com/login
    &client_id=sample_application_client_id
    &scope=openid internal_org_user_mgt_list read_stores
    ```

After executing the authorization request, {{ product_name }} prompts the user to login to the corresponding organization. After the user successfully logs in, the redirect URL of the application receives an authorization code. The application can exchange the authorization code for a token using the token endpoint.

=== "Request format"

    ``` bash
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k 
    -d "grant_type=authorization_code&code=<AUTHORIZATION_CODE>&redirect_uri=<APPLICATION_REDIRECT_URI>" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/<ORG_ID>/oauth2/token
    ```

=== "Sample request"

    ``` bash
    curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k 
    -d "grant_type=authorization_code&code=111c6b23-e395-4263-8792-87dc5db3c8a9&redirect_uri=https://bestcarmart.com/login" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/7e98b86f-63c7-41a1-8c56-c909a21a2615/oauth2/token
    ```

=== "Sample response"

    ```
    {
        "access_token": "8120d44a-d80b-49d9-b449-a14e399cc404",
        "refresh_token": "ee8bf449-e8ba-421c-b4d5-6a38c6432d4d",
        "scope": "openid internal_org_user_mgt_list read_stores",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

!!! note

    - To obtain the `refresh_token` in the response, go to the **Protocol** tab of the application and enable the **refresh token grant** type.

    - The `scope` parameter returns only the scopes authorized to both the application and the user who requests authorization.

{% endif %}

### Password grant

Use the following steps to use the user's credentials to get an access token.

=== "Request format"

    ```bash
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k 
    -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/<ORG_ID>/oauth2/token
    ```

=== "Sample request"

    ```bash
    curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k 
    -d "grant_type=password&username=Charlie&password=jG9A5KrX" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/7e98b86f-63c7-41a1-8c56-c909a21a2615/oauth2/token
    ```

=== "Sample response"

    ```
    {
        "access_token": "4778085e-5802-3090-aa70-ec877663f194",
        "refresh_token": "13bcbd1d-a4bb-33da-9274-d2c1a1f17d97",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

!!! note
    If you need scopes in the response, add the `scope` parameter to the token request with the required scopes.

### Client credentials grant

Use the following steps to use the client credentials to get an access token.

=== "Request format"

    ```bash
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k 
    -d "grant_type=client_credentials" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/<ORG_ID>/oauth2/token
    ```

=== "Sample request"

    ```bash
    curl --user fhErtAT2YF_M0Ek3AAYHLI8L25oa:JirxvtfoecnrS8vBjM7ygOtSIXuCS_uK_9WEC7d1zPEa -k 
    -d "grant_type=client_credentials" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6/oauth2/token
    ```

=== "Sample response"

    ```
    {
        "access_token": "bc978da1-6c56-3125-a999-a8d61c889672",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

!!! note
    If you need scopes in the response, add the `scope` parameter to the token request with the required scopes.

## Introspect tokens for applications

You can use the token introspection endpoint to validate access tokens issued for organization applications. The following example demonstrates how to introspect an access token.

=== "Request format"

    ```bash
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k 
    -d "token=<SUB_ORG_APP_TOKEN>" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/<ORG_ID>/oauth2/introspect
    ```

=== "Sample request"

    ```bash
    curl --user fhErtAT2YF_M0Ek3AAYHLI8L25oa:JirxvtfoecnrS8vBjM7ygOtSIXuCS_uK_9WEC7d1zPEa -k 
    -d "token=ef757efc-6ec3-3e12-83f6-cb2849d67f7b" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6/oauth2/introspect
    ```

=== "Sample response"

    ```
    {
        "aut": "APPLICATION_USER",
        "aud": "fhErtAT2YF_M0Ek3AAYHLI8L25oa",
        "nbf": 1739253383,
        "org_id": "12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6",
        "active": true,
        "token_type": "Bearer",
        "exp": 1739256983,
        "iat": 1739253383,
        "client_id": "fhErtAT2YF_M0Ek3AAYHLI8L25oa",
        "username": "Charlie@12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6"
    }
    ```

## Revoke tokens for applications

The following example demonstrates how to revoke tokens issued for organization applications.

=== "Request format"

    ```bash
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k 
    -d "token=<SUB_ORG_APP_TOKEN>&token_type_hint=<TOKEN_TYPE>" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/<ORG_ID>/oauth2/revoke
    ```

=== "Sample request"

    ```bash
    curl --user fhErtAT2YF_M0Ek3AAYHLI8L25oa:JirxvtfoecnrS8vBjM7ygOtSIXuCS_uK_9WEC7d1zPEa -k 
    -d "token=ef757efc-6ec3-3e12-83f6-cb2849d67f7b&token_type_hint=access_token" 
    -H "Content-Type: application/x-www-form-urlencoded" 
    {{ root_org_url }}/o/12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6/oauth2/revoke
    ```

=== "Sample response"

    ```json
    Empty JSON response with HTTP status code 200 OK
    ```

## Additional capabilities for applications

Alongside application management, following capabilities are now available in the organizations

- Role management : Roles can be managed directly in the organization and can associate with the applications
which are managed directly in the organization.

- Inherited API Resources : The {{ product_name }} defined Organization API Resources and the API Resources that are created 
in the root organization are now inherited to the organization. These API Resources can be authorized to the 
applications which are managed directly in the organization.

### Inherited API resources

The Organization API Resources and the API Resources that are created in the root organization are 
inherited to the organizations directly. These API Resources are available in read only mode through the {{ product_name}} Console.

![Inherited default API Resources]({{base_path}}/assets/img/guides/applications/organization-applications/inherited-api-resources.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Role management

Organizations can have their own roles and manage them independently. These roles can only be associated with the 
applications that are managed directly in the organization. 

![Role management in organization]({{base_path}}/assets/img/guides/applications/organization-applications/role-management-organization.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Please refer [Manage roles]({{base_path}}/guides/users/manage-roles/) for more details on how you can manage the roles.

#### Role types in organization

Organization now have two types on roles.

- Shared roles : Roles defined by the root organization and used by B2B applications shared with this organization 
are created as shared roles within the organization.
- Roles managed directly in the organization : Roles which can be managed directly in the organization.

Both these roles can be assigned to any user in the organization but in the authorization, shared applications will only 
consider the shared roles to provide the authorization.

There might be scenarios where the above two types of roles can lead to a conflict of role creation. Please refer 
[Manage role conflicts in organization]({{base_path}}/guides/organization-management/manage-conflicts-in-organizations/#manage-role-conflicts-in-organization) for more information.