# Configuring Cache Layers

WSO2 Identity Server has multiple cache layers which are used to improve performance. The following configurations that can be configured in the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory are used to manage and configure the cache layers. 

!!! info "Cache layer attributes"

	Each cacher layer contains the following attributes:

	-	**enable**: This is used to enable the cache usage for a specific cache layer. If this parameter is disabled, it means that the feature will not cache the value and depending on the feature, will either persist it in a database or not store it at all at the server level.
	-	**timeout**: When a cache entry is added to the cache instance, the start time is recorded and the entry is stored until the time exceeds the timeout value. Once the time reaches the timeout, the cache entry is evicted from the cache. Set this value to `-1` to store the cache entry indefinitely. 
	-	**capacity**: This is the count of the cache entry. Note that this value is not related to the size of the cache. 

## Identity application management cache layer

WSO2 Identity Server enables configuring the following identity application management layer attributes.

-	**AppAuthFrameworkSessionContextCache**: The `SessionContextCache` object contains details about the authenticated user. This must be shared across the nodes in the cluster because this is the unique representation of the authenticated user.

-	**AuthenticationContextCache**: Until the authentication request is successfully authenticated, all authentication information is stored in the `AuthenticationContextCache` object, which needs to be shared across all nodes in the cluster. Once the user is 

-	**AppAuthFrameworkSessionContextCache**: The `SessionContextCache` object contains details about the authenticated user. This must be shared across the nodes in the cluster because this is the unique representation of the authenticated user.

-	**AuthenticationContextCache**: Until the authentication request is successfully authenticated, all authentication information is stored in the `AuthenticationContextCache` object, which needs to be shared across all nodes in the cluster. Once the user is authenticated successfully, this object will is removed from the cache and the required information is stored in the SessionContext cache.

-	**AuthenticationRequestCache**: The `AuthenticationRequestCache` object holds all the required details from the authentication request until the authentication flow is completed by the authentication framework. Note that this is not from the inbound protocol validator level. The Authentication Framework wraps the information to the AuthenticationRequestCache object and stores it in the cache.

-	**AuthenticationResultCache**: The `AuthenticationResultCache` object holds the authentication result that contains the authenticated user details, claim mappings and other authentication specific results, and stores this information in the cache. Once the user gets authenticated through the authentication framework, it stores this object in the cache and reads the response from the inbound protocol handler once the response is built.

-	**AppInfoCache**: The `AppInfoCache` is a complete representation of the OAuth application information in WSO2 Identity Server. It is unique for the client key and is stored in the cache by wrapping the “OAuthAppDO” object.

-	**AuthorizationGrantCache**: The `AuthorizationGrantCache` manages the user information over tokens. This cache object contains the token, code, and user attributes for the authenticated user with some important information that is needed to access different flows such as id-token building.

-	**OAuthCache**: The `OAuthCache` is a general cache implementation which is not specific to one type of cache. This is used for the following cache entries with its own specific cache key. 
	-	AccessToken: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f0e2e5009aaadd73722e0a5e2c6947d2168aab45/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/AccessTokenDO.java">Access Token Detail Object</a>
	-	AuthorizationCode: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/7bceba9f0222d6594c4845917a85318651d21292/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/AuthzCodeDO.java">Authorization Code Detail Object</a>
	-	ClientKey: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f1e36240557c548df91e2fd27a5929e149ced8b4/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/ClientCredentialDO.java">ClientCredential</a>
	-	ClientKey + Username: <a href="https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/f1e36240557c548df91e2fd27a5929e149ced8b4/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/model/ClientCredentialDO.java">ClientCredential</a> 

-	**OAuthScopeCache**: The `OAuthScopeCache` object holds scope information such as the name and display name for each scope.

-	**OAuthSessionDataCache**: Once the request is recieved by the inbound protocol validator, it keeps the requested data by wrapping it in the `OAuthSessionDataCache` object. This is stored against the sessionDataKey, which is used to manage the browser state.

??? example "Click to see a sample identity application management cache layer"

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

## Identity claim metadata management cache layer

WSO2 Identity Server enables configuring the following identity claim metadata layer attributes:
-	**LocalClaimCache**: This enables caching local cache properties such as mapped attributes.
-	**ExternalClaimCache**: This enables caching external cache properties such as mapped local claim. 
-	**ClaimDialectCache**: This enables caching the list of claim dialects. 

??? example "Click to view a sample of the identity claim metadata management cache layer"

	``` toml
	<CacheManager name="IdentityClaimMetadataMgtCacheManager">
	    <Cache name="LocalClaimCache"   enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
	    <Cache name="ExternalClaimCache"  enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
	    <Cache name="ClaimDialectCache"  enable="true"  timeout="900" capacity="5000" isDistributed="false"/>   
	</CacheManager>
	```

## Adding a new CacheManager

To add a new cache manager, add the following configuration in `<IS-HOME>/repository/conf/deployment.toml`. 

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

This will add the following custom `CacheManager` configuration in `<IS_HOME>/repository/conf/identity/identity.xml`.

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

