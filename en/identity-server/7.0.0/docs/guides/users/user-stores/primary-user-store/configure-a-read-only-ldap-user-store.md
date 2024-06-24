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

!!! note
    It is recommended to use the `createTimestamp` and `modifyTimestamp` operational attributes for
    `created` and `modified` attributes. Therefore, add the following to the `deployment.toml` file.
    ``` toml
    [user_store]
    timestamp_attributes = "modifyTimestamp,createTimestamp"
    immutable_attributes = "resourceType,entryUUID,modifyTimestamp,createTimestamp"
    ```

    !!! warning
        If there are more immutable attributes, you need to add them to the `immutable_attributes` property.    

### Initial configuration for new servers

If you are configuring a server that has not been started yet, you need to update the claim mappings in
`<carbon_home>/repository/conf/claim-config.xml` file.

!!! note
    Following are some of the mandatory claims that you need to map with the user store attributes.

      - `http://wso2.org/claims/username`
      - `http://wso2.org/claims/userid`
      - `http://wso2.org/claims/created`
      - `http://wso2.org/claims/modified`

    For `created` and `modified` claims, it is recommended to use the `createTimestamp` and `modifyTimestamp` 
    operational attributes.

    For `username` and `userid` claims, the `Username Attribute` and `User ID Attribute` properties configured in the User Store configuration should be used to ensure proper user authentication.

### Updating configuration for existing servers

!!! warning
    Changing the primary user store of a production server can have a significant impact on the users and the applications that are using the system. Therefore, it is recommended to have a scheduled maintenance window to perform this task.

Before you change `deployment.toml` with above configurations, you need to change the attributes mappings for the
`PRIMARY` user store by navigating to the **User Attributes & Stores** > **Attributes** section of the console. After
updating the mappings, shutdown the server, update the `deployment.toml` file and restart the server to apply the
configurations.

!!! note
    Following are some of the mandatory claims that you need to map with the user store attributes.

      - `http://wso2.org/claims/username`
      - `http://wso2.org/claims/userid`
      - `http://wso2.org/claims/created`
      - `http://wso2.org/claims/modified`
    
    Refer to the [Update Attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes) 
    to learn more on updating attribute mappings. For `created` and `modified` attributes, it is recommended to use the 
    `createTimestamp` and `modifyTimestamp` operational attributes.

    For `username` and `userid` claims, the `Username Attribute` and `User ID Attribute` properties configured in the User Store configuration should be used to ensure proper user authentication.

    !!! Warning
        If you have more than one tenant, you need to change the attributes mappings for each tenant before adding the 
        new configurations to the `deployment.toml` file.
        
        If are planning to create new tenants in the future, you need to update the claim mappings in 
        `<carbon_home>/repository/conf/claim-config.xml`. 


## Configure tenant manager

Configure the tenant manager to user CommonHybridLDAPTenantManager.  Make sure to configure `RootPartition` property
as it determines the root of the LDAP tree.

``` toml
[tenant_manager.ldap]
enabled=true
class="org.wso2.carbon.user.core.tenant.CommonHybridLDAPTenantManager"
[tenant_manager.ldap.properties]
RootPartition="dc=example,dc=org"
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
