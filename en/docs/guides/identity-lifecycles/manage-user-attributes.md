# Manage User Attributes

When using the WSO2 Identity Server (WSO2 IS) for user and role management, it is
important to understand how to manage the attributes of users within it.
The claim management functionality helps to map each user attribute to a relevant claim and thereafter manage it.

The following topics provide instructions on how to manage user attributes in WSO2 IS.

---

## Manage the attributes of a user

The following are the two main ways to view, add, edit, and delete
attributes of a user.

1.  By accessing the profile of the user and changing the attributes
    using the Management Console. 
2.  You can use the REST API according to the SCIM 2.0 provisioning specification. For more information on this, see [Use the SCIM 2.0 REST APIs](../../../develop/apis/scim2-rest-apis/).

---

## Claim mapping when using multiple userstores 

{! fragments/attribute-mapping.md !}


### Attributes with multiple values

{! fragments/attributes-with-multiple-values.md !}


---

## Write custom attributes

See [Writing a Custom Userstore Manager](../../../deploy/write-a-custom-user-store-manager/) for more information on
this.

### Authentication using multiple attributes

!!! warning
    Multi attribute login is only supported for LDAP/AD user stores and is
    **not supported** for JDBC user stores.

-   Once you connect your LDAP with an application, generally, the
    application uses one of the unique attributes in LDAP by default, to authenticate the user.
-   This is done by specifying the attribute
    in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory. For
    example, you can specify either the `uid` or `mail` attribute to authenticate the user.

    ``` toml
    [user_store]
    user_name_attribute  =  "uid"
    ```

    In this case, the `           uid          ` value is used as the
    username to authenticate the user in that application.

It is also possible for the application to choose amongst **many** attributes to
authenticate. For example, assume that users are given the flexibility to
authenticate using either their **uid** and **mail** attributes in the
LDAP.

1.  Configure the LDAP user store-related configurations using the `deployment.toml` file found in the 
    `<IS_HOME>/repository/conf` directory. For more information on configuring userstores, see 
    [Configuring the Realm](../../../deploy/configure-the-realm/).
    
    1.  Configure the `user_name_search_filter`
        property as shown below to search for the user object in the
        LDAP, using both **mail** and **uid** attributes.

        ``` toml
        [user_store]
        user_name_search_filter = "(&amp;(objectClass=person)(|(uid=?)(email=?)))"
        ```

    2.  Disable the `user_dn_pattern` property if
        it is currently enabled.

        ``` toml
        [user_store]
        user_dn_pattern = "uid={0},ou=Users,dc=wso2,dc=org"
        ```

    3.  The `mail` attribute has unique requirements. If you are using the
        `mail` attribute, add the following. For more information on email
        authentication, see [Using Email Address as the Username](../../../guides/identity-lifecycles/enable-email-as-username/)
        .

        ``` toml
        [tenant_mgt]
        enable_email_domain = true
        ```

2.  If you want to work with multiple attributes (basically to retrieve
    internal roles with multiple attributes), do one of the following
    depending on which userstore you want to configure this for:

    -   **Configuration for primary user store:** Add the following
        property in the `<IS_HOME>/repository/conf/deployment.toml`

        ``` toml
        [user_store]
        properties.MultipleAttributeEnable = true
        ```

3.  To test this, restart WSO2 IS and attempt to log in to the
    user portal by providing either the `          mail         `
    or `          uid         ` values with the same password.

---

## Customize the claim for the user attribute

If you are using multiple attribute authentication and want to customize
the claim to be used for user name attribute, add the following configuration to the `         <IS_HOME>/repository/conf/deployment.toml        `
file.

``` toml
[authentication.authenticator.basic] 
name ="BasicAuthenticator"
enable=true

[authentication.authenticator.basic.parameters]
UserNameAttributeClaimUri = "http://wso2.org/claims/emailaddress"
```

This will return the email address of the authenticated user. It can be
configured to return any attribute by changing the
`         UserNameAttributeClaimUri        `  parameter.



