# Configuring a Read-Only LDAP User Store

User management functionality is provided by default in all WSO2
Carbon-based products and is configured in the
`         deployment.toml       ` file found in the
`         <IS_HOME>/repository/conf/        ` directory. This
documentation explains the process of setting up a primary user store
for your system.

!!! info "The default User Store"
    The primary user store that is configured by default in WSO2 Identity Server
    is an LDAP user store, This database is used by the Authorization Manager (for user authentication
    information) as well as the User Store Manager (for defining users and
    roles).

We can specify the type of user store that we are using in the `         deployment.toml       ` file. 
If we specified it as a JDBC user store by default,  For detailed guide on configuring 
RDBMS database as a datasource see  [Working With Databases](../../administer/working-with-databases).


Note that the RDBMS used in the default configuration can remain as the
database used for storing Authorization information.

Follow the given steps to configure a read-only LDAP/AD as the primary
user store:


### Step 1: Setting up the read-only LDAP/AD user store manager
       `

1.  Replace the default `user_store` configuration in the `         <IS_HOME>/repository/conf/deployment.toml        
` file, as follows.

    ``` toml
    [user_store]
    type = "read_only_ldap"
    ```
2.  Given below is a default configuration for the LDAP/AD user store configuration in
    read-only mode. You can change the values to match your LDAP/AD. For
    descriptions on each of the properties, see [Properties of User
    Stores](../../administer/working-with-properties-of-user-stores).

    ``` xml
        <UserManager>
        <Realm>
        ...
        <UserStoreManager class="org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager"> 
                    <Property name="TenantManager">org.wso2.carbon.user.core.tenant.CommonHybridLDAPTenantManager</Property>
                    <Property name="ConnectionURL">ldap://localhost:10389</Property>
                    <Property name="ConnectionName">uid=admin,ou=system</Property>
                    <Property name="ConnectionPassword">admin</Property>
                    <Property name="AnonymousBind">false</Property>
                    <Property name="UserSearchBase">ou=system</Property>
                    <Property name="UserNameAttribute"></Property>
                    <Property name="UserNameSearchFilter">(&amp;(objectClass=person)(uid=?))</Property>
                    <Property name="UserNameListFilter">(objectClass=person)</Property>
                    <Property name="DisplayNameAttribute"/>
                    <Property name="ReadGroups">true</Property>
                    <Property name="GroupSearchBase">ou=system</Property>
                    <Property name="GroupNameAttribute">cn</Property>
                    <Property name="GroupNameSearchFilter">(&amp;(objectClass=groupOfNames)(cn=?))</Property>
                    <Property name="GroupNameListFilter">(objectClass=groupOfNames)</Property>
                    <Property name="MembershipAttribute">member</Property>
                    <Property name="BackLinksEnabled">false</Property>
                    <Property name="UsernameJavaRegEx">[a-zA-Z0-9._-|//]{3,30}$</Property>
                    <Property name="PasswordJavaRegEx">^[\S]{5,30}$</Property>
                    <Property name="RolenameJavaRegEx">[a-zA-Z0-9._-|//]{3,30}$</Property>
                    <Property name="SCIMEnabled">false</Property>
                    <Property name="PasswordHashMethod">PLAIN_TEXT</Property>
                    <Property name="MultiAttributeSeparator">,</Property>
                    <Property name="MaxUserNameListLength">100</Property>
                    <Property name="MaxRoleNameListLength">100</Property>
                    <Property name="UserRolesCacheEnabled">true</Property>
                    <Property name="ConnectionPoolingEnabled">true</Property>
                    <Property name="LDAPConnectionTimeout">5000</Property>
                    <Property name="ReadTimeout"/>
                    <Property name="RetryAttempts"/>
                    <Property name="ReplaceEscapeCharactersAtUserLogin">true</Property> 
                </UserStoreManager>
        </Realm>
        </UserManager> 
    ```

    1.  Update the connection details by adding configuration to `deployment.toml` to match your user store. For
        example: 
        
        ```toml
        [user_store.properties]
        "ConnectionURL" = "ldap://localhost:10389"
        ```

        For Active Directory, the connection URL should have the following
        format:

        ```toml
        [user_store.properties]
        "ConnectionURL" = "ldap://<AD host-ip>:<AD_listen_port>"
        ```

        !!! note
            If you are using `             ldaps            ` (secured LDAP)
            to connect to the LDAP/Active Directory:
    
            -   You need set the
                `               ConnectionURL              ` as shown
                below.  
    
                ``` xml
                <Property name="ConnectionURL">ldaps://10.100.1.100:636</Property>
                ```
                ```toml
                [user_store.properties]
                "ConnectionURL" = "ldaps://10.100.1.100:636"
                ```
    
            -   For Active Directory, you need to import the certificate of
                Active Directory to the
                `               client-truststore.jks              ` of the
                WSO2 product. For information on how to add certificates to
                the truststore and how keystores are configured and used in
                a system, see [Using Asymmetric
                Encryption](../../administer/using-asymmetric-encryption).
    
            -   You also need to [enable connection
                pooling](../../administer/performance-tuning#pooling-ldaps-connections)
                for LDAPS connections at the time of starting your server,
                which will enhance server performance.
        

    2.  Obtain a user who has permission to read all users/attributes
        and perform searches on the user store from your LDAP/Active
        Directory administrator. For example, if the privileged user is
        AdminLDAP and the password is 2010\#Avrudu, update the following
        sections of the user store configuration as shown below. Note
        that this user does NOT have to be the system administrator that
        you define
        [here](#updating-the-system-administrator)
        .

        ``` xml
        <Property name="ConnectionName">uid=AdminLDAP,ou=system</Property>
        <Property name="ConnectionPassword">2010#Avrudu</Property>
        ```
        ```toml
        [user_store.properties]
        "ConnectionName" = "uid=AdminLDAP,ou=system"
        "ConnectionPassword" = "2010#Avrudu"
        ```

    3.  Update property
        `             UserSearchBase       ` with
        the directory name where the users are stored. When LDAP
        searches for users, it will start from this location of the
        directory.

        ``` xml
        <Property name="UserSearchBase">ou=system</Property> 
        ```
        ```toml
        [user_store.properties]
        "UserSearchBase" = "ou=system"
        ```

    4.  Set the attribute to use as the username, typically either
        `             cn            ` or `             uid            `
        for LDAP. Ideally property,
        `             UserNameAttribute           `
        and property,
        `             UserNameSearchFilter          `
        should refer to the same attribute. If you are not sure what
        attribute is available in your user store, check with your
        LDAP/Active Directory administrator.

        For example:

        ```toml
        [user_store.properties]
        "UserNameAttribute" = "uid"
        ```

    5.  Set the `             ReadGroups            ` property to
        'true', if it should be allowed to read roles from this user
        store. When this property is 'true', you must also specify
        values for the `             GroupSearchBase            `,
        `             GroupSearchFilter            ` and
        `             GroupNameAttribute            ` properties. If the
        `             ReadGroups            ` property is set to
        'false', only Users can be read from the user store. You can set
        the configuration to read roles from the user store by reading
        the user/role mapping based on a membership (user list) or
        backlink attribute as shown below.  
          
        To read the user/role mapping based on a membership (This is
        used by the `             ApacheDirectory            ` server
        and `             OpenLDAP)            ` :

        -   Enable the `               ReadGroups              `
            property.
            
            ```toml
            [user_store.properties]
            "ReadGroups" = true
            ```

        -   Set the `               GroupSearchBase              `
            property to the directory name where the Roles are stored.
            That is, the roles you create using the management console
            of your product will be stored in this directory location.
            Also, when LDAP searches for users, it will start from this
            location of the directory. For example:  

            ``` xml
            <Property name="GroupSearchBase">ou=system,CN=Users,DC=wso2,DC=test</Property>
            ```
            ```toml
            [user_store.properties]
            "GroupSearchBase" = "ou=system,CN=Users,DC=wso2,DC=test"
            ```

        -   Set the GroupSearchFilter and GroupNameAttributes. For
            example:  
            
            ```toml
            [user_store.properties]
            "GroupSearchFilter" = "(objectClass=groupOfNames)"
            "GroupNameAttribute" = "cn"
            ```

        -   Set the `               MembershipAttribute              `
            property as shown below:  
            
            ```toml
            [user_store.properties]
            "MembershipAttribute" = "member"
            ```

        To read roles based on a backlink attribute, use
        thefollowingcodesnipetinsteadofthe above:
        
        ```toml
        [user_store.properties]
        "ReadGroups" = false
        "GroupSearchBase" = "ou=system"
        "GroupSearchFilter" = "(objectClass=groupOfNames)"
        "GroupNameAttribute" = "cn"
        "MembershipAttribute" = "member"
        "BackLinksEnabled" = "true"
        "MembershipOfAttribute" = "memberOf"
        ```

    6.  For Active Directory, you can use property, 
        `             Referral            `
        to enable referrals within the user store. The AD user store may
        be partitioned into multiple domains. However, according to the
        use store configurations in the
        `             deployment.toml            ` file, we are only
        connecting to one of the domains. Therefore, when a request for
        an object is received to the user store, when the property
        `             Referral          ` set to `follow`
        it ensures that all the domains in the directory will be
        searched to locate the requested object.
        
        ```toml
        [user_store.properties]
        "Referral" = "follow"
        ```

    7.  In WSO2 products based on Carbon 4.5.x, you can set the
        `             LDAPConnectionTimeout            ` property: If
        the connection to the LDAP is inactive for the length of time
        (in milliseconds) specified by this property, the connection
        will be terminated.
        
        ```toml
        [user_store.properties]
        "LDAPConnectionTimeout" = 20
        ```

<a name = "updating-the-system-administrator"></a>

### Step 2: Updating the system administrator

The admin user is the super tenant that will be able to manage all other
users, roles and permissions in the system by using the management
console of the product.

Therefore, the user that should have admin
permissions is required to be stored in the user store when you start
the system for the first time. By default system will create a admin
user in the LDAP that has admin permissions.But this cannot be done it the
LDAP user store is read only.Hence that capability should be disabled as follows.

```toml
[super_admin]
username = "admin"
admin_role = "admin"
create_admin_account = false
```

-   **create_admin_account:** This should be set to 'False' as it will not be
    allowed to create users and roles in a read-only user store.
-   **admin_role:** The admin role you enter here should already
    exist in the read-only user store. Otherwise, you must enter an
    internal role, which will be saved to the internal database of the
    system when the system starts the first time.
-   **username:** Since we are configuring a read-only LDAP as the
    primary user store, the user that should have admin permissions is
    required to be stored in the user store when you start the system
    for the first time. For example, say a valid username is AdminSOA.
    Update the `         username       ` section of your
    configuration as shown above. You do not have to update the password
    element as it is already set in the user store.  

For information information about the system administrator user, see
[Configuring the System
Administrator](../../learn/configuring-the-system-administrator), and for
information on how keystores are used in WSO2 products, see [Using
Asymmetric Encryption](../../administer/using-asymmetric-encryption).  

### Step 3: Starting the server

Start your server and try to log in as the admin user you specifie
d. The password is the admin user's password in the LDAP server.

  
