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


!!! note
    It is required to edit the claim mappings in WSO2 IS according to the user claims of the Active Directory version you have configured.<br />
    Before starting the server, edit the `<IS_HOME>/repository/conf/claim-config.xml` configuration file and change the `AttributeID` of the `Created Time` and `Last Modified Time` claims to `whenCreated` and `whenChanged` respectively.
    Start the server and edit the rest of the required claim mappings as explained in [update attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes).
