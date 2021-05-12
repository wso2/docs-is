# Configure Userstores

WSO2 Identity Server products allow configuring multiple userstores to your system that
are used to store users and their roles (Groups). Out of the box, WSO2
Identity Server supports JDBC, LDAP and Active Directory userstores with the
capability of configuring custom user stores. There are different userstore adapters called *Userstore managers*, which are used to connect
with these userstore types.

There are two types of userstores - Primary Userstore (Mandatory) and
Secondary userstores (Optional). All the supported userstores can be
configured under these two types.

![user-store-types](/assets/img/deploy/user-store-types.png) 

---

## Primary userstore (Mandatory)

This is the main user store that is shared among all the
[tenants](TBD:../../administer/introduction-to-multitenancy)
in the system. Only one userstore should be configured as the primary
userstore and it is configured in the
`         <IS_HOME>/repository/conf/deployment.toml       ` file. By default,
WSO2 identity server uses an embedded Read/Write LDAP as the primary userstore.
It is recommended to change this default configuration in the production
system.

see, [Configuring the Primary Userstore](../../../deploy/configure-the-primary-user-store)

---

## Secondary userstore(s) (Optional)

Any number of secondary userstores can be easily set up for your system
and these userstores are specific to the created tenant, and they are
not shared among multiple tenants.  
You can use the management console to create secondary userstores or
you can create them manually. These will be stored in an xml file with the
configurations corresponding to the secondary userstore.

see, [Configuring a Secondary Userstore](../../../deploy/configure-secondary-user-stores)

---

## Userstore manager

Adapters used to connect with different userstores are called *Userstore Managers*. By default, there are userstore managers for JDBC,
LDAP and Active Directory userstores. If you need to add a new userstore implementation, see [Writing a Custom Userstore
Manager](../../../deploy/write-a-custom-user-store-manager). When you configure the
userstore, you have to set the userstore manager class name.

!!! info 
    The permissions attached to roles are always stored in an RDBMS. With
    the default configurations, permissions are stored in the embedded H2
    database. For information on how to set up a RDBMS repository for
    storing permission, see [Configuring the Authorization
    Manager](../../../deploy/configure-the-authorization-manager)
