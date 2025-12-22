
{% if product_name == "Asgardeo" and default_roles == true %}

# Asgardeo user roles

Roles assigned to a group or user determine their permissions for accessing resources in the organization. Asgardeo offers set of default roles that tailor the Console experience to privileged users. As the organization administrator/owner, you can assign these roles to privileged users.

!!! note

    The roles described here are only for the Asgardeo Console. To learn more about roles that govern access to REST APIs, refer to [manage roles]({{base_path}}/guides/users/manage-roles/).

<table>
  <tr>
    <td><b>Administrator</b></td>
    <td>This role provides all administrative permissions in the organization. An administrator is a privileged user who has full access to the organization.</td>
  </tr>
  <tr>
    <td><b>Auditor</b></td>
    <td>This role provides list and view permissions to Asgardeo resources. With read-only access to all resources in the Asgardeo Console, it's ideal for troubleshooting issues and supporting other users within the organization.. </td>
  </tr>
  <tr>
    <td><b>Editor - Applications</b></td>
    <td>This role provides permissions for registering and managing applications, ideal for privileged users who can integrate applications with Asgardeo.</td>
  </tr>
  <tr>
    <td><b>Viewer - Applications</b></td>
    <td>This role provides permissions for viewing applications and their settings. Users with this role get read-only access to applications and their integration settings.</td>
  </tr>
  <tr>
    <td><b>Editor - Users</b></td>
    <td>This role provides permissions for managing users and groups within the organization.</td>
  </tr>
  <tr>
    <td><b>Viewer - Users</b></td>
    <td>This role provides permissions required for viewing users and groups.</td>
  </tr>
  <tr>
    <td><b>Editor - Connections</b></td>
    <td>This role provides permissions for managing connections, ideal for a privileged user who can manage enterprise logins, social logins and MFA options available within the organization.</td>
  </tr>
</table>

The following sections outline the permissions for each role. Resources not explicitly specified for a role remain inaccessible to users and groups assigned to it.

??? example "Administrator"

    Administrator has read/write access to all the resources in the Asgardeo Console.

??? example "Auditor"

    Auditor has read-only access to all the resources in the Asgardeo Console.

??? example "Editor - Applications"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
      <tr>
        <td>Applications</td>
        <td>️</td>
        <td>✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Connections</td>
        <td>️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>API Resources</td>
        <td>️</td>
        <td>✔</td>
        <td></td>
      </tr>
      <tr>
        <td>Branding</td>
        <td>️</td>
        <td>✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Users️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Groups️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Roles</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Role Assignments</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>User Attributes & Stores</td>
        <td>Attributes</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>User Attributes & Stores</td>
        <td>Attributes &gt; Scopes </td>
        <td>️️✔</td>
        <td></td>
      </tr>
      <tr>
        <td>Organizations</td>
        <td>️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Login & Registration</td>
        <td>️</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Actions</td>
        <td>️</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Events</td>
        <td>️</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Logs</td>
        <td>️Diagnostic logs</td>
        <td></td>
        <td>️✔</td>
      </tr>
    </table>

??? example "Viewer - Applications"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
      <tr>
        <td>Applications</td>
        <td>️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
          <td>Connections</td>
          <td>️</td>
          <td>️</td>
          <td>✔</td>
      </tr>
      <tr>
        <td>API Resources</td>
          <td>️</td>
          <td>️</td>
          <td>✔</td>
      </tr>
      <tr>
        <td>Branding</td>
        <td>️</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Users️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Groups️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Roles</td>
        <td></td>
        <td>️️✔</td>
      </tr>
      <tr>
        <td>User Attributes & Stores</td>
        <td>Attributes</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>User Attributes & Stores</td>
        <td>Attributes &gt; Scopes </td>
        <td>️️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Organizations</td>
        <td>️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Login & Registration</td>
        <td>️</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>Actions</td>
        <td>️</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>Events</td>
        <td>️</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>Logs</td>
        <td>️Diagnostic logs</td>
        <td></td>
        <td>️✔</td>
      </tr>
    </table>

??? example "Editor - Users"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
        <tr>
          <td>User Management</td>
          <td>Users️</td>
          <td>️✔</td>
          <td>️</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td>Groups️</td>
          <td>✔</td>
          <td>️</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td>Roles</td>
          <td>️✔</td>
          <td>️</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td>Role Assignments</td>
          <td>️✔</td>
          <td>️</td>
        </tr>
    </table>

??? example "Viewer - Users"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
        <tr>
          <td>User Management</td>
          <td>Users️</td>
          <td></td>
          <td>️️✔</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td>Groups️</td>
          <td></td>
          <td>️️✔</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td>Roles</td>
          <td>️</td>
          <td>️️✔</td>
        </tr>
    </table>

