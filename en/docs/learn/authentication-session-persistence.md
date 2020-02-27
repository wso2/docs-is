# Authentication Session Persistence

This topic is regarding sessions in the WSO2 Identity Server (IS) and
the process of enabling session persistence for these sessions. This is
particularly useful when the remember me option is selected when logging
into either the service provider or the WSO2 Identity Server.

!!! info "Understanding sessions in the WSO2 Identity Server"

    When you log in to the Web application using WSO2 Identity Server, a
    single sign-on (SSO) session is created by the Identity Server for the
    user of the application. Also, as the user logs in to the Web
    application, there is a session created in the Web application itself for
    the user. These are two separate sessions and they are not synchronized
    with each other.

    For an example, if the Web application has a session timeout of 20
    minutes and the WSO2 IS SSO session timeout is 5 minutes, the
    application users will not see the login page up to 20 minutes. That is
    because WSO2 IS is not invalidating the session by force on the Web
    application.

    If the Web application session timeout is 5 minutes and the WSO2 IS SSO
    session timeout is 20 minutes, the users will not see the login page up
    to 20 minutes. This is because even when the Web application container
    session times out after 5 minutes, the session is kept alive since WSO2
    IS SSO session is still alive. The user will not be redirected to the
    login screen of the SP until the WSO2 IS SSO session is invalidated.

    WSO2 Identity Server creates a separate SSO session for SSO login and it
    is different from the session that is created when you log in to the
    Identity Server management console.

    When end user logs in through the WSO2 Identity Server for the service
    provider application (using SAML2 SSO, OpenID Connect, Passive STS,
    etc.), the Identity Server creates a SSO session for end users and
    a cookie that is related to the created SSO session is set to the user’s
    browser.

    This cookie can be seen as **commonauthId**. It is set to the user’s
    browser with the hostname of WSO2 Identity Server instance and the value
    of the **commonauthId** cookie is the SSO session identifier. When SSO
    session is created in the WSO2 Identity Server, the session is put into
    the session cache and persisted to the database. To persist it in to the
    database, you must enable the session persistence.

    ??? note "Click here to read about the importance of persisting the session"

        SSO sessions are stored in an in-memory cache. It is recommended
        to persist the SSO session due to following reasons.

        -   If you are running a single WSO2 Identity Server instance and the
            server is restarted, all SSO session would be removed. If you have
            multiple nodes of WSO2 instances, it is **not guaranteed** that you
            can recover all the sessions. Although the cache is distributed, it
            is not 100% split to each node.
        -   Cache has a limit. If there are large number of SSO sessions, memory
            can be high and server performance may reduce. So usually the cache
            is evicted after a given number of entries (by default 10000
            entries). Therefore, some SSO session can be evicted from caches
            when there are large number of user logins.
        -   When there is a clustered development, if you have **no**
            persistence, you need to rely completely on the distributed cache.
            However, if you have persistence, you can rely on it as well. This
            increases the reliability of the overall system.

WSO2 Identity Server has multiple local caching usage in different
layers to improve the product performance. But most of the caches are
ready to persist in the database if it is required.

There are three type of data objects that are persisted in the database.

#### 1. Session Data

Once the user gets authenticated over WSO2 Identity Server, it will
create a session data object which stores the authenticated user and
the other authentication flow details. This will be stored in the database
to be shared across the cluster nodes.

#### 2. Operational Data

This covers the same session data as in above but the outdated
records. Ex: Once user gets authenticated, there will be a record for
login status to that session id. Then again when that user is logged out from
the system, we are not removing the above record from the table and
instead of that we add a new record to the same session id with status
called logout. So the valid record is the last one and all the other
records under that session id will be outdated. Those outdated records
belong to the Operational Data.

#### 3. Temporary Data

In authentication flow, there are many temporary data objects that will
keep for few seconds only. We keep these in cache. But to make
consistent the cluster environment without having the local cache, we
store that also in the same database table that we stored the session
data as in above.

Upon considering the persistence of data relevant to the
critical path and high concurrency situations, we had to further improve
the following key aspects as well.

#### Data Clean-Up

Since above data are collected over the authentication flow, the database 
will grow with that data very frequently. So we had to manage
few tasks to clean the data in the database for some given conditions.

#### Task Pool

We are storing above data within a critical path which controls the
authentication. So we have introduced a pooling mechanism to put the
data persistence tasks into that pool and continue the critical path
without blocking it.

#### Data clean-up in a clustered environment

Even in a clustered environment, it is not recommend to enable Hazelcast
distributed caching for identity data. Therefore, it is recommended to
rely on the local cache in this case as well. In a clustered
environment, it is recommended to disable the pool by setting the
`         PoolSize        ` property to 0. Else, data inconsistencies
can occur where one node gets delayed and does not update the database
before the other node accesses the same data from the database.

!!! note
    
    Note that even when using the local cache, it triggers the cache
    invalidation notification system to ensure that data is consistent among
    the nodes in the cluster when data is deleted or updated, but this is
    not triggered when adding new data.
    

Add the following configuration to the
`         <IS_HOME>/repository/conf/deployment.toml        ` file.

``` xml
    [session_data.persistence]
    enable_persistence = true
    persist_temporary_data = true
    persistence_pool_size = "0"

    [session_data.cleanup]
    enable_expired_data_cleanup = true
    expire_session_data_after = "14d"
    clean_expired_session_data_every = "1d"
    clean_expired_session_data_in_chunks_of = "8192"
    clean_logged_out_sessions_at_immediate_cycle = "true"

    enable_pre_session_data_cleanup = true
    pre_session_data_cleanup_thread_pool_size= "20"
    expire_pre_session_data_after= "40m"       
```

