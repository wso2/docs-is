# Configure Userstores

WSO2 Identity Server allows configuring multiple userstores to your system that
are used to store users and their roles (Groups). Out of the box, WSO2
Identity Server supports JDBC, LDAP, and Active Directory userstores with the
capability of configuring custom userstores. There are different userstore adapters called *Userstore managers*, which are used to connect
with these userstore types.

There are two types of userstores - Primary Userstore (Mandatory) and
Secondary userstores (Optional). All the supported userstores can be
configured under these two types.

![user-store-types]({{base_path}}/assets/img/deploy/user-store-types.png) 

!!! info

    Starting from update level 6.1.0.195, WSO2 Identity Server ignores inaccessible user stores by default. This ensures that authentication for users in reachable user stores continues without failure, even if another user store is unreachable. To control this behavior, you can configure the following properties in the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [user_store_commons]
    maxConnectionRetryCount=2
    minConnectionRetryDelayInMilliSeconds=60000
    ```

    During authentication, WSO2 Identity Server will attempt to connect to the user store up to `maxConnectionRetryCount` times, with a delay of `minConnectionRetryDelayInMilliSeconds` between each attempt. If the connection is still unavailable, the user store will be skipped.

    If required, you can disable this behavior. However, note that disabling it may disrupt the authentication flow when a user store is unreachable, leading to a degraded user experience. To disable this behavior, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [user_store_commons]
    enable_circuit_breaker_for_user_stores=false
    ```
---

## Primary userstore (Mandatory)

This is the main user store that is shared among all the
[tenants]({{base_path}}/references/concepts/introduction-to-multitenancy/)
in the system. Only one userstore should be configured as the primary
userstore and it is configured in the
`         <IS_HOME>/repository/conf/deployment.toml       ` file. By default,
WSO2 Identity Server uses the embedded H2 database as the primary user store.
It is recommended to change this default configuration in the production
system.

see, [Configure the Primary Userstore]({{base_path}}/deploy/configure-the-primary-user-store)

---

## Secondary userstore(s) (Optional)

Any number of secondary userstores can be easily set up for your system.
These userstores are specific to the created tenant, and they are
not shared among multiple tenants.  
You can use the management console to create secondary userstores or
you can create them manually. These will be stored in an xml file with the
configurations corresponding to the secondary userstore.

see, [Configure a Secondary Userstore]({{base_path}}/deploy/configure-secondary-user-stores)

---

## Userstore manager

Adapters used to connect with different userstores are called *Userstore Managers*. By default, there are userstore managers for JDBC,
LDAP and Active Directory userstores. If you need to add a new userstore implementation, see [Write a Custom Userstore
Manager]({{base_path}}/references/extend/write-a-custom-user-store-manager). When you configure the
userstore, you have to set the userstore manager class name.

!!! info 
    The permissions attached to roles are always stored in an RDBMS. With
    the default configurations, permissions are stored in the embedded H2
    database. For information on how to set up a RDBMS repository for
    storing permission, see [Configure the Authorization
    Manager]({{base_path}}/deploy/configure-the-authorization-manager)
