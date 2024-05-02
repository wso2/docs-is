# API Authorization with Role Based Access Control (RBAC)

Role Based Access Control (RBAC) in {{product_name}} lets organizations grant limited access to its API resources based on the assigned roles of a user.

{{product_name}} uses the following terms to define various components of API authorization.

<table>
    <tr>
        <th>Term</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>API resources</td>
        <td>Defines an API and its permissions(in the form of scopes). This could be a <a href="#register-a-business-api">business API</a> or a <a href="{{base_path}}/apis/">management/organization API</a> exposed by {{product_name}}.</td>
    </tr>
    <tr>
        <td>Permissions</td>
        <td>Also known as scopes, are the actions an application can perform on the API, on behalf of the user. Applications should request for an authorized token before performing these actions.</td>
    </tr>
    <tr>
        <td>Roles</td>
        <td>Used to group permissions for API resources. In {{product_name}} you can define application roles (for a specific application) and organization roles (for multiple applications).
            See <a href="{{base_path}}/guides/users/manage-roles">manage roles</a> for more information.
    </tr>
    <tr>
        <td>User Groups</td>
        <td>A collection of users with the same privileges.
            See <a href="{{base_path}}/guides/users/manage-groups">manage groups</a> for more information.
        </td>
    </tr>
    <tr>
    <td>IdP Groups</td>
        <td>Groups of an external identity provider connected with the application.
            Learn how to add <a href="{{base_path}}/guides/authentication/#add-groups-to-connections">IdP groups</a> for a connection.
        </td>
    </tr>
</table>

The relationship between these entities is as follows:

