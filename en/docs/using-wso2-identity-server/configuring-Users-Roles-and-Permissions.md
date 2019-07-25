# Configuring Users, Roles and Permissions

WSO2 Identity Server supports the role-based authentication model where
privileges of a user are based on roles attached.

A user is associated with one or more roles (generally specified upon
user creation), and each role is associated with zero or more
permissions (also generally specified upon role creation). Therefore,
the set of permissions owned by a user is determined by the roles
assigned to that user. If a user has several assigned roles, their
permissions are added togethe r.

Before you begin

The following items are things to note before you begin.

-   Only system administrators can add, modify and remove users and
    roles. To set up administrators, see [Configuring the System
    Administrator](_Configuring_the_System_Administrator_).  
      

-   Your product has a primary user store where the users/roles that you
    create using the management console are stored by default. It's
    default `            RegEx           ` configurations are as
    follows. `            RegEx           ` configurations ensure that
    parameters like the length of a user name/password meet the
    requirements of the user store.

    ``` java
    PasswordJavaRegEx------------ ^[\S]{5,30}$
    PasswordJavaScriptRegEx-----  ^[\S]{5,30}$
    UsernameJavaRegEx------------ [a-zA-Z0-9._-|//]{3,30}$
    UsernameJavaScriptRegEx-----  ^[\S]{3,30}$
    RolenameJavaRegEx------------  [a-zA-Z0-9._-|//]{3,30}$
    RolenameJavaScriptRegEx-----  ^[\S]{3,30}$
    ```

    When creating users/roles, if you enter a username, password etc.
    that does not conform to the `            RegEx           `
    configurations, the system throws an exception. You can either
    change the `            RegEx           ` configuration or enter
    values that conform to the `            RegEx           ` . If you
    [change the default user
    store](_Configuring_the_Primary_User_Store_) or [set up a secondary
    user store](_Configuring_Secondary_User_Stores_), configure the
    `            RegEx           ` accordingly under the user store
    manager configurations in
    `            <IS_HOME>/repository/conf/user-mgt.xml           `
    file.  
      

-   The permission model of WSO2 Identity Server is hierarchical.
    Permissions can be assigned to a role in a fine-grained or a
    coarse-grained manner.

    **Coarse-grained permissions** define large sub components such as
    'Application Management'. Using coarse-grained permissions you can
    assign permissions to roles based on these large sub components.

    **Fine-grained permissions** control access to smaller sub
    components or sub tasks of the component such as 'create
    application', 'delete application' etc.

    WSO2 Carbon maintains roles and permissions in the Carbon database,
    but it can also read users/roles from the configured User Store.

**Related topics**

For detailed information on configuring users, roles, and permissions,
see the following topics.

-   [Configuring Users](_Configuring_Users_)
-   [Configuring Roles and
    Permissions](_Configuring_Roles_and_Permissions_)
-   [Using Workflows with User
    Management](_Using_Workflows_with_User_Management_)

You can also see the following pages for system administrator related
configurations:

-   See [Configuring User Stores](_Configuring_User_Stores_) for
    instructions on how to configure primary and secondary user stores.
