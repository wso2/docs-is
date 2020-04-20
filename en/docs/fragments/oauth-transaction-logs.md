## OAuth Transaction Logs

This section guides you through enabling the logger for OAuth endpoints and is **optional**.


1.  Add the following event listener to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` folder.

    !!! tip
        You can disable logging by setting the `enable` property to **false**.  
    
    ``` java
    [event.default_listener.oauth_listener]
    priority= 12
    enable = true
    ```

2.  Start WSO2 Identity Server. If the changes have been applied successfully, a new file named `transaction.log` will be created in the `<IS_HOME>/repository/logs/` folder.

Whenever you generate an OAuth token or perform an OAuth token introspection-related operation, the action will be logged in the `transaction.log` file. Sample log entries are shown below.

**OAuth Token Generation Log**

``` java
[2018-10-17 19:05:35,578] - Type: OAUTH TOKEN | Info: {"expires_in_seconds":3126,"grant_type":"client_credentials","success":true,
"time_taken_in_millis":38,"type":"oauth","issued_time":1539782861654,"user":"admin@carbon.super",
"client_id":"WImdsCviCHTXVjjef7VVMiYDxJAa"}
```

**OAuth Introspection Log**

``` java
[2018-10-17 19:05:48,654] - Type: OAUTH INTROSPECTION | Info: {"expires_in_seconds":3113,"success":true,
"time_taken_in_millis":2,"issued_time":1539782861,"type":"introspection","user":"admin@carbon.super",
"client_id":"WImdsCviCHTXVjjef7VVMiYDxJAa","token":"6cc57770-a51c-3d6d-be62-49caa0c1217b"}
```
