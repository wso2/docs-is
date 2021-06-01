# Configure Secondary Userstores

To work with WSO2 Identity Server, you must have a primary userstore.
Additionally, you can configure several secondary userstores if
required. After configuration, users from different userstores can log in
and perform operations depending on their roles/permissions. You can
also configure your own customized userstores and connect them with the identity server as secondary stores.

You can use either the management console to create secondary userstores or you can create it manually. These will be stored in the `deployment.toml` file and will use the same format that is used to configure the primary userstore.

---

## Configure using the Management Console

1.  Log in to the management console and click **Main** > **Userstores** > **Add**. 

    !!! info 
        You cannot update the primary userstore at runtime, so it is not
        visible on this page.

2.  From the **Userstore Manager Class** drop-down, select the userstore manager class that suits your userstore.
    
    ![add a secondary userstore](../../../assets/img/deploy/add-secondary-user-store.png)

    The following table lists the available userstore manager
    implementations and their usage:

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
    <td>Used to do read-only operations for external LDAP or ActiveDirectory userstores</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager              </code></td>
    <td>This is used for external LDAP userstores to do both read and write operations. This is the default primary userstore configuration in the <code>
    &lt;IS_HOME&gt;/repository/conf/deployment.toml</code> file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>               org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager              </code></td>
    <td>This is used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>               org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager.              </code></td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>               org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager              </code></td>
    <td>Used for JDBC userstores</td>
    </tr>
    </tbody>
    </table>

    If you have added a custom userstore manager to the system, that also will be available in this drop-down menu.

    !!! tip
        The userstore managers that do not have `UniqueID` as part of the userstore manager name are **only** available for backward compatibility purposes and can only be used if you are migrating from a previous version of WSO2 Identity Server. 

3.  Enter a unique domain name with no underscore ( \_ ) characters, and a
    description (optional) for this userstore.
4.  Enter values for the properties, using the descriptions in the
    **Descriptions** column for guidance. The properties that appear vary
    based on the userstore manager class you selected, and there may be
    additional properties in **Optional** or **Advanced** sections. 

    Refer the following topics to know more information on the
    properties that you need to configure for different userstore manager types and recommendations specific to
    each userstore manager.  
      
    -   [Properties for a JDBC userstore](../../../deploy/configure-a-jdbc-user-store#properties-used-in-jdbc-user-store-manager)

    -   [Properties for a read-only LDAP userstore](../../../deploy/configure-a-read-only-ldap-user-store#properties-used-in-read-only-ldap-user-store-manager)

    -   [Properties for a read-write Active Directory userstore](../../../deploy/configure-a-read-write-active-directory-user-store#properties-used-in-read-write-active-directory-userstore-manager)
        
    -   [Properties for a read-write LDAP userstore](../../../deploy/configure-a-read-write-ldap-user-store#properties-used-in-read-write-ldap-user-store-manager)

5.  Make sure that all the mandatory fields are filled and a valid
    domain name is given, and click **Add**. A message appears saying
    that the userstores are being added.  
    ![configure-userstores](../../../assets/img/deploy/configure-userstores.png)

    !!! note
        The above message does not imply that the userstore is added
        successfully. Instead, it only means that the server is attempting to add
        the new userstore to the end of the available chain of stores.
    

6.  Refresh the page after a few seconds to check the status.  
    If the new userstore is successfully added, it will appear in the
    userstores page. This can be viewed at any time by clicking
    **List** under **userstores** in the **Main** menu.  
      
7.  After adding it to the server, you can edit the properties of the new
    secondary userstore and enable/disable it dynamically.  
    This will be saved to an XML file with the same name as the domain
    name, under the
    `          <IS_HOME>/repository/deployment/server/userstores         `
    directory for a super tenant and the
    `          <IS_HOME>/repository/tenants/<tenantid>/userstores         `
    directory for tenants.

---

## Configure manually

If you prefer to configure the userstore manually, follow the steps given below.

1.  When you configure multiple userstores, you need to give a unique
    domain name to each userstore in the `<DomainName>` element. If you
    configure a userstore without specifying a domain name, the server
    throws an exception at start up.

2.  If the configuration is done for the super tenant, save the
    secondary userstore definitions in the
    `           <IS_HOME>/repository/deployment/server/userstores`      
    directory.

3.  If the configuration is done for the tenant, save the configuration
    in the
    `           <IS_HOME>/repository/tenants/<tenantid>/userstores          `
    directory.

    !!! note
        The secondary userstore configuration file must have the same name
        as the domain with an underscore (_) in place of the period. For
        example, if the domain is 'wso2.com', name the file as
        `           wso2_com.xml          ` . One file contains the
        definition for one userstore domain.
    
    Additionally, you need to set the DomainName property with the domain name of your
    userstore.

    ``` xml
    <Property name="DomainName">Remote</Property>
    ```

    !!! note
        If we create a secondary userstore from the UI in a clustered
        environment, it will not sync between all the nodes by default, so
        you need to copy manually to other nodes. This applies to deletion as well. So you can use sync mechanisms like Rsync or
        choose to first fully test it in a single node and apply it to other nodes while setting up the cluster.  
    

      
      
