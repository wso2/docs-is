# Configure a Read-write Active Directory Userstore

WSO2 Identity Server uses the embedded H2 database as the primary user store.
This document will guide you to change that to a Read Write Active Directory userstore.

!!! tip 
    Refer [Configure userstores]({{base_path}}/deploy/configure-user-stores) to get a high-level understanding of the userstores available in WSO2 Identity Server (WSO2 IS).
    
!!! tip    
    For Read-only Active Directory userstore manager configuration, use [Read-only LDAP userstore manager configuration properties]({{base_path}}/deploy/configure-a-read-only-ldap-user-store).

---

## Configure Read-write Active Directory userstore manager  

Following are the minimum configurations that are needed to be provided to configure the Read-write Active Directory userstore manager.

<table>
<thead>
<tr class="header">
<th>Configuration Name</th>
<th>Display Name</th>
<th>Description</th>
</tr>
</thead>
<tr class="even">
<td>type</td>
<td>userstore Type</td>
<td>This denotes the type of the userstore manager that we are using. For Read-only LDAP userstore manager, this value should be active_directory_unique_id.
</td>
</tr>
<tr class="odd">
<td>base_dn</td>
<td>User Search Base</td>
<td>This is the DN of the context or object under which the user entries are stored in the userstore. When the userstore searches for users, it will start from this location of the directory.<br />
Sample values: ou=Users,dc=wso2,dc=org</td>
</tr>
</table>

Following are the minimum userstore properties that need to be provided to configure the Read-only LDAP userstore manager.

<table>
<thead>
<tr class="header">
<th>Property Id</th>
<th>Primary userstore Property</th>
<th>Secondary userstore Property </th>
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
If you are connecting over ldaps (secured LDAP),<br />
you need to import the certificate of userstore to <code><&ZeroWidthSpace;IS_HOME>/repository/resources/security/client-truststore.jks</code>. For information on how to add certificates to the truststore and how keystores are configured and used in a system, see<br />
<a href="{{base_path}}/deploy/security/use-asymmetric-encryption">Use asymmetric encryption.</a><br />
<br />
If LDAP connection pooling is used, see <br />
<a href="{{base_path}}/deploy/performance/performance-tuning-recommendations#performance-tuning-ldaps-pooling">performance tuning ldaps pooling.</a></p></td>
</tr>
<tr class="odd">
<td>ConnectionName</td>
<td>connection_name</td>
<td>Connection Name</td>
<td><p>This is the username that is used to connect to the userstore and perform various operations. This user does not need to be an administrator in the userstore or have an administrator role in WSO2 IS. However, this user must have permissions to read the user list and users' attributes and to perform search operations on the userstore. The value you specify is used as the DN (Distinguish Name) attribute of the user who has sufficient permissions to perform operations on users and roles in LDAP.</p>
<p>This property is mandatory.<br />
Sample values: uid=admin,ou=system</p></td>
</tr>
<tr class="even">
<td>ConnectionPassword</td>
<td>connection_password</td>
<td>Connection Password</td>
<td>Password for the ConnectionName user</td>
</tr>
</tbody>
</table>


Replace the default `user_store` configuration in the `         <IS_HOME>/repository/conf/deployment.toml        
` file, as per your active directory configuration. A sample configuration is given below.

```toml
[user_store]
type = "active_directory_unique_id"
base_dn = "dc=wso2,dc=org"
connection_url = "ldaps://10.100.1.102:639"
connection_name = "cn=admin,ou=system"
connection_password = "admin"
```

In addition to the above, please make sure that you import the Active Directory user store public certificate to the 
WSO2 Identity Server’s client trust store. To perform this, you need to navigate to the 
`<IS_HOME>repository/resources/security` directory and execute the following command to import the certificate to 
client-truststore of WSO2 Identity Server.

```
keytool -import -alias certalias -file <certificate>.pem -keystore client-truststore.jks -storepass wso2carbon
```

