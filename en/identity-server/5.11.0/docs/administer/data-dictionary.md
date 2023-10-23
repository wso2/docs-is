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

-   PostgreSQL


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
    

### dbscripts

```

├── bps
│   └── bpel
│   ├── create
│   │   ├── db2.sql
│   │   ├── derby.sql
│   │   ├── h2.sql
│   │   ├── mssql.sql
│   │   ├── mysql.sql
│   │   ├── oracle.sql
│   │   └── postgresql.sql
│   ├── drop
│   │   ├── h2-drop.sql
│   │   ├── mssql-drop.sql
│   │   ├── mysql-drop.sql
│   │   ├── oracle-drop.sql
│   │   └── postgresql-drop.sql
│   └── truncate
│   ├── db2-truncate.sql
│   ├── h2-truncate.sql
│   ├── mssql-truncate.sql
│   ├── mysql-truncate.sql
│   ├── oracle-truncate.sql
│   └── postgresql-truncate.sql
├── consent
│   ├── db2.sql
│   ├── h2.sql
│   ├── mssql.sql
│   ├── mysql-cluster.sql
│   ├── mysql.sql
│   ├── oracle.sql
│   ├── oracle_rac.sql
│   └── postgresql.sql
├── identity
│   ├── stored-procedures
│   │   ├── db2
│   │   │   └── oauth2-token-cleanup.sql
│   │   ├── mssql-2012.x
│   │   │   ├── mssql-tokencleanup-restore.sql
│   │   │   └── mssql-tokencleanup.sql
│   │   ├── mysql-5.4.x
│   │   │   ├── confirmation-code-cleanup.sql
│   │   │   ├── mysql-tokencleanup-restore.sql
│   │   │   ├── mysql-tokencleanup.sql
│   │   │   └── session-data-cleanup.sql
│   │   ├── oracle-11.x
│   │   │   ├── oracle-sessiondata-cleanup.sql
│   │   │   ├── oracle-tokencleanup-restore.sql
│   │   │   └── oracle-tokencleanup.sql
│   │   ├── postgre-11.x
│   │   │   ├── postgresql-tokencleanup-restore.sql
│   │   │   └── postgresql_11-tokencleanup.sql
│   │   └── postgre-9.x
│   │   ├── postgresql-tokencleanup-restore.sql
│   │   └── postgresql-tokencleanup.sql
│   ├── uma
│   │   ├── db2.sql
│   │   ├── h2.sql
│   │   ├── mssql.sql
│   │   ├── mysql-cluster.sql
│   │   ├── mysql.sql
│   │   ├── oracle.sql
│   │   ├── oracle_rac.sql
│   │   └── postgresql.sql
│   ├── db2.sql
│   ├── h2.sql
│   ├── mssql.sql
│   ├── mysql-cluster.sql
│   ├── mysql.sql
│   ├── oracle.sql
│   ├── oracle_rac.sql
│   └── postgresql.sql
├── metrics
│   ├── h2.sql
│   ├── mssql.sql
│   ├── mysql.sql
│   ├── oracle.sql
│   └── postgresql.sql
├── db2.sql
├── h2.sql
├── mssql.sql
├── mysql.sql
├── mysql_cluster.sql
├── oracle.sql
├── oracle_rac.sql
└── postgresql.sql

```