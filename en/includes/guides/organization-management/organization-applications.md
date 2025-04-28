# Manage OAuth2 applications within organization

Applications can be created directly in the organizations and these applications can be used to consume the API resources
from the organizations. 

These applications can be created under the following conditions.

- Application's protocol is OAuth2.
- Only client credentials, password and refresh grant types can be used.

Alongside with the Application Management, following capabilities are now available in the organizations

- Role management : Roles can be managed directly in the organization and can associate with the applications
which are managed directly in the organization.

- Inherited API Resources : The {{ product_name }} defined Organization API Resources and the API Resources that are created 
in the root organization are now inherited to the organization. These API Resources can be authorized to the 
applications which are managed directly in the organization.

## Inherited API Resources

The Organization API Resources and the API Resources that are created in the root organization are 
inherited to the organizations directly. These API Resources are available in read only mode through the {{ product_name}} Console.

![Inherited default API Resources]({{base_path}}/assets/img/guides/applications/organization-applications/inherited-api-resources.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Role Management

Organizations can have their own roles and manage them independently. These roles can only be associated with the 
applications that are managed directly in the organization. 

![Role management in organization]({{base_path}}/assets/img/guides/applications/organization-applications/role-management-organization.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Please refer [Manage roles]({{base_path}}/guides/users/manage-roles/) for more details on how you can manage the roles.

### Role types in organization

Organization now have two types on roles.

- Shared roles : Roles defined by the root organization and used by B2B applications shared with this organization 
are created as shared roles within the organization.
- Roles managed directly in the organization : Roles which can be managed directly in the organization.

Both these roles can be assigned to any user in the organization but in the authorization, shared applications will only 
consider the shared roles to provide the authorization.

There might be scenarios where the above two types of roles can lead to a conflict of role creation. Please refer 
[Manage role conflicts in organization]({{base_path}}/guides/organization-management/manage-conflicts-in-organizations/#manage-role-conflicts-in-organization) for more information.

## OAuth2 Application Management

Organizations can have their own OAuth2 applications and manage them independently. These applications can issue tokens 
and allow access to the API Resources which belongs to the particular organization. Organization application can be 
created with the below conditions.

- Application's protocol is OAuth2.
- Only client credentials, password and refresh grant types can be used.

Organization application can be created by using the [Organization application Add]({{base_path}}/apis/organization-apis/organization-application-mgt/#tag/Applications/operation/createApplication) API request. A bearer token with the `internal_org_application_mgt_create` scope, which was issued for the corresponding organization will be needed to invoke this API.

These created applications can be edited from the {{ product_name }} Console.

![Organization Application Edit]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-edit.png)

The following operations are supported for organization applications.

- Protocol level configurations
- User attributes related configurations
- API Authorization for organization application
- Role management for organization application

### Token generation from organization applications

- Password Grant

!!! abstract
    **Request format**
    ```
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/o/<ORG_ID>/oauth2/token
    ```
    ---
    **Sample request**
    ```curl
    curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k -d "grant_type=password&username=Charlie&password=jG9A5KrX" -H "Content-Type: application/x-www-form-urlencoded" {{ root_org_url }}/o/7e98b86f-63c7-41a1-8c56-c909a21a2615/oauth2/token
    ```
    ---
    **Sample response**
    ```
    {
        "access_token": "4778085e-5802-3090-aa70-ec877663f194",
        "refresh_token": "13bcbd1d-a4bb-33da-9274-d2c1a1f17d97",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

    !!! note
        If you need the scopes with the response, the add the `scope` path parameter to the token request with the required scopes.

- Client Credentials Grant

!!! abstract
    **Request format**
    ```
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=client_credentials" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/o/<ORG_ID>/oauth2/token
    ```
    ---
    **Sample request**
    ```curl
    curl --user fhErtAT2YF_M0Ek3AAYHLI8L25oa:JirxvtfoecnrS8vBjM7ygOtSIXuCS_uK_9WEC7d1zPEa -k -d "grant_type=client_credentials" -H "Content-Type: application/x-www-form-urlencoded" {{ root_org_url }}/o/12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6/oauth2/token
    ```
    ---
    **Sample response**
    ```
    {
        "access_token": "bc978da1-6c56-3125-a999-a8d61c889672",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```

    !!! note
        If you need the scopes with the response, the add the `scope` path parameter to the token request with the required scopes.

### Token introspection from organization application

!!! abstract
    **Request format**
    ```
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "token=<SUB_ORG_APP_TOKEN>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/o/<ORG_ID>/oauth2/introspect
    ```
    ---
    **Sample request**
    ```curl
    curl --user fhErtAT2YF_M0Ek3AAYHLI8L25oa:JirxvtfoecnrS8vBjM7ygOtSIXuCS_uK_9WEC7d1zPEa -k -d "token=ef757efc-6ec3-3e12-83f6-cb2849d67f7b" -H "Content-Type: application/x-www-form-urlencoded" {{ root_org_url }}/o/12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6/oauth2/introspect
    ```
    ---
    **Sample response**
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

### Token revocation from organization application

!!! abstract
    **Request format**
    ```
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "token=<SUB_ORG_APP_TOKEN>&token_type_hint=<TOKEN_TYPE>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/o/<ORG_ID>/oauth2/revoke
    ```
    ---
    **Sample request**
    ```curl
    curl --user fhErtAT2YF_M0Ek3AAYHLI8L25oa:JirxvtfoecnrS8vBjM7ygOtSIXuCS_uK_9WEC7d1zPEa -k -d "token=ef757efc-6ec3-3e12-83f6-cb2849d67f7b&token_type_hint=access_token" -H "Content-Type: application/x-www-form-urlencoded" {{ root_org_url }}/o/12d1c4d2-2bb1-443b-aa4a-68f98a40d7c6/oauth2/revoke
    ```
    ---
    **Sample response**
    ```
    Empty JSON response with HTTP status code 200 OK
    ```
    