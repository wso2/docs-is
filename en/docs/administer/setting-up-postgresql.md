# Setting up PostgreSQL

The following sections describe how to set up PostgreSQL to replace the
default H2 database in your WSO2 product:

-   [Setting up the database and login
    role](#SettingupPostgreSQL-Settingupthedatabaseandloginrole)
-   [Setting up the drivers](#SettingupPostgreSQL-Settingupthedrivers)

### Setting up the database and login role

Follow the steps below to set up a PostgreSQL database.

1.  Install PostgreSQL on your computer as follows:  
    ![](../assets/img/53125515/53287605.png)
2.  Start the PostgreSQL service using the following command:  
    ![](../assets/img/53125515/53287604.png)
3.  Create a database and the login role from a GUI using the
    [PGAdminIII tool](http://www.pgadmin.org/download/).
4.  To connect PGAdminIII to a PostgreSQL database server, locate the
    server from the object browser, right-click the client and click
    **Connect**. This will show you the databases, tablespaces, and
    login roles as follows:  
    ![](../assets/img/53125515/53287590.png) 
5.  To create a database, click **Databases** in the tree (inside the
    object browser), and click **New Database**.
6.  In the **New Database** dialog box, give a name to the database,
    e.g., gregdb and click **OK**.
7.  To create a login role, click **Login Roles** in the tree (inside
    the object browser), and click **New Login Role**. Enter the role
    name and a password.

    These values will be used in the product configurations as described
    in the following sections. In the sample configuration,
    `            gregadmin           ` will be used as both the role
    name and the password.

8.  Optionally, enter other policies, such as the expiration time for
    the login and the connection limit.
9.  Click **OK** to finish creating the login role.

### Setting up the drivers

1.  Download the [PostgreSQL JDBC4
    driver](http://jdbc.postgresql.org/download.html).
2.  Copy the driver to your WSO2 product's \<
    `           PRODUCT_HOME>/repository/components/lib          `
    directory.

    !!! note
    
        For **WSO2 IoT Server** you need to copy the driver to the
        `           <IOTS_HOME>/lib          ` directory.
    

## What's next

By default, all WSO2 products are configured to use the embedded H2
database. To configure your product with PostgreSQL, see [Changing to
PostgreSQL](../../administer/changing-to-postgresql).
