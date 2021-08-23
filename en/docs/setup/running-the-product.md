# Running the Product

This page covers the way to start and stop WSO2 products using the command line and 
configuring the product via the Management Console. Following 
sections will guide you through the way to run the product.

- Starting the server 
- Accessing the management console 
- Stopping the server
        
!!! note
    For information on installation prerequisites, click [here](../../setup/installation-prerequisites).
    

## **Starting the server**

Follow the relevant instructions based on the operating system you use.

!!! tip
    If you running multiple WSO2 products on the same server, see
    [Default Ports of WSO2 Products](../../references/default-ports-of-wso2-products) for
    instructions on setting a port offset.
    
### **Starting on Windows/Linux/Mac OS**

To start the server, you have to run either 

-  `         wso2server.bat        ` (on Windows) or
- `         wso2server.sh        ` (on Linux/Mac OS) script, 

which are located inside
`         <IS_HOME>/bin        ` folder. Alternatively, you can install and run
the server [as a Windows service](../../setup/installing-as-a-windows-service/).

!!! note
    To start the server in the background mode of Linux, run
    `           wso2server.sh start          ` command.

!!! warning
    
    If the path to the <IS_HOME> directory is a long, Windows will
    shorten it using " `         ~        ` ". In that case, you **MUST** set
    the actual path to the `CARBON_HOME` variable in the
    `         <IS_HOME>/bin/wso2server.bat        ` file. Please add
    following entry at the top of
    `         <IS_HOME>/bin/wso2server.bat        ` file.
    
    ``` java
    set CARBON_HOME="<ACTUAL_PATH_OF_IS_HOME_DIRECTORY_>"
    ```
    
1.  Open a command prompt:
    -   Windows: **Start -\> Run**, type
        `            cmd           ` at the prompt, and press Enter.
    -   Linux/Mac OS: establish a SSH connection to the server or log
        in to the text Linux console.
2.  Execute one of the following commands, to start the server. 
    -   On Windows:
        `            <IS_HOME>/bin/wso2server.bat --run           `
    -   On Linux/Mac OS:
        `             sh <IS_HOME>/bin/wso2server.sh                         `


        !!! info 
            If you want to provide access to the production environment
            without allowing any user group (including admin) to log into
            the management console, execute one of the following commands.

            -   On Windows:
                `               <IS_HOME>\bin\wso2server.bat --run -DworkerNode              `
            -   On Linux/Mac OS:
                `               sh <IS_HOME>/bin/wso2server.sh -DworkerNode              `

            For additional options you can use with these startup commands,
            type `              -help             ` after the command, such
            as:
            `              sh <IS_HOME>/bin/wso2server.sh -help             `

Once the server has started, the operation log will display `WSO2 Carbon started 
in 'n' seconds`


### **Starting on Solaris**
To start the server, navigate to `         <IS_HOME>/bin        `
and run `        wso2server.sh        `  from
the Command Prompt. The required steps are as follows.


!!! note
    
    The following instructions are tested for an Oracle Solaris 10 8/11 x86
    environment.
    
1.  Get Command Prompt: **Launch -\>** **Run Applications -\>** type
    `          dtterm         ` **-\>** press **Enter**.
2.  Execute the following command to start the server

 
    `          <IS_HOME>/bin/          bash          wso2server.sh. `
    
    
3.  The operation log appears in the command window. When the product
    server has successfully started, the log displays the message "WSO2
    Carbon started in 'n' seconds".

!!! info 
    To start the product as a service/nohup mode in Solaris, 
    do the following modification to the `<IS_HOME>/bin/wso2server.sh` file.

    1.  Open the `            <IS_HOME>/bin/wso2server.sh           `
        file in a text editor.
    2.  Search for the following occurrences: **nohup sh
        "$CARBON\_HOME"/bin/wso2server.sh $args \> /dev/null 2\>&1 &**
    3.  Replace those occurrences with the following: **nohup <span
        class="underline">bash</span> "$CARBON\_HOME"/bin/wso2server.sh
        $args \> /dev/null 2\>&1 &**
        
        !!! tip
            Replace `sh` with `bash` in above occurences.
    4.  Start the product.

