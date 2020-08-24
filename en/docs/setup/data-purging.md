# Data Purging

You can perform data purging by clearing the session data using the script given below. WSO2 Identity Server stores session data for authentication purposes. As the volume of the data stored grows over time, the authentication operations may also eventually consume more time. It is highly recommended to perform data purging on production servers to mitigate this.

!!! info 
    For more information about session persistence, see [Authentication Session Persistence](../../learn/authentication-session-persistence).

!!! tip
    It is recommended to run these steps at the time where server traffic is low. Especially if you are running this in the production environment for the first time, since the data volume to be purged may be higher. However, consider this as a housekeeping task that needs to be run at regular intervals. 
    If you are doing this for the very first time on the production system begin with steps 1. This is done as a best practice for introducing changes. Otherwise, you can skip the backup and verification steps, and schedule the aforementioned queries to be run at regular intervals.
    

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
    

3.  To clean the session and operation data that are stored in the `IDN_AUTH_SESSION_STORE` table, run the following script on the database dump. 

    !!! note
        This script clears session data that are older than the last 14 days and operational data that are older than the last 6 hours.

    ??? tip "Click to view the MySQL script" 
    
        ``` sql tab="MySQL"
        DROP PROCEDURE IF EXISTS `CLEANUP_SESSION_DATA`;

        DELIMITER $$

        CREATE PROCEDURE `CLEANUP_SESSION_DATA`()
          BEGIN

            -- ------------------------------------------
            -- DECLARE VARIABLES
            -- ------------------------------------------
            DECLARE deletedSessions INT;
            DECLARE deletedStoreOperations INT;
            DECLARE deletedDeleteOperations INT;
            DECLARE tracingEnabled BOOLEAN;
            DECLARE sleepTime FLOAT;
            DECLARE batchSize INT;
            DECLARE chunkLimit INT;

            DECLARE sessionCleanUpTempTableCount INT;
            DECLARE operationCleanUpTempTableCount INT;
            DECLARE cleanUpCompleted BOOLEAN;

            -- ------------------------------------------
            -- CONFIGURABLE VARIABLES
            -- ------------------------------------------

            SET batchSize = 5000;
            -- This defines the number of entries from IDN_AUTH_SESSION_STORE that are taken into a SNAPSHOT
            SET chunkLimit=1000000;
            SET @deletedSessions = 0;
            SET @deletedStoreOperations = 0;
            SET @deletedDeleteOperations = 0;
            SET @sessionCleanupCount = 1;
            SET @operationCleanupCount = 1;
            SET tracingEnabled = FALSE; -- SET IF TRACE LOGGING IS ENABLED [DEFAULT : FALSE]
            SET sleepTime = 2;          -- Sleep time in seconds.
            SET autocommit = 0;

            SET @sessionCleanUpTempTableCount = 1;
            SET @operationCleanUpTempTableCount = 1;
            SET cleanUpCompleted = FALSE;

            -- Session data older than 20160 minutes(14 days) will be removed.
            SET @sessionCleanupTime = unix_timestamp()*1000000000 - (20160*60000000000);
            -- Operational data older than 720 minutes(12 h) will be removed.
            SET @operationCleanupTime = unix_timestamp()*1000000000 - (720*60000000000);

            SET @OLD_SQL_SAFE_UPDATES = @@SQL_SAFE_UPDATES;
            SET SQL_SAFE_UPDATES = 0;

            -- ------------------------------------------
            -- REMOVE SESSION DATA
            -- ------------------------------------------

            SELECT 'CLEANUP_SESSION_DATA() STARTED .... !' AS 'INFO LOG', NOW() AS 'STARTING TIMESTAMP';


            -- CLEANUP ANY EXISTING TEMP TABLES
            DROP TABLE IF EXISTS IDN_AUTH_SESSION_STORE_TMP;
            DROP TABLE IF EXISTS TEMP_SESSION_BATCH;
            COMMIT;

            -- RUN UNTILL
            WHILE (@sessionCleanUpTempTableCount > 0) DO

              CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_STORE_TMP AS SELECT SESSION_ID FROM IDN_AUTH_SESSION_STORE where TIME_CREATED < @sessionCleanupTime limit chunkLimit;
              CREATE INDEX idn_auth_session_tmp_idx on IDN_AUTH_SESSION_STORE_TMP (SESSION_ID);
              COMMIT;

              SELECT count(1) INTO @sessionCleanUpTempTableCount FROM IDN_AUTH_SESSION_STORE_TMP;
              SELECT 'TEMPORARY SESSION CLEANUP TASK SNAPSHOT TABLE CREATED...!!' AS 'INFO LOG', @sessionCleanUpTempTableCount;

              SET @sessionCleanupCount = 1;
              WHILE (@sessionCleanupCount > 0) DO

                CREATE TABLE IF NOT EXISTS TEMP_SESSION_BATCH AS SELECT SESSION_ID FROM IDN_AUTH_SESSION_STORE_TMP LIMIT batchSize;
                COMMIT;

                DELETE A
                FROM IDN_AUTH_SESSION_STORE AS A
                  INNER JOIN TEMP_SESSION_BATCH AS B ON
                                                       A.SESSION_ID = B.SESSION_ID;
                SET @sessionCleanupCount = row_count();
                COMMIT;

                SELECT 'DELETED SESSION COUNT...!!' AS 'INFO LOG', @sessionCleanupCount;


                DELETE A
                FROM IDN_AUTH_SESSION_STORE_TMP AS A
                  INNER JOIN TEMP_SESSION_BATCH AS B
                    ON A.SESSION_ID = B.SESSION_ID;
                COMMIT;
                SELECT 'END CLEANING UP IDS FROM TEMP SESSION DATA SNAPSHOT TABLE...!!' AS 'INFO LOG' ;

                DROP TABLE TEMP_SESSION_BATCH;
                COMMIT;

                IF (tracingEnabled) THEN SET
                @deletedSessions = @deletedSessions + @sessionCleanupCount;
                  SELECT 'REMOVED SESSIONS: ' AS 'INFO LOG', @deletedSessions AS 'NO OF DELETED ENTRIES', NOW() AS 'TIMESTAMP';
                END IF;

                DO SLEEP(sleepTime);
                -- Sleep for some time letting other threads to run.
              END WHILE;

              -- DROP THE CHUNK TO MOVE ON TO THE NEXT CHUNK IN THE SNAPSHOT TABLE.
              DROP TABLE IF EXISTS IDN_AUTH_SESSION_STORE_TMP;
              COMMIT;

            END WHILE;

            IF (tracingEnabled)
            THEN
              SELECT 'SESSION RECORDS REMOVED FROM IDN_AUTH_SESSION_STORE: ' AS 'INFO LOG', @deletedSessions AS 'TOTAL NO OF DELETED ENTRIES', NOW() AS 'COMPLETED_TIMESTAMP';
            END IF;

            SELECT 'SESSION_CLEANUP_TASK ENDED .... !' AS 'INFO LOG';

            -- --------------------------------------------
            -- REMOVE OPERATIONAL DATA
            -- --------------------------------------------

            SELECT 'OPERATION_CLEANUP_TASK STARTED .... !' AS 'INFO LOG', NOW() AS 'STARTING TIMESTAMP';
            SELECT 'BATCH DELETE STARTED .... ' AS 'INFO LOG';

            DROP TABLE IF EXISTS IDN_AUTH_SESSION_STORE_TMP;
            DROP TABLE IF EXISTS TEMP_SESSION_BATCH;
            COMMIT;

            WHILE (@operationCleanUpTempTableCount > 0) DO

              CREATE TABLE IF NOT EXISTS IDN_AUTH_SESSION_STORE_TMP AS SELECT SESSION_ID, SESSION_TYPE FROM IDN_AUTH_SESSION_STORE WHERE OPERATION = 'DELETE' AND TIME_CREATED < @operationCleanupTime limit chunkLimit;
              CREATE INDEX idn_auth_session_tmp_idx on IDN_AUTH_SESSION_STORE_TMP (SESSION_ID);
              COMMIT;

              SELECT count(1) INTO @operationCleanUpTempTableCount FROM IDN_AUTH_SESSION_STORE_TMP;
              SELECT 'TEMPORARY OPERATION CLEANUP SNAPSHOT TABLE CREATED...!!' AS 'INFO LOG', @operationCleanUpTempTableCount;

              SET @operationCleanupCount = 1;
              WHILE (@operationCleanupCount > 0) DO

                CREATE TABLE IF NOT EXISTS TEMP_SESSION_BATCH AS SELECT SESSION_ID, SESSION_TYPE FROM IDN_AUTH_SESSION_STORE_TMP LIMIT batchSize;
                COMMIT;

                DELETE A
                FROM IDN_AUTH_SESSION_STORE AS A
                  INNER JOIN TEMP_SESSION_BATCH AS B
                    ON A.SESSION_ID = B.SESSION_ID
                       AND A.SESSION_TYPE = B.SESSION_TYPE;
                SET @operationCleanupCount = row_count();
                COMMIT;

                SELECT 'DELETED STORE OPERATIONS COUNT...!!' AS 'INFO LOG', @operationCleanupCount ;

                IF (tracingEnabled)
                THEN
                  SET @deletedDeleteOperations = @operationCleanupCount + @deletedDeleteOperations;
                  SELECT 'REMOVED DELETE OPERATION RECORDS: ' AS 'INFO LOG', @deletedDeleteOperations AS 'NO OF DELETED DELETE ENTRIES', NOW() AS 'TIMESTAMP';
                END IF;


                DELETE A
                FROM IDN_AUTH_SESSION_STORE_TMP AS A
                  INNER JOIN TEMP_SESSION_BATCH AS B
                    ON A.SESSION_ID = B.SESSION_ID;
                COMMIT;

                SELECT 'ENDED CLEANING UP IDS FROM TEMP OPERATIONAL DATA SNAPSHOT TABLE...!!' AS 'INFO LOG' ;

                IF (tracingEnabled)
                THEN
                  SET @deletedStoreOperations = @operationCleanupCount + @deletedStoreOperations;
                  SELECT 'REMOVED STORE OPERATION RECORDS: ' AS 'INFO LOG', @deletedStoreOperations AS 'NO OF DELETED STORE ENTRIES', NOW() AS 'TIMESTAMP';
                END IF;

                DROP TABLE TEMP_SESSION_BATCH;
                COMMIT;
                DO SLEEP(sleepTime);   -- Sleep for some time letting other threads to run.
              END WHILE;

              DROP TABLE IF EXISTS IDN_AUTH_SESSION_STORE_TMP;
              COMMIT;
            END WHILE;

            SELECT 'FLAG SET TO INDICATE END OF CLEAN UP TASK...!!' AS 'INFO LOG' ;

            IF (tracingEnabled)
            THEN
              SELECT 'STORE OPERATION RECORDS REMOVED FROM IDN_AUTH_SESSION_STORE: ' AS 'INFO LOG', @deletedStoreOperations  AS 'TOTAL NO OF DELETED STORE ENTRIES', NOW() AS 'COMPLETED_TIMESTAMP';
              SELECT 'DELETE OPERATION RECORDS REMOVED FROM IDN_AUTH_SESSION_STORE: ' AS 'INFO LOG', @deletedDeleteOperations AS 'TOTAL NO OF DELETED DELETE ENTRIES', NOW() AS 'COMPLETED_TIMESTAMP';
            END IF;

            SET SQL_SAFE_UPDATES = @OLD_SQL_SAFE_UPDATES;

            SELECT 'CLEANUP_SESSION_DATA() ENDED .... !' AS 'INFO LOG', NOW() AS 'ENDING TIMESTAMP';

          END$$

        DELIMITER ;
        ```

    !!! info

        For DB2, MySQL, Oracle, and Postgre database scripts, see [Stored Procedures](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures).

4.  Once the cleanup is over, start the WSO2 Identity Server pointing to the cleaned-up database dump and test throughly for any issues.  
    You can also schedule a cleanup task that will be automatically run after a given period of time. 

    ??? example "Click to view an example"     

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
