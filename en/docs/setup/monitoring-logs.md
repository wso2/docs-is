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
        mentioned scenario to plug the handlers and appenders. 
        
-   **Audit logs:** Audit logs are used for tracking the sequence of
    actions that affect a particular task carried out on the server.
    These are also configured in t he
    `          log4j2.properties         ` file.
-   **HTTP access logs:** HTTP requests/responses are logged in access
    logs to monitor the activities related to an application's usage.
    These logs are configured in the
    `          deployment.toml         ` file in the `<IS_HOME>/repository/conf`
    directory).

!!! note  
    WSO2 Identity Server generates other log 
    files in addition to the Carbon logs, Audit logs, HTTP access logs,
    Patch logs, and Service/Event logs. For more information, see [Monitoring the Identity Server](../../setup/monitoring-the-identity-server).

### Configuring WSO2 Identity Server for log monitoring

See the following information on configuring **Carbon logs**, **Audit
logs,** **HTTP access logs**, and **Service/Event logs** for WSO2 Identity Server.

#### Configuring Carbon logs 
Carbon logs are enabled in WSO2 Identity Server by default. You can change
the following default configuration by manually updating the
`log4j2.properties` file. 

```toml

# Appender config to CARBON_LOGFILE
appender.CARBON_LOGFILE.type = RollingFile
appender.CARBON_LOGFILE.name = CARBON_LOGFILE
appender.CARBON_LOGFILE.fileName = ${sys:carbon.home}/repository/logs/wso2carbon.log
appender.CARBON_LOGFILE.filePattern = ${sys:carbon.home}/repository/logs/wso2carbon-%d{MM-dd-yyyy}.log
appender.CARBON_LOGFILE.layout.type = PatternLayout
appender.CARBON_LOGFILE.layout.pattern = TID: [%tenantId] [%appName] [%d] [%X{Correlation-ID}] %5p {%c} - %mm%ex%n
appender.CARBON_LOGFILE.policies.type = Policies
appender.CARBON_LOGFILE.policies.time.type = TimeBasedTriggeringPolicy
appender.CARBON_LOGFILE.policies.time.interval = 1
appender.CARBON_LOGFILE.policies.time.modulate = true
appender.CARBON_LOGFILE.strategy.type = DefaultRolloverStrategy
appender.CARBON_LOGFILE.strategy.max = 20
appender.CARBON_LOGFILE.filter.threshold.type = ThresholdFilter
appender.CARBON_LOGFILE.filter.threshold.level = DEBUG
```

#### Enable Logs for a Component
 
Add logger in the `<IS_HOME>/repository/conf/log4j2.properties` file to
define the logger. Then add the <Logger_Name> to the loggers list by comma-separate.

```
    logger.<Logger_Name>.name = <Component_name>
    logger.<Logger_Name>.type = INFO

    loggers = AUDIT_LOG, trace-messages, ..., <Logger_Name>
```
    
For example: 
    
```toml
    logger.org-wso2-carbon-identity-core.name = org.wso2.carbon.identity.core
    logger.org-wso2-carbon-identity-core.level = INFO
    
    loggers = org-wso2-carbon-identity-core, trace-messages, org-apache-coyote,com-hazelcast
```
    
The log levels that
can be configured are [listed below](##setting-the-log4j-log-level).

!!! note
    All the changes that are made to the log4j2.properties will be applied at run time.
    You don't need to restart the server after a configuration change in log4j2.properties.


#### Configuring Audit logs

Audit logs are enabled in WSO2 Identity Server by default. You can change
the following default configuration by manually updating the the
`           log4j2.properties          ` file. 


```toml

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
appender.AUDIT_LOGFILE.strategy.type = DefaultRolloverStrategy
appender.AUDIT_LOGFILE.strategy.max = 20
appender.AUDIT_LOGFILE.filter.threshold.type = ThresholdFilter
appender.AUDIT_LOGFILE.filter.threshold.level = INFO
```

The log levels that
can be configured are [listed below](##setting-the-log4j-log-level).

#### Configuring HTTP access logs

See [HTTP Access Logging](../../setup/http-access-logging) for instructions on
how to configure and use HTTP access logs.

#### Configuring product observability

WSO2 Identity Server supports logging capabilities for tracking down latencies due to database calls.
See [Working with Product Observability](../../setup/working-with-product-observability) for instructions on
how to configure and use this capability.

#### Setting the Log4j log level

The log level can be set specifically for each appender in the
`         log4j2.properties        ` file by setting the threshold value.
If a log level is not specifically given for an appender as explained
below, the root log level (INFO) will apply to all appenders by default.

Following is how the log level is set to `DEBUG` for the `CARBON_LOGFILE` appender ([Carbon log](#configuring-carbon-logs)): 

!!! example  
    ```toml
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

Log4j2 supports two main log rotation options.

- Rollover based on log file size.
- Rollover based on a time period.

By default wso2 supports rollover based on a time period. This interval is by default one day.
The log4j-based logging mechanism uses appenders to
append all the log messages into a file. That is, at the end of the log
rotation period, a new file will be created with the appended logs and
archived. The name of the archived log file will always contain the date
on which the file is archived.

#### Managing the growth of Carbon logs

Log growth in ([Carbon logs](#configuring-carbon-logs)) can be
managed by the following configurations in the
`         <IS_HOME>/repository/conf/log4j2.properties        ` file.


This time period can be configured by changing. 
` appender.CARBON_LOGFILE.policies.time.interval ` value in `<IS_HOME>/repository/conf/log4j2.properties        ` file
which can be given as number of days.


You can limit the size of the
`         <IS_HOME>/repository/logs/wso2carbon.log        `
file by configuring Rollover based on log file size by following the steps given below.

1.  Remove the
       ``` toml
       appender.CARBON_LOGFILE.policies.time.type = TimeBasedTriggeringPolicy
       appender.CARBON_LOGFILE.policies.time.interval = 1
       ```
    add the 
       ``` toml
       appender.CARBON_LOGFILE.policies.size.type = SizeBasedTriggeringPolicy
       appender.CARBON_LOGFILE.policies.size.size=10MB
       ```
    in the

    `           <PRODUCT_HOME>/repository/conf/          `
    `           log4j2.properties          ` file.
    
    If the size of the log file is exceeding the value defined in the
    `            appender.CARBON_LOGFILE.policies.size.size           ` property, the content is copied
    to a backup file and the logs are continued to be added to a new
    empty log file.
    

2.  The following property under `CARBON_LOGFILE` appender is used to limit the number of backup files.
    You can change it as per your requirement by changing its value.

    -   `            appender.CARBON_LOGFILE.strategy.max           `

#### Limiting the size of audit log files

In WSO2 servers, audit logs are enabled by default. We can limit the
audit log files with the following configuration:

1.  Remove the
       ``` toml
       appender.AUDIT_LOGFILE.policies.time.type = TimeBasedTriggeringPolicy
       appender.AUDIT_LOGFILE.policies.time.interval = 1
       ```
    from the `AUDIT_LOGFILE` appender in the
    `          <IS_HOME>/repository/conf/log4j2.properties         `
    add the following to the `AUDIT_LOGFILE` appender :
       ``` toml
    appender.AUDIT_LOGFILE.policies.size.type = SizeBasedTriggeringPolicy
    appender.AUDIT_LOGFILE.policies.size.size=10MB
       ```
2.  The following property under `AUDIT_LOGFILE` appender is used to limit the number of backup files.
    You can change it as per your requirement by changing its value.

    -   `            appender.AUDIT_LOGFILE.strategy.max           `

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
