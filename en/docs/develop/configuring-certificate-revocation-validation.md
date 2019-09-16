# Configuring Certificate Revocation Validation

A certificate that is issued by a Certificate Authority (CA) is expected
to be in use for its entire validity period. However, certain
circumstances may cause a certificate to become invalid prior to the
expiration of the validity period, e.g., a compromise or suspected
compromise of the corresponding private key. Under such circumstances,
the issuing CA needs to revoke the certificate prior to the scheduled
expiry date so that the certificate would longer be trusted.

Certificate Revocation List (CRL) and OCSP (Online Certificate Status
Protocol) are two protocols that are used to check whether a given X509
certificate is revoked by its issuer.

!!! info
    -   **CRL** is a list of digital certificates that have been revoked by
        the issuing CA.
    -   **OCSP** is an internet protocol that is used for obtaining the
        revocation status of an X509 digital certificate using the
        certificate serial number.

WSO2 X509 authenticator, which perms client X509 certificate
authentication supports certificate validation with CRL and OCSP. At the
verification phase of the SSL handshake, OSCP/CRL certificate
verification process is used to contact the relevant CA to verify the
validity of the given certificate. If the response states that the
certificate is revoked, it indicates that the certificate is no longer
trusted by the CA, i.e., the SSL connection to the peer is terminated.

!!! note
    To learn about configuring the X509 certificate authenticator, see
    [Configuring X509Certificate
    Authenticator](../../develop/x509-certificate-authenticator).
    

Explore the following sections below to configure CRL and OCCP for
certificate validation.

!!! tip "Before you begin"
    
    Locate the
    `         <IS_HOME>/repository/conf/security/certificate-validation.xml        `
    file and open in a text editor.
    
    Example:
    
    ``` xml
    <?xml version="1.0" encoding="ISO-8859-1"?>
     <CertificateValidation xmlns="http://wso2.org/projects/carbon/certificate-validation.xml">
     <Validators>
     <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator" displayName="CRLValidator" enable="true">
                     <Parameter name="priority">1</Parameter>
                     <Parameter name="fullChainValidation">true</Parameter>
                     <Parameter name="retryCount">2</Parameter>
        </Validator>
        <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.OCSPValidator" displayName="OCSPValidator" enable="true">
                     <Parameter name="priority">2</Parameter>
                     <Parameter name="fullChainValidation">true</Parameter>
                     <Parameter name="retryCount">1</Parameter>
        </Validator>
    </Validators> 
    </CertificateValidation>
    ```


#### Enabling and Disabling Certificate Validation

Follow the steps below to enable or disable certificate validation.

1.  On the
    `            <IS_HOME>/repository/conf/security/certificate-validation.xml           `
    file, locate the required validator, e.g.,
    `            <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator"...>           `
    .
2.  To enable or disable certificate validation set the
    `             enable            ` sub-parameter under the
    `             <Validator>            ` parameter to
    `             true            ` or `             false            `
    respectively.

    !!! info 
        These configurations are added to the tenant registry at
        `              /_system/governance/repository/security/certificate/validator             `
        during the tenant creation. There will be separate registry resource
        for each validator with the properties such as name, enable, and
        priority. During the certificate validation process, all the
        validator configurations are loaded from the registry and based on
        the status and priority, the corresponding validator gets invoked.

#### Prioritizing Certificate Validation

Follow the steps below to prioritize certificate validation.

1.  On the
    `            <IS_HOME>/repository/conf/security/certificate-validation.xml           `
    file, locate the required validator, e.g.,
    `            <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator"...>           `
    .
2.  To prioritize certificate validation, set a priority value to the
    `             <Parameter name="priority">            ` element.

    !!! note "Validation when both CRL and OCSP methods are enabled"
        If the highest priority method returns a successful validation or
        status is not "Unknown", the second method is not attempted. The
        methods with the second and beyond proprieties are used as backup.
    
#### Configuring Full-Chain Certificate Validation

The certificate chain is a list of certificates that enables the
receiver to verify whether the sender and the CAs are trustworthy. The
certificate chain begins with the SSL certificate and ends with the root
certificate. All the certificates that reside between the SSL and root
certificates are called intermediate certificates. All the certificates
in the chain are signed by the entity identified by the subsequent
certificate.

