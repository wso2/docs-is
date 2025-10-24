# Change the hostname

This section guides you through changing the hostname of the WSO2 Identity Server.

1. Change the hostname - The server hostname for internal API calls is configured as `localhost` by default. This configuration is utilized to build the internal absolute URL of a service endpoint that will be consumed whenever internal API calls are generated. To configure the hostname, follow one of the two options given below according to your requirements.

   **Option 1**

   Configure the `hostname` as follows in `<IS_HOME>/repository/conf/deployment.toml`.

    ``` toml
    [server]
    hostname = "is.dev.wso2.com"
    ```

   Add `localhost` as SAN for the certificate (-ext SAN=dns:localhost) as the internal hostname is by default `localhost`. For that, navigate to the `<IS_HOME>/repository/resources/security` directory on the command prompt and use the following command to create a new keystore with `CN=is.dev.wso2.com` and `localhost` as SAN.

   === "Format"

        ``` java
        keytool -genkey -alias <alias_name> -keyalg RSA -keysize 2048 -keystore <keystore_name> -storetype <keystore_type> -dname "CN=<hostname>, OU=<organizational_unit>,O=<organization>,L=<Locality>,S=<State/province>,C=<country_code>" -storepass <keystore_password> -keypass <confirm_keystore_password> -ext SAN=dns:localhost
        ```

   === "Sample command (JKS)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword -ext SAN=dns:localhost
        ```

   === "Sample command (PKCS12)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.p12 -storetype PKCS12 -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword -ext SAN=dns:localhost
        ```

   **Option 2**

   Instead of adding SAN, you can configure the same name for the `hostname`, and the `internal_hostname` in `<IS_HOME>/repository/conf/deployment.toml` as follows.

    ``` toml
    [server]
    hostname = "is.dev.wso2.com"
    internal_hostname = "is.dev.wso2.com"
    ```

   Navigate to the `<IS_HOME>/repository/resources/security` directory on the command prompt and use the following command to create a new keystore with `CN=is.dev.wso2.com`.

   === "Format"

        ``` java
        keytool -genkey -alias <alias_name> -keyalg RSA -keysize 2048 -keystore <keystore_name> -storetype <keystore_type> -dname "CN=<hostname>, OU=<organizational_unit>,O=<organization>,L=<Locality>,S=<State/province>,C=<country_code>" -storepass <keystore_password> -keypass <confirm_keystore_password>
        ```

   === "Sample command (JKS)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword
        ```

   === "Sample command (PKCS12)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.p12 -storetype PKCS12 -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword
        ```

2. If the keystore name and password is changed, all the references to it within the WSO2 Identity Server must also be updated. Add the following configuration to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` folder.

   === "JKS"

        ``` toml
        [keystore.primary]
        file_name = "new-keystore.jks"
        password = "new-keystore-password"
        alias = "new-private-key-alias"
        key_password = "new-private-key-password"
        type = "JKS"
        ```

   === "PKCS12"

        ``` toml
        [keystore.primary]
        file_name = "new-keystore.p12"
        password = "new-keystore-password"
        alias = "new-private-key-alias"
        key_password = "new-private-key-password"
        type = "PKCS12"
        ```

3. Export the public key from your keystore file using the following command.

   === "Format"

        ``` java
        keytool -export -alias <alias_name> -keystore <keystore_name> -storetype <keystore_type> -file <public_key_name>.pem
        ```

   === "Sample command (JKS)"

        ``` java
        keytool -export -alias newcert -keystore newkeystore.jks -file pkn.pem
        ```

   === "Sample command (PKCS12)"

        ``` java
        keytool -export -alias newcert -keystore newkeystore.p12 -storetype PKCS12 -file pkn.pem
        ```

4. Import the public key you extracted in the previous step to the `client-truststore.{{default_keystore_ext}}` file using the following command.

   === "Format"

        ``` java
        keytool -import -alias <alias_name> -file <public_key_name>.pem -keystore <keystore_name> -storetype <keystore_type> -storepass <keystore_password>
        ```

   === "Sample command (JKS)"

        ``` java
        keytool -import -alias newcert -file pkn.pem -keystore client-truststore.jks -storepass wso2carbon
        ```

   === "Sample command (PKCS12)"

        ``` java
        keytool -import -alias newcert -file pkn.pem -keystore client-truststore.p12 -storetype PKCS12 -storepass wso2carbon
        ```

   !!! note
   If you create a new client truststore, in place of the default `client-truststore.{{default_keystore_ext}}`, place the new truststore in the `<IS_HOME>/repository/resources/security/` folder and add the following configuration to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` folder.

        === "JKS"

            ```toml
            [truststore]
            file_name = "customer-truststore-name.jks" 
            password = "password" 
            type = "JKS"
            ```

        === "PKCS12"

            ```toml
            [truststore]
            file_name = "customer-truststore-name.p12"
            password = "password"
            type = "PKCS12"
            ```

