# Roles and Permissions

User management enables role-based access. Roles contain permissions for users to manage the server. Users can be assigned one or many roles. 

Each of these roles have a defined set of permissions associated with them. Users who are assigned to a particular role are authorized to perform activities that align with the permissions of that particular role. 

For example, a user who is assigned the role of an HR Manager in an organization, can view the information of all the other employees (i.e., the other users registered in the server) and modify them, while a user who is assigned the role of an Engineer can only view or modify the information specific to them. 

Similar to [users](../users), there are several operations that can be performed on user roles. These operations can be performed by the admin using the user management console, SCIM requests, or SOAP APIs. Following are some of the user role operations. 

- Adding a user role

- Updating role names

- Searching for roles 

A user can be assigned roles or can be removed from a role from time to time based on the permissions they require. These permissions are usually based on their physical job roles in the organization. For example, when an employee who held an Engineer role previously is promoted to a Technical Manager role now, this employee is expected to carry out more managerial activities and is entitled to more information about the other employees in the team. 

So this employee can now be assigned an additional role which has permissions relevant to the new job role along with the previous role. 

The admin can change the permissions associated with a role if necessary and assign or unassign users to a particular role based on the organizational requirements. 


!!! info "Related Topics" 
    - [Guide: Add a user role](../../../guides/identity-lifecycles/add-user-roles)
    - [Guide: Edit or Delete a Role](../../../guides/identity-lifecycles/edit-delete-roles)
    - [Guide: Role-based permissions](../../../guides/identity-lifecycles/role-based-permissions)
    - [Concept: Users](../users)
    - [Concept: Userstores](../userstores)
    - [Concept: Realms](../realm)


