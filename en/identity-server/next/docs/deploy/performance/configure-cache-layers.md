# Configure cache layers

WSO2 Identity Server includes several cache layers that boost performance. You can manage and configure the cache layers using the following settings in the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` directory.

!!! info "Cache layer attributes"
    Each cache layer contains the following attributes:

	- **enable**: This is used to enable the cache usage for a specific cache layer. If this parameter is disabled, it means that the feature will not cache the value and depending on the feature, will either persist it in a database or not store it at all at the server level.
	- **timeout**: When a cache entry is added to the cache instance, the start time is recorded and the entry is stored until the time exceeds the timeout value. Once the time reaches the timeout, the cache entry is evicted from the cache. Set this value to `-1` to store the cache entry indefinitely.
	- **capacity**: This is the count of the cache entry. Note that this value is not related to the size of the cache.

## Identity application management cache layer

By default, the identity application management layer of WSO2 Identity Server is configured as follows:

??? example "Default identity application management cache layer configurations"

	```toml
	[cache.framework_session_context_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.authentication_context_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.authentication_request_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.authentication_result_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.app_info_cache]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.authorization_grant_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.oauth_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.oauth_scope_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.oauth_session_data_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.saml_sso_participant_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.saml_sso_session_index_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.saml_sso_session_data_cache]
	enable = true
	timeout = "300"
	capacity = "5000"

	[cache.service_provider_cache]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.provisioning_connector_cache]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.provisioning_entity_cache]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.service_provider_provisioning_connector_cache]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.idp_cache_by_auth_property]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.idp_cache_by_hri]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.idp_cache_by_name]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.service_provider_cache_id]
	enable = true
	timeout = "900"
	capacity = "5000"

	[cache.service_provider_cache_inbound_auth]
	enable = true
	timeout="900"
	capacity="5000"

	[cache.jwks_cache]
	enable=true
	timeout="300"
	capacity="5000"
	```

If required, you can update these default configurations by adding the relevant sections with the updated values to the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf` directory). See the table given below for more details on the configurations.

<table>
	<tr>
		<th>Parameter </th>
		<th>Description</th>
	</tr>
	<tr>
		<td>
			<code>[cache.framework_session_context_cache]</code>
		</td>
		<td>
			The <code>SessionContextCache</code> object contains details about the authenticated user. This must be shared across the nodes in the cluster because this is the unique representation of the authenticated user.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.authentication_context_cache]</code>
		</td>
		<td>
			Until the authentication request is successfully authenticated, all authentication information is stored in the <code>AuthenticationContextCache</code> object, which needs to be shared across all nodes in the cluster. Once the user is authenticated successfully, this object will be removed from the cache and the required information is stored in the SessionContext cache.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.authentication_request_cache]</code>
		</td>
		<td>
			The <code>AuthenticationRequestCache</code> object holds all the required details from the authentication request until the authentication flow is completed by the authentication framework. Note that this is not from the inbound protocol validator level. The Authentication Framework wraps the information to the AuthenticationRequestCache object and stores it in the cache.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.authentication_result_cache]</code>
		</td>
		<td>
			The <code>AuthenticationResultCache</code> object holds the authentication result that contains the authenticated user details, claim mappings and other authentication specific results, and stores this information in the cache. Once the user gets authenticated through the authentication framework, it stores this object in the cache and reads the response from the inbound protocol handler once the response is built.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.app_info_cache]</code>
		</td>
		<td>
			The <code>AppInfoCache</code> is a complete representation of the OAuth application information in WSO2 Identity Server. It is unique for the client key and is stored in the cache by wrapping the “OAuthAppDO” object.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.authorization_grant_cache]</code>
		</td>
		<td>
			The <code>AuthorizationGrantCache</code> manages the user information over tokens. This cache object contains the token, code, and user attributes for the authenticated user with some important information that is needed to access different flows such as id-token building.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.oauth_cache]</code>
		</td>
		<td>
			The <code>OAuthCache</code> is a general cache implementation which is not specific to one type of cache. This is used for the following cache entries with its own specific cache key.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.oauth_cache]</code>
		</td>
		<td>
			The <code>OAuthCache</code> is a general cache implementation which is not specific to one type of cache. This is used for the following cache entries with its own specific cache key.
			<ul>
				<li>
					AccessToken: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f0e2e5009aaadd73722e0a5e2c6947d2168aab45/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/AccessTokenDO.java">Access Token Detail Object</a>
				</li>
				<li>
					AuthorizationCode: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/7bceba9f0222d6594c4845917a85318651d21292/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/AuthzCodeDO.java">Authorization Code Detail Object</a>
				</li>
				<li>
					ClientKey: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f1e36240557c548df91e2fd27a5929e149ced8b4/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/ClientCredentialDO.java">ClientCredential</a>
				</li>
				<li>
					ClientKey + Username: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f1e36240557c548df91e2fd27a5929e149ced8b4/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/ClientCredentialDO.java">ClientCredential</a>
				</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.oauth_scope_cache]</code>
		</td>
		<td>
			The <code>OAuthScopeCache</code> object holds scope information such as the name and display name for each scope.
		</td>
	</tr>
	<tr>
		<td>
			<code>[cache.oauth_session_data_cache]</code>
		</td>
		<td>
			Once the request is received by the inbound protocol validator, it keeps the requested data by wrapping it in the <code>OAuthSessionDataCache</code> object. This is stored against the sessionDataKey, which is used to manage the browser state.
		</td>
	</tr>
