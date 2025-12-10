# Change the default databases

The embedded H2 databases shipped with the product are suitable for evaluation,
development, and testing. For production environments, the industry-standard RDBMSs such as
Oracle, PostgreSQL, MySQL, MS SQL, etc are recommended.

WSO2 IS is shipped with scripts for creating the required tables
in all the required databases: The scripts for creating tables for user
management and registry data are stored in the
`<IS_HOME>/dbscripts` folder.

**Changing the default database:** You simply have to set up new
physical databases, point the product server to the new databases by
updating the relevant configuration files, and create the required
tables using the scripts provided in the product pack. See the following
topics for instructions:

-   [Change to IBM DB2]({{base_path}}/deploy/configure/databases/carbon-database/change-to-ibm-db2)
-   [Change to MariaDB]({{base_path}}/deploy/configure/databases/carbon-database/change-to-mariadb)
-   [Change to MSSQL]({{base_path}}/deploy/configure/databases/carbon-database/change-to-mssql)
-   [Change to MySQL]({{base_path}}/deploy/configure/databases/carbon-database/change-to-mysql)
-   [Change to Oracle]({{base_path}}/deploy/configure/databases/carbon-database/change-to-oracle)
-   [Change to Oracle RAC]({{base_path}}/deploy/configure/databases/carbon-database/change-to-oracle-rac)
-   [Change to PostgreSQL]({{base_path}}/deploy/configure/databases/carbon-database/change-to-postgresql)
-   [Change to Remote H2]({{base_path}}/deploy/configure/databases/carbon-database/change-to-remote-h2)