# Configuring Hazelcast

WSO2 products use
[Hazelcast](../../administer/clustering-overview)
as its default clustering engine. The following configuration must be
placed in the
`         <IS_HOME>/repository/conf/hazelcast.properties        `
file. Create this file if it does not exist.

``` java
    hazelcast.shutdownhook.enabled=false
    hazelcast.logging.type=log4j
```

The above configurations are explained below.

-   **Hazelcast shutdown hook:** This configuration disables the
    shutdown hook in hazelcast, which ensures that the hazelcast
    instance shuts down gracefully whenever the product node shuts down.
    If the hazelcast shutdown hook is enabled (which is the default
    behavior of a product), you will see errors such as "
    *Hazelcast instance is not active!* " at the time of shutting down
    the product node: This is because the hazelcast instance shuts down
    too early when the shutdown hook is enabled.
-   **Hazelcast logging type:** This configuration sets the hazelcast
    logging type to log4j, which allows hazelcast logs to be written to
    the `          wso2carbon.log         ` file.

Once you enable log4j for hazelcast as explained above, add
`         log4j.logger.com.hazelcast=INFO        ` to the
`         <IS_HOME>/repository/conf/log4j.properties        `
file. For more information on logging, see [Monitoring
Logs](../../setup/monitoring-logs).

Additionally, Hazelcast indicates that if all members are not mentioned
in the well-known member list, there can be a split-brain (network
partition) situation. If the cluster spans across data centers, it is
important to add all the members to the well-known members list in the
`         <IS_HOME>/repository/conf/axis2/axis2.xml        ` file.