# Organization Insights

!!! note
    The feature is in the **Beta** stage. We are working on adding more capabilities for this feature.

{{ product_name }} allows administrators and organization owners to view insights of the organizations they manage.

To check insights of your organization:

1. On the {{ product_name }} Console, go to **Insights**.

2. Select one of the following activities to see insights related to it.

    - **Login** - displays insights related to successful and failed user logins made to business applications and the My Account portal.
    - **Registration** - displays insights related to user registrations via self sign-up and admin-initiated registration methods.

3. Use the dropdown in the top right corner to adjust the duration.

    !!! note
        {{ product_name }} provides insights for up to a maximum of 30 days.

The example below shows insights related to login events of the organization for the past 7 days.

![Select the period for the insights to be displayed]({{base_path}}/assets/img/guides/organization-insights/insight-period.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    The statistics displayed in the graphs are not real-time. </br></br>

    Why? </br>
    There is a latency of up to 20 minutes between the user activity and insights. This delay ensures accurate data processing and allows for a more comprehensive analysis of user logins and login trends.


## User engagement metrics
This section will help you further understand the statistics shown in the graphs.

### Active Users
This graph in login insights, represents the number of unique user logins within the selected duration. You can view each day's count by hovering your mouse over a point on the graph. This metric helps measure the daily engagement of users with the platform.

![Unique active users]({{base_path}}/assets/img/guides/organization-insights/active-users-graph.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Total Logins
This graph in login insights, represents the total number of successful user logins within the selected duration. By hovering your mouse over a point on the graph, you can view the specific count of user logins for each day.

![Total user logins]({{base_path}}/assets/img/guides/organization-insights/total-logins-graph.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Failed Logins
This graph in login insights, represents the total number of failed logins within the selected duration. You can view each day's failed login attempt count by hovering your mouse over a point on the graph.

![Failed login attempts]({{base_path}}/assets/img/guides/organization-insights/failed-logins-graph.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    The graph does not include data related to failed login attempts made by the organization owner or administrators to either the {{ product_name }} Console or the My Account portal.

### User Signups
This graph in registration insights, represents the total number of successful user signups within the selected duration. You can view each day's signup count by hovering your mouse over a point on the graph.

![User signups graph]({{base_path}}/assets/img/guides/organization-insights/user-signups-graph.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Filter insights

You can use filters to further narrow down insights related to login and registration activities.

To filter insights,

1. On the {{ product_name }} Console, go to **Insights**, and select an activity (Login or Registration).

2. Click the filter icon and use the following fields to filter insights .

    <table>
      <tr>
        <td>Filter attribute</td>
        <td> The attribute for which to filter insights.</td>
      </tr>
      <tr>
        <td>Filter condition</td>
        <td>The logical operator that must be satisfied between the filter attribute and the filter value.</br>
        (Currently, this is set to <b>Equals</b>)</td>
      </tr>
      <tr>
        <td>Filter value</td>
        <td>Value of the filter attribute.</td>
      </tr>
    </table>

    !!! note
        All filter values are case sensitive.

    ![Filter insights related to logins]({{base_path}}/assets/img/guides/organization-insights/filter-login-insights.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

  The table below has detailed information on all the filtering options available for insights of your organization.

  <table>
    <thead>
    <th>User activity</th>
    <th>Filter attribute</th>
    <th>Description</th>
    </thead>
        <tr>
          <td rowspan="5">Login</td>
          <td>Application</td>
          <td>Filter logins based on the name of an application in your organization.</br></br>
            Examples for applications: <code>My Account</code></td>
        </tr>
        <tr>
          <td>User ID</td>
          <td>Filter logins based on the user ID found in a user's profile.</br></br>
          Example for a user ID: <code>1450ea7f-88db-49c2-b750-065e219a1fba</code>
          </td>
        </tr>
        <tr>
          <td>User store</td>
          <td>Filter logins based on the domain name of a user store in your organization.</br></br>
          Examples for user stores: <code>PRIMARY</code>, <code>DEFAULT</code>
          </td>
        </tr>
        <tr>
          <td>Connection Type</td>
          <td>Filter logins based on the method of user login.</br></br>
          For example, you can select <code>Google</code> to filter insights for users who logged in with Google.
          </td>
        </tr>
        <tr>
          <td>Connection ID</td>
          <td>Filter logins based on the UUID of the connection used for login.<br></br>
            (You can find the UUID of a connection from the URL that appears when you select the connection from the Connections section on the Asgardeo Console.)</br></br>
            For example, if you have multiple Google connections configured, you can filter based on one of them by entering its UUID.
            </br>
            </td>
        </tr>
        <tr>
          <td rowspan="2">Registration</td>
          <td>Onboarding Method</td>
          <td>Filter registrations based on the method of user onboarding.</br></br>
          Select,
           <ul>
              <li>By administrator - to filter registrations initiated and completed by an administrator.</li>
              <li>Email invitation - to filter registrations initiated by an administrator but completed by the user by accepting an email invite.</li>
              <li>Self-registration - to filter registrations initiated and completed by a user via self-signup.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>User ID</td>
          <td>Filter registrations based on the user ID found in a user's profile.</br></br>
          Example for a user ID: <code>1450ea7f-88db-49c2-b750-065e219a1fba</code>
          </td>
        </tr>
  </table>