??? example "Editor - Connections"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
        <tr>
          <td>Connections</td>
          <td></td>
          <td>✔</td>
          <td>️️</td>
        </tr>
        <tr>
          <td>User Attributes & Stores</td>
          <td>Attributes</td>
          <td></td>
          <td>️️✔</td>
        </tr>
    </table>

## ⚠️ Change in Role Permissions

Effective **October 2, 2025 at 00:00 UTC**, permissions of the **Editor - Users** and **Editor - Applications** will change as follows:

- **Editor - Users**: No longer able to edit role metadata or change permissions.  
- **Editor - Applications**: No longer able to assign roles to users or groups.

This change ensures that roles follow the principle of least privilege, granting only the permissions necessary to perform their tasks.

In line with the updated permissions,

- Make sure to assign tasks only to users who have the necessary permissions.

- If a user affected by this change needs the lost permissions, you can assign a different role to that user. When doing so, review all permissions in that role before making the assignment.
  
The updated permissions will be as follows.

??? example "Editor - Applications"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
      <tr>
        <td>Applications</td>
        <td>️</td>
        <td>✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Connections</td>
        <td>️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>API Resources</td>
        <td>️</td>
        <td>✔</td>
        <td></td>
      </tr>
      <tr>
        <td>Branding</td>
        <td>️</td>
        <td>✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Users️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>Groups️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><b>User Management</b></td>
        <td><b>Roles</b></td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td><b>User Management</b></td>
        <td><b>Role Assignments</b></td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>User Attributes & Stores</td>
        <td>Attributes</td>
        <td>️</td>
        <td>️✔</td>
      </tr>
      <tr>
        <td>User Attributes & Stores</td>
        <td>Attributes &gt; Scopes </td>
        <td>️️✔</td>
        <td></td>
      </tr>
      <tr>
        <td>Organizations</td>
        <td>️</td>
        <td>️</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Login & Registration</td>
        <td>️</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Actions</td>
        <td>️</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Events</td>
        <td>️</td>
        <td>️✔</td>
        <td>️</td>
      </tr>
      <tr>
        <td>Logs</td>
        <td>️Diagnostic logs</td>
        <td></td>
        <td>️✔</td>
      </tr>
    </table>

??? example "Editor - Users"

    <table>
      <tr>
        <th>Resources</th>
        <th>Sub-section</th> 
        <th>Read/Write access</th> 
        <th>Read access only</th>
      </tr>
        <tr>
          <td>User Management</td>
          <td>Users️</td>
          <td>️✔</td>
          <td>️</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td>Groups️</td>
          <td>✔</td>
          <td>️</td>
        </tr>
        <tr>
          <td><b>User Management</b></td>
          <td><b>Roles</b></td>
          <td>️✔</td>
          <td>️</td>
        </tr>
        <tr>
          <td><b>User Management</b></td>
          <td><b>Role Assignments</b></td>
          <td>️</td>
          <td>️✔</td>
        </tr>
    </table>

{% else %}

# {{ product_name }} user roles

Roles define the permissions where users need to access {{ product_name }} resources such as functions available on the {{ product_name }} Console, REST APIs, etc.

When you assign a role to a user, you are controlling what the user can do in {{ product_name }}.

By default, {{ product_name }} has the **{{ admin_role_name }}** user role. This role includes all administrative permissions in the organization. An organization can have many users with the
{{ admin_role_name }} role. An {{ admin_role_name }} is a privileged user who has full access to the organization.

<!-- 2. **Application developer**: This role includes the permissions required for registering and managing applications. The application developer is a privileged user who can integrate applications with {{ product_name }}. 

3. **Administrative auditor**: This role includes list and view permissions to {{ product_name }} resources, which is useful in troubleshooting issues and providing support for other users in the organization. This role provides users read only access to the organization.

Only [Administrators]({{base_path}}/guides/users/manage-administrators/) can be assigned to {{ product_name }} roles, and an administrator can be assigned only with one role.

The following tables list the permissions enabled for roles in the organization. -->
The following list contains the permissions enabled for an {{ admin_role_name }}:

## User management

- View users
- Onboard users
- Update user profiles
- Delete users
- Terminate sessions
- View groups
- Create groups
- Update and delete groups
- View assigned users to groups
- Assign users to groups
- View roles
- Create roles
- Update and delete roles
- Assign users to roles
- Assign groups to roles

## Application management

- View apps and app settings
- Register apps
- Update and delete apps
- Update Sign-in methods
- Update protocol settings

## Connections management

- View connections and connection settings
- Create new connection
- Update and delete connections

## Organization management