When the full-chain certificate validation is disabled, the system
validates the client certificate with the CRL/OCSP of the issuer CA.
When the full-chain certificate validation is enabled, the system
validates with the CRL/OCSP of every intermediate certificate within the
trust chain for the client except for the root CA certificate.

!!! info "Sample full-chain certificate validation"
    The intermediate CA CRL is used to verify whether the client certificate
    is valid. The root CA CRL is used to verity whether the Intermediate CA
    Cert is valid.

    Root CA (root CA CRL) Cert ==\> Intermediate CA Cert (inter CA CRL) ==\>
    Client Cert

  
Follow the steps below to configure full-chain certificate validation.

1.  On the the
    `            <IS_HOME>/repository/conf/security/certificate-validation.xml           `
    file, locate the required validator, e.g.,
    `            <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator"...>           `
    .
2.  To enable or disable full-chain certificate validation, set the
    `             <Parameter name="fullChainValidation">            `
    element to `             true            ` or
    `             false            ` respectively. This validates the
    CRL/OCSP of every intermediate certificate within the chain of trust
    for the client except for the root CA certificate.

    !!! note
    
        Even if full-chain CRL/OCSP checking is enabled, the client request
        will be denied if either of the following is true:
    
        -   Intermediate certificates are not available in the registry
        -   A CRL is not available in any of the intermediate CA in the
            chain of trust
        -   The certificate is listed as revoked in any of the CRLs
    

#### Configuring the Number of Retries

Follow the steps below to configure the maximum number of allowed
attempts to download the CRL file or to obtain the OCSP response from
the specified path.

1.  On the the
    `            <IS_HOME>/repository/conf/security/certificate-validation.xml           `
    file, locate the required validator, e.g.,
    `            <Validator name="org.wso2.carbon.identity.x509Certificate.validation.validator.CRLValidator"...>           `
    .
2.  Set the allowed number of retries using the
    `            <Parameter name="retryCount">           ` element.

#### Configuring the Trust Stores to Load the CA Certificates

In order for certificates of CAs and intermediate CAs to be considered
as trusted CAs for X509 authentication, they have to be configured in
the `           certificate-validation.xml          ` . Follow the steps
below to configure the trust stores to in order load the CA
certificates.

1.  On the the
    `            <IS_HOME>/repository/conf/security/certificate-validation.xml           `
    file, locate the
    `            <TurstStores></TrustStores>           ` tags.
2.  Set the Trust Store path, password, and type as given below.

    1.  Format:

        ``` java
        <?xml version="1.0" encoding="ISO-8859-1"?>
        <CertificateValidation xmlns="http://wso2.org/projects/carbon/certificate-validation.xml">
        …….
        <TrustStores>
            <TrustStore truststoreFile="<TURST_STORE_PATH>" truststorePass="<TRUST_STORE_PASSWORD>" type="<TRUST_STORE_TYPE>"/>
        </TrustStores>
        </CertificateValidation>
        ```

    2.  Example:

        ``` java
                <?xml version="1.0" encoding="ISO-8859-1"?>
                <CertificateValidation xmlns="http://wso2.org/projects/carbon/certificate-validation.xml">
                …….
                <TrustStores>
                    <TrustStore truststoreFile="/path/to/truststore.jks" truststorePass="cacertspassword" type="JKS"/>
                </TrustStores>
                </CertificateValidation>
        ```

#### Testing Certificate Revocation

**Certificate Revocation with CRL**

After revoking the client certificate, test the X509 authentication with
CRL validation by the self signed CA as mentioned below.

!!! note
    The <http://pki.google.com/GIAG2.crl> is a CRL URL of a  well-known
    CA. In order to test the revocation of certificates through a CRL from
    our end, generate an own CRL and upload it to the own CRL URL. The CRL
    URL should be configured in the
    `             validation.cnf            ` file.
    

1.  Generate a CRL.

    ``` java
    echo '01' > demoCA/crlnumber
    openssl ca -gencrl -crldays 30 -out rootCA.crl -keyfile rootCA.key -cert rootCA.crt
    ```

2.  Once the CRL is generated, upload it to the
    `              crlDistributionPoints             ` URL.
3.  Revoke a compromised certificate.

    ``` java
        openssl ca -keyfile rootCA.key -cert rootCA.crt -revoke localcrt.crt
    ```

4.  Generate the updated CRL.

    ``` java
        openssl ca -gencrl -crldays 30 -out rootCA.crl -keyfile rootCA.key -cert rootCA.crt
    ```

