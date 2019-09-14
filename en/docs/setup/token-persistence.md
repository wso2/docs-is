# Token Persistence

This guide describes OAuth2 token persistence and the possible
approaches you can follow for token persistence in a production
environment. The OAuth2 component in WSO2 Identity Server (WSO2 IS) has
two implementations that can be used to handle token persistence in the
database (synchronous and asynchronous token persistence).

The following sections guide you through the difference between these
two approaches and how to configure them.

-   [Synchronous token
    persistence](#TokenPersistence-Synchronoustokenpersistence)
-   [Asynchronous token
    persistence](#TokenPersistence-Asynchronoustokenpersistence)
-   [Recovery flow for token
    persistence](#TokenPersistence-Recoveryflowfortokenpersistence)

### Synchronous token persistence

![](attachments/103329466/103329467.png) 

The flow of synchronous token persistence is as follows:

1.  The client sends an access token request.
2.  The OAuth2 component in WSO2 IS checks for an existing active access
    token for the given client/user/scope. It first checks the cache and
    if an active token is not found, it then checks the database.

3.  If an active access token is found, the token is returned to the
    client.
4.  Alternatively, if an existing access token is not found, the OAuth2
    component creates a new access token and persists it in the database
    using the same thread. Once it is persisted, the new token is
    returned to the client.

!!! tip
    
    Enabling synchronous token persistence
    
    To enable synchronous token persistence, open the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file
    and do the following changes under
    `         <!-- Configs related to OAuth2 token persistence -->        `
    :
    
    ``` xml
    <TokenPersistence>   
       <Enable>true</Enable>
       <PoolSize>0</PoolSize>
       <RetryCount>5</RetryCount>
    </TokenPersistence>
```


### Asynchronous token persistence

![](attachments/103329466/103329468.png) 

The flow of asynchronous token persistence is as follows:

1.  The client sends an access token request.
2.  The OAuth2 component in WSO2 IS checks for an existing active access
    token for the given client/user/scope. It first checks the cache and
    if an active token is not found, it then checks the database.

3.  If an active access token is found, the token is returned to the
    client.
4.  Alternatively, if an existing access token is not found, the OAuth2
    component creates a new access token and adds it to a persisting
    queue.
5.  Once the token is added to the queue, the token is returned to the
    client.
6.  There are background threads that consume the queue, and persist the
    tokens in the queue to the database.

!!! tip
    
    Enabling asynchronous token persistence
    
    To enable asynchronous token persistence, open the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file
    and do the following changes under
    `         <!-- Configs related to OAuth2 token persistence -->        `
    :
    
    ``` xml
    <TokenPersistence>   
        <Enable>true</Enable>
        <PoolSize>100</PoolSize>
        <RetryCount>5</RetryCount>
    </TokenPersistence>
```


The following table describes what each of the above attributes means:

<table>
<colgroup>
<col style="width: 11%" />
<col style="width: 70%" />
<col style="width: 18%" />
</colgroup>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
<th style="text-align: center;">Sample value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Enable</td>
<td>Set this to <code>             true            </code> to enable token persistence.</td>
<td style="text-align: center;"><code>             true            </code></td>
</tr>
<tr class="even">
<td>PoolSize</td>
<td><p>This value determines the number of threads in the thread pool that are used to consume the token persisting queue. Specifying the value 0 indicates that token persistence is synchronous, whereas specifying the value to be greater than 0 indicates that token persistence is asynchronous.</p></td>
<td style="text-align: center;">100</td>
</tr>
<tr class="odd">
<td>RetryCount</td>
<td>This indicates how many times to retry in the event of a <code>             CONN_APP_KEY            </code> violation when storing the access token .</td>
<td style="text-align: center;">5</td>
</tr>
</tbody>
</table>

The main difference between synchronous and asynchronous token
persistence is that the OAuth2 component in the synchronous token
persistence implementation waits for the access token to be persisted in
the database before returning it to the client.

### Recovery flow for token persistence

This section explains the recovery flow triggered in WSO2 Identity
Server for exceptional cases that may occur in a production environment
caused by the client application mishandling the
`         CON_APP_KEY        ` constraint that is explained below.

-   [CONN\_APP\_KEY
    constraint](#TokenPersistence-CONN-APP-KEYconstraint)
-   [Asynchronous token
    persistence](#TokenPersistence-Asynchronoustokenpersistence.1)
    -   [The flow](#TokenPersistence-Theflow)
    -   [The recovery flow](#TokenPersistence-Therecoveryflow)
-   [Synchronous token
    persistence](#TokenPersistence-Synchronoustokenpersistence.1)
    -   [The flow](#TokenPersistence-Theflow.1)
    -   [The recovery flow](#TokenPersistence-Therecoveryflow.1)

#### CONN\_APP\_KEY constraint

For a given set of consumer key, user, and scope values, there can be
only one ACTIVE access token. The `         CON_APP_KEY        `
constraint in the `         IDN_OAUTH2_ACCESS_TOKEN        ` table
enforces this by allowing only one active access token for a given set
of consumer key, user, and scope values. This constraint may be violated
in a scenario where two or more i dentical token requests come from the
same application. **  
**

The above scenario is unlikely because in practice, an application is
usually designed to handle this situation using scopes, or in the case
of a multithreaded client, there is usually a separate thread to acquire
access tokens so that other threads can retrieve from it.

#### Asynchronous token persistence

##### The flow

For instance, if the violation mentioned above occurs with two nodes of
a cluster receiving identical access token requests, the flow of the
asynchronous token persistence would be as follows:

1.  The client sends an access token request.
2.  The OAuth2 component in both nodes of WSO2 IS checks for an existing
    active access token for the given client/user/scope. Both nodes
    first check the cache and if an active token is not found, the
    database is checked.

3.  If an active access token is found, the token is returned to the
    client.
4.  Alternatively, if an existing access token is not found, the OAuth2
    component in **both nodes** creates a new access token and adds it
    to the persisting queue.
5.  After adding it to the queue, the access token is returned to the
    client.
6.  However, the background threads that consume the persisting queue in
    both servers (nodes) attempt to persist the token to the database.
    One of the servers will succeed and successfully persist the access
    token to the database, and the other server will receive an error
    due to violation of the `          CON_APP_KEY         ` constraint.
    The violation is due to the fact that the same access token was
    already persisted by the first server in the cluster and is
    currently active.

##### The recovery flow

To handle this situation, WSO2 Identity Server has a recovery flow for
token persistence that does the following:

-   Since both access tokens were returned to the client, there must be
    a database entry for both tokens.
-   Since the access token that the second node is attempting to persist
    is not allowed due to the violation, the recovery flow takes the
    latest entry in the database, which is the active access token
    persisted by the first node, and mark it as INACTIVE.
-   The access token received from the second node is now saved as an
    ACTIVE access token in the database. Therefore, one of the access
    tokens returned to the client is an INACTIVE token.

!!! tip
    
    **Tip:** If the client application is not designed to handle the
    `         CONN_APP_KEY        ` constraint violation using scopes, you
    can avoid the situation described above and avoid any invalid tokens by
    using synchronous token persistence. To do this, set the
    `         <PoolSize>        ` property in the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file
    to 0.
    

#### Synchronous token persistence

##### The flow

The flow of the synchronous token persistence when receiving two
identical access token requests is as follows:

1.  The client sends an access token request.
2.  The OAuth2 component in both nodes of WSO2 IS checks for an existing
    active access token for the given client/user/scope. Both nodes
    first check the cache and if an active token is not found, the
    database is checked.

3.  Alternatively, if an existing access token is not found, the OAuth2
    component in **both nodes** creates a new access token and persists
    the access token to the database using the same thread.
4.  One of the nodes will persist the token successfully and return it
    to the client but the other node will receive an error due to the
    violation of the `          CON_APP_KEY         ` constraint.

##### The recovery flow

The process flow now moves on to the recovery flow described above in
order to handle the `         CON_APP_KEY        ` constraint violation
and is executed as follows:

-   Since the same thread is being used, the OAuth2 component in the
    second node checks the database again for an ACTIVE access token.
-   Since there is now an ACTIVE token, which was persisted by the first
    node, the second node now returns the access token persisted by the
    first node to the client.
-   Both access token requests receive the same access token.
