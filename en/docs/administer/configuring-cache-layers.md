# Configuring Cache Layers

WSO2 Identity Server has multiple cache layers which are used to improve performance. The following configurations that can be configured in the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory are used to manage and configure the cache layers.

```toml tab="Sample identity application management cache layer"
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

Each cache layer contains the following attributes: 

### name

The cache name is used to build the cache instance and is unique to a JVM. This name is used as the unique identifier when the carbon kernel creates the cache object for a specific cache requirement.

### enable

This parameter is used to enable the cache usage for a specific cache layer. If this parameter is disabled, it means that the feature will not cache the value and depending on the feature, will either persist it in a database or not store it at all at the server level.

### timeout

When a cache entry is added to the cache instance, the start time is recorded and the entry is stored until the time exceeds the timeout value. Once the time reaches the timeout, the cache entry is evicted from the cache. 

Set this value to `-1` to store the cache entry indefinitely.

### capacity

The capacity is the count of the cache entry. Note that this value is not related to the size of the cache.

### isDistributed
This parameter is used to distribute the cache entry over the cluster through Hazelcast. If it is set to false, the cache object is stored only in the local cache.

Disabling the distributed cache triggers the cache invalidation notification system, which notifies all other nodes in the cluster to invalide their local caches when one node is updating its local cache.

### AppAuthFrameworkSessionContextCache

The <a href="http://org.wso2.carbon.identity.application.authentication.framework.cache.sessioncontextcache/">SessionContextCache</a> object contains details about the authenticated user. This must be shared across the nodes in the cluster because this is the unique representation of the authenticated user.

### AuthenticationContextCache

Until the authentication request is successfully authenticated, all authentication information is stored in the <a href="http://org.wso2.carbon.identity.application.authentication.framework.cache.authenticationcontextcache/">AuthenticationContextCache</a> object, which needs to be shared across all nodes in the cluster. Once the user is authenticated successfully, this object will is removed from the cache and the required information is stored in the SessionContext cache.

### AuthenticationRequestCache

The <a href="http://org.wso2.carbon.identity.application.authentication.framework.cache.authenticationrequestcache/">AuthenticationRequestCache</a> object holds all the required details from the authentication request until the authentication flow is completed by the authentication framework. Note that this is not from the inbound protocol validator level. The Authentication Framework wraps the information to the AuthenticationRequestCache object and stores it in the cache.

### AuthenticationResultCache

The <a href="https://github.com/wso2/carbon-identity-framework/blob/de510362e3ef42845293e803a0c0060db3fe1864/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/cache/AuthenticationResultCache.java">AuthenticationResultCache</a> object holds the authentication result that contains the authenticated user details, claim mappings and other authentication specific results, and stores this information in the cache. Once the user gets authenticated through the authentication framework, it stores this object in the cache and reads the response from the inbound protocol handler once the response is built.

### AppInfoCache

The <a href="http://org.wso2.carbon.identity.oauth.cache.appinfocache/">AppInfoCache</a> is a complete representation of the OAuth application information in WSO2 Identity Server. It is unique for the client key and is stored in the cache by wrapping the “OAuthAppDO” object.

### AuthorizationGrantCache

The <a href="http://org.wso2.carbon.identity.oauth.cache.authorizationgrantcache/">AuthorizationGrantCache</a> manages the user information over tokens. This cache object contains the token, code, and user attributes for the authenticated user with some important information that is needed to access different flows such as id-token building.

### OAuthCache
The <a href="http://org.wso2.carbon.identity.oauth.cache.oauthcache/">OAuthCache</a> is a general cache implementation which is not specific to one type of cache. This is used for the following cache entries with its own specific cache key.

-	AccessToken: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f0e2e5009aaadd73722e0a5e2c6947d2168aab45/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/AccessTokenDO.java">Access Token Detail Object</a>
-	AuthorizationCode: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/7bceba9f0222d6594c4845917a85318651d21292/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/AuthzCodeDO.java">Authorization Code Detail Object</a>
-	ClientKey: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f1e36240557c548df91e2fd27a5929e149ced8b4/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/ClientCredentialDO.java">ClientCredential</a>
-	ClientKey + Username: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f1e36240557c548df91e2fd27a5929e149ced8b4/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/ClientCredentialDO.java">ClientCredential</a>

### OAuthScopeCache

The <a href="http://org.wso2.carbon.identity.oauth.cache.oauthscopecache/">OAuthScopeCache</a> object holds scope information such as the name and display name for each scope.

### OAuthSessionDataCache

Once the request is recieved by the inbound protocol validator, it keeps the requested data by wrapping it in the <a href="http://org.wso2.carbon.identity.oauth.cache.sessiondatacache/">OAuthSessionDataCache</a> object. This is stored against the sessionDataKey, which is used to manage the browser state.



