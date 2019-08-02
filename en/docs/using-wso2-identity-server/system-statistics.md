# System Statistics

The **System Statistics** page shows certain statistics related to the
WSO2 Identity Server instance. These include free memory, request count,
server name, server start time, system up time, active services, total
memory, average response time, minimum response time, and maximum
response time.

Follow the instructions below to access the system statistics.

1.  Sign in. Enter your user name and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console.md)
    .
2.  Navigate to the **Monitor** menu and click on **System Statistics**
    . The **System Statistics** page appears with statistics related to
    the Identity Server usage.  
    ![System statistics]( ../../assets/img/using-wso2-identity-server/system-statistics.png) 

### Server information

This panel provides the following information:

-   **Host** - Shows the hostname of the server.
-   **Server Start Time** - Shows the time when the server started.
-   **System Up Time** - Shows the amount of time that the server has
    been working.
-   **Memory Allocated** - Shows the memory capacity of the server.
-   **Memory Usage** - Shows the memory capacity used by the server.

![Server information]( ../../assets/img/using-wso2-identity-server/server-information.png) 

### Memory graph

This graph shows a temporal variation of the server memory.

![]( ../../assets/img/using-wso2-identity-server/memory-graph.png)

### Statistics configuration panel

Use the **Statistics Configuration** panel to configure the statistics
view.

1.  Enter values into the appropriate fields:
    -   **Statistics Refresh Interval (ms)** - Allows you to specify the
        statistics refresh rate.
    -   **Response Time Graph** - Allows you to specify the X and Y
        parameters of the Response Time graph.
        -   **X-Scale (units)**
        -   **X-Width (px)**
    -   **Memory Graph** - Allows you to specify the X and Y parameters
        of the Memory graph.
        -   **X-Scale (units)**
        -   **X-Width (px)**
2.  Click **Update**.  
    ![Update button]( ../../assets/img/using-wso2-identity-server/update-button.png)
3.  Refresh your page.

!!! info
    If you want to restore to the previous values after editing, click **Reset**.

    ![Reset button]( ../../using-wso2-identity-server/reset-button.png)

!!! info
    If you want to restore to the default values, click the corresponding button.

    ![Restore defaults button]( ../../assets/img/using-wso2-identity-server/restore-defaults-button.png)
