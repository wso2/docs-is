# WS-Federation settings for apps

You can find the WS-Federation protocol related settings under **Protocol** section of the selected WS-Federation application.
  
![WS-Federation settings]({{base_path}}/assets/img/guides/applications/ws-federation/ws-federation-settings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Basic settings

To enable WS-Federation-based single sign-on (SSO), you need to configure the following key identifiers and endpoints.

### Realm

The Realm is a unique identifier for your application. It tells {{product_name}} which application is requesting authentication. This must match the `wtrealm` parameter in the WS-Federation request.

### Reply URL

The Reply URL is the endpoint in your application where {{product_name}} sends the authentication response after a successful login. This should match the `wreply` parameter in the WS-Federation request and must be configured to handle the security token.

### Reply Logout URL

The Reply Logout URL is the endpoint in your application that receives the logout response from {{product_name}}.

## Advanced settings

Use the following advanced settings to enhance the security and behavior of your WS-Federation integration.

### Certificate

If your application signs authentication or logout requests, {{product_name}} uses this certificate to verify their authenticity.

You can either upload a certificate or use a JWKS endpoint to add a certificate.

To upload a certificate:

1. Select <b>Provide Certificate</b> and click <b>New Certificate</b>.

    ![Upload app certificate]({{base_path}}/assets/img/guides/applications/ws-federation/upload-certificate-of-app.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ??? note "Convert `.crt`, `.cer` or `.der` certificates to `.pen` using [OpenSSL](https://www.openssl.org/){:target="_blank"}"

        {{product_name}} only accepts certificates in the `.pem` format. To convert other certificates to `pem`, use one of the following commands.

        - Convert CRT to PEM
        
            ```
            openssl x509 -in cert.crt -out cert.pem
            ```
        
        - Convert CER to PEM:
        
            ```
            openssl x509 -in cert.cer -out cert.pem
            ```
        
        - Convert DER to PEM:
        
            ```
            openssl x509 -in cert.der -out cert.pem
            ```

2. Upload the certificate file or copy the certificate contents.
