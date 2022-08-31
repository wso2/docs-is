# Introduction to Roles and Permissions

Roles are groups of users categorized based on the tasks they are expected to perform. In a typical organization, roles can be based on (but not limited to) the department a user works for or the user's designation. Permissions define a targeted set of accesses a user is provided with to perform tasks that are a part of their role. 

## Mapping roles and permissions

Each of these roles has a defined set of permissions associated with them. Users who are assigned to a particular role are authorized to perform activities that align with the permissions of that particular role. Users can be assigned one or many roles. 

WSO2 Identity Server enables role-based access. Simply put, access is granted based on a user's roles rather than each user's individual attributes. This makes it simpler to assign or unassign permissions.

For example, a user who is assigned the role of an HR Manager in an organization, can view the information of all the other employees (i.e., the other users registered in the server) and modify them, while a user who is assigned the role of an Engineer can only view or modify the information specific to them. 

## Assigning roles and permissions to users

A user can be assigned roles or can be removed from a role from time to time based on the permissions they require. These permissions are usually based on their physical job roles in the organization. For example, when an employee who held an Engineer role previously is promoted to a Technical Manager role now, this employee is expected to carry out more managerial activities and is entitled to more information about the other employees in the team. 

So this employee can now be assigned an additional role that has permissions relevant to the new job role along with the previous role. 

The admin can change the permissions associated with a role if necessary and assign or unassign users to a particular role based on the organizational requirements. 


## User role operations
Similar to [users]({{base_path}}/references/concepts/user-management/users), there are several operations that can be performed on user roles. These operations can be performed by the admin using the user management console, or SCIM requests. Following are some of the user role operations. 

- Adding a user role

- Updating role names

- Searching for roles 



!!! info "Related topics" 
    - [Guide: Add a user role]({{base_path}}/guides/identity-lifecycles/add-user-roles)
    - [Guide: Edit or Delete a Role]({{base_path}}/guides/identity-lifecycles/edit-delete-roles)
    - [Guide: Role-based permissions]({{base_path}}/guides/identity-lifecycles/role-based-permissions)
    - [Concept: Users]({{base_path}}/references/concepts/user-management/users)
    - [Concept: Userstores]({{base_path}}/references/concepts/user-management/userstores)
    - [Concept: Realms]({{base_path}}/references/concepts/user-management/realm)


