# Improving XACML PDP Performance with Caching Techniques

One way of improving the performance of a XACML engine is by using
caching techniques. However, caching implementation must be designed
carefully. When looking at the XACML reference architecture, we could
identify that, caching can be done in four places.

![pdp-caching-techniques](../assets/img/tutorials/pdp-caching-techniques.jpg)

1.  XACML policies can be cached as policies are usually stored in a
    database or file system. This can be done for each request, if is
    not desirable to load them from the database or file system.
    Therefore it is required to cache the XACML policies.
2.  Attribute values that are retrieved from external pips can be cached
    as those attribute values may be retrieved from external sources
    such as Web Services, remote JDBC and remote LDAP servers.
3.  XACML decisions can be cached at PDP level. For most scenarios, the
    same authorization query can hit the PDP multiple times, therefore
    it creates a considerable performance hit if the decision can be
    cached before hitting the PDP.
4.  XACML decisions can also be cached in PEP level. This would probably
    gain a magnificent performance hit. It means that PEP do not want to
    query the XACML PDP for authorization queries and this would save
    the time needed for the XACML query and response in the transport
    between PEP and PDP.

Lets go through above mentioned, four type of caches in some details and
identify the important design considerations. Also lets briefly discuss
how WSO2 Identity Server has implemented these.

### Policy Cache

1.  Policy cache must be updated when any update is happened within the
    policy store.
2.  Policy cache must be distributed among clustered PDPs.
3.  Whether to load all policies into the cache or on demand loading
    policies. If all policies (1000 – 10000 policies) are loaded into
    memory where the limited resources are available, there can be out
    of memory issues.

WSO2 Identity Server stores XACML policies in the registry and if any
update happens from PAP, all policies are reloaded into the cache.
However, there is also an option in Identity Server to load policies on
demand. Here you can configure the maximum number of policies that can
be kept in the cache.

WSO2 Identity Server is using **Hazelcast** for underlying caching
implementation to distribute the policy cache among clustered Identity
Servers.

### Attribute Cache

1.  Attribute cache or cache entry must be updated (invalidated), when
    external attribute sources are updated.
2.  Cache or cache entry updating (invalidating) messages must be
    distributed among clustered PDPs

Attribute cache would cache attribute values that are retrieved from all
the PIP extensions. It is actually a common cache for all PIP
extensions. However, If PIP prefers to keep their own cache
implementation, it is allowed by overriding the default cache. If you
throw the API of the “PIPAttributeFinder”, you can see those methods.

WSO2 Identity Server provides set of APIs to invalidate the attribute
cache or cache entries whenever external attribute sources are updated.
Attribute Cache is distributed among cluster nodes using **Hazelcast**
caching implementation. The distribution of cache invalidation messages
among cluster nodes is done very efficiently.

### Decision Cache

1.  PDP Decision cache must be invalidated, when policy cache updated,
    attribute cache is invalidated and global policy combining algorithm
    is updated.
2.  Cache invalidation messages must be distributed among clustered PDPs

WSO2 Identity Server provides a concurrent hash map based caching
implementation as the decision cache. Cache is not distributed among
cluster nodes. Only the cache invalidation messages are distributing by
using the same **Hazelcast** caching implementation. Therefore if the
cache is invalidated in one node, all decision caches in other nodes are
also invalidated. Also there is some invalidation time interval for each
cache entry (Decision). The time out value can be configurable and this
would lead a solution for cache growth.

### PEP Decision Cache

1.  PEP Decision cache must be invalidated when policy cache updated,
    attribute cache is invalidated, PDP decision cache is invalidated
    and global policy combining algorithm is updated.
2.  Cache invalidation messages are must propagated PEP via a reliable
    way.

WSO2 Identity Server only provides the PDP, PAP and PIP functionality.
PEP must be binded into your application. However, there is an
implementation called PDP proxy, which would provide a set of APIs for
the application to deal with. This PDP Proxy source comes along with the
[entitlement
mediator](https://ei.docs.wso2.com/en/latest/micro-integrator/references/mediators/entitlement-Mediator/) in
[WSO2 EI](https://wso2.com/integration/).
