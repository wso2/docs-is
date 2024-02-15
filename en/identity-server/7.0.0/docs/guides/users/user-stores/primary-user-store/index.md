# Configure the Primary User store

This is the main user store that is used in the
system. Only one user store can be configured as the primary user store.
This documentation explains the process of setting up a primary user
store. If you need more information on WSO2 Carbon user stores, see
[Manage user stores]({{base_path}}/guides/users/user-stores/).

!!! note 
    WSO2 Identity Server uses the embedded H2 database as its primary user store.
    It is recommended to change this default configuration in the production system.

## Set up the primary user store

Configure the primary user store in the
`<IS_HOME>/repository/conf/deployment.toml` file.

There are two steps involved in setting up the primary user store:

1.  Select the user store manager that suits your user store.  
    The following table lists the available user store manager
    implementations and their usage.

    <table>
    <colgroup>
    <col style="width: 10%" />
    <col style="width: 40%" />
    <col style="width: 48%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>User store</th>
    <th>User store manager class</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>LDAP ActiveDirectory</p></td>
    <td><code>org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager</code></td>
    <td>Used to do read-only operations for LDAP or ActiveDirectory user stores</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager</code></td>
    <td>Used for LDAP user stores to do both read and write operations. This is the default primary user store configuration in the <code>deployment.toml</code> file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager</code></td>
    <td>This is used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager</code>.
    </td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager</code></td>
    <td>This is used for JDBC user stores.</td>
    </tr>
    </tbody>
    </table>

    You can configure your own custom user store manager. For more information, see [Write a custom user store manager]({{base_path}}/references/extend/user-stores/write-a-custom-user-store-manager).

2.  Configure user store manager properties.

    In the `deployment.toml` file, you can configure the user store manager by adding the relevant properties of the seleted user store manager type.

    Refer [properties used in user store managers]({{base_path}}/guides/users/user-stores/user-store-properties) for the complete list of user store configurations and properties.
    You can configure them as follows by adding to `<IS-HOME>/repository/conf/deployment.toml`.
    ``` toml
    [user_store]
    <Property-Name> = <Property-Value>
    ```
    For example:
    ``` toml
    [user_store]
    read_groups = true
    ```

    Following pages will guide you to change the primary user store to one of the available user store manager types.

    -   [Configure a JDBC user store]({{base_path}}/guides/users/user-stores/primary-user-store/configure-a-jdbc-user-store)
    -   [Configure a read-only LDAP user store]({{base_path}}/guides/users/user-stores/primary-user-store/configure-a-read-only-ldap-user-store)
    -   [Configure a read-Write Active Directory user store]({{base_path}}/guides/users/user-stores/primary-user-store/configure-a-read-write-active-directory-user-store/)
    -   [Configure a read-write LDAP user store]({{base_path}}/guides/users/user-stores/primary-user-store/configure-a-read-write-ldap-user-store/)

    !!! warning
        Server system administrator who is capable of all the actions in the
        system is configured within the `deployment.toml` file. If you have not
        configured the system administrator yet, see [Configure the System Administrator]({{base_path}}/deploy/configure/user-stores/configure-system-administrator).

3.  Restart the server.