- Create new organizations
- View all the organizations created
- As the organization creator, update and delete organizations that you created
- Switch to the organizations that you created
- Share applications from the organization (root) to its organizations

## Managing attributes and scopes

- View attributes
- Create new attributes
- Update and delete attributes
- View scopes
- Add new attributes to scopes
- Update and delete scopes

## Managing organization settings

- View account recovery scenario and settings
- Configure account recovery scenarios
- View self registration related settings
- Configure self registration for users
- View account security related settings and configurations
- Configure account security related settings

<!--
## Users
<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Application developer</th> 
    <th>Administrative auditor</th> 
  </tr>
  <tr>
    <td>View users</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
  </tr>
  <tr>
      <td>Onboard users</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update user profiles</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
  <tr>
      <td>Delete users</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Terminate user session</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>View groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Create groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Update and delete groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>View assigned users to groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Assign users to groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>  
</table>

<br>

## Applications

<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Application developer</th>
    <th>Administrative auditor</th>
  </tr>
  <tr>
    <td>View apps and app settings</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
      <td>Register apps</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update and delete apps</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
  </tr>
  <tr>
      <td>Update Sign-in methods</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update protocol settings</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
  </tr>
</table>

<br>

## Connections

<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Application developer</th>
     <th>Administrative auditor</th>  
  </tr>
  <tr>
    <td>View connection and connection settings</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
      <td>Create new connection</td>
      <td>✔️</td>
      <td>✔️
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update and delete connections</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
  </tr>
</table>

<br>

## Attributes and scopes
<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Application developer</th> 
     <th>Administrative auditor</th> 
  </tr>
  <tr>
    <td>View attributes</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
  </tr>
  <tr>
      <td>Create new attributes</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update and delete attributes</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
  <tr>
      <td>View scopes</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
    </tr>
    <tr>
        <td>Add new attributes to scopes</td>
        <td>✔️</td>
        <td>✖️</td>
        <td>✖️</td>
    </tr>
    <tr>
      <td>Update and delete scopes</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
</table>

## Organization settings
<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Application developer</th> 
    <th>Administrative auditor</th> 
  </tr>
    <tr>
          <td>View account recovery scenarios ad settings</td>
          <td>✔️</td>
          <td>✖️</td>
          <td>✔️</td>
    </tr>
    <tr>
      <td>Configure account recovery scenarios</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
          <td>View self registration related settings</td>
          <td>✔️</td>
          <td>✖️</td>
          <td>✔️</td>
    </tr>   
    <tr>
      <td>Configure self registration for users</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr> 
     <tr>
          <td>View account security related settings and configurations</td>
          <td>✔️</td>
          <td>✖️</td>
          <td>✔️</td>
    </tr>   
    <tr>
      <td>Configure account security related settings</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr> 
</table> -->
<br>

{% endif %}

{% if product_name == "Asgardeo" or is_version >= "7.0.0" %}

## Create custom console roles

{{ product_name }} allows you to create custom roles with specific permissions to tailor the Console experience to privileged users in your organization.

Follow the steps below to configure a custom console role in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Console Settings** > **Roles**.
2. Click on **New Role** and provide the following details:

    - **Role Name**: Provide a name for the role.
    - **Permissions**: Select the required permissions for the role.

    !!! note
        You can select either **View** or **Edit** permission for each resource. Selecting **Edit** will automatically inherit the **View** permission for that resource.

    ![role-wizard]({{base_path}}/assets/img/references/user-management/custom-console-role-create-wizard.png){: width="650" style="display: block; margin: 0; border: 0px;"}
3. Click **Add** to create the custom role.

### Assign users to console role

You can assign users to the roles from,

1. On the **Console Settings** > **Administrators** tab, click **Add Administrator** select the user and the role to assign.
   ![assign-role-from-administrator]({{base_path}}/assets/img/references/user-management/assign-console-role-from-administrator-tab.png){: width="650" style="display: block; margin: 0; border: 0px;"}
2. On the **Console Settings** > **Roles** tab, click on the role you want to assign. In the **Role Settings** page, go to the **Users** tab and click **Assign User** to assign users to the role.
   ![assign-role-from-roles]({{base_path}}/assets/img/references/user-management/assign-console-role-from-roles-tab.png){: width="650" style="display: block; margin: 0; border: 0px;"}

{% if product_name == "Asgardeo" %}
!!! note
    To assign users within the organization, enable the **Enable users to manage the organization** from **Console Settings** > **Administrators** tab by clicking on the **Settings** icon.
{% endif %}

### Try it out

1. Copy the console url from **Console Settings** page.
2. Share it with the users assigned to the console role to log in to the {{ product_name }} Console with the assigned role with specific permissions.

{% endif %}
