# WS-Federation settings for apps

You can find the WS-Federation protocol related settings under **protocol** section of the selected WS-Federation application.
  
![WS-Federation settings]({{base_path}}/assets/img/guides/applications/ws-federation/ws-federation-settings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Basic settings

### Realm
WS-Federation realm is a unique identifier for the web app.

### Reply URL
This should be the Relying Party (RP) endpoint URL that handles the response.

### Reply Logout URL
This should be the Relying Party (RP) endpoint URL that handles the response at logout.

<br>

## Advanced settings

### Certificate
The certificate is used to validate signatures when authentication requests or logout requests from the application are signed.
<br><br>
You can either <b>Provide Certificate</b> or <b>Use JWKS endpoint</b> to add a certificate.
<br>
Follow the steps given below to Provide Certificate.

1. Select <b>Provide Certificate</b> and click <b>New Certificate</b>.

    ![Upload app certificate]({{base_path}}/assets/img/guides/applications/ws-federation/upload-certificate-of-app.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Upload the certificate file or copy the certificate contents
<br>

??? note "If you have certificate in other formats such as `.crt`, `.cer` or `.der`, expand here to convert your certs to PEM format using [OpenSSL](https://www.openssl.org/)"
    **Convert CRT to PEM**
    ```
    openssl x509 -in cert.crt -out cert.pem
    ```
    **Convert CER to PEM:**
    ```
    openssl x509 -in cert.cer -out cert.pem
    ```
    **Convert DER to PEM:**
    ```
    openssl x509 -in cert.der -out cert.pem
    ```
