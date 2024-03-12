# Authentication Session Persistence

This guide walks you through the process of enabling session persistence for sessions. This is useful when the **Remember me** option is selected while logging into either the service provider or the Management Console.

??? Note "Sessions in the WSO2 Identity Server"

    When you log in to a web application using WSO2 Identity Server, a single sign-on (SSO) session is created by the Identity Server for the user of the application. Also, as the user logs in to the web application, there is a session created for the user within the web application itself. These are two separate sessions, and they are not synchronized with each other.

    For example, if the web application has a session timeout of 20 minutes and the WSO2 IS SSO session timeout is 5 minutes, the application users will not see the login page for up to 20 minutes. That is
    because WSO2 IS is not invalidating the session by force on the web application.

    If the web application session timeout is 5 minutes and the WSO2 IS SSO session timeout is 20 minutes, the users will not see the login page for up to 20 minutes. This is because even when the web application container session times out after 5 minutes, the session is kept alive since WSO2 IS SSO session is still alive. The user will not be redirected to the login screen of the SP until the WSO2 IS SSO session is invalidated.

    WSO2 Identity Server creates a separate SSO session for SSO login, and it is different from the session that is created when you log in to the Identity Server management console.

    When the end user logs in through the WSO2 Identity Server for the service provider application (using SAML2 SSO, OpenID Connect, Passive STS, etc.), the Identity Server creates an SSO session for end users and
    a cookie that is related to the created SSO session is set to the user’s browser.

    This cookie can be seen as **commonauthId**. It is set to the user’s browser with the hostname of the WSO2 Identity Server instance and the value of the **commonauthId** cookie is the SSO session identifier. When an SSO session is created in the WSO2 Identity Server, the session is put into the session cache and persisted in the database. To persist it into the database, you must enable session persistence.

## Importance of session persistence

SSO sessions are stored in an in-memory cache. It is recommended to persist the SSO session due to the following reasons.

- If you are running a single WSO2 Identity Server instance and the server is restarted, all SSO sessions will be removed. If you have multiple nodes of WSO2 instances, it is **not guaranteed** that you can recover all the sessions. Although the cache is distributed, it is not 100% split among each node.
- Cache has a limit. If there are a large number of SSO sessions, memory can be high, and server performance may reduce. So usually the cache is evicted after a given number of entries (by default 10000 entries). Therefore, some SSO sessions can be evicted from caches when there is a large number of user logins.
- When there is a clustered development, if you have **no** persistence, you need to rely completely on the distributed cache. However, if you have persistence, you can rely on it as well. This increases the reliability of the overall system.

## Data objects persisted in the DB

WSO2 Identity Server has multiple local caching usages in different layers to improve product performance. But most of the caches are ready to persist in the database if it is required.

There are three types of data objects that are persisted in the database.

- **Session Data**

    Once the user is authenticated, WSO2 Identity Server creates a session data object that stores the authenticated user and the other authentication flow details. This will be stored in the database to be shared across the cluster nodes.

- **Operational Data**

    Once the user gets authenticated, there will be a record for login status to that session id. Then again when that user is logged out from the system, we are not removing the above record from the table instead of that, we add a new record to the same session id with a status called logout. So the valid record is the last one, and all the other records under that session id will be outdated. Those outdated records belong to the Operational Data.

- **Temporary Data**

    In the authentication flow, many temporary data objects are kept for a few seconds only. These are kept in the cache. But to make the cluster environment consistent without having the local cache, we also store that in the same database table where we stored the session data as above.

## Key aspects in session persistence

Upon considering the persistence of data relevant to the critical path and high-concurrency situations, the following key aspects are improved.

- **Data clean-up**

    Since the above data are collected over the authentication flow, the database will grow with that data very frequently. So we had to manage a few tasks to clean the data in the database for some given conditions.

- **Data clean-up in a clustered environment**

    Even in a clustered environment, it is not recommended to enable Hazelcast distributed caching for identity data. Therefore, it is recommended to rely on the local cache in this case as well. In a clustered environment, it is recommended to disable the pool by setting the `PoolSize` property to 0. Else, data inconsistencies can occur where one node gets delayed and does not update the database before the other node accesses the same data from the database.

!!! note

    Note that even when using the local cache, it triggers the cache invalidation notification system to ensure that data is consistent among the nodes in the cluster when data is deleted or updated, but this is
    not triggered when adding new data.

## Session cleanup configurations
The following table describes the elements of the session clean-up configurations.

The `[session_data.persistence]` section is related to the persistence of session data.

