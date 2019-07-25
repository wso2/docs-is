# Configuring user-mgt.xml

Users can change the default user management functionality related
configurations by editing the
`         <PRODUCT_HOME>/repository/conf/user-mgt.xml        ` file
using the information given below.

Click on the table and use the left and right arrow keys to scroll
horizontally.

### XML Elements

<table>
<tbody>
<tr class="odd">
<td>XML element</td>
<td>Attribute</td>
<td>Description</td>
<td>Data type</td>
<td>Default value</td>
<td>Mandatory/Optional</td>
<td>Sample</td>
</tr>
<tr class="even">
<td>&lt;UserManager&gt;</td>
<td><br />
</td>
<td>User kernel configuration for Carbon server.</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>__ &lt;Realm&gt;</td>
<td><br />
</td>
<td>Realm configuration.</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>____ &lt;Configuration&gt;</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><div class="content-wrapper">
<pre><code>&lt;Configuration&gt;</code></pre>
<pre><code>&lt;AddAdmin&gt;true&lt;/AddAdmin&gt;</code></pre>
<pre><code>&lt;AdminRole&gt;admin&lt;/AdminRole&gt;-</code></pre>
<pre><code>&lt;AdminUser&gt;</code></pre>
<pre><code>&lt;UserName&gt;admin&lt;/UserName&gt;</code></pre>
<pre><code>&lt;Password&gt;admin&lt;/Password&gt;</code></pre>
<pre><code>&lt;/AdminUser&gt;</code></pre>
<pre><code>&lt;EveryOneRoleName&gt;everyone
&lt;/EveryOneRoleName&gt;
&lt;!-- By default users in this 
role sees the registry root --&gt;</code></pre>
<pre><code>&lt;Property name=&quot;dataSource&quot;&gt;</code></pre>
<pre><code>jdbc/WSO2CarbonDB</code></pre>
<pre><code>&lt;/Property&gt;</code></pre>
<pre><code>&lt;/Configuration&gt;</code></pre>
<br />

<p><br />
</p>
</div></td>
</tr>
<tr class="odd">
<td>______ &lt;AddAdmin&gt;</td>
<td><br />
</td>
<td>Specifies whether the admin user and admin role will be created in the primary user store. This element enables the user to create additional admin users in the user store. If the <code>              &lt;AdminUser&gt;             </code> element does not exist in the external user store, it will be automatically created only if this property is set to <code>              true             </code> . If the value is set to <code>              false             </code>, the given admin user and role should already exist in the external user store.</td>
<td>Boolean</td>
<td>true</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>_______ &lt;AdminRole&gt;</td>
<td><br />
</td>
<td>The role name that is used as an admin role for the Carbon server.</td>
<td>String</td>
<td>N/A</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>________ &lt;AdminUser&gt;</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>__________ &lt;UserName&gt;</td>
<td><br />
</td>
<td>User name that is used to represent an admin user for the Carbon server.</td>
<td>String</td>
<td>N/A</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>___________ &lt;Password&gt;</td>
<td><br />
</td>
<td>Password of the admin user, If the admin user needs to be created in the Carbon server.</td>
<td>String</td>
<td>N/A</td>
<td>Optional</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>________ &lt;EveryOneRoleName&gt;</td>
<td><br />
</td>
<td>By default, every user in the user store is assigned to this role.</td>
<td>String</td>
<td>N/A</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>_________ &lt;Property&gt;</td>
<td><br />
</td>
<td>User realm configuration specific property values.</td>
<td>String</td>
<td>N/A</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>____ &lt;UserStoreManager&gt;</td>
<td><br />
</td>
<td>User Store manager implementation classes and their configurations for use realm. Use the ReadOnlyLDAPUserStoreManager to do read-only operations for external LDAP user stores.<br />
<br />
To do both read and write operations, use the ReadWriteLDAPUserStoreManager for external LDAP user stores.<br />
<br />
If you wish to use an Active Directory Domain Service (AD DS) or Active Directory Lightweight Directory Service (AD LDS), use the ActiveDirectoryUserStoreManager. This can be used for both read-only and read/write operations.<br />
<br />
Use JDBCUserStoreManager for both internal and external JDBC user stores.</td>
<td>String</td>
<td>N/A</td>
<td>Mandatory</td>
<td>&lt;UserStoreManager class=<br />
"org.wso2.carbon.<br />
user.core.jdbc.JDBCUserStoreManager"&gt;</td>
</tr>
<tr class="odd">
<td><br />
</td>
<td>class</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>______ &lt;Property&gt;</td>
<td><br />
</td>
<td>User store configuration specific property values. See <a href="http://docs.wso2.org/display/IS460/Working+with+Properties+of+Primary+User+Stores">working with primary user store properties</a> for more information.</td>
<td>String</td>
<td>N/A</td>
<td>Optional</td>
<td><p>&lt;Property name="ReadOnly"&gt;</p>
<p>false</p>
<p>&lt;/Property&gt;</p></td>
</tr>
<tr class="odd">
<td>____ &lt;AuthorizationManager&gt;</td>
<td><br />
</td>
<td>Authorization manager implementation class and its configuration for user realm.</td>
<td>String</td>
<td>N/A</td>
<td>Mandatory</td>
<td><p>&lt;AuthorizationManager class="org.wso2.carbon.user.<br />
core.authorization.<br />
JDBCAuthorizationManager"&gt;</p></td>
</tr>
<tr class="even">
<td><br />
</td>
<td>class</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>______ &lt;Property&gt;</td>
<td><br />
</td>
<td>Authorization manager configuration specific property values.</td>
<td>String</td>
<td>N/A</td>
<td>Optional</td>
<td>&lt;Property name="AuthorizationCacheEnabled"&gt;<br />
true&lt;/Property&gt;</td>
</tr>
</tbody>
</table>