</table>

## Identity claim metadata management cache layer

WSO2 Identity Server allows you to configure the following identity claim metadata layer attributes:

??? example "Click to view a sample of the identity claim metadata management cache layer"

	``` toml
	[[cache_config.cache_manager]]
	name = "IdentityClaimMetadataMgtCacheManager"

    [[cache_config.cache_manager.cache]]
    name = "LocalClaimCache"
    timeout = "900"
    capacity = "5000"

	[[cache_config.cache_manager.cache]]
	name = "ExternalClaimCache"
	timeout = "900"
	capacity = "5000"

	[[cache_config.cache_manager.cache]]
	name = "ClaimDialectCache"
	timeout = "900"
	capacity = "5000"
	```

<table>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>
			<code>LocalClaimCache</code>
		</td>
		<td>
			This enables caching local cache properties such as mapped attributes.
		</td>
	</tr>
	<tr>
		<td>
			<code>ExternalClaimCache</code>
		</td>
		<td>
			This enables caching external cache properties such as mapped local claim.
		</td>
	</tr>
	<tr>
		<td>
			<code>ClaimDialectCache</code>
		</td>
		<td>
			This enables caching the list of claim dialects.
		</td>
	</tr>
</table>

## Add a new CacheManager

To add a new cache manager, add the following configuration to `<IS_HOME>/repository/conf/deployment.toml`.

```toml
[[cache_config.cache_manager]]
name="sampleCacheManager"
[[cache_config.cache_manager.cache]]
name="sampleCache1"
timeout=300
capacity=5000
[[cache_config.cache_manager.cache]]
name="sampleCache2"
timeout=300
capacity=5000
[[cache_config.cache_manager.cache]]
name="sampleCache3"
timeout=300
capacity=5000
```

This will add the following custom `CacheManager` configuration to `<IS_HOME>/repository/conf/identity/identity.xml`.

```xml
<CacheManager name="sampleCacheManager">
	<Cache
	name="sampleCache1"
	timeout="300"
	capacity="5000"
	enable="true"
	isDistributed="false"/>
	<Cache
	name="sampleCache2"
	timeout="300"
	capacity="5000"
	enable="true"
	isDistributed="false"/>
	<Cache
	name="sampleCache3"
	timeout="300"
	capacity="5000"
	enable="true"
	isDistributed="false"/>
</CacheManager>
```

---

## Global cache configurations

