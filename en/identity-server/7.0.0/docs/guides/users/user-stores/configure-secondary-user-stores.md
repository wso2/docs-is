# Configure Secondary User stores

To work with WSO2 Identity Server, you must have a primary user store.
Additionally, you can configure several secondary user stores if
required. After configuration, users from different user stores can log in
and perform operations depending on their roles/permissions. You can
also configure your own customized user stores and connect them with the identity server as secondary stores.

You can use either the WSO2 Identity Server Console to create secondary user stores or you can create it manually.

---

## Configure using the Identity Server Console

1. On the WSO2 Identity Server Console, go to **User Attributes & Stores** > **User Stores**.
2. Click **New User Store** and select the user store type.

    ![Register secondary user store to WSO2 Identity Server]({{base_path}}/assets/img/guides/user-stores/secondary-user-store-types.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! info 
        You cannot update the primary user store at runtime, so it is not
        visible on this page.

    The following table lists the available user store manager
    implementations and their usage:

    <table>
    <colgroup>
    <col style="width: 10%" />
    <col style="width: 40%" />
    <col style="width: 48%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>user store</th>
    <th>user store manager class</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>LDAP ActiveDirectory</p></td>
    <td><code>org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager</code></td>
    <td>Used to do read-only operations for external LDAP or ActiveDirectory user stores</td>
    </tr>
    <tr class="even">
    <td>LDAP</td>
    <td><code>org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager</code></td>
    <td>This is used for external LDAP user stores to do both read and write operations. This is the default primary user store configuration in the <code>
    &lt;IS_HOME&gt;/repository/conf/deployment.toml</code> file for WSO2 Identity Server.</td>
    </tr>
    <tr class="odd">
    <td>ActiveDirectory</td>
    <td><code>org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager</code></td>
    <td>This is used to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used only for read/write operations. If you need to use AD as read-only, you must use <code>org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager.</code></td>
    </tr>
    <tr class="even">
    <td>JDBC</td>
    <td><code>org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager</code></td>
    <td>Used for JDBC user stores</td>
    </tr>
    </tbody>
    </table>

3.  Enter a unique name with no underscore ( \_ ) characters, and a
    description (optional) for this user store.

4.  Enter values for the properties, which vary
    based on the user store manager class you selected. 

    Refer the following topics to know more information on the
    properties that you need to configure for different user store manager types and recommendations specific to
    each user store manager.  
      
    -   [Properties for a JDBC user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-jdbc-user-store)

    -   [Properties for a read-only LDAP user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-read-only-ldap-user-store)

    -   [Properties for a read-write Active Directory user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-read-write-active-directory-user-store/)
        
    -   [Properties for a read-write LDAP user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-read-write-ldap-user-store/)

5.  Make sure that all the mandatory fields are filled and a valid
    name is given, and click **Finish**. A message appears saying
    that the user stores are being added.

    ![add-user-store]({{base_path}}/assets/img/guides/user-stores/add-user-store.png){: width="400" style="display: block; border: 0.3px solid lightgrey;"}

    !!! note
        The above message does not imply that the user store is added
        successfully. Instead, it only means that the server is attempting to add
        the new user store to the end of the available chain of stores.
    

6.  Refresh the page after a few seconds to check the status.  
    If the new user store is successfully added, it will appear in the
    user stores page. 
      
7.  After adding it to the server, you can edit the properties of the new
    secondary user store and enable/disable it dynamically.  
    This will be saved to an XML file with the same name as the domain
    name, under `<IS_HOME>/repository/deployment/server/userstores` directory.

---

## Configure manually

If you prefer to configure the user store manually, follow the steps given below.

1.  When you configure multiple user stores, you need to give a unique
    domain name to each user store in the `<DomainName>` element. If you
    configure a user store without specifying a domain name, the server
    throws an exception at start up.

2.  Save the secondary user store definitions in the
    `<IS_HOME>/repository/deployment/server/userstores`      
    directory.

    !!! note
        The secondary user store configuration file must have the same name
        as the domain with an underscore (_) in place of the period. For
        example, if the domain is 'wso2.com', name the file as
        `wso2_com.xml` . One file contains the
        definition for one user store domain.
    
    Additionally, you need to set the DomainName property with the domain name of your
    user store.

    ``` xml
    <Property name="DomainName">Remote</Property>
    ```

    !!! note
        If we create a secondary user store from the UI in a clustered
        environment, it will not sync between all the nodes by default, so
        you need to copy manually to other nodes. This applies to deletion as well. So you can use sync mechanisms like Rsync or
        choose to first fully test it in a single node and apply it to other nodes while setting up the cluster.  
    

      
      
