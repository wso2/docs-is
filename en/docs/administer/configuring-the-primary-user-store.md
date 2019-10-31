# Configuring the Primary User Store

User management functionality is provided by default in all WSO2
Carbon-based products and is configured in the
`         deployment.toml       ` file found in the
`         <IS_HOME>/repository/conf/        ` directory. This
documentation explains the process of setting up a primary user store
for your system.

!!! info "The default User Store"
    The primary user store that is configured by default in WSO2 Identity Server
    is a LDAP user store, This database is used by the Authorization Manager (for user authentication
    information) as well as the User Store Manager (for defining users and
    roles).

Instead of using the embedded LDAP, you can set up a separate
repository and configure it as your primary user store. Since the user
store you want to connect to might have different schemas from the ones
available in the embedded user store, it needs to go through an
adaptation process. WSO2 Identity Server provide the following adapters, for
connecting to LDAP, Active Directory and JDBC. Thereby, these adapters
enable you to authenticate users from different types of user stores.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>User store manager class</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager</code></pre></td>
<td><p>Use <code>              ReadOnlyLDAPUserStoreManager             </code> to do read-only operations for external LDAP user stores.</p></td>
</tr>
<tr class="even">
<td><code>             org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager            </code></td>
<td><p>Use <code>              ReadWriteLDAPUserStoreManager             </code> for external LDAP user stores to do both read and write operations. This is the user store configuration which is uncommented in the code in the <code>              deployment.toml             </code> file for WSO2 Identity Server.</p></td>
</tr>
<tr class="odd">
<td><pre><code>org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager</code></pre></td>
<td><p>Use <code>              ActiveDirectoryUserStoreManager             </code> to configure an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS). This can be used <strong>only</strong> for read/write operations. If you need to use AD as read-only, you must use <code>              org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager             </code> .</p></td>
</tr>
<tr class="even">
<td><pre><code>org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager</code></pre></td>
<td><p>Use <code>              JDBCUserStoreManager             </code> for both internal and external JDBC user stores.</p></td>
</tr>
</tbody>
</table>

To enable the required user store configuration, add them to the `  deployment.toml` file and
comment out the ones that you do not need as explained in the following
topics.
