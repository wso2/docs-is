# Analyzing the Local Login Attempts

The **Local Login Attempts** statistical visualization displays
statistics relating to local authentication.

A local authentication is an authentication activity that is carried out
via a local identity provider.

An authentication sequence with a local identity provider involvement is
considered as a **single local authentication attempt** regardless of
the number of steps carried out by the local identity provider. In order
for a local authentication to be considered as successful, all the
constituent authentication steps carried out by the local identity
provider should be successful. However, failure of a single
authentication step is considered as a separate local authentication
failure.

The statistics displayed in this page include all thelocal
login attempts that are performed via local identity providers over time
as well as the local login attempts filtered based on service providers,
user stores, user roles, and users

Follow the steps below to view the **Local Login Attempts**.

!!! tip
    
    **Before you begin**
    
    1.  Access the WSO2 IS Analytics Dashboard. For more information, see
        [Accessing the Analytics
        Dashboard](Accessing_the_Analytics_Dashboard).
    2.  Perform either of the following.
        1.  Click **SEE MORE** in the **Local Login Attempts Summary** tile.
        2.  Click **menu** icon \> **Local**.
    

Let's analyze the local login attempts with the following widgets.

##### **Description**

This chart presents the **total number of local login attempts** that
are made during the selected time interval.

##### **Purpose**

This chart allows deriving **the local login patterns and detect
deviations** that may due to unusual occurrences such as attacks, system
downtime, etc.

![]( ../../assets/img/103329237/103329248.png) 

##### Description

This chart presents a **summary of the local login attempts**.

##### Purpose

This chart allows identifying the percentages of the successful and
failed local login attempts.

![]( ../../assets/img/103329237/103329246.png) 

##### Description

This chart presents the local login attempts in a map view based on the
IP addresses.

!!! note
    
    In order for this widget to work, configure the gel location database.
    For more information, see [Enabling Geolocation Based
    Statistics](Enabling_Geolocation_Based_Statistics).
    

##### Purpose

-   This chart allows viewing the countries from which the local logins
    were attempted.
-   The **color intensity** indicates the number of login attempts,
    e.g., an area in darker green indicates more login attempts when
    compared to an area in lighter green.
-   The **toggle key** helps to switch from the success view and failure
    view.

![]( ../../assets/img/103329237/103329238.png) 

##### Description

-   This chart presents the successful and failed local login attempts
    sorted by service provider.
-   Pagination is available if the statistics involve more than ten
    service providers.

##### Purpose

This chart allows viewing the local login attempts sorted based on the
service providers.

![]( ../../assets/img/103329237/103329244.png) 

##### Description

-   This chart presents the successful and failed login attempts sorted
    by user store domain.
-   Pagination is available if the statistics involve more than ten user
    store domains.

##### Purpose

This chart allows viewing the local login attempts sorted based on the
user store domain.

![]( ../../assets/img/103329237/103329243.png) 

##### Description

-   This chart presents the successful and failed login attempts sorted
    by user role.
-   Pagination is available if the statistics involve more than ten user
    roles.

##### Purpose

This chart allows viewing the local login attempts sorted based on the
user role.

![]( ../../assets/img/103329237/103329242.png) 

##### Description

-   This chart presents the successful and failed login attempts sorted
    by user name.
-   Pagination is available if the statistics involve more than ten user
    names.

##### Purpose

This chart allows viewing the local login attempts sorted based on the
user names.

![]( ../../assets/img/103329237/103329241.png) 

##### Description

-   This widget presents details of each local login attempt including
    the context ID, user name, service provider, subject step, roles,
    tenant domain, IP, region, whether the local authentication was
    successful or not, and the time stamp.
-   The login attempts can be sorted in the ascending/descending order
    by the fields in the table if required.

##### Purpose

This widget allows view the details of each local login attempt.
