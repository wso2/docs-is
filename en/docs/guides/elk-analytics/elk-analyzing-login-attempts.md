# Analyze Login Attempts

Auth Dashboard presents statistics related to authentication activities. You can view and analyze statistics
related to login attempts made via WSO2 Identity Server.

Auth Dashboard displays authentication related analytics for residence and federated authentication scenarios and
statistics of overall authentication activities carried out by WSO2 Identity Server.

You can view all these authentication types in the Auth Dashboard. You can use the **Auth Type filter** to view the
relevant
authentication statistics summaries.

## Analyzing Overall Login Attempts

The **Overall Login Attempts** statistical visualization displays statistics relating to overall authentication
activities carried out by WSO2 Identity Server.

An overall authentication encompasses a sequence of authentication steps. In order for an overall authentication to be
considered as successful, all its constituent steps should be successful. A failure of even a single step within the
sequence causes the overall authentication to be marked as a failure.

## Analyzing the Local Login Attempts

The **Local Login Attempts** statistical visualization displays statistics relating to local authentication.

A local authentication is an authentication activity that is carried out via a local identity provider.

An authentication sequence with a local identity provider involvement is considered as a **single local authentication
attempt** regardless of the number of steps carried out by the local identity provider. In order for a local
authentication to be considered as successful, all the constituent authentication steps carried out by the local
identity provider should be successful. However, failure of a single authentication step is considered as a separate
local authentication failure.

## Analyzing the Federated Login Attempts

The **Federated Login Attempts** statistical visualization displays statistics relating to federated authentication.

A federated authentication is an authentication activity that is carried out via a federated identity provider.

The successful authentication attempt for a single federated step is considered a federated authentication success.
Similarly, a failed authentication attempt for a single federated step is considered a federated authentication failure.

If there are multiple constituent steps, each federated authentication step is considered separately. A failed federated
authentication attempt is counted as a failure only if a failed response is received from a federated identity provider.
There can be situation where a federated identity provider will not send the response back. Such are not counted as
authentication failure as the flow was broken in the middle.

**Let's analyze the authentication activities with the following widgets.**

## Login Attempts Over Time

### **Description**

This chart presents the **total number of login attempts** that are made
during the selected time interval.

### **Purpose**

This chart allows deriving **the login patterns and detect deviations** that may due to unusual occurrences such as
attacks,
system downtime, etc.

<img src="../../assets/img/learn/elk-analytics/auth-dashboard/elk-auth-dashboard-3.png" alt="Login Attempts Over Time" width="500">

## Compact Summary of Login Attempts

### **Description**

This chart presents a **summary of the login attempts.**

### **Purpose**

This chart allows identifying the percentages of the successful and failed login attempts.

<img src="../../assets/img/learn/elk-analytics/auth-dashboard/elk-auth-dashboard-2.png" alt="Compact Summary of Login Attempts" width="500">

## Map View of Login Attempts

### **Description**

This chart presents the login attempts in a map view based on the IP addresses.

### **Purpose**

* This chart allows viewing the countries from which the logins were attempted.
* The **cluster size** indicates the number of login attempts,

<img src="../../assets/img/learn/elk-analytics/auth-dashboard/elk-auth-dashboard-1.png" alt="Map View of Login Attempts" width="500">

## Details Of Login Attempts By Service Provider

### **Description**

- This chart presents the successful and failed login attempts sorted by service provider.
- Pagination is available if the statistics involve more than ten service providers.

### **Purpose**

This chart allows viewing the login attempts sorted based on the service providers.

<img src="../../assets/img/learn/elk-analytics/auth-dashboard/elk-auth-dashboard-6.png" alt="Details Of Login Attempts By Service Provider" width="500">

## Details Of Login Attempts By User

### **Description**

- This chart presents the successful and failed login attempts sorted by users.
- Pagination is available if the statistics involve more than ten users.

### **Purpose**

This chart allows viewing the login attempts sorted based on the user names.

<img src="../../assets/img/learn/elk-analytics/auth-dashboard/elk-auth-dashboard-5.png" alt="Details Of Login Attempts By User" width="500">

## Full Details Of Each Login Attempt

### **Description**

- This widget presents details of each login attempt including the context ID, user name, service provider, subject
  step, roles, tenant domain, IP, region, whether the overall authentication was successful or not, and the time stamp.
- The login attempts can be sorted in the ascending/descending order by the fields in the table if required.

### **Purpose**

This widget allows viewing the details of each login attempt.

<img src="../../../assets/img/learn/elk-analytics/auth-dashboard/elk-auth-dashboard-4.png" alt="Details Of Login Attempts By User" width="500">