# Install WSO2 Identity Server

## Prerequisites
Prior to installing any WSO2 Identity Server, it is necessary to
have the appropriate prerequisite software installed on your system.
Verify that the computer has the supported operating system and
development platforms before starting the installation.

### System requirements

!!! Note

    The below recommendations can change based on the expected concurrency & performance.

<table>
<tbody>
<tr class="odd">
<th><p>CPU</p></th>
<td><p>4 vCPUs (x86_64 Architecture)</p></td>
</tr>
<tr class="even">
<th><p>Memory</p></th>
<td><p>4 GB RAM</p></td>
</tr>
<tr class="odd">
<th><p>Disk</p></th>
<td><p>~ 10 GB disk space, excluding space allocated for log files and databases.</p></td>
</tr>
</tbody>
</table>

### Environment compatibility

<table>
<colgroup>
<col style="width: 13%" />
<col style="width: 86%" />
</colgroup>
<tbody>
<tr class="odd">
<th><p>Operating Systems/ Databases/ Userstores</p></th>
<td><div class="content-wrapper">
<ul>
<li>WSO2 Identity Server requires an Oracle JDK 11 or JDK 17 compliant JDK. This will run on most common platforms that <strong>support Java 11 or Java 17.</strong> .</li>
<li>All WSO2 Carbon-based products are generally compatible with most common DBMSs. The embedded H2 database is suitable for development and testing. For enterprise production environments we recommend an industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, MS SQL, etc. For more information, see <a href="{{base_path}}/deploy/work-with-databases">Work with Databases</a>.</li>
<li>WSO2 Identity Server supports using any of the following as a userstore :
<ul>
<li>RDBMS</li>
<li>An LDAP such as OpenLDAP</li>
<li>Active Directory</li>
<li><a href="{{base_path}}/deploy/configure-user-stores">Custom Userstores</a></li>
</ul></li>
</ul>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>
<ul>
<li>WSO2 does not recommend using the H2 database as a user store in production environments. However, you can use the H2 database for development purposes if necessary.</li>
</ul>
</p>
</div>
<ul> 
<li>For environments that WSO2 products are tested with, see <a href="{{base_path}}/deploy/environment-compatibility">Environment Compatibility</a> .</li>
<li>If you have difficulty setting up any WSO2 product in a specific platform or database, <a href="https://wso2.com/contact/">contact WSO2</a>.</li>
</ul>
</div></td>
</tr>
</tbody>
</table>

### Required applications

The following applications are required for running the product and its
samples or for building from the source code.

!!! note
    
    The applications marked with an asterisk \* are mandatory.

#### Required applications to run the product

These applications are mandatory and are required to run the binary
distribution of the WSO2 product. The binary distribution contains the
binary files for both MS Windows, and Linux-based operating systems.

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 43%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Application</p></th>
<th><p>Purpose</p></th>
<th><p>Version</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>Java SE Development Kit (JDK)*</strong></p></td>
<td><ul>
<li>To launch the product as each product is a Java application.</li>
<li>To <a href="https://wso2.github.io/using-maven.html">build the product from the source distribution</a> (both JDK and Apache Maven are required).</li>
<li>To run Apache Ant.</li>
</ul></td>
<td><div class="content-wrapper">
<ul>
<li><p>Oracle JDK 11</p></li>
<li><p>OpenJDK 11</p></li>
</ul>
</div></td>
<td><div class="line number1 index0 alt2">
<a href="https://openjdk.java.net/install/">OpenJDK</a>
</div>
<div class="line number1 index0 alt2">
<a href="http://java.sun.com/javase/downloads/index.jsp">Oracle JDK</a>
</div></td>
</tr>
<tr class="even">
<td><p><strong>Web Browser*</strong></p></td>
<td><div class="content-wrapper">
<ul>
<li>To access the product's <a href="{{base_path}}/deploy/get-started/run-the-product">Management Console</a>. The Web Browser must be JavaScript enabled to take full advantage of the Management console.</li>
</ul>
<div class="admonition note">
<p><strong>Note:</strong> On Windows Server 2003, you must not go below the medium security level in Internet Explorer 6.x.</p>
</div>    
</div></td>
<td><p><br />
</p></td>
<td><br />
</td>
</tr>
</tbody>
</table>

#### Required applications to run samples and build from source

