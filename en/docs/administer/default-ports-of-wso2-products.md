# Default Ports

This page describes the default ports that are used for each WSO2
product when the port offset is `0`.

### Management console ports

WSO2 Identity Server Management Console use the following servlet transport ports:

-   `9443` - HTTPS servlet transport (the default URL of the management
    console is `https://localhost:9443/carbon`)
-   `9763` - HTTP servlet transport

### LDAP server ports

This is provided by default in the WSO2 Identity Server.

-   10389 - Used in WSO2 products that provide an embedded LDAP server

### KDC ports

-   `8000` - This is used to expose the Kerberos key distribution center server.

### JMX monitoring ports

WSO2 Identity Server uses TCP ports to monitor a running Carbon instance
using a JMX client such as JConsole. By default, JMX is enabled in all
products. You can disable it using `<IS_HOME>/repository/conf/deployment.toml` file.

-   `11111` - RMIRegistry port. Used to monitor Carbon remotely
-   `9999` - RMIServer port. Used along with the RMIRegistry port when
    Carbon is monitored from a JMX client that is behind a firewall

```
[monitoring.jmx.rmi]
hostname = ""
```


### Clustering ports

To cluster any running WSO2 Identity Server instance, either one of the following
ports must be opened.

-   `45564` - Opened if the membership scheme is multicast.
-   `4000` - Opened if the membership scheme is wka.

### Random ports

Certain ports are randomly opened during server startup. This is due to
specific properties and configurations that become effective when the
product is started. Note that the IDs of these random ports will change
every time the server is started.

-   A random TCP port will open at server startup because of the
    `          -Dcom.sun.management.jmxremote         ` property set in
    the server startup script. This property is used for the
    JMX monitoring facility in JVM.
-   A random UDP port is opened at server startup due to the log4j
    appender (`          SyslogAppender         `), which is
    configured in the
    `          <PRODUCT_HOME>/repository/conf/log4j.properties         `
    file.



### Thrift entitlement receiv port 

-   `10500` - ThriftEntitlementReceivePort