## **Accessing the management console**

Once the server has started, you can access the Management Console by navigating 
to the URL of the management console. The URL is displayed towards the end of the 
server start script's console and log. The URL should be in the following format.

`         https://<Server Host>:9443/carbon        `

Use the above URL to access the Management Console via any computer connected to 
the Internet or LAN. When accessing the Management Console from the same server 
where it is installed, type "localhost" instead of the IP address. Use **admin** 
as both the username and password to log in to the management console.

Example: `                   https://localhost:9443/carbon                 ` .

!!! tip

    If you wish to change the url of the management console, click [here.](../../setup/changing-the-hostname/)

!!! info 
    When the Management Console Sign-in page appears, the web browser will
    typically display an "Insecure Connection" message, since the IS is 
    packed with a self-signed certificate. Therefore, ACCEPT the certificate
    and proceed to the management console Sign-in page. 

    !!! warning 
        This scenario is suitable for testing purposes, or for running a
        program on the internal networks of a company. If you want to make the
        Management Console available to external users, obtain a certificate signed 
        by a well-known certificate authority.

!!! note 
    If you leave the Management Console unattended, the session will time
    out. The **default timeout value** is **15 minutes**, but you can change this
    in the `         <IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/web.xml        `
    file as follows:
    
    ```
    <session-config>
       <session-timeout>15</session-timeout>
    </session-config>
    ```

!!! info "Restricting Access to the Management Console and Web Applications:"
    You can restrict access to the management console by
    binding the management console with selected IP addresses. You can achieve this by having 
    a load balancer in your deployment prior to the server.
    
    

## **Shutting down and Restarting the server**

You can shutdown the server via the management or using the command terminal. Following steps 
will guide you through the procedure.

### **Shut down and Restart via the management console**

You can use the "Shutdown/Restart" feature to shut down and restart the
server from the [management console UI](../../setup/getting-started-with-the-management-console/). The server can be 
shut down and restarted 
"gracefully" or "forcefully." Follow the instructions below to shut down and restart the
server.


1.  Navigate to the **Main** -> **Manage** -> Click **Shutdown/Restart**.
2.  Click on the shutdown or restart option as applicable. The available
    options are:  
    
    ![Shut-Down and Restart screen](../assets/img/setup/shutdown-restart.png)  
    
    -   **Graceful shutdown** - Stops accepting new requests, continues
        to process already received requests, and then shuts down the
        server.
    -   **Forced shutdown** - Discards any requests currently being
        processed and immediately shuts down the server.
    -   **Graceful Restart** - Stops accepting new requests, continues
        to process already received requests, and then restarts the
        server.
    -   **Immediate Restart** - Discards any requests currently being
        processed and immediately restarts the server.

### **Shut down and Restart via the command window**

To stop the server, press **Ctrl+C** in the command window.

!!! note
    To stop the server in the background mode of Linux, run
    `           wso2server.sh stop          `command.
!!! note "Restart via the command window"
    If you have started the server with the `wso2server.sh` command, you will not be able to restart the 
    server from the command window.
    
    If you wish to restart the server from the command window, flow the proceeding steps.
    
    1. Navigate to `<IS_HOME>/bin` and start the server with `sh wso2server.sh start` 
    command. **NOTE:** This will run the server without displaying the debug logs. 
    
        If you wish to see the logs, use `tail -f ../repository/logs/wso2carbon.log` command. **NOTE** 
        the given path in the command, `../repository/logs/` is relative to the `bin` folder.
    
    2. To restart the server use `sh wso2server.sh restart` command. Then the 
    server will restart.
    
    2. To stop the server use `sh wso2server.sh stop` command. 
