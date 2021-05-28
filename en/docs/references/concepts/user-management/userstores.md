# Introduction to Userstores

Userstores are used to store [users](../users) and [roles](../roles-and-permissions). WSO2 Identity Server (WSO2 IS) supports JDBC, LDAP, and Active Directory userstores by default with the capability of configuring custom userstores. There are different userstore adapters called *userstore managers*, which are used to connect
with these userstore types.

There are two types of userstores.
 
- Primary userstore (Mandatory)
- Secondary userstores (Optional) 

All the supported userstores can be categorized under these two types.

---

## Primary userstore (mandatory)

This is the main userstore that is shared among all the [tenants](../../introduction-to-multitenancy/) in the system. Only one userstore should be configured as the primary userstore. By default, WSO2 Identity Server uses an embedded Read/Write LDAP as the primary userstore. It is recommended to change this default configuration in the production system. See [here](../../../../deploy/configure-the-primary-user-store/) for more information on configuring the primary userstore. The primary userstore can be changed from the embedded LDAP to any of the following userstores based on user requirement. Alternatively, a custom userstore manager can be configured as well. 

<table>
    <colgroup>
    <col style="width: 10%" />
    <col style="width: 40%" />
    <col style="width: 48%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Userstore</th>
    <th>Userstore manager class</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>LDAP ActiveDirectory</p></td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager              </code></td>
    <td>Used to do read-only operations for external LDAP or ActiveDirectory userstores.</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager              </code></td>
    <td>Used for external LDAP userstores to do both read and write operations. This is the default primary userstore configuration in the deployment.toml file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager              </code></td>
    <td>Used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager.              </code></td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>               org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager              </code></td>
    <td>Used for JDBC userstores. This is the default primary userstore configuration in the deployment.toml file for all WSO2 Servers, except WSO2 Identity Server.</td>
    </tr>
    </tbody>
</table>


---

## Secondary userstore(s) (optional)

Any number of secondary userstores can be easily set up for any system. These userstores are specific to the created tenant, and they are
not shared among multiple tenants. A user can access and work with multiple secondary userstores based on the permissions they are granted. The admin portal can be used to create secondary userstores. Alternatively, they can be created manually as an xml file with the relevant configurations. See [Configuring Secondary Userstores](TO DO: insert-guides-link) for more information on configuring secondary userstores. 

---

## Userstore Manager

Adapters used to connect with different userstores are called *userstore managers*. By default, there are userstore managers for JDBC,
LDAP, and Active Directory userstores. If you need to add a new userstore implementation, see [Write a Custom Userstore Manager](../../../../deploy/write-a-custom-user-store-manager).


!!! info "Related Topics"
    - [Deploy: Configure Userstores](../../../../deploy/configure-user-stores/)
    - [Deploy: Configure Primary Userstore](../../../../deploy/configure-the-primary-user-store/)
    - [Deploy: Configure Secondary Userstores](../../../../deploy/configure-secondary-user-stores/)