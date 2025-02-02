
{% if product_name == "Asgardeo" and default_roles == true %}

# Asgardeo user roles

Roles assigned to a group or user determine their permissions for accessing resources in the organization. Asgardeo offers several default roles that tailor the Console experience to privileged users. As the organization administrator/owner, you can assign these roles to privileged users according to the requirement.

!!! note

    The roles described here are only for the Asgardeo Console. To learn more about roles that govern access to REST APIs, refer to [manage roles]({{base_path}}/guides/users/manage-roles/).

<table>
  <tr>
    <td><b>Administrator</b></td>
    <td>This role provides all administrative permissions in the organization. An administrator is a privileged user who has overall access to the organization.</td>
  </tr>
  <tr>
    <td><b>Auditor</b></td>
    <td>This role provides list and view permissions to Asgardeo resources. With read-only access to all resources in the Asgardeo Console, it is ideal for troubleshooting issues and supporting other users within the organization.. </td>
  </tr>
  <tr>
    <td><b>Editor - Applications</b></td>
    <td>This role provides permissions for registering and managing applications, ideal for privileged users who can integrate applications with Asgardeo.</td>
  </tr>
  <tr>
    <td><b>Viewer - Applications</b></td>
    <td>This role provides permissions for viewing applications and their settings. It is designed for users who need read-only access to applications and their integration settings.</td>
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

The permissions associated with each role are outlined below. Resources not explicitly specified for a role are inaccessible to users and groups assigned to it.

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

{% else %}

# {{ product_name }} user roles

Roles consist of the permissions that are required by users to access the {{ product_name }} resources such as functions available on the {{ product_name }} Console, REST APIs, etc.

When you assign a role to a user, you are controlling what the user can do in {{ product_name }}.

By default, {{ product_name }} has the **{{ admin_role_name }}** user role. This role includes all administrative permissions in the organization. An organization can have many users with the
{{ admin_role_name }} role. An {{ admin_role_name }} is a privileged user who has overall access to the organization.

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
