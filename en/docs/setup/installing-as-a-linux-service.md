# Installing as a Linux Service

WSO2 Carbon and any Carbon-based product can be run as a Linux service
as described in the following sections:

#### Prerequisites

Install JDK and set up the `         JAVA_HOME        ` environment
variable. For more information, see
[Installation Prerequisites](../../setup/installation-prerequisites).

#### Setting up CARBON_HOME

Extract the WSO2 product that you want to run as a Linux service and set
the environment variable `         CARBON_HOME        ` to the extracted
product directory location.

#### Running the product as a Linux service

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
    Following is an example startup script written for WSO2 Identity Server 5.9.0.

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
    export JAVA_HOME="/usr/lib/jvm/jdk1.8.0_141"

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
