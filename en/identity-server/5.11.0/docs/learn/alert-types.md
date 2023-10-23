# Alert Types

By default WSO2 IS is capable of triggering alerts for the following
situations.

### Suspicious Login

-   **Reason for Triggering** : A successful login after a particular
    number of failed login attempts during a given time interval.
-   **Indication** : A sudden change in the level of access granted to a
    specific user Id that indicates the need for further investigation.
-   **Alerting Logic** : An alert is sent if a user successfully logs in
    after a specific number of failures. These failures can be due
    repeatedly entering the following:
    -   Same incorrect username

    -   Same incorrect user store

    -   Same incorrect tenant domain

### Long Sessions


-   **Reason for Triggering** : The session duration of a specific user
    exceeds a predefined time duration.
-   **Indication** : The user is engaged in unauthorized activity.
-   **Alerting Logic** : An alert is sent if,
    -   The duration of a session exceeds the predefined session
        duration

    -   The duration of a session exceeds the average session duration
        calculated for a predefined time interval. This time interval is
        specified as the last n days, e.g., last 7 days.
