# Monitoring Logs

Logging is one of the most important aspects of a production-grade
server. A properly configured logging system is vital for identifying
errors, security threats, and usage patterns.
 

### Log types

Following are the various log types that are used in WSO2 Identity Server—separate log files are created for each of those log types in
the `          <IS_HOME>/repository/logs         ` directory.

-   **Carbon logs**: WSO2 Identity Server is shipped with log4j2 logging
    capabilities that generate administrative activities and server-side
    logs. The Carbon log ( `           wso2carbon.log          ` ) is a
    log file that covers all the management features of a product.
    Carbon logs are configured in t he
    `           log4j2.properties          ` file (stored in the
    `           <IS_HOME>/repository/conf          ` directory).

    !!! info "Java logging and Log4j integration" 
        In addition to the logs from libraries that use Log4j, all logs from libraries such as,
        Tomcat and Hazelcast that use Java logging framework are also
        visible in the same log files. That is, when Java logging is enabled
        in Carbon, only the Log4j appenders will write to the log files. If
        the Java Logging Handlers have logs, these logs will be delegated to
        the log events of the corresponding Log4j appenders. A Pub/Sub
        registry pattern implementation has been used in the latter
        mentioned scenario to plug the handlers and appenders. The following
        default log4j2 appenders in the
        `            log4j2.properties           ` file are used for this
        implementation:

        -   `             org.wso2.carbon.logging.appenders.CarbonConsoleAppender            `
        -   `             org.wso2.carbon.logging.appenders.CarbonDailyRollingFileAppender            `

-   **Audit logs:** Audit logs are used for tracking the sequence of
    actions that affect a particular task carried out on the server.
    These are also configured in t he
    `          log4j2.properties         ` file.
-   **HTTP access logs:** HTTP requests/responses are logged in access
    logs to monitor the activities related to an application's usage.
    These logs are configured in the
    `          deployment.toml         ` file in the `<IS_HOME>/repository/conf`
    directory).
-   **Patch logs:** These logs contain details related to patches
    applied to the product. Patch logs cannot be customized. See [WSO2
    Patch Application Process](../../administer/wso2-patch-application-process) for
    more information.

!!! note  
    WSO2 Identity Server generates other log 
    files in addition to the Carbon logs, Audit logs, HTTP access logs,
    Patch logs, and Service/Event logs. For more information, see [Moniotring the Identity Server](../../administer/monitoring-the-identity-server).

### Configuring WSO2 Identity Server for log monitoring

See the following information on configuring **Carbon logs**, **Audit
logs,** **HTTP access logs**, and **Service/Event logs** for WSO2 Identity Server.

#### Configuring Carbon logs 
You can easily configure Carbon logs using the WSO2 Identity Server Management Console or you can manually edit the
`           log4j2.properties          ` file. 


!!! tip
    It is recommended to
    use the management console to configure logging because all changes
    made to log4j2 through the management console persists in the WSO2
    Registry. Therefore, those changes will be available after the
    server restarts and will get priority over what is defined in
    the log4j2.properties file. 

