# Analyzing Overall Login Attempts

The **Overall Login Attempts** statistical visualization displays
statistics relating to overall authentication activities carried out by
WSO2 Identity Server.

An overall authentication encompasses a sequence of authentication
steps. In order for an overall authentication to be considered as
successful, all its constituent steps shoudl be successful. A failure of
even a single step within the sequence causes the overall authentication
to be marked as a failure.

The statistics displayed in this page include:

-   The overall success and failure rate for login attempts over time
-   The login attempts filtered based on service providers and users

Follow the steps below to view the **Overall** statistical
visualization.

!!! tip
    
    **Before you begin**
    
    1.  Access the WSO2 IS Analytics Dashboard. For more information, see
        [Accessing the Analytics
        Dashboard](_Accessing_the_Analytics_Dashboard_).
    2.  Perform either of the following.
        1.  Click **SEE MORE** in the **Overall Login Attempts Summary**
            tile.
        2.  Click **menu** icon \> **Overall**.
    

Let's analyze the overall authentication activities with the following
widgets.

##### **Description**

This chart presents the **total number of login attempts** that are made
during the selected time interval.

##### **Purpose**

This chart allows deriving **the login patterns and detect deviations**
that may due to unusual occurrences such as attacks, system downtime,
etc.

![](attachments/103329291/103329299.png){width="700"}

  

  

##### Description

This chart presents a **summary of the overall login attempts**.

##### Purpose

This chart allows identifying the percentages of the successful and
failed login attempts.

![](attachments/103329291/103329302.png){width="350"}

##### Description

This chart presents the login attempts in a map view based on the IP
addresses.

  

!!! note
    
    In order for this widget to work, configure the gel location database.
    For more information, see [Enabling Geolocation Based
    Statistics](_Enabling_Geolocation_Based_Statistics_).
    

##### Purpose

-   This chart allows viewing the countries from which the logins were
    attempted.
-   The **color intensity** indicates the number of login attempts,
    e.g., an area in darker green indicates more login attempts when
    compared to an area in lighter green.
-   The **toggle key** helps to switch from the success view and failure
    view.

![](attachments/103329291/103329292.png){width="1000"}

##### Description

-   This chart presents the successful and failed login attempts sorted
    by service provider.
-   Pagination is available if the statistics involve more than ten
    service providers.

##### Purpose

This chart allows viewing the login attempts sorted based on the service
providers.

![](attachments/103329291/103329297.png){width="800"}

  

  

##### Description

-   This chart presents the successful and failed login attempts sorted
    by users.
-   Pagination is available if the statistics involve more than ten
    users.

##### Purpose

This chart allows viewing the login attempts sorted based on the user
names.

![](attachments/103329291/103329296.png){width="800"}

  

  

##### Description

-   This widget presents details of each login attempt including the
    context ID, user name, service provider, subject step, roles, tenant
    domain, IP, region, whether the overall authentication was
    successful or not, and the time stamp.
-   The login attempts can be sorted in the ascending/descending order
    by the fields in the table if required.

##### Purpose

This widget allows view the details of each login attempt.

  
![](attachments/103329291/103329294.png){width="1200"}