The following table describes the elements of the configurations
mentioned above.

`[session_data.persistence]` section of the configuration is related to the persistence of session data.                                                                                                                                                                                         

| Configuration element | Description                                                                                                                                                                                                                                                                                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable_persistence                | This enables the persistence of session data. Therefore, this must be configured to `true` if you wish to enable session persistence.                                                                                                                                                                                          |
| persist_temporary_data             | Setting this to `true` enables persistence of temporary caches that are created within an authentication request.                                                                                                                                                                                                              |
| persistence_pool_size              | ‘persistence_pool_size’ equals to 0 means that it is disabled and then the authentication flow is blocked until this particular data persistence task is completed. To execute the persistence task in asynchronously, set the value to \>0 value. Based on the pool size, the system creates the task parallel to execute the persistence task that was in the queue. |


`[session_data.cleanup]` section of the configuration is related to the cleaning up of session data.    
                                                                                                                                                                                                                                                                      
| Configuration element | Description                                                                                                                                                                                                                                                                                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable_expired_data_cleanup               | Setting this to true enables the expired session data cleanup task and ensures that it starts running.                                                                                                                                                                                                                                                                         |
| expire_session_data_after        | This is the timeout value of the session data that is removed by the cleanup task. The default value is 14 days.                                                                                                                                                                                                                             |
| clean_expired_session_data_every         | This is the time period that the cleanup task would run. The default value is 1 day. This is used for both session data cleanup and operation data cleanup through the same task.                                                                                                                                                            |
| clean_expired_session_data_in_chunks_of       | This value determines (limits) the number of rows that will be deleted in a single delete query statement. The default value is 8192. If the number of rows to delete is larger than this limit, the DELETE statement is repeated until the number of affected rows is less than the LIMIT value.                                                        |
| clean_logged_out_sessions_at_immediate_cycle       | Setting this to true enables the operational data cleanup task and ensures that it starts running. |

| Configuration element | Description                                                                                                                                                                                                                                                                                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable_pre_session_data_cleanup       | Setting this to true enables separated cleanup for temporary authentication context data.                                                                                                                                                                                                                                                 |
| expire_pre_session_data_after        | All temporary authentication context data older than the `expire_pre_session_data_after` value is considered as expired and is deleted during the cleanup task.                                                                                                                                                                                 |
| pre_session_data_cleanup_thread_pool_size              | Defines the maximum number of threads to be allocated for temp data deletion. When `pre_session_data_cleanup_thread_pool_size` => 0, temporary data that has no usage after the authentication flow is completed, is deleted immediately. When `pre_session_data_cleanup_thread_pool_size = 0`, data is deleted only by the scheduled cleanup task.                                                                             |

!!! info "About size of Delete Chunks"

    The value of delete chunk size depends on various factors such as:  
    - The size of a row of the table. You can calculate this by adding bytes
    needed for each column, and some control information per record.  
    - The underlying physical storage. e.g Normal SATA spinning Disk, SSD,
    SCSI, Amazon S3/EBS etc.  
    - The type of the database engine (e.g. MySql, MSSql, Oracle). Each one
    has different data organization mechanism in physical storage.  
    - OS where the DB server runs.

    The best way to calculate the chunk size it is to run a sample program
    that calculates the size. To do this, you may need to insert a large
    number of artificial records on the table and run a deletion query with
    incremental chunk sizes. Then you can plot the result in a table to see
    which is the optimal chunk size for a specific configuration.

    Also, this chunk size configuration may change later if you decide to
    upgrade the DB cluster, their storage etc. Hence it is not a static
    value. The optimal value needs to be measured each time you do a change
    in your database infrastructure.

    **Note:** Usually, the optimum chunk size is power of 2 and typically
    multiple of 512. This can be used for incremental values.

## **Why we need to have a proper delete chunk size ?**

In the world of World Wide Web, Sessions are the simplest way to store
data for individual users against a unique session ID. These can be used
to persist state information between page requests. When we consider all
the requests ad responses that comes to a page per day, that is really a
large amount. Due to this reason, the session data storing in the “
IDN\_AUTH\_SESSION\_STORE ” table in the WSO2CARBON\_DB of WSO2 IS is
really high. This table fills up quickly if your system receive too much
loads of requests.

After a certain period of time these session data is not really
necessary. In order to stop the exponential table growth, we run a
Session Clean Up Tasks in predefined time intervals via a script. If
this storing session data is huge, the data that need to be deleted also
will comes in bulk.

The session clean up task also takes a certain amount of time and
consumes certain amount of resources. Therefore, we always need need to
improve the performance of session clean up tasks. For this
DeleteChunkSize property has introduced in WSO2 Identity Server. This
will also help to reduce dead-locks happening during session clean up
task. With the use of DeleteChunkSize value, the deletion happens batch
wisely. “DeleteChunkSize” of data is deleted at one time.

But if you didn’t select a correct number for the DeleteChunkSize, you
will end up with less performance. Therefore selecting suitable chunk
size for you database is a must.

This chuck size may differ due to various factors of your environment

-   The size of a row of the table. Calculate this by adding bytes
    needed for each column, and some control information per record.
-   The underlying physical storage. e.g Normal SATA spinning Disk, SSD,
    SCSI, Amazon S3/EBS etc.
-   The type of the database engine (e.g. MySql, MSSql, Oracle). Each
    one has different data organization mechanism in physical storage.
-   OS where the DB server runs.

Therefore, it is hard to select a DeleteChunkSize without considering
all the above factors.

  
