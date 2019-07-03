# Adding High Availability for LDAP

When connecting the WSO2 Identity Server to an external LDAP user store,
it may be necessary to have high availability for the LDAP as it
includes user information that must be available at all times. To attain
high availability for your LDAP, you would replicate the LDAP server to
effectively handle failover.

This topic provides instructions on how to configure the WSO2 Identity
Server when you add high availability to your LDAP.

1.  Open the
    `          <PRODUCT_HOME>/repository/conf/user-mgt.xml         `
    file and find the user store manager class relevant for your LDAP.  
    `          <UserStoreManager class="org.wso2.carbon.user.core.ldap.LDAPUserStoreManager">         `
2.  Failover for LDAP is configured by defining LDAP connection URLs
    with a space between them. Under the
    `           UserStoreManager          ` tag, modify the
    `           ConnectionURL          ` property. See the example
    below.  
    `           <Property name="ConnectionURL">ldap://localhost:10500 ldap://localhost:10511</Property>                     `

    !!! note
    
        This can be done for either a primary or secondary LDAP user store
        with failover configuration. In this example, if you cannot connect
        to ldap://localhost:10500, you can automatically connect to
        ldap://localhost:10511.
    