!!! note 
    - Logging configuration you define using the Management Console will apply at run time.
    - If you modify the `           log4j2.properties          `
    file and restart the server, the earlier log4j2 configuration that
    persisted in the registry will be overwritten. 
    - There is also an
    option in the Management Console to restore the original log4j2
    configuration from the `           log4j.properties          ` file.
    The log levels that can be configured are [listed
    below](#setting-the-log4j-log-level).

#### Configuring Audit logs

Audit logs are enabled in WSO2 Identity Server by default. You can change
the following default configuration by manually updating the the
`           log4j2.properties          ` file. The log levels that
can be configured are [listed below](#MonitoringLogs-log4j-levels).


```java
appenders = CARBON_CONSOLE, CARBON_LOGFILE, AUDIT_LOGFILE, ATOMIKOS_LOGFILE, CARBON_TRACE_LOGFILE, DELETE_EVENT_LOGFILE, TRANSACTION_LOGFILE, osgi 

# Appender config to AUDIT_LOGFILE
appender.AUDIT_LOGFILE.type = RollingFile
appender.AUDIT_LOGFILE.name = AUDIT_LOGFILE
appender.AUDIT_LOGFILE.fileName = ${sys:carbon.home}/repository/logs/audit.log
appender.AUDIT_LOGFILE.filePattern = ${sys:carbon.home}/repository/logs/audit-%d{MM-dd-yyyy}.log
appender.AUDIT_LOGFILE.layout.type = PatternLayout
appender.AUDIT_LOGFILE.layout.pattern = TID: [%tenantId] [%d] [%X{Correlation-ID}] %5p {%c} - %mm%ex%n
appender.AUDIT_LOGFILE.policies.type = Policies
appender.AUDIT_LOGFILE.policies.time.type = TimeBasedTriggeringPolicy
appender.AUDIT_LOGFILE.policies.time.interval = 1
appender.AUDIT_LOGFILE.policies.time.modulate = true
appender.AUDIT_LOGFILE.policies.size.type = SizeBasedTriggeringPolicy
appender.AUDIT_LOGFILE.policies.size.size=10MB
appender.AUDIT_LOGFILE.strategy.type = DefaultRolloverStrategy
appender.AUDIT_LOGFILE.strategy.max = 20
appender.AUDIT_LOGFILE.filter.threshold.type = ThresholdFilter
appender.AUDIT_LOGFILE.filter.threshold.level = INFO
```

#### Configuring HTTP access logs

See [HTTP Access Logging](../../administer/http-access-logging) for instructions on
how to configure and use HTTP access logs.

#### Setting the Log4j log level

The log level can be set specifically for each appender in the
`         log4j.properties        ` file by setting the threshold value.
If a log level is not specifically given for an appender as explained
below, the root log level (INFO) will apply to all appenders by default.


!!! example  

    Following is how the log level is set to `DEBUG` for the `CARBON_LOGFILE` appender ([Carbon log](#configuring-carbon-logs)): 
    ``` java
    appender.CARBON_LOGFILE.filter.threshold.level = DEBUG
    ```

Following are the log levels that can be configured:

  

| Level | Description                                                                                                                                                                                                                                                                     |
|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OFF   | The highest possible log level. This is intended for disabling logging.                                                                                                                                                                                                         |
| FATAL | Indicates server errors that cause premature termination. These logs are expected to be immediately visible on the command line that you used for starting the server.                                                                                                          |
| ERROR | Indicates other runtime errors or unexpected conditions. These logs are expected to be immediately visible on the command line that you used for starting the server.                                                                                                           |
| WARN  | Indicates the use of deprecated APIs, poor use of API, possible errors, and other runtime situations that are undesirable or unexpected but not necessarily wrong. These logs are expected to be immediately visible on the command line that you used for starting the server. |
| INFO  | Indicates important runtime events, such as server startup/shutdown. These logs are expected to be immediately visible on the command line that you used for starting the server . It is recommended to keep these logs to a minimum.                                           |
| DEBUG | Provides detailed information on the flow through the system. This information is expected to be written to logs only. Generally, most lines logged by your application should be written as DEBUG logs.                                                                        |
| TRACE | Provides additional details on the behavior of events and services. This information is expected to be written to logs only.                                                                                                                                                    |


### Managing log growth

See the following content on managing the growth of **Carbon logs** and
**Audit logs** :

#### Managing the growth of Carbon logs

Log growth in ([Carbon logs](#configuring-carbon-logs) ) can be
managed by the following configurations in the
`         <IS_HOME>/repository/conf/log4j2.properties        ` file.

-   Configurable log rotation: By default, log rotation is on a daily
    basis.
-   Log rotation based on time as opposed to size: This helps to inspect
    the events that occurred during a specific time.
-   Log files are archived to maximise the use of space.

The log4j-based logging mechanism uses appenders to
append all the log messages into a file. That is, at the end of the log
rotation period, a new file will be created with the appended logs and
archived. The name of the archived log file will always contain the date
on which the file is archived.

#### Limiting the size of Carbon log files

You can limit the size of the
`         <IS_HOME>/repository/logs/wso2carbon.log        `
file by following the steps given below. This is useful if you want to
archive the logs and get backups periodically.

1.  Change the
    `           log4j.appender.CARBON_LOGFILE=org.wso2.carbon.utils.logging.appenders.CarbonDailyRollingFileAppender          `
    appender in the
    `           <PRODUCT_HOME>/repository/conf/          `
    `           log4j.properties          ` file as follows:

    ``` java
    log4j.appender.CARBON_LOGFILE=org.apache.log4j.RollingFileAppender
    ```

2.  Add the following two properties under
    `           RollingFileAppender          `

    -   `             log4j.appender.CARBON_LOGFILE.MaxFileSize=10MB            `

    -   `            log4j.appender.CARBON_LOGFILE.MaxBackupIndex=20           `

    If the size of the log file is exceeding the value defined in the
    `            MaxFileSize           ` property, the content is copied
    to a backup file and the logs are continued to be added to a new
    empty log file. The `            MaxBackupIndex           ` property
    makes the Log4j maintain a maximum number of backup files for the
    logs.

#### Limiting the size of audit log files

In WSO2 servers, audit logs are enabled by default. We can limit the
audit log files with the following configuration:

1.  Change the
    `          log4j.appender.AUDIT_LOGFILE=org.wso2.carbon.logging.appenders.CarbonDailyRollingFileAppender         `
    appender in the
    `          <IS_HOME>/repository/conf/log4j.properties         `
    file as follows:
    `          log4j.appender.AUDIT_LOGFILE=org.apache.log4j.RollingFileAppender         `
2.  Add the following two properties under
    `          RollingFileAppender         `:
    -   `            log4j.appender.AUDIT_LOGFILE.MaxFileSize=10MB           `
    -   `            log4j.appender.AUDIT_LOGFILE.MaxBackupIndex=20           `

### Monitoring logs

In WSO2 Identity Server, users can configure and adjust the logging levels
for each type of activity/transaction. There are several ways to view
and monitor the logs:

-   Carbon logs, as well as HTTP access logs will be printed on the
    command terminal that open when you execute the product startup
    script.
-   Alternatively, all log files can be viewed from the
    `          <IS_HOME>/repository/logs         ` folder. This
    folder contains **Audit logs**, **HTTP access logs** as well as the
    **Carbon logs** in separate log files with time stamps . Note that
    older Carbon logs are archived in the
    `          wso2carbon.log         ` file.
