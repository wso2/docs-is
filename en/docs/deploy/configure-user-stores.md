# Configure User stores

WSO2 Identity Server allows configuring multiple user stores to your system that are used to store users and their roles (Groups). Out of the box, the WSO2 Identity Server supports JDBC, LDAP, and Active Directory user stores with the capability of configuring custom user stores. Different user store adapters called **Userstore managers** are used to connect with these user store types.

There are two types of user stores:

- [Primary user stores (Mandatory)](#primary-user-store)
- [Secondary user stores (Optional)](#secondary-user-store)

All the supported user stores can be configured under these two types.

![user-store-types]({{base_path}}/assets/img/deploy/user-store-types.png){ width:"350"}

---

## Primary user store

This is the main user store that is shared among all the [tenants]({{base_path}}/references/concepts/introduction-to-multitenancy/) in the system. Only one user store should be configured as the primary
user store, and it is configured in the `<IS_HOME>/repository/conf/deployment.toml` file. The WSO2 Identity Server uses the embedded H2 database as the primary user store by default. It is recommended to change this default configuration in the production system.

Learn more on how to [configure the primary serstore]({{base_path}}/deploy/configure-the-primary-user-store).

---

## Secondary user store

You can easily set up any number of secondary user stores for your system. These user stores are specific to the created tenant and are not shared among multiple tenants. You can use the management console to create secondary user stores or manually create them. These will be stored in an XML file with the configurations corresponding to the secondary store.

Learn more on how to [configure a secondary userstore]({{base_path}}/deploy/configure-secondary-user-stores)

---

## Userstore manager

Userstore Managers are adapters used to connect with different user stores. By default, there are user store managers for JDBC, LDAP, and Active Directory user stores.

If you need to add a new user store implementation, see [write a custom userstore manager]({{base_path}}/references/extend/write-a-custom-user-store-manager) for more information. When configuring the userstore, you must set the userstore manager class name.

!!! info
    The permissions attached to roles are always stored in an RDBMS. With the default configurations, permissions are stored in the embedded H2 database. For information on how to set up an RDBMS repository for storing permission, see [configure the authorization manager]({{base_path}}/deploy/configure-the-authorization-manager)

## How it works

When users try to log in to an application with multiple user stores integrated, the following flows happen depending on the method the user provides the username.

- **If the user specifies the user store domain**:

    1. The user tries to log into the application by providing credentials with the user store name.

        Example: Username: `PRIMARY/johnd`

    2. WSO2 Identity Server checks the specified user stores for the availability of the user and authenticates the user.

    Once the user credentials are validated, the user will be able to access the application.

- **If the user doesn't specify the user store domain**:

    1. The user tries to log into the application by providing credentials without the user store name.

        Example: Username: `johnd`

    2. WSO2 Identity Server checks the user stores for the availability of the user and authenticates the user.

        1. Initially, the identity server checks the user's credentials against the PRIMARY user store, which is the first verification line.

        2. If the credentials are not validated in the PRIMARY user store, the identity server proceeds to verify the credentials against the configured secondary user stores.

    Once the user credentials are validated, the user will be able to access the application.

    !!! note
        Refer to [configure user store preference order]({{base_path}}/deploy/configure-user-store-preference-order.md) if you need to configure a preference order for the user stores when authenticating the users.
