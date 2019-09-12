# Configuring Users, Roles and Permissions

WSO2 Identity Server supports the role-based authentication model where
privileges of a user are based on roles attached.

A user is associated with one or more roles (generally specified upon
user creation), and each role is associated with zero or more
permissions (also generally specified upon role creation). Therefore,
the set of permissions owned by a user is determined by the roles
assigned to that user. If a user has several assigned roles, their
permissions are added together.

!!! note "Before you begin"

    The following items are things to note before you begin.

    -   Only system administrators can add, modify and remove users and
        roles. To set up administrators, see [Configuring the System
        Administrator](../../using-wso2-identity-server/configuring-the-system-administrator).  
        

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
        store](../../using-wso2-identity-server/configuring-the-primary-user-store) or [set up a secondary
        user store](../../using-wso2-identity-server/configuring-secondary-user-stores), configure the
        `            RegEx           ` accordingly under the user store
        manager configurations in the
        `            <IS_HOME>/repository/conf/deployment.toml          `
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

!!! info "Related topics"

    For detailed information on configuring users, roles, and permissions,
    see the following topics.

    -   [Configuring Users](../../using-wso2-identity-server/configuring-users)
    -   [Configuring Roles and
        Permissions](../../using-wso2-identity-server/configuring-roles-and-permissions)
    -   [Using Workflows with User
        Management](../../using-wso2-identity-server/using-workflows-with-user-management)
    You can also see the following pages for system administrator related
    configurations:

    -   See [Configuring User Stores](../../using-wso2-identity-server/configuring-user-stores) for
        instructions on how to configure primary and secondary user stores.
