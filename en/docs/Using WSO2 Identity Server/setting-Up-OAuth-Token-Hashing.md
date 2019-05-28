# Setting Up OAuth Token Hashing

WSO2 Identity Server (WSO2 IS) allows you to enable OAuth2 token hashing
to protect OAuth2 access tokens, refresh tokens, consumer secrets, and
authorization codes.

!!! note
    
    **Notes:**
    
    -   Token hashing is only required if there are long lived tokens.
    -   If you want to enable this feature, WSO2 recommends using a fresh
        WSO2 Identity Server distribution.  
        To use this feature with an existing database, you may need to
        perform data migration before you enable the feature. If you have to
        perform data migration before you enable this feature [Contact
        us](https://wso2.com/contact/) .
    

Follow the instructions below to set up OAuth token hashing:

1.  Edit the
    `          <IS_HOME>/repository/conf/identity/identity.xml         `
    file,and do the following configuration changes under the
    `          <OAuth>         ` section:
    -   Change the value of the
        `             <TokenPersistenceProcessor>            ` element
        as follows to enable token hashing:

        ``` xml
        <TokenPersistenceProcessor>org.wso2.carbon.identity.oauth.tokenprocessor.HashingPersistenceProcessor</TokenPersistenceProcessor>
        ```

    -   Change the value of the
        `             <EnableClientSecretHash>            ` element to
        `             true            ` as follows:

        ``` xml
                <EnableClientSecretHash>true</EnableClientSecretHash>
        ```

    -   Add the following configuration to specify the algorithm to use
        for hashing:

        ``` xml
                <HashAlgorithm>SHA-256</HashAlgorithm>
        ```

        !!! tip
        
                WSO2 Identity Server allows you to use hashing algorithms
                supported by MessageDigest. For more information on hashing
                algorithms supported by MessageDigest, see [MessageDigest
                Algorithms](https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#MessageDigest)
                .  
                The default algorithm for hashing is SHA-256.
        

2.  Run the appropriate database command to remove the
    `           CONN_APP_KEY          ` constraint from the
    `           IDN_OAUTH2_ACCESS_TOKEN          ` table. For example,
    if you are using an H2 database, you need to run the following
    command:

    ``` sql
    ALTER TABLE IDN_OAUTH2_ACCESS_TOKEN DROP CONSTRAINT IF EXISTS CON_APP_KEY
    ```

    !!! tip
    
        In general, for a specified consumer key, user, and scope, there can
        be only one active access token. The
        `           CON_APP_KEY          ` constraint in the
        `           IDN_OAUTH2_ACCESS_TOKEN          ` table enforces this
        by allowing only one active access token to exist for specified
        consumer key, user, and scope values.  
        With regard to hashing, a new access token is issued for every
        access token request . Therefore, for a given consumer key, user,
        and scope, there can be multiple active access tokens. To allow
        existence of multiple active access tokens, you need to remove the
        `           CONN_APP_KEY          ` constraint from
        `           IDN_OAUTH2_ACCESS_TOKEN          ` table.
    

3.  Follow the steps below to configure OAuth/OpenID Connect support for
    your client application:

    1.  Start WSO2 IS and log on to the Management Console with
        your user name and password. For detailed instructions on how to
        start WSO2 IS, see [Running the Product](_Running_the_Product_)
        .
    2.  Navigate to **Service Providers** \> **Add** , enter a name for
        the new service provider, and then click **Register** .

    3.  Expand the **Inbound Authentication Configuration** section,
        then expand the **OAuth2/OpenID Connect Configuration** , and
        click **Configure** .

    4.  Specify appropriate values for the required fields.

        ![](attachments/103329661/103329662.png){width="500"
        height="656"}

    5.  Click **Add** . This displays values of the **Consumer Key** and
        the **Consumer Secret** for your service provider.

        ![](attachments/103329661/103329663.png){width="950"}

        !!! tip
        
                **Consumer Key** : The client key of the service provider. This
                is required by the Identity Server to authenticate the service
                provider and provide the access token.  
                **Consumer Secret** : The client secret of the service provider.
                This is required by the Identity Server to authenticate the
                service provider and provide the access token.
        

4.  Click **Show** to view the exact **Consumer Key** and **Consumer
    Secret** .

    !!! note
    
        The **Consumer Secret** value is displayed in plain text only once.
        Therefore, be sure to copy and save it for later use.
    
