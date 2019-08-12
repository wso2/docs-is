# Data Purging

You can perform data purging by clearing the session data using the
script given below. WSO2 Identity Server stores session data for
authentication purposes. A s the volume of the data stored grows over
time, the authentication operations may also eventually consume more
time. You can apply data purging to mitigate this. For more information
about session persistence, see [Authentication Session
Persistence](../../using-wso2-identity-server/authentication-session-persistence).

!!! tip
    It is safe to run these steps in read-only mode or during a time when traffic on the server is low, but that is not mandatory.
    

1.  Take a backup of the running database.
2.  Set up the database dump in a test environment and test it for any
    issues. For more information on setting up a database dump, go to
    the
    [MySQL](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html#mysqldump-syntax)
   , [SQL Server](https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/create-a-full-database-backup-sql-server)
   , and
    [Oracle](https://docs.oracle.com/cd/E11882_01/backup.112/e10642/rcmbckba.htm#BRADV8138)
    offical documentation.

    !!! tip
        We recommend that you test the database dump before the cleanup task as the cleanup can take some time.
    

3.  Run the following script on the database dump. It cleans the session
    and operation data stored in the
    `           IDN_AUTH_SESSION_STORE          ` table.  
    This script clears session data that is older than the last 14 days
    and operational data that is older than the last 6 hours.

    
    ``` sql tab="MySQL"
    USE `WSO2_USER_DB`;
    DROP procedure IF EXISTS `clear_session_data`;

    DELIMITER $$
    USE `WSO2_USER_DB`$$
    CREATE PROCEDURE `clear_session_data`()

    BEGIN

    SET @OLD_SQL_SAFE_UPDATES = @@SQL_SAFE_UPDATES;
    SET SQL_SAFE_UPDATES = 0;

    # Session data older than 20160 minutes will be removed.
    set @session_cleanp_time = ROUND((unix_timestamp() * 1000000000 -
    (20160 * 60000000000)) / 1000000000,0);
    # Operational data older than 720 minutes will be removed.
    set @operation_cleanup_time = ROUND((unix_timestamp() * 1000000000 -
    (720 * 60000000000)) / 1000000000,0);

    set @session_cleanup_count = 1;
    set @operation_cleanup_count = 1;

    WHILE (@session_cleanup_count > 0) DO

        DELETE FROM IDN_AUTH_SESSION_STORE WHERE  TIME_CREATED <
    @session_cleanp_time LIMIT 15000;

        SET @session_cleanup_count = row_count();

    END WHILE;

    WHILE (@operation_cleanup_count > 0) DO

    CREATE TEMPORARY TABLE IF NOT EXISTS TEMP_SESSION_IDS SELECT
    SESSION_ID FROM IDN_AUTH_SESSION_STORE WHERE OPERATION = 'DELETE' AND
    TIME_CREATED < @operation_cleanup_time LIMIT 15000;

    DELETE FROM IDN_AUTH_SESSION_STORE WHERE SESSION_ID IN (SELECT
    SESSION_ID FROM TEMP_SESSION_IDS) AND OPERATION = 'STORE';

    DELETE FROM IDN_AUTH_SESSION_STORE WHERE SESSION_ID IN (SELECT
    SESSION_ID FROM TEMP_SESSION_IDS);

        SET @operation_cleanup_count = row_count();

    DROP TEMPORARY TABLE TEMP_SESSION_IDS;

    END WHILE;

    SET SQL_SAFE_UPDATES = @OLD_SQL_SAFE_UPDATES;

    END$$

    DELIMITER ;
    ```

4.  Once the cleanup is over, start the WSO2 Identity Server pointing to
    the cleaned-up database dump and test throughly for any issues.  
    You can also schedule a cleanup task that will be automatically run
    after a given period of time. Here's an example:

    

    ``` sql tab="MySQL"
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