These applications are required for [building the product from the
source distribution](https://wso2.github.io/using-maven.html),
and compiling and running product samples.

!!! warning

    If you are installing by downloading and extracting the binary distribution (as recommended for most users) instead of building from the source code, you do not need to install Maven.

<table style="width:100%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 55%" />
<col style="width: 13%" />
<col style="width: 19%" />
</colgroup>
<thead>
<tr class="header">
<th>Application
<p><br />
</p></th>
<th>Purpose</th>
<th>Version</th>
<th>Download Links</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>Apache Maven</strong></p></td>
<td><ul>
<li>To build the product from the source distribution (NOTE: both JDK and Apache Maven are required).<br />
<br />
</ul></td>
<td><p>3.0.x or later</p></td>
<td><p><a href="http://maven.apache.org/">Apache Maven</a></p></td>
</tr>
</tbody>
</table>

----

## Install on different platforms 

### Install on Linux or OS X

Follow the instructions below to install WSO2 Identity Server on Linux
or Mac OS X.

#### Install the required applications

1.  Log in to the command line (Terminal on Mac).

2.  Ensure that your system meets the [Installation Prerequisites](#prerequisites).  Java Development Kit
    (JDK) is essential to run the product.

#### Install WSO2 Identity Server

{!./includes/install-is.md !}

    !!! warning
    
        If you are using Mac OS with High Sierra, you may encounter the
        following warning message when logging in to the management console
        due to a compression issue that exists in the High Sierra SDK.
    
        ``` java
        WARN {org.owasp.csrfguard.log.JavaLogger} -  potential cross-site request forgery (CSRF) attack thwarted (user:<anonymous>, ip:xxx.xxx.xx.xx, method:POST, uri:/carbon/admin/login_action.jsp, error:required token is missing from the request)
        ```
    
        To avoid this issue,    
        1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.   
		2. 	Set the `compression` element under the HTTPS connector configuration to `off`.   
			
			```
			[transport.https]
			...
			compression="off"
			...           
			```
           	
			!!! note
				If the above configuration is not listed in `deployment.toml`, add the above configuration manually.
        
		3.	Restart WSO2 Identity Server.   
    

#### Set up JAVA_HOME

You must set your `         JAVA_HOME        ` environment variable to
point to the directory where the Java Development Kit (JDK) is installed
on the computer.

Setting `JAVA_HOME` is a standard practice when you are using Java based programs. You may not need to do this manually depending on your Java Installer, as this variable is usually set by the Java installer itself. This guide is provided in case the `JAVA_HOME variable` has not been set or is incorrectly set on your machine.

!!! info
    Environment variables are global system variables accessible by all the processes running under the operating system.

1.  In your home directory, open the BASHRC file (.bash\_profile file 
    on Mac) using editors such as vi, emacs, pico, or mcedit.
2.  Assuming you have JDK 11.0.14 in your system, add the following
    two lines at the bottom of the file, replacing
    `/usr/java/jdk-11.0.14` with the actual
    directory where the JDK is installed.

    ```java tab="Linux"
    export JAVA_HOME=/usr/java/jdk-11.0.14
    export PATH=${JAVA_HOME}/bin:${PATH}
	```
    
	```java tab="OS X"
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.14/Contents/Home
    ```

3.  Save the file.

    !!! info
        If you do not know how to work with text editors in a Linux SSH session, run the following command: `cat >> .bashrc.`. Paste the string from the clipboard and press Ctrl+D.

4.  To verify that the `           JAVA_HOME          ` variable is set
    correctly, execute the following command:

    ```java	tab="Linux"
    echo $JAVA_HOME
	```
    
    ```java tab="OS X"
    which java
    ```

    If the above command gives you a path like /usr/bin/java, then it is a symbolic link to the real location. To get the real location, run the following:
    
    ```
    ls -l `which java`
    ```

5.  The system returns the JDK installation path.

#### Set system properties

{!./includes/set-system-properties.md !}

---

### Install on Solaris

Follow the instructions below to install Identity Server on Solaris.

#### Install the required applications

1.  Establish an SSH connection to the Solaris machine or log in on the
    text console.
2.  Be sure your system meets the [Installation Prerequisites](#prerequisites).  Java Development Kit (JDK) is essential to run the product.

#### Install WSO2 Identity Server

{!./includes/install-is.md !}

#### Set up JAVA_HOME

You must set your `         JAVA_HOME        ` environment variable to
point to the directory where the Java Development Kit (JDK) is installed
on the computer.

Setting `JAVA_HOME` is a standard practice when you are using Java based programs. You may not need to do this manually depending on your Java Installer, as this variable is usually set by the Java installer itself. This guide is provided in case the `JAVA_HOME variable` has not been set or is incorrectly set on your machine.

!!! info
    Environment variables are global system variables accessible by all the processes running under the operating system.

1.  In your home directory, open the BASHRC file in your favorite text
    editor, such as vi, emacs, pico, or mcedit.
2.  Assuming you have JDK 1.8.0_141 in your system, add the following
    two lines at the bottom of the file, replacing
    `/usr/java/jdk-11.0.14` with the actual
    directory where the JDK is installed.

    ``` java
    export JAVA_HOME=/usr/java/jdk-11.0.14
    export PATH=${JAVA_HOME}/bin:${PATH}
    ```

3.  Save the file.

    !!! info
        If you do not know how to work with text editors in an SSH session, run the following command.
        ```
        cat >> .bashrc
        ``` 
        Paste the string from the clipboard and press "Ctrl+D".

4.  To verify that the `          JAVA_HOME         ` variable is set
    correctly, execute the following command.
    ```
    echo $JAVA_HOME
    ```

    ![Echo command]({{base_path}}/assets/img/deploy/echo-command.png)

5.  The system returns the JDK installation path.

#### Set system properties

{!./includes/set-system-properties.md !}

----

### Install on Windows   

Follow the instructions below to install the WSO2 Identity Server on
Windows.

#### Install the required applications

1.  Ensure that your system meets the requirements specified in the
    [Installation Prerequisites](#prerequisites).  Java
    Development Kit (JDK) is essential to run the product.
2.  Ensure that the `          PATH         ` environment variable is
    set to `          C:\Windows\System32         `, because the
    `          findstr         ` Windows.exe file is stored in this
    path.

#### Install WSO2 Identity Server

{!./includes/install-is.md !}

3.  Set the `          CARBON_HOME         ` environment variable by
    pointing it to the directory where you download WSO2 Identity Server
    into. For more information on how to do this, see
    [here](https://www.java.com/en/download/help/path.xml).

#### Set up JAVA_HOME

You must set your `         JAVA_HOME        ` environment variable to
point to the directory where the Java Development Kit (JDK) is installed
on the computer. Typically, the JDK is installed in a directory under
`         C:/Program Files/Java        `, such as
`C:/Program Files/Java/jdk-11.0.14` . If you have
multiple versions installed, choose the latest one, which you can find
by sorting by date.

!!! info 
    Environment variables are global system variables accessible by all the
    processes running under the operating system. You can define an
    environment variable as a system variable, which applies to all users,
    or as a user variable, which applies only to the user who is currently
    logged in.

You set up `JAVA_HOME` using the System Properties, as described below.
Alternatively, if you just want to set JAVA_HOME temporarily for the
current command prompt window, [set it at the command
prompt](#java-home).

##### Set up JAVA_HOME using the system properties

1.  Right-click the **My Computer** icon on the desktop and choose
    **Properties**.  

    ![Properties option]({{base_path}}/assets/img/deploy/properties-option.png) 

2.  In the System Properties window, click the **Advanced** tab, and
    then click the **Environment Variables** button.  

    ![Advanced tab]({{base_path}}/assets/img/deploy/advanced-tab.png) 

3.  Click the **New** button under **System variables** (for all users) or
    under **User variables** (just for the user who is currently logged
    in).  

    ![New button]({{base_path}}/assets/img/deploy/new-button.png) 

4.  Enter the following information:  
    -   In the **Variable name** field, enter:
        `            JAVA_HOME           `
    -   In the **Variable value** field, enter the installation path of
        the Java Development Kit, such as:
        `            c:/Program Files/Java           `
        `            jdk-11.0.14           `

The `JAVA_HOME` variable is now set and will apply to any subsequent
command prompt windows you open. If you have existing command prompt
windows running, you must close and reopen them for the JAVA_HOME
variable to take effect, or manually set the JAVA_HOME variable in
those command prompt windows as described in the next section. To verify
that the `         JAVA_HOME        ` variable is set correctly, open a
command window (from the **Start** menu, click **Run**, and then type
`         CMD        ` and click **Enter** ) and execute the following
command.

```java
set JAVA_HOME
```

The system returns the JDK installation path. You are now ready to [run
the product.]({{base_path}}/deploy/get-started/run-the-product)

<a name="java-home"></a>

##### Set JAVA_HOME temporarily using the Windows command prompt (CMD)

You can temporarily set the `         JAVA_HOME        ` environment
variable within a Windows command prompt window (CMD). This is useful
when you have an existing command prompt window running and you do not
want to restart it.

1.  In the command prompt window, enter the following command where
    `           <JDK_INSTALLATION_PATH>          ` is the JDK
    installation directory and press **Enter.**
    
    !!! abstract ""
        **Format**
        ```java
        set JAVA_HOME=<JDK_INSTALLATION_PATH>
        ```
        ---
        **Example**
        ```java
        set JAVA_HOME=c:/Program Files/java/jdk-11.0.14
        ```

    The `JAVA_HOME variable is now set for the current CMD session only.

2.  To verify that the `          JAVA_HOME         ` variable is set
    correctly, execute the following command:  

    ```java
    set JAVA_HOME
    ```

3.  The system returns the JDK installation path.

#### Set system properties

{!./includes/set-system-properties.md !}

---

### Install as a Linux Service

WSO2 Carbon and any Carbon-based product can be run as a Linux service
as described in the following sections:

#### Prerequisites

Install JDK and set up the `         JAVA_HOME        ` environment
variable. For more information, see
[Installation Prerequisites](#prerequisites).

#### Set up CARBON_HOME

Extract the WSO2 product that you want to run as a Linux service and set
the environment variable `         CARBON_HOME        ` to the extracted
product directory location.

#### Run the product as a Linux service

1.  To run the product as a service, create a startup script and add it
    to the boot sequence. The basic structure of the startup script has
    three parts (i.e., start, stop and restart) as follows:

    ``` java
    #!/bin/bash
     
    case "$1″ in
    start)
       echo "Starting Service"
    ;;
    stop)
       echo "Stopping Service"
    ;;
    restart)
       echo "Restarting Service"
    ;;
    *)
       echo $"Usage: $0 {start|stop|restart}"
    exit 1
    esac
    ```

    ??? note "Click to view an example startup script written for WSO2 Identity Server 5.9.0"
        ``` java
        #! /bin/sh
        ### BEGIN INIT INFO
        # Provides:          wso2is
        # Required-Start:    $all
        # Required-Stop:
        # Default-Start:     2 3 4 5
        # Default-Stop:
        # Short-Description: starts the wso2 identity server
        ### END INIT INFO
        export JAVA_HOME="/usr/lib/jvm/jdk-11.0.14"

        startcmd='/opt/WSO2/wso2is-5.9.0/bin/wso2server.sh start > /dev/null &'
        restartcmd='/opt/WSO2/wso2is-5.9.0/bin/wso2server.sh restart > /dev/null &'
        stopcmd='/opt/WSO2/wso2is-5.9.0/bin/wso2server.sh stop > /dev/null &'

        case "$1" in
        start)
        echo "Starting WSO2 Identity Server ..."
        su -c "${startcmd}" user1
        ;;
        restart)
        echo "Re-starting WSO2 Identity Server ..."
        su -c "${restartcmd}" user1
        ;;
        stop)
        echo "Stopping WSO2 Identity Server ..."
        su -c "${stopcmd}" user1
        ;;
        *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        esac
        ```

    In the above script, the server is started as a user by the name
    user1 rather than the root user. For example,
    `           su -c "${startcmd}" user1          `

2.  Add the script to `           /etc/init.d/          ` directory.

    If you want to keep the scripts in a location other than
    `            /etc/init.d/           ` folder, you can add a symbolic
    link to the script in `            /etc/init.d/           ` and keep
    the actual script in a separate location. Say your script name is
    identityserver and it is in `            /opt/WSO2/           `
    folder, then the commands for adding a link to
    `            /etc/init.d/           ` is as follows:

    -   Make executable:
        `              sudo chmod a+x /opt/WSO2/identityserver             `

    -   Add a link to `             /etc/init.d/            ` :
        `             sudo ln -snf /opt/WSO2/identityserver /etc/init.d/identityserver            `

3.  Install the startup script to respective runlevels using the command
    `           update-rc.d          ` . For example, give the following
    command for the sample script shown in step1:

    ``` java
    sudo update-rc.d identityserver  defaults 
    ```

      
    The `           defaults          ` option in the above command
    makes the service to start in runlevels 2,3,4 and 5 and to stop in
    runlevels 0,1 and 6.

    !!! info 
        A **runlevel** is a mode of operation in Linux (or any Unix-style
        operating system). There are several runlevels in a Linux server and
        each of these runlevels is represented by a single digit integer.
        Each runlevel designates a different system configuration and allows
        access to a different combination of processes.

4.  You can now start, stop and restart the server using
    `           service <service name>          `
    `           {start|stop|restart}          ` command. You will be
    prompted for the password of the user (or root) who was used to
    start the service.

---

### Install as a Windows Service

Any Java-based application, including WSO2 Carbon and Carbon-based
products, can be run as a Windows service by using a bridging tool such
as _Yet Another Java Service Wrapper (YAJSW)_.

!!! info
    As YAJSW is distributed under the LGPL license and WSO2 is
    distributed under the Apache2 license, these two cannot be packed
    together in a distribution. However, any end-user or customer can freely
    combine components under these two licenses as long as the combined work
    is not distributed. The following instructions will guide you via the process 
    of using YAJSW to install WSO2 Identity Server as a Windows Service.

Follow the instructions in the sections below to set it up.

#### Prerequisites

-   Install JDK and set up the `          JAVA_HOME         `
    environment variable. For more information, see
    [Installation Prerequisites](#prerequisites).
-   Download and install a service wrapper library for running
    WSO2 Identity Server as a Windows service. WSO2 recommends _Yet Another
    Java Service Wrapper_ (
    [YAJSW](http://sourceforge.net/projects/yajsw/) ) version 13.03, and
    several WSO2 products provide a default
    `          wrapper.conf         ` file in their
    `          <PRODUCT_HOME>/bin/yajsw/         ` directory. The
    following instructions describe how to set up this file.

#### Set up the YAJSW wrapper configuration file

`         wrapper.conf        ` file is used for wrapping Java Applications by YAJSW.
 The `         wrapper.conf        ` file found in the
`         <IS_HOME>/bin/yajsw/        ` directory holds the minimal
configuration for running a WSO2 product as a Windows Service.

1.  Copy the `           wrapper.conf          ` file found in the
    `           <IS_HOME>/bin/yajsw/          ` directory and paste
    it in the `           <YAJSW_HOME>/conf/          ` directory.  
    A sample `           wrapper.conf          ` file that is
    packed with the WSO2 product is given below.

    !!! info
        If you wish to set additional properties from an external registry
        at runtime, store sensitive information like usernames and passwords
        for connecting to the registry in a properties file, and secure it
        with the [cipher tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).

    ??? note "Click to view a sample"

        ```bash tab="Minimal wrapper.conf configuration"
        #********************************************************************
        # working directory
        #********************************************************************
        wrapper.working.dir=${carbon_home}/
        # Java Main class.
        # YAJSW: default is "org.rzo.yajsw.app.WrapperJVMMain"
        # DO NOT SET THIS PROPERTY UNLESS YOU HAVE YOUR OWN IMPLEMENTATION
        # wrapper.java.mainclass=
        #********************************************************************
        # tmp folder
        # yajsw creates temporary files named in_.. out_.. err_.. jna..
        # per default these are placed in jna.tmpdir.
        # jna.tmpdir is set in setenv batch file to <yajsw>/tmp
        #********************************************************************
        wrapper.tmp.path = ${jna_tmpdir}
        #********************************************************************
        # Application main class or native executable
        # One of the following properties MUST be defined
        #********************************************************************
        # Java Application main class
        wrapper.java.app.mainclass=org.wso2.carbon.bootstrap.Bootstrap
        # Log Level for console output.  (See docs for log levels)
        wrapper.console.loglevel=INFO
        # Log file to use for wrapper output logging.
        wrapper.logfile=${wrapper_home}\/log\/wrapper.log
        # Format of output for the log file.  (See docs for formats)
        #wrapper.logfile.format=LPTM
        # Log Level for log file output.  (See docs for log levels)
        #wrapper.logfile.loglevel=INFO
        # Maximum size that the log file will be allowed to grow to before
        #  the log is rolled. Size is specified in bytes.  The default value
        #  of 0, disables log rolling by size.  May abbreviate with the 'k' (kB) or
        #  'm' (mB) suffix.  For example: 10m = 10 megabytes.
        # If wrapper.logfile does not contain the string ROLLNUM it will be automatically added as suffix of the file name
        wrapper.logfile.maxsize=10m
        # Maximum number of rolled log files which will be allowed before old
        #  files are deleted.  The default value of 0 implies no limit.
        wrapper.logfile.maxfiles=10
        # Title to use when running as a console
        wrapper.console.title=WSO2 Carbon
        #********************************************************************
        # Wrapper Windows Service and Posix Daemon Properties
        #********************************************************************
        # Name of the service
        wrapper.ntservice.name=WSO2CARBON
        # Display name of the service
        wrapper.ntservice.displayname=WSO2 Carbon
        # Description of the service
        wrapper.ntservice.description=Carbon Kernel
        #********************************************************************
        # Wrapper System Tray Properties
        #********************************************************************
        # enable system tray
        wrapper.tray = true
        # TCP/IP port. If none is defined multicast discovery is used to find the port
        # Set the port in case multicast is not possible.
        wrapper.tray.port = 15002
        #********************************************************************
        # Exit Code Properties
        # Restart on non zero exit code
        #********************************************************************
        wrapper.on_exit.0=SHUTDOWN
        wrapper.on_exit.default=RESTART
        #********************************************************************
        # Trigger actions on console output
        #********************************************************************
        # On Exception show message in system tray
        wrapper.filter.trigger.0=Exception
        wrapper.filter.script.0=${wrapper_home}/scripts/trayMessage.gv
        wrapper.filter.script.0.args=Exception
        #********************************************************************
        # genConfig: further Properties generated by genConfig
        #********************************************************************
        placeHolderSoGenPropsComeHere=
        wrapper.java.command = java
        wrapper.java.classpath.1 = ${carbon_home}/bin/*.jar
        wrapper.java.classpath.2 = ${carbon_home}/lib/commons-lang-*.jar
        wrapper.java.classpath.3 = ${carbon_home}/lib/*.jar
        wrapper.app.parameter.1 = org.wso2.carbon.bootstrap.Bootstrap
        wrapper.app.parameter.2 = RUN
        wrapper.java.additional.1 = -Xbootclasspath/a:${carbon_home}/lib/xboot/*.jar
        wrapper.java.additional.2 = -Xms256m
        wrapper.java.additional.3 = -Xmx1024m
        wrapper.java.additional.4 = -XX:+HeapDumpOnOutOfMemoryError
        wrapper.java.additional.5 = -XX:HeapDumpPath=${carbon_home}/repository/logs/heap-dump.hprof
        wrapper.java.additional.6 = -Dcom.sun.management.jmxremote
        wrapper.java.additional.7 = -Dcarbon.registry.root=\/
        wrapper.java.additional.8 = -Dcarbon.home=${carbon_home}
        wrapper.java.additional.9 = -Dwso2.server.standalone=true
        wrapper.java.additional.10 = -Djava.command=${java_home}/bin/java
        wrapper.java.additional.11 = -Djava.io.tmpdir=${carbon_home}/tmp
        wrapper.java.additional.12 = -Dcatalina.base=${carbon_home}/lib/tomcat
        wrapper.java.additional.13 = -Djava.util.logging.config.file=${carbon_home}/repository/conf/etc/logging-bridge.properties
        wrapper.java.additional.14 = -Dcarbon.config.dir.path=${carbon_home}/repository/conf
        wrapper.java.additional.15 = -Dcarbon.logs.path=${carbon_home}/repository/logs
        wrapper.java.additional.16 = -Dcomponents.repo=${carbon_home}/repository/components/plugins
        wrapper.java.additional.17 = -Dconf.location=${carbon_home}/repository/conf
        wrapper.java.additional.18 = -Dcom.atomikos.icatch.file=${carbon_home}/lib/transactions.properties
        wrapper.java.additional.19 = -Dcom.atomikos.icatch.hide_init_file_path=true
        wrapper.java.additional.20 = -Dorg.apache.jasper.runtime.BodyContentImpl.LIMIT_BUFFER=true
        wrapper.java.additional.21 = -Dcom.sun.jndi.ldap.connect.pool.authentication=simple
        wrapper.java.additional.22 = -Dcom.sun.jndi.ldap.connect.pool.timeout=3000
        wrapper.java.additional.23 = -Dorg.terracotta.quartz.skipUpdateCheck=true
        wrapper.java.additional.24 = -Dorg.apache.jasper.compiler.Parser.STRICT_QUOTE_ESCAPING=false
        wrapper.java.additional.25 = -Dfile.encoding=UTF8
        wrapper.java.additional.26 = -DworkerNode=false
        wrapper.java.additional.27 = -Dhttpclient.hostnameVerifier=DefaultAndLocalhost
        wrapper.java.additional.28 = -Dcarbon.new.config.dir.path=${carbon_home}/repository/resources/conf
        ```

#### Set up carbon_home

Extract the Carbon-based product that you want to run as a Windows
service, and then set the Windows environment variable ` carbon_home `
to the extracted product directory location. For example, if you want to
run WSO2 IS 5.11.0 as a Windows service, you would set ` carbon_home ` to the
extracted ` wso2is-5.11.0 ` directory.

![Edit System Variable window]({{base_path}}/assets/img/deploy/add-carbon-home-system-variable-window.png)

#### Run the product in console mode

You will now verify that YAJSW is configured correctly for running the
Carbon-based product as a Windows service.

1.  Open a Windows command prompt and go to the
    `           <YAJSW_HOME>/bat/          ` directory. For example:

    ``` java
    cd C:\Documents and Settings\yajsw_home\bat
    ```

2.  Start the wrapper in console mode using the following command:

    ``` java
    runConsole.bat
    ```

    If the configurations are set properly for YAJSW, you will see console
    output similar to the following. Now you can access the WSO2 management
    console from your web browser via <https://localhost:9443/carbon>.

    ![Console output]({{base_path}}/assets/img/deploy/console-output.png)

#### Work with the WSO2CARBON service

To install the Carbon-based product as a Windows service, open a console with administrative privileges and execute the
following command in the `         <YAJSW_HOME>/bat/        ` directory:

``` java
installService.bat
```

The console will display a message confirming that
the WSO2CARBON service has been installed.

![Service installation confirmation]({{base_path}}/assets/img/deploy/service-installation-confirmation.png)

To start the service, execute the following command in the same console
window (with administrative privileges):

``` java
startService.bat
```

The console will display a message confirming that
the WSO2CARBON service has been started.

![Service startup message]({{base_path}}/assets/img/deploy/service-startup-message.png)

To stop the service, execute the following command in the same console
window (with administrative privileges):

``` java
stopService.bat
```

The console will display a message confirming that
the WSO2CARBON service has been stopped.

![Service stop message]({{base_path}}/assets/img/deploy/service-stop-message.png)

To uninstall the service, execute the following command in the same
console window (with administrative privileges):

``` java
uninstallService.bat
```

The console will display a message confirming that
the WSO2CARBON service has been removed.

![Service removal message]({{base_path}}/assets/img/deploy/service-removal-message.png)

---

## Uninstall the product

To remove an already installed product, follow the instructions below:

<table>
<thead>
<tr class="header">
<th>OS</th>
<th>Instructions</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Mac OS</td>
<td><div class="content-wrapper">
<p>Open a terminal and run the following command as the root user:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" 
data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code 
class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">sudo bash &lt;IS_HOME&gt;/&lt;VERSION&gt;/uninstall.<span class="fu">sh</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Windows</td>
<td>
<li>Go to the <strong>Start Menu -&gt; Programs -&gt; WSO2 -&gt; Uninstall &lt;PRODUCT_NAME_VERSION&gt;</strong> or 
search <strong>Uninstall &lt;PRODUCT_NAME_VERSION&gt;</strong> and click the shortcut icon. This will uninstall the 
product from your computer. </li>
<li><b>NOTE:</b> The above path is provided assuming the IS_HOME is in <code>C:/Program 
Files/WSO2/&lt;PRODUCT_NAME>/&lt;VERSION></code></li>
</td>
</tr>
<tr class="odd">
<td>Ubuntu</td>
<td><div class="content-wrapper">
<p>Open a terminal and run the following command:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">sudo apt-get purge &lt;PRODUCT_DISTRIBUTION_NAME&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>CentOS</td>
<td><div class="content-wrapper">
<p>Open a terminal and run the following command:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">sudo yum remove &lt;PRODUCT_DISTRIBUTION_NAME&gt;-x86_<span class="dv">64</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>
