# Introduction to Realms

The complete functionality and contents of the User Management module is called a **user realm**. The realm includes the user management
classes, configurations and repositories that store information. Configuring the User Management functionality in WSO2 Identity Server involves setting up the relevant repositories and updating the relevant configuration files.

---

## Configuring the authorization manager

According to the default configuration in WSO2 Identity Server, the users, roles and permissions are stored in the same repository (i.e., the default, embedded H2 database). However, this configuration can be changed in such a way that the users and roles are stored in one repository (userstore) and the permissions are stored in a separate
repository. A userstore can be a typical RDBMS, an LDAP or an external Active Directory. The different types of userstores will be discussed in the [userstores](../userstores) section. 

---

## Configuring the system administrator

The **admin** user is the super tenant that will be able to manage all other users, roles and permissions in the system. Therefore, the user that should have admin
permissions is required to be stored in the primary userstore when the system for the first time. There are certain configurations to set up a user as a system administrator in the primary userstore. Refer []() for more information on how to do this. 

!!! note
    If the primary user store is read-only, a user ID and role that already exists in the user store will be used for the administrator. If
    the userstore is read/write, an administrator user can be newly created in the userstore. By default, the embedded H2 database (with read/write enabled) is used for both these purposes in WSO2 Identity Server.
    

Note the following key facts about the system administrator in your system:

-   The admin user and role is always stored in the primary userstore
    in your system.
-   An administrator is configured for your system by default. This
    **admin** user is assigned to the **admin** role, which has all
    permissions enabled.
-   The permissions assigned to the default **admin** role cannot be
    modified.

---

## Configuring userstores

Userstores are used to store all the users, roles, and permissions within our realm. The different types of userstores and how they can be configured to store the users and roles are explained in the [userstores](../userstores) section. 

--- 

!!! info "Related Topics" 
    
    - [Guide: Manage Users](../../../guides/identity-lifecycles/manage-user-overview)
    - [Guide: Manage Roles](../../../guides/identity-lifecycle/manage-roles-overview)
    - [Guide: Manage Userstores](TO-DO: insert-guides-lnk)
    - [Guide: Configuring Realms](TO-DO- insert-guides-link)
    - [Concept: Users](../users)
    - [Concept: Roles and permissions](../roles-and-permissions)
    - [Concept: Userstores](../userstores)
