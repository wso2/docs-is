# Data Purging

You can perform data purging by clearing the session data using the script given below. WSO2 Identity Server stores session data for authentication purposes. As the volume of the data stored grows over time, the authentication operations may also eventually consume more time. It is highly recommended to perform data purging on production servers to mitigate this.

For more information about session persistence, see [Authentication Session Persistence]({{base_path}}/deploy/configure/session-persistence).

!!! tip
    It is recommended to run these steps at a time when the server traffic is low. Especially if you are running this in the production environment for the first time, since the data volume to be purged may be higher. However, consider this as a housekeeping task that needs to be run at regular intervals. 
    You can schedule the aforementioned queries to be run at regular intervals.
    

1. Disable the internal session cleanup process by configuring the following properties in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

    ```toml
    [session_data.cleanup]
    enable_expired_data_cleanup = false
    clean_logged_out_sessions_at_immediate_cycle = false
    enable_pre_session_data_cleanup = false
    
    ```

2. To clean the session and operation data that are stored in the `IDN_AUTH_SESSION_STORE` table, run the required database script on the database based on the database type. 

    !!! note
        This script clears session data after 2 hours of expiry.

    !!! info
        - The database scripts for [DB2](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/db2/sessiondata-cleanup/), [MSSQL](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mssql/sessiondata-cleanup/), [MySQL](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mysql/sessiondata-cleanup/), [Oracle](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/oracle/sessiondata-cleanup/), [PostgreSQL 9.X](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-9x/sessiondata-cleanup/) and [PostgreSQL 11.X](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-11x/sessiondata-cleanup/), can be found embedded with the name itself.
        - You can change the session cleanup task in the stored procedure according to your DB policies. You can clean the session data either based on the session created time or the session expiry time. By default, the session created time is used.
        - A sample script is given below, which will clear the session data based on the `EXPIRY_TIME`.
          ``` 
          INSERT INTO IDN_AUTH_SESSION_STORE_TMP (SESSION_ID) SELECT TOP (@chunkLimit) SESSION_ID FROM IDN_AUTH_SESSION_STORE 
          where EXPIRY_TIME < @sessionCleanupTime;
          ```

3. Once the cleanup is over, start the WSO2 Identity Server pointing to the cleaned-up database.  
    You can also schedule a cleanup task that will automatically run after a given period of time. 

    ??? example "Click to view an example"

        === "MySQL"
        ``` sql 
        USE `WSO2_USER_DB`;
        DROP EVENT IF EXISTS cleanup_session_data_event;
        CREATE EVENT cleanup_tokens_event
            ON SCHEDULE
              EVERY 1 WEEK STARTS '2015-01-01 00:00.00'
            DO
              CALL `WSO2_USER_DB`.clear_session_data();

        -- 'Turn on the event_scheduler'
        SET GLOBAL event_scheduler = ON;
        ```
        