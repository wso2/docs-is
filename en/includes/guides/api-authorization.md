# API authorization

{{ product_name }} allows organizations to authorize user access to an application's API resources based on the application roles assigned to the users.

![The relationship between terms](../assets/img/guides/api-authorization/API-resource-high-level.png){: width="700" style="display: block; margin: 0 auto;"}

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
        <td>Application roles</td>
        <td>Used to map the permissions of the API resource to a persona in the application. An application role is application specific.</td>
    </tr>
    <tr>
        <td>Group</td>
        <td>A collection of users with the same privileges to access resources in an organization. A group is organization specific.</td>
    </tr>
</table>

The relationship between these entities is as follows:

- An API resource has permissions/scopes.
- An application has application roles, and the permissions of the API resource authorized to the application can be assigned to an application role.
- An {{ product_name }} organization has user groups with users assigned to each group, and application roles can be assigned to user groups.

## How it works

Administrators in an organization have the authority to either allow unrestricted access or enforce controlled access to the API resources.

If administrators choose to skip authorization, all application users will be authorized to access the API resources without any limitations.

However, if authorization is mandated for the API resources, the following flow occurs:

1. The user attempts to access an application with controlled access to API resources.
2. {{ product_name }} verifies the user's group assignment.
3. {{ product_name }} retrieves the user's roles by checking the group-to-role mappings.
4. {{ product_name }} evaluates the permissions associated with the user's roles.
5. Based on the assigned permissions, {{ product_name }} grants or denies the user with controlled access to the API resources.

To summarize, {{ product_name }} validates the user's group assignment, determines the roles based on the group-to-role mappings, examines the permissions associated with the roles, and decides whether to permit or restrict the user's access to the API resources.

## Register an API resource
{{ product_name }} allows administrators to register API resources with scopes/permissions.

To register an API resource on {{ product_name }},

1. On the {{ product_name }} Console, go to **API Resources**.
2. Click **+ New API Resource** to register a new API resource.
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
            <td><b>Permission (Scope)</b></td>
            <td>The value that acts as the scope when requesting an access token. This value should be similar to the scope value in your application.</td>
        </tr>
        <tr>
            <td><b>Display Name</b></td>
            <td>A meaningful name for your permission. This will be displayed on your application’s user consent page.</td>
        </tr>
        <tr>
            <td><b>Description</b></td>
            <td>A description for your permission. This will be displayed on your application’s user consent page.</td>
        </tr>
    </table>

5. Click **+ Add Permission**. Note that you can add multiple permissions according to your requirements.

6. Click **Next** and enable **Requires authorization** if the users consuming your API should be authorized before they get access, else you can proceed without an authorization policy.

7. Click **Finish** to complete the API resource registration.


## Authorize the API resources for an app

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
            <td>Select the permissions.</td>
        </tr>
        <tr>
            <td><b>Authorization Policy</b></td>
            <td>Select the authorization policy. If you have selected <b>Requires Authorization</b> when adding the API resource, RBAC will be selected by default, else you have the option to select between <code>Role-Based Access Control (RBAC)</code> and <code>No Authorization Policy</code>.</td>
        </tr>
    </table>

5. Click **Finish**.

    ![Successfully authorized an API resource in the app](../assets/img/guides/api-authorization/authorize-an-api-resource.png){: width="600" style="display: block; margin: 0 auto;"}

## Configure RBAC for API resources
If RBAC is enabled as the authorization policy for the API resource, users accessing the API through an application will have role-based access.

### Define permissions for an API resource
If you didn't specify all the permissions for the API resource when [registering the API resource](#register-an-api-resource), follow the steps given below to add permissions.

1. On the Asgradeo Console, go to **API Resources**.
2. Select the API resource and go to the **Permissions** tab.
3. Click **+ Add Permissions** and enter the following details:
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>Permission (Scope)</b></td>
            <td>The value that acts as the scope when requesting an access token. This value should be similar to the scope value in your application.</td>
        </tr>
        <tr>
            <td><b>Display Name</b></td>
            <td>A meaningful name for your permission. This will be displayed on your application’s user consent page.</td>
        </tr>
        <tr>
            <td><b>Description</b></td>
            <td>A description for your permission. This will be displayed on your application’s user consent page.</td>
        </tr>
    </table>
4. Click **Finish**.

### Create application roles

The permissions of your API resource should be assigned to a role. These roles are application specific.

To create a role and assign permissions to the scope:

1. On the {{ product_name }} Console, go to **Applications**.
2. Select the application to which you wish to authorize the registered API resource and go to **Roles**.
3. Click **+ New Role**.
4. Enter a **Role Name** and click **Next**.
5. Select the permissions you wish to assign for the newly created application role.

    !!! note
        Roles are application-specific but not resource specific. You can add permissions from multiple API resources to a single role.

    ![Map API permissions to the created application role](../assets/img/guides/api-authorization/map-permissions-to-role.png){: width="500" style="display: block; margin: 0 auto;"}

6. Click **Save** to add the new application role.

    ![Create application roles](../assets/img/guides/api-authorization/create-roles.png){: width="600" style="display: block; margin: 0 auto;"}

### Assign roles to groups

You need to assign the created application roles to groups so that the business users belonging to a particular group will have permission to access the application with the scopes assigned.

To assign roles to groups:

1. On the {{ product_name }} Console, go to **Groups**.
2. Select the group to which you wish to assign roles and go to **Roles** tab.
3. Click **+ Assign Roles**.
4. Select the application roles you wish to assign to the group.
5. Click **Save**.

## Try it out

Follow the steps given below to try out the RBAC flow:

!!! note
    Note that we are using {{ product_name }}'s [React sample application](../../get-started/try-samples/qsg-spa-react/) for this scenario.

### Request scopes for the user

To request scopes for the user:

1. Add the new scopes to the configuration file of your SDK. You need to request these new scopes in addition to the OIDC scopes of your application.

    To get the scopes:

    1. On the {{ product_name }} Console, go to **Applications** and select your application.
    2. Copy the scopes listed at the end of the **API Authorization** section.

        ![Additional scopes to access the API resource](../assets/img/guides/api-authorization/additional-scopes.png){: width="700" style="display: block; margin: 0 auto;"}

    !!! tip
        When you add scopes to the configuration file of your SDK, add them as comma-separated values.

2. Access the application URL.
3. Try to log in as a user who has a group and has permissions to access the API resource.

    Upon successful login, you will see the permission/scopes allowed for the user on the user consent page.

    ![Permission of the user shown on the user consent page](../assets/img/guides/api-authorization/user-consent-for-developer.png){: width="400" style="display: block; margin: 0 auto;"}

4. Click **Allow**. You will now be redirected to the application.

    You will be able to see the assigned permissions on the `allowedScopes` parameter of the authentication response.

    ![Authentication response of the developer group user](../assets/img/guides/api-authorization/allowed-scopes-for-developer.png){: width="600" style="display: block; margin: 0 auto;"}

