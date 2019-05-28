# Mutual TLS for OAuth Clients

Mutual TLS is a widely-used, secure authentication technique that
ensures the authenticity between a client and server using an encrypted
channel established with a mutual X.509 certificate. The client
certificate and certificate verification messages will be sent during
the TLS handshake.

The TLS handshake is a set of steps executed to establish a secure
connection between the client and server.

Mutual TLS is also used in the OAuth 2.0 Authorization Framework as a
secure authentication mechanism.

Mutual TLS for OAuth client authentication can be implemented using
either of the following mechanisms:

-   PKI mutual TLS OAuth client authentication: This approach uses a
    subject Distinguished Name (DN) and validated certificate chain to
    identify the client.
-   A self-signed certificate: In this approach, the client needs to
    register an X.509 certificate during the service provider
    configuration and import it to the truststore.

WSO2 Identity Server currently supports the approach that uses the
self-signed certificates.

Let's try out configuring mutual TLS in WSO2 Identity Server and test
with a sample.

-   [Deploying and Configuring Mutual TLS Client Authenticator
    Artifacts](#MutualTLSforOAuthClients-DeployingandConfiguringMutualTLSClientAuthenticatorArtifacts)
-   [Testing the Sample](#MutualTLSforOAuthClients-TestingtheSample)

!!! tip
    
    Before you begin
    
    1.  To disable the mutual SSL authenticator:
    
        !!! warning
            
                The mutual SSL authenticator allows the OAuth client to access the
                WSO2 Identity Server admin services without having the required
                privileges.
            

    1.  Open the `             authenticators.xml            ` file in
        the
        `             <IS_HOME>/repository/conf/security            `
        directory.

    2.  Set the `             disabled            ` attribute of the
        `             <Authenticator name="MutualSSLAuthenticator">            `
        property to `             true            ` .

        ``` xml
        <!-- Authenticator Configurations for MutualSSLAuthenticator-->
        <Authenticator name="MutualSSLAuthenticator" disabled="true">
            <Priority>5</Priority>
            <Config>
                <Parameter name="UsernameHeader">UserName</Parameter>
                <Parameter name="WhiteListEnabled">false</Parameter>
                <Parameter name="WhiteList"/>
            </Config>
        </Authenticator>
        ```

2.  If WSO2 Identity Server is fronted by a load-balancer, enable SSL
    tunnelling.


### Deploying and Configuring Mutual TLS Client Authenticator Artifacts

1.  Open the `           catalina-server.xml          ` file in the
    `           <IS_HOME>/repository/conf/tomcat          ` directory.

2.  Locate the connector protocol tag with the
    `           sslProtocol="TLS"          ` entry and do the following
    configurations.

    ``` java
    <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
                       port="9443"
                       bindOnInit="false"
                       sslProtocol="TLS"
                       ---
                       ---
                       URIEncoding="UTF-8"/>
    ```

    1.  Add
        `             trustManagerClassName="org.wso2.carbon.identity.core.util.ClientAuthX509TrustManager            `
        " entry.

        ``` java
                <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
                                   port="9443"
                                   bindOnInit="false"
                                   sslProtocol="TLS"
                                   ---
                                   ---
                                   trustManagerClassName="org.wso2.carbon.identity.core.util.ClientAuthX509TrustManager" 
                                   URIEncoding="UTF-8"/>
        ```

    2.  MutualTLS supports two-way TLS authentication that allows the
        server to validate the client and vice versa. Certain
        applications, e.g., mobile applications may not require
        server-side validation.

        To make the server-side validation optional, set the
        `             clientAuth            ` attribute to
        `             want            ` .

        ``` java
                <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
                                   port="9443"
                                   bindOnInit="false"
                                   sslProtocol="TLS"
                                   ---
                                   ---
                                   clientAuth="want"
                                   ---
                                   ---                   
                                   URIEncoding="UTF-8"/>
        ```

3.  Download Mutual TLS Client Authenticator v2.0.3 connector from
    [here](https://store.wso2.com/store/assets/isconnector/details/bab13ed8-5835-480f-92be-fdd5ee900970)
    .  
    Note that an OSGI bundle (
    `          org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls-<VERSION>.jar         `
    ) gets downloaded.
4.  Copy the OSGI bundle to the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

5.  Open the `           identity.xml          ` file in the
    `           <IS_HOME>/repository/conf/identity          ` directory
    and add the following configuration under the
    `           <EventListners>          ` property .

    ``` java
        <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler" name="org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.MutualTLSClientAuthenticator" orderId="158" enable="true" />
    ```

6.  In order for mutual TLS authentication to work, the public
    certificates of the client application and authorization server
    (WSO2 Identity Server) should be imported to each other's
    truststores.

    For demonstration purposes, let's assume that both the authorization
    server's truststore ( `           WSO2_TRUSTSTORE          ` ) and
    client's truststore ( `           CLIENT_TRUSTSTORE          ` ) are
    in WSO2 Identity Server.

    1.  Navigate to the
        `             <IS_HOME>/repository/resources/security            `
        directory in a command prompt.

        ``` java
                cd <IS_HOME>/repository/resources/security
        ```

    2.  To generate the client's private key and public certificate,
        execute the following commands and enter Distinguished Name (DN)
        when prompted.

        **Format**

        ``` java
                openssl req -newkey rsa:2048 -x509 -keyout <CLIENT_PRIVATE_KEY> -out <CLIENT_PUBLIC_CERTIFICATE> -days <VALIDITY_PERIOD> -nodes
        ```

        **Example**

        ``` java
                openssl req -newkey rsa:2048 -x509 -keyout key.pem -out client-certificate.pem -days 3650 -nodes
        ```

        !!! note
        
                The `             CLIENT_PRIVATE_KEY            ` and
                `             CLIENT_PUBLIC_CERTIFICATE            ` will be
                used to generate the access token at a later step.
        

    3.  To import the client's public certificate to the authorization
        server's truststore, execute the following command.

        **Format**

        ``` java
        keytool -import -trustcacerts -alias <CLIENT_PUBLIC_CERTIFICATE_ALIAS> -file <CLIENT_PUBLIC_CERTIFICATE> -keystore <WSO2_TRUSTSTORE> -storepass <WSO2_TRUSTSTORE_PASSWORD>
        ```

        **Example**

        ``` java
                keytool -import -trustcacerts -alias client -file client-certificate.pem -keystore client-truststore.jks -storepass wso2carbon
        ```

    4.  To export the public certificate of WSO2 Identity Server,
        execute the following command.

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

    5.  Import the public certificate of WSO2 Identity Server to the
        client's truststore. If the truststore is using the jks format,
        execute the following command.

        **Format**

        ``` java
                keytool -import -trustcacerts -alias <WSO2_PUBLIC_CERTIFICATE_ALIAS> -file <WSO2_PUBLIC_CERTIFICATE> -keystore <CLIENT_TRUSTSTORE> -storepass <CLIENT_TRUSTSTORE_PASSWORD>
        ```

        **Example**

        ``` java
                keytool -import -trustcacerts -alias wso2carbon -file wso2-certificate.crt -keystore truststore.jks -storepass client-password
        ```

    6.  Click **Update** .

7.  Restart WSO2 Identity Server.

### Testing the Sample

Follow the steps below to test the configurations.

1.  Create a service provider.

    1.  Access the WSO2 Identity Server Management Console.
    2.  On the **Main** menu, click **Identity \> Service Providers \>
        Add** .  
        ![](attachments/103329642/119114809.png){width="250"}
    3.  Enter `            playground2           ` as the **Service
        Provider Name** and click **Register** .  
        ![](attachments/103329642/119114810.png){width="750"}
    4.  Copy the content in your client application's certificate in PEM
        format into the **Application Certificate** text field.  
        ![](attachments/103329642/119114811.png){width="750"}  
        !!! note
        
                Instead of uploading the service provider certificate as shown
                above, you can choose to use the JWKS enpoint as shown below and
                add the relevant JWKS URI.
        
                ![image2019-4-23\_13-34-33.png](attachments/92524687/119114653.png){width="800"}
        

    5.  Expand **Inbound Authentication Configuration \> OAuth/OpenID
        Connect Configuration** and click **Configure** .  
        ![](attachments/103329642/119114812.png){width="700"}
    6.  Enter
        `                         http://localhost:8080/playground2/oauth2client                       `
        as the **Callback URL** .  
        ![](attachments/103329642/119114813.png){width="750"}
    7.  Click **Add** .  
        Note that the OAuth `            client key           ` and
        `            client secret           ` get generated.  
        ![](attachments/103329642/119114814.png){height="250"}

2.  To obtain an access token by invoking the OAuth token endpoint of
    WSO2 Identity Server, execute the following cRUL in a command
    prompt.

    This request contains the client ID, client's public certificate and
    any other additional claims and is signed using the client's private
    key.

    **Format**

    ``` java
    curl -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>&client_id=<CLIENT_KEY>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token -i  --cert <CLIENT_PUBLIC_CERTIFICATE> --key <CLIENT_PRIVATE_KEY>
    ```

    **Sample token request using mutual TLS client authentication**

    ``` java
        curl -k -d "grant_type=password&username=admin&password=admin&client_id=qiB6avlILBqnJLSxOfadoJYwOnQa" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token -i  --cert certificate.pem --key key.pem
    ```

    Note that an access token gets generated. You can use this access
    token to access the APIs or any other secured resources of the
    client application.  
    Sample response:  
    ![](attachments/103329642/119114815.png){width="600"}
