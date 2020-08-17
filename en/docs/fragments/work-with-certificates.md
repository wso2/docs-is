## Work with certificates

X509 authentication requires the client to possess a Public Key Certificate (PKC). To know more about ublic Key Certificate (PKC) and Certificate Authority (CA), refer [Working with certificates](TO DO: Concepts)


To create a sample certificate and create your own Certificate Authority to sign the certificates, follow the following steps:

1.  The first step is to create the private RSA key:

    ```
    openssl genrsa -out rootCA.key 2048
    ```

    Here, the specified key size is 2048 bit. You can specify the key size for your private key.

2.  Based on this key you can now generate an actual certificate which is valid for 10 years using the following command:

    ```
    openssl req -new -x509 -days 3650 -key rootCA.key -out rootCA.crt
    ```

3.  You are prompted to provide the following details, and the details you provide are incorporated into the certificate request. 
    An example is shown below. Make sure you use the values that fit your use case.

    - Country Name (2 letter code) [AU]: SL
    - State or Province Name (full name) [Some-State]: Western
    - Locality Name (eg, city) [ ]: Colombo
    - Organization Name (eg, company) [Internet Widgits Pty Ltd]: WSO2
    - Organizational Unit Name (eg, section) [ ]: QA
    - Common Name (e.g. serverFQDN or YOUR name) [ ]: wso2is.com 
    - Email Address [ ]: kim@wso2.com

4.  An OpenSSL CA requires new files and supporting directories. Therefore, create a new directory.
    Create the directory structure according to your `openssl.conf` format.

    ```
    mkdir -p demoCA/newcerts
    ```

5.  You also need some initial files inside your CA directory structure.

    ```
    touch demoCA/index.txt
    echo '01' > demoCA/serial
    ```

6.  For the JVM to trust your newly created certificate import your certificate into your JVM trust store by executing the following command:

    ```
    keytool -import -noprompt -trustcacerts -alias rootCA -file rootCA.crt -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home/jre/lib/security/cacerts -storepass changeit
    ```

    !!! info "Got the 'permission denied' error?"
        Note that when adding the certificate to the JVM trust store you may get the permission denied error. Running this command as an administrator resolves this permission issue. 

        For example, if you are a Mac user, you can use sudo in front of this command to fix the permission issue.  

