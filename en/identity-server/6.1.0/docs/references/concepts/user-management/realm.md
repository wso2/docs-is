# Introduction to Realms

The complete functionality and contents of the user management module are called a **user realm**. The realm includes the user management
classes, configurations, and userstores that store information. Configuring the user management functionality in WSO2 Identity Server involves setting up the relevant userstores and updating the relevant configuration files.

---

## Configure the authorization manager

According to the default configuration in WSO2 Identity Server (WSO2 IS), the users, roles and permissions are stored in the same userstore (i.e., the default, embedded H2 database). However, H2 database is not recommended in production and can be changed later on.
The configuration can also be changed in such a way that the users and roles are stored in one userstore and the permissions that are common to all these userstores are stored in a separate userstore. A userstore can be a typical RDBMS, an LDAP, or an external Active Directory. See [userstores]({{base_path}}/references/concepts/user-management/userstores) for more information about the different types of userstores. 

An authorization manager is configured in WSO2 IS to manage role-based permissions of users. First, a database is set up to store permissions. Once this is done, user realm configurations are updated in the `deployment.toml` file. User realm configurations include two areas. 

- Establishing a connection between the database in which the permissions are stored and the database in which the users and roles are stored
- Configuring properties that determine the permissions of the authorization manager

<!-- See [Configuring Realms](TO-DO: insert-guides-link) for more information about configuring realms. -->

---

## Configure the system administrator

The **admin** user is the super tenant that will be able to manage all other users, roles and permissions in the system. Therefore, the user that should have admin
permissions is required to be stored in the primary userstore when the system for the first time. There are certain configurations to set up a user as a system administrator in the primary userstore. Refer [Configure the authorization manager](#configure-the-authorization-manager) for more information on how to do this. 

!!! note
    If the primary userstore is read-only, a user ID and role that already exists in the userstore will be used for the administrator. If
    the userstore is read/write, an admin user can be newly created in the userstore. By default, the embedded H2 database (with read/write enabled) is used for both these purposes in WSO2 Identity Server.
    

Note the following key facts about the system administrator in your system:

-   The admin user and role is always stored in the primary userstore
    in your system.
-   An administrator is configured for your system by default. This
    **admin** user is assigned to the **admin** role, which has all
    permissions enabled.
-   The permissions assigned to the default **admin** role cannot be
    modified.

---

## Configure userstores

Userstores are used to store all the users, roles, and permissions within our realm. The different types of userstores and how they can be configured to store the users and roles are explained in the [userstores]({{base_path}}/references/concepts/user-management/userstores) section. 

!!! info "Related topics" 
    
    - [Guide: Manage Users]({{base_path}}/guides/identity-lifecycles/manage-user-overview)
    - [Guide: Manage Roles]({{base_path}}/guides/identity-lifecycles/manage-roles-overview)
    - [Deploy: Configure Userstores]({{base_path}}/deploy/configure-user-stores/)
    - [Guide: Configuring Realms]({{base_path}}/references/concepts/user-management/realm)
    - [Concept: Users]({{base_path}}/references/concepts/user-management/users)
    - [Concept: Roles and permissions]({{base_path}}/references/concepts/user-management/roles-and-permissions)
    - [Concept: Userstores]({{base_path}}/references/concepts/user-management/userstores)
