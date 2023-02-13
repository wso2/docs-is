# Configure Transport Level Security

Given below are the various transport-level security configurations that are required for WSO2 Identity Server.

---

## Enabling SSL protocols in the WSO2 IS

Follow the instructions given below to enable SSL protocols in the WSO2 Identity Server.

1. Add the following configurations in the `<IS_HOME>/repository/conf/deployment.toml` file.

     ```toml
     [transport.https.sslHostConfig.properties]
     protocols="TLSv1, TLSv1.1, TLSv1.2, TLSv1.3"
     ```

    If you wish to remove `TLSv1`, `TLSv1.1`, or `TLSv1.2`, you can do so by removing them as values from the `protocols` property.

2. Restart the server.

---

## Disable weak ciphers

A cipher is an algorithm for performing encryption or decryption. When the `sslprotocol` is set to `TLS`, only the TLS and default ciphers are enabled by default. However, note that the strength of the ciphers will not be considered when they are enabled.

This is a security risk as weak ciphers, also known as EXPORT ciphers, can make your system vulnerable to attacks such as the Logjam attack on Diffie-Hellman key exchange.

Therefore, to disable the weak ciphers, you must ensure that only the ciphers you want your server to support are entered as the `ciphers` attribute in the comma-separated list. Also, if you do not add this cipher attribute or keep it blank, all SSL ciphers by JSSE will be supported by your server, thereby enabling the weak ciphers.

1. Navigate to the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

2. Take a backup of the `deployment.toml` file and stop the WSO2 IS server.

3. Add the following configuration to the `deployment.toml` file by adding the list of ciphers that you want your server to support as follows:

    !!! note
        For a list of cipher suites that are secure and functional in Tomcat for the TLSv1.2 and TLSv1.3 protocols, see the list of ciphers provided in the [secure configuration generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6), which the Mozilla Foundation provides.

    ```toml
    [transport.https.sslHostConfig.properties]
    ciphers="<cipher-name>,<cipher-name>"
    ```

4. Start the server.

5. To verify that the configurations are all set correctly, download and run the [TestSSLServer.jar]({{base_path}}/assets/attachments/TestSSLServer.jar).

    ``` java
    $ java -jar TestSSLServer.jar localhost 9443
    ```

    !!! note
        Note the following when you run `TestSSLServer.jar` :
    
        -   The "Supported cipher suites" section in the output does not
            contain any EXPORT ciphers.
    
        -   When you use the supported cipher suites, the BEAST attack status will
            be shown as vulnerable. This is a client-side
            vulnerability caused by the TLSv1 protocol. You can protect the BEAST status by removing TLSv1, which will make clients with TLSv1 unusable. Therefore, it is recommended to resolve this on the client side.

From **Firefox 39.0** onwards, the browser does not allow access to websites that support DHE with keys less than `1023` bits (not just `DHE\_EXPORT`). `768/1024` bits are considered too small and vulnerable to attacks if the hacker has enough computing resources.

!!! tip
    To use AES-256, the Java JCE Unlimited Strength Jurisdiction Policy files need to be installed. Download them from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
    
    From Java 7, you must set the `jdk.certpath.disabledAlgorithms` property in the `<JAVA_HOME>/jre/lib/security/java.security` file to `jdk.certpath.disabledAlgorithms=MD2, DSA, RSA keySize < 2048`. It rejects all algorithms that have key sizes less than `2048` for `MD2`, `DSA` and `RSA`.

    !!! note
        This tip is not applicable when disabling weak ciphers in WSO2 Identity Server.

---

## Enable SSL protocols and ciphers in ThriftAuthenticationService

Follow the instructions given below to enable SSL protocols and ciphers in `ThriftAuthenticationService`

1. Add the following configurations by adding the supported cipher suites as a comma-separated list in the `<CARBON_SERVER>/repository/conf/identity/thrift-authentication.xml` file as sub-elements of the root `<Server>` element.

    !!! note
        For a list of cipher suites that are secure and functional in Tomcat for the TLSv1.2 and TLSv1.3 protocols, see the list of ciphers provided in the [secure configuration generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6), which the Mozilla Foundation provides.

    ``` java
    <SSLEnabledProtocols>TLSv1,TLSv1.1,TLSv1.2</SSLEnabledProtocols>
    <Ciphers>Ciphername1, Ciphername2</Ciphers>
    ```

    !!! tip
        You can add the following cipher suites to the `<Ciphers>` property if JCE Unlimited Strength Jurisdiction Policy is enabled in Java.

        ``` java
        TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_DHE_RSA_WIT
        ```

    If you wish to remove `TLSv1` or `TLSv1.1`, you can do so by removing them as values from the `<SSLEnabledProtocols>` property.


2. Restart the server.

---
  
## Change the server name in HTTP response headers

By default, WSO2 Identity Server pass `WSO2 WSO2 IS server` as the server value in HTTP headers when sending HTTP responses. This means that information about the WSO2 Identity Server stack will be exposed through HTTP responses. It is recommended to change this by configuring the server name in the `deployment.toml` file.

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add a new server name by adding the following property under the relevant Tomcat connector configuration.

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