# Logs in Asgardeo

Logging is essential for maintaining system integrity and security. Two main types of logs are utilized:

- [Diagnostic logs]({{base_path}}/guides/asgardeo-logs/diagnostic-logs/) help developers troubleshoot issues related to application onboarding and authentication flow configurations,

- [Audit logs]({{base_path}}/guides/asgardeo-logs/audit-logs/) track critical state changes within Asgardeo resources for security enhancement and incident investigation purposes.

## Analyze logs

You can access logs in Asgardeo by navigating to **Logs** on the Asgardeo Console. The logs portal looks as below.

![Logs]({{base_path}}/assets/img/guides/asgardeo-logs/diagnostic-logs-display.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You can analyze logs by combining one or more of the following filters:

### Filter logs by time
You can change the timeframe of the logs by clicking the dropdown next to the search bar.

![Logs filter by time]({{base_path}}/assets/img/guides/asgardeo-logs/logs-filter-by-time.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    By default, the console displays logs that occurred in the last 15 minutes.

Besides the given timeframes, you can select a custom time range by following the steps below.

1. Scroll down to the bottom of the timeframe dropdown and select **Custom Time Range**.
2. Provide your desired time zone and the time range.
3. Click the button to submit.

    ![Logs filter by custom time range]({{base_path}}/assets/img/guides/asgardeo-logs/logs-select-custom-time-range.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


### Filter logs

When you expand a log in Asgardeo by clicking on it, you will get the following view.

![Logs expanded view]({{base_path}}/assets/img/guides/asgardeo-logs/logs-expanded-view.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Click the **filter icon** next to one or more of the log parameters and Asgardeo will narrow the search based on those parameter values.

For example, if you would like to view logs related to a request, click the filter icon next to the relevant traceId and click **Run Query** to filter out all the related logs.

![Logs filter by specific value]({{base_path}}/assets/img/guides/asgardeo-logs/logs-filter-by-specific-value.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


## Remote Log Publishing

Asgardeo allows you to securely publish both audit and diagnostic logs to external servers for long-term storage and analysis. You can configure separate publishers for audit and diagnostic logs with custom settings for each. Learn more about setting up [Remote Log Publishing]({{base_path}}/guides/asgardeo-logs/remote-log-publish).
