# Asgardeo user roles

Roles consist of the permissions that are required by users to access the Asgardeo resources such as functions available on the Asgardeo Console, underline REST APIs, etc.

When you assign a role to a user, you are controlling what the user can do in Asgardeo Console.

By default, Asgardeo Console has the following roles:

1. **Administrator**: This role includes all administrative permissions in the organization. An organization can have many users with the administrator role. An administrator is a privileged user who has overall access to the organization.
2. **Auditor**: This role includes list and view permissions to Asgardeo resources, which is useful in troubleshooting issues and providing support for other users in the organization. This role provides users read only access to all the resources in Asgardeo Console.
3. **Editor - Applications**: This role includes the permissions required for registering and managing applications. This admin user is a privileged user who can integrate applications with Asgardeo. 
4. **Viewer - Applications**: This role includes the permissions required for viewing applications and their settings. This admin user is a privileged user who can view the applications, their settings and other read only capabilities required for application integration.
5. **Editor - Users**: This role includes the permissions required for managing users and groups. This admin user is a privileged user who can manage users and groups in the organization.
6. **Viewer - Users**: This role includes the permissions required for viewing users and groups. This admin user is a privileged user who can view the users and groups in the organization.
7. **Editor - Connection**: This role includes the permissions required for managing connections. This admin user is a privileged user who can manage social logins, mfa options and other standard IdPs in the Asgardeo Console.

[Administrators](../../guides/users/manage-administrators/) can be assigned to any of the Asgardeo roles given above.

The following tables list the permissions enabled for roles in the organization.

## Users
<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Auditor</th> 
    <th>Editor - Applications</th> 
    <th>Viewer - Applications</th> 
    <th>Editor - Users</th> 
    <th>Viewer - Users</th> 
    <th>Editor - Connections</th>
  </tr>
  <tr>
    <td>View users</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
  </tr>
  <tr>
      <td>Onboard users</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update user profiles</td>
    <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
  <tr>
      <td>Delete users</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>View groups</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Create groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Update and delete groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>View assigned users to groups</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Assign users to groups</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
    </tr>  
</table>

<br>

## Roles

<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Auditor</th> 
    <th>Editor - Applications</th> 
    <th>Viewer - Applications</th> 
    <th>Editor - Users</th> 
    <th>Viewer - Users</th> 
    <th>Editor - Connections</th>
  </tr>
  <tr>
    <td>Create roles</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
 <tr>
    <td>Delete roles</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
  <tr>
    <td>Update role settings</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
  <tr>
      <td>Onboard users to roles</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
<tr>
      <td>Onboard groups to roles</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
  <tr>
      <td>View roles</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✖️</td>
    </tr>
<tr>
      <td>View users and groups assigned to roles</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✖️</td>
    </tr>
</table>

<br>

## Applications

<table>
  <tr>
     <th>Permission</th>
    <th>Administrator</th> 
    <th>Auditor</th> 
    <th>Editor - Applications</th> 
    <th>Viewer - Applications</th> 
    <th>Editor - Users</th> 
    <th>Viewer - Users</th> 
    <th>Editor - Connections</th>
  </tr>
  <tr>
    <td>View apps and app settings</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
  <tr>
    <td>Register, update and delete apps</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
</table>

<br>

## Connections

<table>
  <tr>
    <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Auditor</th> 
    <th>Editor - Applications</th> 
    <th>Viewer - Applications</th> 
    <th>Editor - Users</th> 
    <th>Viewer - Users</th> 
    <th>Editor - Connections</th>
  </tr>
  </tr>
  <tr>
    <td>View connection and connection settings</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
  </tr>
  <tr>
    <td>Create, update and delete connections</td>
    <td>✔️</td>
    <<td>✖️</td>
    <<td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
    <<td>✔️</td>
  </tr>
</table>

<br>

## Attributes and scopes
<table>
  <tr>
    <th>Permission</th>
    <th>Administrator</th> 
    <th>Auditor</th> 
    <th>Editor - Applications</th> 
    <th>Viewer - Applications</th> 
    <th>Editor - Users</th> 
    <th>Viewer - Users</th> 
    <th>Editor - Connections</th>
  </tr>
  <tr>
    <td>View attributes</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✔️</td>
  </tr>
  <tr>
      <td>Create, update and delete new attributes</td>
      <td>✔️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✖️</td>
      <td>✖️</td>
  </tr>
  <tr>
    <td>View scopes</td>
      <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✔️</td>
</tr>
    <tr>
    <td>Add new attributes to scopes</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
    <td>✖️</td>
    </tr>
    <tr>
      <td>Update and delete scopes</td>
      <td>✔️</td>
    <td>✖️</td>
    <td>✔️</td>
    <td>✖️</td>
    <td>✖️</td>
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
