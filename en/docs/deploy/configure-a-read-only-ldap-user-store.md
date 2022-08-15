# Configure a Read-only LDAP Userstore

WSO2 Identity Server uses the embedded H2 database as the primary user store.
This document will guide you to change that to a Read-Only LDAP userstore.

!!! tip 
    Refer [Configure userstores]({{base_path}}/deploy/configure-user-stores) to get a high-level understanding of the userstores available in WSO2
    Identity Server (WSO2 IS).

---

## Configure a read-only LDAP userstore manager

The following are the minimum configurations that are required to configure the Read-only LDAP userstore manager.

<table>
<thead>
<tr class="header">
<th>Configuration Name</th>
<th>Display Name</th>
<th>Description</th>
</tr>
<tr class="even">
<td>type</td>
<td>userstore Type</td>
<td>This indicates the type of userstore manager that we are using. For Read-only LDAP userstore manager, this value
should be read_only_ldap_unique_id.
</td>
</tr>
<tr class="odd">
<td>base_dn</td>
<td>User Search Base</td>
<td>This is the DN of the context or object under which the user entries are stored in the userstore. When the userstore searches for users, it will start from this location of the directory.<br />
Sample values: ou=Users,dc=wso2,dc=org</td>
</tr>
</table>
</thead>

Following are the minimum userstore properties that are required to configure the Read-only LDAP userstore manager.

<table>
<thead>
<tr class="header">
<th>Property Id</th>
<th>Primary userstore Property</th>
<th>Secondary userstore Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td>ConnectionURL</td>
<td>connection_url</td>
<td>Connection URL</td>
<td><p>This is the connection URL to the user store server.</p>
<p>Sample values:<br />
<a href="ldap://10.100.1.100:389">ldap://10.100.1.100:389</a><br />
<a href="ldaps://10.100.1.102:639">ldaps://10.100.1.102:639</a><br />
<br />
If you are connecting over ldaps (secured LDAP).<br />
you need to import the certificate of the userstore to <code><&ZeroWidthSpace;IS_HOME>/repository/resources/security/client-truststore.jks</code>. For information on how to add certificates to the truststore and how keystores are configured and used in a system, see <br />
<a href="{{base_path}}/deploy/security/use-asymmetric-encryption">Use asymmetric encryption</a><br />
<br />
If LDAP connection pooling is used, see<br />
<a href="{{base_path}}/deploy/performance-tuning-recommendations#performance-tuning-ldaps-pooling">performance tuning ldaps pooling.</a></p></td>
</tr>
<tr class="odd">
<td>ConnectionName</td>
<td>connection_name</td>
<td>Connection Name</td>
<td><p>This is the username used to connect to the userstore and perform various operations. This user does not need to be an administrator in the userstore or have an administrator role in WSO2 Identity Server, but this user must have permissions to read the user list and users' attributes and to perform search operations on the userstore. The value you specify is used as the DN (Distinguish Name) attribute of the user who has sufficient permissions to perform operations on users and roles in LDAP.</p>
<p>This property is mandatory.<br />
Sample values: uid=admin,ou=system</p></td>
</tr>
<tr class="even">
<td>ConnectionPassword</td>
<td>connection_password</td>
<td>Connection Password</td>
<td>Password for the ConnectionName user</td>
</tr>
</table>
</thead>

Replace the default `user_store` configuration in the `<IS_HOME>/repository/conf/deployment.toml        
` file, as per your ldap server configuration. A sample configuration is given below.

``` toml
[user_store]
type = "read_only_ldap_unique_id"
base_dn = "ou=system"
connection_url = "ldap://localhost:10389"
connection_name = "uid=admin,ou=system"
connection_password = "admin"
```
Apart from the properties mentioned above, WSO2 Identity Server also supports advanced LDAP configurations.

---

## Properties used in read-only LDAP userstore manager

Any of the following properties can be configured for the `PRIMARY` userstore by adding them as follows to 
`<IS-HOME>/repository/conf/deployment.toml`.

``` toml
[user_store]
<Property-Name> = <Property-Value>
```
For example :

``` toml
[user_store]
read_groups = true
```

