# Removing Unused Tokens from the Database

As you use the WSO2 Identity Server (WSO2 IS), the number of revoked,
inactive and expired tokens accumulates in the
IDN\_OAUTH2\_ACCESS\_TOKEN table. These tokens are kept in the database
for logging and audit purposes, but they can have a negative impact on
the server's performance over time. Therefore, it is recommended to
clean them periodically in order to enhance the token lookup and to
avoid a growing access token table.

You can use one of the following methods for token cleanup.

### Configuring WSO2 Identity Server for token cleanup

WSO2 Identity Server triggers token cleanup during the following
instances.  

1.  New token generation
2.  Token refresh
3.  Token revocation

Enable token cleanup by configuring the following properties in the
`         identity.xml        ` file found in the
`         <IS_HOME>/repository/conf/identity        ` folder.

``` java
<!-- token cleanup feature config-->
<TokenCleanup>
    <!-- old access token cleaning feature  -->
    <EnableTokenCleanup>true</EnableTokenCleanup>
    <!-- old access token will be retain in audit table  -->
    <RetainOldAccessToken>true</RetainOldAccessToken>
</TokenCleanup>
```

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>             &lt;EnableTokenCleanup&gt;            </code></td>
<td><p>Set this property to <strong>true</strong> to enable token cleanup.</p>
<p>Set it to <strong>false</strong> to disable token cleanup.</p></td>
</tr>
<tr class="even">
<td><code>             &lt;RetainOldAccessToken&gt;            </code></td>
<td><p>Set this property to true to move the old, invalid tokens to the Audit table when token cleaning is enabled.</p>
<p>Set it to false if you do not wish to store old tokens in the Audit table.</p></td>
</tr>
</tbody>
</table>

### Using stored procedures for token cleanup

Alternatively, you can also use the provided stored procedures to run a
token cleanup task periodically to remove the old and invalid tokens.
Follow the instructions below to configure token cleanup using this
method.

!!! tip
    It is safe to run these steps in read-only mode or during a time when traffic on the server is low, but that is not mandatory.
    

1.  Take a backup of the running database.
2.  Set up the database dump in a test environment and test it for any
    issues.

    !!! tip
        We recommend that you test the database dump before the cleanup task as the cleanup can take some time.
    

3.  Depending on your database, select the appropriate token cleanup
    script from
    [here](https://github.com/wso2/carbon-identity-framework/tree/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures)
    and run it on the database dump. This takes a backup of the
    necessary tables, turns off SQL updates and cleans the database of
    unused tokens.

4.  Once the cleanup is over, start the WSO2 Identity Server pointing to
    the cleaned-up database dump and test throughly for any issues.  
    You can also schedule a cleanup task that will be automatically run
    after a given period of time. Here's an example:

    ``` java tab="MySQL"
    USE 'WSO2IS_DB';
    DROP EVENT IF EXISTS 'cleanup_tokens_event';
    CREATE EVENT 'cleanup_tokens_event'
        ON SCHEDULE
          EVERY 1 WEEK STARTS '2015-01-01 00:00.00'
        DO
          CALL 'WSO2IS_DB'.'cleanup_tokens'();

    -- 'Turn on the event_scheduler'
    SET GLOBAL event_scheduler = ON;
    ```

    ``` java tab="SQL Server"
    USE WSO2IS_DB ;  
    GO  
    -- Creates a schedule named CleanupTask.   
    -- Jobs that use this schedule execute every day when the time on the server is 01:00.   
    EXEC sp_add_schedule  
        @schedule_name = N'CleanupTask',  
        @freq_type = 4,  
        @freq_interval = 1,  
        @active_start_time = 010000 ;  
    GO  
    -- attaches the schedule to the job BackupDatabase  
    EXEC sp_attach_schedule  
        @job_name = N'BackupDatabase',  
        @schedule_name = N'CleanupTask' ;  
    GO
    ```
