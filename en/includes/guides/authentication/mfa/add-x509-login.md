# Configure X.509 certificate authenticator

This guide walks you through configuring the X.509 certificate authenticator in {{product_name}}, helping you set up secure certificate-based authentication for your users.

X.509 is a widely recognized standard within Public Key Infrastructure (PKI) that defines the format for public key certificates. These certificates are typically issued by trusted Certificate Authorities (CAs) and serve as a means of securely identifying users or systems. During the authentication process, the user (or client) presents their X.509 certificate to the authentication server, which then validates the certificate by checking the digital signature of the CA to confirm the certificate’s authenticity.

!!! note
    You need to create the necessary certificates and truststores before you start configuring the x509 
    authenticator on {{ product_name }}. Refer to [Keystores and Truststores]({{base_path}}/deploy/security/keystores/) for more information.

## Step 1: Create a self-signed certificate authority (CA)

To issue and sign client certificates, you first need to create a self-signed CA certificate. This CA will be trusted by {{product_name}} and used to validate client certificates presented during authentication.

To do so,

1. Generate a private key. The following command generates a private RSA key with a key size of 2048 bits.

    ``` shell
    openssl genrsa -out rootCA.key 2048
    ```
    In this example, the key size is 2048 bits, but you can adjust it according to your security requirements.

2. Using the private key, generate a self-signed certificate. The following command generates a self-signed certificate that is valid for 10 years (3650 days).

    ```
    openssl req -new -x509 -days 3650 -key rootCA.key -out rootCA.crt
    ```

3. When prompted, provide the necessary details. Below is an example of the input values:

    ```text
    Country Name (2 letter code) [AU]: SL
    State or Province Name (full name) [Some-State]: Western
    Locality Name (eg, city) [ ]: Colombo
    Organization Name (eg, company) [Internet Widgits Pty Ltd]: WSO2
    Organizational Unit Name (eg, section) [ ]: QA
    Common Name (e.g. serverFQDN or YOUR name) [ ]: wso2is.com
    Email Address [ ]: kim@wso2.com
    ```

    Once you have gone through these steps, you now have a private key (rootCA.key) and a self-signed certificate (rootCA.crt).

4. To manage certificates effectively, OpenSSL requires a specific directory structure. Create it as follows:

    ``` shell
    mkdir -p demoCA/newcerts
    ```

5. Create the necessary files as follows:

    ``` shell
    touch demoCA/index.txt
    echo '01' > demoCA/serial
    ```

6. To enable X.509 certificate-based authentication, {{product_name}} must trust certificates issued by this CA. Use the following command to import the CA certificate (rootCA.crt) into the truststore of {{product_name}}.

    ``` shell
    keytool -import -noprompt -trustcacerts -alias rootCA -file rootCA.crt -keystore <path_to_the_client_truststore> -storepass <password_of_the_truststore>
    ```

    !!! note "Default truststore values"
        If you are using the default values,
        <ul>
            <li>truststore path is <code>&lt;IS_HOME&gt;/repository/resources/security/client-truststore.p12</code></li>
            <li>password is <code>wso2carbon</code></li>
        </ul>
        Refer to [manage keystores]({{base_path}}/deploy/security/keystores/configure-keystores/) to learn how to change default keystores and truststores.


    !!! tip "Got the 'permission denied' error?"
        If you get a permission denied error, run this command as an administrator to resolve the issue.

## Step 2: Create a client certificate

In this step, we will generate a client certificate that will be used to authenticate to {{product_name}}. This involves:

!!! abstract ""

    - Creating a keystore that holds the client’s private key and certificate.
    - Generating a Certificate Signing Request (CSR) to obtain a signed certificate from the CA.
    - Importing the signed certificate and CA certificate into the keystore.

1. Generate a keystore that contains the private key and public certificate. The following command creates a new keystore (localcrt.jks) and generates a new RSA key pair with a validity of 10 years (3650 days).

    ``` shell
    keytool -genkey -v -alias localcrt -keyalg RSA -validity 3650 -keystore localcrt.jks -storepass localpwd -keypass localpwd
    ```

    Enter the necessary details to create the keystore.

    !!! tip
        For `What is your first and last name?`, provide a name without spaces. 

    This command will create a keystore with the following details:

    <table>
        <tr>
            <td>Keystore name</td>
            <td>localcrt.jks</td>
        </tr>
        <tr>
            <td>Alias of public certificate</td>
            <td>localcrt</td>
        </tr>
        <tr>
            <td>Alias of public certificate</td>
            <td>localpwd</td>
        </tr>
        <tr>
            <td>Private key password</td>
            <td>localpwd (this is required to be the same as keystore password)</td>
        </tr>
    </table>

