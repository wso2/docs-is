# Organization Insights

!!! note
    The feature is in the <Badge text="Beta " type="warn" color="#2ab1da" vertical="middle" /> stage. We are working on adding more capabilities for this feature.

{{ product_name }} allows administrators and organization owners to view the insights of the organizations they manage.

You can view insights into the unique logins, the total successful logins, and the failed login attempts within the specified period. These user login stats are obtained from login attempts for user applications, My Account portal, and {{ product_name }} Console.

{{ product_name }} provides insights up to the last 30 days.

!!! note
    Note that the statistics displayed in the graphs are not real-time. There is a maximum latency of 20 minutes between the actual user activity and the information presented. This slight delay ensures accurate data processing and allows for a comprehensive analysis of user logins and login trends.

To check your organization's insight:

1. On the {{ product_name }} Console, scroll down and go to **Insights** on the left panel.
2. Select the period from the list.
    ![Select the period for the insights to be displayed](../assets/img/guides/organization-insights/insight-period.png)

You will see the active users and the total logins within the specified period.

## User engagement metrics
This section of the guide helps you further understand the statistics shown on the graphs.

### Active Users
This graph represents the number of unique user logins within the selected duration. You can view each day's count by hovering your mouse over a point on the graph. This metric helps measure the daily engagement of users with the platform.
![Unique active users](../assets/img/guides/organization-insights/active-users-graph.png)

### Total Logins
This graph represents the total number of user logins within the selected duration. By hovering your mouse over a point on the graph, you can view the specific count of successful user logins for each day.
![Total user logins](../assets/img/guides/organization-insights/total-logins-graph.png)

### Failed Logins
This graph represents the total number of failed logins within the selected duration. You can view each day's failed login attempt count by hovering your mouse over a point on the graph.
![Failed login attempts](../assets/img/guides/organization-insights/failed-logins-graph.png)

!!! note
    Note that the graph does not include the failed login attempts made by administrators and collaborators to the {{ product_name }} Console and the My Account portal.