5. Execute the following script against your identity DB if you have sub-organizations and applications shared with the sub-organizations. Here we are updating the callback URL of the shared applications.

   === "Script"
   ```
      UPDATE IDN_OAUTH_CONSUMER_APPS
      SET CALLBACK_URL = REPLACE(CALLBACK_URL, 'oldAbsoluteURL', '<PROTOCOL>://<HOSTNAME>:<PORT>')
      WHERE CONSUMER_KEY IN (
      SELECT SIA.INBOUND_AUTH_KEY
      FROM SP_SHARED_APP SSA
      JOIN SP_APP SA ON SSA.SHARED_APP_ID = SA.UUID
      JOIN SP_INBOUND_AUTH SIA ON SIA.APP_ID = SA.ID
      )
      AND CALLBACK_URL LIKE '%oldAbsoluteURL%';
   ```

   Make sure to update the oldAbsoluteURL in both locations. The oldAbsoluteURL should contain the protocol, hostname and port.
   For example, if your console URL is `https://localhost:9443/console`, your oldAbsoluteURL will be `https://localhost:9443`


6. Verify the hostname change by attempting to log in to My Account, getting a token from any grant type, etc.

7. If you are trying this on your local machine, open the `etc/hosts/` file and add the following entry to map the new hostname. `is.dev.wso2.com` is an example in the sample entry below.

    ``` java
    127.0.0.1       is.dev.wso2.com
    ```

When you fully recreate the keystore, a new key-pair value is created. This means that any existing encrypted data (for example, users created before recreating the keystore) are still encrypted using the original keystore (`wso2carbon.{{default_keystore_ext}}`). Therefore, older users will not be able to log in to My Account and need to be migrated. You can use one of the following options in this situation.

**Option 1**

Change the hostname. The hostname is part of the Subject of the Certificate (i.e., it is not part of the original key pair). Therefore, you can use the same public and private key pair to generate a new CSR with the updated CN (subject).
This can be done by adding the `-dname` option when `-certreq` is executed. Once the CA certificate is obtained, follow the instructions given in the [importing certificates to the keystore]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores/#step-2-import-certificates-to-the-keystore) topic to import it correctly.
By doing that, you do not need to touch the key pair, and any other operations performed using the same key pair, such as encryption, will not be affected.

**Option 2**

Create a new keystore with the instructions for the new hostname and then use that keystore for SSL/TLS by changing the Tomcat connector configuration as described in the [Configure Keystores]({{base_path}}/deploy/security/asymmetric-encryption/configure-keystores-in-wso2-products/) topic. This approach separates the keystores.
The secondary keystore with the new hostname will only be used for Tomcat SSL/TLS communication, while the primary one will be used for all other operations (encryption, etc.). By doing this, you can ensure the existing encrypted data is not affected.

!!! note
If you have chosen **Option 2**, you need to maintain and secure the two keystores. Hence, **Option 1** is recommended unless you prefer separation of keys used in SSL/TLS communication and internal data encryption, signing, etc.

Once this is done, you need to change all `localhost` references. The following points would be where the references should be changed.

- The configurations in the `<IS_HOME>/repository/conf/deployment.toml` file reference localhost.

<!-- TODO - Update the **Identity Provider Entity ID**

    On the Management Console, go to **Identity Provider** > **Resident Identity Provider** > **Inbound Authentication Configuration** > **OAuth2/OpenID Connect Configuration** and update the **Identity Provider Entity ID** with any one of the following values:

    - If you have added the proxy port as `443` to the `<IS_HOME>/repository/conf/deployment.toml` using the below configs, use `https://<DOMAIN>/oauth2/token` as the entity ID value.

        ```toml
        [transport.https.properties]
        proxyPort = 443
        ```

    - Else, use `https://<DOMAIN>:<PORT>/oauth2/token` as the entity ID value.-->

- The callback URLs of the federated identity providers.
- The callback URLs of the default system applications such as My Account and Console.

!!! note
By default, both the My Account and the Console Applications use the `localhost:9443` domain within the callback URL. When you change the hostname, the WSO2 Identity Server will not be running on the `localhost:9443` domain, and these values will not automatically change. Hence, you should manually change the callback URLs to use the new hostname.

    To edit the default system applications such as My Account and Console, the following configuration should be added to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [system_applications]
    read_only_apps = []
    ```
