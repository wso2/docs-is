# Configure a JDBC Userstore

WSO2 identity server uses the embedded H2 database as the primary user store.
This document will guide to you to change that to an external JDBC userstore.
By default, the WSO2 Identity Server embedded H2 
database contains userstore tables. When you configure an RDBMS (JDBC) userstore, you can
use internal H2 userstore tables or you can use an external database as a
userstore. If you're going to use default userstore tables for the external JDBC userstore, see [User
Management Related Tables]({{base_path}}/deploy/user-management-related-tables) section.

!!! tip 
    Refer [Configure userstores]({{base_path}}/deploy/configure-user-stores) to get a high-level understanding of the userstores available in WSO2 Identity Server (WSO2 IS).
  
---

##Configure the internal database as JDBC userstore. 

You can use the default configurations in the `<IS-HOME>/repository/conf/deployment.toml`.

``` toml
[user_store]
type = "database_unique_id"
```

By default, it uses the  `database.shared_db` configurations in the `         deployment.toml       `  file as the datasource configuration.
  
If you have a requirement of changing the `database.shared_db` configuration, see 
[Work With Databases]({{base_path}}/deploy/work-with-databases).

`database.shared_db` is used to store both registry and user management related data. If you need to use a datasource specified for user management, you can externalize the user management related tables to another external database and use that database
as the userstore. Refer the following topic for further instructions.

---
   
##Configure an external database as JDBC userstore. 

1.	Create a database on [any supported RDBMS database]({{base_path}}/deploy/work-with-databases). 
    
2.	Following are the example configurations for each database type.
        
	??? example "PostgreSQL"
		
		1.	Configure `<IS-HOME>/repository/conf/deployment.toml` as follows.
			
			```
			[database.user]
			url = "jdbc:postgresql://localhost:5432/userdb"
			username = "root"
			password = "root"
			driver = "org.postgresql.Driver"
			
			[realm_manager]
			data_source = "WSO2USER_DB"
			```
			
		2.	Execute the scripts of [User Management Related Tables]({{base_path}}/deploy/user-management-related-tables) in the `<IS-HOME>/dbscripts/postgresql.sql` file against the database created.    
			
		3. Download the PostgreSQL JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.

	??? example "MySQL"

		1.	Configure `<IS-HOME>/repository/conf/deployment.toml` as follows.

			```
			[database.user]
			url = "jdbc:mysql://localhost:3306/userdb?useSSL=false"
			username = "root"
			password = "root"
			driver = "com.mysql.jdbc.Driver"
			
			[realm_manager]
			data_source = "WSO2USER_DB"
			```
		
		2.	Execute the scripts of [User Management Related Tables]({{base_path}}/deploy/user-management-related-tables) in the `<IS-HOME>/dbscripts/mysql.sql` file
			against the database created.        

		3. Download the MySQL JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder.          

	??? example "DB2"

		1.	Configure `<IS-HOME>/repository/conf/deployment.toml` as follows.

			```
			[database.user]
			url = "jdbc:db2://192.168.108.31:50000/userdb"
			username = "root"
			password = "root"
			driver = "com.ibm.db2.jcc.DB2Driver"
			
			[realm_manager]
			data_source = "WSO2USER_DB"
			```   

		2. 	Execute the scripts of [User Management Related Tables]({{base_path}}/deploy/user-management-related-tables) in the `<IS-HOME>/dbscripts/db2.sql` file
			against the database created.       
	
		3.	Download the DB2 JDBC driver for the version you are using and copy it to the `<IS_HOME>/repository/components/lib` folder. 

	??? example "MSSQL"

		1.	Configure `<IS-HOME>/repository/conf/deployment.toml` as follows.

			```
			[database.user]
			url = "jdbc:sqlserver://localhost:1433;databaseName=userdb;SendStringParametersAsUnicode=false"
			username = "root"
			password = "root"
			driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
			
			[realm_manager]
			data_source = "WSO2USER_DB"
			```
		2. 	Execute the scripts of 
			[User Management Related Tables]({{base_path}}/deploy/user-management-related-tables) in the `<IS-HOME>/dbscripts/mssql.sql` file
			against the database created.        
			
		3. Download the MSSQL JDBC driver for the version you are using and
					copy it to the `<IS_HOME>/repository/components/lib` folder  
		

	??? example "Oracle"

		1.	Configure `<IS-HOME>/repository/conf/deployment.toml` as follows.

			```
			[database.user]
			url = "jdbc:oracle:thin:@localhost:1521/userdb"
			username = "root"
			password = "root"
			driver = "oracle.jdbc.OracleDriver"
			
			[realm_manager]
			data_source = "WSO2USER_DB"
			```
		2. 	Execute the scripts of [User Management Related Tables]({{base_path}}/deploy/user-management-related-tables) in the `<IS-HOME>/dbscripts/oracle.sql` file
			against the database created.      
			
		3. Download the Oracle JDBC driver for the version you are using and
					copy it to the `<IS_HOME>/repository/components/lib` folder 

