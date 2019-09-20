# User Management Architecture

User management functionality is provided by default in all WSO2
Carbon-based products and is configured in the
`         <PRODUCT_HOME>/repository/conf/user-mgt.xml        ` file. The
following documentation introduces the main concepts in User Management,
such as users, roles, permissions, user stores etc. and how they are
used in WSO2 products.

User management involves defining and managing users, roles, and their
access levels in a system. A user management dashboard or console
provides system administrators with a high-level view of a system's
active user sessions, their log-in statuses, the privileges of each
user, and their activity in the system, enabling system admins to make
business-critical, real-time security decisions. A typical user
management implementation involves a wide range of functionality such as
adding/deleting users, controlling user activity through permissions,
managing user roles, defining authentication policies, managing external
user stores, manual/automatic log-out, and resetting user passwords.

Any user management system has the following basic components:  

-   **Users:** Users are consumers who interact with your organizational
    applications, databases, and other systems. A user can be a person,
    a device, or another application/program within or outside of the
    organization's network. Because users interact with internal systems
    and access data, security-conscious organizations need to
    define which data and functionality each user can access by
    assigning permissions.
-   **Permissions:** A permission is a delegation of authority or a
    right that is assigned to a user or a group of users to perform an
    action on a system. Permissions can be granted to or revoked from a
    user, user group, or user role automatically or by a system
    administrator. For example, if a user has the permission to log in
    to a system, the permission to log out is automatically granted as
    well.
-   **User roles:** A user role is a grouping of permissions. In
    addition to assigning individual permissions to users, admins can
    create user roles and assign those roles to users. For example, you
    might create user roles called VP, Manager, and Employee, each of
    which has a different set of permissions, and then assign those
    roles to users based on their position in the company. Then, if you
    need to modify the permissions of all your managers, you can simply
    modify the Manager user role, and all users with that role will have
    their permissions updated automatically.  

The following diagram illustrates how the user management functionality
is structured to work in WSO2 products:

![user-management](../assets/img/getting-started/user-management.png)

-   **User stores:** A user store is the database where information
    about the users and user roles is stored, including log-in name,
    password, first name, last name, and e-mail address.
-   **RDBMS (for Authentication and Authorization):** This RDBMS stores
    information of the role-based permissions.  

!!! Info
    According to the default configuration in WSO2 products, the
    embedded H2 RDBMS that is shipped with the product is used as the
    user store as well as the RDBMS for storing information related to
    permissions.

-   **Realm configuration:** The user realm consists of the
    configurations required to initialise the user realm. The
    `            user-mgt.xml           ` file stored in the
    `            <PRODUCT_HOME>/repository/conf/           ` directory
    is used as the realm configuration XML. This includes setting up the
    **User Store Manager**, the **Authorization Manager** and the
    **System Administrator**. These configurations are explained
    below.  

    <table>
    <colgroup>
    <col style="width: 30%" />
    <col style="width: 70%" />
    </colgroup>
    <tbody>
    <tr class="odd">
    <td>User Store Manager</td>
    <td><p>The User Store Manager is responsible for managing the underlying user store. It is represented by the <code>                 UserStoreManager                </code> Java interface. There can be different User Store Manager implementations to connect with different user stores, but you can configure only one User Store Manager implementation in a single user realm (that is, a single WSO2 Carbon instance). The User Store Manager can be operated in both read/write mode and read-only mode. In read-only mode, you can only connect with an existing user store. WSO2 products provide the following default User Store Manager implementations:</p>
    <ul>
    <li><code>                  JDBCUserStoreManager                 </code> (read and write)</li>
    <li><code>                  LDAPUserStoreManager                 </code> (read-only)</li>
    <li><code>                  ApacheDSUserStoreManager                 </code> (read and write)</li>
    </ul>
    <p><img src="../assets/img/getting-started/user-store-manager-types.png" title="types of user store managers" alt="types of user store managers" /></p>
    <p>You can write a custom user store manager implementation by implementing <code>                 UserStoreManager                </code> or by extending <code>                 AbstractUserStoreManager                </code> or one of the default implementations.</p>
    <h5 id="UserManagementArchitecture-UsingJDBCUserStoreManager">Using JDBCUserStoreManager</h5>
    <p>The <code>                 JDBCUserStoreManager                </code> class uses a schema that is specific to WSO2 Carbon. It contains the following tables:</p>
    <ul>
    <li>UM_USER: Contains user names and passwords</li>
    <li>UM_ROLE: Contains role names</li>
    <li>UM_USER_ROLE: Contains user role mappings</li>
    <li>UM_USER_ATTRIBUTE: Contains user attributes. There can be any attribute ID and a value for that attribute ID that is associated with a user’s profile.</li>
    </ul>
    <p>You can find the full schema of these tables from the database script files in the <code>                 &lt;PRODUCT_HOME&gt;/dbscripts                </code> directory. Note that these scripts also contain schemas for other tables that are used for user management and registry functions. If your organization contains an existing JDBC user store that you want to use with a WSO2 product, you must extend <code>                 JDBCUserStoreManager                </code> and write a new implementation for your user store according to your schema.</p></td>
    </tr>
    <tr class="even">
    <td>Authorization Manager</td>
    <td>The Authorization Manager uses role-based access control (RBAC) to protect resources related to the WSO2 Carbon platform. The default implementation of the Authorization Manager is <code>                JDBCAuthorizationManager               </code>, which uses a permission model specific to WSO2 Carbon and uses the authorization data that is stored in tables in the JDBC database. You can replace this implementation with a custom implementation (for example, if you want to use a XACML authorization manager) and use it with WSO2 products.</td>
    </tr>
    <tr class="odd">
    <td>System Administrator</td>
    <td>The system admin user is typically the super tenant user, who by default has permission to perform all administration tasks in the server. The admin user will thereby create other tenant users and define roles with permissions. Once this is done, the other tenant users will be able to log in to their respective tenant domains and use the server according to the permissions that have been granted. Note that the permissions granted to the Super Tenant user cannot be modified.</td>
    </tr>
    </tbody>
    </table>

#### Related Topics

-   [Configuring the Realm](../../learn/configuring-the-realm) : The topics in
    this section explain how you can set up and configure the user
    management realm.
-   [Configuring Users, Roles and
    Permissions](../../learn/configuring-users-roles-and-permissions) : The topics
    in this section explain how you can manage the Users, Roles and
    Permissions using the management console.
-   [Engaging a Workflow in an
    Operation](../../learn/engaging-a-workflow-in-an-operation) : This topic
    explains how to engage workflows for user-related operations.
