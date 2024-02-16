# Configure a Read-write Active Directory User store

!!! tip    
    For Read-only Active Directory user store manager configuration, use [read-only LDAP user store manager configuration properties]({{base_path}}/guides/users/user-stores/primary-user-store/configure-a-read-only-ldap-user-store/).

Refer [Properties for a read-write Active Directory user store]({{base_path}}/guides/users/user-stores/user-store-properties/properties-read-write-active-directory-user-store/) to find the properties which are supported for read-write Active Directory user stores. Below is a sample with minimum configurations and properties to change the primary user store to a read-write Active Directory user store.

```toml
[user_store]
type = "active_directory_unique_id"
base_dn = "dc=wso2,dc=org"
connection_url = "ldaps://10.100.1.102:639"
connection_name = "cn=admin,ou=system"
connection_password = "admin"
```

In addition to the above, please make sure that you import the Active Directory user store public certificate to the 
WSO2 Identity Server’s client trust store. To perform this, you need to navigate to the 
`<IS_HOME>repository/resources/security` directory and execute the following command to import the certificate to 
client-truststore of WSO2 Identity Server.

```
keytool -import -alias certalias -file <certificate>.pem -keystore client-truststore.jks -storepass wso2carbon
```

!!! note
    `wso2carbon` is the keystore password of the default client-truststore.jks file of WSO2 Identity Server.

Furthermore, please make sure to follow the steps mentioned in [Configure Active Directory User stores for SCIM 2.0 based Inbound Provisioning]({{base_path}}/guides/users/user-stores/configure-active-directory-user-stores-for-scim2) 
since SCIM is enabled by default from the WSO2 Identity Server 5.10.0 onwards.


### Configuring a fresh server
If you are configuring a server that has not been started yet, you need to update the claim mappings in
`<carbon_home>/repository/conf/claim-config.xml`.

!!! note
    Following are some of the mandatory claims that you need to map with the user store attributes.

      - `http://wso2.org/claims/username`
      - `http://wso2.org/claims/userid`
      - `http://wso2.org/claims/created`
      - `http://wso2.org/claims/modified`

    For `created` and `modified` claims, it is recommended to use the `whenCreated` and `whenChanged` 
    operational attributes.

### Configuring an already started server
Before you change `deployment.toml` with above configurations, you need to change the claim mappings for the
`PRIMARY` user store by navigating to the `User Attributes & Stores > Attributes` section of the console. After
updating the mappings, shutdown the server, update the `deployment.toml` and restart the server to apply the
configurations.

!!! note
    Following are some of the mandatory claims that you need to map with the user store attributes.

      - `http://wso2.org/claims/username`
      - `http://wso2.org/claims/userid`
      - `http://wso2.org/claims/created`
      - `http://wso2.org/claims/modified`
    
    Refer to the [Update Attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes) 
    to learn more on updating attribute mappings.  For `created` and `modified` claims, it is recommended to use the 
    `whenCreated` and `whenChanged` operational attributes.

    !!! Warning
        If you have more than one tenant, you need to change the claim mappings for each tenant before adding the 
        new configurations to the `deployment.toml` file.
        
        If are planning to create new tenants in the future, you need to update the claim mappings in 
        `<carbon_home>/repository/conf/claim-config.xml`. 


## Configure tenant Manager
Configure the tenant manager to user CommonHybridLDAPTenantManager.  Make sure to configure `RootPartition` property
as it determines the root of the LDAP tree.

``` toml
[tenant_manager.ldap]
enabled=true
class="org.wso2.carbon.user.core.tenant.CommonHybridLDAPTenantManager"
[tenant_manager.ldap.properties]
RootPartition="dc=example,dc=org"
```
