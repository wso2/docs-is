# Manage User Attributes

When using the WSO2 Identity Server (WSO2 IS) for user and role management, it is
important to understand how to manage the attributes of users within it. The claim management functionality helps to map each user attribute to a relevant claim and thereafter manage it.

There two main ways to view, add, edit, and delete attributes of a user.

- By accessing the profile of the user and changing the attributes using the Management Console. 
- You can use the REST API according to the SCIM 2.0 provisioning specification. For more information on this, see [Use the SCIM 2.0 REST APIs]({{base_path}}/apis/scim2-rest-apis/).


## Claim mapping when using multiple user stores

When you are using more than one user store, you must map the attributes
correctly by [adding a claim mapping](../../../../guides/dialects/add-claim-mapping/).

Under “Mapped Attribute(s)”, you need to follow the pattern.

![mapped-attributes]({{base_path}}/assets/img/fragments/mapped-attributes.png)

However, for the default user store, you do not need to provide the
domain name. As an example, if you have two user stores, one is the
default and another one with domain “DEMO” then the pattern would be as
follows for `http://wso2.org/claims/emailaddress`.

``` java
DEMO/mail
```

<!--

### Attributes with multiple values

If your user store supports multiple values for attributes, the
WSO2 Identity Server can view, add, update, or delete them (normally
LDAP/AD offer support for this). The following are the different ways
you can do this.

1.  In WSO2 Identity Server Management Console, multiple attribute values are separated by commas. If you want to update two email addresses
    using the user profile UI, you must provide it as follows:

    ``` java
    asela@soasecurity.com,aselapathberiya@soasecurity.com
    ```

    See the following screen for how this will look in the user
    interface of the Identity Server Management Console.  
    ![is-user-interface]({{base_path}}/assets/img/fragments/is-user-interface.png)

2.  When using the `RemoteUserStoreManagerService` API, call it as follows.

    ``` java
    setUserClaimValue("username", "http://wso2.org/claims/emailaddress", "asela@soasecurity.org,aselapathberiya@gmail.com", null)
    ```

    The GET results are returned in the form of comma separated values
    for the attribute.

    ``` java
    "asela@soasecurity.org,aselapathberiya@gmail.com"
    ```

    The following screen shows how this looks in the LDAP.  
    ![ldap-interface]({{base_path}}/assets/img/fragments/ldap-interface.png)

## Write custom attributes

See [Writing a Custom Userstore Manager]({{base_path}}/deploy/write-a-custom-user-store-manager/) for more information on
this.

<!--

### Authentication using multiple attributes

-   Once you connect your LDAP with an application, generally, the
    application uses one of the unique attributes in LDAP by default, to authenticate the user.
-   This is done by specifying the attribute in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory. For example, you can specify either the `uid` or `mail` attribute to authenticate the user.

    ``` toml
    [user_store]
    user_name_attribute  =  "uid"
    ```

    In this case, the `uid` value is used as the username to authenticate the user in that application.

It is also possible for the application to choose from **many** attributes to authenticate. For example, assume that users are given the flexibility to authenticate using either their **uid** and **mail** attributes in the LDAP.

1.  Configure the LDAP user store-related configurations using the `deployment.toml` file found in the 
    `<IS_HOME>/repository/conf` directory. For more information on configuring userstores, see 
    [Configuring the Realm]({{base_path}}/deploy/configure-the-realm/).
    
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
        authentication, see [Using Email Address as the Username]({{base_path}}/guides/identity-lifecycles/enable-email-as-username/).

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
    My Account by providing either the `          mail         `
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

-->



