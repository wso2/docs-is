# Working with Databases

All WSO2 products are shipped with embedded H2 databases for storing
data. These default databases are located in the
`         <PRODUCT_HOME>/repository/database        ` directory of the
product pack.

### Default databases

Explained below are the default databases that you will find in the
`         database        ` directory.

-   **Carbon database:** `          WSO2CARBON_DB.h2.db         ` is the
    main Carbon database in a WSO2 product. This stores registry and
    user management data by default. In addition, if the product uses
    features of [WSO2 Identity
    Server](http://wso2.com/products/identity-server/) or [WSO2
    Enterprise Store (ES)](http://wso2.com/products/enterprise-store/) ,
    data that are specific to those will by default reside in the
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
[WSO2 Identity Server](http://wso2.com/products/identity-server/) or
[WSO2 Enterprise Store (ES)](http://wso2.com/products/enterprise-store/)
in your product, it is recommended to use separate RDBMSs for each,
i.e., identity-related and storage-related data.

WSO2 products are shipped with scripts for creating the required tables
in all the required databases: The scripts for creating tables for user
management and registry data are stored in the
`         <PRODUCT_HOME>/dbscripts        ` folder. If product-specific
databases are required, and if features of [WSO2 Identity
Server](http://wso2.com/products/identity-server/) or [WSO2 Enterprise
Store (ES)](http://wso2.com/products/enterprise-store/) are used in the
product, there will be subfolders in the
`         <PRODUCT_HOME>/dbscripts        ` directory with separate
scripts.

**Changing the default Carbon database:** You simply have to set up new
physical databases, point the product server to the new databases by
updating the relevant configuration files, and create the required
tables using the scripts provided in the product pack. See the following
topics for instructions:

-   [Setting up the Physical
    Database](_Setting_up_the_Physical_Database_)
-   [Changing the Carbon Database](_Changing_the_Carbon_Database_)
-   [Browsing the H2 Database](_Browsing_the_H2_Database_)

**Changing the default product-specific databases:** The process of
setting up and configuring product-specific databases is similar to
changing the default Carbon database . However, depending on the
product, there may be additional configuration files to update. See the
documentation for the respective product for instructions.
