# Token Persistence

This guide describes OAuth2 token persistence and the possible approaches you can follow for token persistence in a production environment. The OAuth2 component in the WSO2 Identity Server (WSO2 IS) has two implementations that can be used to handle token persistence in the database (synchronous and asynchronous token persistence).

The following sections guide you through the differences between these two approaches and how to configure them.

## Synchronous token persistence

![synchronous-token-persistence]({{base_path}}/assets/img/setup/secure/token-persistence.png){: width="800"; style="display: block; margin: 0;"}

The flow of synchronous token persistence is as follows:

1. The client sends an access token request.
2. The OAuth2 component in WSO2 IS checks for an existing active access token for the given client/user/scope. First, it checks the cache and if an active token is not found, then checks the database.
3. If an active access token is found, the token is returned to the client.
4. Alternatively, if an existing access token is not found, the OAuth2 component creates a new access token and persists it in the database using the same thread. Once it is persisted, the new token is returned to the client.

!!! note "Synchronous token persistence configurations"
    By default synchronous token persistence is enabled in WSO2 Identity Server 5.9.0 onwards. To indicate the number of times to retry in the event of a `CONN_APP_KEY` violation when storing the access token, navigate to file `<IS_HOME>/repository/conf/deployment.toml` and add the following configuration.

    ```
    [oauth.token_generation]
    "retry_count_on_persistence_failures"=5
    ```
    
    <!-- TODO !!! Tip
        To know more about new configurations, see [New Configuration Model]({{base_path}}/references/new-configuration-model).-->

---

## Asynchronous token persistence

If an existing access token is not found, the OAuth2 component creates a new access token and adds it to a persisting queue. Once the token is added to the queue, the token is returned to the client There are background threads that consume the queue, and persist the tokens in the queue to the database.

!!! warning "Going Forward"
    Previously, WSO2 recommended asynchronous token persistence for certain scenarios. However, we have empirically found out that synchronous token persistence has a better overall performance in general. Hence, asynchronous token persistence is not supported from WSO2 Identity Server 5.9.0 onwards.

## Recovery flow for token persistence

This section explains the recovery flow triggered in the WSO2 Identity Server for exceptional cases that may occur in a production environment caused by the client application mishandling the `CON_APP_KEY` constraint that is explained below.

### CONN\_APP\_KEY constraint

For a given set of consumer key, user, and scope values, there can be only one ACTIVE access token. The `CON_APP_KEY` constraint in the `IDN_OAUTH2_ACCESS_TOKEN` table enforces this by allowing only one active access token for a given set of consumer key, user, and scope values. This constraint may be violated in a scenario where two or more identical token requests come from the
same application.

The above scenario is unlikely because in practice, an application is usually designed to handle this situation using scopes, or in the case of a multithreaded client, there is usually a separate thread to acquire access tokens so that other threads can retrieve from it.

### Synchronous token persistence

The flow of the synchronous token persistence when receiving two identical access token requests is as follows:

1. The client sends an access token request.
2. The OAuth2 component in both nodes of WSO2 IS checks for an existing active access token for the given client/user/scope. Both nodes first check the cache and if an active token is not found, the database is checked.
3. Alternatively, if an existing access token is not found, the OAuth2 component in **both nodes** creates a new access token and persists the access token to the database using the same thread.
4. One of the nodes will persist the token successfully and return it to the client but the other node will receive an error due to the violation of the `CON_APP_KEY` constraint.

### The recovery flow

The process flow now moves on to the recovery flow described above to handle the `CON_APP_KEY` constraint violation and is executed as follows:

- Since the same thread is being used, the OAuth2 component in the second node checks the database again for an ACTIVE access token.
- Since there is now an ACTIVE token that was persisted by the first node, the second node now returns the access token persisted by the first node to the client.
- Both access token requests receive the same access token.
