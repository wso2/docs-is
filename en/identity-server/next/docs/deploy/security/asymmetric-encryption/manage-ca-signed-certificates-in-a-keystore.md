# Manage CA-Signed certificates in a keystore

## Add CA-signed certificates to keystores

!!! note
    It is not required to create a new keystore everytime you need to add a CA-signed certificate.

### Step 1: Generate certificate

First, you need to generate a certificate signing request (CSR) for your keystore (`.jks` file). This CSR file can then be certified by a certification authority (CA), which is an entity that issues digital certificates. These certificates certify the ownership of a public key.

1. Execute the following command to generate the CSR:

    ``` bash
    keytool -certreq -alias certalias -file newcertreq.csr -keystore newkeystore.jks
    ```

    !!! note
        Use the same `alias` that you used during the keystore creation process.

    Now you will be prompted to provide the `keystore password`. Once the password is given, the command will output the `newcertreq.csr` file to the `<IS_HOME>/repository/resources/security/` directory. This is the CSR that you must submit to a CA.

2. You must provide this CSR file to the CA. For testing purposes, try the [90 days trial SSL certificate from Comodo](https://www.ssldragon.com/product/comodo-trial-ssl/){:target="_blank"}.

    !!! tip
        It is preferable to have a wildcard certificate or multiple domain certificates if you wish to have multiple subdomains for deployment. For such requirements, you must modify the
        CSR request by adding subject alternative names. Most of the SSL providers give instructions to generate the CSR in such cases.

3. After accepting the request, a signed certificate is provided along with a root certificate and several intermediate certificates (depending on the CA) as a bundle (`.zip` file).

    !!! abstract ""
        **Sample certificates provided by the CA (Comodo)**
        
        The Root certificate of the CA: `AddTrustExternalCARoot.crt`  
        Intermediate certificates: `COMODORSAAddTrustCA.crt` , `COMODORSADomainValidationSecureServerCA.crt`  
        SSL Certificate signed by CA: `test_sampleapp_org.crt`

### Step 2: Import certificates to the keystore

Follow the steps given below to import the CA-signed certificate to your keystore.

1. To add the root CA certificate and the two (related) intermediate certificates, execute the following commands.

    === "JKS"
        ``` bash
        keytool -import -v -trustcacerts -alias ExternalCARoot -file AddTrustExternalCARoot.crt -keystore newkeystore.jks -storepass mypassword
        keytool -import -v -trustcacerts -alias TrustCA -file COMODORSAAddTrustCA.crt -keystore newkeystore.jks -storepass mypassword
        keytool -import -v -trustcacerts -alias SecureServerCA -file COMODORSADomainValidationSecureServerCA.crt -keystore newkeystore.jks -storepass mypassword
        ```

    === "PKCS12"
        ``` bash
        keytool -import -v -trustcacerts -alias ExternalCARoot -file AddTrustExternalCARoot.crt -keystore newkeystore.p12 -storetype PKCS12 -storepass mypassword
        keytool -import -v -trustcacerts -alias TrustCA -file COMODORSAAddTrustCA.crt -keystore newkeystore.p12 -storetype PKCS12 -storepass mypassword
        keytool -import -v -trustcacerts -alias SecureServerCA -file COMODORSADomainValidationSecureServerCA.crt -keystore newkeystore.p12 -storetype PKCS12 -storepass mypassword
        ```

2. To add the CA-signed SSL certificate to the keystore, execute the following command.

    !!! note
        Make sure to use the same alias (i.e., `newcert`) that you used while creating the keystore.

    === "JKS"
        ``` bash
        keytool -import -v -alias newcert -file <test_sampleapp_org.crt> -keystore newkeystore.jks -keypass mypassword -storepass mypassword
        ```

    === "PKCS12"
        ``` bash
        keytool -import -v -alias newcert -file <test_sampleapp_org.crt> -keystore newkeystore.p12 -keypass mypassword -storetype PKCS12 -storepass mypassword
        ```

Now you have a Java keystore, which includes a CA-signed public key certificate that can be used for SSL in a production environment. Next, you may need to add the same CA-signed public key certificate to the `client-truststore.jks` file. This will provide security and trust for backend communication/inter-system communication of WSO2 Identity Server via SSL.

### Step 3: Import certificates to the truststore

In SSL handshake, the client needs to verify the certificate presented by the server. For this purpose, the client usually stores the certificates it trusts, in a truststore. To enable secure and trusted
backend communication, WSO2 Identity Server is shipped with a truststore named `client-truststore.jks`, which resides in the same directory as the default keystore (`<IS_HOME>/repository/resources/security/`).

Follow the steps given below to import the same CA-signed public key certificate (which you obtained in the previous step) into your WSO2 Identity Server's default truststore (`client-truststore.jks`).

1. Get a copy of the `client-truststore.jks` file from the `<IS_HOME>/repository/resources/security/` directory.
2. To export the public key from your keystore file, execute the following command.

    === "JKS"
        ``` bash
        keytool -export -alias certalias -keystore newkeystore.jks -file <public key name>.pem
        ```

    === "PKCS12"
        ``` bash
        keytool -export -alias certalias -keystore newkeystore.p12 -storetype PKCS12 -file <public key name>.pem
        ```

3. Import the public key you extracted in the previous step to the `client-truststore.jks` file using the following command.

    ``` bash
    keytool -import -alias certalias -file <public key name>.pem -keystore client-truststore.jks -storepass wso2carbon
    ```

    Now, you have an SSL certificate stored in a Java keystore and a public key added to the `client-truststore.jks` file. Note that both these files should be in the `<IS_HOME>/repository/resources/security/` directory. You can now replace the default `wso2carbon.jks` keystore in your WSO2 Identity Server instance with the newly created keystore by updating the relevant configuration files.

## Renew a CA-Signed Certificate in a Keystore

A digital certificate has a validity period, after which the certificate expires. Once a certificate expires, it is no longer valid, and it can cause the client-server communication to fail at the SSL handshake level. Therefore, it is important to plan certificate renewal ahead of time. Neglecting certificate renewal can eventually lead to a catastrophic situation such as a major service outage.

Following are the high-level steps you need to follow to renew an expired certificate in a keystore.

!!! tip
    - Use the same certificate authority that you used when you first got the public certificate. If you use a different certificate authority for certificate renewal, you will have to import the new CA certificate as well as the intermediate certificates to the keystore and the client’s truststore.
    - If the certificate authority’s certificate is not in the keystore, you will get the following error when you try to import the CA-signed certificate to the keystore.

        ``` java
        keytool error: java.lang.Exception: Failed to establish chain from reply
        ```

        To overcome the above error, make sure to first import the CA-signed certificate as well as the intermediate certificates to the keystore in the correct order.

Now let's take a look at each high-level step in detail.

### Step 1: Check the certificate validity period

Follow one of the steps below to view the validity period of a certificate.

- **If you have a public hostname**, go to <https://www.sslshopper.com/ssl-checker.html> and specify your server hostname. SSL hopper lists all the information about the server certificate.
- **If you have a java keystore**, execute the following keytool command to view the certificate information:

    ``` java
    keytool -list -keystore <keystore_name.jks> -alias <cert_alias> -v
    ```

    This prompts for the keystore password. Once you specify the password, you can view the certificate information in a human-readable format where the validity period is displayed as follows.

    ``` java
    Valid from: Sun Jun 18 19:26:25 IST 2017 until: Sat Jun 19 19:26:25 IST 2027
    ```

- **If you have the certificate file**, execute the following openssl command.

    ``` java
    x509 -in <certname.cer> -text -noout
    ```

    This displays the validity as follows:

    ``` java
    Validity
    Not Before: Jun 18 13:56:25 2017 GMT
    Not After : Jun 19 13:56:25 2027 GMT
    ```

- **If it is a website**, you can view the certificate information via the browser. All major browsers provide the capability to view certificate information.

Once you view the validity period of a certificate and if it says that the certificate is about to expire or has already expired, you should generate a Certificate Signing Request (CSR) and get a new certificate generated from the CA.

### Step 2: Generate a CSR

Depending on the type of keystore you have, follow one of the steps below to generate a Certificate Signing Request (CSR).

- **If you have a java keystore**, execute the following command.

    ``` java
    keytool -certreq -alias <cert_alias> -file <CSR.csr> -keystore <keystore_name.jks>
    ```

    !!! tip
        If you want to generate a CSR with a subject alternative name (SAN), be sure to use the `-ext` attribute in the keytool command to specify the required SAN.

        Following is a sample keytool command that includes a SAN.
    
        ``` java
        keytool -certreq -alias test -file test.csr -keystore test.jks -ext SAN=dns:test.example.com
        ```

- **If you have the private key and public key**, execute the following command:

    ``` java
    openssl x509 -x509toreq -in <cert_name.crt> -out <CSR.csr> -signkey <private_key.key>
    ```

Once you generate the CSR, you need to submit the CSR to your certificate authority to get a new CA-signed certificate. <!--For testing purposes, you can go to <http://www.getacert.com/signacert.html> and submit your CSR to obtain a new CA-signed certificate for free.-->

After you obtain a new certificate, you have to import the new certificate to a keystore if you are using a Java keystore.

### Step 3: Import the new certificate to the keystore

To import a new certificate to a keystore, execute the following command:

``` java
keytool -import -v -trustcacerts -alias <current_alias> -file <ca_signed_cert.cer> -keystore <keystore_name.jks>
```

!!! tip
    To view information related to the renewed certificate, execute the following keytool command.

    ``` java
    keytool -list -keystore <keystore_name.jks> -alias <cert_alias> -v
    ```