---

## Properties used in JDBC userstore manager

Following are the properties used in JDBC userstore manager. You can configure any of
those properties as follows. 

Add the following configuration to `<IS-HOME>/repository/conf/deployment.toml`.

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
<thead>
<tr class="header">
<th>Property Id</th>
<th>Primary userstore Property</th>
<th>Secondary userstore Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>ReadGroups</td>
<td>read_groups</td>
<td>ReadGroups</td>
<td>When ReadGroups is set to <code>false</code>, it indicates whether groups should be read from the userstore. If this is disabled, none of the groups in the userstore can be read, and the following group configurations are NOT mandatory: GroupSearchBase, GroupNameListFilter, or GroupNameAttribute.<br />
<br />
<p>Default : true <br/>
Possible values:<br/>
true: Reads groups from userstore<br />
false: Does not read groups from userstore</p></td>
</tr>
<tr class="even">
<td>WriteGroups</td>
<td>write_groups</td>
<td>WriteGroups</td>
<td>Indicates whether groups should be written to the userstore<br />
<br />
<p>Default : true <br/>
Possible values:<br />
true : Writes groups to userstore<br />
false : Does not write groups to the userstore, so only internal roles can be created. The value of the ReadGroups property determines whether the existing userstore groups can be read or not.</p></td>
</tr>
<tr class="odd">
<td>PasswordHashMethod</td>
<td>password_hash_method</td>
<td>Password Hashing Algorithm</td>
<td><p>Specifies the Password Hashing Algorithm used to hash the password before storing it in the userstore<br />
Possible values:<br />
SHA - Uses SHA digest method including SHA-1 and SHA-256<br />
MD5 - Uses MD 5 digest method<br />
PLAIN_TEXT - Plain text passwords</p>
<p>If you just enter the value `SHA`, it will be considered as `SHA-1`. It is always better to configure an algorithm with a higher bit value so that the digest bit size would be increased.
<br />
The default value for JDBC userstores is SHA-256. 
</p></td>
</tr> 
<tr class="odd">
<td>UsernameJavaRegEx</td>
<td>username_java_regex</td>
<td>UsernameJavaRegEx</td>
<td>This is the regular expression used by the back-end components for username validation. By default, strings with non-empty characters having a length of 3 to 30 are allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br/>
<p>Default: ^[\S]{3,30}$</td></p> <br/>
</tr>
<tr class="even">
<td>UsernameJava<br>ScriptRegEx</td> 
<td>username_java_<br>script_regex</td>
<td>UsernameJavaScriptRegEx</td>
<td>The regular expression used by the front-end components for username validation
<br/><p> Default: ^[\S]{3,30}$  </p></td>
</tr>
<tr class="odd">
<td>UsernameJavaReg<br>ExViolationErrorMsg</td>
<td>username_java_reg<br>_ex_violation_error_msg</td>
<td>Username RegEx Violation Error Message</td>
<td>Error message when the username does not match with username_java_regex 
<br/><p> Default: Username pattern policy violated  </p></td>
</tr>
<tr class="even">
<td>PasswordJavaRegEx</td>
<td>password_java_regex</td>
<td>Password RegEx (Java)</td>
<td>This is the regular expression used by the back-end components for password validation. By default, strings with non-empty characters having a length of 5 to 30 are allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br />
Default: ^[\S]{5,30}$</td>
</tr>
<tr class="odd">
<td>PasswordJava<br>ScriptRegEx</td>
<td>password_java_<br>script_regex</td>
<td>Password RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for password validation<br />
<p>Default: ^[\S]{5,30}$</p></td>
</tr>
<tr class="even">
<td>PasswordJavaReg<br>ExViolationErrorMsg</td>
<td>password_java_reg<br>ex_violation_error_msg</td>
<td>Password RegEx Violation Error Message</td>
<td>Error message when the Password is not matched with passwordJavaRegEx<br />
<p>Default: The password length should be within 5 to 30 characters.</p></td>
<tr class="odd">
<td>RolenameJavaRegEx</td>
<td>rolename_java_regex</td>
<td>Role Name RegEx (Java)</td>
<td>This is the regular expression used by the back-end components for role name validation. By default, strings with non-empty characters having a length of 3 to 30 are allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br />
<p>Default: [a-zA-Z0-9._-|//]{3,30}$</p></td>
</tr>
<tr class="odd">
<td>MultiAttribute<br>Separator</td>
<td>multi_attribute<br>_separator</td>
<td>Multiple Attribute Separator</td>
<td>This property is used to define a character to separate multiple attributes. This ensures that it will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but you can define ",,," or "..." or a similar character sequence.<br />
<p>Default: “,”</p></td>
</tr>
<tr class="even">
<td>MaxUserName<br>ListLength</td>
<td>max_user_name_<br>list_length</td>
<td>Maximum User List Length</td>
<td>This controls the number of users listed in the userstore of WSO2 Identity Server. This is useful when you have a large number of users and do not want to list them all. Setting this property to 0 displays all users. (Default: 100)<br />
<br />
In some userstores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the userstore. If you need to increase this number, you need to set it in the userstore level.<br />
Eg: Active directory has the MaxPageSize property with the default value of 100.</td>
</tr>
<tr class="odd">
<td>MaxRoleName<br>ListLength</td>
<td>max_role_name_<br>list_length</td>
<td>Maximum Role List Length</td>
<td>This controls the number of roles listed in the userstore of WSO2 Identity Server. This is useful when you have a large number of roles and do not want to list them all. Setting this property to 0 displays all roles. (Default: 100)<br />
<br />
In some userstores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the userstore. If you need to increase this number, you need to set it in the userstore level.<br />
Eg: Active directory has the MaxPageSize property with the default value of 1000.</td>
</tr>
<tr class="even">
<td>UserRolesCacheEnabled</td>
<td>user_roles_cache_enabled</td>
<td>Enable User Role Cache</td>
<td>This is to indicate whether to cache the role list of a user. (Default: true)<br />
<br />
Possible values:<br />
false: Set it to <code>false</code> if the user roles are changed by external means and those changes should instantly reflect in the Carbon instance.</td>
</tr>
<tr class="odd">
<td>CaseInsensitiveUsername</td>
<td>properties.CaseInsensitiveUsername</td>
<td>Case Insensitive Username</td>
<td>This enables the case insensitivity of the user's username. Default value is <code>true</code> for this configuration. 
<br />Eg: If a user's username is <code>test</code>, that user can also use the username as <code>TEST</code>.
</td>
</tr>
</tbody>
</table>

!!! note
    In addition to these properties, you can configure SQL queries that are
    used in the JDBC userstore manager and if required can change default
    queries. Those are not listed in the above-mentioned table. However, you can configure these SQL queries in a similar way. 
    

??? note "JDBC sample property with SQL queries"

    ``` toml
    [user_store.properties]
    SelectUserSQL = "SELECT * FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?"
    SelectUserSQLCaseInsensitive = "SELECT * FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?"
    GetRoleListSQL = "SELECT UM_ROLE_NAME, UM_TENANT_ID, UM_SHARED_ROLE FROM UM_ROLE WHERE UM_ROLE_NAME LIKE ? AND UM_TENANT_ID=? AND UM_SHARED_ROLE ='0' ORDER BY UM_ROLE_NAME"
    GetSharedRoleListSQL = "SELECT UM_ROLE_NAME, UM_TENANT_ID, UM_SHARED_ROLE FROM UM_ROLE WHERE UM_ROLE_NAME LIKE ? AND UM_SHARED_ROLE ='1' ORDER BY UM_ROLE_NAM"
    UserFilterSQL = "SELECT UM_USER_NAME FROM UM_USER WHERE UM_USER_NAME LIKE ? AND UM_TENANT_ID=? ORDER BY UM_USER_NAME"
    UserFilterSQLCaseInsensitive = "SELECT UM_USER_NAME FROM UM_USER WHERE LOWER(UM_USER_NAME) LIKE LOWER(?) AND UM_TENANT_ID=? ORDER BY UM_USER_NAME"
    UserRoleSQL = "SELECT UM_ROLE_NAME FROM UM_USER_ROLE, UM_ROLE, UM_USER WHERE UM_USER.UM_USER_NAME=? AND UM_USER.UM_ID=UM_USER_ROLE.UM_USER_ID AND UM_ROLE.UM_ID=UM_USER_ROLE.UM_ROLE_ID AND UM_USER_ROLE.UM_TENANT_ID=? AND UM_ROLE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    UserRoleSQLCaseInsensitive = "SELECT UM_ROLE_NAME FROM UM_USER_ROLE, UM_ROLE, UM_USER WHERE LOWER(UM_USER.UM_USER_NAME)=LOWER(?) AND UM_USER.UM_ID=UM_USER_ROLE.UM_USER_ID AND UM_ROLE.UM_ID=UM_USER_ROLE.UM_ROLE_ID AND UM_USER_ROLE.UM_TENANT_ID=? AND UM_ROLE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    UserSharedRoleSQL = "SELECT UM_ROLE_NAME, UM_ROLE.UM_TENANT_ID, UM_SHARED_ROLE FROM UM_SHARED_USER_ROLE INNER JOIN UM_USER ON UM_SHARED_USER_ROLE.UM_USER_ID = UM_USER.UM_ID INNER JOIN UM_ROLE ON UM_SHARED_USER_ROLE.UM_ROLE_ID = UM_ROLE.UM_ID WHERE UM_USER.UM_USER_NAME = ? AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = UM_USER.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_ROLE_TENANT_ID = UM_ROLE.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = ?"
    UserSharedRoleSQLCaseInsensitive = "SELECT UM_ROLE_NAME, UM_ROLE.UM_TENANT_ID, UM_SHARED_ROLE FROM UM_SHARED_USER_ROLE INNER JOIN UM_USER ON UM_SHARED_USER_ROLE.UM_USER_ID = UM_USER.UM_ID INNER JOIN UM_ROLE ON UM_SHARED_USER_ROLE.UM_ROLE_ID = UM_ROLE.UM_ID WHERE LOWER(UM_USER.UM_USER_NAME) = LOWER(?) AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = UM_USER.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_ROLE_TENANT_ID = UM_ROLE.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = ?"
    IsRoleExistingSQL = "SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?"
    GetUserListOfRoleSQL = "SELECT UM_USER_NAME FROM UM_USER_ROLE, UM_ROLE, UM_USER WHERE UM_ROLE.UM_ROLE_NAME=? AND UM_USER.UM_ID=UM_USER_ROLE.UM_USER_ID AND UM_ROLE.UM_ID=UM_USER_ROLE.UM_ROLE_ID AND UM_USER_ROLE.UM_TENANT_ID=? AND UM_ROLE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    GetUserListOfSharedRoleSQL = "SELECT UM_USER_NAME FROM UM_SHARED_USER_ROLE INNER JOIN UM_USER ON UM_SHARED_USER_ROLE.UM_USER_ID = UM_USER.UM_ID INNER JOIN UM_ROLE ON UM_SHARED_USER_ROLE.UM_ROLE_ID = UM_ROLE.UM_ID WHERE UM_ROLE.UM_ROLE_NAME= ? AND UM_SHARED_USER_ROLE.UM_USER_TENANT_ID = UM_USER.UM_TENANT_ID AND UM_SHARED_USER_ROLE.UM_ROLE_TENANT_ID = UM_ROLE.UM_TENANT_ID"
    IsUserExistingSQL = "SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?"
    IsUserExistingSQLCaseInsensitive = "SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?"
    GetUserPropertiesForProfileSQL = "SELECT UM_ATTR_NAME, UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND UM_USER.UM_USER_NAME=? AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    GetUserPropertiesForProfileSQLCaseInsensitive = "SELECT UM_ATTR_NAME, UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND LOWER(UM_USER.UM_USER_NAME)=LOWER(?) AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    GetUserPropertyForProfileSQL = "SELECT UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND UM_USER.UM_USER_NAME=? AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    GetUserPropertyForProfileSQLCaseInsensitive = "SELECT UM_ATTR_VALUE FROM UM_USER_ATTRIBUTE, UM_USER WHERE UM_USER.UM_ID = UM_USER_ATTRIBUTE.UM_USER_ID AND LOWER(UM_USER.UM_USER_NAME)=LOWER(?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    GetUserLisForPropertySQL = "SELECT UM_USER_NAME FROM UM_USER, UM_USER_ATTRIBUTE WHERE UM_USER_ATTRIBUTE.UM_USER_ID = UM_USER.UM_ID AND UM_USER_ATTRIBUTE.UM_ATTR_NAME =? AND UM_USER_ATTRIBUTE.UM_ATTR_VALUE LIKE ? AND UM_USER_ATTRIBUTE.UM_PROFILE_ID=? AND UM_USER_ATTRIBUTE.UM_TENANT_ID=? AND UM_USER.UM_TENANT_ID=?"
    GetProfileNamesSQL = "SELECT DISTINCT UM_PROFILE_ID FROM UM_USER_ATTRIBUTE WHERE UM_TENANT_ID=?"
    GetUserProfileNamesSQL = "SELECT DISTINCT UM_PROFILE_ID FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    GetUserProfileNamesSQLCaseInsensitive = "SELECT DISTINCT UM_PROFILE_ID FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    GetUserIDFromUserNameSQL = "SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?"
    GetUserIDFromUserNameSQLCaseInsensitive = "SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?"
    GetUserNameFromTenantIDSQL = "SELECT UM_USER_NAME FROM UM_USER WHERE UM_TENANT_ID=?"
    GetTenantIDFromUserNameSQL = "SELECT UM_TENANT_ID FROM UM_USER WHERE UM_USER_NAME=?"
    GetTenantIDFromUserNameSQLCaseInsensitive = "SELECT UM_TENANT_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?)"
    AddUserSQL = "INSERT INTO UM_USER (UM_USER_NAME, UM_USER_PASSWORD, UM_SALT_VALUE, UM_REQUIRE_CHANGE, UM_CHANGED_TIME, UM_TENANT_ID) VALUES (?, ?, ?, ?, ?, ?)"
    AddUserToRoleSQL = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?), ?)"
    AddUserToRoleSQLCaseInsensitive = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?), ?)"
    AddRoleSQL = "INSERT INTO UM_ROLE (UM_ROLE_NAME, UM_TENANT_ID) VALUES (?, ?)"
    AddSharedRoleSQL = "UPDATE UM_ROLE SET UM_SHARED_ROLE = ? WHERE UM_ROLE_NAME = ? AND UM_TENANT_ID = ?"
    AddRoleToUserSQL = "INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), ?)"
    AddSharedRoleToUserSQL = "INSERT INTO UM_SHARED_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_USER_TENANT_ID, UM_ROLE_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), ?, ?)"
    AddSharedRoleToUserSQLCaseInsensitive = "INSERT INTO UM_SHARED_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_USER_TENANT_ID, UM_ROLE_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?), (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?), ?, ?)"
    RemoveUserFromSharedRoleSQL = "DELETE FROM UM_SHARED_USER_ROLE WHERE   UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_USER_TENANT_ID=? AND UM_ROLE_TENANT_ID = ?"
    RemoveUserFromRoleSQLCaseInsensitive = "DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    RemoveUserFromRoleSQL = "DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    RemoveUserFromRoleSQLCaseInsensitive = "DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    RemoveRoleFromUserSQL = "DELETE FROM UM_USER_ROLE WHERE UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    RemoveRoleFromUserSQLCaseInsensitive = "DELETE FROM UM_USER_ROLE WHERE UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    DeleteRoleSQL = "DELETE FROM UM_ROLE WHERE UM_ROLE_NAME = ? AND UM_TENANT_ID=?"
    OnDeleteRoleRemoveUserRoleMappingSQL = "DELETE FROM UM_USER_ROLE WHERE UM_ROLE_ID=(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID="
    DeleteUserSQL = "DELETE FROM UM_USER WHERE UM_USER_NAME = ? AND UM_TENANT_ID=?"
    DeleteUserSQLCaseInsensitive = "DELETE FROM UM_USER WHERE LOWER(UM_USER_NAME) = LOWER(?) AND UM_TENANT_ID=?"
    OnDeleteUserRemoveUserRoleMappingSQL = "DELETE FROM UM_USER_ROLE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    OnDeleteUserRemoveUserAttributeSQL = "DELETE FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    OnDeleteUserRemoveUserAttributeSQLCaseInsensitive = "DELETE FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_TENANT_ID=?"
    UpdateUserPasswordSQL = "UPDATE UM_USER SET UM_USER_PASSWORD= ?, UM_SALT_VALUE=?, UM_REQUIRE_CHANGE=?, UM_CHANGED_TIME=? WHERE UM_USER_NAME= ? AND UM_TENANT_ID=?"
    UpdateUserPasswordSQLCaseInsensitive = "UPDATE UM_USER SET UM_USER_PASSWORD= ?, UM_SALT_VALUE=?, UM_REQUIRE_CHANGE=?, UM_CHANGED_TIME=? WHERE LOWER(UM_USER_NAME)= LOWER(?) AND UM_TENANT_ID=?"
    UpdateRoleNameSQL = "UPDATE UM_ROLE set UM_ROLE_NAME=? WHERE UM_ROLE_NAME = ? AND UM_TENANT_ID=?"
    AddUserPropertySQL = "INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) VALUES ((SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), ?, ?, ?, ?)"
    UpdateUserPropertySQL = "UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?"
    UpdateUserPropertySQLCaseInsensitive = "UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?"
    DeleteUserPropertySQL = "UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?"
    UpdateUserPropertySQLCaseInsensitive = "UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?"
    DeleteUserPropertySQL = "UPDATE UM_USER_ATTRIBUTE SET UM_ATTR_VALUE=? WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?"
    DeleteUserPropertySQLCaseInsensitive = "DELETE FROM UM_USER_ATTRIBUTE WHERE UM_USER_ID=(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?) AND UM_ATTR_NAME=? AND UM_PROFILE_ID=? AND UM_TENANT_ID=?"
    UserNameUniqueAcrossTenantsSQL = "SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=?"
    UserNameUniqueAcrossTenantsSQLCaseInsensitive = "SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?)"
    IsDomainExistingSQL = "SELECT UM_DOMAIN_ID FROM UM_DOMAIN WHERE UM_DOMAIN_NAME=? AND UM_TENANT_ID=?"
    AddDomainSQL = "INSERT INTO UM_DOMAIN (UM_DOMAIN_NAME, UM_TENANT_ID) VALUES (?, ?)"
    AddUserToRoleSQL-mssql = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(?)"
    AddRoleToUserSQL-mssql = "INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), (?)"
    AddUserPropertySQL-mssql = "INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), (?), (?), (?), (?)"
    AddUserToRoleSQLCaseInsensitive-mssql = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(?)"
    AddRoleToUserSQL-mssql = "INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), (?)"
    AddUserPropertySQL-mssql = "INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?), (?), (?), (?), (?)"
    AddUserToRoleSQLCaseInsensitive-mssql = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(?)"
    AddRoleToUserSQLCaseInsensitive-mssql = "INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?), (?)"
    AddUserPropertySQLCaseInsensitive-mssql = "INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?), (?), (?), (?), (?)"
    AddUserToRoleSQL-openedge = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT UU.UM_ID, UR.UM_ID, ? FROM UM_USER UU, UM_ROLE UR WHERE UU.UM_USER_NAME=? AND UU.UM_TENANT_ID=? AND UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=?"
    AddRoleToUserSQL-openedge = "INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT UR.UM_ID, UU.UM_ID, ? FROM UM_ROLE UR, UM_USER UU WHERE UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=? AND UU.UM_USER_NAME=? AND UU.UM_TENANT_ID=?"
    AddUserPropertySQL-openedge = "INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT UM_ID, ?, ?, ?, ? FROM UM_USER WHERE UM_USER_NAME=? AND UM_TENANT_ID=?"
    AddUserToRoleSQLCaseInsensitive-openedge = "INSERT INTO UM_USER_ROLE (UM_USER_ID, UM_ROLE_ID, UM_TENANT_ID) SELECT (SELECT UM_ID FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?),(SELECT UM_ID FROM UM_ROLE WHERE UM_ROLE_NAME=? AND UM_TENANT_ID=?),(?)"
    AddRoleToUserSQLCaseInsensitive-openedge = "INSERT INTO UM_USER_ROLE (UM_ROLE_ID, UM_USER_ID, UM_TENANT_ID) SELECT UR.UM_ID, UU.UM_ID, ? FROM UM_ROLE UR, UM_USER UU WHERE UR.UM_ROLE_NAME=? AND UR.UM_TENANT_ID=? AND LOWER(UU.UM_USER_NAME)=LOWER(?) AND UU.UM_TENANT_ID=?"
    AddUserPropertySQLCaseInsensitive-openedge = "INSERT INTO UM_USER_ATTRIBUTE (UM_USER_ID, UM_ATTR_NAME, UM_ATTR_VALUE, UM_PROFILE_ID, UM_TENANT_ID) SELECT UM_ID, ?, ?, ?, ? FROM UM_USER WHERE LOWER(UM_USER_NAME)=LOWER(?) AND UM_TENANT_ID=?"
    ```

Restart the server after doing these changes.

---



!!! info "Related topics"

    -   [Deploy: Configure the Primary Userstore]({{base_path}}/deploy/configure-the-primary-user-store)
    -   [Deploy: Configure Secondary Userstores]({{base_path}}/deploy/configure-secondary-user-stores)