2. Next, generate a Certificate Signing Request (CSR) using the keystore you just created. The CSR will be submitted to the CA, which will sign it, proving that the certificate is trusted.

    ``` shell
    keytool -certreq -alias localcrt -file localcrt.csr -keystore localcrt.jks -storepass localpwd
    ```

3. To ensure {{product_name}} does not accept revoked certificates when using X.509 certificate-based authentication, configure OpenSSL to check for Certificate Revocation List (CRL) or use Online Certificate Status Protocol (OCSP). To do so,

    1.  Open either of the following files in your openssl installation.
        -  `validation.cnf`
        -  `openssl.cnf`

        ??? note "Location of the configuration files"
            The location of the configuration file depends on the operating system and the openssl installation method.

            - For Linux, 
                - `/etc/ssl/openssl.cnf`
                - `/usr/lib/ssl/openssl.cnf`
            
            - For MacOS, 
                - `/opt/homebrew/etc/openssl@<version>/openssl.cnf`
                - `/System/Library/OpenSSL/openssl.cnf` (System-wide, read-only file. Take a copy of it and avoid editing directly.)

            - For Windows,
                - `C:\Program Files\OpenSSL-Win64\bin\openssl.cnf`
                - `C:\Program Files (x86)\GnuWin32\share\openssl.cnf`
            
            If you do not have permission to modify the system-wide configuration file, create a custom configuration file (e.g., validation.cnf) in your working directory.

    2.  Set the following properties under `x509_extensions`.

        ``` java
        crlDistributionPoints = URI:http://pki.google.com/GIAG2.crl
        authorityInfoAccess = OCSP;URI: http://clients1.google.com/ocsp
        ```
    
4. Once it is done, sign the CSR using the root CA key generated in Step 1 above.

    ```shell
    openssl ca -batch -startdate 150813080000Z -enddate 250813090000Z -keyfile rootCA.key -cert rootCA.crt -policy policy_anything -config <custom_config_location> -notext -out localcrt.crt -infiles localcrt.csr
    ```

    !!! note
        The `-config` flag is only needed if you are using a custom configuration file.

    This creates a signed certificate called `localcrt.crt` that is valid for a specified period that is denoted by the `startdate` and `enddate`.

5. The next step is to import the CA and the signed certificates into the keystore using the following commands.

    ```shell
    keytool -importcert -alias rootCA -file rootCA.crt -keystore localcrt.jks -storepass localpwd -noprompt

    keytool -importcert -alias localcrt -file demoCA/newcerts/01.pem -keystore localcrt.jks -storepass localpwd -noprompt
    ```

