# Configuring Alerts

Let's configure alerts in WSO2 Identity Server.

### Suspicious Login Alerts

Follow the steps below to configure suspicious alerts.

1.  Open the
    `            <IS_ANALTICS_HOME>/wso2/worker/deployment/siddhi-files/IS_ANALYTICS_SUSPICIOUS_LOGIN.siddhi           `
    file.
2.  Update the
    **`              <<NO OF FAILURE ATTEMPTS>>             `**
    considered to identify a suspicious login as given below.

    ``` java
    -- Detecting events from same user. An alert is generated when we make more than five failure login attempts followed by a success
    from every
            (e1=OverallAuthenticationStream[
                authStepSuccess == false]) ->
            e2=OverallAuthenticationStream[
                authStepSuccess == false AND
                e1.username == e2.username AND
                e1.userStoreDomain == e2.userStoreDomain AND
                e1.tenantDomain == e2.tenantDomain]<<<NO OF FAILURE ATTEMPTS, e.g., 4>>:>  ->
            e3=OverallAuthenticationStream[
                authStepSuccess == true AND
                e2.username == e3.username AND
                e2.userStoreDomain == e3.userStoreDomain AND
                e2.tenantDomain == e3.tenantDomain]
    within 5 min
    select  e2[last].meta_tenantId,
            e2[last].username,
            1 as severity,
            str:concat('Successful login attempt after multiple login failures with same username detected at: ', time:dateFormat(e3[last]._timestamp,'yyyy-MM-dd HH:mm:ss'), '.') as msg,
            e2[last].tenantDomain,
            e3[last]._timestamp as timestamp,
            e2[last].serviceProvider
    group by
            e1.username,
            e1.userStoreDomain,
            e1.tenantDomain
    output first every 1 min
    insert into LoginAlertStreamSameUsername;
    ```

### Long Sessions

Follow the steps below to configure long session alerts.

1.  Open the
    `            <IS_ANALTICS_HOME>/wso2/worker/deployment/siddhi-files/IS_ANALYTICS_LONG_SESSION.siddhi           `
    file.
2.  Update the respective parameters.

    1.  `                               <<SESSION DURATION>                              >              `
        : An alert is triggered if the duration of a user session
        exceeds the number of milliseconds specified in this parameter.

        ``` java
                from        PeriodicalTriggerStream as P join SessionInformationTable as S
                on          S.duration > <<SESSION DURATION, e.g., 900000>> and
                            S.rememberMeFlag == false and
                            S.isActive == true
                select      meta_tenantId,
                            sessionId,
                            startTimestamp,
                            renewTimestamp,
                            terminationTimestamp,
                            endTimestamp,
                            duration,
                            username,
                            userstoreDomain,
                            tenantDomain,
                            timestamp
                insert into FilterLongSessionsStreams;
        ```

    2.  **`                <<AVERAGE SESSION DURATION PARAMETER>>               `**
        : An alert is triggered if the duration of a user session
        exceeds the average session duration, and if the difference
        exceeds the percentage specified in this parameter.

        ``` java
                from        FilterLongSessionsStreams as s join AverageSession as t
                on          s.meta_tenantId == t.meta_tenantId and
                            s.tenantDomain == t.tenantDomain and
                            s.username == t.username and
                            s.userstoreDomain == t.userstoreDomain and
                            (s.duration > t.avgDuration * (<<AVERAGE SESSION DURATION PARAMETER, e.g., 50.0>> + 100.0) / 100.0)
                select      s.timestamp,
                            s.meta_tenantId,
                            s.tenantDomain,
                            s.sessionId,
                            s.username,
                            s.duration,
                            t.avgDuration
                insert into AlertLongSessionsStreamTemp;
        
        
        ```

    3.  **`                <<NO OF DAYS>>               `** : This
        parameter defines the number of days to be considered when
        calculating the average session duration. For example, if this
        parameter is set to `               7              `, the
        average session duration is calculated based on the duration of
        all the sessions that occurred during the last 7 days before the
        current session.
        `               TriggerStreamAtDeployment              ` and
        `               TriggerEveryThirtyMinutesStream              `
        are used to calculate the average session duration during the
        last 7 days at the deployment and for every 30 minutes
        respectively.

        ``` java
                from TriggerStreamAtDeployment
                select convert(time:dateSub(triggered_time,<<NO OF DAYS, e.g.,7>>,'DAY'), 'long') as lastSeventimestamp
                insert into LastSevenDaysStream;
        
                from TriggerEveryThirtyMinutesStream
                select convert(time:dateSub(triggered_time,<<NO OF DAYS, e.g.,7>>,'DAY'), 'long') as lastSeventimestamp
                insert into LastSevenDaysStream;
        ```
