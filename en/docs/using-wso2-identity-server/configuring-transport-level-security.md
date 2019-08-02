# Configuring Transport Level Security

The transport level security protocol of the Tomcat server is configured
in the `         <PRODUCT_HOME>/conf/tomcat/catalina-server.xml        `
file. Note that the ss `         Lprotocol        ` attribute is set to
"TLS" by default. See the following topics for detailed configuration options.

### Testing SSL version 3 configuration for the Identity Server

**SSL version 3 is disabled by default from IS 5.1.0 onwards**. It is
necessary to disable SSL version 3 in Carbon servers because of a bug (
[Poodle Attack](https://www.openssl.org/~bodo/ssl-poodle.pdf) ) in the
SSL version 3 protocol that could expose critical data encrypted between
clients and servers. The Poodle Attack makes the system vulnerable by
telling the client that the server does not support the more secure TLS
(Transport Layer Security) protocol, and thereby forces it to connect
via SSL 3.0. The effect of this bug can be mitigated when SSL version 3
protocol for your server is disabled.

!!! info
    The configuration that disables SSL version 3 can be found in the
    `          <PRODUCT_HOME>/repository/conf/tomcat/catalina-server.xml         `
    file under the `          Connector         ` configuration
    corresponding to TLS (usually, this connector has the port set to 9443
    and the `          sslProtocol         ` as TLS).  
    
    The `          sslEnabledProtocols         ` parameter defines a
    comma-seperated list of TLS protocol versions to support for HTTPS
    connections.

    ``` java
    <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
                    port="9443"
                    bindOnInit="false"
                    sslProtocol="TLS"
                    sslEnabledProtocols="TLSv1,TLSv1.1,TLSv1.2"
    ```

You can follow the instructions below to ensure that SSL version 3 is
disabled.

1.  Download `          TestSSLServer.jar         ` from
    [here](http://www.bolet.org/TestSSLServer/TestSSLServer.jar).
2.  Execute the following command to test the transport:

    ``` java
    java -jar TestSSLServer.jar localhost 9443 
    ```

3.  The output of the command after disabling SSL version 3 is shown
    below. **  
    After SSL version 3 is disabled:**

    ``` java
    Supported versions: TLSv1.0
    Deflate compression: no
    Supported cipher suites (ORDER IS NOT SIGNIFICANT):
        TLSv1.0
            RSA_EXPORT_WITH_RC4_40_MD5
            RSA_WITH_RC4_128_MD5
            RSA_WITH_RC4_128_SHA
            RSA_EXPORT_WITH_DES40_CBC_SHA
            RSA_WITH_DES_CBC_SHA
            RSA_WITH_3DES_EDE_CBC_SHA
            DHE_RSA_EXPORT_WITH_DES40_CBC_SHA
            DHE_RSA_WITH_DES_CBC_SHA
            DHE_RSA_WITH_3DES_EDE_CBC_SHA
            RSA_WITH_AES_128_CBC_SHA
            DHE_RSA_WITH_AES_128_CBC_SHA
            RSA_WITH_AES_256_CBC_SHA
            DHE_RSA_WITH_AES_256_CBC_SHA
    ```

### Disable weak ciphers in Carbon server

A cipher is an algorithm for performing encryption or decryption. When
the `         sslprotocol        ` is set to "TLS", only the TLS and
default ciphers are enabled by default. However, note that the strength
of the ciphers will not be considered when they are enabled. Therefore,
to disable the weak ciphers, you must ensure that only the ciphers you
want your server to support are entered for the
`         ciphers        ` attribute in a comma-separated list. Also, if
you do not add this cipher attribute or keep it blank, all SSL ciphers
by JSSE will be supported by your server, thereby enabling the weak
ciphers.

1.  Go to the `          catalina-server.xml         ` file in the
    `          <PRODUCT_HOME>/repository/conf/tomcat         `
    directory.
2.  Take a backup of the `          catalina-server.xml         ` file
    and stop the Carbon server (same as for [disabling SSL version
    3](#testing-ssl-version-3-configuration-for-the-identity-server).
3.  Add the `           cipher          ` attribute to the existing
    configuration in the `           catalina-server.xml          ` file
    by adding the list of ciphers that you want your server to support
    as follows:
    `           ciphers="<cipher-name>,<cipher-name>"          ` .

    ``` java
    ciphers="SSL_RSA_WITH_RC4_128_MD5,SSL_RSA_WITH_RC4_128_SHA,TLS_RSA_WITH_AES_128_CBC_SHA,
                TLS_DHE_RSA_WITH_AES_128_CBC_SHA,TLS_DHE_DSS_WITH_AES_128_CBC_SHA,SSL_RSA_WITH_3DES_EDE_CBC_SHA,
                SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA,SSL_DHE_DSS_WITH_3DES_EDE_CBC_SHA"
    ```

4.  Start the server.
