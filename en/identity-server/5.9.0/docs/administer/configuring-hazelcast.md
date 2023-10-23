# Configuring Hazelcast

WSO2 products use [Hazelcast](../../administer/clustering-overview) as
its default clustering engine. 

## Configuring advanced use cases

The following configuration must be
placed in the ` <IS_HOME>/repository/conf/deployment.toml ` file to
enable advanced cases.

```toml
[hazelcast]
"hazelcast.shutdownhook.enabled" = "false"
"hazelcast.logging.type"= "log4j2"
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
    logging type to log4j2, which allows hazelcast logs to be written to
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

The following properties can also be placed under `[hazelcast]` in the
` <IS_HOME>/repository/conf/deployment.toml` file for better reliability of the cluster.These properties make sure that
the cluster is not affected in situations where one of the nodes suddenly go offline.

```toml
[hazelcast]
hazelcast.heartbeat.interval.seconds = 1
hazelcast.master.confirmation.interval.seconds = 5
hazelcast.max.no.heartbeat.seconds = 20
hazelcast.max.no.master.confirmation.seconds = 30
```

Furthermore, if you need to disable the Hazelcast version check network call, you need to add the following properties in the
`<IS_HOME>/repository/conf/deployment.toml `file. See the [Hazelcast advanced configuration properties documentation](https://docs.hazelcast.org/docs/3.0/manual/html/ch12s06.html) for details.

```toml
hazelcast.version.check.enabled = "false"
hazelcast.phone.home.enabled = "false"
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

## Why Hazelcast is required for a clustered deployment

Applications are scaled horizontally when good performance and reliability are critical to a deployment. However, horizontal scaling introduces the problem of **cache coherence**.

!!! info "What is cache coherence?"

    Let’s assume there are two WSO2 IS nodes (A and B) clustered in a deployment.  Consider a scenario where node A issues an access token and then a token revocation request comes to node B. Because node A is not aware of the cache renovation event, it will continue to keep track of the previously issues access token as a valid token in its cache. The access token of node A is removed only when the token cache object of node A expires. 

    Cache coherence is inevitable in a multi-node WSO2 deployment. If you disable all the cache layers to solve this problem, you are sacrificing good performance. Further, the existence of multiple cache layers (see [Configuring Cache Layers](../../setup/configuring-cache-layers/)) could also lead to unexpected problems. 

The current Hazelcast implementation in WSO2 IS solves this problem of **cache coherence** for clustered deployments by ensuring that all caches are maintained locally for each node while facilitating distributed cache invalidation. In this method, although caches are local to each node, the nodes will use messages to notify each other when cache invalidation occurs in any of the nodes. Thereby, cache invalidation will be synchronised across all cluster nodes.

Note the following about this Hazelcast implementation in WSO2 IS:

- Distributed shared memory (which Hazelcast is typically used for) is avoided and instead, caches are maintained locally in each node. This is due to practical issues that affect distributed caching in scenarios where the network is not tightly controlled.
- There are multiple caching solutions for a clustered deployment. See [Caching in WSO2 Identity Server](../../setup/deployment-guide/#clustering-related-configurations) for details. However, local caches with distributed cache invalidation is the recommended method.
