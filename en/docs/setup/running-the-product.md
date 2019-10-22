# Running the Product

This page covers the way to start and stop WSO2 products using the command line and 
configuring the product via the Management Console. Following 
sections will guide you through the way to run the product.


!!! tip "Before you begin"
    -   The Management Console uses the default HTTP-NIO transport, which
        is configured in the `           catalina-server.xml          ` file
        in the `           <IS_HOME>/repository/conf/tomcat          `
        directory. This transport must be properly configured in this file
        for the Management Console to be accessible.
    -   The `           config-validation.xml          ` file in the
        `           <IS_HOME>/repository/conf/etc          ` directory
        contains a list of recommended system parameters, which are
        validated against your system when the server starts. See
        [Configuring config-validation.xml](https://docs.wso2.com/display/Carbon443/Configuring+config-validation.xml)
        for details on modifying these parameters before starting the
        server.
        
!!! note
    For information on installation prerequisites, click [here](../../setup/installation-prerequisites).
    

## Starting the server

    For information on installation prerequisites, click
    [here](../../setup/installation-prerequisites).


Follow the relevant instructions based on the operating system you use.

!!! tip
    If you running multiple WSO2 products on the same server, see
    [Default Ports of WSO2 Products](../../references/default-ports-of-wso2-products) for
    instructions on setting a port offset.
    
### On Windows/Linux/Mac OS

To start the server, you run the script
`         wso2server.bat        ` (on Windows) or
`         wso2server.sh        ` (on Linux/Mac OS) from the
`         bin        ` folder. Alternatively, you can install and run

the server [as a Windows service](../../setup/installing-as-a-windows-service).

To start and stop the server in the background mode of Linux, run
**`           wso2server.sh start          `** and
**`           wso2server.sh stop          `** commands

!!! note
    If the path to the \<IS_HOME\> directory is a long one Windows will
    shorten it using " `         ~        ` ". In that case, you must set
    the actual path to the "CARBON\_HOME" variable in the
    `         <IS_HOME>/bin/wso2server.bat        ` file. Please add
    following entry at the top of
    `         <IS_HOME>/bin/wso2server.bat        ` file.
    
    ``` java
    set CARBON_HOME="<ACTUAL_PATH_OF_IS_HOME_DIRECTORY_>"
    ```
    
1.  Open a command prompt:
    -   On Windows, choose **Start -\> Run**, type
        `            cmd           ` at the prompt, and press Enter.
    -   On Linux/Mac OS, establish a SSH connection to the server or log
        in to the text Linux console.
2.  Execute one of the following commands, where
    `          <IS_HOME>         ` is the directory where you installed
    the product distribution:
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

The operation log appears. When the product server is running, the log
displays the message "WSO2 Carbon started in 'n' seconds."

#### On Solaris

To start the server, run
`         <IS_HOME>/bin/wso2server.sh        ` (on Solaris) from
the Command Prompt as described below.

!!! note
    Following instructions are tested for an Oracle Solaris 10 8/11 x86
    environment.
    

1.  Click **Launch -\>** **Run Applications,** type
    `          dtterm         ` at the Prompt, and then press **Enter**
   , to open a Command Prompt.
2.  Execute the following command:
    `          <IS_HOME>/bin/          bash          wso2server.sh.         `
3.  The operation log appears in the command window. When the product
    server has successfully started, the log displays the message "WSO2
    Carbon started in 'n' seconds".

!!! info 
    You need to do the following modification to the
    `          <IS_HOME>/bin/wso2server.sh         ` file, to start the
    product as a service/nohup mode in Solaris.

    1.  Open the `            <IS_HOME>/bin/wso2server.sh           `
        file in a text editor.
    2.  Search for the following occurrences: **nohup sh
        "$CARBON\_HOME"/bin/wso2server.sh $args \> /dev/null 2\>&1 &**
    3.  Replace those occurrences with the following: **nohup <span
        class="underline">bash</span> "$CARBON\_HOME"/bin/wso2server.sh
        $args \> /dev/null 2\>&1 &**
        
        !!! tip
            The only change is replacing `             sh            ` with
            `             bash            ` . This is required only for Solaris.
    4.  Start the product by following the above instructions.

### Accessing the management console

Once the server has started, you can access the Management Console by
opening a Web browser and typing in the management console's URL. The
URL is displayed towards the end of the server start script's console
and log. For example:

![](attachments/34611935/44179743.png) 

The URL should be in the following format:
`         https://<Server Host>:9443/carbon        `

You can use this URL to access the Management Console on this computer
from any other computer connected to the Internet or LAN. When accessing
the Management Console from the same server where it is installed, you
can type "localhost" instead of the IP address:
`                   https://localhost:9443/carbon                 ` .

!!! tip
    The Management Console URL can be changed by modifying the
    value of the `         MgtHostName        ` in the
    `         <IS_HOME>/repository/conf/carbon.xml        ` file.
    
    ``` xml
    <MgtHostName>localhost</MgtHostName>
    ```


At the sign-in screen, sign in to the Management Console using **admin**
as both the username and password. You can then use the Management
Console to manage the product. The tabs and menu items in the navigation
pane on the left may vary depending on the features you have installed.

To view information about a particular page, click the **Help** link in
the top right corner of that page, or click the **Docs** link to open
this documentation for full information on managing the product.

!!! info 
    When the Management Console Sign-in page appears, the web browser will
    typically display an "insecure connection" message, which requires your
    confirmation before you can continue.

    The Management Console is based on HTTPS protocol, which is a
    combination of HTTP and SSL protocols. This protocol is generally used
    to encrypt the traffic from the client to server for security reasons.
    The certificate it works with is used for encryption only, and does not
    prove the server identity, so when you try to access the Management
    Console, a warning of untrusted connection is usually displayed. To
    continue working with this certificate, some steps should be taken to
    "accept" the certificate before access to the site is permitted. If you
    are using the Mozilla Firefox browser, this usually occurs only on the
    first access to the server, after which the certificate is stored in the
    browser database and marked as trusted. With other browsers, the
    insecure connection warning might be displayed every time you access the
    server.

    This scenario is suitable for testing purposes, or for running the
    program on the company's internal networks. If you want to make the
    Management Console available to external users, your organization should
    obtain a certificate signed by a well-known certificate authority, which
    verifies that the server actually has the name it is accessed by and
    that this server belongs to the given organization.

If you leave the Management Console unattended, the session will time
out. The default timeout value is 15 minutes, but you can change this
in the
`         <IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/web.xml        `
file as follows:

``` html/xml
<session-config>
   <session-timeout>15</session-timeout>
</session-config>
```

!!! info "Restricting Access to the Management Console and Web Applications:"
    You can restrict access to the management console of your product by
    binding the management console with selected IP addresses. Note that you
    can either restrict access to the management console only, or you can
    restrict access to all web applications in your server as explained
    below.

    -   To control access only to the management console, add the IP
        addresses to the
        `            <IS_HOME>/repository/conf/tomcat/carbon/META-INF/context.xml           `
        file as follows:  

        ``` java
        <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="<IP-address-01>|<IP-address-02>|<IP-address-03>"/>
        ```

        The `            RemoteAddrValve           ` Tomcat valve defined in
        this file will only apply to the Carbon management console, and
        thereby all outside requests to the management console will be
        blocked.

    -   To control access to all web applications deployed in your server,
        add the IP addresses to the
        `            <IS_HOME>/repository/conf/context.xml           `
        file as follows:  

        ``` java
        <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="<IP-address-01>|<IP-address-02>|<IP-address-03>"/>
        ```

        The `            RemoteAddrValve           ` Tomcat valve defined in
        this file will apply to each web application hosted on the Carbon
        server. Therefore, all outside requests to any web application will
        be blocked.  

    -   You can also restrict access to particular servlets in a web
        application by adding a Remote Address Filter to the
        `            web.xml           ` file (stored in the
        `            <IS_HOME>/repository/conf/tomcat/           `
        directory), and by mapping that filter to the servlet url. In the
        Remote Address Filter that you add, you can specify the IP addresses
        that should be allowed to access the servlet.


        The following example from a web.xml file illustrates how access to
        the management page (
        `            /carbon/admin/login.jsp           ` ) is granted only
        to one IP address:  
        ``` java
        <filter>
            <filter-name>Remote Address Filter</filter-name>
            <filter-class>org.apache.catalina.filters.RemoteAddrFilter</filter-class>
                <init-param>
                    <param-name>allow</param-name>
                    <param-value>127.0.01</param-value>
                </init-param>
        </filter>

        <filter-mapping>
            <filter-name>Remote Address Filter</filter-name>
            <url-pattern>/carbon/admin/login.jsp</url-pattern>
        </filter-mapping>
        ```

    **Note:** Any configurations (including valves) defined in the
    `          <IS_HOME>/repository/conf/tomcat/catalina-server.xml         `
    file applies to all web applications and is globally available across
    server, regardless of host or cluster. See the official Tomcat
    documentation for more information about using [remote host
    filters](http://tomcat.apache.org/tomcat-7.0-doc/config/valve.html#Remote_Host_Filter)
    .

### Stopping the server
To stop the server, press **Ctrl+C** in the command window, or click the
**Shutdown/Restart** link in the navigation pane in the Management
Console.
