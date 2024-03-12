# Configure Hazelcast

WSO2 Identity Server uses Hazelcast <!--({{base_path}}/deploy/set-up-separate-databases-for-clustering/)--> as its default clustering engine.

Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file to enable advanced configurations related to hazelcast.

```toml
[hazelcast]
"hazelcast.shutdownhook.enabled" = "false"
"hazelcast.logging.type"= "log4j2"
```

The configurations are as follows:

- **Hazelcast shutdown hook**:

    - This configuration is enabled by default. Disabling this will ensure that the hazelcast instance shuts down gracefully whenever the product node shuts down.
    - If the hazelcast shutdown hook is enabled, you will see the **Hazelcast instance is not active!** error message at the time of shutting down the product node. This is because the hazelcast instance shuts down early when the shutdown hook is enabled.

- **Hazelcast logging type**:

    - This configuration sets the hazelcast logging type to log4j, which allows hazelcast logs to be written to the `wso2carbon.log` file.

Once you enable advanced logs for hazelcast as explained above, update the configuration of `logger.com-hazelcast.level` in the `<IS_HOME>/repository/conf/log4j2.properties` file. For more information on logging, see [Monitor Logs]({{base_path}}/deploy/monitor/monitor-logs).

```toml
logger.com-hazelcast.name = com.hazelcast
logger.com-hazelcast.level = INFO
```

Additionally, Hazelcast indicates that if all members are not mentioned in the well-known member list, there can be a split-brain (network partition) situation. If the cluster spans across data centers, it is
important to add all the members to the well-known member list in the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[clustering]
...
members = ["<member-x-host>:<member-x-port>", ...]
```

!!! info
    WSO2 Identity Server provides Hazelcast Community Edition as its default clustering engine. For clustering on a secure channel (i.e., secure Hazelcast), use Hazelcast Enterprise.
    To integrate with Hazelcast Enterprise, there are provisions to provide license keys under clustering configurations. Advanced users can fine-tune Hazelcast by creating the `hazelcast.properties` file in the `<IS_HOME>/repository/conf` directory and adding the relevant Hazelcast properties as described in the [Hazelcast Advanced Configuration Properties documentation](https://docs.hazelcast.org/docs/3.0/manual/html/ch12s06.html).

    To add the Hazelcast Enterprise subscription license key, add the following property to the `hazelcast.properties` file.
        
    ```java
    hazelcast.enterprise.license.key=<key>
    ```

## Why is it mandatory to enable Hazelcast when there are multiple nodes

Applications are scaled horizontally when good performance and reliability are critical. But here comes the problem with caching; the cache coherence problem.

For example, let’s assume there are two WSO2 IS nodes deployed, and node A issues an access token and then a token revocation request comes to node B. Still, node A is not aware of this cache revocation event, and it still keeps track of the previously issued access token as a valid one in its cache.

Now the old access token will still be valid according to node A even though it is already revoked by node B until the access token cache object in node A expires.

If there are multiple WSO2 IS nodes in the deployment, the cache coherence problem is inevitable. One could think of disabling all the cache layers. But it is a huge sacrifice of performance. It is not only about access tokens, but there are multiple cache layers [Configuring Cache Layers]({{base_path}}/deploy/performance/configure-cache-layers/), and it could lead to unexpected scenarios with any of them.