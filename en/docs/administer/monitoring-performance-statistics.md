# Monitoring Performance Statistics

WSO2 products provide a range of performance statistics on a running
Carbon instance. These statistics include information about memory
availability, request count, server name, server start time, system up
time, active services, total memory, average, minimum, maximum response
times etc. Statistics are accessible through the management console of a
running Carbon instance.

Access and performance statistics are available in system level as
follows:

### System-Level Statistics

Follow the instructions given below to access system-level statistics.

1.  Log in to the management console and click **System Statistics** in
    the **Monitor** tab:  
    ![](../assets/img/53125409/53287307.png)
2.  The **System Statistics** page appears as follows:  
    ![](../assets/img/53125409/53287311.png)  
    The following information is available:
    -   [Service
        Summary](#MonitoringPerformanceStatistics-ServiceSummary)
    -   [Server
        Information](#MonitoringPerformanceStatistics-ServerInformation)
    -   [Response Time
        Graph](#MonitoringPerformanceStatistics-ResponseTimeGraph)
    -   [Memory Graph](#MonitoringPerformanceStatistics-MemoryGraph)
    -   [Statistics Configuration
        Panel](#MonitoringPerformanceStatistics-StatisticsConfigurationPanel)

#### Service Summary

![](../assets/img/53125409/53287308.png)

This panel provides the following information:

-   **Average Response Time** - The average amount of time taken by the
    mediation channel to mediate a message (in milliseconds).
-   **Minimum Response Time** - The least amount of time taken by the
    mediation channel to mediate a message (in milliseconds).
-   **Maximum Response Time** - The most amount of time taken by the
    mediation channel to mediate a message (in milliseconds).
-   **Total Request Count -** The total number of messages received and
    mediated through the mediation channel.
-   **Total Response Count -** The total number of messages sent and
    mediated through the mediation channel.
-   **Total Fault Count -** The number of messages that triggered faults
    while being mediated through the channel.
-   **Active Services** - The number of currently active services.

#### Server Information

![](../assets/img/53125409/53287310.png)

This panel provides the following information:

-   **Hos** **t** - Shows the IP address of the server.
-   **Server Start Time** - Shows the time when the server started.
-   **System Up Time** - Shows the time the server has been up and
    running.
-   **Memory Allocated** - Shows the memory capacity of the server.
-   **Memory Usage** - Shows the used memory of the server.

#### Response Time Graph

![](../assets/img/53125409/53287309.png)

This graph shows the temporal variation of the Average Response time.

#### Memory Graph

![](../assets/img/53125409/53287315.png)

This graph shows the temporal variation of the server Memory.

#### Statistics Configuration Panel

The **Statistics Configuration** panel is provided to customize the
**System Statistics** display by configuring the level information that
can be viewed on the panel.

![](../assets/img/53125409/53287313.png)

The following information can be configured:

-   **Statistics Refresh Interval (milliseconds):** Allows you to
    specify the interval of the statistics refresh. A smaller value
    refreshes the statistics display faster.
-   **Response Time Graph:** Allows you to specify the X and Y
    parameters of the **Response Time** graph.
    -   **X-Scale (units)**
    -   **X-Width (px)**
-   **Memory Graph** - Allows you to specify the X and Y parameters of
    the **Memory** graph.
    -   **X-Scale (units)**
    -   **X-Width (px)**

If you want to reset the previous values before submitting the page
after editing, click **Reset**. The **Restore Defaults** button sets
the default values in the corresponding fields.