5.  View the contents of the CRL to check for the certificates that the
    CRL has revoked.

    ``` java
        openssl crl -in rootCA.crl -text -noout
    ```

6.  Once the certificate is revoked and the CRL is updated, upload it so
    that a new version can be downloaded from the CRL URL.

**Certification Revocation with OCSP**

After revoking the client certificate, test the X509 authentication with
OCSP validation by the self signed CA as mentioned below.

!!! note
    The <http://clients1.google.com/ocsp> is an OCSP URL of a  well-known
    CA. In order to test the revocation of certificates through OCSP from
    our end, generate an own OCSP. This OCSP should be configured in the
    `             validation.cnf            ` file.
    

1.  Generate the OCSP signing certificate to host an OCSP server.

    ``` java
    openssl req -new -nodes -out ocspSigning.csr -keyout ocspSigning.key
    openssl ca -keyfile rootCA.key -cert rootCA.crt -in ocspSigning.csr -out ocspSigning.crt -extfile ocspSigning.cnf
    ```

2.  Configure the `               ocspSigning.cnf              ` as
    given below.

    ``` java
        basicConstraints = CA:FALSE
        keyUsage = nonRepudiation, digitalSignature, keyEncipherment
        extendedKeyUsage = OCSPSigning
    ```

3.  Start the OCSP server.

    ``` java
        openssl ocsp -index demoCA/index.txt -port 8888 -rsigner ocspSigning.crt -rkey ocspSigning.key -CA rootCA.crt -text -out log.txt &
    ```

    !!! note
    
        Start a listening OCSP server (responder) on port
        `               8888              ` so that the OCSP URL is
        configured in the `               validation.cnf              ` as
        `                               http://127.0.0.1:8888                             `
        .
    
        The `               index.txt              ` is the index file that
        OpenSSL creates when the CA is set up, and updates every time the CA
        signs or revokes a certificate. The above created OCSP signing
        certificate and private key are specified so that the server can
        sign its responses. It is possible to add the
        `               -text              ` and
        `               -out              ` options to dump the queries onto
        a file.
    

    Check the certificate status with either of the following methods.

    1.  Check if the certificate is valid via OCSP as follows with the
        OpenSSL commands. Test the X509 authentication, by enabling the
        OCSP validation. With this, validation it should be successful.

        ``` java
        openssl ocsp -CAfile rootCA.crt -issuer rootCA.crt -cert demoCA/newcerts/01.pem -url http://127.0.0.1:8888 -resp_text
        ```

        Check the client certificate serial number. There should be a
        certificate file in the
        `                 demoCA/newcerts/<serial_num>.pem                `
        .

    2.  Directly query from the client certificate serial number.

        ``` java
                openssl ocsp -CAfile rootCA.crt -issuer rootCA.crt -serial 01 -url http://127.0.0.1:8888 -resp_text
        ```

4.  Revoke the client certificate.

    ``` java
        openssl ca -keyfile rootCA.key -cert rootCA.crt -revoke demoCA/newcerts/01.pem
    ```

5.  Verify the certificate revocation.

    ``` java
        openssl ocsp -CAfile rootCA.crt -issuer rootCA.crt -cert demoCA/newcerts/01.pem -url http://127.0.0.1:8888 -resp_text
    ```

    You can confirm that the OCSP query now correctly reports that the
    certificate is revoked. Test the X509 authentication, by enabling
    the OCSP validation. With this, validation should be failed.

**Update Validator Configurations**

Follow the steps below to change the priority of the validators of any
other validator configurations.

!!! note
    File-based configurations are taken only at the initial start up, after
    which the changes are to be made in the registry via the WSO2 Identity
    Server Management Console.
    

1.  Sign in to the WSO2 IS Management Console with one of the following
    URLs using `               admin              ` as the **username**
    and **password**.

    ``` java
    For HTTP  --> http://<HTTP_HOST>:9776/carbon
    For HTTPS --> https://<HTTPS_HOST>:9443/carbon
    ```

2.  On the **Main** tab, click **Registry \> Browse**.  
    ![](../../assets/img/103328122/103328123.png) 
    
3.  Enter the registry path
    `              /_system/governance/repository/security/certificate/validator             `
    to the **Location** text box and click **Go**.  
    ![](../../assets/img/103328122/103328124.png) 

4.  To update the properties, expand **Properties**.

    ![](../../assets/img/103328122/103328125.png) 
