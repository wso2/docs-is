# Configuring a JDBC User Store

JDBC user store manager is configured with
**`          org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager         `**
user store manager class. By default, the WSO2 product database contains
user store tables. When you configure a RDBMS (JDBC) user store, you can
use internal user store tables or you can use an external database as a
user store. If you going to use default user store tables, see [User
Management Related Tables](../../administer/user-management-related-tables) section.

!!! tip "Before you begin!"  
    Please read following topics:
    -   Read [Configuring User Stores](../../learn/configuring-user-stores) to get a
        high-level understanding of the user stores available in WSO2
        Identity Server (WSO2 IS).
    -   If you want to configure a primary user store, you need to follow
        the steps given in [Configuring the Primary User
        Store](../../learn/configuring-the-primary-user-store).
    -   If you want to configure a secondary user store, you need to follow
        the steps given in [Configuring Secondary User
        Stores](../../learn/configuring-secondary-user-stores).
    

  
In this page, you can find following details related to configuring a
JDBC user store.

### Properties used in JDBC userstore manager

Following are the properties used in JDBC user store manager:

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
<td>DomainName</td>
<td>Unique name to identify the user store. This should only be configured for secondary user stores.</td>
</tr>
<tr class="even">
<td>url</td>
<td>Connection URL</td>
<td>Connection URL to the database which can include additional connection parameters as well<br />
Sample values: jdbc: <a href="mysql://localhost:3306/wso2is">mysql://localhost:3306/wso2is</a></td>
</tr>
<tr class="odd">
<td>username</td>
<td>Connection Name</td>
<td>The username used to connect to database and perform various operations. This user does not have to be an administrator in the database or have an administrator role in the WSO2 product that you are using, but this user MUST have privileges to do required operation.</td>
</tr>
<tr class="even">
<td>password</td>
<td>Connection Password</td>
<td>Password for the ConnectionName user.</td>
</tr>
<tr class="odd">
<td>driverName</td>
<td>Driver Name</td>
<td>JDBC driver name which used to connect to the database. This driver should be available in the &lt;PRODUCT_HOME&gt;/repository/components/lib folder.</td>
</tr>
<tr class="even">
<td>Disabled</td>
<td>Disabled</td>
<td>This is to deactivate the user store. If you need to temporarily deactivate a user store, you can use this option. If you disable the user store from the disable option, it also will set this parameter. (Default: false)<br />
<br />
Possible values:<br />
true: Disable user store temporarily.</td>
</tr>
<tr class="odd">
<td>read_only </td>
<td>Read-Only</td>
<td>Indicates whether user store operates in the read-only mode or not.<br />
Possible values:<br />
true: Operates in read-only mode<br />
false: Operates in read-write mode</td>
</tr>
<tr class="even">
<td>read_groups</td>
<td>ReadGroups</td>
<td>When WriteGroups is set to false, it Indicates whether groups should be read from the user store. If this is disabled by setting it to false, none of the groups in the user store can be read, and the following group configurations are NOT mandatory: GroupSearchBase, GroupNameListFilter, or GroupNameAttribute.<br />
<br />
Possible values:<br />
true: Read groups from user store<br />
false: Do not read groups from user store</td>
</tr>
<tr class="odd">
<td>write_groups</td>
<td>WriteGroups</td>
<td>Indicates whether groups should be written to the user store.<br />
<br />
Possible values:<br />
true : Write groups to user store<br />
false : Do not write groups to user store, so only internal roles can be created. Depending on the value of ReadGroups property, it will read existing groups from user store or not</td>
</tr>
<tr class="even">
<td>username_java_regex  </td>
<td>Username RegEx (Java)</td>
<td>The regular expression used by the back-end components for username validation. By default, strings with non-empty characters have a length of 3 to 30 are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
Default: [a-zA-Z0-9._-|//]{3,30}$</td>
</tr>
<tr class="odd">
<td>username_javascript_regex</td>
<td>Username RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for username validation. Default: ^[\S]{3,30}$</td>
</tr>
<tr class="even">
<td>username_java_regex_violation_error_msg</td>
<td>Username RegEx Violation Error Message</td>
<td>Error message when the Username is not matched with username_java_regex </td>
</tr>
<tr class="odd">
<td>PasswordJavaRegEx</td>
<td>Password RegEx (Java)</td>
<td>The regular expression used by the back-end components for password validation. By default, strings with non-empty characters have a length of 5 to 30 are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
Default: ^[\S]{5,30}$</td>
</tr>
<tr class="even">
<td>password_java_regex  </td>
<td>Password RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for password validation.<br />
Default: ^[\S]{5,30}$</td>
</tr>
<tr class="odd">
<td>password_java_regex_violation_error_msg</td>
<td>Password RegEx Violation Error Message</td>
<td>Error message when the Password is not matched with passwordJavaRegEx</td>
</tr>
<tr class="even">
<td>rolename_java_regex</td>
<td>Role Name RegEx (Java)</td>
<td>The regular expression used by the back-end components for role name validation. By default, strings with non-empty characters have a length of 3 to 30 are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.<br />
Default: [a-zA-Z0-9._-|//]{3,30}$</td>
</tr>
<tr class="odd">
<td>rolename_javascript_regex</td>
<td>Role Name RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for role name validation. Default: ^[\S]{3,30}$</td>
</tr>
<tr class="even">
<td>case_insensitive_username</td>
<td>Case Insensitive Username</td>
<td><p>Indicates whether the user name should be case insensitive or not.<br />
Default: false<br />
<br />
Possible values:<br />
true: If you are not using case-sensitive usernames better to configure this. Please note that enabling this could lead to performance degradation when searching for users as the number of users increases.</p></td>
</tr>
<tr class="odd">
<td>scim_enabled </td>
<td>Enable SCIM</td>
<td>This is to configure whether user store is supported for SCIM provisioning.<br />
<br />
Possible values:<br />
True : User store support for SCIM provisioning.<br />
False : User does not store support for SCIM provisioning.</td>
</tr>
<tr class="even">
<td>is_bulk_import_supported </td>
<td>Bulk Import Support</td>
<td>Define whether the userstore support for bulk user import operation</td>
</tr>
<tr class="odd">
<td>password_digest</td>
<td>Password Hashing Algorithm</td>
<td><div class="content-wrapper">
<p>Specifies the Password Hashing Algorithm used the hash the password before storing in the user store.<br />
Possible values:<br />
SHA - Uses SHA digest method. SHA-1, SHA-256<br />
MD5 - Uses MD 5 digest method.<br />
PLAIN_TEXT - Plain text passwords.</p>
<div class="admonition note">
<p class="admonition-title">Note</p>
    <p>If you enter SHA as the value, it is considered as SHA-1. It is always better to configure an algorithm with a higher bit value so that the digest bit size is higher.</p></div>
</div></td>
</tr>
<tr class="even">
<td>multi_attribute_separator</td>
<td>Multiple Attribute Separator</td>
<td>This property is used to define a character to separate multiple attributes. This ensures that it will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but you can define ",,," or "..." or a similar character sequence<br />
Default: “,”</td>
</tr>
<tr class="odd">
<td>store_salted_password  </td>
<td>Enable Salted Passwords</td>
<td><div class="content-wrapper">
Indicates whether to stores the password with salted value<br />
Default: true<br />
Possible values: false<br />

<p>By default WSO2 IS stores the password with a salted value. The recommended way to protect passwords is to use salted password hashing. Once it is salted, the passwords are less vulnerable to dictionary and brute force attacks.</p>
<p>Setting this property to false causes passwords to be stored without a salted value. This means that if two users (Bob and Alice) have the same password, it is stored as the same hash value.</p>
<p><img src="../assets/img/using-wso2-identity-server/enable-salted-passwords.png" /></p>
<p>However, if salted passwords are used, WSO2 IS adds a random value to the password and then generates the hash of the password. Therefore if two users have the same password, they would be stored as different hashed values. This is a more secure method of storing passwords.</p>
</div></td>
</tr>
<tr class="even">
<td>max_user_name_list_length</td>
<td>Maximum User List Length</td>
<td>Controls the number of users listed in the user store of a WSO2 product. This is useful when you have a large number of users and do not want to list them all. Setting this property to 0 displays all users. (Default: 100)<br />
<br />
In some user stores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the user store. If you need to increase this number, you need to set it in the user store level.<br />
Eg: Active directory has the MaxPageSize property with the default value of 1000.</td>
</tr>
<tr class="odd">
<td>max_role_name_list_length</td>
<td>Maximum Role List Length</td>
<td>Controls the number of roles listed in the user store of a WSO2 product. This is useful when you have a large number of roles and do not want to list them all. Setting this property to 0 displays all roles. (Default: 100)<br />
<br />
In some user stores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the user store. If you need to increase this number, you need to set it in the user store level.<br />
Eg: Active directory has the MaxPageSize property with the default value of 1000.</td>
</tr>
<tr class="even">
<td>user_roles_cache_enabled</td>
<td>Enable User Role Cache</td>
<td>This is to indicate whether to cache the role list of a user. (Default: true)<br />
<br />
Possible values:<br />
false: Set it to false if the user roles are changed by external means and those changes should be instantly reflected in the Carbon instance.</td>
</tr>
<tr class="odd">
<td>tenant_manager</td>
<td><br />
</td>
<td>Define the tenant manager class specific to each user store type. This is only used in primary user store since its shared among tenants.<br />
JDBC : <code>             org.wso2.carbon.user.core.tenant.JDBCTenantManager            </code><br />
LDAP / AD : <code>             org.wso2.carbon.user.core.tenant.CommonHybridLDAPTenantManager            </code></td>
</tr>
<tr class="even">
<td>CountRetrieverClass</td>
<td>Count Implementation</td>
<td><p>This defines the user /role count retriever implementation class (Only supported for)<br />
</p>
<p>Possible values:<br />
JDBC : <code>              org.wso2.carbon.identity.user.store.count.jdbc.JDBCUserStoreCountRetriever             </code><br />
</p></td>
</tr>
</tbody>
</table>

!!! note
    
    Addition to these properties, you can configure SQL queries that are
    used in JDBC user store manager and if required can change default
    queries. Those are not listed under this property section but you can
    see it in the sample configuration with default queries. If you do not
    change the default queries, you can remove those from the configuration
    file since those are defined in the user store manager implementation.
    

### Sample Configuration for JDBC User store manager

??? note "JDBC sample property without SQL queries"

    ``` xml
    <UserStoreManager class="org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager">
        <Property name="url">jdbc:mysql://localhost:3306/wso2is</Property>
        <Property name="userName">admin</Property>
        <Property encrypted="true" name="password">kuv2MubUUveMyv6GeHrXr9il59ajJIqUI4eoYHcgGKf/BBFOWn96NTjJQI+wYbWjKW6r79S7L7ZzgYeWx7DlGbff5X3pBN2Gh9yV0BHP1E93QtFqR7uTWi141Tr7V7ZwScwNqJbiNoV+vyLbsqKJE7T3nP8Ih9Y6omygbcLcHzg=</Property>
        <Property name="driverName">com.mysql.jdbc.Driver</Property>
        <Property name="Disabled">false</Property>
        <Property name="ReadOnly">false</Property>
        <Property name="ReadGroups">true</Property>
        <Property name="WriteGroups">true</Property>
        <Property name="UsernameJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="UsernameJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="UsernameJavaRegExViolationErrorMsg">Username pattern policy violated.</Property>
        <Property name="PasswordJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="PasswordJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="PasswordJavaRegExViolationErrorMsg">Password pattern policy violated.</Property>
        <Property name="RolenameJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="RolenameJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="CaseInsensitiveUsername">true</Property>
        <Property name="SCIMEnabled">true</Property>
        <Property name="IsBulkImportSupported">false</Property>
        <Property name="PasswordDigest">SHA-256</Property>
        <Property name="MultiAttributeSeparator">,</Property>
        <Property name="StoreSaltedPassword">true</Property>
        <Property name="MaxUserNameListLength">100</Property>
        <Property name="MaxRoleNameListLength">100</Property>
        <Property name="UserRolesCacheEnabled">true</Property>
        <Property name="UserNameUniqueAcrossTenants">false</Property>
        <Property name="validationQuery">SELECT 1</Property>
        <Property name="validationInterval">30000</Property>
        <Property name="CountRetrieverClass">org.wso2.carbon.identity.user.store.count.jdbc.JDBCUserStoreCountRetriever</Property>
        <Property name="DomainName">wso2.com.jdbc</Property>
        <Property name="Description">Sample JDBC user store configuration</Property>
    </UserStoreManager>
    ```

??? note "JDBC sample property with SQL queries"

    ``` xml
    <UserStoreManager class="org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager">
        <Property name="url">jdbc:mysql://localhost:3306/wso2is</Property>
        <Property name="userName">admin</Property>
        <Property encrypted="true" name="password">kuv2MubUUveMyv6GeHrXr9il59ajJIqUI4eoYHcgGKf/BBFOWn96NTjJQI+wYbWjKW6r79S7L7ZzgYeWx7DlGbff5X3pBN2Gh9yV0BHP1E93QtFqR7uTWi141Tr7V7ZwScwNqJbiNoV+vyLbsqKJE7T3nP8Ih9Y6omygbcLcHzg=</Property>
        <Property name="driverName">com.mysql.jdbc.Driver</Property>
        <Property name="Disabled">false</Property>
        <Property name="ReadOnly">false</Property>
        <Property name="ReadGroups">true</Property>
        <Property name="WriteGroups">true</Property>
        <Property name="UsernameJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="UsernameJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="UsernameJavaRegExViolationErrorMsg">Username pattern policy violated.</Property>
        <Property name="PasswordJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="PasswordJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="PasswordJavaRegExViolationErrorMsg">Password pattern policy violated.</Property>
        <Property name="RolenameJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="RolenameJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="CaseInsensitiveUsername">true</Property>
        <Property name="SCIMEnabled">true</Property>
        <Property name="IsBulkImportSupported">false</Property>
        <Property name="PasswordDigest">SHA-256</Property>
        <Property name="MultiAttributeSeparator">,</Property>
        <Property name="StoreSaltedPassword">true</Property>
        <Property name="MaxUserNameListLength">100</Property>
        <Property name="MaxRoleNameListLength">100</Property>
        <Property name="UserRolesCacheEnabled">true</Property>
        <Property name="UserNameUniqueAcrossTenants">false</Property>
        <Property name="validationQuery">SELECT 1</Property>
        <Property name="validationInterval">30000</Property>
        <Property name="CountRetrieverClass">org.wso2.carbon.identity.user.store.count.jdbc.JDBCUserStoreCountRetriever</Property>
        <Property name="SelectUserSQL">SELECT * FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?</Property>
        <Property name="SelectUserSQLCaseInsensitive">SELECT * FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?</Property>
        <Property name="GetRoleListSQL">SELECT UM_ROLE_NAME, UM_TENANT_ID, UM_SHARED_ROLE FROM UM_ROLE WHERE UM_ROLE_NAME LIKE ? AND UM_TENANT_ID=? AND UM_SHARED_ROLE ='0' ORDER BY UM_ROLE_NAME</Property>
        <Property name="GetSharedRoleListSQL">SELECT UM_ROLE_NAME, UM_TENANT_ID, UM_SHARED_ROLE FROM UM_ROLE WHERE UM_ROLE_NAME LIKE ? AND UM_SHARED_ROLE ='1' ORDER BY UM_ROLE_NAME</Property>
        <Property name="UserFilterSQL">SELECT UM_USER_NAME FROM UM_USER WHERE UM_USER_NAME LIKE ? AND UM_TENANT_ID=? ORDER BY UM_USER_NAME</Property>
        <Property name="UserFilterSQLCaseInsensitive">SELECT UM_USER_NAME FROM UM_USER WHERE LOWER(UM_USER_NAME) LIKE LOWER(?) AND UM_TENANT_ID=? ORDER BY UM_USER_NAME</Property>
        <Property name="UserRoleSQL">SELECT UM_ROLE_NAME FROM UM_USER_ROLE, UM_ROLE, UM_USER WHERE UM_USER.UM_USER_NAME=? AND UM_USER.UM_ID=UM_USER_ROLE.UM_USER_ID AND UM_ROLE.UM_ID=UM_USER_ROLE.UM_ROLE_ID AND UM_USER_ROLE.UM_TENANT_ID=? AND UM_ROLE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="UserRoleSQLCaseInsensitive">SELECT UM_ROLE_NAME FROM UM_USER_ROLE, UM_ROLE, UM_USER WHERE LOWER(UM_USER.UM_USER_NAME)=LOWER(?) AND UM_USER.UM_ID=UM_USER_ROLE.UM_USER_ID AND UM_ROLE.UM_ID=UM_USER_ROLE.UM_ROLE_ID AND UM_USER_ROLE.UM_TENANT_ID=? AND UM_ROLE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="UserSharedRoleSQL">SELECT UM_ROLE_NAME, UM_ROLE.UM_TENANT_ID, UM_SHARED_ROLE FROM UM_SHARED_USER_ROLE INNER JOIN UM_USER ON UM_SHARED_USER_ROLE.UM_USER_ID = UM_USER.UM_ID INNER JOIN UM_ROLE ON UM_SHARED_USER_ROLE.UM_ROLE_ID = UM_ROLE.UM_ID WHERE UM_USER.UM_USER_NAME = ? AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = UM_USER.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_ROLE_TENANT_ID = UM_ROLE.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = ? </Property>
        <Property name="UserSharedRoleSQLCaseInsensitive">SELECT UM_ROLE_NAME, UM_ROLE.UM_TENANT_ID, UM_SHARED_ROLE FROM UM_SHARED_USER_ROLE INNER JOIN UM_USER ON UM_SHARED_USER_ROLE.UM_USER_ID = UM_USER.UM_ID INNER JOIN UM_ROLE ON UM_SHARED_USER_ROLE.UM_ROLE_ID = UM_ROLE.UM_ID WHERE LOWER(UM_USER.UM_USER_NAME) = LOWER(?) AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = UM_USER.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_ROLE_TENANT_ID = UM_ROLE.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = ? </Property>
        <Property name="IsRoleExistingSQL">SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?</Property>
        <Property name="GetUserListOfRoleSQL">SELECT UM_USER_NAME FROM UM_USER_ROLE, UM_ROLE, UM_USER WHERE UM_ROLE.UM_ROLE_NAME=? AND UM_USER.UM_ID=UM_USER_ROLE.UM_USER_ID AND UM_ROLE.UM_ID=UM_USER_ROLE.UM_ROLE_ID AND UM_USER_ROLE.UM_TENANT_ID=? AND UM_ROLE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="GetUserListOfSharedRoleSQL">SELECT UM_USER_NAME FROM UM_SHARED_USER_ROLE INNER JOIN UM_USER ON UM_SHARED_USER_ROLE.UM_USER_ID = UM_USER.UM_ID INNER JOIN UM_ROLE ON UM_SHARED_USER_ROLE.UM_ROLE_ID = UM_ROLE.UM_ID WHERE UM_ROLE.UM_ROLE_NAME= ? AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = UM_USER.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_ROLE_TENANT_ID = UM_ROLE.UM_TENANT_ID</Property>
        <Property name="IsUserExistingSQL">SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?</Property>
        <Property name="IsUserExistingSQLCaseInsensitive">SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?</Property>
        <Property name="GetUserPropertiesForProfileSQL">SELECT UM_ATTR_NAME, UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND UM_USER.UM_USER_NAME=? AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="GetUserPropertiesForProfileSQLCaseInsensitive">SELECT UM_ATTR_NAME, UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND LOWER(UM_USER.UM_USER_NAME)=LOWER(?) AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="GetUserPropertyForProfileSQL">SELECT UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND UM_USER.UM_USER_NAME=? AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="GetUserPropertyForProfileSQLCaseInsensitive">SELECT UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND LOWER(UM_USER.UM_USER_NAME)=LOWER(?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="GetUserLisForPropertySQL">SELECT UM_USER_NAME FROM UM_USER, UM_USER_ATTRIBUTE WHERE UM_USER_ATTRIBUTE.UM_USER_ID = UM_USER.UM_ID AND UM_USER_ATTRIBUTE.UM_ATTR_NAME =? AND UM_USER_ATTRIBUTE.UM_ATTR_VALUE LIKE ? AND UM_USER_ATTRIBUTE.UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?</Property>
        <Property name="GetProfileNamesSQL">SELECT DISTINCT UM_PROFILE_ID FROM UM_USER_ATTRIBUTE WHERE UM_TENANT_ID=?</Property>
        <Property name="GetUserProfileNamesSQL">SELECT DISTINCT UM_PROFILE_ID FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="GetUserProfileNamesSQLCaseInsensitive">SELECT DISTINCT UM_PROFILE_ID FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="GetUserIDFromUserNameSQL">SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?</Property>
        <Property name="GetUserIDFromUserNameSQLCaseInsensitive">SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?</Property>
        <Property name="GetUserNameFromTenantIDSQL">SELECT UM_USER_NAME FROM UM_USER WHERE UM_TENANT_ID=?</Property>
        <Property name="GetTenantIDFromUserNameSQL">SELECT UM_TENANT_ID FROM UM_USER WHERE UM_USER_NAME=?</Property>
        <Property name="GetTenantIDFromUserNameSQLCaseInsensitive">SELECT UM_TENANT_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?)</Property>
        <Property name="AddUserSQL">INSERT INTO UM_USER (UM_USER_NAME, UM_USER_PASSWORD, UM_SALT_VALUE, UM_REQUIRE_CHANGE, UM_CHANGED_TIME, UM_TENANT_ID) VALUES (?, ?, ?, ?, ?, ?)</Property>
        <Property name="AddUserToRoleSQL">INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?), ?)</Property>
        <Property name="AddUserToRoleSQLCaseInsensitive">INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?), ?)</Property>
        <Property name="AddRoleSQL">INSERT INTO UM_ROLE (UM_ROLE_NAME, UM_TENANT_ID) VALUES (?, ?)</Property>
        <Property name="AddSharedRoleSQL">UPDATE UM_ROLE SET UM_SHARED_ROLE = ? WHERE UM_ROLE_NAME = ? AND UM_TENANT_ID = ?</Property>
        <Property name="AddRoleToUserSQL">INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), ?)</Property>
        <Property name="AddSharedRoleToUserSQL">INSERT INTO UM_SHARED_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_USER_TENANT_ID, UM_ROLE_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), ?, ?)</Property>
        <Property name="AddSharedRoleToUserSQLCaseInsensitive">INSERT INTO UM_SHARED_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_USER_TENANT_ID, UM_ROLE_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?), (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?), ?, ?)</Property>
        <Property name="RemoveUserFromSharedRoleSQL">DELETE FROM UM_SHARED_USER_ROLE WHERE   UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_USER_TENANT_ID=? AND UM_ROLE_TENANT_ID = ?</Property>
        <Property name="RemoveUserFromRoleSQLCaseInsensitive">DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="RemoveUserFromRoleSQL">DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="RemoveUserFromRoleSQLCaseInsensitive">DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="RemoveRoleFromUserSQL">DELETE FROM UM_USER_ROLE WHERE UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="RemoveRoleFromUserSQLCaseInsensitive">DELETE FROM UM_USER_ROLE WHERE UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="DeleteRoleSQL">DELETE FROM UM_ROLE WHERE UM_ROLE_NAME = ? AND UM_TENANT_ID=?</Property>
        <Property name="OnDeleteRoleRemoveUserRoleMappingSQL">DELETE FROM UM_USER_ROLE WHERE UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="DeleteUserSQL">DELETE FROM UM_USER WHERE UM_USER_NAME = ? AND UM_TENANT_ID=?</Property>
        <Property name="DeleteUserSQLCaseInsensitive">DELETE FROM UM_USER WHERE LOWER(UM_USER_NAME) = LOWER(?) AND UM_TENANT_ID=?</Property>
        <Property name="OnDeleteUserRemoveUserRoleMappingSQL">DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="OnDeleteUserRemoveUserAttributeSQL">DELETE FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="OnDeleteUserRemoveUserAttributeSQLCaseInsensitive">DELETE FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_TENANT_ID=?</Property>
        <Property name="UpdateUserPasswordSQL">UPDATE UM_USER SET UM_USER_PASSWORD= ?, UM_SALT_VALUE=?, UM_REQUIRE_CHANGE=?, UM_CHANGED_TIME=? WHERE UM_USER_NAME= ? AND UM_TENANT_ID=?</Property>
        <Property name="UpdateUserPasswordSQLCaseInsensitive">UPDATE UM_USER SET UM_USER_PASSWORD= ?, UM_SALT_VALUE=?, UM_REQUIRE_CHANGE=?, UM_CHANGED_TIME=? WHERE LOWER(UM_USER_NAME)= LOWER(?) AND UM_TENANT_ID=?</Property>
        <Property name="UpdateRoleNameSQL">UPDATE UM_ROLE set UM_ROLE_NAME=? WHERE UM_ROLE_NAME = ? AND UM_TENANT_ID=?</Property>
        <Property name="AddUserPropertySQL">INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), ?, ?, ?, ?)</Property>
        <Property name="UpdateUserPropertySQL">UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?</Property>
        <Property name="UpdateUserPropertySQLCaseInsensitive">UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?</Property>
        <Property name="DeleteUserPropertySQL">UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?</Property>
        <Property name="DeleteUserPropertySQLCaseInsensitive">DELETE FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?</Property>
        <Property name="UserNameUniqueAcrossTenantsSQL">SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=?</Property>
        <Property name="UserNameUniqueAcrossTenantsSQLCaseInsensitive">SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?)</Property>
        <Property name="IsDomainExistingSQL">SELECT UM_DOMAIN_ID FROM UM_DOMAIN WHERE UM_DOMAIN_NAME=? AND UM_TENANT_ID=?</Property>
        <Property name="AddDomainSQL">INSERT INTO UM_DOMAIN (UM_DOMAIN_NAME, UM_TENANT_ID) VALUES (?, ?)</Property>
        <Property name="AddUserToRoleSQL-mssql">INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(?)</Property>
        <Property name="AddRoleToUserSQL-mssql">INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), (?)</Property>
        <Property name="AddUserPropertySQL-mssql">INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), (?), (?), (?), (?)</Property>
        <Property name="AddUserToRoleSQLCaseInsensitive-mssql">INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(?)</Property>
        <Property name="AddRoleToUserSQLCaseInsensitive-mssql">INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?), (?)</Property>
        <Property name="AddUserPropertySQLCaseInsensitive-mssql">INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?), (?), (?), (?), (?)</Property>
        <Property name="AddUserToRoleSQL-openedge">INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT UU.UM_ID, UR.UM_ID, ? FROM UM_USER UU, UM_ROLE UR WHERE UU.UM_USER_NAME=? AND UU.UM_TENANT_ID=? AND UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=?</Property>
        <Property name="AddRoleToUserSQL-openedge">INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT UR.UM_ID, UU.UM_ID, ? FROM UM_ROLE UR, UM_USER UU WHERE UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=? AND UU.UM_USER_NAME=? AND UU.UM_TENANT_ID=?</Property>
        <Property name="AddUserPropertySQL-openedge">INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT UM_ID, ?, ?, ?, ? FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?</Property>
        <Property name="AddUserToRoleSQLCaseInsensitive-openedge">INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT UU.UM_ID, UR.UM_ID, ? FROM UM_USER UU, UM_ROLE UR WHERE LOWER(UU.UM_USER_NAME)=LOWER(?) AND UU.UM_TENANT_ID=? AND UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=?</Property>
        <Property name="AddRoleToUserSQLCaseInsensitive-openedge">INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT UR.UM_ID, UU.UM_ID, ? FROM UM_ROLE UR, UM_USER UU WHERE UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=? AND LOWER(UU.UM_USER_NAME)=LOWER(?) AND UU.UM_TENANT_ID=?</Property>
        <Property name="AddUserPropertySQLCaseInsensitive-openedge">INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT UM_ID, ?, ?, ?, ? FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?</Property>
        <Property name="DomainName">wso2.com.jdbc</Property>
        <Property name="Description">Sample JDBC user store configuration</Property>
    </UserStoreManager>
    ```

### Configure Primary user store with datasource

When configuring a JDBC user store as a primary user store, you can use
a datasource to configure database connection configurations and point
that datasource from user store manager configurations. This is a much
cleaner way to configure primary user store with a JDBC user store.

To define a datasource, you can use
`         master-datasources.xml        ` file, which is stored in
`         <PRODUCT_HOME>/repository/conf/datasources/        `
directory. For detailed information on setting up databases, see
[Setting Up the Physical
Database](../../administer/setting-up-the-physical-database)
, and for information on the purpose of defining datasources and how
they are configured for a product, see [Managing
Datasources](../../administer/managing-datasources)
.

1.  There are two possible methods for updating datasources:  
    Shown below is how `           master-datasources.xml          `
    file is configured to connect to the default H2 database in your
    system. If you have replaced the default database with a new RDBMS,
    which you are now using as the JDBC users store, you have to update
    the `           master-datasource.xml          ` file with the
    relevant information.

    ``` xml
        <datasource>
                    <name>WSO2_CARBON_DB</name>
                    <description>The datasource used for registry and user manager</description>
                    <jndiConfig>
                        <name>jdbc/WSO2CarbonDB</name>
                    </jndiConfig>
                    <definition type="RDBMS">
                        <configuration>
                            <url>jdbc:h2:repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000</url>
                            <username>wso2carbon</username>
                            <password>wso2carbon</password>
                            <driverClassName>org.h2.Driver</driverClassName>
                            <maxActive>50</maxActive>
                            <maxWait>60000</maxWait>
                            <testOnBorrow>true</testOnBorrow>
                            <validationQuery>SELECT 1</validationQuery>
                            <validationInterval>30000</validationInterval>
                        </configuration>
                    </definition>
        </datasource>
    ```

    Alternatively, instead of using the
    `           master-datasource.xml          ` file, you can also
    create a new XML file with the datasource information of your new
    RDBMS and store it in the same
    `           <PRODUCT_HOME>/repository/conf/datasources/          `
    directory.

2.  Now, the datasource configuration and the user store manager
    configuration in the deployment.toml file should be
    linked together. You can do this by referring the datasource
    information as explained below.  
    The RDBMS that is used for storing authorization information is
    configured in the ` <PRODUCT_HOME>/repository/conf/deployment.toml           ` file as shown below.
    The following example refers to the default WSO2CarbonDB datasource.
    ``` toml
    [realm_manager]
    data_source = "jdbc/WSO2CarbonDB"
    ```
    
    Configuring user store manager no need to set the connection detail.
    See the following sample configuration.

    ??? note "sample property JDBC with datasource"
        ``` toml
        [user_store]
        type = "database"
        [user_store.properties]
        read_only = false
        read_groups = true
        write_groups = true
        case_insensitive_username = true
        username_java_regex = "^[\\S]{3,30}$"
        username_javascript_regex = "^[\\S]{3,30}$"
        username_java_regex_violation_error_msg = "Username pattern policy violated"
        password_java_regex = "^[\\S]{5,30}$"
        password_javascript_regex = "^[\\S]{5,30}$"
        password_java_regex_violation_error_msg = "Password length should be within 5 to 30 characters"
        scim_enabled=false
        rolename_java_regex = "^[\\S]{3,30}$"
        rolename_javascript_regex = "^[\\S]{3,30}$"
        is_bulk_import_supported = true
        password_digest = "SHA-256"
        store_salted_password = true
        multi_attribute_separator = ","
        max_user_name_list_length = "100"
        max_role_name_list_length = "100"
        user_roles_cache_enabled = true
        user_name_unique_across_tenants = false
        ```   

    If you are using the same RDBMS as the user store in your system,
    this datasource reference would suffice. However, if you have set up
    a separate RDBMS as the user store, instead of using a common RDBMS
    for authorization information as well as the user store, you must
    refer to the datasource configuration from within the User Store
    Manager configuration in the `  deployment.toml       `
    file by adding the data_source property.

### Special requirements

Add relevant JDBC driver to the classpath by copying its JAR file into
the `         <PRODUCT_HOME>/repository/components/lib        `
directory.

You need to restart the server after doing these changes.
