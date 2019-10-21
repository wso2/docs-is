# Working with Databases

All WSO2 products are shipped with embedded H2 databases for storing
data. These default databases are located in the
`         <IS_HOME>/repository/database        ` directory of the
product pack.

### Default databases

Explained below are the default databases that you will find in the
`         database        ` directory.

-   **Carbon database:** `          WSO2CARBON_DB.h2.db         ` is the
    main Carbon database in a WSO2 product. This stores registry and
    user management data by default. In addition, if the product uses
    features of [WSO2 Identity
    Server](http://wso2.com/products/identity-server/),
    data that are specific to those features will by default reside in the
    embedded Carbon database. However, for production environments, we
    recommend separate RDBMSs to store identity-related and
    storage-related data.
-   **Product-specific databases** : In addition to the main Carbon
    database, your product may have other databases for storing
    product-specific data.

### Changing the default databases

The embedded H2 databases shipped with your product are suitable for
development, testing, and some production environments. For most
production environments, we recommend industry-standard RDBMSs such as
Oracle, PostgreSQL, MySQL, MS SQL, etc. Further, if you have features of
[WSO2 Identity Server](http://wso2.com/products/identity-server/)
in your product, it is recommended to use separate RDBMSs for each,
i.e., identity-related and storage-related data.

WSO2 products are shipped with scripts for creating the required tables
in all the required databases: The scripts for creating tables for user
management and registry data are stored in the
`         <IS_HOME>/dbscripts        ` folder. If product-specific
databases are required, and if features of [WSO2 Identity
Server](http://wso2.com/products/identity-server/) are used in the
product, there will be subfolders in the
`         <IS_HOME>/dbscripts        ` directory with separate
scripts.

**Changing the default database:** You simply have to set up new
physical databases, point the product server to the new databases by
updating the relevant configuration files, and create the required
tables using the scripts provided in the product pack. See the following
topics for instructions:
