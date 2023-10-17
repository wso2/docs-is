# Remote user store properties

The following table provides descriptions of the key properties to apply in <code>deployment.toml</code> file to configure the user store that you need to connect.
    <table>
         <tbody>
            <tr>
                <th>Configuration name</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><code>type</code></td>
                <td>
                    Type of the user store you are trying to connect. You can update the type parameter as <code>ldap</code>
                    if you are using LDAP (Lightweight Directory Access Protocol) and <code>active_directory</code> if you are
                    using an Active Directory user store. <br><br> Example: <code>type = "ldap"</code>
                </td>
            </tr>
            <tr>
                <td><code>connection_url</code></td>
                <td>Connection URL to the user store server. <br><br> Example: <code>connection_url = "ldap://localhost:389"</code></td>
            </tr>
            <tr>
                <td><code>connection_name</code></td>
                <td>
                    The username used to connect to the user store and perform various operations. This user does not have to be
                    an administrator in the user store, but this user MUST have permission to read the user list and users' attributes and
                    to perform search operations on the user store. The value you specify is used as the DN ( Distinguish Name ) attribute
                    of the user. This property is mandatory. <br><br> Example: <code>connection_name = "uid=admin,ou=system"</code>
                </td>
            </tr>
            <tr>
                <td><code>connection_password</code></td>
                <td>Password for the ConnectionName user.<br><br> Example: <code>connection_password = "password"</code></td>
            </tr>
            <tr>
                <td><code>ldap_connection_timeout</code></td>
                <td>
                    Timeout in making the initial LDAP connection. This is configured in milliseconds.
                    <br><br> Example: <code>ldap_connection_timeout = 2000</code>
                </td>
            </tr>
            <tr>
                <td><code>base_dn</code></td>
                <td>
                    The starting point the directory server uses when searching for users authentication within your Directory.
                    <br><br> Example: <code>base_dn = "dc=example,dc=org"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_search_base</code></td>
                <td>
                    DN of the context or object under which the user entries are stored in the user store. In this case,
                    it is the "users" container. When the user store searches for users, it will start from this location
                    of the directory. <br><br> Example: <code>user_search_base = "ou=Users,dc=example,dc=org"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_name_list_filter</code></td>
                <td>
                    Filtering criteria for listing all the user entries in the user store. This query or filter is used
                    when doing search operations on users. In this case, the search operation only provides the objects
                    created from the specified class. This query is the same as listing out all the available users in
                    the management console. <br><br> Example: <code>user_name_list_filter = "(objectClass=user)"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_name_attribute</code></td>
                <td>
                    The attribute used for uniquely identifying a user entry. Users can be authenticated using their
                    email address, UID, etc. The name of the attribute is considered as the username.
                    <br><br> Example: <code>user_name_attribute = "cn"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_name_search_filter</code></td>
                <td>
                    Filtering criteria are used to search for a particular user entry.
                    <br><br> Example: <code>user_name_search_filter = "(&amp;(objectClass=user)(cn=?))"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_entry_object_class</code></td>
                <td>
                    The object class is used to construct user entries.
                    <br><br> Example: <code>user_entry_object_class = "inetOrgperson"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_id_attribute</code></td>
                <td>
                    The attribute used for uniquely identifying a user entry. The value of the attribute is considered
                    as the unique user ID. <br><br> Example: <code>user_id_attribute = "objectGuid"</code>
                </td>
            </tr>
            <tr>
                <td><code>user_id_search_filter</code></td>
                <td>
                    Filtering criteria used to search for a particular user entry using the user id attribute.
                    <br><br> Example: <code>user_id_search_filter = "(&amp;(objectClass=user)(objectGuid=?))"</code>
                </td>
            </tr>
            <tr>
                <td><code>password_hash_method</code></td>
                <td>
                    Specifies the Password Hashing Algorithm uses the hash the password before storing in the user store.
                    Possible values: <br> <code>SHA</code> - Uses SHA digest method. SHA-1, SHA-256 <br> <code>MD5</code> - Uses MD 5 digest method.
                    <br> <code>PLAIN_TEXT</code> - Plain text passwords.(Default) <br><br>Example: <code>password_hash_method = "PLAIN_TEXT"</code>
                </td>
            </tr>
            <tr>
                <td><code>read_groups</code></td>
                <td>
                    Specifies whether groups should be read from the user store. If this is disabled by setting it to
                    false, none of the groups in the user store can be read, and the following group configurations are
                    NOT mandatory: group_search_base, group_name_list_filter, group_name_search_filter, or group_name_attribute.
                    <br><br>Example: <code>read_groups = "true"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_search_base</code></td>
                <td>
                    DN of the context under which group entries are stored in the user store.
                    <br><br> Example: <code>group_search_base = "ou=Groups,dc=example,dc=org"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_entry_object_class</code></td>
                <td>
                    The object class is used to construct group entries.
                    <br><br>Example: <code>group_entry_object_class = "groupOfNames"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_name_attribute</code></td>
                <td>
                    Attribute used for uniquely identifying a group entry. This attribute is to be treated as the group name.
                    <br><br> Example: <code>group_name_attribute = "cn"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_name_search_filter</code></td>
                <td>
                    Filtering criteria used to search for a particular group entry.
                    <br><br> Example: <code>group_name_search_filter = "(&amp;(objectClass=groupOfNames)(cn=?))"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_name_list_filter</code></td>
                <td>
                    Filtering criteria for listing all the group entries in the user store. The group search operation
                    only returns objects created from this class.
                    <br><br>Example: <code>group_name_list_filter = "(objectClass=groupOfNames)"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_id_enabled</code></td>
                <td>Whether the unique groupid is enabled or not.<br><br>Example: <code>group_id_enabled = "true"</code></td>
            </tr>
            <tr>
                <td><code>group_id_attribute</code></td>
                <td>
                    The attribute used for uniquely identifying a group entry. The value of the attribute is considered as the unique group ID.
                    <br><br>Example: <code>group_id_attribute = "gid"</code>
                </td>
            </tr>
            <tr>
                <td><code>membership_attribute</code></td>
                <td>
                    Attribute used to define members of groups.
                    <br><br>Example: <code>membership_attribute = "member"</code>
                </td>
            </tr>
            <tr>
                <td><code>group_created_date_attribute</code></td>
                <td>
                    This attribute is to be treated as the group created timestamp.
                    <br><br>Example: <code>group_created_date_attribute = "whenCreated"</code>
                </td>
            </tr>
            <tr>
                <td><code>multi_attribute_separator</code></td>
                <td>
                    This property is used to define a character to separate multiple attributes. This ensures that it
                    will not appear as part of a claim value. Normally "," is used to separate multiple attributes, but
                    you can define ",,," or "..." or a similar character sequence
                    <br><br>Example: <code>multi_attribute_separator = ","</code>
                </td>
            </tr>
            <tr>
            <td><code>case_insensitive_user_name</code></td>
            <td>
                Enables the case-insensitivity of the user's username. The default value is true for this configuration.
                <br> Eg: If a user's username is **test**, that user can also use the username as **TEST**.
                <br><br>Example: <code>case_insensitive_user_name = "true"</code>
            </td>
            </tr>
            <tr>
            <td><code>immutable_attributes</code></td>
            <td>
                This property is used to define a list of attributes that are considered unchangeable attributes in the user store.
                <br> This property needs to be configured only for user stores with **Read/Write** access.
                <br><br>Example: <code>immutable_attributes = "whenCreated,whenChanged,location"</code>
            </td>
            </tr>
        </tbody>
    </table>
