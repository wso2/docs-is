# Analyze Login Attempts

You can view and analyze statistics related to login attempts made via the WSO2 Identity Server from the Auth Dashboard. Learn how to [configure the Auth Dashboard]({{base_path}}/deploy/elk-analytics-installation-guide)

Auth Dashboard displays analytics for resident and federated authentication scenarios and statistics of overall authentication activities carried out by the WSO2 Identity Server.

You can use the **Auth Type** filter to view analytics based on authentication type.

![Auth Type]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-7.png){: width="400" style="display: block; margin: 0;"}

## Analyze Overall Login Attempts

The **Overall** Auth Type displays statistics related to overall authentication
activities carried out by the WSO2 Identity Server.

An overall authentication attempt encompasses a sequence of authentication steps.

In order for an overall authentication attempt to be marked successful, all its constituent steps should be successful. A failure of even a single step causes the overall authentication attempt to be marked a failure.

## Analyze Local Login Attempts

The **Local** Auth Type displays statistics related to local authentication, i.e an authentication attempt carried out via a local identity provider.

An authentication sequence with a local identity provider is considered a single local authentication
attempt regardless of the number of steps carried out.

In order for a local authentication attempt to be marked successful, all the constituent steps with the local identity provider should be successful. A failure of a single authentication step is marked as a separate
local authentication failure.

## Analyze Federated Login Attempts

**Federated** Auth Type displays statistics related to federated authentication, i.e an authentication attempt carried out via a federated identity provider.

A fedrated authentication attempt encompasses a single federated step. If there are multiple constituent steps, each federated authentication step is considered separately.

A failed federated authentication attempt is marked a failure only if a failed response is received from a federated identity provider.

There can be instances where a federated identity provider will not send the response back. Such an attempt is not marked a failure as the flow breaks in the middle.


## Auth Dashboard Widgets

You can leverage several widgets that Kibana offers to analyze authentication activities carried out in the WSO2 Identity Server.

### Login attempts over time

![Login Attempts Over Time]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-3.png){: width="600" style="display: block; margin: 0;"}

This chart presents the total number of login attempts that are made during the selected time interval.

**Purpose**: Derive login patterns and detect deviations due to unusual occurrences such as attacks, system downtime, etc.

### Compact Summary of Login Attempts

![Compact Summary of Login Attempts]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-2.png){: width="600" style="display: block; margin: 0;"}

This chart presents a summary of the login attempts.

**Purpose**: Identify the percentages of successful and failed logins.


### Map View of Login Attempts

![Map View of Login Attempts]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-1.png){: width="600" style="display: block; margin: 0;"}

This chart presents the login attempts in a map view based on the IP addresses.

**Purpose**: <br />

- View countries from which logins are attempted. <br />
- Determine the number of login attempts from the cluster size.

### Details Of Login Attempts By Service Provider

![Details Of Login Attempts By Service Provider]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-6.png){: width="600" style="display: block; margin: 0;"}


- This chart presents the successful and failed login attempts sorted by service provider.
- Pagination is available if the statistics involve more than ten service providers.

**Purpose**: View login attempts based on the service provider.

### Details Of Login Attempts By User

![Details Of Login Attempts By User]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-5.png){: width="600" style="display: block; margin: 0;"}

- This chart presents the successful and failed login attempts sorted by users.
- Pagination is available if the statistics involve more than ten users.

**Purpose**: View login attempts based on the username.

### Full Details Of Each Login Attempt

![Details Of Login Attempts By User]({{base_path}}/assets/img/elk-analytics/auth-dashboard/elk-auth-dashboard-4.png){: width="600" style="display: block; margin: 0;"}

- This widget presents details of each login attempt including the context ID, username, service provider, subject
  step, roles, tenant domain, IP, region, whether the overall authentication was successful or not, and the time stamp.
- The login attempts can be sorted in the ascending/descending order by the fields in the table if required.

**Purpose**: View details of each login attempt.