- [Management/Organization APIs]({{base_path}}/apis/) and [business APIs](#register-a-business-api) along with their permissions are defined in the form of API resources.
- The administrator,
    1. authorizes an application to consume certain API resources and permissions.
    2. selects the role audience for the application. (This decides whether the application consumes application roles defined specifically for it or organization roles available throughout the organization.)

    3. creates a role that grants some permissions for selected APIs authorized for the application.
    4. collects users who should be granted this role and creates a group.
    5. assigns the group to the role so that members of the group inherit the permissions defined in the role.
    6. optionally, selects external groups that should be assigned to the above role when logging in with an external IdP.
- Users logging into the application can perform limited actions on the selected APIs as defined in the role.

??? note "Sample scenario"

    The following diagram depicts a sample use case of RBAC. </br>

    ![The relationship between terms]({{base_path}}/assets/img/guides/authorization/api-authorization/API-resource-high-level.png){: width="700" style="display: block; margin: 0;"}

    The Library application lets users log in and use its services in the form of a book API to manage books and a user API to manage users. The library application also wants to let users of an external library to log in to the application. The administrator wishes to employ RBAC to protect the application's API resources as follows,

    Roles: </br>
    1. **Reader** and **Writer** are application roles associated with the **Library** application.</br>
    2. **Admin** is an organization role.

    Permissions: </br>
    1. The **Reader** role has **GET** permissions to both **books** API and the **users** API.</br>
    2. The **Writer** role has **GET** and **ADD** permissions to both **books** API and the **users** API.

    Users: </br>
    1. Members of the **Librarian** group are assigned with the **Writer** permissions.</br>
    2. Any other user logging into an application is assigned **Reader** permissions.</br>
    3. The Librarians group in the external IdP are assigned **Writer** permissions.

    When logging into the **Library** application under these conditions, </br>
    1. **John**, a member of the **Librarians** group can **read**, **add** books and **view**, **add** users.</br>
    2. **Bob**, a user can **read** books and **view** users.</br>
    3. Members of the **external Librarian group** can **read**, **add** books and **view**, **add** users.

The following are the steps to follow to enforce RBAC for an API resource.


## Register a business API
Apart from the APIs exposed by {{ product_name }}, administrators can define their own API resources and their scopes as API resources.

To register an API resource,

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
            <td>This value will be used as the <code>aud</code> attribute in the issued JWT token. Although any value is acceptable, it's recommended to use the URI of the API resource.</td>
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
            <td>Defines an action for your API resource. This value should match the scopes defined in your application. (Applications use this scope to request for an access token).</td>
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

6. Click **Next** and enable **Requires authorization** if the users should be authorized to use the API, or you proceed without an authorization policy.

7. Click **Finish** to complete the API resource registration.

## Authorize apps to consume API resources

Applications, by default, do not have authorization to consume APIs. Administrators can authorize applications to use selected APIs so that users logging into the application will have access to that API resource. If an API resource requires authorization, RBAC will be applied before granting access to users.

To authorize an application to consume an API resource:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and go to its **API Authorization** tab.

    !!! warning
        You cannot authorize API resources for a SAML application.

3. Click **Authorize an API Resource**.

4. Enter the following details:
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>API Resource</b></td>
            <td>Select an API resource from the list of business APIs or management/organization APIs</td>
        </tr>
        <tr>
            <td><b>Authorized Scopes</b></td>
            <td>Select the scopes for the API.</td>
        </tr>
        <tr>
            <td><b>Authorization Policy</b></td>
            <td>Management/Organization APIs of {{product_name}} or business APIs with <code>Requires autheorization</code> enabled will default to <code>Role-Based Access Control (RBAC)</code>. Other APIs can alternatively proceed with <code>No Authorization Policy</code>.</td>
        </tr>
    </table>

5. Click **Finish**.

    ![Successfully authorized an API resource in the app]({{base_path}}/assets/img/guides/authorization/api-authorization/authorize-an-api-resource.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Set the role audience for apps

In {{product_name}}, you can create two types of roles.

- **Application roles** - Roles tailored to a specific application. Used to control access to [API resources authorized for the application]({{base_path}}/guides/authorization/api-authorization/api-authorization/#authorize-apps-to-consume-api-resources).

- **Organization roles** - Roles that are available throughout the organization and used to control access to API resources of an organization.

!!! note
    Learn more about roles [Manage roles]({{base_path}}/guides/users/manage-roles).

Applications can either be set to consume application roles or organization roles.

To select the application audience,

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and go to its **Roles** tab.

3. Under **Roles** > **Role Audience**,

    1. If the choice is set to **Application**, all application roles created for the application appear under **Assigned Roles**. Click the **X** icon if you wish to delete an application role. Click **New Role** if you wish to add more roles.

    2. Selecting **Organization** allows applications to consume organization-level APIs.

    !!! warning
        If you switch the role audience to **Organization**, application roles created for the application will be permanently deleted.

## Create roles and assign users

Once the application is [authorized to consume APIs](#authorize-apps-to-consume-api-resources) and its [role audience](#set-the-role-audience-for-apps) is set, administrators can create roles and enforce RBAC policies in the organization.

If the application's role audience is **Application**, create application-specific roles and assign permissions for APIs that the application is authorized to use.

If the application's role audience is **Organization**, any organization role with the relevant permissions can be used to control access to the application.

!!! note
    Learn how to [manage roles]({{base_path}}/guides/users/manage-roles).

## Try it out

Imagine you have an issue management application. For this you employ an issues API that let users perform view, create and delete operations on the issues. In order to enforce RBAC on the issues API, you create the following application roles.</br>
  - **Reporters** can view, create and delete issues.</br>
  - **Reviewers** can only read issues.

Follow the steps below to use the {{product_name}}'s [React sample application]({{base_path}}/get-started/try-samples/qsg-spa-react/) to see this scenario in action.

1. Register the issues API as an API resource with scopes for reading, creating and deleting issues.

2. [Register the issue management application]({{base_path}}/get-started/try-samples/qsg-spa-react/#register-the-app) in {{product_name}} and authorize the application to use the issues API.

    ![Successfully authorized an API resource in the app]({{base_path}}/assets/img/guides/authorization/api-authorization/authorize-an-api-resource.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Set the role audience of the application to **Application** (This is the logical choice if you only have one application using the roles you create).

4. Create application roles for **Reporter** and **Reviewer**. The following shows the permissions for the **Reviewer** role

     ![Reporter permissions]({{base_path}}/assets/img/guides/authorization/api-authorization/reporter-permissions.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. [Create users]({{base_path}}/guides/users/manage-users/#onboard-users) and assign them to each role. For this example, let's say **John** is a reporter and **Jane** is a reviewer.

6. Copy the scopes authorized for the application, [configure the application to request scopes]({{base_path}}/get-started/try-samples/qsg-spa-react/#configure-the-sample) and run it.

7. Access the application URL.

8. Login as **John** (a reporter), you will see the following scopes in his profile.

    ![Reporter permissions]({{base_path}}/assets/img/guides/authorization/api-authorization/john-scopes.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

9. Login as **Jane** (a reviewer), you will see the following scopes in her profile.

    ![Reporter permissions]({{base_path}}/assets/img/guides/authorization/api-authorization/jane-scopes.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
