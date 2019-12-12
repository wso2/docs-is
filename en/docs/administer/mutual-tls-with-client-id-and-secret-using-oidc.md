# Mutual TLS with client id and secret using OIDC

This authenticator has the same architecture as [Mutual TLS for OAuth
Clients](../../learn/mutual-tls-for-oauth-clients)
except for the fact that we need to pass the client secret as a query
parameter in the token request.

In order to consume the request, follow the steps given below.

1.  Verify that the
    `org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls-x.x.x.jar`
    file exists in
    `<IS_HOME>/repository/components/dropins.         `

2.  For this feature two configuration steps needs to be satisfied 
    
    1. Enabling this feature.

    2. For the authentication to be successful, the certificate which is
    imported to the `client-truststore.jks` in
    `<IS_Home>/repository/resources/security`
    should be the same as the certificate which is available in the
    token request and the service provider. This validation needs to be skipped.
    
    For achieving both above requirements add the following configuration to the 
    `<IS-HOME>/repository/conf/deployment.toml`
    
    ``` toml
     [[event_listener]]
     id = "mutual_ssl"
     type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
     name = "org.wso2.carbon.identity.oauth2.token.handler.clientauth.tlswithidsecret.MutualTLSWithIdSecretAuthenticator"
     order = 200
     [event_listener.properties]
     "MandateMutualSSL" = true
    ```

4.  Create a service provider and generate a client id and client
    secret. For further details on how to do this, click
    [here](../../learn/adding-and-configuring-a-service-provider).
5.  Generate a certificate and import it to the
    `client-truststore.jks` in `<IS_HOME>/repository/resources/security` .Use
    the following commands to generate the certificate and get the
    private key in the pem format.

    **Generate a private RSA key**
    ``` java 
    openssl genrsa -out cert.key 2048
    ```    
    **Create an X509 certificate**
    ``` java 
    openssl req -x509 -new -nodes -key cert.key -sha256 -days 1024 -out cert.pem
    ```
    **Create a PKCS12 key store from the private key and the public certificate**
    ``` java 
    openssl pkcs12 -export -name server-cert -in cert.pem -inkey cert.key -out serverkeystore.p12
    ```
     **Export the private key as a PEM file**
    ``` java
    openssl pkcs12 -in serverkeystore.p12 -out key.pem
    ```
    
    Following is a sample request and response for configuring Mutual
    TLS with client id and secret using OIDC.

    **Sample Request**
    ``` java 
    curl -k -d "grant_type=password&username=admin&password=admin&client_id=2fjjjsCfTlLqptsj_goJcplgTyka
    &client_secret=dSw8sxIFG83N8gmLDqz5HPwrKT4a" -H "Content-Type: application/x-www-form-urlencoded" -i --cert cert.pem --key key.pem https://localhost:9443/oauth2/token 
    ```
    **Sample Response**
    ``` java 
    {"access_token":"ad25a42e-1a54-35a4-bc8b-4da5c9122ecc","refresh_token":"3b7cf936-4143-3539-b0fb-e11856ea5b46",
    "token_type":"Bearer","expires_in":3600} 
    ```