!!! note
    `wso2carbon` is the keystore password of the default client-truststore.jks file of WSO2 Identity Server.

Furthermore, please make sure to follow the steps mentioned in [Configure Active Directory Userstores for SCIM 2.0 based Inbound Provisioning](../guides/identity-lifecycles/configure-active-directory-user-stores-for-scim-2.0-based-inbound-provisioning.md) 
since SCIM is enabled by default from the WSO2 Identity Server 5.10.0 onwards.


!!! note
    It is required to edit the claim mappings in WSO2 IS according to the user claims of the Active Directory version you have configured.<br />
    Before starting the server, edit the `<IS_HOME>/repository/conf/claim-config.xml` configuration file and change the `AttributeID` of the `Created Time` and `Last Modified Time` claims to `whenCreated` and `whenChanged` respectively.
    Start the server and edit the rest of the required claim mappings through the management console as explained in [edit claim mapping]({{base_path}}/guides/dialects/edit-claim-mapping.md).

---

## Properties used in Read-write Active Directory userstore manager

The following table lists the properties used in Read-write Active
Directory and their descriptions.

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
    The properties given below can be configured for a secondary userstore through the management console.
    
<table> 
<col width="50">
<col width="50">
<col width="50">
<col width="100">
<thead>
<tr class="header">
<th>Property Id</th>
<th>Primary userstore Property </th>
<th>Secondary userstore Property </th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td>UserEntryObjectClass</td>
<td>user_entry_object_class</td>
<td>User Entry Object Class</td>
<td>Object class used to construct user entries.<br />
Default: identityPerson (a custom object class defined in WSO2 Identity Server)</td>
</tr>
<tr class="odd">
<td>UserNameAttribute</td>
<td>user_name_attribute</td>
<td>Username Attribute</td>
<td><p>This is a uniquely identifying attribute that represents the username of the user. Users can be authenticated using their email address, UID, etc. The value of the attribute is considered as the username.</p>
<p>Default: uid<br />
<br />
Note: email address is considered as a special case in WSO2 Identity Server, if you want to set the email address as username, see <a href="{{base_path}}/guides/identity-lifecycles/enable-email-as-username">Enable using email address as the username.</a></p>
<br/>
sample values: sAMAccountName</td>
</tr>
<tr class="odd">
<td>UserIDAttribute</td>
<td>user_id_attribute</td>
<td>User ID Attribute</td>
<td><p>This is the attribute used for uniquely identifying a user entry. The value of the attribute is considered as the unique user ID.</p>
<p>Default: ObjectGUID <br /></p></td>
</tr>
<tr class="even">
<td>UserNameSearchFilter</td>
<td>user_name_search_filter</td>
<td>User Search Filter</td>
<td>Filtering criteria used to search for a particular user entry<br />
Default : (&amp;(objectClass=user)(uid=?))</td>
</tr>
<tr class="odd">
<td>UserNameListFilter</td>
<td>user_name_list_filter</td>
<td>User List Filter</td>
<td>This denotes the filtering criteria for searching user entries in the userstore. This query or filter is used when doing search operations on users with different search attributes.<br />
<br />
Default: (objectClass=user)<br />
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
<td>When WriteGroups is set to falses, this Indicates whether groups should be read from the userstore. If this is disabled by setting it to false, none of the groups in the userstore can be read, and the following group configurations are NOT mandatory: GroupSearchBase, GroupNameListFilter, or GroupNameAttribute.<br />
<p>Default: true
<br />
Possible values:<br />
true: Read groups from userstore<br />
false: Don’t read groups from userstore</td>
</tr>
<tr class="odd">
<td>WriteGroups</td>
<td>write_groups</td>
<td>Write Groups</td>
<td>Indicates whether groups should be write to the userstore.<br />
<p>Default: true
<br />
Possible values:<br />
true: Write groups to userstore<br />
false: Do not write groups to userstore, so only internal roles can be created. Depend on the value of ReadGroups property, it will read existing groups from userstore or not<br />
</td>
</tr>
<tr class="even">
<td>GroupSearchBase</td>
<td>group_search_base</td>
<td>Group Search Base</td>
<td><p>DN of the context or object under which the group entries are stored in the userstore. When the userstore searches for groups, it will start from this location of the directory</p>
<p>Default: ou=Groups,cn=Users,dc=wso2,dc=org</p></td>
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
<td>Attribute used for uniquely identifying a group entry. This attribute is to be treated as the group name.
<br/>Default: cn</td>
</tr>
<tr class="odd">
<td>GroupNameSearchFilter</td>
<td>group_name_search_filter</td>
<td>Group Search Filter</td>
<td><p>Filtering criteria used to search for a particular group entry.</p>
<p>Default: (&amp;(objectClass=groupOfNames)(cn=?))</p></td>
</tr>
<tr class="even">
<td>GroupNameListFilter</td>
<td>group_name_list_filter</td>
<td>Group List Filter</td>
<td><p>Filtering criteria for searching group entries in the userstore. This query or filter is used when doing search operations on groups with different search attributes.</p>
<p>Default: (objectClass=groupOfNames) In this case, the search operation only provides the objects created from the 
groupOfName object class.</p></td>
</tr>
<tr class="odd">
<td>RoleDNPattern</td>
<td>role_dn_pattern</td>
<td>Role DN Pattern</td>
<td><p>The pattern for the group's DN, which can be defined to improve the search. When there are many group entries in the LDAP userstore, defining a RoleDNPattern provides more impact on performances as the LDAP does not have to traverse through the entire tree to findgroup.</p>
<p>Sample values: cn={0},ou=Groups,dc=wso2,dc=org</p></td>
</tr>
<tr class="even">
<td>MembershipAttribute</td>
<td>membership_attribute</td>
<td>Membership Attribute</td>
<td><p>Defines the attribute that contains the distinguished names (DN) of user objects that are in a group.</p>
<p>Default: member</p></td>
</tr>
<tr class="odd">
<td>MemberOfAttribute</td>
<td>member_of_attribute</td>
<td>Member Of Attribute</td>
<td>Define the attribute that contains the distinguished names (DN ) of group objects that user is assigned to.<br />
Default: memberOf</td>
</tr>
<tr class="even">
<td>BackLinksEnabled</td>
<td>back_links_enabled</td>
<td>Enable Back Links</td>
<td>Defines whether the backlink support is enabled. If you are using MemberOfAttribute attributes this should be set to 'true'.
<br/>Default : false</td>
</tr>
<tr class="odd">
<td>UsernameJavaRegEx</td>
<td>username_java_regex</td>
<td>Username RegEx (Java)</td>
<td>The regular expression used by the back-end components for username validation. By default, strings with non-empty characters have a length of 3 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
Default: [a-zA-Z0-9._\-|//]{3,30}$</td>
</tr>
<tr class="even">
<td>UsernameJava<br />ScriptRegEx</td>
<td>username_java_<br />script_regex</td>
<td>Username RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for username validation.<br />
Default: ^[\S]{3,30}$</td>
</tr>
<tr class="odd">
<td>UsernameJavaReg<br />ExViolationErrorMsg</td>
<td>username_java_reg_<br />ex_violation_error_msg</td>
<td>Username RegEx Violation Error Message</td>
<td>Error message when the Username is not matched with UsernameJavaRegEx<br />
Default: Username pattern policy violated</td>
</tr>
<tr class="even">
<td>PasswordJavaRegEx</td>
<td>password_java_regex</td>
<td>Password RegEx (Java)</td>
<td>The regular expression used by the back-end components for password validation. By default, strings with non-empty characters have a length of 5 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
Default: ^[\S]{5,30}$</td>
</tr>
<tr class="odd">
<td>PasswordJava<br />ScriptRegEx</td>
<td>password_java_<br />script_regex</td>
<td>Password RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for password validation.<br />
Default: ^[\S]{5,30}$</td>
</tr>
<tr class="even">
<td>PasswordJavaReg<br />ExViolationErrorMsg</td>
<td>password_java_reg<br />ex_violation_error_msg</td>
<td>Password RegEx Violation Error Message</td>
<td>Error message when the Password is not matched with passwordJavaRegEx<br />
Default: Password length should be within 5 to 30 characters</td></tr>
<tr class="odd">
<td>RolenameJavaRegEx</td>
<td>rolename_java_regex</td>
<td>Role Name RegEx (Java)</td>
<td>The regular expression used by the back-end components for role name validation. By default, strings with non-empty characters have a length of 3 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
Default: [a-zA-Z0-9._\-|//]{3,30}$</td>
</tr>
<tr class="odd">
<td>PasswordHashMethod</td>
<td>password_hash_method</td>
<td>Password Hashing Algorithm</td>
<td><p>Specifies the Password Hashing Algorithm used the hash the password before storing in the userstore.<br />
Possible values:<br />
SHA - Uses SHA digest method. SHA-1, SHA-256<br />
MD5 - Uses MD 5 digest method.<br />
PLAIN_TEXT - Plain text passwords.(Default)</p>
<p>If you just configure as SHA, It is considered as SHA-1, It is always better to configure algorithm with higher bit value as digest bit size would be increased.<br />
<br />
Most of the LDAP servers (such as OpenLdap, OpenDJ, AD, ApacheDS and etc.) are supported to store passwords as salted hashed values (SSHA).<br />
Therefore, the WSO2 IS requires the password fed in to the connected userstore as a plain text value. Then the LDAP userstore can store them as a salted hashed value. To feed the plain text into the LDAP server, you need to set PasswordHashMethod to “PLAIN_TEXT”.<br />
However, if your LDAP does not support storing user passwords as hashed values you can configure the WSO2 server to hash the password and feed the hashed password into the LDAP server. To do this, you need to configure the PasswordHashMethod property with SHA (SHA-1), SHA-256, SHA-512. WSO2 server cannot create a salted hashed password (SSHA) to feed into the LDAP.</p></td>
</tr>
<tr class="even">
<td>MultiAttributeSeparator</td>
<td>multi_attribute_separator</td>
<td>Multiple Attribute Separator</td>
<td>This property is used to define a character to separate multiple attributes. This ensures that it will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but you can define ",,," or "...", or a similar character sequence.<br />
Default: “,”</td>
</tr>
<tr class="odd">
<td>MaxUserName<br>ListLength </td>
<td>max_user_name_<br />list_length</td>
<td>Maximum User List Length</td>
<td>This controls the number of users listed in the userstore. This is useful when you have a large number of users and don't want to list them all. Setting this property to 0, displays all users.<br />
Default: 100<br />
<br />
In some userstores, there are policies to limit the number of records that can be returned from the query. Setting the value to 0, will list the maximum results returned by the userstore. If you need to increase this, you need to set it in the userstore level.<br />
Eg : Active directory has the MaxPageSize property with the default value 1000.</td>
</tr>
<tr class="even">
<td>MaxRoleName<br>ListLength</td>
<td>max_role_name_<br />list_length</td>
<td>Maximum Role List Length</td>
<td><p>This controls the number of roles listed in the userstore. This is useful when you have a large number of roles and don't want to list them all. Setting this property to 0, displays all roles.<br />
Default: 100<br />
<br />
In some userstores, there are policies to limit the number of records that can be returned from the query. Setting the value to 0, will list the maximum results returned by the userstore. If you need to increase this, you need to set it in the userstore level.</p>
<p>Eg: Active directory has the MaxPageSize property with the default value 1000.</p></td>
</tr>
<tr class="odd">
<td>kdcEnabled</td>
<td>kdc_enabled</td>
<td>Enable KDC</td>
<td>If your userstore is capable of acting as a Kerberos Key Distribution Center (KDC) and if you need to enable it, set this property to <code>true</code>.<br />
Default: false</td>
</tr>
<tr class="even">
<td>UserRoles<br />CacheEnabled</td>
<td>user_roles_<br />cache_enabled</td>
<td>Enable User Role Cache</td>
<td>This is to indicate whether to cache the role list of a user.<br />
Default: true<br />
<br />
Possible values:<br />
false: Set it to false if the user roles are changed by external means and those changes should be instantly reflected in the Carbon instance
<br />
Default: true<br /></td>
</tr>
<tr class="odd">
<td>Connection<br />PoolingEnabled</td>
<td>connection_<br />pooling_enabled</td>
<td>Enable LDAP Connection Pooling</td>
<td>Define whether LDAP connection pooling is enabled<br />
Possible values:<br />
True: Enables connection pooling which will improve the performance<br />
False: Disables connection pooling
<br />
Default: false<br /></td>
</tr>
<tr class="even">
<td>LDAPConnectionT<br>imeout</td>
<td>ldap_connection<br>_timeout</td>
<td>LDAP Connection Timeout</td>
<td>Timeout in making the initial LDAP connection which is configured in milliseconds<br />
Default: 5000</td>
</tr>
<tr class="odd">
<td>ReadTimeout</td>
<td>read_timeout</td>
<td>LDAP Read Timeout</td>
<td>The value of this property is the read timeout in milliseconds for LDAP operations. If the LDAP provider cannot get a LDAP response within that period, it aborts the read attempt. The integer should be greater than zero. An integer less than or equal to zero means no read timeout is specified which is equivalent to waiting for the response infinitely until it is received.
<br />
Default: not configured</td>
</tr>
<tr class="even">
<td>Membership<br />AttributeRange</td>
<td>membership_<br />attribute_range</td>
<td>Membership Attribute Range</td>
<td><p>This is to define the maximum users of role returned by the LDAP/AD userstore. This does not depend on the max page size of the userstore.</p>
<p>Default: 1500</p></td>
</tr>
<tr class="odd">
<td>RetryAttempts</td>
<td>retry_attempts</td>
<td>Retry Attempts</td>
<td>Retry the authentication request if a timeout happened
<p>Default: not configured</p></td>
</tr>
<tr class="even">
<td>UserIdSearchFilter</td>
<td>user_id_search_filter</td>
<td>UserID Search Filter</td>
<td>This is a filtering criteria that is used to search a user entry.<br />
<p>Default : (&amp;(objectClass=person)(uid=?))</p></td>
</tr>
<tr class="even">
<td>java.naming.ldap.attributes.binary</td>
<td>ldap_binary_attributes</td>
<td>LDAP Binary Attributes</td>
<td>Configure this to define the LDAP binary attributes separated by a space.
<p>Default: not configured</p></td>
</tr>
<tr class="odd">
<td>ImmutableAttributes</td>
<td>immutable_attributes</td>
<td>Immutable Attributes</td>
<td>This is a comma-separated list of immutable attributes that are maintained in the userstore.
<p>Default: not configured</p></td>
</tr>
<tr class="even">
<td>TimestampAttributes</td>
<td>timestamp_attributes</td>
<td>Timestamp Attributes</td>
<td>This is a comma-separated list of userstore attributes that have the data type of Timestamp and may require a 
conversion when reading from/writing to a userstore.
<p>Default: not configured</p></td>
</tr>
</tbody>
</table>


!!! info "Related topics"
    -   [Deploy: Configure the Primary Userstore]({{base_path}}/deploy/configure-the-primary-user-store)
    -   [Deploy: Configure Secondary Userstores]({{base_path}}/deploy/configure-secondary-user-stores)
