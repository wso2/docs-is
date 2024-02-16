# Access the ELK Analytics Dashboard

Once you have [setup ELK analytics dashboards]({{base_path}}/deploy/elk-analytics-installation-guide), follow the guide below to learn how to access the analytics dashboard.

1. Access Kibana using the following URL:
    <code>http://{KIBANA_HOST}:5601</code>

    ![Kibana login]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-1.png){: width="600" style="display: block; margin: 0;"}

2. You can login to Kibana with the default `elastic` user or refer to the [elastic documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/users-command.html) and learn how to create a new user.

3. On the left panel, navigate to **Analytics** > **Dashboard** and click on **Auth Dashboard**.

    ![Kibana dashboard]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-2.png){: width="600" style="display: block; margin: 0;"}

4. Use the filter to set the time range in which to view the statistics and click **Update**.

    ![filter auth dashboard]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-5.png){: width="600" style="display: block; margin: 0;"}

5. To synchronize analytics automatically:
    1. Click the calendar icon in the time range filter.
    2. Toggle **Refresh every** at the bottom of the dropdown.
    3. Set your desired time interval.

        ![synchronize alerts periodically]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-6.png){: width="600" style="display: block; margin: 0;"}

6. You can use the following filters to narrow down your analytics further.

    ![narrow the search using filters]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-7.png){: style="display: block; margin: 0;"}


## What's Next?

Explore the following topics:

- [Analyze Login Attempts]({{base_path}}/guides/analytics/analyzing-login-attempts/)
- [Analyze Session Statistics]({{base_path}}/guides/analytics/analyzing-active-sessions/)