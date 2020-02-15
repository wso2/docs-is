# Configuring the Primary User Store

This is the main user store that is shared among all the tenants in the
system. Only one user store can be configured as the primary user store.
This documentation explains the process of setting up a primary user
store. If you need more information on WSO2 Carbon user stores, see
[Configuring User Stores](../../setup/configuring-user-stores).

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
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager              </code></td>
    <td>Used to do read-only operations for external LDAP or ActiveDirectory user stores.</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager              </code></td>
    <td>Used for external LDAP user stores to do both read and write operations.This is the default primary user store configuration in the deployment.toml file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager              </code></td>
    <td>Used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager.              </code></td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>               org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager              </code></td>
    <td>Used for JDBC user stores. This is the default primary user store configuration in the deployment.toml file for all WSO2 Servers, except WSO2 Identity Server.</td>
    </tr>
    </tbody>
    </table>

    Or you can configure your own custom user store manager as well
    [Writing a custom user store manager](../../setup/writing-a-custom-user-store-manager)

    !!! tip
        From WSO2 IS 5.10.0 onwards, all userstore managers have **`UniqueID`** prepended before the userstore manager name (e.g., **`UniqueIDJDBCUserStoreManager`**). When you are selecting the userstore manager, it is recommended to use these. 
        
        The userstore managers that donot have **`UniqueID`** as part of the userstore manager name are only available for backward compatibility purposes and can be used if you are migrating from a previous version of WSO2 Identity Server. 

2.  Configure user store manager properties.  
    In the following pages, you can find the information on the
    properties that you need to configure in user store manager types.
    It provides the additional steps and recommendations specific to
    each user store manager.  

    -   [Configuring a JDBC User Store](../../setup/configuring-a-jdbc-user-store)
    -   [Configuring a Read-Only LDAP User Store](../../setup/configuring-a-read-only-ldap-user-store)
    -   [Configuring a Read-Write Active Directory User Store](../../setup/configuring-a-read-write-active-directory-user-store)
    -   [Configuring a Read-Write LDAP User Store](../../setup/configuring-a-read-write-ldap-user-store)

    In `deployment.toml` file, you can configure user store managers by adding the relevant properties.
    But it is important to read each user store configuration
    document to find specific information that you need to follow when
    configuring particular user store.

    !!! warning
        Server system administrator who is capable of all the actions in the
        system is configured within the `deployment.toml`. If you have not
        configured the system administrator yet, see [Configuring the System Administrator](../../setup/configuring-the-system-administrator).
    

3.  Now, restart the server.
