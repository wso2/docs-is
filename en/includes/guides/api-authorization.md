# Role Based Access Control (RBAC) for API Authorization

{{ product_name }} allows organizations to authorize user access to an application's API resources based on the application associated roles assigned to the users.

![The relationship between terms]({{base_path}}/assets/img/guides/authorization/api-authorization/API-resource-high-level.png){: width="700" style="display: block; margin: 0 auto;"}

The following are the terms used in the API authorization context:

<table>
    <tr>
        <th>Term</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>API resources</td>
        <td>Used to group the API scopes/permissions that your applications can consume.</td>
    </tr>
    <tr>
        <td>Permissions</td>
        <td>Interchangeably known as scopes. Permissions represent an action an application can perform on behalf of a user. These are the scopes an application need to request to obtain a token capable of accessing the API resource.</td>
    </tr>
    <tr>
        <td>Roles</td>
        <td>Used to map the permissions of the API resource to a persona in the application.
            See <a href="{{base_path}}/guides/users/manage-roles">manage roles</a> for more information.
    </tr>
    <tr>
        <td>User Groups</td>
        <td>A collection of users with the same privileges to access resources in an organization. A group is user store specific.
            See <a href="{{base_path}}/guides/users/manage-groups">manage groups</a> for more information.
        </td>
    </tr>
    <tr>
    <td>IdP Groups</td>
        <td>Groups of the configured external identity providers.
            See <a href="{{base_path}}/guides/authentication/#add-groups-to-connections">IdP groups</a> for more information.
        </td>
    </tr>
</table>

The relationship between these entities is as follows:

- API resources come with specific scopes(permissions). 
- Roles are formed by collecting scopes (permissions) from different APIs. 
- Applications can be linked to specific sets of roles and set of API resources.
- Roles can be assigned to individual users, user groups or external IdP groups.
- Users get access to an application's API resources based on the resolved user assigned roles based on the authenticated mechanism and the application.

## How it works

Administrators in an organization have the authority to either allow unrestricted access or enforce controlled access to the API resources.

If administrators choose to skip authorization, all application users will be authorized to access the API resources without any limitations.

However, if authorization is mandated for the API resources, the following flow occurs:

1. The user attempts to access an application with controlled access to API resources.
2. {{ product_name }} retrieves the user's roles associated to the application by checking the direct user-to-roles assignments and user's group-to-role assignments.
3. {{ product_name }} evaluates the permissions associated with the user's roles.
4. Based on the assigned permissions, {{ product_name }} grants or denies the user with controlled access to the API resources.

To summarize, {{ product_name }} validates the user's role assignment (direct or via groups), examines the permissions associated with the roles, and decides whether to permit or restrict the user's access to the API resources.

## Register an API resource
{{ product_name }} allows administrators to register API resources with scopes(permissions).

To register an API resource on {{ product_name }},

1. On the {{ product_name }} Console, go to **API Resources**.
2. Click **+ New API** to register a new API resource.
3. Enter the following details:
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>Identifier</b></td>
            <td>This is an identifier for your API resource. This can be any value, but {{ product_name }} recommends using the URI of the API resource as the identifier. This value will be used as the <code>aud</code> claim in the issued JWT token.</td>
        </tr>
        <tr>
            <td><b>Display Name</b></td>
            <td>A meaningful name to identify your API resource in {{ product_name }}.</td>
        </tr>
    </table>

4. Click **Next** and enter the following details:
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>Scope (Permission)</b></td>
            <td>The value that acts as the scope when requesting an access token. This value should be similar to the scope value in your application.</td>
        </tr>
        <tr>
            <td><b>Display Name</b></td>
            <td>A meaningful name for your scope (permission). This will be displayed on your application's user consent page.</td>
        </tr>
        <tr>
            <td><b>Description</b></td>
            <td>A description for your scope (permission). This will be displayed on your application's user consent page.</td>
        </tr>
    </table>

5. Click **+ Add Scope**. Note that you can add multiple scopes according to your requirements.

6. Click **Next** and enable **Requires authorization** if the users consuming your API should be authorized before they get access, else you can proceed without an authorization policy.

7. Click **Finish** to complete the API resource registration.

## Authorize the API resources for an app

!!! note
    Before you register any APIs in the organization (root), **Management APIs** and **Organization APIs** are already exist. To learn more about the features and endpoint of the Management and Organization API, see [API section]({{base_path}}/apis/).