!!! tip 
    The properties given below can also be configured for a secondary userstore through the management console.

<table>
<thead>
<tr class="header">
<th>Property Id</th>
<th>Primary userstore Property</th>
<th>Secondary userstore Property
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td>UserEntryObjectClass</td>
<td>user_entry_object_class</td>
<td>User Entry Object Class</td>
<td>The object class that is used to construct user entries<br />
<p>Default: identityPerson (a custom object class defined in WSO2 Identity Server)</p></td>
</tr>
<tr class="odd">
<td>UserNameAttribute</td>
<td>user_name_attribute</td>
<td>Username Attribute</td>
<td><p>This is a uniquely identifying attribute that represents the username of the user. Users can be authenticated using their email address, UID, etc. The value of the attribute is considered as the username.</p>
<p>Default: uid<br />
<br />
Note: email address is considered as a special case in, if you want to set the email address as username, see <a href="{{base_path}}/guides/identity-lifecycles/enable-email-as-username/">Enable using email address as the username.</a></p></td>
</tr>
<tr class="odd">
<td>UserIDAttribute</td>
<td>user_id_attribute</td>
<td>User ID Attribute</td>
<td><p>This is the attribute used for uniquely identifying a user entry. The value of the attribute is considered as the unique user ID.</p>
<p>Default: scimId <br /></p></td>
</tr>
<tr class="even">
<td>UserNameSearchFilter</td>
<td>user_name_search_filter</td>
<td>User Search Filter</td>
<td>Filtering criteria used to search for a particular user entry<br />
<p>Default : (&amp;amp;(objectClass=person)(uid=?))</p></td>
</tr>
<tr class="odd">
<td>UserNameListFilter</td>
<td>user_name_list_filter</td>
<td>User List Filter</td>
<td>This is the filtering criteria for searching user entries in the userstore. This query or filter is used when doing search operations on users with different search attributes.<br />
<br />
<p>Default: (objectClass=person)</p><br />
In this case, the search operation only provides the objects created from the person object class.</td>
</tr>
<tr class="even">
<td>UserDNPattern</td>
<td>user_dn_pattern</td>
<td>User DN Pattern</td>
<td><p>This is the pattern for the user's DN, which can be defined to improve the search. When there are many user entries in the LDAP userstore, defining a UserDNPattern provides more impact on performances as the LDAP does not have to travel through the entire tree to find users.</p>
<p>Sample values: uid={0},ou=Users,dc=wso2,dc=org</p></td>
</tr>
<tr class="odd">
<td>DisplayNameAttribute</td>
<td>display_name_attribute</td>
<td>Display name attribute</td>
<td>This is an optional property. The Display Name Attribute is the name by which users will be listed when you list users in the management console.
<p>Default: blank</td>
</tr>
<tr class="even">
<td>ReadGroups</td>
<td>read_groups</td>
<td>Read Groups</td>
<td>When WriteGroups is set to <code>false</code>, none of the groups in the userstore can be read, and the following group configurations are NOT mandatory: GroupSearchBase, GroupNameListFilter, or GroupNameAttribute.<br />
<p>Default: true
<br />
Possible values:<br />
true: Reads groups from userstore<br />
false: Doesn’t read groups from userstore</td>
</td>
</tr>
<tr class="odd">
<td>WriteGroups</td>
<td>write_groups</td>
<td>Write Groups</td>
<td>Indicates whether groups should be write to the userstore<br />
<p>Default: true
<br />
Possible values:<br />
true: Writes groups to userstore<br />
false: Does not write groups to userstore, so only internal roles can be created. Whether the existing userstore groups will be read, depends on the value of the ReadGroups property.<br />
</td>
</tr>
<tr class="even">
<td>GroupSearchBase</td>
<td>group_search_base</td>
<td>Group Search Base</td>
<td><p>This is the DN of the context or object under which the group entries are stored in the userstore. When the userstore searches for groups, it will start from this location of the directory.</p>
<p>Default: ou=Groups,dc=wso2,dc=org</p></td>
</tr>
<tr class="odd">
<td>GroupEntryObjectClass</td>
<td>group_entry_object_class</td>
<td>Group Entry Object Class</td>
<td>Object class used to construct group entries.<br/>
Default: groupOfNames</td>
</tr>
<tr class="even">
<td>GroupNameAttribute</td>
<td>group_name_attribute</td>
<td>Group Name Attribute</td>
<td>This is the attribute used for uniquely identifying a group entry. This attribute is to be treated as the group name.
<br/><p>Default: cn</p></td>
</tr>
<tr class="odd">
<td>GroupNameSearchFilter</td>
<td>group_name_search_filter</td>
<td>Group Search Filter</td>
<td><p>Filtering criteria used to search for a particular group entry</p>
<p>Default: (&amp;amp;(objectClass=groupOfNames)(cn=?))</p></td>
</tr>
<tr class="even">
<td>GroupNameListFilter</td>
<td>group_name_list_filter</td>
<td>Group List Filter</td>
<td><p>This is the filtering criteria for searching group entries in the userstore. This query or filter is used when doing search operations on groups with different search attributes.</p>
<p>Default: ((objectClass=groupOfNames)) In this case, the search operation only provides the objects created from the 
groupOfName object class.</p></td>
</tr>
<tr class="odd">
<td>RoleDNPattern</td>
<td>role_dn_pattern</td>
<td>Role DN Pattern</td>
<td><p>This denotes the pattern for the group's DN which can be defined to improve the search. When there are many group entries in the LDAP userstore, defining a RoleDNPattern provides more impact on performances as the LDAP does not have to traverse through the entire tree to find the group.</p>
<p>Sample values: cn={0},ou=Groups,dc=wso2,dc=org</p></td>
</tr>
<tr class="even">
<td>MembershipAttribute</td>
<td>membership_attribute_range</td>
<td>Membership Attribute</td>
<td><p>Defines the attribute that contains the distinguished names (DN) of user objects that are in a group</p>
<p>Default: member</p></td>
</tr>
<tr class="odd">
<td>MemberOfAttribute</td>
<td>member_of_attribute</td>
<td>Member Of Attribute</td>
<td>Defines the attribute that contains the distinguished names (DN) of group objects that a user is assigned to<br />
Possible values: memberOf</td>
</tr>
<tr class="even">
<td>BackLinksEnabled</td>
<td>back_links_enabled</td>
<td>Enable Back Links</td>
<td>This defines whether the backlink support is enabled. If you are using MemberOfAttribute attribute, this should be set to <code>true</code>.
<br/><p>Default : false</p></td>
</tr>
<tr class="odd">
<td>UsernameJavaRegEx</td>
<td>username_java_regex</td>
<td>Username RegEx (Java)</td>
<td>This is the regular expression used by the back-end components for username validation. By default, strings with non-empty characters have a length of 3 to 30 allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br />
<p>Default: [a-zA-Z0-9._\-|//]{3,30}$</p></td>
</tr>
<tr class="even">
<td>UsernameJava<br>ScriptRegEx</td>
<td>username_java<br>_script_regex</td>
<td>Username RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for username validation<br />
<p>Default: ^[\S]{3,30}$</p></td>
</tr>
<tr class="odd">
<td>UsernameJavaReg<br>ExViolationErrorMsg</td>
<td>username_java_reg<br>_ex_violation_error_msg</td>
<td>Username RegEx Violation Error Message</td>
<td>Error message when the Username does not match with UsernameJavaRegEx<br />
<p>Default: Username pattern policy violated</p></td>
</tr>
<tr class="even">
<td>PasswordJavaRegEx</td>
<td>password_java_regex</td>
<td>Password RegEx (Java)</td>
<td>The regular expression used by the back-end components for password validation. By default, strings with non-empty characters have a length of 5 to 30 allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br />
<p>Default: ^[\S]{5,30}$</p></td>
</tr>
<tr class="odd">
<td>PasswordJava<br>ScriptRegEx</td>
<td>password_java<br>_script_regex</td>
<td>Password RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for password validation<br />
<p>Default: ^[\S]{5,30}$</p></td>
</tr>
<tr class="even">
<td>PasswordJavaReg<br>ExViolationErrorMsg</td>
<td>password_java_reg<br>ex_violation_error_msg</td>
<td>Password RegEx Violation Error Message</td>
<td>Error message when the Password is not matched with passwordJavaRegEx<br />
<p>Default: Password length should be within 5 to 30 characters</p></td></tr>
<tr class="odd">
<td>RolenameJavaRegEx</td>
<td>rolename_java_regex</td>
<td>Role Name RegEx (Java)</td>
<td>The regular expression used by the back-end components for role name validation. By default, strings with non-empty characters have a length of 3 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
<p>Default: [a-zA-Z0-9._\-|//]{3,30}$</p></td>
</tr>
<tr class="odd">
<td>PasswordHashMethod</td>
<td>password_hash_method</td>
<td>Password Hashing Algorithm</td>
<td><p>Specifies the Password Hashing Algorithm used the hash the password before storing in the userstore<br />
Possible values:<br />
SHA - Uses SHA digest method. SHA-1, SHA-256<br />
MD5 - Uses MD 5 digest method.<br />
PLAIN_TEXT - Plain text passwords.(Default)</p>
<p>If you configure this as SHA, it is considered as SHA-1. It is always better to configure algorithm with a higher bit value as the digest bit size would be increased.<br />
<br />
Most of the LDAP servers (such as OpenLdap, OpenDJ, AD, ApacheDS and etc.) are supported to store passwords as salted hashed values (SSHA).<br />
Therefore, WSO2 IS just wants to feed passwords into the connected userstore as a plain text value. Then LDAP userstore can store them as a salted hashed value. To feed the plain text into the LDAP server, you need to set PasswordHashMethod to “PLAIN_TEXT”<br />
However, if your LDAP does not support storing user passwords as hashed values, you can configure the WSO2 Identity Server to hash the password and then feed the hashed password into the LDAP server. For this, you need to configure the PasswordHashMethod property with SHA (SHA-1), SHA-256, or SHA-512. The WSO2 Identity Server cannot create a salted hashed password (SSHA) to feed into the LDAP.</p></td>
</tr>
<tr class="even">
<td>MultiAttribute<br>Separator</td>
<td>multi_attribute<br>_separator</td>
<td>Multiple Attribute Separator</td>
<td>This property is used to define a character to separate multiple attributes. This ensures that it will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but you can define ",,," or "..." or a similar character sequence.<br />
<p>Default: “,”</p></td>
</tr>
<tr class="odd">
<td>MaxUserName<br>ListLength </td>
<td>max_user_name<br>_list_length</td>
<td>Maximum User List Length</td>
<td>This controls the number of users listed in the userstore of WSO2 Identity Server. This is useful when you have a large number of users and don't want to list them all. Setting this property to 0 displays all users.<br />
<p>Default: 100</p><br />
In some userstores, there are policies to limit the number of records that can be returned from the query. Setting the value to 0 will list the maximum results returned by the userstore. If you need to increase this, you need to set it in the userstore level.<br />
Eg : Active directory has the MaxPageSize property with the default value as 1000.</td>
</tr>
<tr class="even">
<td>MaxRoleName<br>ListLength</td>
<td>max_role_name_<br>list_length</td>
<td>Maximum Role List Length</td>
<td><p>This controls the number of roles listed in the userstore of WSO2 Identity Server. This is useful when you have a large number of roles and don't want to list them all. Setting this property to 0 displays all roles.<br />
<p>Default: 100</p><br />
In some userstores, there are policies to limit the number of records that can be returned from the query. Setting the value to 0 will list the maximum results returned by the userstore. If you need to increase this, you need to set it in the userstore level.</p>
<p>Eg: Active directory has the MaxPageSize property with the default value as 1000.</p></td>
</tr>
<tr class="odd">
<td>kdcEnabled</td>
<td>kdc_enabled</td>
<td>Enable KDC</td>
<td>If your userstore is capable of acting as a Kerberos Key Distribution Center (KDC) and if you prefer to enable it, set this property to <code>true</code>.<br />
<p>Default: false</p></td>
</tr>
<tr class="even">
<td>UserRoles<br>CacheEnabled</td>
<td>user_roles_<br>cache_enabled</td>
<td>Enable User Role Cache</td>
<td>This is to indicate whether to cache the role list of a user.<br />
Default: true<br />
<br />
Possible values:<br />
false: Set it to <code>false</code> if the user roles are changed by external means and those changes should be instantly reflected in the Carbon instance.
<br />
Default: true<br /></td>
</tr>
<tr class="odd">
<td>Connection<br>PoolingEnabled</td>
<td>connection_<br>pooling_enabled</td>
<td>Enable LDAP Connection Pooling</td>
<td>Defines whether LDAP connection pooling is enabled<br />
Possible values:<br />
True: Enables connection pooling. Enabling it will improve the performance.<br />
False: Disables connection pooling
<br />
<p>Default: false</p><br /></td>
</tr>
<tr class="even">
<td>LDAPConnection<br>Timeout</td>
<td>ldap_connection<br>_timeout</td>
<td>LDAP Connection Timeout</td>
<td>Timeout in making the initial LDAP connection. This is configured in milliseconds.<br />
<p>Default: 5000</p></td>
</tr>
<tr class="odd">
<td>ReadTimeout</td>
<td>read_timeout</td>
<td>LDAP Read Timeout</td>
<td>The value of this property is the read timeout in milliseconds for LDAP operations. If the LDAP provider cannot get an LDAP response within that period, it aborts the read attempt. The integer should be greater than zero. An integer less than or equal to zero indicates that no read timeout is specified, which is equivalent to waiting for the response infinitely until it is received.
<br />
<p>Default: not configured</p></td>
</tr>
<tr class="odd">
<td>Membership<br>AttributeRange</td>
<td>membership_<br>attribute_range</td>
<td>Membership Attribute Range</td>
<td><p>This is to define the maximum users of role returned by the LDAP/AD userstore. This does not depend on the max page size of the userstore.</p>
<p>Default: not configured</p></td>
</tr>
<tr class="even">
<td>RetryAttempts</td>
<td>retry_attempts</td>
<td>Retry Attempts</td>
<td>Retry the authentication request if a timeout happens
<p>Default: not configured</p></td>
</tr>
<tr class="odd">
<td>LDAPConnection<br>Timeout</td>
<td>ldap_connection<br>_timeout</td>
<td>LDAP Connection Timeout</td>
<td>If the connection to the LDAP is inactive for the length of time
(in milliseconds) specified by this property, the connection
will be terminated.
<p>Default: not configured</p>
<p>Sample: 20</p>
</td>
</tr>
</tbody>
</table>

---

## Update the system administrator

The admin user is the super tenant that will be able to manage all other
users, roles, and permissions in the system by using the management console.

Therefore, the user that should have admin
permissions. This is required to be stored in the userstore when you start
the system for the first time. By default, the system will create an admin
user in the LDAP that has admin permissions. However, this cannot be done if the
LDAP userstore is read-only. Hence, that capability should be disabled in the `<IS_HOME>/repository/conf/deployment.toml` file as follows.

```toml
[super_admin]
username = "admin"
admin_role = "admin"
create_admin_account = false
```

-   **create_admin_account:** This should be set to 'False' as it will not be
    allowed to create users and roles in a read-only userstore.
-   **admin_role:** The admin role you enter here should already
    exist in the read-only userstore. Otherwise, you must enter an internal role, which will be saved to the internal database of the system when the system starts for the first time.
-   **username:** Since we are configuring a read-only LDAP as the
    primary userstore, the user that should have admin permissions is required to be stored in the userstore when you start the system for the first time. For example, say a valid username is AdminSOA.
    Update the `         username       ` section of your configuration as shown above. You do not have to update the password element as it is already set in the userstore.  

For information about the system administrator user, see [Configure the System Administrator]({{base_path}}/deploy/configure-the-system-administrator), and for
information on how keystores are used in WSO2 Identity Server, see [Use Asymmetric Encryption]({{base_path}}/deploy/security/use-asymmetric-encryption).  

!!! info "Related topics"
    -   [Deploy: Configure the Primary Userstore]({{base_path}}/deploy/configure-the-primary-user-store)
    -   [Deploy: Configure Secondary Userstores]({{base_path}}/deploy/configure-secondary-user-stores)


  
