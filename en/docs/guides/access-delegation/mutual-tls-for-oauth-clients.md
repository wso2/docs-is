# Mutual TLS for OAuth Clients

Mutual TLS is a widely-used, secure authentication technique that ensures the authenticity between a client and server using an encrypted channel established with a mutual X.509 certificate. The client certificate and certificate verification messages will be sent during the TLS handshake.

The TLS handshake is a set of steps to establish a secure connection between the client and server.

Mutual TLS is also used in the OAuth 2.0 Authorization Framework as a secure authentication mechanism.

Mutual TLS for OAuth client authentication can be implemented using either of the following mechanisms:

- PKI mutual TLS OAuth client authentication: This approach uses a subject Distinguished Name (DN) and validated certificate chain to identify the client.
- A self-signed certificate: In this approach, the client needs to register an X.509 certificate during the service provider configuration and import it to the trust store.

WSO2 Identity Server currently supports the approach that uses self-signed certificates.

Let's try configuring mutual TLS in WSO2 Identity Server and test with a sample.

## Pre-requisites
- You need to disable the mutual SSL authenticator.
    
    !!! warning
        The mutual SSL authenticator allows the OAuth client to access the WSO2 Identity Server admin services without having the required privileges.
    
    To disable the mutual SSL authenticator, open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory and add the following configuration.
    
    ``` toml
    [admin_console.authenticator.mutual_ssl_authenticator]
    enable = false
    ```

- If a load-balancer fronts WSO2 Identity Server, enable SSL tunneling.


## Configuring mutual TLS client authenticator artifacts

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.

    1. Add the following entry under `[transport.https]` section.

        ``` toml
        [transport.https]
        trustManagerClassName="org.wso2.carbon.identity.core.util.ClientAuthX509TrustManager"
        ```

    2. MutualTLS supports two-way TLS authentication that allows the server to validate the client and vice versa. Specific applications, e.g., mobile applications, may not require server-side validation.

        To make the server-side validation optional, set the `clientAuth` attribute to `want` in the same configuration similar to the following.

        ``` toml
        [transport.https]
        trustManagerClassName="org.wso2.carbon.identity.core.util.ClientAuthX509TrustManager"
        clientAuth="want"
        ```

