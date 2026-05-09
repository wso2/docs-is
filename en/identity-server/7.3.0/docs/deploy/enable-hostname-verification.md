# Enable HostName Verification

The possibility to configure hostname verification is available for the WSO2 Identity Server. If hostname verification is disabled, the hostnames (that are accessed by a particular client) will not be verified against the hostnames specified in the product's SSL certificate. If hostname verification is enabled, you will be able to configure how hostnames are filtered during the verification process.

!!! note "Important"  
    Be sure to enable hostname verification for your production environment. This is necessary to avoid security issues in production. See the full list of [security recommendations for production]({{base_path}}/deploy/security/security-guidelines/) environments.

## Configure hostname verification

In the WSO2 Identity Server, hostname verification is enabled by default. This is done using the `httpclient.hostnameVerifier` property in the startup script ( `wso2server.sh` for Linux and `wso2server.bat` for Windows) as shown below. The product startup script is stored in the `<IS_HOME>/bin` directory. This property will be effective during server startup.

``` java
-Dhttpclient.hostnameVerifier="DefaultAndLocalhost"
```

The values you can use with this property are explained below. Note that these values will behave the same as synapse hostname verification options.

- **DefaultAndLocalhost:** This is the value that is enabled, by default. This means that all hostnames, except the ones listed below, will be verified against the hostnames specified in the product's SSL certificate. That is, the following hostnames will be allowed regardless of the server's certificate.

    - `localhost`
    - `localhost.localdomain`
    - `127.0.0.1`
    - `::1`

    If the wildcard symbol is used to specify a hostname in the SSL certificate (such as `*.foo.com`), all the subdomains of `*.foo.com` are also included. That is, a hostname that matches a subdomain of `*.foo.com` will also be allowed access.

- **Strict:** When this mode is enabled, hostnames will be strictly verified against the hostname specified in the product's SSL certificate. For example, if `*.foo.com` is specified as the hostname in the certificate, only the hostnames at the same level will be authorized by the server. That is, subdomains such as `a.b.foo.com` will not be authorized.

- **AllowAll:** This option turns off hostname verification for the server. Note that this is not recommended in a production setup and should only be used for demonstrations and testing.

    !!! note "Important"
        To disable hostname verification for WSO2 IS, use the following system properties.

        ``` java
        -Dorg.opensaml.httpclient.https.disableHostnameVerification=true \
        -Dhttpclient.hostnameVerifier="AllowAll" \
        ```
