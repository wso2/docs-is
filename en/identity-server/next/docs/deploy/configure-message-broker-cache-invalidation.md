# Configure message broker cache invalidation

WSO2 Identity Server supports cross-node and cross-cluster cache invalidation using a central Message Broker (such as Apache ActiveMQ, RabbitMQ, or IBM MQ) through the `carbon-cache-sync-manager` connector.

This deployment pattern is recommended for:

- **Cloud-native and containerized deployments** (e.g., Kubernetes, AWS ECS) where dynamic pod lifecycles, autoscaling, and overlay networking make Hazelcast clustering complex or brittle.
- **Active-Active multi-datacenter deployments** where cache invalidation notifications must be exchanged across geographically distributed data centers without a shared network layer.

---

## Deployment topologies

WSO2 Identity Server supports two primary topologies when using the message broker cache synchronization connector:

### Broker-only topology (Hazelcast disabled)

In this topology, Hazelcast clustering is disabled (`[clustering] enabled = false`). Every WSO2 Identity Server node operates as an independent instance connected to a shared database and a central message broker.

- When a cache modification occurs on any node (e.g., role assignment, user update, session revocation), the local cache invalidation sender publishes an invalidation event to the broker topic.
- All peer nodes subscribed to the topic receive the message and evict the corresponding entry from their local caches.
- **Critical:** Because Hazelcast is disabled, you **must** configure `[server.cache] invalidation_impl = "org.wso2.carbon.cache.sync.jms.manager.JMSProducer"`.

### Hybrid topology (Hazelcast and message broker)

In this topology, Hazelcast clustering is enabled within each local cluster (e.g., within Data Center A and within Data Center B), while the message broker connects the clusters together.

- Intra-cluster invalidations are propagated directly using Hazelcast messaging.
- One node in each cluster acts as the cluster coordinator and relays invalidation events to the central message broker.
- The coordinator in the receiving cluster consumes the event from the broker and disseminates it to local nodes via Hazelcast.
- This topology requires `[cache_invalidator.mb] hybrid_mode_enabled = true` and `[server.cache] propagation_enabled = true`.

---

## Prerequisites

