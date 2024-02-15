# Create New Keystores

WSO2 Identity Server is shipped with a default [keystore]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#keystores) named **wso2carbon.jks** that is stored in the `<IS_HOME>/repository/resources/security` directory. This keystore comes with a private/public key pair that is used for all purposes, such as encrypting sensitive information, communicating over SSL, and for message encryption/signing purposes in WS-Security. You can either use one new keystore for all purposes or you can create multiple keystores for each purpose. 

Let's get started with creating new keystores.

!!! tip "Before you begin"
    To understand the types of keystores you need, see [recommendations for setting up keystores in WSO2 Identity Server]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#recommendations-for-setting-up-keystores).

## Create a new keystore

There are two ways to create keystores for WSO2 Identity Server. You can either generate a keystore using an already existing public key certificate (CA-signed), or you can create the public key certificate at the time of generating the keystore. See the instructions given below.

!!! note "Important"
    If you are creating a new keystore for [data encryption]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool), make sure to acquire a public key certificate that contains the **Data Encipherment** key usage as explained in [recommendations for setting up keystores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#recommendations-for-setting-up-keystores).
    Otherwise, the following error can occur when you attempt data encryption.

    ``` java
    Exception in thread "main" org.wso2.ciphertool.CipherToolException: Error initializing Cipher at org.wso2.ciphertool.CipherTool.handleException(CipherTool.java:861) at org.wso2.ciphertool.CipherTool.initCipher(CipherTool.java:202) at org.wso2.ciphertool.CipherTool.main(CipherTool.java:80) Caused by: java.security.InvalidKeyException: Wrong key usage at javax.crypto.Cipher.init(DashoA13..) at javax.crypto.Cipher.init(DashoA13..) at org.wso2.ciphertool.CipherTool.initCipher(CipherTool.java:200)... 1 more
    ```

### Create a keystore using an existing certificate

Secure Sockets Layer (SSL) is a protocol that is used to secure communication between systems. This protocol uses a public key, a private key, and a random symmetric key to encrypt data. As SSL is widely
used in many systems, certificates may already exist that can be reused. In such situations, you can use an already existing CA-signed certificate to generate your keystore for SSL by using OpenSSL and Java
keytool.

1. Export certificates to the **[PKCS12/PFX** format.

    !!! tip
        Provide strong passwords whenever required.

    !!! info
        Make sure to have the same password for both the keystore and private key.

2. To export the entries of a trust chain into a keystore of `.pfx` format, execute the following command.

    ``` shell
    openssl pkcs12 -export -in <certificate file>.crt -inkey <private>.key -name "<alias>" -certfile <additional certificate file> -out <pfx keystore name>.pfx
    ```

3. To convert the **PKCS12/PFX** formatted keystore to a Java keystore, execute the following command.

    ``` shell
    keytool -importkeystore -srckeystore <pkcs12 file name>.pfx -srcstoretype pkcs12 -destkeystore <JKS name>.jks -deststoretype JKS
    ```

Now you have a keystore with a CA-signed certificate.

### Create a keystore using a new certificate

You can follow the steps in this section to create a new keystore with a private key and a new public key certificate. We will be using the keytool that is available with your JDK installation. Note that
the pubic key certificate we generate for the keystore is **self-signed**. Therefore, if you need a public key certificate that is CA-signed, you need to generate a CA-signed certificate and import it
to the keystore as explained in the [next section](#add-ca-signed-certificates-to-keystores). Alternatively, you can choose the option of generating a new keystore using a CA-signed public
certificate as explained [previously](#create-a-keystore-using-an-existing-certificate).

1. Navigate to the `<IS_HOME>/repository/resources/security/` directory in a command prompt. All keystores should be stored here.

2. To create the keystore that includes the private key, execute the following command.

    ``` powershell
    keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=<testdomain.org>, OU=Home,O=Home,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword 
    ```

    This command will create a keystore with the following details.

    - **Keystore name**: `newkeystore.jks`
    - **Alias of public certificate**: `newcert`
    - **Keystore password**: `mypassword`
    - **Private key password**: `mypassword` (this should be as same as keystore password)

    !!! tip
        - If you did not specify values for the `-keypass` and the `-storepass` in the above command, you will be asked to give a value for the `-storepass` (password of the keystore). As a best practice,
        use a password generator to generate a strong password. You will then be asked to enter a value for `-keypass`. Click **Enter** because we need the same password for both the keystore and the key.
        - If you did not specify values for `-dname`, you will be asked to provide those details individually.

3. Open the `<IS_HOME>/repository/resources/security/` directory and check if the new keystore file is created. Make a backup of it and move it to a secure location. This is important as
    it is the only place with your private key.

Now you have a keystore (`.jks` file) with a private key and a self-signed public key certificate.

## Add CA-signed certificates to keystores

Let's look at how to get a CA-signed certificate for your keystores.

!!! note
    It is not required to create a new keystore everytime you need to add a CA-signed certificate.

### Step 1: Generate certificate

First, you need to generate a certificate signing request (CSR) for your keystore (`.jks` file). This CSR file can then be certified by a certification authority (CA), which is an entity that issues digital
certificates. These certificates certify the ownership of a public key.

1. Execute the following command to generate the CSR:

    ``` powershell
    keytool -certreq -alias certalias -file newcertreq.csr -keystore newkeystore.jks
    ```

    !!! note
        As mentioned before, use the same `alias` that you used during the keystore creation process.

    Now you will be prompted to provide the `keystore password`. Once the password is given, the command will output the `newcertreq.csr` file to the `<IS_HOME>/repository/resources/security/` directory. This is the CSR that you must submit to a CA.

2. You must provide this CSR file to the CA. For testing purposes, try the [90 days trial SSL certificate from Comodo](https://www.ssldragon.com/product/comodo-trial-ssl/).

    !!! tip
        It is preferable to have a wildcard certificate or multiple domain certificates if you wish to have multiple subdomains for deployment. For such requirements, you must modify the
        CSR request by adding subject alternative names. Most of the SSL providers give instructions to generate the CSR in such cases.

3. After accepting the request, a signed certificate is provided along with a root certificate and several intermediate certificates (depending on the CA) as a bundle (`.zip` file).

    !!! example "Sample certificates provided by the CA (Comodo)"
        The Root certificate of the CA: `AddTrustExternalCARoot.crt`  
        Intermediate certificates: `COMODORSAAddTrustCA.crt` , `COMODORSADomainValidationSecureServerCA.crt`  
        SSL Certificate signed by CA: `test_sampleapp_org.crt`

### Step 2: Import certificates to the keystore

Follow the steps given below to import the CA-signed certificate to your keystore.

1. To add the root CA certificate and the two (related) intermediate certificates, execute the following commands.

    !!! abstract ""
        **Example**
        ``` java
        keytool -import -v -trustcacerts -alias ExternalCARoot -file AddTrustExternalCARoot.crt -keystore newkeystore.jks -storepass mypassword
        keytool -import -v -trustcacerts -alias TrustCA -file COMODORSAAddTrustCA.crt -keystore newkeystore.jks -storepass mypassword
        keytool -import -v -trustcacerts -alias SecureServerCA -file COMODORSADomainValidationSecureServerCA.crt -keystore newkeystore.jks -storepass mypassword
        ```

    !!! tip
        You may append the `-storepass <keystore password>` option to avoid entering the password when prompted later in the interactive mode.

2. To add the CA-signed SSL certificate to the keystore, execute the following command.

    !!! note
        Make sure to use the same alias (i.e., `newcert`) that you used while creating the keystore.

    ``` powershell
    keytool -import -v -alias newcert -file <test_sampleapp_org.crt> -keystore newkeystore.jks -keypass mypassword -storepass mypassword
    ```

Now you have a Java keystore, which includes a CA-signed public key certificate that can be used for SSL in a production environment. Next, you may need to add the same CA-signed public key certificate to the `client-truststore.jks` file. This will provide security and trust for backend communication/inter-system communication of WSO2 Identity Server via SSL.

### Step 3: Import certificates to the truststore

In SSL handshake, the client needs to verify the certificate presented by the server. For this purpose, the client usually stores the certificates it trusts, in a truststore. To enable secure and trusted
backend communication, WSO2 Identity Server is shipped with a truststore named `client-truststore.jks`, which resides in the same directory as the default keystore (`<IS_HOME>/repository/resources/security/`).

Follow the steps given below to import the same CA-signed public key certificate (which you obtained in the previous step) into your WSO2 Identity Server's default truststore (`client-truststore.jks`).

1. Get a copy of the `client-truststore.jks` file from the `<IS_HOME>/repository/resources/security/` directory.
2. To export the public key from your `.jks` file, execute the following command.

    ``` powershell
    keytool -export -alias certalias -keystore newkeystore.jks -file <public key name>.pem
    ```

3. Import the public key you extracted in the previous step to the `client-truststore.jks` file using the following command.

    ``` powershell
    keytool -import -alias certalias -file <public key name>.pem -keystore client-truststore.jks -storepass wso2carbon
    ```

    !!! note
        `wso2carbon` is the keystore password of the default `client-truststore.jks` file.

    Now, you have an SSL certificate stored in a Java keystore and a public key added to the `client-truststore.jks` file. Note that both these files should be in the `<IS_HOME>/repository/resources/security/` directory. You can now replace the default `wso2carbon.jks` keystore in your WSO2 Identity Server instance with the newly created keystore by updating the relevant configuration files.


!!! info
    For information on the keystore concepts and how keystores are used in WSO2 Identity Server, see [Using Asymmetric Encryption]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption).

