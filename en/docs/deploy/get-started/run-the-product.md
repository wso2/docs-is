# Run the Product

The sections given below cover the way to start and stop WSO2 Identity Server using the command line and 
configuring it via the Management Console.

- Start the server 
- Access the management console 
- Stop the server
        
!!! note
    For information on installation prerequisites, click [here](../../../deploy/get-started/install).
    
---

## Start the server

Follow the relevant instructions based on the operating system you use.

!!! tip
    If you are running multiple WSO2 products on the same server, see
    [Default Ports of WSO2 Products](../../../references/default-ports-of-wso2-products) for
    instructions on setting a port offset.
    
### Start on Windows/Linux/Mac OS

To start the server, run either 

-  `         wso2server.bat        ` (on Windows) or
- `         wso2server.sh        ` (on Linux/Mac OS) script, 

which are located inside the
`         <IS_HOME>/bin        ` folder. Alternatively, you can install and run
the server [as a Windows service](../../../deploy/get-started/install#install-on-windows).

!!! note
    To start the server in the background mode of Linux, run the 
    `           wso2server.sh start          ` command.

!!! warning
    
    If the path to the <IS_HOME> directory is long, Windows will
    shorten it using " `         ~        ` ". In that case, you **MUST** set
    the actual path to the `CARBON_HOME` variable in the
    `         <IS_HOME>/bin/wso2server.bat        ` file. Add
    following entry at the top of the 
    `         <IS_HOME>/bin/wso2server.bat        ` file.
    
    ``` java
    set CARBON_HOME="<ACTUAL_PATH_OF_IS_HOME_DIRECTORY_>"
    ```
    
1.  Open a command prompt:

    -   Windows: **Start -\> Run**, enter 
        `            cmd           ` at the prompt, and click **Enter**.

    -   Linux/Mac OS: establish an SSH connection to the server or log
        in to the text Linux console.

2.  Execute one of the following commands to start the server. 
    
    -   On Windows:
        `            <IS_HOME>/bin/wso2server.bat --run           `
    
    -   On Linux/Mac OS:
        `             sh <IS_HOME>/bin/wso2server.sh                         `


        !!! info 
            If you need to provide access to the production environment
            without allowing any user group (including admin) to log in to
            the management console, execute one of the following commands.

            -   On Windows:
                `               <IS_HOME>\bin\wso2server.bat --run -DworkerNode              `

            -   On Linux/Mac OS:
                `               sh <IS_HOME>/bin/wso2server.sh -DworkerNode              `

            To know the additional actions you can perform, enter `              -help             ` after the command. For example, 
            `              sh <IS_HOME>/bin/wso2server.sh -help             `.


Once the server has started, the operation log will display `WSO2 Carbon started 
in 'n' seconds`.

---

### Start on Solaris

To start the server, navigate to `         <IS_HOME>/bin        `
and run `        wso2server.sh        `  from
the command prompt. The required steps are as follows.


!!! note
    
    The following instructions are tested for an Oracle Solaris 10 8/11 x86
    environment.
    
1.  Get Command Prompt: **Launch -\>** **Run Applications -\>** enter
    `          dtterm         ` **-\>** click **Enter**.

2.  Execute the following command to start the server

 
    `          <IS_HOME>/bin/          bash          wso2server.sh. `
    
    
3.  The operation log appears in the command window. When the product
    server has successfully started, the log displays the message "WSO2
    Carbon started in 'n' seconds".

!!! info 
    To start the product as a service/nohup mode in Solaris, 
    modify the `<IS_HOME>/bin/wso2server.sh` file as mentioned below.

    1.  Open the `            <IS_HOME>/bin/wso2server.sh           `
        file in a text editor.
    2.  Search for the occurrences **nohup sh
        "$CARBON\_HOME"/bin/wso2server.sh $args \> /dev/null 2\>&1 &**
    3.  Replace those occurrences with **nohup <span
        class="underline">bash</span> "$CARBON\_HOME"/bin/wso2server.sh
        $args \> /dev/null 2\>&1 &**
        
        !!! tip
            Replace `sh` with `bash` in the above occurences.
            
    4.  Start the product.

---

## Access the management console

Once the server has started, you can access the management console by navigating 
to the URL of the management console. The URL is displayed towards the end of the 
server start script's console and log. The URL should be in the following format.

`         https://<Server Host>:9443/carbon        `

Use the above URL to access the management console via any computer connected to 
the Internet or LAN. When accessing the management console from the same server 
where it is installed, enter "localhost" instead of the IP address. Use **admin** 
as both the username and password to log in to the management console.

Example: `                   https://localhost:9443/carbon                 ` .

!!! tip

    If you wish to change the url of the management console, click [here.](../../../deploy/change-the-hostname/)

!!! info 
    When the management console sign-in page appears, the web browser displays an "Insecure Connection" message, since the IS is 
    packed with a self-signed certificate. Accept the certificate and proceed to the sign-in page. 

    !!! warning 
        This scenario is suitable for testing purposes, or for running a
        program on the internal networks of a company. If you want to make the
        management console available to external users, obtain a certificate signed 
        by a well-known certificate authority.

!!! note 
    If you leave the management console unattended, the session will time
    out. The **default timeout value** is **15 minutes**, but you can change this
    in the `         <IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/web.xml        `
    file as follows.
    
    ```
    <session-config>
       <session-timeout>15</session-timeout>
    </session-config>
    ```

!!! info "Restrict Access to the Management Console and Web Applications"
    You can restrict access to the management console by
    binding the management console with selected IP addresses. You can achieve this by having 
    a load balancer in your deployment prior to the server.
    
---  

## Shut the server down and restart the server

You can shutdown the server via the management or using the command terminal. Following steps 
will guide you through the procedure.

### Shut down and restart via the management console

You can use the "Shutdown/Restart" feature to shut down and restart the
server from the [management console UI](../../../deploy/get-started/get-started-with-the-management-console/). The server can be 
shut down and restarted 
"gracefully" or "forcefully." Follow the instructions below to shut down and restart the
server.


1.  Navigate to the **Main** -> **Manage** -> Click **Shutdown/Restart**.
2.  Click on the shutdown or restart option as applicable. The available
    options are:  
    
    ![Shut-Down and Restart screen](/assets/img/deploy/shutdown-restart.png)  
    
    -   **Graceful shutdown** - Stops accepting new requests, continues
        to process already received requests, and then shuts down the
        server.
    -   **Forced shutdown** - Discards any requests currently being
        processed and immediately shuts the server down
    -   **Graceful Restart** - Stops accepting new requests, continues
        to process already received requests, and then restarts the
        server.
    -   **Immediate Restart** - Discards any requests currently being
        processed and immediately restarts the server.

---

### Shut down and restart via the command window

To stop the server, press **Ctrl+C** in the command window.

!!! note
    To stop the server in the background mode of Linux, run the 
    `           wso2server.sh stop          `command.

!!! note "Restart via the command window"
    If you started the server with the `wso2server.sh` command, you will not be able to restart the 
    server from the command window.
    
    If you wish to restart the server from the command window, follow the steps given below.
    
    1. Navigate to `<IS_HOME>/bin` and start the server with the `sh wso2server.sh start` 
    command. **NOTE:** This will run the server without displaying the debug logs. 
    
        If you wish to see the logs, use the `tail -f ../repository/logs/wso2carbon.log` command. **NOTE** 
        the given path in the command, `../repository/logs/` is relative to the `bin` folder.
    
    2. To restart the server, use `sh wso2server.sh restart`. 
    
    2. To stop the server, use `sh wso2server.sh stop`. 