Once you have registered API resources in your organization, you can authorize applications in your organization to access those API resources. This is done by connecting the API resources to the relevant applications. Users of an application will have access to the API resource depending on the authorization settings you have configured.
If an API resource requires authorization, RBAC will be applied before granting users access.

{{ product_name }} allows administrators to connect API resources to applications. To authorize an API resource for an application:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to authorize the registered API resource and go to **API Authorization**.

    !!! warning
        Note that you cannot authorize API resources for a SAML application.

3. Click **+ Authorize an API Resource**.

4. Enter the following details:
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>API Resource</b></td>
            <td>Select the API resource you wish to integrate with your application.</td>
        </tr>
        <tr>
            <td><b>Authorized Scopes</b></td>
            <td>Select the scopes.</td>
        </tr>
        <tr>
            <td><b>Authorization Policy</b></td>
            <td>Select the authorization policy. If you have selected <b>Requires Authorization</b> when adding the API resource, RBAC will be selected by default, else you have the option to select between <code>Role-Based Access Control (RBAC)</code> and <code>No Authorization Policy</code>.</td>
        </tr>
    </table>

5. Click **Finish**.

    ![Successfully authorized an API resource in the app]({{base_path}}/assets/img/guides/authorization/api-authorization/authorize-an-api-resource.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

## Configure RBAC for API resources
If RBAC is enabled as the authorization policy for the API resource, users accessing the API through an application will have role-based access.

### Define scopes for an API resource
If you didn't specify all the permissions for the API resource when [registering the API resource](#register-an-api-resource), follow the steps given below to add permissions.

1. On the {{ product_name }} Console, go to **API Resources**.
2. Select the API resource and go to the **Scopes** tab.
3. Click **+ Add Scope** and enter the following details:
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>Scope (Permission)</b></td>
            <td>The value that acts as the scope when requesting an access token. This value should be similar to the scope value in your application.</td>
        </tr>
        <tr>
            <td><b>Display Name</b></td>
            <td>A meaningful name for your scope (permission). This will be displayed on your application's user consent page.</td>
        </tr>
        <tr>
            <td><b>Description</b></td>
            <td>A description for your scope (permission). This will be displayed on your application's user consent page.</td>
        </tr>
    </table>
4. Click **Finish**.

### Associate roles to the application

The scopes (permissions) of your API resource should be assigned to a role and associate that role to the application. 

1. Create a role and assign scopes (permissions) to the role. See [create a role]({{base_path}}/guides/users/manage-roles/#create-a-role) for more information.
2. If you create a role with the `Application` audience, the role will be associated to the selected application during role creation. If you create a role in `Organization` audience, you need to associate the role to the application. See [associate roles to an application]({{base_path}}/guides/users/manage-roles/#associate-roles-to-an-application) for more information.

### Assign users or groups to roles

Grant permissions of the roles to users by [assign users to role]({{base_path}}/guides/users/manage-roles/#assign-users-to-a-role) or [assign user's groups to roles]({{base_path}}/guides/users/manage-roles/#assign-user-groups-to-a-role).

## Try it out

Follow the steps given below to try out the RBAC flow:

!!! note
    Note that we are using {{ product_name }}'s [React sample application]({{base_path}}/get-started/try-samples/qsg-spa-react/) for this scenario.

### Request scopes for the user

To request scopes for the user:

1. Add the new scopes to the configuration file of your SDK. You need to request these new scopes in addition to the OIDC scopes of your application.

    To get the scopes:

    1. On the {{ product_name }} Console, go to **Applications** and select your application.
    2. Copy the scopes listed at the end of the **API Authorization** section.

        ![Additional scopes to access the API resource]({{base_path}}/assets/img/guides/authorization/api-authorization/additional-scopes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! tip
        When you add scopes to the configuration file of your SDK, add them as comma-separated values.

2. Access the application URL.
3. Try to log in as a user who has permissions to access the API resource.

    If you have disabled `Skip login consent` in your application's settings, upon successful login you will see the permission (scopes) allowed for the user on the user consent page.

    ![Permission of the user shown on the user consent page]({{base_path}}/assets/img/guides/authorization/api-authorization/user-consent-for-developer.png){: width="300" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    Click **Allow**. You will now be redirected to the application.

4. You will be able to see the assigned scopes (permissions) on the `allowedScopes` parameter of the authentication response.

    ![Authentication response of the developer group user]({{base_path}}/assets/img/guides/authorization/api-authorization/allowed-scopes-for-developer.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}
