# Configure the Primary Userstore

This is the main userstore that is shared among all the tenants in the
system. Only one userstore can be configured as the primary userstore.
This documentation explains the process of setting up a primary user
store. If you need more information on WSO2 Carbon userstores, see
[Configure userstores]({{base_path}}/deploy/configure-user-stores).

!!! info 
    WSO2 Identity Server uses the embedded H2 database as its primary user store.
    It is recommended to change this default configuration in the production system.

---

## Set up the primary userstore

Configure the primary userstore in the
`         <IS_HOME>/repository/conf/deployment.toml        ` file.

There are two steps involved in setting up the primary userstore:

1.  Select the userstore manager that suits your userstore.  
    The following table lists the available userstore manager
    implementations and their usage.

    <table>
    <colgroup>
    <col style="width: 10%" />
    <col style="width: 40%" />
    <col style="width: 48%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>userstore</th>
    <th>userstore manager class</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>LDAP ActiveDirectory</p></td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager              </code></td>
    <td>Used to do read-only operations for LDAP or ActiveDirectory userstores</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager              </code></td>
    <td>Used for LDAP user stores to do both read and write operations. This is the default primary user store configuration in the <code>deployment.toml</code> file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager              </code></td>
    <td>This is used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager.              </code></td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>               org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager              </code></td>
    <td>This is used for JDBC userstores.</td>
    </tr>
    </tbody>
    </table>

    You can configure your own custom userstore manager. For more information, see [Write a custom userstore manager]({{base_path}}/deploy/write-a-custom-user-store-manager)

    !!! tip
        From WSO2 IS 5.10.0 onwards, all userstore managers have `UniqueID` included as part of the userstore manager name (e.g.,`UniqueIDJDBCUserStoreManager`). Use one of these when selecting the userstore manager. 
        
        The userstore managers that do not have `UniqueID` as part of the userstore manager name are **only** available for backward compatibility purposes and can only be used if you are migrating from a previous version of WSO2 Identity Server. 

2.  Configure userstore manager properties.  
    In the following pages, you can find the information on the
    properties that you need to configure for different userstore manager types.
    It provides the additional steps and recommendations specific to
    each userstore manager.  

    -   [Configure a JDBC userstore]({{base_path}}/deploy/configure-a-jdbc-user-store)
    -   [Configure a Read-Only LDAP userstore]({{base_path}}/deploy/configure-a-read-only-ldap-user-store)
    -   [Configure a Read-Write Active Directory userstore]({{base_path}}/deploy/configure-a-read-write-active-directory-user-store)
    -   [Configure a Read-Write LDAP userstore]({{base_path}}/deploy/configure-a-read-write-ldap-user-store)

    In the `deployment.toml` file, you can configure userstore managers by adding the relevant properties.
    However, it is important to read each userstore configuration
    document to find specific information that you need to follow when
    configuring a particular userstore.

    !!! warning
        Server system administrator who is capable of all the actions in the
        system is configured within the `deployment.toml` file. If you have not
        configured the system administrator yet, see [Configure the System Administrator]({{base_path}}/deploy/configure-the-system-administrator).
    

3.  Restart the server.