3. Download the Mutual TLS Client Authenticator v2.0.3 connector from [here](https://store.wso2.com/store/assets/isconnector/details/bab13ed8-5835-480f-92be-fdd5ee900970).  
    Note that an OSGI bundle (`org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls-<VERSION>.jar`) gets downloaded.

4. Copy the OSGI bundle to the `<IS_HOME>/repository/components/dropins` directory.

5. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory and add the following configuration.

    ``` toml
    [[event_listener]]
    id = "custom_event_listener"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"
    name= "org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.MutualTLSClientAuthenticator"
    order = 158
    enable = true
    ```

6. For mutual TLS authentication to work, the public certificates of the client application and authorization server (WSO2 Identity Server) should be imported to each other's trust stores.

    For demonstration purposes, let's assume that both the authorization server's trust-store (`WSO2_TRUSTSTORE`) and the client's truststore (`CLIENT_TRUSTSTORE`) are in WSO2 Identity Server.

    1. Navigate to the `<IS_HOME>/repository/resources/security` directory in a command prompt.

        ``` java
        cd <IS_HOME>/repository/resources/security
        ```

    2. To generate the client's private key and public certificate, execute the following commands and enter Distinguished Name (DN) when prompted.

        **Format**

        ``` java
        openssl req -newkey rsa:2048 -x509 -keyout <CLIENT_PRIVATE_KEY> -out <CLIENT_PUBLIC_CERTIFICATE> -days <VALIDITY_PERIOD> -nodes
        ```

        **Example**

        ``` java
        openssl req -newkey rsa:2048 -x509 -keyout key.pem -out client-certificate.pem -days 3650 -nodes
        ```

        !!! note
            The `CLIENT_PRIVATE_KEY` and `CLIENT_PUBLIC_CERTIFICATE` will be used to generate the access token at a later step.

    3. To import the client's public certificate to the authorization server's trust store, execute the following command.

        **Format**

        ``` java
        keytool -import -trustcacerts -alias <CLIENT_PUBLIC_CERTIFICATE_ALIAS> -file <CLIENT_PUBLIC_CERTIFICATE> -keystore <WSO2_TRUSTSTORE> -storepass <WSO2_TRUSTSTORE_PASSWORD>
        ```

        **Example**

        ``` java
        keytool -import -trustcacerts -alias client -file client-certificate.pem -keystore client-truststore.jks -storepass wso2carbon
        ```

    4. To export the public certificate of WSO2 Identity Server, execute the following command.

        Format:

        **Format**

        ``` java
        keytool -export -alias <WSO2_CERTIFICATE_ALIAS> -file <WSO2_CERTIFICATE> -keystore <WSO2_KEYSTORE> -storepass <WSO2_KEYSTORE_PASSOWRD>
        ```

        Example:

        **Example**

        ``` java
        keytool -export -alias wso2carbon -file wso2-certificate.crt -keystore wso2carbon.jks -storepass wso2carbon
        ```

    5. Import the public certificate of WSO2 Identity Server to the client's trust store. If the trust store uses the `jks` format, execute the following command:

        **Format**

        ``` java
        keytool -import -trustcacerts -alias <WSO2_PUBLIC_CERTIFICATE_ALIAS> -file <WSO2_PUBLIC_CERTIFICATE> -keystore <CLIENT_TRUSTSTORE> -storepass <CLIENT_TRUSTSTORE_PASSWORD>
        ```

        **Example**

        ``` java
        keytool -import -trustcacerts -alias wso2carbon -file wso2-certificate.crt -keystore truststore.jks -storepass client-password
        ```

    6. Click **Update**.

7. Restart WSO2 Identity Server.

## Test the sample

Follow the steps below to test the configurations.

1. Create a service provider as follows:

    1. Access the WSO2 Identity Server Management Console.
    2. On the **Main** menu, click **Identity \> Service Providers \> Add**.  
    3. Enter `playground2` as the **Service Provider Name** and click **Register**.
    4. Copy the content in your client application's certificate in PEM format into the **Application Certificate** text field.  

        ![add-sp-cert]({{base_path}}/assets/img/guides/add-sp-cert.png)

        !!! note
            Instead of uploading the service provider certificate, as shown above, you can choose to use the JWKS endpoint as shown below and add the relevant JWKS URI.
            ![configure-jwks-endpoint]({{base_path}}/assets/img/guides/configure-jwks-endpoint.png)

    5. Expand **Inbound Authentication Configuration \> OAuth/OpenID Connect Configuration** and click **Configure**.
    6. Enter `http://localhost:8080/playground2/oauth2client` as the **Callback URL**.
    7. Click **Add**.  
        Note that the OAuth `client key` and `client secret` get generated.  
        ![oauth-clientid-secret]({{base_path}}/assets/img/guides/oauth-clientid-secret.png)

2. To obtain an access token by invoking the OAuth token endpoint of WSO2 Identity Server, execute the following cURL in a command prompt.

    This request contains the client ID, the client's public certificate and any other additional claims and is signed using the client's private key.

    **Format**

    ``` java
    curl -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>&client_id=<CLIENT_KEY>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token -i  --cert <CLIENT_PUBLIC_CERTIFICATE> --key <CLIENT_PRIVATE_KEY>
    ```

    **Sample token request using mutual TLS client authentication**

    ``` java
    curl -k -d "grant_type=password&username=admin&password=admin&client_id=qiB6avlILBqnJLSxOfadoJYwOnQa" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token -i  --cert certificate.pem --key key.pem
    ```

    Note that an access token gets generated. You can use this access token to access the APIs or other secured client application resources.  
    Sample response:
    ```
    {
        "access_token": "096d0a65-50b9-3381-89fd-bed86877f110", 
        "refresh_token" "Ofce8ac3-9732-342b-b9b2-d7fc100c9aed", 
        "token_type" "Bearer",
        "expires_in":3600"
    }
    ```