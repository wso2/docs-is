# Access the ELK Analytics Dashboard

Once you have [setup ELK analytics dashboards]({{base_path}}/deploy/elk-analytics-installation-guide), follow the guide below to learn how to access the analytics dashboard.

1.  Access Kibana using the following URL:
    http://<KIBANA\_HOST\>:5601

    ![]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-1.png) 

2.  You can login to Kibana with the default `elastic` user or refer to the elastic [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/users-command.html) and learn how to create a new user.

3.  On the left panel, navigate to **Analytics** > **Dashboard** and click on **Auth Dashboard**.  
    ![]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-2.png) 

    <!-- Use the navigation panel to explore other dashboards and Kibana features. -->

    <!-- ![]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-3.png)  -->

4.  Use the filter to set the time range in which to view the statistics and click **Update**.

    ![]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-5.png) 

5.  To synchronize analytics automatically:
    1. Click the calendar icon in the time range filter.
    2. Toggle **Refresh every** at the bottom of the dropdown.
    3. Set your desired time interval.

        ![]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-6.png)

6. You can use the following filters to narrow down your analytics further.

    ![]({{base_path}}/assets/img/elk-analytics/accessing-analytics-dashboard/accessing-analytics-dashboard-7.png)


## What's Next?

Explore the following topics:

   -   [Analyze Login Attempts]({{base_path}}/guides/elk-analytics/elk-analyzing-login-attempts)
   -   [Analyze Session Statistics]({{base_path}}/guides/elk-analytics/elk-analyzing-session-statistics)