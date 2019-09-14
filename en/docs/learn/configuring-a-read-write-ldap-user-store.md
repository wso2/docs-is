# Configuring a Read-write LDAP User Store

!!! tip "Before you begin!"
    
    Please read following topics:
    
    -   [Configuring User Stores](../../using-wso2-identity-server/configuring-user-stores)
    -   [Configuring the Primary User
        Store](../../using-wso2-identity-server/configuring-the-primary-user-store)
    -   [Configuring the Secondary User
        Store](../../using-wso2-identity-server/configuring-secondary-user-stores)
    

Read-write LDAP user store manager configured with
**`          org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager         `**
user store manager class.

In this page, you can find information on:

### Properties used in Read-write LDAP userstore manager

<table>
<thead>
<tr class="header">
<th>Property Name</th>
<th>Display Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>DomainName</td>
<td>Domain Name</td>
<td>Unique name to identify the user store. This should be configured only for secondary user stores.</td>
</tr>
<tr class="even">
<td>connection_url</td>
<td>Connection URL</td>
<td><p>This is the Connection URL to the user store server. In the case of default LDAP in Carbon, the port is specified in the carbon.xml file, and a reference to that port is included in this configuration.</p>
<p>Sample values:<br />
<a href="ldap://10.100.1.100:389">ldap://10.100.1.100:389</a><br />
<a href="ldaps://10.100.1.102:639">ldaps://10.100.1.102:639</a><br />
<br />
If you are connecting over ldaps (secured LDAP), you need to import the certificate of user store to the client-truststore.jks of the WSO2 product. For information on how to add certificates to the truststore and how keystores are configured and used in a system, see Using Asymmetric Encryption.<br />
<a href="(../../administer/using-asymmetric-encryption)">using asymmetric encryption</a><br />
<br />
If LDAP connection pooling is used, see enable connection pooling for LDAPS connections.<br />
<a href="(../../administer/performance-tuning#performance-tuning-ldaps-pooling)">performance tuning ldaps pooling</a></p></td>
</tr>
<tr class="odd">
<td>connection_name </td>
<td>Connection Name</td>
<td><p>The username used to connect to the user store and perform various operations. This user does not need to be an administrator in the user store or have an administrator role in the WSO2 product that you are using, but this user MUST have permissions to read the user list and users' attributes and to perform search operations on the user store. The value you specify is used as the DN (Distinguish Name) attribute of the user who has sufficient permissions to perform operations on users and roles in LDAP</p>
<p>This property is mandatory.</p>
<p>Sample values: uid=admin,ou=system</p></td>
</tr>
<tr class="even">
<td>connection_password</td>
<td>Connection Password</td>
<td>Password for the ConnectionName user.</td>
</tr>
<tr class="odd">
<td>user_search_base</td>
<td>User Search Based</td>
<td><p>DN of the context or object under which the user entries are stored in the user store. When the user store searches for users, it will start from this location of the directory</p>
<p>Sample values: ou=Users,dc=wso2,dc=org</p></td>
</tr>
<tr class="even">
<td>user_entry_object_class</td>
<td>User Entry Object Class</td>
<td><p>Object class used to construct user entries.</p>
<p>Default: wso2Person (Is a custom object class defined in WSO2 products)</p></td>
</tr>
<tr class="odd">
<td>user_name_attribute</td>
<td>Username Attribute</td>
<td><p>The attribute used for uniquely identifying a user entry. Users can be authenticated using their email address, UID, etc. The name of the attribute is considered as the username.</p>
<p>Sample values:uid</p>
<p>Note: email address is considered as a special case in all WSO2 products. If you want to set the email address as username, see <a href="(../../using-wso2-identity-server/using-email-address-as-the-username)">using email address as the username</a></p></td>
</tr>
<tr class="even">
<td>user_name_search_filter</td>
<td>User Search Filter</td>
<td><p>Filtering criteria used to search for a particular user entry.</p>
<p>Sample values: (&amp;amp;(objectClass=person)(uid=?))</p></td>
</tr>
<tr class="odd">
<td>user_name_list_filter</td>
<td>User List Filter</td>
<td><p>Filtering criteria for searching user entries in the user store. This query or filter is used when doing search operations on users with different search attributes.<br />
<br />
Sample values: (objectClass=person)</p>
<p>In this case, the search operation only provides the objects created from the person object class.</p></td>
</tr>
<tr class="even">
<td>UserDNPattern</td>
<td>User DN Pattern</td>
<td><p>The pattern for the user's DN, which can be defined to improve the search. When there are many user entries in the LDAP user store, defining a UserDNPattern provides more impact on performances as the LDAP does not have to traverse through the entire tree to find users.</p>
<p>Sample values: uid={0},ou=Users,dc=wso2,dc=org</p></td>
</tr>
<tr class="odd">
<td>display_name_attribute </td>
<td>Display name attribute</td>
<td>This is an optional property. The Display Name Attribute is the name by which users will be listed when you list users in the management console.</td>
</tr>
<tr class="even">
<td>Disabled</td>
<td>Disabled</td>
<td><p>This is to deactivate the user store. If you need to temporarily deactivate a user store, you can use this option. If you disable the user store from the disable option it also will set this parameter.</p>
<p>Default: false<br />
<br />
Possible values:<br />
true : Disable user store temporarily.</p></td>
</tr>
<tr class="odd">
<td>read_groups</td>
<td>Read Groups</td>
<td>When WriteGroups is set to 'false', this Indicates whether groups should be read from the user store. If this is disabled by setting it to 'false', none of the groups in the user store can be read, and the following group configurations are NOT mandatory: GroupSearchBase, GroupNameListFilter, or GroupNameAttribute.<br />
<br />
Possible values:<br />
true: Read groups from user store<br />
false: Do not read groups from user store</td>
</tr>
<tr class="even">
<td>write_groups </td>
<td>Write Groups</td>
<td>Indicates whether groups should be written to the user store.<br />
<br />
Possible values:<br />
true: Write groups to user store<br />
false: Do not write groups to user store, so only internal roles can be created. Depending on the value of ReadGroups property, it will read existing groups from user store or not</td>
</tr>
<tr class="odd">
<td>group_search_base</td>
<td>Group Search Base</td>
<td><p>DN of the context or object under which the group entries are stored in the user store. When the user store searches for groups, it will start from this location of the directory.</p>
<p>Sample values: ou=Groups,dc=wso2,dc=org</p></td>
</tr>
<tr class="even">
<td>group_entry_object_class</td>
<td>Group Entry Object Class</td>
<td><p>Object class used to construct group entries.</p>
<p>Sample values: groupOfNames</p></td>
</tr>
<tr class="odd">
<td>group_name_search_filter </td>
<td>Group Search Filter</td>
<td><p>Filtering criteria used to search for a particular group entry.</p>
<p>Sample values: (&amp;amp;(objectClass=groupOfNames)(cn=?))</p></td>
</tr>
<tr class="even">
<td>group_name_list_filter </td>
<td>Group List Filter</td>
<td><p>Filtering criteria for searching group entries in the user store. This query or filter is used when doing search operations on groups with different search attributes.</p>
<p>Sample values: ((objectClass=groupOfNames)).</p>
<p>In this case, the search operation only provides the objects created from the groupOfName object class.</p></td>
</tr>
<tr class="odd">
<td>RoleDNPattern</td>
<td>Role DN Pattern</td>
<td><p>The pattern for thegroups'sDN, which can be defined to improve the search. When there are many group entries in the LDAP user store, defining a RoleDNPattern provides more impact on performances as the LDAP does not have to travel through the entire tree to find groups.</p>
<p>Sample values: cn={0},ou=Groups,dc=wso2,dc=org</p></td>
</tr>
<tr class="even">
<td>membership_attribute</td>
<td>Membership Attribute</td>
<td><p>Define the attribute that contains the distinguished names (DN) of user objects that are in a group.</p>
<p>Possible values: member</p></td>
</tr>
<tr class="odd">
<td>MemberOfAttribute</td>
<td>Member Of Attribute</td>
<td>Define the attribute that contains the distinguished names (DN) of group objects that user is assigned to.<br />
Possible values: memberOf</td>
</tr>
<tr class="even">
<td>back_links_enabled</td>
<td>Enable Back Links</td>
<td>Define whether the backlink support is enabled. If you are using MemberOfAttribute attributes this should be set to true.</td>
</tr>
<tr class="odd">
<td>username_java_regex</td>
<td>Username RegEx (Java)</td>
<td><p>The regular expression used by the back-end components for username validation. By default, strings with non-empty characters have a length of 3 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
<p>Default: [a-zA-Z0-9._-|//]{3,30}$</p></td>
</tr>
<tr class="even">
<td>username_javascript_regex</td>
<td>Username RegEx (Javascript)</td>
<td><p>The regular expression used by the front-end components for username validation.</p>
<p>Default: ^[\S]{3,30}$</p></td>
</tr>
<tr class="odd">
<td>username_java_regex_violation_error_msg</td>
<td>Username RegEx Violation Error Message</td>
<td>Error message when the Username is not matched with UsernameJavaRegEx</td>
</tr>
<tr class="even">
<td>PasswordJavaRegEx</td>
<td>Password RegEx (Java)</td>
<td><p>The regular expression used by the back-end components for password validation. By default, strings with non-empty characters have a length of 5 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
<p>Default: ^[\S]{5,30}$</p></td>
</tr>
<tr class="odd">
<td>password_java_regex</td>
<td>Password RegEx (Javascript)</td>
<td><p>The regular expression used by the front-end components for password validation.</p>
<p>Default: ^[\S]{5,30}$</p></td>
</tr>
<tr class="even">
<td>password_java_regex_violation_error_msg</td>
<td>Password RegEx Violation Error Message</td>
<td>Error message when the Password is not matched with passwordJavaRegEx</td>
</tr>
<tr class="odd">
<td>rolename_java_regex</td>
<td>Role Name RegEx (Java)</td>
<td><p>The regular expression used by the back-end components for role name validation. By default, strings with non-empty characters have a length of 3 to 30 allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
<p>Default: [a-zA-Z0-9._-|//]{3,30}$</p></td>
</tr>
<tr class="even">
<td>rolename_javascript_regex</td>
<td>Role Name RegEx (Javascript)</td>
<td><p>The regular expression used by the front-end components for role name validation.</p>
<p>Default: ^[\S]{3,30}$</p></td>
</tr>
<tr class="odd">
<td>scim_enabled</td>
<td>Enable SCIM</td>
<td>This is to configure whether user store is supported for SCIM provisioning.<br />
<br />
Possible values:<br />
True : User store support for SCIM provisioning.<br />
False: User does not store support for SCIM provisioning.</td>
</tr>
<tr class="even">
<td>is_bulk_import_supported</td>
<td>Bulk Import Support</td>
<td>Define whether the user store support for bulk user import operation</td>
</tr>
<tr class="odd">
<td>empty_roles_allowed</td>
<td>Allow Empty Roles</td>
<td>Specifies whether the underlying user store allows empty groups to be created. In the case of LDAP in Carbon, the schema is modified such that empty groups are allowed to be created. Usually, LDAP servers do not allow you to create empty groups.</td>
</tr>
<tr class="even">
<td>password_hash_method </td>
<td>Password Hashing Algorithm</td>
<td><p>Specifies the Password Hashing Algorithm used the hash the password before storing in the user store.</p>
<p>Possible values:<br />
SHA - Uses SHA digest method. SHA-1, SHA-256<br />
MD5 - Uses MD 5 digest method.<br />
PLAIN_TEXT - Plain text passwords.</p>
<p>If you just configure as SHA, it is considered as SHA-1. It is always better to configure algorithm with higher bit value as digest bit size would be increased.<br />
<br />
Most of the LDAP servers (such asOpenLdap, OpenDJ, AD, ApacheDS and etc..) are supported to store passwords as salted hashed values (SSHA). Therefore WSO2 Identity Server just wants to feed password into the connected user store as plain text value. Then LDAP user store be can stored them as salted hashed value. To feed the plain text into the LDAP server, you need to set PasswordHashMethod to “PLAIN_TEXT”</p>
<p>However, if your LDAP does not support to store user password as hashed values. You can configureWSO2server to hash the password and feeds the hashed password into the LDAP server. Then you need to configure PasswordHashMethod property with SHA (SHA-1), SHA-256, SHA-512. Please note WSO2 server cannot create a salted hashed password (SSHA) to feed into the LDAP.</p></td>
</tr>
<tr class="odd">
<td>multi_attribute_separator</td>
<td>Multiple Attribute Separator</td>
<td>This property is used to define a character to separate multiple attributes. This ensures that it will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but you can define ",,," or "..." or a similar character sequence<br />
Default: “,”</td>
</tr>
<tr class="even">
<td>max_user_name_list_length</td>
<td>Maximum User List Length</td>
<td><p>Controls the number of users listed in the user store of a WSO2 product. This is useful when you have a large number of users and you do not want to list them all. Setting this property to 0, will display all users.<br />
Default: 100<br />
<br />
In some user stores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the user store. If you need to increase this number, you need to set it in the user store level.</p>
<p>Eg : Active directory has the MaxPageSize property with the default value of 1000.</p></td>
</tr>
<tr class="odd">
<td>max_role_name_list_length</td>
<td>Maximum Role List Length</td>
<td><p>Controls the number of roles listed in the user store of a WSO2 product. This is useful when you have a large number of roles and do not want to list them all. Setting this property to 0, displays all roles.</p>
<p>Default: 100<br />
<br />
In some user stores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the user store. If you need to increase this number, you need to set it in the user store level.</p>
<p>Eg : Active directory has the MaxPageSize property with the default value 1000.</p></td>
</tr>
<tr class="even">
<td>kdc_enabled</td>
<td>Enable KDC</td>
<td><p>If your user store is capable of acting as a Kerberos, Key Distribution Center (KDC) and if you like to enable it, set this property to true.</p>
<p>Default: false</p></td>
</tr>
<tr class="odd">
<td>user_roles_cache_enabled</td>
<td>Enable User Role Cache</td>
<td>This is to indicate whether to cache the role list of a user.<br />
Default: true<br />
<br />
Possible values:<br />
false: Set it to 'false' if the user roles are changed by external means and those changes should be instantly reflected in the Carbon instance.</td>
</tr>
<tr class="even">
<td>connection_pooling_enabled</td>
<td>Enable LDAP Connection Pooling</td>
<td><p>Define whether LDAP connection pooling is enabled.</p>
<p>Possible values:<br />
True: Enable connection pooling. Enabling it will improve the performance<br />
False: Disable connection pooling.</p></td>
</tr>
<tr class="odd">
<td>ldap_connection_timeout </td>
<td>LDAP Connection Timeout</td>
<td><p>Timeout in making the initial LDAP connection. This is configured in milliseconds.</p>
<p>Default: 5000</p></td>
</tr>
<tr class="even">
<td>read_timeout</td>
<td>LDAP Read Timeout</td>
<td><p>The value of this property is the read timeout in milliseconds for LDAP operations. If the LDAP provider cannot geta LDAPresponse within that period, it aborts the read attempt. The integer should be greater than zero. An integer less than or equal to zero means no read timeout is specified which is equivalent to waiting for the response infinitely until it is received.</p>
<p>Default: 5000</p></td>
</tr>
<tr class="odd">
<td>retry_attempts</td>
<td>Retry Attempts</td>
<td><p>Retry the authentication request if a timeout happened.</p>
<p>Default: 0</p></td>
</tr>
<tr class="even">
<td>CountRetrieverClass</td>
<td>Count Implementation</td>
<td><p>This define the user / role count retriever implementation class (Only supported for )</p>
<p>Possible values:<br />
JDBC : <code>              org.wso2.carbon.identity.user.store.count.jdbc.JDBCUserStoreCountRetriever             </code></p></td>
</tr>
<tr class="odd">
<td>java.naming.ldap.attributes.binary</td>
<td>LDAP binary attributes</td>
<td>Set the attribute that needs to be stored in the binary format.<br />
Sample values: objectGUID</td>
</tr>
<tr class="even">
<td>MembershipAttributeRange</td>
<td>Membership Attribute Range</td>
<td><p>This is to define the maximum users of role returned by the LDAP/AD user store. This does not depend on the max page size of the user store.</p>
<p>Default: 1500</p></td>
</tr>
<tr class="odd">
<td>tenant_manager</td>
<td><br />
</td>
<td><p>Define the tenant manager class specific to each user store type. This is only for primary user store manager since its shared among tenants.</p>
<p>JDBC: <code>              org.wso2.carbon.user.core.tenant.JDBCTenantManager             </code><br />
LDAP/AD: <code>              org.wso2.carbon.user.core.tenant.CommonHybridLDAPTenantManager             </code></p></td>
</tr>
</tbody>
</table>

###  Sample configuration for Read-write LDAP user store

??? note "Read-write LDAP sample configuration"
    ``` xml
        [user_store]
        type = "read_write_ldap"
        connection_url = "ldap://ldap.example.com:389"
        connection_name = "uid=admin,ou=wso2is"
        connection_password = "$secret{ldap_password}"
        base_dn = "dc=example,dc=com"
        class = "org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager"
        tenant_manager  =  "org.wso2.carbon.user.core.tenant.CommonHybridLDAPTenantManager"
        anonymous_bind  =  false
        user_search_base  =  "ou"
        user_entry_object_class  =  "identityPerson"
        user_name_attribute  =  "uid"
        user_name_search_filter  =  "(&amp;(objectClass=person)(uid=?))"
        user_name_list_filter  =  "(objectClass=person)"
        display_name_attribute  =  ""
        read_groups  =  true
        write_groups  =  true
        group_search_base  =  "ou=Groups,dc=wso2,dc=org"
        group_entry_object_class  =  "groupOfNames"
        group_name_attribute  =  "cn"
        group_name_search_filter  =  "(&amp;(objectClass=groupOfNames)(cn=?))"
        group_name_list_filter  =  "(objectClass=groupOfNames)"
        membership_attribute  =  "member"
        back_links_enabled  =  false
        scim_enabled  =  true
        is_bulk_import_supported  =  true
        empty_roles_allowed  =  true
        password_hash_method  =  "PLAIN_TEXT"
        multi_attribute_separator  =  ","
        max_user_name_list_length  =  100
        max_role_name_list_length  =  100
        kdc_enabled  =  false
        default_realm_name  =  "WSO2.ORG"
        user_roles_cache_enabled  =  true
        connection_pooling_enabled  =  false
        ldap_connection_timeout  =  5000
        read_timeout   =   ""
        retry_attempts   =   ""
        start_tls_enabled  =  false
        username_java_regex  =  "[a-zA-Z0-9._\-|//]{3,30}$"
        rolename_java_regex  =  "[a-zA-Z0-9._\-|//]{3,30}$"
        username_javascript_regex = "^[\S]{3,30}$"
        username_java_regex_violation_error_msg = "Username pattern policy violated"
        password_java_regex = "^[\S]{5,30}$"
        password_javascript_regex = "^[\S]{5,30}$"
        password_java_regex_violation_error_msg = "Password length should be within 5 to 30 characters"
        rolename_javascript_regex = "^[\S]{3,30}$"
    ```

  
