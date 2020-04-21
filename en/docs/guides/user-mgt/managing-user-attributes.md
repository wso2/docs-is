# Managing User Attributes

When using the WSO2 Identity Server (WSO2 IS) for user and role management, it is
important to understand how to manage the attributes of users within it.
In WSO2 IS, each user store attribute can be mapped as a
claim. Therefore, you need to use the claim management functionality
available in WSO2 IS to properly map your LDAP/AD/JDBC user
store attributes with the claim URIs defined by WSO2 IS. You
can also add different claim URIs and manage them using claim
management.

The following topics provide instructions on how to manage user
attributes in WSO2 IS.

## Managing the attributes of a user

The following are the three main ways to view, add, edit, and delete
attributes of a user.

1.  By accessing the profile of the user and changing the attributes
    using the [admin Portal](link-admin-portal)
2.  You can use the REST Web service according to the SCIM provisioning specification. For more information on this, see [Using the SCIM 2.0 REST APIs](link-using-the-scim-2.0-rest-apis).
3.  You can use the `           RemoteUserStoreManagerService          `
    API. This is a SOAP-based API and is very easy to use. For more
    information on using this, see [Managing Users and Roles with
    APIs](insert-link). Supposing you want to
    set a user attribute, you can call the following method.

    ``` java
    setUserClaimValue("username", "http://wso2.org/claims/emailaddress", "mark@soasecurity.org", null)
    ```

    Here, `http://wso2.org/claims/emailaddress` is the claim URI that
    has been mapped with the user store’s email attribute. The last
    parameter is profile, we can just pass “null”, as there is only one
    profile. You can retrieve the user attribute value as follows.

    ``` java
    getUserClaimValue("username", "http://wso2.org/claims/emailaddress", null)
    ```

## Claim mapping when using multiple user stores 

{!fragments/xxx!}

### Attributes with multiple values

{!fragments/xxx!}

### Writing custom attributes

Supposing the attributes of a user are stored in both the user store
(LDAP) and another location (JDBC table), WSO2 IS needs to
retrieve/add the user’s attribute in both these places. In scenarios
like this, you can simply extend the current user store manager implementation and write a
custom implementation to do it. In the custom user store implementation,
you only need to extend the following three methods that help to
retrieve/add a user attribute. Other methods can be kept as they are.

-   Method 1.

    ``` java
    public Map<String, String> getUserPropertyValues(String userName, String[] propertyNames, String profileName) throws UserStoreException
    ```

-   Method 2.

    ``` java
    protected abstract void doSetUserClaimValue(String userName, String claimURI, String claimValue, String profileName) throws UserStoreException;
    ```

-   Method 3.

    ``` java
    protected abstract void doSetUserClaimValues(String userName, Map<String, String> claims, String profileName) throws UserStoreException;
    ```

See [Writing a Custom User Store Manager](insert-writing-a-custom-user-store-manager) for more information on
this.

### Authentication using multiple attributes

!!! warning
    Multi attribute login is only supported for LDAP/AD user stores and is
    **not supported** for JDBC user stores.
    

WSO2 Identity Server can be deployed with any LDAP based server and it
can expose authentication via a Web Service API, SAML, OAuth, OpenID,
etc. By default, WSO2 IS is configured to authenticate with only one
user attribute in the LDAP.

-   In a user store, each user has different attributes such as
    `          uid         `, `          cn         `, and
    `          email         `. Some attributes, such as
    `          uid         ` and `          mail         ` attributes,
    are unique to the user.
-   Once you connect your LDAP with an application, generally, the
    application uses one of the unique attributes in LDAP to
    authenticate the user.
-   This is done by specifying the attribute
    in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory. For
    example, you can specify either the `uid` or `mail` attribute to authenticate the user.

    ``` toml
    [user_store]
    user_name_attribute  =  "uid"
    ```

    In this case, the `           uid          ` value is used as the
    username to authenticate the user in that application.

It is also possible for the application to use **both** attributes to
authenticate. This means that end users can be authenticated in the
application using either their **uid** or **mail** attribute values.
This section provides instructions on how the WSO2 IS can be extended to
authenticate users using more than one attribute. For the purposes of
this example, assume that users are given the flexibility to
authenticate using either their **uid** and **mail** attributes in the
LDAP.

1.  Configure the LDAP user store-related configurations using the `deployment.toml` file found in the 
    `<IS_HOME>/repository/conf` directory. For more information on configuring user stores, see 
    [Configuring the Realm](insert-configuring-the-realm).
    
    1.  Configure the `user_name_search_filter`
        property as shown below to search for the user object in the
        LDAP, using both **mail** and **uid** attributes.

        ``` toml
        [user_store]
        user_name_search_filter = "(&amp;(objectClass=person)(uid=?))"
        ```

    2.  Disable the `user_dn_pattern` property if
        it is currently enabled.

        ``` toml
        [user_store]
        user_dn_pattern = "uid={0},ou=Users,dc=wso2,dc=org"
        ```

    3.  The `mail` attribute has unique requirements. If you are using the
        `mail` attribute, add the following. For more information on email
        authentication, see [Using Email Address as the
        Username](../../guides/user-mgt/email-as-username)
        .

        ``` toml
        [tenant_mgt]
        enable_email_domain = true
        ```

2.  If you want to work with multiple attributes (basically to retrieve
    internal roles with multiple attributes), do one of the following
    depending on which user store you want to configure this for:

    -   **Configuration for primary user store:** Add the following
        property in the `<IS_HOME>/repository/conf/deployment.toml`

        ``` toml
        [user_store]
        properties.MultipleAttributeEnable = true
        ```

3.  To test this, restart WSO2 IS and attempt to log in to the
    user portal by providing either the `          mail         `
    or `          uid         ` values with the same password.

### Customizing the claim for the user attribute

If you are using multiple attribute authentication and want to customize
the claim to be used for user name attribute, do the following.

Add the following configuration in the
`         <IS_HOME>/repository/conf/deployment.toml        `
file.

``` toml
[authentication.authenticator.basic] 
name ="BasicAuthenticator"
enable=true
UserNameAttributeClaimUri = "http://wso2.org/claims/emailaddress"
```

This will return the email address of the authenticated user. It can be
configured to return any attribute by changing the '
`         UserNameAttributeClaimUri        ` ' parameter.

!!! info "Related Topics"
    For more information, see the following links.

    -   For working with claim dialects and mapping claims, see [Claim
        Management](insert-claim-management).
    -   See [Configuring Claims for a Service
        Provider](insert-configuring-claims-for-a-service-provider) on how to
        configure claims when [adding a service
        provider](insert-adding-and-configuring-a-service-provider).
    -   See [Configuring Claims for an Identity
        Provider](insert-configuring-claims-for-an-identity-provider) on how to
        configure claims when [adding an identity
        provider](insert-adding-and-configuring-an-identity-provider).
    -   See [Writing a Custom User Store Manager](insert-writing-a-custom-user-store-manager) for instructions on
        how to write a custom user store manager.