| Configuration element | Description   |
|-----------------------|---------------|
| `enable_persistence`    | This enables the persistence of session data. Therefore, this must be configured to `true` if you wish to enable session persistence. |
| `persist_temporary_data`    | Setting this to `true` enables persistence of temporary caches that are created within an authentication request. |
| `persistence_pool_size` | Keep this value as `0`. The `persistence_pool_size` equals zero means that it is disabled, and the authentication flow is blocked until this particular data persistence task is complete. To execute the persistence task asynchronously, set the value to `>0`. Based on the pool size, the system creates the task parallel to executing the persistence task that was in the queue. Any value greater than `0` does not provide expected results and sometimes causes unwanted side effects. |


The `[session_data.cleanup]` section is related to the cleaning up of session data

| Configuration element | Description   |
|-----------------------|------------   |
| `enable_expired_data_cleanup`   | Setting this to true enables the expired session data clean-up task and ensures that it starts running.    |
| `expire_session_data_after` | This is the timeout value of the session data that is removed by the clean-up task. The default value is `14` days.  |
| `clean_expired_session_data_every`  | This is the time that the clean-up task would run. The default value is 1 day. This is used for both session data clean-up and operation data clean-up through the same task. |
| `clean_expired_session_data_in_chunks_of`   | This value determines (limits) the number of rows that will be deleted in a single delete query statement. The default value is `8192`. If the number of rows to delete is larger than this limit, the `DELETE` statement is repeated until the number of affected rows is less than the `LIMIT` value. |
| `clean_logged_out_sessions_at_immediate_cycle`  | Setting this to true enables the operational data cleanup task and ensures that it starts running. |

| Configuration element | Description   |
|-----------------------|---------------|
| `enable_pre_session_data_cleanup`   | Setting this to true enables separated cleanup for temporary authentication context data. |
| `expire_pre_session_data_after` | All temporary authentication context data older than the `expire_pre_session_data_after` value is considered expired and is deleted during the clean-up task.   |
| `pre_session_data_cleanup_thread_pool_size` | Defines the maximum number of threads to be allocated for temp data deletion. When `pre_session_data_cleanup_thread_pool_size = >0`, temporary data that has no usage after the authentication flow is completed, is deleted immediately. When `pre_session_data_cleanup_thread_pool_size = 0`, data is deleted only by the scheduled cleanup task.   |

## Importance of correct `Deletechunksize`

In the world of the World Wide Web, sessions are the simplest way to store data for individual users against a unique session ID. These can be used to persist state information between page requests. When all
the requests ad responses that come to a page per day are considered, that is a large amount. Due to this reason, the session data stored in the “IDN\_AUTH\_SESSION\_STORE ” table in the WSO2CARBON\_DB of WSO2 IS is high. This table fills up quickly if your system receives too many loads of requests.

After a certain period, these session data are not necessary. To stop the exponential table growth, a Session Clean Up Task in predefined time intervals is run via a script. If this storing session data is huge, the data that need to be deleted also will come in bulk.

The session clean-up task also takes a certain amount of time and consumes a certain amount of resources. Therefore, the performance of session clean-up tasks should always be improved. For this `DeleteChunkSize` property has been introduced in the WSO2 Identity Server. This will also help to reduce deadlocks happening during session clean-up tasks. With the use of `DeleteChunkSize` value, the deletion happens batch-wise. `DeleteChunkSize` of data is deleted at one time.

But if you didn’t select the correct number for the DeleteChunkSize, you will end up with less performance. Therefore selecting a suitable chunk size for your database is a must.

!!! Note "Size of Delete Chunks"

    The value of the delete chunk size depends on various factors such as:  
    
    - The size of a row of the table. You can calculate this by adding bytes needed for each column and some control information per record.  
    - The underlying physical storage. e.g., Normal SATA spinning Disk, SSD, SCSI, Amazon S3/EBS, etc.  
    - The type of the database engine (e.g., MySql, MSSql, Oracle). Each one has a different data organization mechanism in physical storage.  
    - OS where the DB server runs.

    The best way to calculate the chunk size is to run a sample program that calculates the size. To do this, you may need to insert a large number of artificial records on the table and run a deletion query with incremental chunk sizes. Then you can plot the result in a table to see which is the optimal chunk size for a specific configuration.

    Also, this chunk size configuration may change later if you decide to upgrade the DB cluster, storage, etc. Hence it is not a static value. The optimal value needs to be measured each time you make a change in your database infrastructure.

    **Note:** Usually, the optimum chunk size is a power of 2 and typically multiple of 512. This can be used for incremental values.