1. Download or build the `org.wso2.carbon.cache.sync.jms.manager-<version>.jar` connector from the [carbon-cache-sync-manager repository](https://github.com/wso2-extensions/carbon-cache-sync-manager).
2. Copy the connector JAR into `<IS_HOME>/repository/components/dropins/`.
3. Provide the required client libraries based on your message broker:
    - **Apache ActiveMQ (JMS):**
        - Copy `jms-api_2-2.0.1.wso2v1.jar` (or equivalent JMS 2.0 API bundle) into `<IS_HOME>/repository/components/dropins/`.
        - Copy your ActiveMQ client library (e.g., `activemq-client-*.jar` and related dependencies) into `<IS_HOME>/repository/components/lib/`.
    - **RabbitMQ:**
        - Copy the RabbitMQ JMS client library and its dependencies into `<IS_HOME>/repository/components/dropins/` or `<IS_HOME>/repository/components/lib/`.
    - **IBM MQ:**
        - Copy the IBM MQ JMS client libraries into `<IS_HOME>/repository/components/dropins/` or `<IS_HOME>/repository/components/lib/`.

---

## Configuration

Configure the connector and caching behavior in the `<IS_HOME>/repository/conf/deployment.toml` file across all WSO2 Identity Server nodes.

### Configure broker-only topology (Hazelcast disabled)

When Hazelcast is disabled, configure `deployment.toml` as follows:

```toml
[clustering]
enabled = false

# Mandatory: Direct cache invalidation events to JMSProducer
[server.cache]
invalidation_impl = "org.wso2.carbon.cache.sync.jms.manager.JMSProducer"

# Message broker connector configuration (Example: Apache ActiveMQ)
[cache_invalidator.mb]
enabled = true
broker_type = "jms"
initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
provider_url = "failover:tcp://activemq-server:61616"
topic_name = "CacheTopic"
producer_name = "node-1" # Specify a unique identifier per server node
hybrid_mode_enabled = false
username = "guest"
password = "guest"
```

!!! danger "Mandatory requirement: `invalidation_impl`"
    When Hazelcast clustering is disabled, you **must** configure:
    ```toml
    [server.cache]
    invalidation_impl = "org.wso2.carbon.cache.sync.jms.manager.JMSProducer"
    ```
    If `invalidation_impl` is not configured:
    - The server defaults to `org.wso2.carbon.caching.impl.clustering.ClusterCacheInvalidationRequestSender`.
    - Because Hazelcast is disabled, this sender finds no active clustering agent and **silently drops all cache invalidation events**.
    - No warning or error is printed in the server logs (`wso2carbon.log`).
    - The broker connection continues to appear healthy, but peer nodes never receive cache invalidations and will serve **stale role, authorization, and session data**.

### Configure RabbitMQ (broker-only)

```toml
[clustering]
enabled = false

[server.cache]
invalidation_impl = "org.wso2.carbon.cache.sync.jms.manager.JMSProducer"

[cache_invalidator.mb]
enabled = true
broker_type = "rabbitmq"
provider_url = "amqp://user:password@rabbitmq-server:5672"
topic_name = "CacheTopic"
producer_name = "node-1"
hybrid_mode_enabled = false
```

### Configure hybrid topology (Hazelcast and message broker)

```toml
[clustering]
enabled = true

[server.cache]
propagation_enabled = true

[cache_invalidator.mb]
enabled = true
broker_type = "jms"
initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
provider_url = "failover:tcp://activemq-server:61616"
topic_name = "CacheTopic"
producer_name = "cluster-a-node-1"
hybrid_mode_enabled = true
username = "guest"
password = "guest"
```

---

## Configuration parameter reference

The following tables describe the configuration parameters available for message broker-based cache invalidation.

### Server cache parameters (`[server.cache]`)

| Parameter | Type | Default Value | Description |
| --- | --- | --- | --- |
| `invalidation_impl` | String | `org.wso2.carbon.caching.impl.clustering.ClusterCacheInvalidationRequestSender` | The fully qualified class name of the invalidation sender. Set to `org.wso2.carbon.cache.sync.jms.manager.JMSProducer` when running with Hazelcast disabled. |
| `propagation_enabled` | Boolean | `false` | Enables inter-cluster invalidation propagation in hybrid mode. |

### Message broker cache invalidator parameters (`[cache_invalidator.mb]`)

| Parameter | Type | Default Value | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `false` | Enables or disables the message broker cache invalidation connector. |
| `broker_type` | String | `jms` | Type of broker. Supported values: `jms` (for ActiveMQ, IBM MQ, etc.) and `rabbitmq`. |
| `initial_naming_factory` | String | - | JNDI initial context factory class name (required for `jms`). Example: `org.apache.activemq.jndi.ActiveMQInitialContextFactory`. |
| `provider_url` | String | - | Connection URL for the message broker. |
| `topic_name` | String | - | Name of the pub/sub topic used to exchange cache invalidation messages. |
| `producer_name` | String | - | Unique identifier for each node in the cluster. Facilitates identifying the sender of each message. |
| `hybrid_mode_enabled` | Boolean | `false` | Enables hybrid mode (running alongside Hazelcast clustering). |
| `username` | String | - | Username for broker authentication. |
| `password` | String | - | Password for broker authentication. |

---

## Verification and troubleshooting

Follow these procedures to verify that cache invalidation works as expected and to diagnose issues.

### Verify cache invalidation

1. Deploy two WSO2 Identity Server instances (Node 1 and Node 2) connected to the same message broker and shared database.
2. In the Node 1 **Console**, assign a new role or modify permissions for a test user.
3. Access a protected API or resource via Node 2 using the test user's credentials.
4. Verify that Node 2 immediately recognizes the updated roles and permissions without waiting for local cache expiration (default 15 minutes).

### Diagnostic logging

To enable debug logs for the message broker cache synchronizer, append the following logger configuration to `<IS_HOME>/repository/conf/log4j2.properties`:

```properties
logger.cache-sync.name = org.wso2.carbon.cache.sync.jms.manager
logger.cache-sync.level = DEBUG
```

When cache modifications occur, Node 1 logs:

```text
DEBUG {org.wso2.carbon.cache.sync.jms.manager.JMSProducer} - Sending cache invalidation message to other cluster nodes for '<cache-key>' of the cache '<cache-name>'
```

And Node 2 logs:

```text
DEBUG {org.wso2.carbon.cache.sync.jms.manager.JMSConsumer} - Received cache invalidation message from sender ...
```
