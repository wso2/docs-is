# Configure Transport Level Security

Given below are the various transport-level security configurations that
are required for WSO2 Identity Server. 

---

## Enabling SSL protocols in the WSO2 IS

Follow the instructions given below to enable SSL protocols in the WSO2 Identity Server.

1. Add the following configurations in the `<IS_HOME>/repository/conf/deployment.toml` file.

     ```toml
     [transport.https.sslHostConfig.properties]
     protocols="TLSv1, TLSv1.1, TLSv1.2"
     ```

    If you wish to remove `TLSv1` or`TLSv1.1`, you can do so by removing them as values from the `protocols` property.


2. Restart the server.

---

## Disable weak ciphers

A cipher is an algorithm for performing encryption or decryption. When
you set the `         sslprotocol        ` of your server to TLS, the
TLS and the default ciphers are enabled without considering the strength
of the ciphers. This is a security risk as weak ciphers, also known as
EXPORT ciphers, can make your system vulnerable to attacks such as the
Logjam attack on Diffie-Hellman key exchange. The Logjam attack is also
called the Man-in-the-Middle attack. It downgrades your connection's
encryption to a less-secured level (e.g., 512 bit) that can be decrypted
with sufficient processing power.

To prevent these security attacks, it is encouraged to disable
the weak ciphers. You can enable only the ciphers that you want the
server to support in a comma-separated list in the
`         ciphers        ` attribute. Also, if you do not add this
cipher attribute or keep it blank, the browser will support all the SSL
ciphers by JSSE. This will enable the weak ciphers.

### Disable weak ciphers in WSO2 IS

A cipher is an algorithm for performing encryption or decryption. When the `sslprotocol` is set to `TLS`, only the TLS and default ciphers are enabled by default. However, note that the strength of the ciphers will not be considered when they are enabled. Therefore, to disable the weak ciphers, you must ensure that only the ciphers you want your server to support are entered as the `ciphers` attribute in the comma-separated list. Also, if you do not add this cipher attribute or keep it blank, all SSL ciphers by JSSE will be supported by your server, thereby enabling the weak ciphers.

1.  Navigate to the ` deployment.toml ` file in the ` <IS_HOME>/repository/conf   ` directory.

2.  Take a backup of the ` deployment.toml ` file and stop the WSO2 IS server.

3.  Add the following configuration to the ` deployment.toml ` file by adding the list of ciphers 
that you want your server to support as follows: ciphers="<cipher-name>,<cipher-name>".

    ```toml
    [transport.https.sslHostConfig.properties]
    ciphers="TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384, TLS_DHE_DSS_WITH_AES_256_GCM_SHA384, TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_DSS_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384, TLS_DHE_DSS_WITH_AES_256_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDH_RSA_WITH_AES_256_CBC_SHA, TLS_DHE_DSS_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256, TLS_DHE_DSS_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDH_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_DSS_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_RC4_128_SHA, TLS_ECDH_ECDSA_WITH_RC4_128_SHA, TLS_ECDH_RSA_WITH_RC4_128_SHA, TLS_EMPTY_RENEGOTIATION_INFO_SCSVF"
    ```

4.  Start the server.

5.  To verify that the configurations are all set correctly, download
    and run the [TestSSLServer.jar]({{base_path}}/assets/attachments/TestSSLServer.jar).

    ``` java
    $ java -jar TestSSLServer.jar localhost 9443
    ```

    !!! note
    
        Note the following when you run
        `           TestSSLServer.jar          ` :
    
        -   The "Supported cipher suites" section in the output does not
            contain any EXPORT ciphers.
    
        -   When you use the supported cipher suites, the BEAST attack status will
            be shown as vulnerable. This is a client-side
            vulnerability caused by the TLSv1 protocol. You can make the
            BEAST status protected by removing TLSv1, which will make
            clients with TLSv1 unusable. Therefore, it is recommended
            to resolve this at the client side.

From **Firefox** 39.0 onwards, the browser does not allow to access websites that support DHE with keys less than 1023 bits (not just
DHE\_EXPORT). 768/1024 bits are considered to be too small and
vulnerable to attacks if the hacker has enough computing resources.

!!! tip
    
    To use AES-256, the Java JCE Unlimited Strength Jurisdiction Policy
    files need to be installed. Download them from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
    
    
    From Java 7, you must set the
    `           jdk.certpath.disabledAlgorithms          ` property in the
    `           <JAVA_HOME>/jre/lib/security/java.security          ` file
    to
    `           jdk.certpath.disabledAlgorithms=MD2, DSA, RSA keySize < 2048          `
    . It rejects all algorithms that have key sizes less than 2048 for MD2,
    DSA and RSA.
    
    !!! note
        This tip is not applicable when you are disabling weak ciphers in WSO2 Identity Server.

---

## Enable SSL protocols and ciphers in ThriftAuthenticationService

Follow the instructions given below to enable SSL protocols and ciphers in `         ThriftAuthenticationService.        `

1.  Add the following configurations in the
    `           <CARBON_SERVER>/repository/conf/identity/thrift-authentication.xml          `
    file as sub-elements of the root `           <Server>          ` element.

    ``` java
    <SSLEnabledProtocols>TLSv1,TLSv1.1,TLSv1.2</SSLEnabledProtocols>
    <Ciphers>TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384, TLS_DHE_DSS_WITH_AES_256_GCM_SHA384, TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_DSS_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384, TLS_DHE_DSS_WITH_AES_256_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDH_RSA_WITH_AES_256_CBC_SHA, TLS_DHE_DSS_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256, TLS_DHE_DSS_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDH_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_DSS_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_RC4_128_SHA, TLS_ECDH_ECDSA_WITH_RC4_128_SHA, TLS_ECDH_RSA_WITH_RC4_128_SHA, TLS_EMPTY_RENEGOTIATION_INFO_SCSVF</Ciphers>
    ```

    !!! tip
    You can also add the following additional cipher suites to
    the `           <Ciphers>          ` property if JCE Unlimited
    Strength Jurisdiction Policy is enabled in Java.

        ``` java
        TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_DHE_RSA_WIT
        ```

    If you wish to remove `           TLSv1          ` or
    `           TLSv1.1          `, you can do so by removing them as
    values from the `           <SSLEnabledProtocols>          `
    property.


2.  Restart the server.

---
  
## Change the server name in HTTP response headers

By default, WSO2 Identity Server pass `WSO2 WSO2 IS server` as the server
value in HTTP headers when sending HTTP responses. This means that
information about the WSO2 Identity Server stack will be exposed through HTTP
responses. It is recommended to change this by configuring the server
name in the `deployment.toml` file.

1.  Open the
    `          <IS_HOME>/repository/conf/deployment.toml          ` file.
2.  Add a new server name by adding the following
    property under the relevant Tomcat connector configuration.

    ```
    [transport.https.properties]
    server="WSO2 WSO2 IS server"
    [transport.http.properties]
    server="WSO2 WSO2 IS server"
    ```

---

## Enable/disable http/https transport

By default, both the http and https connectors are enabled. To disable either the http or https connector, add the corresponding configuration to `<IS-HOME>/repository/conf/deployment.toml` as shown below. 

```toml
[transport]
http.enabled=false
```

```toml 
[transport]
https.enabled=false
```

!!! info "Related topics"
    [Deploy: Security Guidelines for Production Deployment]({{base_path}}/deploy/security/security-guidelines-for-production-deployment)
