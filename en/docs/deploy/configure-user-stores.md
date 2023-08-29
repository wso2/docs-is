# Configure User stores

WSO2 Identity Server allows configuring multiple user stores to your system that are used to store users and their roles (Groups). Out of the box, the WSO2 Identity Server supports JDBC, LDAP, and Active Directory user stores with the capability of configuring custom user stores. Different user store adapters called *Userstore managers are used to connect with these user store types.

There are two types of user stores - Primary user stores (Mandatory) and Secondary user stores (Optional). All the supported user stores can be configured under these two types. 

![user-store-types]({{base_path}}/assets/img/d eploy/user-store-types.png)

---

## Primary user store (Mandatory)

This is the main user store that is shared among all the [tenants]({{base_path}}/references/concepts/introduction-to-multitenancy/) in the system. Only one user store should be configured as the primary
user store, and it is configured in the `<IS_HOME>/repository/conf/deployment.toml` file. The WSO2 Identity Server uses the embedded H2 database as the primary user store by default. It is recommended to change this default configuration in the production system.

Learn more on how to [configure the primary serstore]({{base_path}}/deploy/configure-the-primary-user-store).

---

## Secondary userstore(s) (Optional)

You can easily set up any number of secondary user stores for your system. These user stores are specific to the created tenant and are not shared among multiple tenants. You can use the management console to create secondary user stores or manually create them. These will be stored in an XML file with the configurations corresponding to the secondary store.

Learn more on how to [configure a secondary userstore]({{base_path}}/deploy/configure-secondary-user-stores)

---

## Userstore manager

*Userstore Managers* are adapters used to connect with different user stores. By default, there are user store managers for JDBC, LDAP, and Active Directory user stores.
If you need to add a new user store implementation, see [Write a Custom Userstore Manager]({{base_path}}/references/extend/write-a-custom-user-store-manager) for more information. When configuring the userstore, you must set the userstore manager class name.

!!! info
    The permissions attached to roles are always stored in an RDBMS. With the default configurations, permissions are stored in the embedded H2 database. For information on how to set up an RDBMS repository for storing permission, see [Configure the Authorization Manager]({{base_path}}/deploy/configure-the-authorization-manager)
