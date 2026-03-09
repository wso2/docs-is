# Create New Keystores

This page explains how to create keystores using keytool commands. After creating keystores, you will need to configure them in the `deployment.toml` file — see [Configure Keystores]({{base_path}}/deploy/security/keystores/configure-keystores) for the next steps.

There are two ways to create keystores for WSO2 Identity Server:

1. Generate a keystore with a new self-signed certificate
2. Generate a keystore using an existing CA-signed certificate

!!! note
    If you are creating a new keystore for [data encryption]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption), make sure to acquire a public key certificate that contains the **Data Encipherment** key usage as explained [here]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption/#recommendations-for-setting-up-keystores).

## Create a keystore using a new certificate

!!! note
    The pubic key certificate we generate for the keystore is self-signed. For a CA-signed certificate, either [import it into the keystore](#add-ca-signed-certificates-to-keystores) or [create a new keystore with a CA-signed certificate](#create-a-keystore-using-an-existing-certificate).

1. Navigate to the `<IS_HOME>/repository/resources/security/` directory in a command prompt. All keystores should be stored here.

2. To create the keystore that includes the private key, execute the following command. Make sure to use the same password for both the keystore and private key.

    === "JKS"
        ``` bash
        keytool -genkeypair -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=<testdomain.org>, OU=Home,O=Home,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword 
        ```

        This command will create a keystore with the following details.

        - **Keystore name**: `newkeystore.jks`
        - **Alias of public certificate**: `newcert`
        - **Keystore password**: `mypassword`
        - **Private key password**: `mypassword`

    
    === "PKCS12"
        ``` bash
        keytool -genkeypair -alias newcert -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore newkeystore.p12 -dname "CN=<testdomain.org>, OU=Home,O=Home,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword 
        ```

        This command will create a keystore with the following details.

        - **Keystore name**: `newkeystore.p12`
        - **Alias of public certificate**: `newcert`
        - **Keystore password**: `mypassword`
        - **Private key password**: `mypassword`

    !!! tip
        - If you did not specify values for the `-keypass` and the `-storepass`, , you will be prompted to enter the keystore password (`-storepass`). It’s advisable to use a password generator to create a strong password. When prompted for `-keypass`, press Enter to use the same password for both the keystore and the key.
        - If you did not specify values for `-dname`, you will be asked to provide those details individually.

## Create a keystore for internal data encryption

The internal keystore is used by the [Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool) to encrypt passwords in configuration files. Unlike the primary and TLS keystores which use RSA key pairs, the internal keystore uses a **symmetric AES key** (recommended for IS 7.2 due to post-quantum resilience).

Navigate to `<IS_HOME>/repository/resources/security/` and run:

```bash
keytool -genseckey \
  -alias <internal-key-alias> \
  -keyalg AES \
  -keysize 256 \
  -keystore <internal-keystore-name>.p12 \
  -storetype PKCS12 \
  -storepass <internal-keystore-password> \
  -keypass <internal-keystore-password>
```

This command will create a keystore with the following details:

- **Keystore name**: `<internal-keystore-name>.p12`
- **Alias of the secret key**: `<internal-key-alias>`
- **Keystore password**: `<internal-keystore-password>`

!!! warning
    Adding an internal keystore to an existing deployment will make already encrypted data unusable. This should be done during initial setup only.

## Import a certificate into the truststore

After creating a new keystore (for example, a TLS keystore), export its certificate and import it into the truststore so that {{product_name}} trusts it.

1. Export the certificate from the keystore:

    ```bash
    keytool -exportcert \
      -alias <key-alias> \
      -keystore <keystore-name>.p12 \
      -storetype PKCS12 \
      -storepass <keystore-password> \
      -file <certificate-name>.crt
    ```

2. Import the exported certificate into the truststore:

    ```bash
    keytool -importcert \
      -alias <key-alias> \
      -file <certificate-name>.crt \
      -keystore client-truststore.p12 \
      -storetype PKCS12 \
      -storepass <truststore-password> \
      -noprompt
    ```

## Remove the default WSO2 certificate from the truststore

The default WSO2 self-signed certificate is pre-imported into the truststore with the alias `wso2carbon`. In production, remove it after importing your own certificates:

```bash
keytool -delete \
  -alias wso2carbon \
  -keystore client-truststore.p12 \
  -storetype PKCS12 \
  -storepass <truststore-password>
```

!!! tip
    To list all certificates currently in the truststore and verify which aliases exist, run:
    ```bash
    keytool -list \
      -keystore client-truststore.p12 \
      -storetype PKCS12 \
      -storepass <truststore-password>
    ```

## Create a keystore using an existing certificate

As SSL/TLS is widely used in many systems, certificates may already exist that can be reused. In such situations, you can use an already existing CA-signed certificate to generate your keystore for SSL by using OpenSSL and Java.

To export certificates of a trust chain into a PKCS12 keystore , execute the following command. Make sure to use the same password for both the keystore and private key.

``` bash
openssl pkcs12 -export -in <certificate file>.crt -inkey <private>.key -name "<alias>" -certfile <additional certificate file> -out <pfx keystore name>.p12
```

!!! info
    To convert the PKCS12 formatted keystore to a Java keystore, execute the following command.

    ``` shell
    keytool -importkeystore -srckeystore <pkcs12 file name>.pfx -srcstoretype PKCS12 -destkeystore <JKS name>.jks -deststoretype JKS
    ```
