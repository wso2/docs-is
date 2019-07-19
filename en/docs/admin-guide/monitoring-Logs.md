# Monitoring Logs

Logging is one of the most important aspects of a production-grade
server. A properly configured logging system is vital for identifying
errors, security threats, and usage patterns.

See the following topics for details:

-   [Log types in WSO2
    products](#MonitoringLogs-log_typesLogtypesinWSO2products)
-   [Configuring products for log
    monitoring](#MonitoringLogs-Configuringproductsforlogmonitoring)
    -   [Setting the Log4j log
        level](#MonitoringLogs-SettingtheLog4jloglevel)
-   [Managing log growth](#MonitoringLogs-Managingloggrowth)
    -   [Managing the growth of Carbon
        logs](#MonitoringLogs-ManagingthegrowthofCarbonlogs)
    -   [Limiting the size of Carbon log
        files](#MonitoringLogs-LimitingthesizeofCarbonlogfiles)
    -   [Limiting the size of audit log
        files](#MonitoringLogs-Limitingthesizeofauditlogfiles)
-   [Monitoring logs](#MonitoringLogs-Monitoringlogs)

  

### Log types in WSO2 products

Listed below are the various log types that are used in WSO2 products.

Separate log files are created for each of the log types given below in
the `          <PRODUCT_HOME>/repository/logs         ` directory .

-   ** Carbon logs** : All WSO2 products are shipped with log4j logging
    capabilities that generate administrative activities and server side
    logs. The Carbon log ( `           wso2carbon.log          ` ) is a
    log file that covers all the management features of a product.
    Carbon logs are configured in t he
    `           log4j.properties          ` file (stored in the
    `           <PRODUCT_HOME>/repository/conf          ` directory).

    **Java logging and Log4j integration:** I n addition to the logs
    from libraries that use Log4j, all logs from libraries (such as,
    Tomcat, Hazelcast and more) that use Java logging framework are also
    visible in the same log files. That is, when Java logging is enabled
    in Carbon, only the Log4j appenders will write to the log files. If
    the Java Logging Handlers have logs, these logs will be delegated to
    the log events of the corresponding Log4j appenders. A Pub/Sub
    registry pattern implementation has been used in the latter
    mentioned scenario to plug the handlers and appenders. The following
    default log4j appenders in the
    `            log4j.properties           ` file are used for this
    implementation:

    -   `             org.wso2.carbon.logging.appenders.CarbonConsoleAppender            `
    -   `             org.wso2.carbon.logging.appenders.CarbonDailyRollingFileAppender            `

-   **Audit logs:** Audit logs are used for tracking the sequence of
    actions that affect a particular task carried out on the server.
    These are also configured in t he
    `          log4j.properties         ` file.
-   **HTTP access logs:** HTTP requests/responses are logged in access
    logs to monitor the activities related to an application's usage.
    These logs are configured in the
    `          catalina-server.xml         ` file (stored in the \<
    `          PRODUCT_HOME>/repository/conf/tomcat/         `
    directory).
-   **Patch logs:** These logs contain details related to patches
    applied to the product. Patch logs cannot be customized. See [WSO2
    Patch Application Process](_WSO2_Patch_Application_Process_) for
    more information.
-   **Service/Event logs:** These are logs that are enabled in some WSO2
    products for tracing services and events using a separate log file (
    `          wso2-<product>-trace.log         ` ). If server/event
    tracing logs are used in your WSO2 product, you can configure them
    in the `          log4j.properties         ` file.
-   **Product-specific logs:** Each WSO2 product may generate other log
    files in addition to the Carbon logs, Audit logs, HTTP access logs,
    Patch logs and Service/Event logs. See the product's documentation
    for descriptions of these log files and instructions on how to
    configure and use them.

### Configuring products for log monitoring

See the following information on configuring **Carbon logs** , **Audit
logs,** **HTTP access logs** , and **Service/Event logs** for your WSO2
product.

-   ****Configuring Carbon logs****

    You can easily configure Carbon logs using the management console of
    your product, or you can manually edit the
    `           log4j.properties          ` file. It is recommended to
    use the management console to configure logging because all changes
    made to log4j through the management console persists in the WSO2
    Registry. Therefore, those changes will be available after the
    server restarts and will get priority over what is defined in
    the log4j.properties file. Also, note that the logging configuration
    you define using the management console will apply at run time.
    However, if you modify the `           log4j.properties          `
    file and restart the server, the earlier log4j configuration that
    persisted in the registry will be overwritten. T here is also an
    option in the management console to restore the original log4j
    configuration from the `           log4j.properties          ` file.
    The log levels that can be configured are [listed
    below](#MonitoringLogs-log4j_levels).

    **Identifying forged messages:  
    **

    T he log pattern d efines the output format of the log file. From
    Carbon 4.4.3 onwards, the conversion character 'K' can be used in
    the pattern layout to log a UUID. For example, the log pattern can
    be \[%K\] \[%T\] \[%S\] \[%d\] %P%5p {%c} - %x %m {%c}%n,
    where \[%K\] is the UUID.

    The UUID can be used for identifying forged messages in the log. By
    default, the UUID will be generated every time the server starts .
    If required, you can configure the UUID regeneration period by
    manually adding the following property to the
    `           log4j.properties          ` file (stored in the
    `           <PRODUCT_HOME>/repository/conf          ` directory):

    ``` java
    log4j.appender.CARBON_LOGFILE.layout.LogUUIDUpdateInterval=<number_of_hours>
    ```

    **Carbon logs in [WSO2 Data Analytics
    Server](http://wso2.com/smart-analytics) (WSO2 DAS)**

    Carbon logs are configured in the
    `            log4j.properties           ` file (stored in the
    `            <PRODUCT_HOME>/repository/conf           ` directory)
    for all WSO2 products. However, WSO2 DAS generates some additional
    Carbon logs (which will be stored in the same [Carbon log
    file](#MonitoringLogs-Carbon_logs) ) that should be separately
    configured by creating a new
    `            log4j.properties           ` file in the
    `            <DAS_HOME>/repository/conf/analytics/spark           `
    directory. **Note:** To create this file, you need to rename the
    `            log4j.properties.template           ` file that is
    available in the
    `            <DAS_HOME>/repository/conf/analytics/spark           `
    directory to l `            og4j.properties           ` .

    See the following topics for instructions:

    -   [Configuring Log4j Properties](_Configuring_Log4j_Properties_)
    -   [Configuring the Log Provider](_Configuring_the_Log_Provider_)

-   **Configuring Audit logs**

    Audit logs are enabled in WSO2 products by default. You can change
    the following default configuration by manually updating the the
    `           log4j.properties          ` file. The log levels that
    can be configured are [listed below](#MonitoringLogs-log4j_levels).

    ``` java
        log4j.logger.AUDIT_LOG=INFO, AUDIT_LOGFILE
         
        # Appender config to AUDIT_LOGFILE
        log4j.appender.AUDIT_LOGFILE=org.wso2.carbon.utils.logging.appenders.CarbonDailyRollingFileAppender
        log4j.appender.AUDIT_LOGFILE.File=${carbon.home}/repository/logs/audit.log
        log4j.appender.AUDIT_LOGFILE.Append=true
        log4j.appender.AUDIT_LOGFILE.layout=org.wso2.carbon.utils.logging.TenantAwarePatternLayout
        log4j.appender.AUDIT_LOGFILE.layout.ConversionPattern=[%d] %P%5p {%c}- %x %m %n
        log4j.appender.AUDIT_LOGFILE.layout.TenantPattern=%U%@%D [%T] [%S]
        log4j.appender.AUDIT_LOGFILE.threshold=INFO
        log4j.additivity.AUDIT_LOG=false
    ```

-   **Configuring HTTP access logs**

    See [HTTP Access Logging](_HTTP_Access_Logging_) for instructions on
    how to configure and use HTTP access logs.

-   **Configuring Service/Event tracing logs**  
    A separate log file for tracing services/events are enabled for
    certain WSO2 products in the `           log4j.properties          `
    file using a specific appender. These logs are published to a file
    named `           wso2-<product>-trace.log          ` . See the
    table given below for instructions relevant to your product:

    <table>
    <thead>
    <tr class="header">
    <th>Product</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>WSO2 DAS</td>
    <td><div class="content-wrapper">
    <p>Event tracing logs are enabled in WSO2 DAS using the <code>                 EVENT_TRACE_LOGGER                </code> appender as shown below (Click <strong>Message tracing log configuration</strong> ). This log file stores logs related to events in WSO2 DAS. By default, this appender uses the root log level, which is INFO. You can override the root log level by giving a specific log level for the appender as <a href="#MonitoringLogs-log4j_levels">explained here</a> .</p>
    <div id="expander-59012538" class="expand-container">
    <div id="expander-control-59012538" class="expand-control">
    <img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Message tracing log configuration
    </div>
    <div id="expander-content-59012538" class="expand-content">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">log4j.<span class="fu">category</span>.<span class="fu">EVENT_TRACE_LOGGER</span>=INFO, EVENT_TRACE_APPENDER, EVENT_TRACE_MEMORYAPPENDER</a>
    <a class="sourceLine" id="cb1-2" title="2">log4j.<span class="fu">additivity</span>.<span class="fu">EVENT_TRACE_LOGGER</span>=<span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-3" title="3">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_APPENDER</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">DailyRollingFileAppender</span></a>
    <a class="sourceLine" id="cb1-4" title="4">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_APPENDER</span>.<span class="fu">File</span>=${carbon.<span class="fu">home</span>}/repository/logs/${instance.<span class="fu">log</span>}/wso2-das-trace${instance.<span class="fu">log</span>}.<span class="fu">log</span></a>
    <a class="sourceLine" id="cb1-5" title="5">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_APPENDER</span>.<span class="fu">Append</span>=<span class="kw">true</span></a>
    <a class="sourceLine" id="cb1-6" title="6">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_APPENDER</span>.<span class="fu">layout</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">PatternLayout</span></a>
    <a class="sourceLine" id="cb1-7" title="7">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_APPENDER</span>.<span class="fu">layout</span>.<span class="fu">ConversionPattern</span>=%d{HH:mm:ss,SSS} [%X{ip}-%X{host}] [%t] %5p %c{<span class="dv">1</span>} %m%n</a>
    <a class="sourceLine" id="cb1-8" title="8"># The memory appender <span class="kw">for</span> trace logger</a>
    <a class="sourceLine" id="cb1-9" title="9">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_MEMORYAPPENDER</span>=org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">utils</span>.<span class="fu">logging</span>.<span class="fu">appenders</span>.<span class="fu">MemoryAppender</span></a>
    <a class="sourceLine" id="cb1-10" title="10">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_MEMORYAPPENDER</span>.<span class="fu">bufferSize</span>=<span class="dv">2000</span></a>
    <a class="sourceLine" id="cb1-11" title="11">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_MEMORYAPPENDER</span>.<span class="fu">layout</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">PatternLayout</span></a>
    <a class="sourceLine" id="cb1-12" title="12">log4j.<span class="fu">appender</span>.<span class="fu">EVENT_TRACE_MEMORYAPPENDER</span>.<span class="fu">layout</span>.<span class="fu">ConversionPattern</span>=%d{HH:mm:ss,SSS} [%X{ip}-%X{host}] [%t] %5p %m%n</a></code></pre></div>
    </div>
    </div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>

#### Setting the Log4j log level

The log level can be set specifically for each appender in the
`         log4j.properties        ` file by setting the threshold value.
If a log level is not specifically given for an appender as explained
below, the root log level (INFO) will apply to all appenders by default.

For example, shown below is how the log level is set to DEBUG for the
`         CARBON_LOGFILE        ` appender ( [Carbon
log](#MonitoringLogs-Carbon_logs) ):

``` java
log4j.appender.CARBON_LOGFILE.threshold=DEBUG
```

Listed below are the log levels that can be configured:

  

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

Log growth (in [Carbon logs](#MonitoringLogs-Carbon_logs) ) can be
managed by the following configurations in the
`         <PRODUCT_HOME>/repository/conf/        `
`         log4j.properties        ` file.

-   Configurable log rotation: By default, log rotation is on a daily
    basis.
-   Log rotation based on time as opposed to size: This helps to inspect
    the events that occurred during a specific time.
-   Log files are archived to maximise the use of space.

The `         log4j-        ` based logging mechanism uses appenders to
append all the log messages into a file. That is, at the end of the log
rotation period, a new file will be created with the appended logs and
archived. The name of the archived log file will always contain the date
on which the file is archived.

#### Limiting the size of Carbon log files

You can limit the size of the
`         <PRODUCT_HOME>/repository/logs/         wso2carbon.log        `
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
    `          <PRODUCT_HOME>/repository/conf/log4j.properties         `
    file as follows:
    `          log4j.appender.AUDIT_LOGFILE=org.apache.log4j.RollingFileAppender         `
2.  Add the following two properties under
    `          RollingFileAppender         ` :
    -   `            log4j.appender.AUDIT_LOGFILE.MaxFileSize=10MB           `
    -   `            log4j.appender.AUDIT_LOGFILE.MaxBackupIndex=20           `

### Monitoring logs

In each WSO2 product, users can configure and adjust the logging levels
for each type of activity/transaction. There are several ways to view
and monitor the logs:

-   Carbon logs (system logs and application logs) of a running Carbon
    instance can be monitoring [using the management
    console](_View_and_Download_Logs_).
-   Carbon logs, as well as HTTP access logs will be printed on the
    command terminal that open when you execute the product startup
    script.
-   Alternatively, all log files can be viewed from the
    `          <PRODUCT_HOME>/repository/logs         ` folder. This
    folder contains **Audit logs** , **HTTP access logs** as well as the
    **Carbon logs** in separate log files with time stamps . Note that
    older Carbon logs are archived in the
    `          wso2carbon.log         ` file.
