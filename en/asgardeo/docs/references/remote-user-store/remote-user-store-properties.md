# Remote agent properties

The following table provides descriptions of the key properties to apply in <code>deployment.toml</code> file to configure the agent and the user store that you need to connect.

<table>
    <tbody>
        <tr>
            <th>Configuration name</th>
            <th>Description</th>
            <th>Example</th>
        </tr>
        <tr>
            <td><code>type</code></td>
            <td>
                Type of the user store you are trying to connect. You can update the type parameter as <code>ldap</code>
                if you are using LDAP (Lightweight Directory Access Protocol) and <code>active_directory</code> if you are
                using an Active Directory user store.
            </td>
            <td>`type = "ldap"`</td>
        </tr>
        <tr>
            <td><code>connection_url</code></td>
            <td>Connection URL to the user store server.</td>
            <td>`connection_url = "ldap://localhost:389"`</td>
        </tr>
        <tr>
            <td><code>connection_name</code></td>
            <td>
                The username used to connect to the user store and perform various operations. This user does not have to be
                an administrator in the user store, but this user MUST have permission to read the user list and users' attributes and
                to perform search operations on the user store. The value you specify is used as the DN ( Distinguish Name ) attribute
                of the user. This property is mandatory.
            </td>
            <td>`connection_name = "uid=admin,ou=system"`</td>
        </tr>
        <tr>
            <td><code>connection_password</code></td>
            <td>Password for the ConnectionName user.</td>
            <td>`connection_password = "password"`</td>
        </tr>
        <tr>
            <td><code>ldap_connection_timeout</code></td>
            <td>Timeout in making the initial LDAP connection. This is configured in milliseconds.</td>
            <td>`ldap_connection_timeout = 2000`</td>
        </tr>
        <tr>
            <td><code>base_dn</code></td>
            <td>
                The starting point the directory server uses when searching for users authentication within your Directory.
            </td>
            <td>`base_dn = "dc=example,dc=org"`</td>
        </tr>
        <tr>
            <td><code>user_search_base</code></td>
            <td>
                DN of the context or object under which the user entries are stored in the user store. In this case,
                it is the "users" container. When the user store searches for users, it will start from this location
                of the directory.
            </td>
            <td>`user_search_base = "ou=Users,dc=example,dc=org"`</td>
        </tr>
        <tr>
            <td><code>user_name_list_filter</code></td>
            <td>
                Filtering criteria for listing all the user entries in the user store. This query or filter is used
                when doing search operations on users. In this case, the search operation only provides the objects
                created from the specified class. This query is the same as listing out all the available users in
                the management console.
            </td>
            <td>`user_name_list_filter = "(objectClass=user)"`</td>
        </tr>
        <tr>
            <td><code>user_name_attribute</code></td>
            <td>
                The attribute used for uniquely identifying a user entry. Users can be authenticated using their
                email address, UID, etc. The name of the attribute is considered as the username.
            </td>
            <td>`user_name_attribute = "cn"`</td>
        </tr>
        <tr>
            <td><code>user_name_search_filter</code></td>
            <td>Filtering criteria are used to search for a particular user entry.</td>
            <td>`user_name_search_filter = "(&amp;(objectClass=user)(cn=?))"`</td>
        </tr>
        <tr>
            <td><code>user_entry_object_class</code></td>
            <td>The object class is used to construct user entries.</td>
            <td>`user_entry_object_class = "inetOrgperson"`</td>
        </tr>
        <tr>
            <td><code>user_id_attribute</code></td>
            <td>
                The attribute used for uniquely identifying a user entry. The value of the attribute is considered
                as the unique user ID.
            </td>
            <td>`user_id_attribute = "objectGuid"`</td>
        </tr>
        <tr>
            <td><code>user_id_search_filter</code></td>
            <td>Filtering criteria used to search for a particular user entry using the user id attribute.</td>
            <td>`user_id_search_filter = "(&amp;(objectClass=user)(objectGuid=?))"`</td>
        </tr>
        <tr>
            <td><code>password_hash_method</code></td>
            <td>
                Specifies the Password Hashing Algorithm uses the hash the password before storing in the user store.
                Possible values: 
                <br> <code>SHA</code> - Uses SHA digest method. SHA-1, SHA-256 
                <br> <code>MD5</code> - Uses MD 5 digest method.
                <br> <code>PLAIN_TEXT</code> - Plain text passwords.(Default)
            </td>
            <td>`password_hash_method = "PLAIN_TEXT"`</td>
        </tr>
        <tr>
            <td><code>read_groups</code></td>
            <td>
                Specifies whether groups should be read from the user store. If this is disabled by setting it to
                false, none of the groups in the user store can be read, and the following group configurations are
                NOT mandatory: group_search_base, group_name_list_filter, group_name_search_filter, or group_name_attribute.
            </td>
            <td>`read_groups = "true"`</td>
        </tr>
        <tr>
            <td><code>group_search_base</code></td>
            <td>DN of the context under which group entries are stored in the user store.</td>
            <td>`group_search_base = "ou=Groups,dc=example,dc=org"`</td>
        </tr>
        <tr>
            <td><code>group_entry_object_class</code></td>
            <td>The object class is used to construct group entries.</td>
            <td>`group_entry_object_class = "groupOfNames"`</td>
        </tr>
        <tr>
            <td><code>group_name_attribute</code></td>
            <td>
                Attribute used for uniquely identifying a group entry. This attribute is to be treated as the group name.
            </td>
            <td>`group_name_attribute = "cn"`</td>
        </tr>
        <tr>
            <td><code>group_name_search_filter</code></td>
            <td>Filtering criteria used to search for a particular group entry.</td>
            <td>`group_name_search_filter = "(&amp;(objectClass=groupOfNames)(cn=?))"`</td>
        </tr>
        <tr>
            <td><code>group_name_list_filter</code></td>
            <td>
                Filtering criteria for listing all the group entries in the user store. The group search operation
                only returns objects created from this class.
            </td>
            <td>`group_name_list_filter = "(objectClass=groupOfNames)"`</td>
        </tr>
        <tr>
            <td><code>group_id_enabled</code></td>
            <td>Whether the unique groupid is enabled or not.</td>
            <td>`group_id_enabled = "true"`</td>
        </tr>
        <tr>
            <td><code>group_id_attribute</code></td>
            <td>
                The attribute used for uniquely identifying a group entry. The value of the attribute is considered 
                as the unique group ID.
            </td>
            <td>`group_id_attribute = "gid"`</td>
        </tr>
        <tr>
            <td><code>membership_attribute</code></td>
            <td>Attribute used to define members of groups.</td>
            <td>`membership_attribute = "member"`</td>
        </tr>
        <tr>
            <td><code>group_created_date_attribute</code></td>
            <td>This attribute is to be treated as the group created timestamp.</td>
            <td>`group_created_date_attribute = "whenCreated"`</td>
        </tr>
        <tr>
            <td><code>multi_attribute_separator</code></td>
            <td>
                This property is used to define a character to separate multiple attributes. This ensures that it
                will not appear as part of a claim value. Normally “,” is used to separate multiple attributes, but
                you can define ",,," or "..." or a similar character sequence
            </td>
            <td>`multi_attribute_separator = ","`</td>
        </tr>
        <tr>
            <td><code>case_insensitive_user_name</code></td>
            <td>
                Enables the case-insensitivity of the user's username. The default value is true for this configuration.
                <br> Eg: If a user's username is **test**, that user can also use the username as **TEST**.
            </td>
            <td>`case_insensitive_user_name = "true"`</td>
        </tr>
        <tr>
            <td><code>immutable_attributes</code></td>
            <td>
                This property is used to define a list of attributes that are considered unchangeable attributes in the user store.
                <br> This property needs to be configured only for user stores with **Read/Write** access.
            </td>
            <td>`immutable_attributes = "whenCreated,whenChanged,location"`</td>
        </tr>
    </tbody>
</table>
