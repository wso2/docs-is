# Create New Keystores

There are two ways to create keystores for WSO2 Identity Server. You can either generate a keystore using an already existing public key certificate (CA-signed), or you can create the public key certificate at the time of generating the keystore.

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
