# Setting up Oracle RAC

The following sections describe how to set up Oracle RAC to replace the
default H2 database in your WSO2 product:

-   [Setting up the database and
    users](#SettingupOracleRAC-Settingupthedatabaseandusers)
-   [Setting up the JDBC
    driver](#SettingupOracleRAC-SettinguptheJDBCdriver)

Oracle Real Application Clusters (RAC) is an option that facilitates
clustering and high availability in Oracle database environments. In the
Oracle RAC environment, some of the commands used in
`         oracle.sql        ` are considered inefficient. Therefore, the
product has a separate SQL script ( `         oracle_rac.sql        ` )
for Oracle RAC. The Oracle RAC-friendly script is located in the
`         dbscripts        ` folder together with other
`         .sql        ` scripts.

To test products on Oracle RAC, rename
`          oracle_rac.sql         ` to `          oracle.sql         `
before running `          -Dsetup         ` .

### Setting up the database and users

Follow the steps below to set up an Oracle RAC database.

1.  Set environment variables \< `          ORACLE_HOME>         `,
    `          PATH         `, `         ` and
    `          ORACLE_SID         ` with the corresponding values (
    `          /oracle/app/oracle/product/11.2.0/dbhome_1         `,
    `          $PATH:<ORACLE_HOME>/bin         `, and
    `          orcl1         ` ) as follows:  
    ![](../../assets/img/53125514/53287565.png) 
2.  Connect to Oracle using SQL\*Plus as SYSDBA.  
    ![](../../assets/img/53125514/53287577.png) 
3.  Create a database user and grant privileges to the user as shown
    below:

    ``` powershell
    Create user <USER_NAME> identified by password account unlock;
    grant connect to <USER_NAME>;
    grant create session, create table, create sequence, create trigger to <USER_NAME>;
    alter user <USER_NAME> quota <SPACE_QUOTA_SIZE_IN_MEGABYTES> on '<TABLE_SPACE_NAME>';
    commit;
    ```

4.  Exit from the SQL\*Plus session by executing the
    `          quit         ` command.

### Setting up the JDBC driver

Copy the Oracle JDBC libraries (for example, the
`         <ORACLE_HOME>/jdbc/lib/ojdbc14.jar        ` file) to the
`         <PRODUCT_HOME>/repository/components/lib/        ` directory.

Remove the old database driver from the
`          <PRODUCT_HOME>/repository/components/dropins         `
directory when you upgrade the database driver.

## What's next

By default, all WSO2 products are configured to use the embedded H2
database. To configure your product with Oracle RAC, see [Changing to
Oracle RAC](../../administer/setting-up-oracle-rac).
