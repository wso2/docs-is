# Configuring Log4j Properties

WSO2 Identity Server is shipped with the [log4j logging
capabilities](../../setup/monitoring-logs) that generate administrative
activities and server side logs. The `         log4j2.properties        `
file, which governs how logging is performed by the server can be found
in the `         <PRODUCT_HOME>/repository/conf        ` directory. 

There are three main components when configuring log4j. They are
Loggers, Appenders, and Layouts. 

!!! info     
    In most systems, logging properties should be specified before the
    server starts and cannot be changed while it is running. 
    

#### Global Log4J Configuration

This section allows you to assign a single log level and log pattern to
all loggers.

-   **Log Level** - Severity of the message. Reflects a minimum level
    that the logger requires. See descriptions of the [available log
    levels](../../setup/monitoring-logs#setting-the-log4j-log-level).
-   **Log Pattern** - Defines the output format of the log file. This is
    the layout pattern which describes the log message format

If you click **Restore Defaults**, the Registry will be overwritten by
logging configurations specified in the
`         log4j2.properties        ` file .

#### Configure Log4J Appenders

This section allows you to configure appenders individually. Log4j
allows logging requests to print to multiple destinations. These output
destinations are called 'Appenders'. You can attach several appenders to
one logger.

-   **Name** -The name of an appender. By default, a WSO2 product server
    is entered in this field with the following log appenders
    configured;
    -   **CARBON\_CONSOLE** - Logs to the console when the server is
        running.
    -   **CARBON\_LOGFILE** - Writes the logs to
        `             <IS_HOME>/repository/logs/wso2carbon.log            `
        .

        Some WSO2 products do not ship t he following appenders by
        default.

        -   **SERVICE** \_ **APPENDER** - Writes service invocations to
            \<
            `               IS_HOME>/repository/logs/wso2-<PRODUCT_NAME>-service.log.              `
        -   **ERROR\_LOGFILE -** Writes warning/error messages to \<
            `               IS_HOME>/repository/logs/wso2-<PRODUCT_NAME>-service.log              `  

    -   **CARBON** **\_ MEMORY**
    -   **CARBON\_SYS\_LOG -** Allows separating the software that
        generates messages, from the system that stores them and the
        software that reports and analyzes them.
    -   **CARBON\_TRACE\_LOGFILE** 
-   **Log pattern** - Defines the output format of the log file. From
    Carbon 4.4.3 onwards, t he conversion character 'K' can be used in
    the pattern layout to log a UUID . For example, the log pattern can
    be \[%K\] \[%T\] \[%S\] \[%d\] %P%5p {%c} - %x %m {%c}%n, where
    \[%K\] is the UUID. 
-   **Sys Log Host** - The IP address of the system log server. The
    syslog server is a dedicated log server for many applications. It
    runs in a particular TCP port in a separate machine, which can be
    identified by an IP address.  
-   **Facility** - The log message type sent to the system log server.  
-   **Threshold** - Filters log entries based on their level. For
    example, threshold set to 'WARN' will allow the log entry to pass
    into appender. If its level is 'WARN', 'ERROR' or 'FATAL', other
    entries will be discarded. This is the minimum log level at which
    you can log a message. See descriptions of the [available log
    levels](../../setup/monitoring-logs#setting-the-log4j-log-level).

#### Configure Log4J Loggers

A Logger is an object used to log messages for a specific system or
application component. Loggers are normally named using a hierarchical
dot-separated namespace and have a 'child-parent' relationship. For
example, the logger named 'root.sv' is a parent of the logger named
'root.sv.sf' and a child of 'root'.

When the server starts for the first time, all the loggers initially
listed in the `         log4j2.properties        ` file appear on the
logger name list. This section allows you to browse through all these
loggers, define a log level and switch on/off additivity to any of them.
After editing, the logging properties are read only from the database.

-   **Logger** - The name of a logger.
-   **Parent Logger** - The name of a parent logger.
-   **Level** - Allows to select level (threshold) from the drop-down
    menu. After you specify the level for a certain logger, a log
    request for that logger will only be enabled if its level is equal
    or higher to the logger’s level. If a given logger is not assigned a
    level, then it inherits one from its closest ancestor with an
    assigned level. Refer to the hierarchy of levels given above. See
    descriptions of the [available log
    levels](../../setup/monitoring-logs#setting-the-log4j-log-level).
-   **Additivity** - Allows to inherit all the appenders of the parent
    Logger if set as 'True'.  


