# Setting Up OAuth Token Hashing

WSO2 Identity Server (WSO2 IS) allows you to enable OAuth2 token hashing to protect OAuth2 access tokens, refresh tokens, consumer secrets, and
authorization codes.

!!! note 
    -   Token hashing is only required if there are long lived tokens.

    -   If you want to enable this feature, WSO2 recommends using a fresh
        WSO2 Identity Server distribution.  

    -   To use this feature with an existing database, you may need to
        perform data migration before you enable the feature. If you have to
        perform data migration before you enable this feature, [Contact
        us](https://wso2.com/contact/).
    
----

## Set up OAuth token hashing

1.  Add the following configurations to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.
    -   Add the following token persistence processor to  enable token hashing:
        ``` toml
        [oauth.extensions]
        token_persistence_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.HashingPersistenceProcessor"
        ```

    -   Add the following property and set it to true to enable hashing. 
        ``` toml
        [oauth]
        hash_tokens_and_secrets = true
        ```

    -   Add the following configuration to specify the algorithm to use
        for hashing:

        ``` toml
        [oauth]
        hash_token_algorithm = "SHA-256"
        ```

        !!! tip
            WSO2 Identity Server allows you to use hashing algorithms supported by MessageDigest. For more information on hashing algorithms supported by MessageDigest, see [MessageDigest Algorithms](https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#MessageDigest).  
            
            The default algorithm for hashing is SHA-256.
        

2.  Run the appropriate database command to remove the `CONN_APP_KEY` constraint from the `IDN_OAUTH2_ACCESS_TOKEN` table. 

    For example, if you are using an H2 database, you need to run the following command:

    ``` sql
    ALTER TABLE IDN_OAUTH2_ACCESS_TOKEN DROP CONSTRAINT IF EXISTS CON_APP_KEY
    ```

    !!! tip
        In general, for a specified consumer key, user, and scope, there can be only one active access token. The `CON_APP_KEY` constraint in the
        `IDN_OAUTH2_ACCESS_TOKEN` table enforces this by allowing only one active access token to exist for specified consumer key, user, and scope values.  
        
        With regard to hashing, a new access token is issued for every access token request. Therefore, for a given consumer key, user, and scope, there can be multiple active access tokens. To allow existence of multiple active access tokens, you need to remove the `CONN_APP_KEY` constraint from the `IDN_OAUTH2_ACCESS_TOKEN` table.
    
-----

{!fragments/register-a-service-provider.md!}

-----

{!fragments/oauth-app-config-basic.md!}

!!! tip
    The **Consumer Secret** value is displayed in plain text only once. Therefore, be sure to copy and save it for later use.
    
You have successfully set up OAuth token hashing. Now all of the OAuth2 access tokens, refresh tokens, consumer secrets, and authorization codes
will be hashed in the database.
