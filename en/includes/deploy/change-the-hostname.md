# Change the hostname

This section guides you through changing the hostname of the WSO2 Identity Server.

1. Change the hostname - The server has two hostname configurations:
    - `hostname` - Use this to build public URLs for external-facing endpoints and APIs.
    - `internal_hostname` - Use this to build internal URLs for internal service-to-service communication. Defaults to `localhost`.

    Configure the hostname using one of the two options below.

    **Option 1**

    Configure the `hostname` as follows in `<IS_HOME>/repository/conf/deployment.toml`.

    ``` toml
    [server]
    hostname = "is.dev.wso2.com"
    ```

    Add both `localhost` and the hostname to the SAN of the certificate (`-ext SAN=dns:localhost,dns:<hostname>`) as the internal hostname is by default `localhost`.

    Navigate to the `<IS_HOME>/repository/resources/security` directory on the command prompt and use the following command to create a new keystore with `CN=is.dev.wso2.com` and both `localhost` and `is.dev.wso2.com` in the SAN.

    === "Format"

        ``` java
        keytool -genkey -alias <alias_name> -keyalg RSA -keysize 2048 -keystore <keystore_name> -storetype <keystore_type> -dname "CN=<hostname>, OU=<organizational_unit>,O=<organization>,L=<Locality>,S=<State/province>,C=<country_code>" -storepass <keystore_password> -keypass <confirm_keystore_password> -ext SAN=dns:localhost,dns:<hostname>
        ```

    === "Sample command (JKS)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword -ext SAN=dns:localhost,dns:is.dev.wso2.com
        ```

    === "Sample command (PKCS12)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.p12 -storetype PKCS12 -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword -ext SAN=dns:localhost,dns:is.dev.wso2.com
        ```

    !!! warning
        Option 1 is not recommended for production environments. Certificate authorities typically do not approve certificates that contain `localhost` in the Subject Alternative Name (SAN) list. For production deployments, use **Option 2** instead.

    **Option 2 (Recommended for production)**

    Instead of adding `localhost` to the SAN, you can configure the same name for the `hostname`, and the `internal_hostname` in `<IS_HOME>/repository/conf/deployment.toml` as follows.

    ``` toml
    [server]
    hostname = "is.dev.wso2.com"
    internal_hostname = "is.dev.wso2.com"
    ```

    Navigate to the `<IS_HOME>/repository/resources/security` directory on the command prompt and use the following command to create a new keystore with `CN=is.dev.wso2.com` and `is.dev.wso2.com` in the SAN.

    === "Format"

        ``` java
        keytool -genkey -alias <alias_name> -keyalg RSA -keysize 2048 -keystore <keystore_name> -storetype <keystore_type> -dname "CN=<hostname>, OU=<organizational_unit>,O=<organization>,L=<Locality>,S=<State/province>,C=<country_code>" -storepass <keystore_password> -keypass <confirm_keystore_password> -ext SAN=dns:<hostname>
        ```

    === "Sample command (JKS)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword -ext SAN=dns:is.dev.wso2.com
        ```

    === "Sample command (PKCS12)"

        ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.p12 -storetype PKCS12 -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword -ext SAN=dns:is.dev.wso2.com
        ```

2. If the keystore name and password is changed, all the references to it within the WSO2 Identity Server must also be updated. Add the following configuration to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` folder.

    === "Format"

        ``` toml
        [keystore.primary]
        file_name = "<keystore_name>"
        password = "<keystore_password>"
        alias = "<alias_name>"
        key_password = "<keystore_password>"
        type = "<keystore_type>"
        ```

    === "JKS"

        ``` toml
        [keystore.primary]
        file_name = "newkeystore.jks"
        password = "mypassword"
        alias = "newcert"
        key_password = "mypassword"
        type = "JKS"
        ```

    === "PKCS12"

        ``` toml
        [keystore.primary]
        file_name = "newkeystore.p12"
        password = "mypassword"
        alias = "newcert"
        key_password = "mypassword"
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

4. Import the public key you extracted in the previous step to the `client-truststore.{{content.default_keystore_ext}}` file using the following command.

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
        If you create a new client truststore, in place of the default `client-truststore.{{content.default_keystore_ext}}`, place the new truststore in the `<IS_HOME>/repository/resources/security/` folder and add the following configuration to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` folder.

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

5. Verify the hostname change by attempting to log in to My Account, getting a token from any grant type, etc.

6. Map the hostname to allow access to the WSO2 Identity Server.

    The method you use depends on your deployment environment:

    **For local machine setups**

    Open the `etc/hosts/` file and add the following entry to map the new hostname. `is.dev.wso2.com` is an example in the sample entry below.

    ``` java
    127.0.0.1       is.dev.wso2.com
    ```

    **For Docker setups**

    If you configured the `internal_hostname` in Option 2, you need to add a host mapping for your Docker deployment. Use one of the following methods based on your setup:

    - **Docker Compose or standalone Docker containers**: Use the `--add-host` flag when running your container to add custom host-to-IP mappings. For example:

        ```bash
        docker run --add-host=is.dev.wso2.com:127.0.0.1 <image-name>
        ```

        Or in your `docker-compose.yml` file:

        ```yaml
        services:
          wso2is:
            image: <image-name>
            extra_hosts:
              - "is.dev.wso2.com:127.0.0.1"
        ```

        For more information, see the [Docker documentation on adding host entries](https://docs.docker.com/reference/cli/docker/container/run/#add-host).

    - **Kubernetes deployments**: Use `hostAliases` in your Pod specification to add custom entries to the Pod's `/etc/hosts` file. For example:

        ```yaml
        apiVersion: v1
        kind: Pod
        metadata:
          name: wso2is-pod
        spec:
          hostAliases:
          - ip: "127.0.0.1"
            hostnames:
            - "is.dev.wso2.com"
          containers:
          - name: wso2is
            image: <image-name>
        ```

        For more information, see the [Kubernetes documentation on customizing the hosts file](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases).

When you fully recreate the keystore, a new key-pair value is created. This means that any existing encrypted data (for example, users created before recreating the keystore) are still encrypted using the original keystore (`wso2carbon.{{content.default_keystore_ext}}`). Therefore, older users will not be able to log in to My Account and need to be migrated. You can use one of the following options in this situation.

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
    By default, both the My Account and the Console Applications use the `localhost:9443` domain within the callback URL. When you change the hostname, the WSO2 Identity Server will not be running on the `localhost:9443` domain, and these values will not automatically change. Hence, you should manually update the callback URLs in the `<IS_HOME>/repository/conf/deployment.toml` file to use the new hostname.

    Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file to update the callback URLs for My Account and Console:

    ```toml
    [console]
    callback_url = "https://<NEW_HOSTNAME>:<PORT>/console"

    [myaccount]
    callback_url = "https://<NEW_HOSTNAME>:<PORT>/myaccount"
    ```

    Replace `<NEW_HOSTNAME>` with your configured hostname (for example, `is.dev.wso2.com`) and `<PORT>` with your port number (for example, `9443`).
