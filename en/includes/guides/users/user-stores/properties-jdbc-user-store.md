Following are the properties that can be configured in JDBC user store manager.

<table>
<thead>
<tr class="header">
<th>Property Id</th>
<th>Primary user store Property</th>
<th>Secondary user store Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>ReadGroups</td>
<td><code>read_groups</code></td>
<td>ReadGroups</td>
<td>When ReadGroups is set to <code>false</code>, it indicates whether groups should be read from the user store. If this is disabled, none of the groups in the user store can be read, and the following group configurations are NOT mandatory: GroupSearchBase, GroupNameListFilter, or GroupNameAttribute.<br />
<br />
<p>Default : true <br/>
Possible values:<br/>
true: Reads groups from user store<br />
false: Does not read groups from user store</p></td>
</tr>
<tr class="even">
<td>WriteGroups</td>
<td><code>write_groups</code></td>
<td>WriteGroups</td>
<td>Indicates whether groups should be written to the user store<br />
<br />
<p>Default : true <br/>
Possible values:<br />
true : Writes groups to user store<br />
false : Does not write groups to the user store, so only internal roles can be created. The value of the ReadGroups property determines whether the existing user store groups can be read or not.</p></td>
</tr>
<tr class="odd">
<td>PasswordHashMethod</td>
<td><code>password_hash_method</code></td>
<td>Password Hashing Algorithm</td>
<td><p>Specifies the Password Hashing Algorithm used to hash the password before storing it in the user store<br />
Possible values:<br />
SHA - Uses SHA digest method including SHA-1 and SHA-256<br />
MD5 - Uses MD 5 digest method<br />
PLAIN_TEXT - Plain text passwords
<a href="{{base_path}}/deploy/configure/user-stores/secure-userstore-using-pbkdf2">PBKDF2</a> – A modern, NIST recommended key derivation function that reduces the risk of brute-force attacks</p>
<p>If you just enter the value `SHA`, it will be considered as `SHA-1`. It's always better to configure an algorithm with a higher bit value so that the digest bit size would be increased.
<br />
The default value for JDBC user stores is SHA-256.
</p></td>
</tr>
<tr class="odd">
<td>UsernameJavaRegEx</td>
<td><code>username_java_regex</code></td>
<td>Username RegEx (Java)</td>
<td>This is the regular expression used by the back-end components for username validation. By default, strings with non-empty characters having a length of 3 to 30 are allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br/>
<p>Default: ^[\S]{3,30}$</td></p> <br/>
</tr>
<tr class="even">
<td>UsernameJava<br>ScriptRegEx</td>
<td><code>username_java_script_regex</code></td>
<td>Username RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for username validation
<br/><p> Default: ^[\S]{3,30}$  </p></td>
</tr>
<tr class="odd">
<td>UsernameJavaReg<br>ExViolationErrorMsg</td>
<td><code>username_java_reg_ex_violation_error_msg</code></td>
<td>Username RegEx Violation Error Message</td>
<td>Error message when the username doesn't match with username_java_regex
<br/><p> Default: Username pattern policy violated  </p></td>
</tr>
<tr class="even">
<td>PasswordJavaRegEx</td>
<td><code>password_java_regex</code></td>
<td>Password RegEx (Java)</td>
<td>This is the regular expression used by the back-end components for password validation. By default, strings with non-empty characters having a length of 5 to 30 are allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br />
Default: ^[\S]{5,30}$</td>
</tr>
<tr class="odd">
<td>PasswordJava<br>ScriptRegEx</td>
<td><code>password_java_script_regex</code></td>
<td>Password RegEx (Javascript)</td>
<td>The regular expression used by the front-end components for password validation<br />
<p>Default: ^[\S]{5,30}$</p></td>
</tr>
<tr class="even">
<td>PasswordJavaReg<br>ExViolationErrorMsg</td>
<td><code>password_java_regex_violation_error_msg</code></td>
<td>Password RegEx Violation Error Message</td>
<td>Error message when the Password is not matched with passwordJavaRegEx<br />
<p>Default: The password length should be within 5 to 30 characters.</p></td>
<tr class="odd">
<td>RolenameJavaRegEx</td>
<td><code>rolename_java_regex</code></td>
<td>Role Name RegEx (Java)</td>
<td>This is the regular expression used by the back-end components for role name validation. By default, strings with non-empty characters having a length of 3 to 30 are allowed. You can provide ranges of alphabets, numbers, and ASCII values in the RegEx properties.<br />
<p>Default: [a-zA-Z0-9._-|//]{3,30}$</p></td>
</tr>
<tr class="odd">
<td>MultiAttribute<br>Separator</td>
<td><code>multi_attribute_separator</code></td>
<td>Multiple Attribute Separator</td>
<td>This property is used to define a character to separate multiple attributes. This ensures that it will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but you can define ",,," or "..." or a similar character sequence.<br />
<p>Default: “,”</p></td>
</tr>
<tr class="even">
<td>MaxUserName<br>ListLength</td>
<td><code>max_user_name_list_length</code></td>
<td>Maximum User List Length</td>
<td>This controls the number of users listed in the user store of WSO2 Identity Server. This is useful when you have a large number of users and do not want to list them all. Setting this property to 0 displays all users. (Default: 100)<br />
<br />
In some user stores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the user store. If you need to increase this number, you need to set it in the user store level.<br />
Eg: Active directory has the MaxPageSize property with the default value of 100.</td>
</tr>
<tr class="odd">
<td>MaxRoleName<br>ListLength</td>
<td><code>max_role_name_list_length</code></td>
<td>Maximum Role List Length</td>
<td>This controls the number of roles listed in the user store of WSO2 Identity Server. This is useful when you have a large number of roles and do not want to list them all. Setting this property to 0 displays all roles. (Default: 100)<br />
<br />
In some user stores, there are policies to limit the number of records that can be returned from a query. By setting the value to 0, it will list the maximum results returned by the user store. If you need to increase this number, you need to set it in the user store level.<br />
Eg: Active directory has the MaxPageSize property with the default value of 1000.</td>
</tr>
<tr class="even">
<td>UserRolesCacheEnabled</td>
<td><code>user_roles_cache_enabled</code></td>
<td>Enable User Role Cache</td>
<td>This is to indicate whether to cache the role list of a user. (Default: true)<br />
<br />
Possible values:<br />
false: Set it to <code>false</code> if the user roles are changed by external means and those changes should instantly reflect in the Carbon instance.</td>
</tr>
<tr class="odd">
<td>CaseInsensitiveUsername</td>
<td><code>properties.CaseInsensitiveUsername</code></td>
<td>Case Insensitive Username</td>
<td>This enables the case insensitivity of the user's username. Default value is <code>true</code> for this configuration.
<br />Eg: If a user's username is <code>test</code>, that user can also use the username as <code>TEST</code>.
</td>
</tr>
<tr class="even">
<td>CaseInsensitiveAttributes</td>
<td><code>properties.CaseInsensitiveAttributes</code></td>
<td>Case Insensitive Attributes</td>
<td>This enables case insensitivity of the user attributes.<br/>
<p>Default : false </p>
</td>
</tr>
<tr class="odd">
<td>IsBulkImportSupported</td>
<td><code>properties.IsBulkImportSupported</code></td>
<td>Is Bulk Import Supported</td>
<td>Enables bulk import support for the user store.<br/>
<p>Default : true </p>
</td>
</tr>
<tr class="even">
<td>StoreUserAttribute</br>ValueAsUnicode</td>
<td><code>properties.StoreUserAttributeValueAsUnicode</code></td>
<td>Store User Attribute Value As Unicode</td>
<td>
Applicable only to MSSQL user stores. Specifies whether user attributes are stored as Unicode (<code>true</code>) or plain text (<code>false</code>). To ensure compatibility with non-ASCII characters, it's recommended to set this property to true.<br/>
{% if is_version > "7.1.0" %}
<p>Default : false for primary user store, true for secondary user stores </p>
{% else %}
<p>Default : false </p>
{% endif %}
</td>
</tr>
</tbody>
</table>
