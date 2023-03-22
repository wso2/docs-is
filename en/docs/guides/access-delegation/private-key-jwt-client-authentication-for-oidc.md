# Private Key JWT Client Authentication for OIDC

This section introduces you to Private Key JWT Client Authentication for
OpenID Connect (OIDC) and describes how this method is used by clients when
authenticating to the authorization server.

---

## Introduction

Private Key JWT Client Authentication is an authentication method that
can be used by clients to authenticate to the authorization server when
using the token endpoint. In this authentication mechanism, only the
clients that have registered a public key, signed a JWT using that key,
can authenticate.

The JWT must contain some REQUIRED claim values and may contain
some OPTIONAL claim values. For more information on the required and
optional claim values needed for the JWT for private\_key\_jwt
authentication, click
[here](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)
.

The authentication token must be sent as the value of the client\_assertion parameter. The value of the `client_assertion_type` parameter must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

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
    id = "private_key_jwt_authenticator"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name = "org.wso2.carbon.identity.oauth2.token.handler.clientauth.jwt.PrivateKeyJWTClientAuthenticator"
    order = "899"
    [event_listener.properties]
    PreventTokenReuse= false
    RejectBeforeInMinutes= "100"
    TokenEndpointAlias= "sampleurl"
    ```

    The following table lists the optional properties that can be added
    to the `           deployment.toml          ` file:

    | Property              | Description                                                                                                                                                                                             |
    |-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | PreventTokenReuse     | If this is set to "false," the JWT can be reused within its expiration period.  If this is set to "true," the JWT can be used only once. |
    | RejectBeforeInMinutes | The JWT should be rejected and considered as a too old token, if the issued time of the JWT exceeds the configured time.                                                                                |
    | TokenEndpointAlias    | An audience that can be added from the above configuration.                                                                                                                                             |

4.  Do the cache configuration in
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file as shown below:

    ```toml
    [[cache.manager]]
    name="PrivateKeyJWT"
    timeout="10"
    capacity="5000"
    ```

    The above cache configuration is needed because when too many calls
    are made to the database there can be a performance impact. To
    reduce this impact, the cache configuration is done so that the
    information is read from the cache instead of the database.

5.  Restart the server.

---

## Create a service provider

{!./includes/register-a-service-provider.md !}

{!./includes/oauth-app-config-basic.md !}

{!./includes/oauth-app-config-advanced-tip.md!}

---

## Configure keystore

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
        own values to test the feature. Refer [Create New
        Keystores]({{base_path}}/deploy/security/create-new-keystores)
        for more information.
    

11. Log in to the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).

12. Click **List** under **Keystores** which is under **Manage** menu.

    ![list-keystores]({{base_path}}/assets/img/guides/list-keystores.png) 

13. To import the above cert  in
    to the default key store defined in
    `           <IS_HOME>/repository/conf/deployment.toml          `  file, click **Import Cert** under **Actions** and upload the cert. 
    
    !!! tip
        In a default pack, keystore name is `wso2carbon.jks`.

    ![keystores-list]({{base_path}}/assets/img/guides/keystores-list.png) 

    When you view the keystore in the same UI (using **View** ), there
    should be a certificate with clientID as below:  
    ![keystore-cert]({{base_path}}/assets/img/guides/keystore-cert.png) 

    !!! note
    
        Alternatively, you can import above certificate to the
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
    
        ![configure-jwks-endpoint]({{base_path}}/assets/img/guides/configure-jwks-endpoint.png) 
    

14. Use the below cURL to retrieve the access token and refresh token
    using a JWT.

    - For authorization code grant type:

        ``` java
        curl -v POST -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=<code>&scope=openid&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=<jwt_assertion>&redirect_uri=<callback_url>" https://<IS_HOST>:<IS_PORT>/oauth2/token
        ```

        For information on how to get the authorization-code, check [Try
        Authorization Code Grant]({{base_path}}/guides/access-delegation/auth-code-playground).

      
    - For client credential grant type:

        ``` java
        curl -v POST -H "Content-Type: application/x-www-form-urlencoded;charset=ISO-8859-1" -k -d "grant_type=client_credentials&scope=openid&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=<jwt_assertion>&redirect_uri=<callback_url>" https://<IS_HOST>:<IS_PORT>/oauth2/token
        ```

    
