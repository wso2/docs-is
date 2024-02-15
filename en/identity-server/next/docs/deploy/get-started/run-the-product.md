# Run the Product

The sections given below cover the way to start and stop the WSO2 Identity Server using the command line and configuring it via the WSO2 IS Console.

- Start the server
- Access the console
- Stop the server

!!! note
    For information on installation prerequisites, click [here]({{base_path}}/deploy/get-started/install).

## Start the server

Follow the relevant instructions based on the operating system you use.

!!! tip
    If you are running multiple WSO2 products on the same server, see [Default Ports of WSO2 Products]({{base_path}}/references/default-ports) for instructions on setting a port offset.

### Start on Windows/Linux/Mac OS

To start the server, go to the `<IS_HOME>/bin` folder and run either depending on your OS:

=== "Windows"
    ```
    wso2server.bat
    ```

=== "Linux / Mac OS"
    ```
    wso2server.sh
    ```

Alternatively, you can install and run the server [as a Windows service]({{base_path}}/deploy/get-started/install#install-on-windows).

!!! note
    To start the server in the background mode of Linux, run the `wso2server.sh start` command.

!!! warning
    If the path to the <IS_HOME> directory is long, Windows will shorten it using "`~`". In such cases, you must set the actual path to the `CARBON_HOME` variable in the `<IS_HOME>/bin/wso2server.bat` file. Add the following entry at the top of the `<IS_HOME>/bin/wso2server.bat` file.

    ``` java
    set CARBON_HOME="<ACTUAL_PATH_OF_IS_HOME_DIRECTORY_>"
    ```

1. Open a command prompt:

    - Windows: **Start -\> Run**, enter
        `cmd` at the prompt, and click **Enter**.

    - Linux/Mac OS: establish an SSH connection to the server or log
        in to the text Linux console.

2. Execute one of the following commands to start the server.

    - On Windows:
        `<IS_HOME>/bin/wso2server.bat --run`

    - On Linux/Mac OS:
        `sh <IS_HOME>/bin/wso2server.sh`

    !!! info
        If you need to provide access to the production environment without allowing any user group (including admin) to log in to the WSO2 IS console, execute one of the following commands.

        -   On Windows:
            `<IS_HOME>\bin\wso2server.bat --run -DworkerNode`

        -   On Linux/Mac OS:
            `sh <IS_HOME>/bin/wso2server.sh -DworkerNode`

        To know the additional actions you can perform, enter `-help` after the command. For example, `sh <IS_HOME>/bin/wso2server.sh -help`.


Once the server has started, the operation log will display `WSO2 Carbon started in 'n' seconds`.


## Access the WSO2 Identity Server Console

Once the server has started, you can access the WSO2 Identity Server console by navigating to the URL of the WSO2 Identity Server console. The URL is displayed towards the end of the server start script's console and log. The URL should be in the following format.

`https://<Server Host>:9443/console`

Use the above URL to access the WSO2 Identity Server console via any computer connected to the Internet or LAN. When accessing the WSO2 Identity Server console from the same server where it is installed, enter "localhost" instead of the IP address. Use **admin** as both the username and password to log in to the WSO2 Identity Server console.

Example: `https://localhost:9443/console`.

!!! tip
    If you wish to change the url of the WSO2 Identity Server console, click [here.]({{base_path}}/deploy/change-the-hostname/)

!!! info
    When the WSO2 Identity Server console sign-in page appears, the web browser displays an "Insecure Connection" message, since the IS is packed with a self-signed certificate. Accept the certificate and proceed to the sign-in page.

    !!! warning 
        This scenario is suitable for testing purposes, or for running a program on the internal networks of a company. If you want to make the WSO2 Identity Server console available to external users, obtain a certificate signed by a well-known certificate authority.

!!! note
    If you leave the WSO2 Identity Server console unattended, the session will time out. The **default timeout value** is `15` minutes, but you can change this in the `<IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/web.xml` file as follows.

    ```
    <session-config>
       <session-timeout>15</session-timeout>
    </session-config>
    ```

!!! info "Restrict Access to the WSO2 Identity Server console and Web Applications"
    You can restrict access to the WSO2 Identity Server console by binding the WSO2 Identity Server console with selected IP addresses. You can achieve this by having a load balancer in your deployment before the server.

## Shut the server down and restart the server

You can shut down the server via the management or using the command terminal. The following steps will guide you through the procedure.

### Shut down and restart via the command window

To stop the server, press **Ctrl+C** in the command window.

!!! note
    To stop the server in the background mode of Linux, run the `wso2server.sh stop` command.

!!! note "Restart via the command window"
    If you start the server with the `wso2server.sh` command, you will not be able to restart the server from the command window.

    If you wish to restart the server from the command window, follow the steps given below.
    
    1. Navigate to `<IS_HOME>/bin` and start the server with the `sh wso2server.sh start` command. **NOTE:** This will run the server without displaying the debug logs. 
    
        If you wish to see the logs, use the `tail -f ../repository/logs/wso2carbon.log` command. Note that the given path in the command, `../repository/logs/` is relative to the `bin` folder.
    
    2. To restart the server, use `sh wso2server.sh restart`. 
    
    3. To stop the server, use `sh wso2server.sh stop`.