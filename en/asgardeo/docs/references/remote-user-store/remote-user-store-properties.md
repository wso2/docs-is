# Remote agent properties

The following table provides descriptions of the key properties to apply in <code>deployment.toml</code> file to configure the agent and the user store that you need to connect.

!!! tip

    Asgardeo now offers an optimized remote user store connection designed for high scalability and performance. Currently this version only allows connecting a read-only user store with the remote user authentication and attribute retrieval.

    The new connection is continuously evolving to support more use cases in the future. For extended capabilities like read-write user stores, the classic remote user store remains available.

=== "Optimized Agent"

    <table>
        <tbody>
            <tr>
                <th>Configuration name</th>
                <th>Description</th>
                <th>Example</th>
            </tr>
            <tr>
                <td colspan="3" style="text-align: center;"><b>System configurations</b></td>
            </tr>
            <tr>
                <td><code>idle_connections</code><br>(optional)</td>
                <td>
                    Number of connections the remote agent opens with the server. 
                    <br>The default is 10. Max allowed is 50.
                </td>
                <td>`idle_connections = 10`</td>
            </tr>
            <tr>
                <td><code>connection_retry_count</code><br>(optional)</td>
                <td>
                    The number of times the system retries a connection when an attempt fails.
                    <br>Set -1 to try indefinitely.
                </td>
                <td>`connection_retry_count = 5`</td>
            </tr>
            <tr>
                <td><code>connection_retry_interval</code><br>(optional)</td>
                <td>The interval (in seconds) between consecutive connection retry attempts.</td>
                <td>`connection_retry_interval = 5`</td>
            </tr>
            <tr>
                <td><code>periodic_ping_interval</code><br>(optional)</td>
                <td>
                    The interval (in seconds) at which the agent sends a heartbeat or ping request to ensure the connection remains active. 
                    <br>The default is 10.
                </td>
                <td>`periodic_ping_interval = 10`</td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: center;"><b>User store connection configurations</b></td>
            </tr>
            <tr>
                <td><code>type</code></td>
                <td>
                    Type of the user store you are trying to connect to. You can update the type parameter as <code>ldap</code> 
                    if you are using LDAP (Lightweight Directory Access Protocol) and <code>active_directory</code> 
                    if you are using an Active Directory user store.
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
                    The username used to connect to the user store and perform various operations. This user does not 
                    have to be an administrator in the user store, but this user MUST have permission to read the user 
                    list and users' attributes and to perform search operations on the user store. The value you 
                    specify is used as the DN ( Distinguish Name ) attribute of the user.
                </td>
                <td>`connection_name = "uid=admin,ou=system"`</td>
            </tr>
            <tr>
                <td><code>connection_password</code></td>
                <td>Password for the ConnectionName user.</td>
                <td>`connection_password = "password"`</td>
            </tr>
            <tr>
                <td><code>connection_timeout</code><br>(optional)</td>
                <td>
                    Timeout in making the initial user store connection. This is configured in milliseconds. 
                    <br>The default is 5000.
                </td>
                <td>`connection_timeout = 5000`</td>
            </tr>
            <tr>
                <td><code>connection_retry_count</code><br>(optional)</td>
                <td>
                    The maximum number of retries for establishing the connection to the user store if the first attempt fails. 
                    <br>Set -1 to try indefinitely.
                </td>
                <td>`connection_retry_count = -1`</td>
            </tr>
            <tr>
                <td><code>connection_pool_size</code><br>(optional)</td>
                <td>The number of connections to be created in the user store connection pool. <br>The default is 10.</td>
                <td>`connection_pool_size = 10`</td>
            </tr>
            <tr>
                <td><code>max_result_size</code><br>(optional)</td>
                <td>
                    The maximum number of entries that can be returned in a single search result. 
                    Set 0 or remove the config to try indefinitely.
                </td>
                <td>`max_result_size = 100`</td>
            </tr>
            <tr>
                <td><code>request_timeout</code><br>(optional)</td>
                <td>
                    The timeout (in seconds) for a user store request to return the result. 
                    Set 0 or remove the config to wait indefinitely.
                </td>
                <td>`request_timeout = 15`</td>
            </tr>
            <tr>
                <td><code>enable_tls</code><br>(optional)</td>
                <td>Whether TLS (Transport Layer Security) should be used for secure connections to the user store.</td>
                <td>`enable_tls = true`</td>
            </tr>
            <tr>
                <td><code>use_start_tls</code><br>(optional)</td>
                <td>
                    Whether the connection should be upgraded to TLS using the STARTTLS command. 
                    <br>This configuration requires setting `enable_tls` to `false`.
                </td>
                <td>`use_start_tls = true`</td>
            </tr>
            <tr>
                <td><code>tls_cert_paths</code><br>(optional)</td>
                <td>List of absolute paths to the user store certificates.</td>
                <td>`tls_cert_paths = ["path/to/the/cert.pem"]`</td>
            </tr>
            <tr>
                <td><code>server_name</code><br>(optional)</td>
                <td>
                    Server name in the user store certificate. Requires only when the 
                    certificate is issued for a different cn.
                </td>
                <td>`server_name = "ldap.wso2.com"`</td>
            </tr>
            <tr>
                <td><code>ca_cert_paths</code><br>(optional)</td>
                <td>
                    Paths to the CA (Certificate Authority) certificates for verifying the 
                    user store certificate. Requires only when the user store is using an unknown CA.
                </td>
                <td>`ca_cert_paths = ["path/to/the/ca-certificates.crt"]`</td>
            </tr>
            <tr>
                <td><code>skip_server_cert_verification</code><br>(optional)</td>
                <td>
                    Whether to skip verifying the server's certificate during connection establishment. 
                    <br>The default value is `false`.
                </td>
                <td>`skip_server_cert_verification = false`</td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: center;"><b>User store properties</b></td>
            </tr>
            <tr>
                <td><code>user_search_base</code></td>
                <td>
                    DN of the context or object under which the user entries are stored in the user store. 
                    In this case, it is the "users" container. When the user store searches for users, 
                    it will start from this location of the directory.
                </td>
                <td>`user_search_base = "ou=Users,dc=example,dc=org"`</td>
            </tr>
            <tr>
                <td><code>user_entry_object_class</code></td>
                <td>The object class used to construct user entries.</td>
                <td>`user_entry_object_class = "inetOrgperson"`</td>
            </tr>
            <tr>
                <td><code>user_id_attribute</code></td>
                <td>
                    The attribute used for uniquely identifying a user entry. The value of the attribute 
                    is considered as the unique user Id.
                </td>
                <td>`user_id_attribute = "objectGuid"`</td>
            </tr>
            <tr>
                <td><code>user_name_attribute</code></td>
                <td>
                    The attribute used for uniquely identifying a user entry. Users can be authenticated 
                    using their email address, UID, etc. The name of the attribute is considered as the username.
                </td>
                <td>`user_name_attribute = "cn"`</td>
            </tr>
            <tr>
                <td><code>user_search_filter</code></td>
                <td>
                    Filtering criteria used to search for a particular user entry. The user search 
                    operation only returns objects created from this class.
                </td>
                <td>`user_search_filter = "(&(objectClass=user)(?=?))"`</td>
            </tr>
            <tr>
                <td><code>user_list_filter</code></td>
                <td>
                    Filtering criteria for listing all the user entries in the user store. This query or filter 
                    is used when doing search operations on users. The user list operation only returns objects 
                    created from this class.
                </td>
                <td>`user_list_filter = "(objectClass=user)"`</td>
            </tr>
            <tr>
                <td><code>multi_attribute_separator</code></td>
                <td>
                    This property is used to define a character to separate multiple attributes. This ensures that it 
                    will not appear as part of a claim value. By default “,” is used to separate multiple attributes. 
                    You can define ",,," or "..." or a similar character sequence.
                </td>
                <td>`multi_attribute_separator = ","`</td>
            </tr>
            <tr>
                <td><code>read_groups</code></td>
                <td>
                    Specifies whether groups should be read from the user store. If this is disabled by 
                    setting it to `false`, none of the groups in the user store can be read, and the 
                    following group configurations are NOT mandatory: group_search_base, group_entry_object_class, 
                    group_search_filter, group_list_filter, group_name_attribute or membership_attribute.
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
                <td>The object class used to construct group entries.</td>
                <td>`group_entry_object_class = "groupOfNames"`</td>
            </tr>
            <tr>
                <td><code>group_search_filter</code></td>
                <td>
                    Filtering criteria used to search for a particular group entry. The group search 
                    operation only returns objects created from this class.
                </td>
                <td>`group_search_filter = "(&(objectClass=groupOfNames)(?=?))"`</td>
            </tr>
            <tr>
                <td><code>group_list_filter</code></td>
                <td>
                    Filtering criteria for listing all the group entries in the user store. 
                    The group list operation only returns objects created from this class.
                </td>
                <td>`group_list_filter = "(objectClass=groupOfNames)"`</td>
            </tr>
            <tr>
                <td><code>group_name_attribute</code></td>
                <td>Attribute used for uniquely identifying a group entry. This attribute is treated as the group name.</td>
                <td>`group_name_attribute = "cn"`</td>
            </tr>
            <tr>
                <td><code>group_id_attribute</code></td>
                <td>
                    The attribute used for uniquely identifying a group entry. The value of the attribute is 
                    considered as the unique group id.
                </td>
                <td>`group_id_attribute = "gid"`</td>
            </tr>
            <tr>
                <td><code>group_created_date_attribute</code></td>
                <td>The attribute that contains the group created timestamp.</td>
                <td>`group_created_date_attribute = "whenCreated"`</td>
            </tr>
            <tr>
                <td><code>group_last_modified_date_attribute</code></td>
                <td>The attribute that contains the group modified timestamp.</td>
                <td>`group_last_modified_date_attribute = "whenChanged"`</td>
            </tr>
            <tr>
                <td><code>membership_attribute</code></td>
                <td>The attribute that contains the distinguished names (DN) of user objects that are in a group.</td>
                <td>`membership_attribute = "member"`</td>
            </tr>
            <tr>
                <td><code>memberof_attribute</code></td>
                <td>
                    The attribute that contains the distinguished names (DN) of group objects that a user 
                    is assigned to. <br>Only requires to define either `membership_attribute` or `memberof_attribute`.
                </td>
                <td>`memberof_attribute = "memberOf"`</td>
            </tr>
            <tr>
                <td><code>binary_attributes</code></td>
                <td>
                    Comma-separated list of binary attributes. Requires only if you have binary attributes in the user store.
                </td>
                <td>`binary_attributes = "objectGUID"`</td>
            </tr>
            <tr>
                <td><code>timestamp_attributes</code></td>
                <td>Comma-separated list of timestamp attributes. Requires only if you need to retrieve timestamp attributes.</td>
                <td>`timestamp_attributes = "whenCreated,whenChanged"`</td>
            </tr>
        </tbody>
    </table>

=== "Classic Agent"

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
