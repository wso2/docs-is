# System Logs

The " **System Logs** " page displays information regarding the log
files of the current product. Furthermore, it has a feature that allows
the user to view log files according to their preference. The log files
can be retrieved in two ways:

-   If syslog-ng is configured, log files are taken from the remote
    location where the log files are hosted using the syslog-ng server.
-   If syslog-ng is not configured, log files are taken from the local
    file system (super-tenant or Stand alone apps).

See [Monitoring Logs](../../admin-guide/monitoring-logs) in the WSO2 Product Administration
Guide for more information about logging.

Follow the instructions below to access the System Log statistics.

1.  Sign in. Enter your username and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console)
    .
2.  Click on **Monitor** on the left side of the screen and click on
    **System Logs**.
3.  The following screen appears. T he log messages displayed on this
    page are obtained from a memory appender. Hence, the severity (log
    level) of the displayed log messages is equal to or higher than the
    memory appender threshold.

    -   **Type -** Indicates the type or level of the system log
    -   **Date -** The date that the log file was generated
    -   **Log Message -** The log message or action.
    -   **More** - Allows you to view more details about the log

    ![System logs](../../assets/img/using-wso2-identity-server/system-logs.png) 

4.  To view more details of a particular log, click on the **More** link
    that is associated with the file.  
    ![More link](../../assets/img/using-wso2-identity-server/more-link.png) 

5.  The details of the system log appear.  
    ![System log details](../../assets/img/using-wso2-identity-server/system-log-details.png) 
6.  You can filter the system logs using the **Level** drop-down. Select
    the category of logs you want to view. The available categories are:
    -   **FATAL** - Fatal error messages (Severe error events that will
        presumably lead the application to abort.)
    -   **ERROR** - Error messages (Error events that might still allow
        the application to continue running.)
    -   **WARN** - Warning messages (Potentially harmful situations.)
    -   **INFO** - Information messages (Informational messages that
        highlight the progress of the application at coarse-grained
        level.)
    -   **DEBUG** - Debug messages (Fine-grained informational events
        that are most useful to debug an application.)
    -   **TRACE** - Trace messages (Finer-grained informational events
        than the DEBUG)

    ![Log levels](../../assets/img/using-wso2-identity-server/log-levels.png) 
7.  You can also find a particular log using the search function. Enter
    the name (or part of the name) of the log on the **Search Logs**
    field and click on the **Search** icon.  
    ![Search logs field](../../assets/img/using-wso2-identity-server/search-logs-field.png) 

    The logs containing the search term are listed on the screen.  
      
    !!! info     
        The location of the log files on the disk is specified in the `<IS_HOME>/repository/conf/log4j.properties` file.
