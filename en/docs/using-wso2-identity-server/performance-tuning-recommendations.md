# Performance Tuning Recommendations

This section describes some recommended performance tuning
configurations to optimize the WSO2 Identity Server.

!!! note "Important"    
    -   Performance tuning requires you to modify important system files,
        which affect all programs running on the server. We recommend you to
        familiarize yourself with these files using Unix/Linux documentation
        before editing them.
    -   The parameter values we discuss below are just examples. They might
        not be the optimal values for the specific hardware configurations
        in your environment. We recommend you to carry out load tests on
        your environment to tune the Identity Server accordingly.
    

### OS-level settings

When it comes to performance, the OS that the server runs plays an
important role.

!!! info
    If you are running on MacOS Sierra or High Sierra, and experiencing long
    start-up times for WSO2 products, try mapping your Mac hostname to
    `          127.0.0.1         ` and `          ::1         ` in the
    `          /etc/hosts         ` file.

    ``` java
    127.0.0.1   localhost <my_computer_hostname>
    ::1         localhost <my_computer_hostname>
    ```

    Example:

    ``` java
    127.0.0.1   localhost Alex-MacBook-Pro.local
    ::1         localhost Alex-MacBook-Pro.local
    ```

1.  To optimize network and OS performance, configure the following
    settings in `           /etc/sysctl.conf          ` file of Linux.
    These settings specify a larger port range, a more effective TCP
    connection time-out value, and a number of other important
    parameters at the OS-level.

    !!! info
        It is not recommended to use
        `            net.ipv4.tcp_tw_recycle = 1           ` when working
        with network address translation (NAT), such as if you are deploying
        products in EC2 or any other environment configured with NAT.

    ``` java
    net.ipv4.tcp_fin_timeout = 30
    fs.file-max = 2097152
    net.ipv4.tcp_tw_recycle = 1
    net.ipv4.tcp_tw_reuse = 1
    net.core.rmem_default = 524288
    net.core.wmem_default = 524288
    net.core.rmem_max = 67108864
    net.core.wmem_max = 67108864
    net.ipv4.tcp_rmem = 4096 87380 16777216
    net.ipv4.tcp_wmem = 4096 65536 16777216
    net.ipv4.ip_local_port_range = 1024 65535      
    ```

2.  To alter the number of allowed open files for system users,
    configure the following settings in
    `           /etc/security/limits.conf          ` file of Linux (be
    sure to include the leading \* character).

    ``` java
    * soft nofile 4096
    * hard nofile 65535
    ```

    Optimal values for these parameters depend on the environment.

3.  To alter the maximum number of processes your user is allowed to run
    at a given time, configure the following settings in
    `           /etc/security/limits.conf          ` file of Linux (be
    sure to include the leading \* character). Each carbon server
    instance you run would require up to 1024 threads (with default
    thread pool configuration). Therefore, you need to increase the
    `           nproc          ` value by 1024 per each carbon server
    (both hard and soft).

    ``` java
    * soft nproc 20000
    * hard nproc 20000
    ```

### Setting the thread execution limit for multitenant mode

In multi-tenant mode, the Carbon runtime limits the thread execution
time. That is, if a thread is stuck or taking a long time to process,
Carbon detects such threads, interrupts and stops them. Note that Carbon
prints the current stack trace before interrupting the thread. This
mechanism is implemented as an Apache Tomcat valve. Therefore, it should
be configured in the
`         <PRODUCT_HOME>/repository/conf/tomcat/catalina-server.xml        `
file as shown below.

``` java
<Valve className="org.wso2.carbon.tomcat.ext.valves.CarbonStuckThreadDetectionValve" threshold="600"/>
```

-   The `          className         ` is the Java class name used for
    the implementation. This must be set to
    `          org.wso2.carbon.tomcat.ext.valves.CarbonStuckThreadDetectionValve         `
    .
-   The `          threshold         ` gives the minimum duration in
    seconds after which a thread is considered stuck. The default value
    is 600 seconds.

### JVM settings

-   JVM heap size (Xmx) depends on your load. Given below are the
    general settings but if you are on a production environment, this
    might not be sufficient . In such situations, you can increase the
    heap size accordingly .

    For instance, if you want to increase the JVM heap size to 4GB, open
    `           wso2server.sh          ` located in
    `           <IS_HOME>/bin/          ` and do the following changes.

    ``` java
    JVM_MEM_OPTS="-Xms4096m -Xmx4096m"
    if [ "$java_version" \< "1.8" ]; then
        JVM_MEM_OPTS="$JVM_MEM_OPTS -XX:MaxPermSize=512m"
    fi
    ```

-   When an XML element has a large number of sub-elements and the
    system tries to process all the sub-elements, the system can become
    unstable due to a memory overhead. This is a security risk.  
      
    To avoid this issue, you can define a maximum level of entity
    substitutions that the XML parser allows in the system. You do this
    by adding the `           entity expansion limit          `
    attribute to the
    `           <PRODUCT_HOME>/bin/wso2server.bat          ` file (for
    Windows) or the
    `           <PRODUCT_HOME>/bin/wso2server.sh          ` file (for
    Linux/Solaris). The default entity expansion limit is 64000.

    ``` java
    set CMD_LINE_ARGS=-Xbootclasspath/a:%CARBON_XBOOTCLASSPATH% -Xms256m -Xmx1024m -XX:MaxPermSize=256m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath="%CARBON_HOME%\repository\logs\heap-dump.hprof"  -Dcom.sun.management.jmxremote -classpath %CARBON_CLASSPATH% %JAVA_OPTS% 
    ```

    In a clustered environment, the entity expansion limit has no
    dependency on the number of worker nodes.

### Database level settings

Set up the `         THRIFT_SESSION        ` database index in the
Identity Server database to improve performance:

create index
`         IDX_ITS_LMT on IDN_THRIFT_SESSION (LAST_MODIFIED_TIME);        `

!!! info
    If you want to remove unused tokens from the database, see [Removing
    Unused Tokens from the
    Database](../../using-wso2-identity-server/removing-unused-tokens-from-the-database).
