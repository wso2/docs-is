# Renew a CA-Signed Certificate in a Keystore

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

## Step 1: Check the certificate validity period

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

## Step 2: Generate a CSR

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

## Step 3: Import the new certificate to the keystore

To import a new certificate to a keystore, execute the following command:

``` java
keytool -import -v -trustcacerts -alias <current_alias> -file <ca_signed_cert.cer> -keystore <keystore_name.jks>
```

!!! tip
    To view information related to the renewed certificate, execute the following keytool command.

    ``` java
    keytool -list -keystore <keystore_name.jks> -alias <cert_alias> -v
    ```
