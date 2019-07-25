# OAuth Transaction Logs

This section guides you through enabling the logger for OAuth endpoints.

!!! tip
    
    Before you begin
    
    Shutdown the server if WSO2 Identity Server is already running.
    

1.  Add the following event listener to the
    `           identity.xml          ` file found in the
    `           <IS_HOME>/repository/conf/identity          ` folder
    under the `           <EventListeners>          ` tag.  

    !!! tip
    
        **Tip:** You can disable logging by setting the
        `           enable          ` property to **false**.  
        Optionally, you can enable logging the token by setting the
        `           Log.Token          ` property to **true**.
    

    ``` java
    <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"    name="org.wso2.carbon.identity.data.publisher.oauth.listener.OAuthTokenIssuanceLogPublisher" orderId="12" enable="true">
        <Property name="Log.Token">false</Property>
    </EventListener>
    ```

2.  Start WSO2 Identity Server. If the changes have been applied
    successfully, a new file named `          transaction.log         `
    will be created in the
    `          <IS_HOME>/repository/logs/         ` folder.

Whenever you [generate an OAuth token](../../using-wso2-identity-server/working-with-oauth) or perform
an [OAuth token
introspection](_Invoke_the_OAuth_Introspection_Endpoint_) related
operation, the action will be logged in the
`         transaction.log        ` file. Sample log entries are shown
below.

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
