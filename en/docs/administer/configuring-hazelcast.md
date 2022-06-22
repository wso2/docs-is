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
    "hazelcast.logging.type" = "log4j2"
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
` <IS_HOME>/repository/conf/deployment.toml `file for better reliability of the cluster. These properties make sure that
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

Applications are scaled horizontally when good performance and reliability are critical. But here comes the problem 
with caching; the cache coherence problem.

For example, let’s assume there are two WSO2 IS nodes deployed and node A issues an access token and then a token 
revocation request comes to node B. Still, node A is not aware of this cache revocation event, and it still keeps track 
of the previously issued access token as a valid one in its cache.

Now the old access token will still be valid according to node A even though it is already revoked by node B until the 
access token cache object in node A expires.

If there are multiple WSO2 IS nodes in the deployment, the cache coherence problem is inevitable. One could think of 
disabling all the cache layers. But it is a huge sacrifice of performance. It is not only about access tokens, but there 
are multiple cache layers [Configuring Cache Layers](../../setup/configuring-cache-layers/), and it could lead to 
unexpected scenarios with any of them.

Hazelcast is an in-memory data grid, which is used in clustering and distributed shared memory. When using Hazelcast as 
a clustering implementation, data is evenly distributed among the nodes in a cluster. But later on, it was decided to 
avoid using distributed shared memory, but keep caches local to each node in the cluster and use messages to cluster 
members in order to notify about cache invalidations when required. This was due to many practical issues that are 
related to configuring and running distributed caching properly where the network is not tightly controlled hence, 
distributed caching fails in unexpected ways. There are multiple clustered deployment cache scenarios and the 
recommended approach is “All caches are local with distributed cache invalidation”. You can expand the topic 
[Caching in WSO2 Identity Server](../../setup/deployment-guide/#clustering-related-configurations) to read about other 
cache scenarios and their disadvantages. With the above approach, the WSO2 Identity Server employs Hazelcast as the 
primary method of implementing cluster messages while using distributed caching in a simple setup. Cache invalidation 
uses Hazelcast messaging to distribute the invalidation message over the cluster and invalidate the caches properly.
