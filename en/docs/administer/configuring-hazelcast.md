# Configuring Hazelcast

WSO2 products use [Hazelcast](../../administer/clustering-overview) as
its default clustering engine. The following configuration must be
placed in the ` <IS_HOME>/repository/conf/deployment.toml ` file to
enable advanced cases.

```toml
    [hazelcast]
    "hazelcast.shutdownhook.enabled" = "false"
    "hazelcast.logging.type"= "log4j"
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

Once you enable advanced logs for hazelcast as explained above, change
`logger.com-hazelcast.level` configuration in the `
<IS_HOME>/repository/conf/log4j2.properties ` file. For more information
on logging, see [Monitoring Logs](../../setup/monitoring-logs).

```toml
logger.com-hazelcast.name = com.hazelcast
logger.com-hazelcast.level = INFO
```

Additionally, Hazelcast indicates that if all members are not mentioned
in the well-known member list, there can be a split-brain (network
partition) situation. If the cluster spans across data centers, it is
important to add all the members to the well-known members list in the `
<IS_HOME>/repository/conf/delpoyment.toml ` file.
     ```toml
     [clustering]
     ...
     members = ["<member-x-host>:<member-x-port>", ...]
     ```
     
!!! info 
    WSO2 Identity Server provides Hazelcast Community Edition as
    its default clustering engine. For clustering on a secure channel (i.e.,
    secure Hazelcast), use Hazelcast Enterprise. To integrate with Hazelcast
    Enterprise, there are provisions to provide license key under clustering
    configurations. Advanced users can fine-tune Hazelcast by creating the
    `hazelcast.properties` file in the `<IS_HOME>/repository/conf` directory
    and adding the relevant Hazelcast properties as described in the
    [Hazelcast Advanced Configuration Properties documentation](https://docs.hazelcast.org/docs/3.0/manual/html/ch12s06.html).
        
    To add the Hazelcast Enterprise subscription license key, add the following property to the hazelcast.properties file.
        ```java
        hazelcast.enterprise.license.key=<key>
        ```
