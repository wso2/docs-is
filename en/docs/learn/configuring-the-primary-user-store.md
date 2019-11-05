# Configuring the Primary User Store

This is the main user store that is shared among all the tenants in the
system. Only one user store can be configured as the primary user store.
This documentation explains the process of setting up a primary user
store. If you need more information on WSO2 Carbon user stores, see
[Configuring User Stores](../../learn/configuring-user-stores).

!!! info 
    By default, the embedded H2 database (JDBC) that is shipped with WSO2
    products is configured as the primary user store, except for WSO2
    Identity Server, which has an embedded LDAP as its primary user store.
    It is recommended to change this default configuration in the production
    system.

## Setting up the Primary User Store

Configure the primary userstore in the
`         <IS_HOME>/repository/conf/deployment.toml        ` file.

There are two steps involved in setting up the primary user store:

1.  Select the User store manager that suits your user store.  
    The following table lists the available User store manager
    implementations and their usage:

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
    <td><code>               org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager              </code></td>
    <td>Used to do read-only operations for external LDAP or ActiveDirectory user stores.</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>               org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager              </code></td>
    <td>Used for external LDAP user stores to do both read and write operations.This is the default primary user store configuration in the deployment.toml file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>               org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager              </code></td>
    <td>Used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>               org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager.              </code></td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>               org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager              </code></td>
    <td>Used for JDBC user stores. This is the default primary user store configuration in the deployment.toml file for all WSO2 Servers, except WSO2 Identity Server.</td>
    </tr>
    </tbody>
    </table>

    Or you can configure your own custom user store manager as well
    [Writing a custom user store manager](../../learn/writing-a-custom-user-store-manager)

2.  Configure user store manager properties.  
    In the following pages, you can find the information on the
    properties that you need to configure in user store manager types.
    It provides the additional steps and recommendations specific to
    each user store manager.  

    -   [Configuring a JDBC User Store](../../learn/configuring-a-jdbc-user-store)
    -   [Configuring a Read-Only LDAP User Store](../../learn/configuring-a-read-only-ldap-user-store)
    -   [Configuring a Read-Write Active Directory User Store](../../learn/configuring-a-read-write-active-directory-user-store)
    -   [Configuring a Read-Write LDAP User Store](../../learn/configuring-a-read-write-ldap-user-store)

    In `deployment.toml` file, you can configure user store managers by adding the relevant properties.
    But it is important to read each user store configuration
    document to find specific information that you need to follow when
    configuring particular user store.

    !!! info 
        This is only applicable to the WSO2 Identity Server. Once you
        configure the primary user store, make sure you disable the default
        embedded user store from the system. To do this, open
        `            <IS_HOME>/repository/conf/identity/embedded-ldap.xml           `
        file and make the following change to the enable property.

        ``` xml
        <EmbeddedLDAP>
            <Property name="enable">false</Property>
            .......................
        </EmbeddedLDAP>
        ```

    !!! warning
        Server system administrator who is capable of all the actions in the
        system is configured within the `deployment.toml`. If you have not
        configured the system administrator yet, see [Configuring the System Administrator](../../learn/configuring-the-system-administrator).
    

3.  Now, restart the server.
