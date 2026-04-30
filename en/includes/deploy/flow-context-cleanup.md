# Clean Up Flow Context

As you use WSO2 Identity Server (WSO2 IS), flow context records accumulate in the `IDN_FLOW_CONTEXT_STORE` table. Without periodic cleanup, this table can grow over time and negatively impact server performance.

Therefore, it is recommended to clean up flow context records periodically.

## Use the stored procedure for flow context cleanup

Follow the steps below to run the appropriate stored procedure script for your database.

!!! tip
    It is recommended to run these scripts during a time when traffic on the server is low. You can also set `backupTables` to `TRUE` in the script to back up the records before deletion, enabling a restore if needed.

1. Depending on your database, select the appropriate flow context cleanup script from the links below and run it on the database.

    - [DB2](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/db2/flow-context-cleanup/){:target="_blank"}
    - [MSSQL](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mssql/flow-context-cleanup/){:target="_blank"}
    - [MySQL](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mysql/flow-context-cleanup/){:target="_blank"}
    - [Oracle](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/oracle/flow-context-cleanup/){:target="_blank"}
    - [PostgreSQL 11.X to 17.X](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-11x/flow-context-cleanup/){:target="_blank"}

2. Once the cleanup is complete, you can schedule a periodic cleanup task to automate future runs.
