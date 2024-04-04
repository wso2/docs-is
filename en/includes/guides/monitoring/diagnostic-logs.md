# Diagnostic logs

Logs in {{ product_name }} are designed to help developers diagnose and troubleshoot issues that occur when using {{ product_name }} features such as onboarding applications, and configuring authentication flows. Furthermore, support engineers can also use logs to troubleshoot user issues.

## Analyze logs

You can access logs in {{ product_name }} by navigating to **Logs** on the {{ product_name }} Console. The logs portal looks as below.

![{{ product_name }} logs]({{base_path}}/assets/img/guides/asgardeo-logs/diagnostic-logs-display.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You can analyze logs by combining one or more of the following filters:

### Filter logs by time
You can change the timeframe of the logs by clicking the dropdown next to the search bar.

![{{ product_name }} logs filter by time]({{base_path}}/assets/img/guides/asgardeo-logs/logs-filter-by-time.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    By default, the console displays logs that occurred in the last 15 minutes.

Besides the given timeframes, you can select a custom time range by following the steps below.

1. Scroll down to the bottom of the timeframe dropdown and select **Custom Time Range**.
2. Provide your desired time zone and the time range.
3. Click the button to submit.

    ![{{ product_name }} logs filter by custom time range]({{base_path}}/assets/img/guides/asgardeo-logs/logs-select-custom-time-range.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Search for logs

You can use the search bar to search for logs based on the Trace ID, Action ID, Client ID, Result Message or the Result Status. Learn more about these parameters in the [structure of logs](#structure-of-logs) section.

For example, the diagram below shows the results for a search based on the Result Message.

![{{ product_name }} logs search bar]({{base_path}}/assets/img/guides/asgardeo-logs/logs-search-bar.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Filter logs

When you expand a log in {{ product_name }} by clicking on it, you will get the following view.

![{{ product_name }} logs expanded view]({{base_path}}/assets/img/guides/asgardeo-logs/asgardeo-log-expand-view.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Click the **filter icon** next to one or more of the log parameters and {{ product_name }} will narrow the search based on those parameter values. Learn more about these parameters in the [structure of logs](#structure-of-logs) section.

For example, if you would like to view logs related to a request, click the filter icon next to the relevant traceId and click **Run Query** to filter out all the related logs.

![{{ product_name }} logs filter by specific value]({{base_path}}/assets/img/guides/asgardeo-logs/logs-filter-by-specific-value.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Add custom logs to authentication scripts

In addition to the logs generated by {{ product_name }}, organization administrators can define their own logs when [setting up conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) scripts. This is helpful when you need additional information to troubleshoot an application issue.

!!! note
    Custom logs are marked by the **</>** icon in the logs portal.

There are three types of custom logs that you can define in conditional authentication as explained below.

### Info logs

Info logs are used to log additional information related to a flow. You can define info logs using the utility function `Log.info()`.

For example, an application developer sets up the following info log in the conditional authentication script to verify which user groups are allowed to log in.

```java
.....
var allowedGroups = ['Supplier'];
Log.info('Allowed groups: ' + allowedGroups.toString());
.....
```

Once a user attempts to log in, this information is logged in the logs portal as shown below.

![Info logs in conditional authentication]({{base_path}}/assets/img/guides/asgardeo-logs/info-log-conditional-auth.png){: width="550" style="border: 0.3px solid lightgrey;"}

<br>

### Debug logs

Debug logs can be used to check the status of a condition defined in the conditional authentication script. You can define debug logs using the utility function `Log.debug()`.

For example, an application developer sets up a debug log in the conditional authentication script to determine whether the first step of a login attempt succeeded.

```java
...
executeStep(1, {
    onSuccess: function (context) {
        Log.debug('first step successful'); 
    }
})
...
```
Once a user succeeds the first login step, the debug log appears in the logs portal as shown below.

![Debug logs in conditional authentication]({{base_path}}/assets/img/guides/asgardeo-logs/debug-log-conditional-auth.png){: width="550" style="border: 0.3px solid lightgrey;"}

<br>

### Error logs

Conditional authentication scripts can generate two types of error logs in the logs portal.

- Application errors that occur due to syntax errors in the conditional authentication script.

    For example, your conditional authentication script may have a syntax error that the editor does not flag as shown below.
    ```java
    .....
    var allowedGroups = ['Supplier'];
    Log.info('Allowed groups: ' + alowedGroups.toString());
    .....
    ```
    Once a user attempts to log in, the error is logged in the logs portal as shown below.

    ![Error logs due to syntax in conditional authentication]({{base_path}}/assets/img/guides/asgardeo-logs/error-log-syntax-error-conditional-auth.png){: width="700" style="border: 0.3px solid lightgrey;"}

    <br>

- Custom errors that you define using the utility function `Log.error()`.

    For example, an application developer sets up an error log in the conditional authentication script to identify when a user outside the allowed user groups tries to log in.

    ```java
    var allowedGroups = ['Supplier'];
    ...
    executeStep(1, {
    onSuccess: function (context) {
        var user = context.currentKnownSubject;
        var isMember = isMemberOfAnyOfGroups(user, allowedGroups);
        if(!isMember){
            Log.error(user.username + ' is not a member of the groups: ' + allowedGroups.toString());
        } }
    })
    ...
    ```
    Once an unauthorized user attempts to log in, the error is logged in the logs portal as shown.

    ![Error logs in conditional authentication]({{base_path}}/assets/img/guides/asgardeo-logs/error-log-conditional-auth.png){: width="700" style="border: 0.3px solid lightgrey;"}

    <br>

## Structure of logs

The following table explains some of the common properties found in {{ product_name }} logs.

<table>
    <thead>
        <th>Property</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>Unique ID for each log event</td>
        </tr>
        <tr>
            <td>recordedAt</td>
            <td>Timestamp at which the event occurs</td>
        </tr>
        <tr>
            <td>traceId</td>
            <td>Unique ID to correlate the log event to a specific request</td>
        </tr>
        <tr>
            <td>flowId</td>
            <td>Unique ID to correlate the log event to a specific flow</td>
        </tr>
        <tr>
            <td>input</td>
            <td>Parameters applicable for the action. This can be either request parameters or method parameters or request headers.</td>
        </tr>
        <tr>
            <td>resultStatus</td>
            <td>Status of the action. Either <code>Success</code> or <code>Failed</code></td>
        </tr>
        <tr>
            <td>resultMessage</td>
            <td>Description of the result status. E.g. reason for the failure.</td>
        </tr>
        <tr>
            <td>actionId</td>
            <td>A unique ID to identify a specific action performed by the system.</td>
        </tr>
        <tr>
            <td>configurations</td>
            <td>System configurations relevant to the action (This can be UI / organization / system level configurations).</td>
        </tr>
    </tbody>
</table>

## Sample scenarios

The following scenarios describe how you can use logs to troubleshoot some common issues that occur when using {{ product_name }}.

### Application onboarding

Follow the steps below to observe an application error log due to incorrect client credentials.

1. [Onboard an application]({{base_path}}/get-started/start-integrating-apps/) to {{ product_name }} but provide incorrect client credentials when configuring the application.

2. Attempt to log in to the application with a user account. An error will occur in the application.

3. Go to the logs portal on the {{ product_name }} Console and observe the following error log.

    ![{{ product_name }} logs invalid credentials]({{base_path}}/assets/img/guides/asgardeo-logs/logs-invalid-credentials.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Conditional authentication

Follow the steps below to observe an application error log due to not meeting the conditions of an authentication script.

1. [Onboard an application]({{base_path}}/get-started/start-integrating-apps/) to Asgardeo.

2. Restrict login to anyone outside the `employee` group using [group-based access control]({{base_path}}/guides/authentication/conditional-auth/group-based-template-access-control/).

3. Define a [custom error log](#error-logs) in the authentication script.

4. Log in to the application with a user account not belonging to the <code>employee</code> group. An error will occur in the application.

5. Go to the logs portal on the {{ product_name }} Console and observe the following error log.

    ![{{ product_name }} logs conditional authentication]({{base_path}}/assets/img/guides/asgardeo-logs/logs-conditional-authentication.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}