6. Use the command below to convert the `.crt` file into the PKCS12 format, which is used for importing certificates into browsers:

    ``` shell
    keytool -importkeystore -srckeystore localcrt.jks -destkeystore localhost.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass localpwd -deststorepass browserpwd -srcalias localcrt -destalias browserKey -srckeypass localpwd -destkeypass browserpwd -noprompt
    ```

    Make sure to use the same password you used when creating the keystore for the `srcstorepass` in the above step. Now you have the `localhost.p12` file that you can import into your browser as explained in the [import certificate](#import-certificate) section.

7. Next, create a new trust store and import the server certificate into the trust store using the following commands:

    ```shell
    keytool -import -keystore cacerts.jks -storepass cacertspassword -alias rootCA -file rootCA.crt -noprompt

    keytool -importcert -alias localcrt -file localcrt.crt -keystore cacerts.jks -storepass cacertspassword -noprompt
    ```
        
    !!! tip "Understanding CN in LDAP and Active Directory"  
    
        In an LDAP directory, user objects typically have a **CN (Common Name)** attribute, which serves as a unique identifier for users. The CN is a part of the **Distinguished Name (DN)** and is used to reference user entries within the directory.  

        While LDAP supports multiple naming attributes, Active Directory primarily uses **CN** along with two other object designators for identifying user objects. This is important for authentication mechanisms, such as **X.509 certificate-based authentication**, where the CN in a certificate must match the CN in the directory for proper user mapping.

Once you have done the above steps, you now have the keystore (`localcrt.jks`), truststore (`cacerts.jks`), and pkcs12 (`localhost.p12`) files that you need to use later on in this guide.

## Step 3: Configure X.509 certificate-based authentication in {{product_name}}

Follow the steps below to configure X.509 certificate-based authentication in {{product_name}}.

1.  Download [{{ product_name }}](http://wso2.com/products/identity-server/).

2.  Update the `<IS_HOME>/repository/conf/deployment.toml` file with the keystore and truststore details. Replace the placeholders with the actual paths and passwords of the keystore and truststore you created in step 3.

    ``` toml 
    [custom_transport.x509.properties]
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

    !!! Important 
    
        1.   To function properly, this connector should come first in the order. Otherwise, when mutual SSL takes place, the already existing connector (9443) will be picked up and the certificate will not be retrieved correctly.

        2.  The `clientAuth` attribute causes the Tomcat to require the client with providing a certificate that can be configured as follows.
            -   `true` : valid client certificate required for a connection to succeed
            -   `want` : use a certificate if available, but still connect if no certificate is available
            -   `false` : no client certificate is required or validated
    
        3.   The `truststoreFile` attributes specifies the location of the truststore that contains the trusted certificate issuers.

## Step 4: Disable certificate validation

Disabling certificate validation is necessary as {{product_name}} attempts to validate certificates against external Certificate Revocation Lists (CRL) or Online Certificate Status Protocol (OCSP) responders. Since self-signed certificates do not have a publicly accessible CA for revocation checks, enabling these validations will cause authentication failures.

### Disable certificate validation in an unstarted {{ product_name }} pack

Follow the steps below to disable certificate validation if your {{ product_name }} pack has never been started.

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

2.  Add the following configuration to disable CRL-based certificate validation and OCSP-based certificate validation.

    ``` toml
    [certificate_validation]
    ocsp_validator_enabled = false
    crl_validator_enabled = false
    ```
    
    !!! infox
        - CRL is a list of digital certificates that have been revoked by the issuing CA.
        - OCSP is an internet protocol that is used for obtaining the revocation status of an X509 digital certificate using the certificate serial number.

### Disable certificate validation in an already-started {{ product_name }} pack

{% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}

Follow the steps below to disable certificate validation if {{ product_name }} was started before.

1. Log in to the {{ product_name }} Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).

2.  Click **Main > Registry > Browse**.  
    ![registry](../../../assets/img/guides/authentication/mfa/registry.png){: width="300" height="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3.  Disable CRL certificate validation.

    1.  Locate the CRL parameter by entering
            `_system/governance/repository/security/certificate/validator/crlvalidator`
            in the **Location** search box.  
            ![location](../../../assets/img/guides/authentication/mfa/browse-registry-location.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    2.  Expand **Properties**.  
        ![crlvalidator-properties](../../../assets/img/guides/authentication/mfa/crlvalidator-properties.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
    3.  Click **Edit** pertaining to the **Enable** property.  
        ![crlvalidator-enable-property](../../../assets/img/guides/authentication/mfa/crlvalidator-enable-property.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Change the value to `false`, click **Save**.  
        ![save-crlvalidator-disable](../../../assets/img/guides/authentication/mfa/save-crlvalidator-disable.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    5. Similarly, disable OCSP certificate validation in the `_system/governance/repository/security/certificate/validator/ocspvalidator`
        registry parameter.

{% else %}

If {{product_name}} is already started, use the [Certificate Validation Management API]({{base_path}}/apis/certificate-validation-management-rest-api/) to disable certificate validation as shown below.

=== "Sample request"

    ```
    curl -k -X PUT https://localhost:9443/t/{tenant-domain}/api/server/v1/certificate-validation/revocation-validators/{validator-name}\
    -H "accept: application/json" \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Basic YWRtaW46YWRtaW4=' \
    -d '{"enable": false, "priority": 1, "fullChainValidation": true, "retryCount": 2}'
    ```
=== "Sample response"

    ```
    {
        "enable": false,
        "priority": 1,
        "fullChainValidation": true,
        "retryCount": 2
    }
    ```

{% endif %}

## Step 5: Configure the Authentication Endpoint

Follow the steps below to configure the authentication endpoint for X.509 certificate authentication in {{ product_name }}.

1.  Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configurations.

    ``` toml
    [authentication.authenticator.x509_certificate.parameters]
    name ="x509CertificateAuthenticator"
    enable=true
    AuthenticationEndpoint="https://localhost:8443/x509-certificate-servlet"
    username= "CN"
    ```

    !!! info "Configuration details"
        - `name` : Identifies the authenticator. 
        - `enable`: Enables X.509 certificate authentication.
        - `AuthenticationEndpoint` : Specifies the URL where the certificate is retrieved from the browser. Update this based on your hostname.
        - `username` : Defines the certificate attribute used as the authenticated user’s identifier (e.g., CN, Email).

    !!! note

        When X.509 authentication is used as the second authentication step, the system validates whether the certificate is linked to the user authenticated in the first step. This is done by comparing the `username` parameter with the corresponding attribute in the certificate.  When X509 authentication is configured as the first step, this certificate attribute will be treated as the authenticated user
        subject identifier.
    
2.  If you want to store X.509 certificates as user claims, add the following property to the same file:

    ``` toml
    [authentication.authenticator.x509_certificate.parameters]
    setClaimURI = "http://wso2.org/claims/userCertificate"
    ```

4.  To enable automatic self-registration for users who authenticate with an X.509 certificate, add the following property to the same file:

    ``` toml 
    [authentication.authenticator.x509_certificate.parameters]
    EnforceSelfRegistration = true
    ```

5. Restart {{product_name}} to apply the changes.

## Step 6: Add an attribute mapping for the certificate

If you have enabled storing X.509 certificates as a user attribute, {{product_name}} will save the certificate as a user attribute and validate it against the certificate presented in the authentication request.

To add the custom attribute, follow the steps in [add custom attributes]({{base_path}}/guides/users/attributes/manage-attributes.md/#add-custom-attributes) and use the following details.

- Attribute name : userCertificate
- Attribute Display Name : User Certificate

![add-user-certificate-attribute]({{base_path}}/assets/img/guides/authentication/mfa/add-user-certificate-attribute.png){: width="600" style="display: block; border: 0.3px solid lightgrey;"}

This will also generate the **OpenID Connect** and **SCIM 2.0** protocol mappings. If you store the certificate as a user attribute, you must adjust the column size of the `VALUE` column in the `UM_USER_ATTRIBUTES` table to accommodate the certificate data.

## Step 7: Import certificate to browser

To use the X.509 certificate for authentication, you must first import it into your browser's certificate store. To do so:

1. Open your browser's settings and navigate to the certificate management section.

2. Look for options related to Privacy & Security or Certificates.
3. Locate the option to Import a certificate.
4. Select the `localhost.p12` file and follow the prompts. You may be asked to enter the password (browser password) used when creating the .p12 file.
5. Once imported, ensure the certificate is recognized and available for authentication.

For specific instructions, refer to your browser’s documentation on managing client certificates.

## Step 8: Enable X.509 authenticator for your application

!!! note "Before you begin"

    To enable X.509 certificate-based authentication for your application, you first need to register your application in {{product_name}}. If you have not done already, refer to [Applications]({{base_path}}/guides/applications/) for instructions.

To enable the x.509 authenticator for your application,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. In the **Login Flow** tab of your application, click **Add Sign In Option** and select **X509 Certificate**.

    ![add-x509-authenticator](../../../assets/img/guides/authentication/mfa/add-x509-authenticator.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Step 9: Onboard a user

Create a user in {{product_name}} with the same username as the `CN` of the created certificate above. See [Onboard users]({{base_path}}/guides/users/manage-users/#onboard-users) for instructions.

## Try it out

Try to login to the application you have configured. You will be prompted to send the certificate.

![send-certificate]({{base_path}}/assets/img/guides/authentication/mfa/certificate-send.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Once the authentication is successful, you will be redirected to the configured callback location of the application.