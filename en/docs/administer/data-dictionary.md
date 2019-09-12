# Data Dictionary

The database scripts for WSO2 Identity Server can be found in the
`         <IS_HOME>/dbscripts        ` directory. Currently, the
following databases are supported and a seperate file is included in the
`         dbscripts        ` folder containing SQL commands for database
and table creation for each type of database:

-   IBM DB2

-   Oracle

-   Oracle RAC

-   MySQL

-   H2

-   Microsoft SQL Server

-   Informix

-   PostgreSQL

-   OpenEdge

The folder structure of the `         <IS_HOME>/dbscripts        `
directory is outlined below. The generic database table creation scripts
are directly located inside the `         dbscripts        ` directory
and the identity specific table creation scripts are located inside the
`         <IS_HOME>/dbscripts/identity        ` directory.

!!! note     
    Some of the dbscripts in this directory are named with the
    relevant version number (e.g., "mysql5.7.sql"). Use the relevant scripts
    accordingly if you are using that version of the database. If there is a
    set of dbscripts without a specific mysql version indicated, that script
    is valid for all database versions.
    

dbscripts

├── bps  
│   └── bpel  
│   ├── create  
│   │   ├── db2.sql  
│   │   ├── derby.sql  
│   │   ├── h2.sql  
│   │   ├── mssql.sql  
│   │   ├── mysql.sql  
│   │   ├── oracle.sql  
│   │   └── postgresql.sql  
│   ├── drop  
│   │   ├── h2-drop.sql  
│   │   ├── mssql -drop.sql  
│   │   ├── mysql -drop.sql  
│   │   ├── oracle-drop.sql  
│   │   └── postgresql -drop.sql  
│   └── truncate  
│   ├── db2-truncate.sql  
│   ├── h2-truncate.sql  
│   ├── mssql -truncate.sql  
│   ├── mysql -truncate.sql  
│   ├── oracle-truncate.sql  
│   └── postgresql -truncate.sql

├── consent  

│   ├── db2.sql  
│   ├── h2.sql  
│   ├── informix.sql  
│   ├── mssql.sql  
│   ├── mysql -5.7.sql  
│   ├── mysql.sql  
│   ├── oracle\_rac.sql  
│   ├── oracle.sql  
│   └── postgresql.sql  
├── db2.sql  
├── h2.sql  
├── identity  
│   ├── db2.sql  
│   ├── h2.sql  
│   ├── informix.sql  
│   ├── mssql.sql  
│   ├── mysql -5.7.sql  
│   ├── mysql.sql  
│   ├── oracle\_rac.sql  
│   ├── oracle.sql  
│   └── postgresql.sql  
├── informix.sql  
├── metrics  
│   ├── h2.sql  
│   ├── mssql.sql  
│   ├── mysql.sql  
│   ├── oracle.sql  
│   └── postgresql.sql  
├── mssql.sql  
├── mysql5.7.sql  
├── mysql\_cluster.sql  
├── mysql.sql  
├── oracle\_rac.sql  
├── oracle.sql  
└── postgresql.sql

  

The data tables in Identity Server can be categorized in to several
groups. They are listed below with diagrams illustrating the
relationships among the tables:

-   [Registry Related Tables](../../using-wso2-identity-server/registry-related-tables)
-   [User Management Related Tables](../../using-wso2-identity-server/user-management-related-tables)
-   [Identity Related Tables](../../using-wso2-identity-server/identity-related-tables)
-   [Service Provider Related Tables](../../using-wso2-identity-server/service-provider-related-tables)
-   [Identity Provider Related Tables](../../using-wso2-identity-server/identity-provider-related-tables)
