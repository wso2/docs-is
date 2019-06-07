# Installing as a Linux Service

Follow the sections below to run a WSO2 product as a Linux service:

-   [Prerequisites](#InstallingasaLinuxService-Prerequisites)
-   [Setting up
    CARBON\_HOME](#InstallingasaLinuxService-SettingupCARBON_HOME)
-   [Running the product as a Linux
    service](#InstallingasaLinuxService-RunningtheproductasaLinuxservice)

#### Prerequisites

-   **System requirements**

    <table>
    <tbody>
    <tr class="odd">
    <td><p><strong>Memory</strong></p></td>
    <td><ul>
    <li>~ 2 GB minimum<br />
    </li>
    <li>~ 512 MB heap size. This is generally sufficient to process typical SOAP messages but the requirements vary with larger message sizes and the number of messages processed concurrently.</li>
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

#### Setting up CARBON\_HOME

Extract the WSO2 product to a preferred directory in your machine and
set the environment variable `         CARBON_HOME        ` to the
extracted directory location.

#### Running the product as a Linux service

1.  To run the product as a service, create a startup script and add it
    to the boot sequence. The basic structure of the startup script has
    three parts (i.e., start, stop and restart) as follows:

    ``` java
    #!/bin/bash
     
    case “$1″ in
    start)
       echo “Starting the Service”
    ;;
    stop)
       echo “Stopping the Service”
    ;;
    restart)
       echo “Restarting the Service”
    ;;
    *)
       echo $”Usage: $0 {start|stop|restart}”
    exit 1
    esac
    ```

    Given below is a sample startup script.
    `           <PRODUCT_HOME>          ` can vary depending on the WSO2
    product's directory.

    ``` java
        #! /bin/sh
        export JAVA_HOME="/usr/lib/jvm/jdk1.7.0_07"
    
        startcmd='<PRODUCT_HOME>/bin/wso2server.sh start > /dev/null &'
        restartcmd='<PRODUCT_HOME>/bin/wso2server.sh restart > /dev/null &'
        stopcmd='<PRODUCT_HOME>/bin/wso2server.sh stop > /dev/null &'
    
        case "$1" in
        start)
           echo "Starting the WSO2 Server ..."
           su -c "${startcmd}" user1
        ;;
        restart)
           echo "Re-starting the WSO2 Server ..."
           su -c "${restartcmd}" user1
        ;;
        stop)
           echo "Stopping the WSO2 Server ..."
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
    prodserver and it is in `            /opt/WSO2/           ` folder,
    then the commands for adding a link to
    `            /etc/init.d/           ` is as follows:

    -   Make executable:
        `              sudo chmod a+x /opt/WSO2/prodserver             `

    -   Add a link to `             /etc/init.d/            ` :
        `             s             udo ln -snf /opt/WSO2/prodserver /etc/init.d/prodserver            `

3.  Install the startup script to respective runlevels using the command
    `                       update-rc.d                     ` . For
    example, give the following command for the sample script shown in
    step1:

    ``` java
        sudo update-rc.d prodserver defaults 
    ```

      
    The `           defaults          ` option in the above command
    makes the service to start in runlevels 2,3,4 and 5 and to stop in
    runlevels 0,1 and 6.

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
