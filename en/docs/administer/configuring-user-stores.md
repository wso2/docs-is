# Configuring User Stores

The user management feature in WSO2 products allows you to maintain
multiple user stores for your system that are used to store the users
and their roles. You can set up any of the following types of user
stores:

-   JDBC user stores
-   Active Directory user stores
-   Read-Only LDAP user stores
-   Read-Write LDAP user stores

The **Primary User Store** in every WSO2 product is configured in the
`         <PRODUCT_HOME>/repository/conf/         user-mgt.xml        `
file. By default, the embedded H2 database (JDBC) that is shipped with
WSO2 products is configured as the primary user store, except for WSO2
Identity Server, which has an embedded LDAP as its primary user
store. You can change the default configuration by replacing the default
database according to your requirement. The primary user store is shared
among all the [tenants](Introduction_to_Multitenancy) in the system.

With the user management feature, any number of **Secondary User
Stores** can be easily set up for your system using the management
console. This will automatically create an XML file with the
configurations corresponding to the secondary user store. Alternatively,
you can manually create the configuration file and store it in this
directory without using the management console. **Secondary User
Stores** are specific to the created tenant, and they are not shared
between multiple tenants.  

Although, information about users and roles are stored in the
repositories that we call User Stores, which can be of any of the types
described above, the permissions attached to roles are always stored in
an RDBMS. According to the default configuration in WSO2 products, the
embedded H2 database is used for storing permissions as well as users
and roles. The instructions in this section explain how you can change
the default user store. F or information on how to set up an RDBMS
repository for storing permission, s ee [Configuring the Authorization
Manager](../../learn/configuring-the-authorization-manager).

The following topics include instructions on setting up user stores:

-   [Configuring the Primary User
    Store](../../learn/configuring-the-primary-user-store)
-   [Configuring Secondary User
    Stores](../../learn/configuring-secondary-user-stores)
-   [Working with Properties of User
    Stores](Working_with_Properties_of_User_Stores)
-   [Writing a Custom User Store
    Manager](../../learn/writing-a-custom-user-store-manager)

  
