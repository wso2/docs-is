# Default Ports of WSO2 Products

This page describes the default ports that are used for each WSO2
product when the port offset is 0. If you are running multiple WSO2
products on the same server, you must set the
`         <offset>        ` value in
`         <PRODUCT_HOME>/repository/conf/carbon.xml        ` to a
different value for each product so that there are no port conflicts.
For example, if you are running two WSO2 products on the same server,
and you set the port offset to 1 in one product and 2 in the second
product, the management console port will be changed from the default of
9443 to 9444 in the first product and to 9445 in the second product. See
[here](#DefaultPortsofWSO2Products-offset) for more information on
changing the offset.

-   [Common ports](#DefaultPortsofWSO2Products-Commonports)
-   [Product-specific
    ports](#DefaultPortsofWSO2Products-Product-specificports)

### Common ports

The following ports are common to all WSO2 products that provide the
given feature. Some features are bundled in the WSO2 Carbon platform
itself and therefore are available in all WSO2 products by default.

[Management console
ports](#DefaultPortsofWSO2Products-Managementconsoleports) \| [LDAP
server ports](#DefaultPortsofWSO2Products-LDAPserverports) \| [KDC
ports](#DefaultPortsofWSO2Products-KDCports) \| [JMX monitoring
ports](#DefaultPortsofWSO2Products-JMXmonitoringports) \| [Clustering
ports](#DefaultPortsofWSO2Products-Clusteringports) \| [Random
ports](#DefaultPortsofWSO2Products-Randomports)

#### Management console ports

WSO2 products that provide a management console use the following
servlet transport ports:

-   9443 - HTTPS servlet transport (the default URL of the management
    console is https://localhost:9443/carbon )
-   9763 - HTTP servlet transport

#### LDAP server ports

Provided by default in the WSO2 Carbon platform.

-   10389 - Used in WSO2 products that provide an embedded LDAP server

#### KDC ports

-   8000 - Used to expose the Kerberos key distribution center server

#### JMX monitoring ports

WSO2 Carbon platform uses TCP ports to monitor a running Carbon instance
using a JMX client such as JConsole. By default, JMX is enabled in all
products. You can disable it using
`          <PRODUCT_HOME>/repository/conf/etc/jmx.xml         ` file.

-   11111 - RMIRegistry port. Used to monitor Carbon remotely
-   9999 - RMIServer port. Used along with the RMIRegistry port when
    Carbon is monitored from a JMX client that is behind a firewall

#### Clustering ports

To cluster any running Carbon instance, either one of the following
ports must be opened.

-   45564 - Opened if the membership scheme is multicast
-   4000 - Opened if the membership scheme is wka

#### Random ports

Certain ports are randomly opened during server startup. This is due to
specific properties and configurations that become effective when the
product is started. Note that the IDs of these random ports will change
every time the server is started.

-   A random TCP port will open at server startup because of the
    `           -Dcom.sun.management.jmxremote          ` property set
    in the server startup script. This property is used for the
    JMX monitoring facility in JVM.
-   A random UDP port is opened at server startup due to the log4j
    appender ( `           SyslogAppender          ` ), which is
    configured in the
    `           <PRODUCT_HOME>/repository/conf/log4j.properties          `
    file.

### Product-specific ports

Some products open additional ports.

[API Manager](#DefaultPortsofWSO2Products-APIManager) \|
[BAM](#DefaultPortsofWSO2Products-BAM) \|
[BPS](#DefaultPortsofWSO2Products-BPS) \| [Data Analytics
Server](#DefaultPortsofWSO2Products-DataAnalyticsServer) \| [Complex
Event Processor](#DefaultPortsofWSO2Products-ComplexEventProcessor) \|
[Elastic Load Balancer](#DefaultPortsofWSO2Products-ElasticLoadBalancer)
\| [ESB](#DefaultPortsofWSO2Products-ESB) \| [Identity
Server](#DefaultPortsofWSO2Products-IdentityServer) \| [Message
Broker](#DefaultPortsofWSO2Products-MessageBroker) \| [Machine
Learner](#DefaultPortsofWSO2Products-MachineLearner) \| [Storage
Server](#DefaultPortsofWSO2Products-StorageServer) \| [Enterprise
Mobility Manager](#DefaultPortsofWSO2Products-EnterpriseMobilityManager)

##### API Manager

-   10397 - Thrift client and server ports
-   8280, 8243 - NIO/PT transport ports
-   7711 - Thrift SSL port for secure transport, where the client is
    authenticated to BAM/CEP: stat pub

!!! note
    
    If you change the default API Manager ports with a port offset, most of
    its ports will be changed automatically according to the offset except a
    few exceptions described in the [APIM Manager
    documentation](https://docs.wso2.org/api-manager/Changing+the+Default+Ports+with+Offset)
    .
    

##### BAM

-   9160 - Cassandra port using which Thrift listens to clients
-   7711 - Thrift SSL port for secure transport, where the client is
    authenticated to BAM
-   7611 - Thrift TCP port to receive events from clients to BAM
-   21000 - Hive Thrift server starts on this port

##### BPS

-   2199 - RMI registry port (datasources provider port)

##### Data Analytics Server

-   9160 - Cassandra port on which Thrift listens to clients
-   7711 - Thrift SSL port for secure transport, where the client is
    authenticated to DAS
-   7611 - Thrift TCP port to receive events from clients to DAS
-   For a list of Apache Spark related ports, see [WSO2 Data Analytics
    Server Documentation  - Spark
    Configurations](http://docs.wso2.com/data-analytics-server/Spark%20Configurations)
    [s](http://docs.wso2.com/data-analytics-server#Spark%20Configurations)
    .

##### Complex Event Processor

-   9160 - Cassandra port on which Thrift listens to clients
-   7711 - Thrift SSL port for secure transport, where the client is
    authenticated to CEP
-   7611 - Thrift TCP port to receive events from clients to CEP
-   11224 - Thrift TCP port for HA management of CEP

##### Elastic Load Balancer

-   8280, 8243 - NIO/PT transport ports

##### ESB

Non-blocking HTTP/S transport ports: Used to accept message mediation
requests. If you want to send a request to an API or a proxy service for
example, you must use these
ports. ESB\_HOME}/repository/conf/axis2/axis2.xml file.

-   8243 - Passthrough or NIO HTTPS transport
-   8280 - Passthrough or NIO HTTP transport

##### Identity Server

-   8000 - KDCServerPort. Port which KDC (Kerberos Key Distribution
    Center) server runs
-   10500 - ThriftEntitlementReceivePort

##### Message Broker

Message Broker uses the following JMS ports to communicate with external
clients over the JMS transport.

-   5672 - Port for listening for messages on TCP when the AMQP
    transport is used.
-   8672 - Port for listening for messages on TCP/SSL when the AMQP
    Transport is used.
-   1883 - Port for listening for messages on TCP when the MQTT
    transport is used.
-   8833 - Port for listening for messages on TCP/SSL when the MQTT
    Transport is used.
-   7611 - The port for Apache Thrift Server.

##### Machine Learner

-   7077 - The default port for Apache Spark.
-   54321 - The default port for H2O.
-   4040 - The default port for Spark UI.

##### Storage Server

Cassandra:

-   7000 - For Inter node communication within cluster nodes
-   7001 - For inter node communication within cluster nodes vis SSL
-   9160 - For Thrift client connections
-   7199 - For JMX

HDFS:

-   54310 - Port used to connect to the default file system.
-   54311 - Port used by the MapRed job tracker
-   50470 - Name node secure HTTP server port
-   50475 - Data node secure HTTP server port
-   50010 - Data node server port for data transferring
-   50075 - Data node HTTP server port
-   50020 - Data node IPC server port

##### Enterprise Mobility Manager

The following ports need to be opened for Android and iOS devices so
that it can connect to Google Cloud Messaging (GCM)/Firebase Cloud
Messaging (FCM) and APNS (Apple Push Notification Service) and enroll to
WSO2 EMM.

Android:  
The ports to open are 5228, 5229 and 5230. GCM/FCM typically only uses
5228, but it sometimes uses 5229 and 5230.  
GCM/FCM does not provide specific IPs, so it is recommended to allow the
firewall to accept outgoing connections to all IP addresses contained in
the IP blocks listed in Google's ASN of 15169.

iOS:

-   5223 - TCP port used by devices to communicate to APNs servers
-   2195 - TCP port used to send notifications to APNs
-   2196 - TCP port  used by the APNs feedback service
-   443 - TCP port used as a fallback on Wi-Fi, only when devices are
    unable to communicate to APNs on port 5223  
    The APNs servers use load balancing. The devices will not always
    connect to the same public IP address for notifications. The entire
    17.0.0.0/8 address block is assigned to Apple, so it is best to
    allow this range in the firewall settings.

API Manager:

The following WSO2 API Manager ports are only applicable to WSO2 EMM
1.1.0 onwards.

-   10397 - Thrift client and server ports
-   8280, 8243 - NIO/PT transport ports

### Changing the offset for default ports

When you run multiple WSO2 products, multiple instances of the same
product, or multiple WSO2 product clusters on the same server or virtual
machines (VMs), you must change their default ports with an offset value
to avoid port conflicts. The default HTTP and HTTPS ports (without
offset) of a WSO2 product are 9763 and 9443 respectively. Port offset
defines the number by which all ports defined in the runtime such as the
HTTP/S ports will be changed. For example, if the default HTTP port is
9763 and the port offset is 1, the effective HTTP port will change to
9764. For each additional WSO2 product instance, you set the port offset
to a unique value. The default port offset is 0.

There are two ways to set an offset to a port:

-   Pass the port offset to the server during startup. The following
    command starts the server with the default port incremented by 3
    `          :./wso2server.sh -DportOffset=3         `
-   Set the Ports section of
    `          <PRODUCT_HOME>/repository/conf/carbon.xml         ` as
    follows: `          <Offset>3</Offset>         `

Usually, when you offset the port of the server, all ports it uses are
changed automatically. However, there are few exceptions as follows in
which you have to change the ports manually according to the offset. The
following table indicates the changes that occur when the offset value
is modified.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>WSO2 Server instance</p></td>
<td><p>PortOffset</p></td>
<td><p>Sample Default Port Value</p></td>
</tr>
<tr class="even">
<td><p>WSO2 Product 1</p></td>
<td><p>0</p></td>
<td><p>9443</p></td>
</tr>
<tr class="odd">
<td><p>WSO2 Product 2</p></td>
<td><p>1</p></td>
<td><p>9444</p></td>
</tr>
<tr class="even">
<td><p>WSO2 Product 3</p></td>
<td><p>2</p></td>
<td><p>9445</p></td>
</tr>
<tr class="odd">
<td><p>WSO2 Product 4</p></td>
<td><p>3</p></td>
<td><p>9446</p></td>
</tr>
<tr class="even">
<td><p>WSO2 Product 5</p></td>
<td><p>4</p></td>
<td><p>9447</p></td>
</tr>
</tbody>
</table>