In addition to configuring individual cache layers, you can configure the overall behavior of the caching engine and the mechanism used to dispatch cache invalidation notifications across nodes under the `[server.cache]`, `[cache_invalidator.mb]`, and `[server]` sections in `<IS_HOME>/repository/conf/deployment.toml`.

### Cache invalidation sender (`invalidation_impl`)

When an entry in a local cache is updated or removed, WSO2 Identity Server invokes a cache invalidation request sender to notify other nodes in the deployment. The implementation class used to publish invalidation events is specified using the `invalidation_impl` property:

```toml
[server.cache]
invalidation_impl = "org.wso2.carbon.cache.sync.jms.manager.JMSProducer"
```

The parameters available under `[server.cache]` are as follows:

| Parameter | Type | Default Value | Description |
| --- | --- | --- | --- |
| `invalidation_impl` | String | `org.wso2.carbon.caching.impl.clustering.ClusterCacheInvalidationRequestSender` | The fully qualified class name of the `javax.cache.CacheInvalidationRequestSender` implementation. |
| `propagation_enabled` | Boolean | `false` | Enables propagating cache invalidation messages across clusters when using the hybrid deployment mode with `carbon-cache-sync-manager`. |

!!! warning "Critical requirement when Hazelcast is disabled"
    By default, `invalidation_impl` uses `org.wso2.carbon.caching.impl.clustering.ClusterCacheInvalidationRequestSender`, which requires **Hazelcast clustering** to be enabled (`[clustering] enabled = true`).
    
    If Hazelcast clustering is **disabled** and you are using a message broker (through `carbon-cache-sync-manager`) for cross-node cache invalidation, you **must explicitly configure**:
    ```toml
    [server.cache]
    invalidation_impl = "org.wso2.carbon.cache.sync.jms.manager.JMSProducer"
    ```
    If this property is omitted, the default sender detects that the clustering agent is unavailable and **silently discards** all cache invalidation events without logging any warning. While message broker connection logs appear healthy, peer nodes will not receive invalidations and will continue serving stale authentication, role, and authorization data.

### Message broker cache invalidator (`[cache_invalidator.mb]`)

When using the `carbon-cache-sync-manager` connector for cache invalidation across nodes or clusters, configure the message broker connection under `[cache_invalidator.mb]`:

```toml
[cache_invalidator.mb]
enabled = true
broker_type = "jms"
initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
provider_url = "failover:tcp://activemq-server:61616"
topic_name = "CacheTopic"
producer_name = "node-1"
hybrid_mode_enabled = false
username = "guest"
password = "guest"
```

The parameters available under `[cache_invalidator.mb]` are as follows:

| Parameter | Type | Default Value | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `false` | Enables or disables the message broker cache invalidation connector. |
| `broker_type` | String | `jms` | Type of broker. Supported values: `jms` (for ActiveMQ, IBM MQ, etc.) and `rabbitmq`. |
| `initial_naming_factory` | String | - | JNDI initial context factory class name (required for `jms`). |
| `provider_url` | String | - | Connection URL for the message broker. |
| `topic_name` | String | - | Name of the pub/sub topic used to exchange cache invalidation messages. |
| `producer_name` | String | - | Unique identifier for each node in the cluster. |
| `hybrid_mode_enabled` | Boolean | `false` | Enables hybrid mode (running alongside Hazelcast clustering). |
| `username` | String | - | Username for broker authentication. |
| `password` | String | - | Password for broker authentication. |

For complete end-to-end setup instructions, required libraries, and troubleshooting, see [Configure message broker cache invalidation]({{base_path}}/deploy/configure-message-broker-cache-invalidation).

### Force local cache

```toml
[server]
force_local_cache = true
```

The `force_local_cache` parameter determines whether caches act as local caches on each node or as distributed memory maps. In modern deployments, it is strongly recommended to maintain `force_local_cache = true` (default) and rely on invalidation notifications (through Hazelcast or a message broker) to maintain cache coherence.

