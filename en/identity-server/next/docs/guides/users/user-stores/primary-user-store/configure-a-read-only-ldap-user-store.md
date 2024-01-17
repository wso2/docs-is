# Configure a Read-only LDAP User store

Refer [properties for a read-only LDAP user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-read-only-ldap-user-store) to find the properties which are supported for read-only LDAP user stores. Below is a sample with minimum configurations and properties to change the primary user store to a Read-Only LDAP user store.

``` toml
[user_store]
type = "read_only_ldap_unique_id"
base_dn = "ou=system"
connection_url = "ldap://localhost:10389"
connection_name = "uid=admin,ou=system"
connection_password = "admin"
```

## Update the system administrator

The admin user is the super tenant that will be able to manage all other
users, roles, and permissions in the system. Therefore, the user that should have admin
permissions is required to be stored in the user store when you start
the system for the first time. By default, the system will create an admin
user in the LDAP that has admin permissions. However, this cannot be done if the
LDAP user store is read-only. Hence, that capability should be disabled in the `<IS_HOME>/repository/conf/deployment.toml` file as follows.

```toml
[super_admin]
username = "admin"
admin_role = "admin"
create_admin_account = false
```

-   **create_admin_account:** This should be set to 'False' as it will not be
    allowed to create users and roles in a read-only user store.
-   **admin_role:** The admin role you enter here should already
    exist in the read-only user store. Otherwise, you must enter an internal role, which will be saved to the internal database of the system when the system starts for the first time.
-   **username:** Since we are configuring a read-only LDAP as the
    primary user store, the user that should have admin permissions is required to be stored in the user store when you start the system for the first time. For example, say a valid username is AdminSOA.
    Update the `         username       ` section of your configuration as shown above. You do not have to update the password element as it is already set in the user store.  

For information about the system administrator user, see [Configure the System Administrator]({{base_path}}/deploy/configure/user-stores/configure-system-administrator), and for
information on how keystores are used in WSO2 Identity Server, see [Use Asymmetric Encryption]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption).  
