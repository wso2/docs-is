# Configuring User Stores

WSO2 products allow configuring multiple user stores to your system that
are used to store users and their roles (Groups). Out of the box WSO2
products support JDBC, LDAP and Active Directory user stores with the
capability of configuring custom user stores. There are different user
store adapters called *User store managers* , which are used to connect
with these users store types.

There are two types of user stores - Primary User store (Mandatory) and
Secondary user stores (Optional). All the supported user stores can be
configured under these two types.

![](attachments/103330301/103330302.png){width="600"}

#### Primary User Store (Mandatory)

This is the main user store that is shared among all the
[tenants](https://docs.wso2.com/display/ADMIN44x/Introduction+to+Multitenancy)
in the system. Only one user store should be configured as the primary
user store and it is configured in the
`         <PRODUCT_HOME>/repository/conf/user-mgt.xml        ` file. By
default, the embedded H2 database (JDBC) that is shipped with WSO2
products is configured as the primary user store, except for WSO2
Identity Server, which has an embedded LDAP as its primary user store.
It is recommended to change this default configuration in the production
system.

  

#### Secondary User Store(s) (Optional)

Any number of secondary user stores can be easily set up for your system
and these user stores are specific to the created tenant, and they are
not shared among multiple tenants.  
You can use the management console to create secondary user stores or
you can create them manually. These will be stored as an XML file in the
file system and use the same XML format that is used to configure
primary user store.

  

#### User Store Manager

Adapters used to connect with different users stores are called *User
Store Managers* . By default, there are user store managers for JDBC,
LDAP and Active Directory user stores. If you need to add a new user
store implementation, see [Writing a Custom User Store
Manager](_Writing_a_Custom_User_Store_Manager_) . When you configure the
user store, you have to set the user store manager class name.

The permissions attached to roles are always stored in an RDBMS. With
the default configurations, permissions are stored in the embedded H2
database. For information on how to set up a RDBMS repository for
storing permission, see [Configuring the Authorization
Manager](https://docs.wso2.com/display/ADMIN44x/Configuring+the+Authorization+Manager)

The following topics include instructions on setting up user stores:

-   [Configuring the Primary User
    Store](_Configuring_the_Primary_User_Store_)
-   [Configuring Secondary User
    Stores](_Configuring_Secondary_User_Stores_)
-   [Configuring a JDBC User Store](_Configuring_a_JDBC_User_Store_)
-   [Configuring a Read-write Active Directory User
    Store](_Configuring_a_Read-write_Active_Directory_User_Store_)
-   [Configuring a Read-only LDAP User
    Store](_Configuring_a_Read-only_LDAP_User_Store_)
-   [Configuring a Read-write LDAP User
    Store](_Configuring_a_Read-write_LDAP_User_Store_)
-   [Writing a Custom User Store
    Manager](_Writing_a_Custom_User_Store_Manager_)