7. Now you have created the CA to sign the certificate. To create the server certificate follow the steps given below:

    1. Create the keystore that includes the private key by executing the following command:

        ```
        keytool -genkey -v -alias localcrt -keyalg RSA -validity 3650 -keystore localcrt.jks -storepass localpwd -keypass localpwd
        ```

        !!! tip
            You are prompted for details after executing the above command. For "What is your first and last name?" you need to give a name without space(e.g., wso2). 

        This command will create a keystore with the following details: 
            - **Keystore name:** localcrt.jks
            - **Alias of public certificate:** localcrt
            - **Keystore password:** localpwd
            - **Private key password:** localpwd (this is required to be the same as keystore password)
    
    2. Execute the following command to generate the certificate signing request(CSR) using the generated keystore file.

        ```
        keytool -certreq -alias localcrt -file localcrt.csr -keystore localcrt.jks -storepass localpwd
        ```

    3.  To enable CRL or OCSP based certificate revocation validation, configure the necessary openSSL extension configurations.

        1.  Open either of the following files.
            -  `validation.cnf`
            -  `/usr/lib/ssl/openssl.cnf`

        2.  Set the following properties under `x509\_extensions`.

            ``` java
            crlDistributionPoints = URI:http://pki.google.com/GIAG2.crl
            authorityInfoAccess = OCSP;URI: http://clients1.google.com/ocsp
            ```

    4.  Once it is done, sign the CSR, which requires the CA root key.

        ``` xml
        openssl ca -batch -startdate 150813080000Z -enddate 250813090000Z -keyfile rootCA2.key -cert rootCA2.crt -policy policy_anything -config {File_Path}/openssl.cnf -notext -out localcrt.crt -infiles localcrt.csr
        ```

        This creates a signed certificate called `localcrt.crt` that is valid for a specified period that is denoted by the `startdate` and `enddate`.

    5.  The next step is to import the CA and signed certificate into the keystore.

        ``` xml
        keytool -importcert -alias rootCA -file rootCA.crt -keystore localcrt.jks -storepass localpwd -noprompt
        
        keytool -importcert -alias localcrt -file demoCA/newcerts/01.pem -keystore localcrt.jks -storepass localpwd -noprompt
        ```

    6.  Now, get the `pkcs12` out of `.crt` file using the command given below as it is been used to import certificates to the browser.

        ``` xml
        keytool -importkeystore -srckeystore localcrt.jks -destkeystore localhost.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass localpwd -deststorepass browserpwd -srcalias localcrt -destalias browserKey -srckeypass localpwd -destkeypass browserpwd -noprompt
        ```

        Make sure to use the same password you used when creating the keystore for the `srcstorepass` in the above step. Now you have the `localhost.p12` file that you can import into your browser as explained in the [import certificate](#import-certificate) section.

7.  Next, create a new trust store and import the server certificate into the trust store using the following commands:

    ``` xml
    keytool -import -keystore cacerts.jks -storepass cacertspassword -alias rootCA -file rootCA.crt -noprompt
    keytool -importcert -alias localcrt -file localcrt.crt -keystore cacerts.jks -storepass cacertspassword -noprompt
    ```

    !!! tip "CN"
        The User objects in the LDAP directory hierarchy have designators that start with CN, meaning Common Name. The CN designator applies to all but a few object types. Active Directory only uses two other object designators (although LDAP defines several).

Once you have done the above steps, you have the keystore (`localcrt.jks`), truststore (`cacerts.jks`), and pkcs12 (`localhost.p12`) files that you need to use later on in this guide.

---

## Configure the X509 certificate for the app

1.  Download the [WSO2 Identity Server](http://wso2.com/products/identity-server/).

2.  Replace your keystore file path, keystore password, trust store file path and trust store password (you can use the keystore and
    truststore, which you created in the [Working with Certificates](#working-with-certificates) section) in the following configuration and add it to the
    `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml 
    [custom_trasport.x509.properties]
    protocols="HTTP/1.1"
    port="8443"
    maxThreads="200"
    scheme="https"
    secure=true
    SSLEnabled=true
    keystoreFile="/path/to/keystore.jks"
    keystorePass="keystorepwd"
    truststoreFile="/path/to/truststore.jks"
    truststorePass="truststorespassword"
    bindOnInit=false
    clientAuth="want"
    ssl_protocol = "TLS"
    ```

    !!! note
    
        1.   To function properly, this connector should come first in the order. Otherwise, when mutual SSL takes place, the already existing connector (9443) will be picked up and the certificate will not be retrieved correctly.

        2.  The `clientAuth` attribute causes the Tomcat to require the client with providing a certificate that can be configured as follows.

            -   `true` : valid client certificate required for a connection to succeed
            -   `want` : use a certificate if available, but still connect if no certificate is available
            -   `false` : no client certificate is required or validated
    
        -   The `truststoreFile` attributes specifies the location of the truststore that contains the trusted certificate issuers.

---

## Disable certificate validation
    
The location that is used to disable certificate validation depends on whether WSO2 Identity Server was started at least once or not.

-   If you have never started WSO2 Identity Server before, the configurations should be made on the `certificate-validation.xml` file.

-   If you have started WSO2 Identity Server at least once, the configurations should be made on the registry parameters.

---

**Disable certificate validation in an unstarted WSO2 IS Pack**

Follow the steps below to disable certificate validation if your WSO2 Identity Server pack has never been started.

1.  Open the `certificate-validation.xml` file in the `<IS_HOME>/repository/conf/security` repository.

2.  Disable certificate validation.

    1.  To disable CRL-based certificate validation, set the
        `            enable           ` sub-parameter of the
        `            org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator           `
        validator, to `            false           `.
    2.  To disable OCSP-based certificate validation, set the
        `            enable           ` sub-parameter of the
        `            org.wso2.carbon.identity.x509Certificate.validation.validator.OCSPValidato           `
        validator, to `            false           `.

    Example:

    ``` java
    <?xml version="1.0" encoding="ISO-8859-1"?> <CertificateValidation xmlns="http://wso2.org/projects/carbon/certificate-validation.xml">
     <Validators>
     <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator" displayName="CRLValidator" enable="false">
                     <Parameter name="priority">1</Parameter>
                     <Parameter name="fullChainValidation">true</Parameter>
                     <Parameter name="retryCount">2</Parameter>
        </Validator>
        <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.OCSPValidator" displayName="OCSPValidator" enable="false">
                     <Parameter name="priority">2</Parameter>
                     <Parameter name="fullChainValidation">true</Parameter>
                     <Parameter name="retryCount">1</Parameter>
        </Validator>
    </Validators>
    </CertificateValidation>
    ```

---

**Disable certificate validation in an already-started WSO2 IS pack**

Follow the steps below to disable certificate validation if WSO2 Identity Server was started before.

TODO: dev-portal-fragment

---

## Configure the Authentication Endpoint

1.  Open the `          deployment.toml         ` file in
    the `          <IS_HOME>/repository/conf/         `
    directory.
2.  Add the following configuration to the file.

    1.  `            authentication_endpoint           ` : This is the
        URL with the port that is secured with the certificate, e.g.,
        `                         https://localhost:8443/x509-certificate-servlet                       `
       . Update this based on your host name.
    2.  `            username           ` : This attribute value will be
        taken as the authenticated user subject identifier. Update this
        with any of the certificate attributes, e.g., CN and Email.
    3. `name` : This attribute identifies the authenticator that is configured as the second authentication step. 
    4. `enable`: This attribute, when set to true makes the authenticator capable of being involved in the authentication process. 

    ``` toml
    [authentication.authenticator.x509_certificate.parameters]
    name ="x509CertificateAuthenticator"
    enable=true
    AuthenticationEndpoint="https://localhost:8443/x509-certificate-servlet"
    username= "CN"
    ```

    !!! note
        When X509 authentication is configured as the second authentication
        step, the certificate will be validated to check whether it is
        associated with the authenticated user in the first authentication
        step. For that, the `           username          ` parameter will
        be used. For that, the authenticated user name considered in the
        first authentication step will be validated with the certificate
        attribute in this property.
    
        When X509 authentication is configured as the first step, this
        certificate attribute will be treated as the authenticated user
        subject identifier.
    

3.  If you are using the identity claim dialect URI to store X509
    certificate, add the following parameter.

    ``` toml
    [authentication.authenticator.x509_certificate.parameters]
    setClaimURI = "http://wso2.org/claims/identity/userCertificate"
    ```

4.  To enable storing the X509 certificate as a user claim, add the
    following parameter.

    ``` toml 
    [authentication.authenticator.x509_certificate.parameters]
    EnforceSelfRegistration = true
    ```

---

## Add a claim mapping for the certificate

If storing the certificate as a user claim is enabled, the X509
certificate will be stored as a user claim and verified with the
retrieved certificate from the request.

TODO: dev-portal-fragment

---

## Update the column size of the database for X509 certificates

Make note of the following points and configure your database to match
your use case:  
  
-   [Disabling Certificate Validation in an Unstarted WSO2 IS
    Pack](#disable-certificate-validation-in-an-unstarted-WSO2-IS-Pack)
-   [Disabling Certificate Validation in an Already-started WSO2 IS
    Pack](#Disable-Certificate-Validation-in-an-already-started-WSO2-IS-Pack)
