# Private Key JWT Client Authentication for OIDC

This section introduces you to Private Key JWT Client Authentication for
OIDC and describes how this method is used by clients when
authenticating to the authorization server.

### **Pre-requisites**

-   Maven 3.x

-   Java 1.7 or above

-   [Playground sample
    app](../../learn/basic-client-profile-with-playground)
    is setup.

### Introduction

Private Key JWT Client Authentication is an authentication method that
can be used by clients to authenticate to the authorization server when
using the token endpoint. In this authentication mechanism, only the
clients that have registered a public key, signed a JWT using that key,
can authenticate.

The JWT **must** contain some REQUIRED claim values and **may** contain
some OPTIONAL claim values. For more information on the required and
optional claim values needed for the JWT for private\_key\_jwt
authentication, click
[here](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)
.

The authentication token **must** be sent as the value of the
client\_assertion parameter. The value of the `client_assertion_type` parameter MUST be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

Deploying and configuring JWT client-handler artifacts

Follow the instructions below to deploy and configure JWT client-handler
artifacts.

1.  Download the [Private Key JWT Client
    Authenticator](https://store.wso2.com/store/assets/isconnector/details/3990fa78-6696-4b98-8af8-d4cc7611099a)
    .

2.  Copy the downloaded
    `          org.wso2.carbon.identity.oauth2.token.handler.clientauth.jwt-x.x.x.jar         `
    to the `          <IS_HOME>/repository/component/dropins         `
    directory.
3.  To register the JWT grant type, configure the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file by adding a new entry as seen below. 

    ``` toml
    [[event_listener]]                              
    id = "custom_audit_listener"        
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" 
    name = "com.example.identity.AuditListener" 
    order = 899 
    [event_listener.properties] 
    preventTokenReuse= true
    RejectBeforeInMinutes= 100
    TokenEndPointAlias= sampleurl
    ```

    The following table lists the optional properties that can be added
    to the `           deployment.toml          ` file:

    | Property              | Description                                                                                                                                                                                             |
    |-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | preventTokenReuse     | If this is set to "true", the JTI in the JWT should be unique per the request if the previously used JWT is not already expired. JTI (JWT ID) is a claim that provides a unique identifier for the JWT. |
    | RejectBeforeInMinutes | The JWT should be rejected and considered as a too old token, if the issued time of the JWT exceeds the configured time.                                                                                |
    | TokenEndPointAlias    | An audience that can be added from the above configuration.                                                                                                                                             |

4.  Do the cache configuration in
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    as shown below:

    ``` java
    <CacheConfig>
        <CacheManager name="IdentityApplicationManagementCacheManager">
        <Cache name="PrivateKeyJWT" enable="true" timeout="10" capacity="5000" isDistributed="false"/>
        </CacheManager>
    </CacheConfig>
    ```

    The above cache configuration is needed because when too many calls
    are made to the database there can be a performance impact. To
    reduce this impact, the cache configuration is done so that the
    information is read from the cache instead of the database.

5.  **Restart** the server.
6.  Log in to Management Console and Add the [service
    provider](../../learn/adding-and-configuring-a-service-provider).
7.  **Expand** the OAuth/OpenID Connect Configuration under Inbound
    Authentication section and click **Configure**.

8.  Enter a callback url (ex:
    `                       http://localhost:8080/playground2/oauth2client                     `
    ) and click **Add**. (The OAuth Client Key and OAuth Client Secret
    will now be visible.)

9.  Import the public key of the private\_key\_jwt issuer by executing
    the following commands. (one after the other)

    ``` java
    keytool -importkeystore -srckeystore TodayApp.jks -destkeystore TodayApp.p12 -deststoretype PKCS12
    ```

    ``` java
    openssl pkcs12 -in TodayApp.p12 -nokeys -out pubcert.pem
    ```

10. Rename the public key certificate file of the
    `           private_key_jwt issuer          `, with the ClientID
    (mentioned as 'alias' below) of the above auth app.

    ``` java
    keytool -export -alias nwU59qy9AsDqftmwLcfmkvOhvuYa -file nwU59qy9AsDqftmwLcfmkvOhvuYa -keystore TodayApp.jkskeytool -genkey -alias nwU59qy9AsDqftmwLcfmkvOhvuYa -keyalg RSA -keystore TodayApp.jks
    ```

    !!! note
        Note that the above 'TodayApp.jks' and 'TodayApp.p12' are sample
        values used to demonstrate this feature. You may need to create your
        own values to test the feature. Refer [Creating New
        Keystores](../../administer/creating-new-keystores)
        for more information.
    

11. Log in to the Identity Server management console with admin
    credentials.

12. Click **List** under **Keystores** which is under **Manage** menu.

    ![list-keystores](../assets/img/using-wso2-identity-server/list-keystores.png) 

13. Import the above cert (Click **Import Cert** under **Actions** ) in
    to the default key store defined in
    `           <IS_HOME>/repository/conf/deployment.toml          ` . ( In a
    default pack, keystore name is wso2carbon.jks)

    ![keystores-list](../assets/img/using-wso2-identity-server/keystores-list.png) 

    When you view the keystore in the same UI (using **View** ), there
    should be a certificate with clientID as below:  
    ![keystore-cert](../assets/img/using-wso2-identity-server/keystore-cert.png) 

    !!! note
    
        Alternatively, you can import above certificate (in step 9) to the
        default key store defined in the
        `           <IS_HOME>/repository/conf/deployment.toml         ` file. In a
        default pack, keystore name is
        `           wso2carbon.jks.          `
    
        ``` java
        keytool -import -alias nwU59qy9AsDqftmwLcfmkvOhvuYa -file nwU59qy9AsDqftmwLcfmkvOhvuYa -keystore wso2carbon.jks
        ```
        
    !!! note
    
        Instead of importing the service provider certificate as shown above, you can choose to use the JWKS enpoint 
        as shown below and add the relevant JWKS URI.
    
        ![configure-jwks-endpoint](../assets/img/using-wso2-identity-server/configure-jwks-endpoint.png) 
    

14. Use the below cURL to retrieve the access token and refresh token
    using a JWT.

    For Authz\_code grant type

    !!! note
        Authz\_code grant type: Replace \<authorization-code\> and
        \<private\_key\_jwt\> in below curl
    

    ``` java
    curl -v POST -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=f2d0f7dd-df6d-34ac-9d61-851f4f0cab9f&scope=openid&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=<jwt_assertion>&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

    For information on how to get the authorization-code, check [Try
    Authorization Code Grant](../../learn/try-authorization-code-grant) page.

      
    For client credential grant type:

    ``` java
    curl -v POST -H "Content-Type: application/x-www-form-urlencoded;charset=ISO-8859-1" -k -d "grant_type=client_credentials&scope=openid&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=<jwt_assertion>&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

    !!! note
        A new table named IDN\_OIDC\_JTI has been introduced to store the
        JTI with the following columns. This table will be located in
        identity database (the data source that is configured in
        `           deployment.toml          ` file)
    
        JWT\_ID VARCHAR(255)
    
        EXP\_TIME TIMESTAMP DEFAULT 0
    
        TIME\_CREATED TIMESTAMP DEFAULT 0
    
        PRIMARY KEY (JWT\_ID))
    
