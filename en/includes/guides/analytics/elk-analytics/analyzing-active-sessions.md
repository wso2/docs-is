# Analyze Active Sessions

The **Session Dashboard** displays statistics related to sessions of the different applications that are accessed
via WSO2 Identity Server. Learn how to [configure the Session Dashboard]({{base_path}}/deploy/elk-analytics-installation-guide)

## Session Dashboard Widgets

You can analyze login sessions with the following widgets.

### Active Sessions

This widget presents the **currently active sessions** and gets updated for each active session in WSO2 Identity Server.

![Active Session Count]({{base_path}}/assets/img/elk-analytics/session-dashboard/elk-session-dashboard-3.png){: width="400" style="display: block; margin: 0; border-style: solid; border-radius: 5px; border-width: 1px;"}

### Session Count Over Time

![Session Count Over Time]({{base_path}}/assets/img/elk-analytics/session-dashboard/elk-session-dashboard-4.png){: style="display: block; margin: 0;"}

- This chart presents the session count over time.
- The **Active** line (green) indicates the number of active sessions over the selected time interval. A session needs to be active
  at the end of the selected time bucket in order to be counted as an active session.
- The **New** line (blue) indicates the number of sessions that started during the selected time interval.
- The **Terminated** line (red) indicates the number of sessions that got terminated over the given time interval.

**Purpose**

- Understand the current load that is handled by your application in terms of the number of active sessions at any
  given time.
- Understand the load handled by your application in terms of the number of sessions over any selected time interval.
- Compare the load handled in terms of the number of sessions over different time intervals to identify usage patterns.

**Recommended Actions**

- Select different time intervals to identify correlations between the usage of an application and time.

- When you identify the specific time intervals, in which the usage of an application is particularly high, you can allocate more resources to handle the increased load. Similarly, you can allocate less resources during time intervals when the load is relatively low.


### Top Longest Sessions

![Top Longest Session]({{base_path}}/assets/img/elk-analytics/session-dashboard/elk-session-dashboard-2.png){: style="display: block; margin: 0;"}

This chart presents the longest sessions that took place during a given time interval.

**Purpose**

- Identify the longest session of each user with the corresponding length of duration.
- Compare the longest sessions for different time intervals and identify users who are most active during
  different time intervals.

### Average Session Duration

![Average Session Duration]({{base_path}}/assets/img/elk-analytics/session-dashboard/elk-session-dashboard-1.png){: style="display: block; margin: 0;"}

This chart presents the average duration of a session based on the most frequent users for the selected time
interval.

**Purpose**

- Understand the average length of time spent by each user in a session.
- Observe usage patterns for each user based on average session length during different time intervals.

**Recommended Actions**

- Compare the average time spent by each user during different time intervals to observe whether the session duration
increases or decreases over time.

- Once this information is obtained, further investigations can be carried out to identify the reasons for such user
behavior and take corrective actions where necessary, i.e., increase/decrease the efficiency of the application and
enhance/reduce user experience features that results in users spending more/less time in the application.

### Session Count

![Session Count]({{base_path}}/assets/img/elk-analytics/session-dashboard/elk-session-dashboard-5.png){: width="600" style="display: block; margin: 0;"}

This chart groups the total number of sessions based on the duration of a session.

**Purpose**

- Identify the general user behavior based on how long sessions last in your application.
- Identify changes to the user behavior pattern based on the time spent on a session over different time intervals.

**Recommended Actions**

- Compare the count for different session durations at different time intervals and observe change patterns.

- Subsequently, investigate further to understand the reasons for these changes and take necessary steps,
e.g., increase/decrease the efficiency of the application and enhance/reduce user experience features that results in
users spending more/less time on the application.


### Detailed View

![Detail View]({{base_path}}/assets/img/elk-analytics/session-dashboard/elk-session-dashboard-6.png){: style="display: block; margin: 0;"}

This widget presents details of each session including,

- Username of the user who carried out the session
- Session start time
- Session end time, i.e., the time the session actually terminated, due to logout event or forceful termination
- Session termination time, i.e., the time the session is supposed to terminate
- Duration of the session
- Whether the session is currently active or not
- User store domain
- IP address of the server
- Tenant domain
- Whether the remember me flag is set or not
- Timestamp

**Purpose**: View the details of each individual session.

