# Performance Tuning

This section describes some recommended performance tuning
configurations to optimize WSO2 products. It assumes that you have set
up the product on a server running Unix/Linux, which is recommended for
production deployment.

-   [OS-Level settings](#PerformanceTuning-OS-Levelsettings)
-   [JVM settings](#PerformanceTuning-JVMsettings)
-   [JDBC pool configuration](#PerformanceTuning-JDBCpoolconfiguration)
-   [Caching configuration](#PerformanceTuning-Cachingconfiguration)
-   [Setting the thread execution
    limit](#PerformanceTuning-Settingthethreadexecutionlimit)
-   [Pooling LDAPS
    connections](#PerformanceTuning-ldaps-poolingPoolingLDAPSconnections)
-   [Product-specific performance
    tuning](#PerformanceTuning-Product-specificperformancetuning)

!!! note
    
    Important
    
    -   Performance tuning requires you to modify important system files,
        which affect all programs running on the server. We recommend you to
        get familiar with these files using Unix/Linux documentation before
        editing them.
    -   The parameter values we discuss below are just examples. They might
        not be the optimal values for the specific hardware configurations
        in your environment. We recommend that you carry out load tests on
        your environment to tune the product accordingly.
    

#### OS-Level settings

When it comes to performance, the OS that the server runs plays an
important role.

If you are running MacOS Sierra and experience long startup times for
WSO2 products, try mapping your Mac hostname to 127.0.0.1 and ::1 in the
`          /etc/hosts         ` file as described in [this blog
post](http://shammijayasinghe.blogspot.com/2017/04/wso2-server-startup-taking-lot-of-time.html)
.

Following are the configurations you can apply to optimize OS-level
performance:

1.  To optimize network and OS performance, configure the following
    settings in `           /etc/sysctl.conf          ` file of Linux.
    These settings specify a larger port range, a more effective TCP
    connection timeout value, and a number of other important parameters
    at the OS-level.

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

    When we have the localhost port range configuration lower bound to
    1024, there is a possibility that some processes may pick the ports
    which are already used by WSO2 servers. Therefore, it's good to
    increase the lower bound as sufficient for production, e.g., 10,000.

2.  To alter the number of allowed open files for system users,
    configure the following settings in the
    `           /etc/security/limits.conf          ` file of Linux.

    ``` java
        * soft nofile 4096
        * hard nofile 65535
    ```

    Optimal values for these parameters depend on the environment.

3.  To alter the maximum number of processes your user is allowed to run
    at a given time, configure the following settings in the
    `           /etc/security/limits.conf          ` file of Linux (be
    sure to include the leading \* character). Each carbon server
    instance you run would require up to 1024 threads (with default
    thread pool configuration). Therefore, you need to increase the
    nproc value by 1024 per each server (both hard and soft).

    ``` java
        * soft nproc 20000
        * hard nproc 20000
    ```

#### JVM settings

When an XML element has a large number of sub-elements and the system
tries to process all the sub-elements, the system can become unstable
due to a memory overhead. This is a security risk.

To avoid this issue, you can define a maximum level of entity
substitutions that the XML parser allows in the system. You do this
using the `         entity expansion limit        ` attribute that is in
the `         <PRODUCT_HOME>/bin/wso2server.bat        ` file (for
Windows) or the `         <PRODUCT_HOME>/bin/wso2server.sh        ` file
(for Linux/Solaris). The default entity expansion limit is 64000.

``` xml
-DentityExpansionLimit=100000
```

In a clustered environment, the entity expansion limit has no dependency
on the number of worker nodes.

#### JDBC pool configuration

Within the WSO2 platform, we use Tomcat JDBC pooling as the default
pooling framework due to its production-ready stability and high
performance. The goal of tuning the pool properties is to maintain a
pool that is large enough to handle peak load without unnecessarily
utilizing resources. These pooling configurations can be tuned for your
production server in general in the
`         <PRODUCT_HOME>/repository/conf/datasources/master-datasources.xml        `
file.

T he following parameters should be considered when tuning the
connection pool:

-   The application's concurrency requirement.
-   The average time used for running a database query.
-   The maximum number of connections the database server can support.

The table below indicates some recommendations on how to configure the
JDBC pool. For more details about recommended JDBC configurations, see
[Tomcat JDBC Connection
Pool](http://tomcat.apache.org/tomcat-7.0-doc/jdbc-pool.html).

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
<th>Tuning Recommendations</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>maxActive</td>
<td><p>The maximum number of active connections that can be allocated from the connection pool at the same time. The default value is <code>              100.             </code></p></td>
<td><p>The maximum latency (approximately) = (P / M) * T,</p>
<p><em>where,</em></p>
<ul>
<li>M = maxActive value</li>
<li>P = Peak concurrency value</li>
<li>T = Time (average) taken to process a query.</li>
</ul>
<p>Therefore, by increasing the maxActive value (up to the expected highest number of concurrency), the time that requests wait in the queue for a connection to be released will decrease. But before increasing the Max. Active value, consult the database administrator, as it will create up to maxActive connections from a single node during peak times, and it may not be possible for the DBMS to handle the accumulated count of these active connections.</p>
<p>Note that this value should not exceed the maximum number of requests allowed for your database.</p></td>
</tr>
<tr class="even">
<td>maxWait</td>
<td>The maximum time that requests are expected to wait in the queue for a connection to be released. This property comes into effect when the maximum number of active connections allowed in the connection pool (see maxActive property) is used up.</td>
<td><p>Adjust this to a value slightly higher than the maximum latency for a request, so that a buffer time is added to the maximum latency. That is,</p>
<p>If the maximum latency (approximately) = (P / M) * T,</p>
<p><em>where</em>,</p>
<ul>
<li>M = maxActive value,</li>
<li>P = Peak concurrency value,</li>
<li>T = Time (average) taken to process a query,</li>
</ul>
<p><em>then</em>, the maxWait = (P / M) * T + buffer time.</p></td>
</tr>
<tr class="odd">
<td>minIdle</td>
<td>The minimum number of connections that can remain idle in the pool, without extra ones being created. The connection pool can shrink below this number if validation queries fail. Default value is 0.</td>
<td>This value should be similar or near to the average number of requests that will be received by the server at the same time. With this setting, you can avoid having to open and close new connections every time a request is received by the server.</td>
</tr>
<tr class="even">
<td>maxIdle</td>
<td>The maximum number of connections that can remain idle in the pool.</td>
<td>The value should be less than the maxActive value. For high performance, tune maxIdle to match the number of average, concurrent requests to the pool. If this value is set to a large value, the pool will contain unnecessary idle connections.</td>
</tr>
<tr class="odd">
<td>testOnBorrow</td>
<td><p>The indication of whether connection objects will be validated before they are borrowed from the pool. If the object validation fails, the connection is dropped from the pool, and there will be an attempt to borrow another connection.</p></td>
<td><p>When the connection to the database is broken, the connection pool does not know that the connection has been lost. As a result, the connection pool will continue to distribute connections to the application until the application actually tries to use the connection. To resolve this problem, set "Test On Borrow" to "true" and make sure that the "ValidationQuery" property is set. To increase the efficiency of connection validation and to improve performance, <code>              validationInterval             </code> property should also be used.</p></td>
</tr>
<tr class="even">
<td>validationInterval</td>
<td><p>This parameter controls how frequently a given validation query is executed (time in milliseconds). The default value is <code>              30000             </code> (30 seconds). That is, if a connection is due for validation, but has been validated previously within this interval, it will not be validated again.</p></td>
<td><p>Deciding the value for the "validationInterval" depends on the target application's behavior. Therefore, selecting a value for this property is a trade-off and ultimately depends on what is acceptable for the application.</p>
<p>If a larger value is set, the frequency of executing the Validation Query is low, which results in better performance. Note that this value can be as high as the time it takes for your DBMS to declare a connection as stale. For example, MySQL will keep a connection open for as long as 8 hours, which requires the validation interval to be within that range. However, note that the validation query execution is usually fast. Therefore, even if this value is only large by a few seconds, there will not be a big penalty on performance. Also, specially when the database requests have a high throughput, the negative impact on performance is negligible. For example, a single extra validation query run every 30 seconds is usually negligible.</p>
<p>If a smaller value is set, a stale connection will be identified quickly when it is presented. This maybe important if you need connections repaired instantly, e.g. during a database server restart.</p></td>
</tr>
<tr class="odd">
<td>validationQuery</td>
<td>The SQL query used to validate connections from this pool before returning them to the caller. If specified, this query does not have to return any data, it just can't throw an SQLException. The default value is null. Example values are SELECT 1(mysql), select 1 from dual(oracle), SELECT 1(MS Sql Server).</td>
<td>Specify an SQL query, which will validate the availability of a connection in the pool. This query is necessary when <code>             testOnBorrow            </code> property is true.</td>
</tr>
<tr class="even">
<td>MaxPermSize</td>
<td>The memory size allocated for the WSO2 product.</td>
<td><p>The default memory allocated for the product via this parameter is as follows: <code>              -Xms256m -Xmx512m -XX:MaxPermSize=256m             </code></p>
<p>You can increase the performance by increasing this value in the <code>              &lt;PRODUCT_HOME&gt;/bin/wso2server.sh             </code> file as follows: <code>              -Xms2048m -Xmx2048m -XX:MaxPermSize=1024m             </code></p></td>
</tr>
</tbody>
</table>

!!! note
    
    -   When it comes to web applications, users are free to experiment and
        package their own pooling framework such BoneCP.
    -   If you are using an **Oracle** database, you may sometimes come
        across an error ( **ORA-04031** ) indicating that you have not
        allocated enough memory for the shared pool of connections. To
        overcome this, you can allocate more memory to the shared pool by
        adjusting the following parameters in the
        `          <          ORACLE_HOME>/dbs/init<SID>.ora         ` file
        of your Oracle database:
        **`           SHARED_POOL_RESERVED_SIZE          `**,
        **`           SHARED_POOL_SIZE          `** and
        `                     LARGE_POOL_SIZE.                   `  
    

#### Caching configuration

The `         <Cache>        ` element configured in the
`         carbon.        ` xml file (stored in the
`         <PRODUCT_HOME>/repository/conf        ` directory) sets the
global caching timeout in minutes for your server. This value specifies
the time period after which, the cache will refresh. If the components
in your product do not have specific caching timeout values configured,
the global caching timeout will be applicable by default. Be sure to
restart the server if you change the default caching timeout in the
`         carbon.        ` xml file shown below.

``` java
<Cache>
    <!-- Default cache timeout in minutes -->
    <DefaultCacheTimeout>15</DefaultCacheTimeout>
</Cache>
```

#### Setting the thread execution limit

The Carbon runtime limits the thread execution time. That is, if a
thread is stuck or taking a long time to process, Carbon detects such
threads, interrupts and stops them. Note that Carbon prints the current
stack trace before interrupting the thread. This mechanism is
implemented as an Apache Tomcat valve. Therefore, it should be
configured in the
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
    seconds after which a thread is considered stuck. Default value is
    600 seconds.  

!!! note
    
    This configuration works only for the servlet transport.
    

#### Pooling LDAPS connections

Connection pooling does not apply to LDAPS connections (SSL-enabled LDAP
connections) by default. Therefore, you need to enable connection
pooling for LDAPS connections at the time of starting your server:

1.  Stop the server.
2.  Open a command terminal, navigate to the
    `          <PRODUCT_HOME>/bin         ` directory, and execute the
    relevant startup script:
    -   On Linux: `            wso2server.sh           `
    -   On Windows: `            wso2server.bat           `
3.  Add the following system property to the script:

    ``` java
    -Dcom.sun.jndi.ldap.connect.pool.protocol=ssl
    ```

4.  Start the server.

#### Product-specific performance tuning

For performance tuning guidelines that are specific to each product, go
to the product documentation for each product listed below and search
for performance tuning guidelines.

Listed below are the main WSO2 products:

-   -   [API Manager](http://docs.wso2.com/api-manager/)
    -   [Data Analytics
        Server](http://docs.wso2.com/data-analytics-server)
    -   [Enterprise
        Integrator](http://docs.wso2.com/enterprise-integrator) profiles
        -   ESB profile
        -   Business Process Management profile
        -   Message Broker profile
        -   Analytics profile
    -   [IOT](http://docs.wso2.com/iot-server)
    -   [Identity Server](http://docs.wso2.com/identity-server)
    -   [Enterprise Service
        Bus](http://docs.wso2.com/enterprise-service-bus)

The following are now legacy products of WSO2:

-   -   [Application Server](http://docs.wso2.com/application-server/)
    -   [Business Rules
        Server](http://docs.wso2.com/business-rules-server)
    -   [Enterprise Mobility
        Manager](http://docs.wso2.com/enterprise-mobility-manager)
    -   [Enterprise Store](http://docs.wso2.com/enterprise-store)
    -   [Governance Registry](http://docs.wso2.com/governance-registry)
