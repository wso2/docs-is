# Asgardeo user roles

Roles determine permissions for accessing Asgardeo resources such as functionalities in the Asgardeo Console and underline REST APIs.

The following roles, available by default, determine the options available for privileged users in the Asgardeo Console.

!!! note

    The roles described here only govern the options available to the assignee within the Asgardeo Console. To learn more about roles that govern access to REST APIs, refer to [manage roles]({{base_path}}/guides/users/manage-roles/).

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
    <td><b>Editor - Connection</b></td>
    <td>This role provides permissions for managing connections, ideal for a privileged user who can manage enterprise logins, social logins and MFA options available within the organization.</td>
  </tr>
</table>

The following tables elaborate all the permissions enabled for the default roles available for the Asgardeo Console.

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
      <td>✖️</td>
  </tr>
  <tr>
    <td>Update user profiles</td>
      <td>✔️</td>
      <td>✖️</td>
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
      <td>✔️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Create groups</td>
      <td>✔️</td>
      <td>✖️</td>
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
      <td>✔️</td>
      <td>✖️</td>
    </tr>
    <tr>
      <td>Assign users to groups</td>
      <td>✔️</td>
      <td>✖️</td>
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
    <td>✖️</td>
    <td>✖️</td>
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
<br>
