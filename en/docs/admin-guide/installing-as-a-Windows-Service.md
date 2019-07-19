# Installing as a Windows Service

WSO2 Carbon and any WSO2 product can be run as a Windows service. It is
also possible to install and run multiple WSO2 products as Windows
services simultaneously. See the following topics for instructions:

!!! tip
    
    Read this if you are using WSO2 Enterprise Integrator
    
    **Tip** : If you are running multiple WSO2 Enterprise Integrator
    profiles as Windows services, a separate copy of the server pack should
    be used for each profile. This is done to avoid file locking and other
    concurrency related issues that may occur when more than one process is
    trying to access the same files.
    

  

-   [Prerequisites](#InstallingasaWindowsService-Prerequisites)
-   [Installing a single product as a Windows
    service](#InstallingasaWindowsService-InstallingasingleproductasaWindowsservice)
-   [Installing multiple products as Windows
    services](#InstallingasaWindowsService-InstallingmultipleproductsasWindowsservices)

### Prerequisites

-   **System requirements**

    <table>
    <tbody>
    <tr class="odd">
    <td><p><strong>Memory</strong></p></td>
    <td><ul>
    <li>~ 2 GB minimum<br />
    </li>
    <li>~ 512 MB heap size. This is generally sufficient to process typical SOAP messages but the requirements vary with larger message sizes and  the number of messages processed concurrently.</li>
    </ul></td>
    </tr>
    <tr class="even">
    <td><p><strong>Disk</strong></p></td>
    <td><ul>
    <li>~ 500 MB, excluding space allocated for log files and databases.</li>
    </ul></td>
    </tr>
    </tbody>
    </table>

-   **Environment compatibility**

    <table>
    <tbody>
    <tr class="odd">
    <td><p><strong>Operating Systems / Databases</strong></p></td>
    <td><ul>
    <li>All WSO2 Carbon-based products are Java applications that can be run on <strong>any platform that is Oracle JDK 7/8 compliant</strong> . <strong></strong></li>
    <li>All WSO2 Carbon-based products are generally compatible with most common DBMSs. For more information, see <a href="_Working_with_Databases_">Working with Databases</a> .<br />
    </li>
    <li>It is not recommended to use Apache DS in a production environment due to issues with scalability. Instead, it is recommended to use an LDAP like OpenLDAP for user management.</li>
    <li>If you have difficulty in setting up any WSO2 product in a specific platform or database, please contact us .</li>
    </ul></td>
    </tr>
    </tbody>
    </table>

-   **Required applications**  
    The following applications are required for running the product and
    its samples or for building from the source code. Mandatory
    installations are marked with an asterisk \*.

    <table>
    <thead>
    <tr class="header">
    <th><p>Application</p></th>
    <th><p>Purpose</p></th>
    <th><p>Version</p></th>
    <th>Download Links</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p><strong>Oracle Java SE Development Kit (JDK)*</strong></p></td>
    <td><ul>
    <li><p>To launch the product as each product is a Java application.</p></li>
    <li>To <a href="http://wso2.com/community">build the product from the source distribution</a> (both JDK and Apache Maven are required).</li>
    <li>To run Apache Ant.</li>
    </ul></td>
    <td><p>JDK 7 or 8.</p>
    <p>Oracle and IBM JRE 1.7 are also supported when running (not building) WSO2 products.</p></td>
    <td><p><a href="http://java.sun.com/javase/downloads/index.jsp">http://java.sun.com/javase/downloads/index.jsp</a></p></td>
    </tr>
    </tbody>
    </table>

<!-- -->

-   Download and install a service wrapper library to use for running
    your WSO2 product as a Windows service. WSO2 recommends Yet Another
    Java Service Wrapper (
    [YAJSW](http://sourceforge.net/projects/yajsw/) ), and several WSO2
    products provide a default `          wrapper.conf         ` file in
    their `          <PRODUCT_HOME>/bin/yajsw/         ` directory.

### Installing a single product as a Windows service

Given below are the steps for installing a single WSO2 server as a
windows service.

1.  **Setting up the YAJSW wrapper:** The configuration file used for
    wrapping Java Applications by YAJSW is
    `           wrapper.conf          ` , which is located in the
    `           <YAJSW_HOME>/conf/          ` directory and in the
    `           <PRODUCT_HOME>/bin/yajsw/          ` directory of many
    WSO2 products. Following is the minimal
    `           wrapper.conf          ` configuration for running a WSO2
    product as a Windows service. Open your
    `           wrapper.conf          ` file, set its properties as
    follows, and save it in the
    `           <YAJSW_HOME>/conf/          ` directory.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
    wrapper.conf file

    **Minimal wrapper.conf configuration**

    ``` bash
    #********************************************************************
    # working directory
    #********************************************************************
    wrapper.working.dir=${carbon_home}\\
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
    wrapper.console.title="WSO2 Carbon"
    #********************************************************************
    # Wrapper Windows Service and Posix Daemon Properties
    #********************************************************************
    # Name of the service
    wrapper.ntservice.name="WSO2CARBON"
    # Display name of the service
    wrapper.ntservice.displayname="WSO2 Carbon"
    # Description of the service
    wrapper.ntservice.description="Carbon Kernel"
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
    wrapper.filter.script.0=scripts\/trayMessage.gv
    wrapper.filter.script.0.args=Exception
    #********************************************************************
    # genConfig: further Properties generated by genConfig
    #********************************************************************
    placeHolderSoGenPropsComeHere=
    wrapper.java.command = ${java_home}\\bin\\java
    wrapper.java.classpath.1 = ${java_home}\\lib\\tools.jar
    wrapper.java.classpath.2 = ${carbon_home}\\bin\\*.jar
    wrapper.app.parameter.1 = org.wso2.carbon.bootstrap.Bootstrap
    wrapper.app.parameter.2 = RUN
    wrapper.java.additional.1 = -Xbootclasspath\/a:${carbon_home}\\lib\\xboot\\*.jar
    wrapper.java.additional.2 = -Xms256m
    wrapper.java.additional.3 = -Xmx1024m
    wrapper.java.additional.4 = -XX:MaxPermSize=256m
    wrapper.java.additional.5 = -XX:+HeapDumpOnOutOfMemoryError
    wrapper.java.additional.6 = -XX:HeapDumpPath=${carbon_home}\\repository\\logs\\heap-dump.hprof
    wrapper.java.additional.7 = -Dcom.sun.management.jmxremote
    wrapper.java.additional.8 = -Djava.endorsed.dirs=${carbon_home}\\lib\\endorsed;${java_home}\\jre\\lib\\endorsed
    wrapper.java.additional.9 = -Dcarbon.registry.root=\/
    wrapper.java.additional.10 = -Dcarbon.home=${carbon_home}
    wrapper.java.additional.11 = -Dwso2.server.standalone=true
    wrapper.java.additional.12 = -Djava.command=${java_home}\\bin\\java
    wrapper.java.additional.13 = -Djava.io.tmpdir=${carbon_home}\\tmp
    wrapper.java.additional.14 = -Dcatalina.base=${carbon_home}\\lib\\tomcat 
    wrapper.java.additional.15 = -Djava.util.logging.config.file=${carbon_home}\\repository\\conf\\log4j.properties
    wrapper.java.additional.16 = -Dcarbon.config.dir.path=${carbon_home}\\repository\\conf 
    wrapper.java.additional.17 = -Dcarbon.logs.path=${carbon_home}\\repository\\logs 
    wrapper.java.additional.18 = -Dcomponents.repo=${carbon_home}\\repository\\components\\plugins
    wrapper.java.additional.19 = -Dconf.location=${carbon_home}\\repository\\conf 
    wrapper.java.additional.20 = -Dcom.atomikos.icatch.file=${carbon_home}\\lib\\transactions.properties
    wrapper.java.additional.21 = -Dcom.atomikos.icatch.hide_init_file_path=true 
    wrapper.java.additional.22 = -Dorg.apache.jasper.runtime.BodyContentImpl.LIMIT_BUFFER=true 
    wrapper.java.additional.23 = -Dcom.sun.jndi.ldap.connect.pool.authentication=simple
    wrapper.java.additional.24 = -Dcom.sun.jndi.ldap.connect.pool.timeout=3000 
    wrapper.java.additional.25 = -Dorg.terracotta.quartz.skipUpdateCheck=true 
    ```

    !!! note
    
        Only applicable to WSO2 ESB 4.9.0 and WSO2 EI 6.x.x versions!
    
        You must manually add the following property to the
        `           wrapper.conf          ` file to avoid errors in the
        management console:
    
        ``` java
            wrapper.java.additional.26 = -Dorg.apache.jasper.compiler.Parser.STRICT_QUOTE_ESCAPING=false
        ```
    
        If this property is not added, you may come across an exception that
        will result in blank pages when you log in to the ESB's management
        console.
    

    If you want to set additional properties from an external registry
    at runtime, store sensitive information like usernames and passwords
    for connecting to the registry in a properties file and secure it
    with [secure vault](#){.unresolved} .

2.  **Setting up Carbon Home:** Extract the Carbon-based product that
    you want to run as a Windows service, and then set the Windows
    environment variable `           CARBON_HOME          ` to the
    extracted product directory location. For example, if you want to
    run ESB 4.5.0 as a Windows service, you would set
    `           CARBON_HOME          ` to the extracted
    `           wso2esb-4.5.0          ` directory.

3.  **Test the service in console mode:** You can verify that YAJSW is
    configured correctly for running the Carbon-based product as a
    Windows service.
    1.  Open a Windows command prompt and execute the
        `             runConsole.bat            ` script from the
        `             <YAJSW_HOME>/bat/            ` directory as shown
        below.

        ``` java
        cd C:\DocumentsandSettings\yajsw_home\bat\runConsole.bat
        ```

        If the configurations are set properly for YAJSW, you will see
        console output similar to the following:  
        ![](attachments/45946424/46206534.png)

    2.  You can now access the management console from your web browser
        via <https://localhost:9443/carbon> .

4.  **Install and run the product as a service:** Execute the relevant
    script as explained below.  
    1.  First, install the WSO2 product as a Windows service, by
        executing the following command in the
        `             <YAJSW_HOME>/bat/            ` directory:

        ``` java
                installService.bat
        ```

        The console will display a message confirming that
        the WSO2CARBON service was installed:

        ![](attachments/28717183/29364285.png)

    2.  Start the service by executing the following command in the same
        console window:

        ``` java
                startService.bat
        ```

        The console will display a message confirming that
        the WSO2CARBON service was started:

        ![](attachments/28717183/29364288.png)

5.  **Stop and uninstall service:** Execute the relevant scripts as
    shown below.
    1.  To stop the service, execute the following command in the same
        console window:

        ``` java
                stopService.bat
        ```

        The console will display a message confirming that
        the WSO2CARBON service has stopped:

        ![](attachments/28717183/29364290.png)

    2.  To uninstall the service, execute the following command in the
        same console window:

        ``` java
                uninstallService.bat
        ```

        The console will display a message confirming that
        the WSO2CARBON service was removed:

        ![](attachments/28717183/29364291.png)

### Installing multiple products as Windows services

The following instructions explain how to install multiple WSO2 servers
in a single computer. In this scenario, you simple have to maintain
separate YAJSW configuration files for each product. For example,
consider that you need to install WSO2 ESB and WSO2 DSS as Windows
services and follow the instructions given below.

1.  Download and unzip WSO2 ESB and WSO2 DSS.
2.  Download and unzip
    [yajsw](http://sourceforge.net/projects/yajsw/files/).
3.  Create two directories 'esb\_service' and 'dss\_service'.
4.  Copy the `          <YAJSW_HOME>         ` directory to
    'esb\_service' and 'dss\_service' separately. Now you will have two
    separate yajsw directories for the two products.
5.  Now, update the `           wrapper.conf          ` file for each of
    the products, which is stored in the
    `           esb_service/           <ESB_YAJSW_HOME>           /conf/          `
    and `           dss          `
    `           _service/           <DSS_YAJSW_HOME>           /conf/          `
    directories. You simply have to replace
    `           carbon_home          ` with
    `           esb_home          ` and `           dss_home          `
    respectively.

6.  Copy the `          <ESB_HOME>         ` directory to 'esb\_service'
    and the `          <DSS_HOME>         ` directory to 'dss\_service'.
7.  Set port offset for DSS to '1' in the
    `          <DSS_HOME>/repository/conf/carbon.xml         ` file.
    This will ensure that the DSS service will run on https port 9444
    (default 9443 + 1). WSO2 ESB will be running on the default
    port 9443.
8.  Set the ESB\_HOME, DSS\_HOME and JAVA\_HOME environment variables,
    which points to the extracted folders of each service.
9.  Now, update the `           wrapper.conf          ` file for each of
    the products, which is stored in the
    `           esb_service/           <ESB_YAJSW_HOME>           /conf/          `
    and `           dss          `
    `           _service/           <DSS_YAJSW_HOME>           /conf/          `
    directories. You simply have to replace
    `           carbon_home          ` with
    `           esb_home          ` and `           dss_home          `
    respectively.

    !!! note
    
        Only applicable to WSO2 ESB 4.9.0 and WSO2 EI 6.x.x versions!
    
        You must manually add the following property to the
        `           wrapper.conf          ` file to avoid errors in the
        management console:
    
        ``` java
            wrapper.java.additional.26 = -Dorg.apache.jasper.compiler.Parser.STRICT_QUOTE_ESCAPING=false
        ```
    
        If this property is not added, you may come across an exception that
        will result in blank pages when you log in to the ESB's management
        console.
    

10. Navigate to the
    `          esb_service/          <ESB_YAJSW_HOME>          /bin         `
    directory and execute the scripts as shown below.
    1.  Run `            installService.bat           ` to install the
        Windows service.
    2.  Run `            startService.bat           ` to start the
        service.
11. Do the same above for the 'dss\_service' as well.
12. Right click on **My Computer -\> Manage**. Then click **Services
    and Applications -\> Services**. You can see both ESB and DSS
    services running.  
    ![](attachments/53125425/53287331.png)

    You can stop or restart the services from the UI as shown in the
    diagram above.  
    Alternatively, you can go to the
    `            /<            YAJSW_HOME>            /bin           `
    directory for each product and execute the
    `            stopService.bat           ` and
    `            uninstallService.bat           ` scripts to stop and
    uninstall Windows services.

13. You can now open the management consoles of the two products with
    the following urls:

    -   For ESB: https://localhost:9443/carbon .
    -   For DSS: https://localhost:9444/carbon .
