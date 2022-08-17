# Add High Availability for LDAP

When connecting the WSO2 Identity Server to an LDAP user store,
it may be necessary to have high availability for the LDAP as it
includes user information that must be available at all times. To attain
high availability for your LDAP, you would replicate the LDAP server to
effectively handle failover.

This topic provides instructions on how to configure WSO2 Identity Server when you add high availability to your LDAP.

1.  Open the `<IS_HOME>/repository/conf/deployment.toml`
    file and find the userstore manager config relevant to your LDAP.  
    
    ```
    [user_store]
    type = "read_write_ldap_unique_id"
    ...
    ```
    
2.  Failover for LDAP is configured by defining LDAP connection URLs.
    Add `connection_url` to the `deployment.toml` file. Following is an example of how this can be configured.
    
    ```
    [user_store]
    type = "read_write_ldap_unique_id"
    connection_url = "ldap://localhost:10500 ldap://localhost:10511"
    ...
    ```
    
    !!! note
        This can be done for either a primary or secondary LDAP userstore
        with failover configuration. In this example, if you cannot connect
        to `ldap://localhost:10500`, you automatically connect to
        `ldap://localhost:10511`.
    
    !!! note
            To know more about new configurations, see [New Configuration Model]({{base_path}}/references/new-configuration-model).
   
    
