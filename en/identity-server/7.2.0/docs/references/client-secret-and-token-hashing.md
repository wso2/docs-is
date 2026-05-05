# OAuth Client Secret and  Token Hashing

WSO2 Identity Server (WSO2 IS) lets you protect sensitive OAuth2 data at rest by enabling hashing. Two modes are supported:

- **Full hashing** — hash OAuth2 access tokens, refresh tokens, consumer secrets (client secrets), and authorization codes.
- **Client-secret-only hashing** — hash only consumer secrets (client secrets), leaving tokens and authorization codes unhashed.

If full hashing is enabled, it takes precedence; the client-secret-only configuration has no additional effect in that case.

!!! note
    -   Token hashing is only required if there are long lived tokens.

    -   If you want to enable this feature, WSO2 recommends using a fresh
        WSO2 Identity Server distribution.  

    -   To use this feature with an existing database, you may need to
        perform data migration before you enable the feature. If you have to
        perform data migration before you enable this feature, [Contact
        us](https://wso2.com/contact/).
    
----

## Set up OAuth token and client secret hashing

1. Add the following configurations to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.
    - Add the following property and set it to true to enable hashing.

        ``` toml
        [oauth]
        hash_tokens_and_secrets = true
        ```

    - Add the following configuration to specify the algorithm to use for hashing:

        ``` toml
        [oauth]
        hash_token_algorithm = "SHA-256"
        ```

    - Add the following token persistence processor to  enable token hashing:

        ``` toml
        [oauth.extensions]
        token_persistence_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.HashingPersistenceProcessor"
        ```

        !!! tip
            WSO2 Identity Server allows you to use hashing algorithms supported by MessageDigest. For more information on hashing algorithms supported by MessageDigest, see [MessageDigest Algorithms](https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#MessageDigest).  

            The default algorithm for hashing is SHA-256.

2. Run the appropriate database command to remove the `CONN_APP_KEY` constraint from the `IDN_OAUTH2_ACCESS_TOKEN` table.

    For example, if you are using an H2 database, you need to run the following command:

    ``` sql
    ALTER TABLE IDN_OAUTH2_ACCESS_TOKEN DROP CONSTRAINT IF EXISTS CON_APP_KEY
    ```

    !!! tip
        In general, for a specified consumer key, user, and scope, there can be only one active access token. The `CON_APP_KEY` constraint in the
        `IDN_OAUTH2_ACCESS_TOKEN` table enforces this by allowing only one active access token to exist for specified consumer key, user, and scope values.  

        With regard to hashing, a new access token is issued for every access token request. Therefore, for a given consumer key, user, and scope, there can be multiple active access tokens. To allow existence of multiple active access tokens, you need to remove the `CONN_APP_KEY` constraint from the `IDN_OAUTH2_ACCESS_TOKEN` table.

----

## Set up client secret hashing only

!!! note
    This feature is available only from WSO2 Identity Server Update 7.2.0.25 onwards.

Use this mode to enable hashing for client secrets only, while leaving access tokens, refresh tokens, and authorization codes in their existing form. This mode is disabled by default. If full hashing is already enabled, it takes precedence and this configuration has no additional effect.

1. Add the following configurations to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

    ``` toml
    [oauth]
    hash_client_secret = true
    client_secret_hash_algorithm = "SHA-256"

    [oauth.extensions]
    client_secret_persistence_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.HashingPersistenceProcessor"
    ```

    !!! note
        - `hash_client_secret` defaults to `false`.
        - `client_secret_hash_algorithm` defaults to `SHA-256`. WSO2 Identity Server allows you to use hashing algorithms supported by MessageDigest. For more information on hashing algorithms supported by MessageDigest, see [MessageDigest Algorithms](https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#MessageDigest).  

    !!! warning
        Enabling this feature does **not** hash client secrets that are already stored in the database. A separate migration is required to hash previously stored client secrets. See the [client secret hashing migration scripts](https://github.com/wso2-extensions/identity-inbound-auth-oauth/tree/master/features/org.wso2.carbon.identity.oauth.server.feature/resources/dbScripts/storedProcedure/HashClientSecret) for details.

----

## Configure a service provider

Follow the steps below to register an application:

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application** to open the following:

    ![Register a standard based application]({{base_path}}/assets/img/apis/management-apis/register-a-sba.png){: width="600" style="display: block; margin: 0;"}

3. Provide an application name.

4. Select **OAuth 2.0 OpenID Connect** as the application protocol.

5. Click **Register** to complete the registration.

!!! tip
    The **Consumer Secret** value is displayed in plain text only once. Therefore, be sure to copy and save it for later use.

You have successfully set up OAuth hashing. Depending on the mode you configured, the corresponding OAuth2 artifacts (all tokens and secrets, or client secrets only) will now be hashed in the database.
