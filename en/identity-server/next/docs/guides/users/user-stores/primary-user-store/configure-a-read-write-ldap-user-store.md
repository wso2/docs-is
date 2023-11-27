# Configure a Read-write LDAP user store

Refer [properties for a read-write LDAP user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-read-write-ldap-user-store/) to find the properties which are supported for read-write LDAP user stores. Below is a sample with minimum configurations and properties to change the primary user store to a Read-Write LDAP user store.

``` toml
[user_store]
type = "read_write_ldap_unique_id"
base_dn = "ou=system"
connection_url = "ldap://localhost:10389"
connection_name = "uid=admin,ou=system"
connection_password = "admin"
```

## Update the system administrator

The **admin** user is the super tenant that will be able to manage all
other users, roles, and permissions in the system. Therefore, the user that should have admin
permissions is required to be stored in the user store when you start
the system for the first time. Since the LDAP user store can be written
to, you have the option of creating a new admin user in the user store
when you start the system for the first time. Alternatively, you can
also use a user ID that already exists in the LDAP. For information
about the system administrator user, see [Configuring the System
Administrator]({{base_path}}/deploy/configure/user-stores/configure-system-administrator).

These two alternative configurations can be done as explained below.

-   If you are using a user that is already in the LDAP. Find a valid user that already resides in the user store. For 
    example, say a valid username is
    AdminSOA.Add the following configuration to the `deployment.toml` file as shown below. You do not have to update the password element as it is already set in the user store.
    
    ```toml
    [super_admin]
    username = "AdminSOA"
    admin_role = "admin"
    create_admin_account = false
    ```

-   if you are creating a new admin user in the user store when you start the system. you can add the super tenant
    user to the user store. Add the following configuration to the `deployment.toml` file as shown below.
    
    ```toml
    [super_admin]
    username = "AdminSOA"
    admin_role = "admin"
    create_admin_account = true
    password = admin
    ```
