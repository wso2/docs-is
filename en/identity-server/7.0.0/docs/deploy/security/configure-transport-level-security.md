# Configure Transport Level Security

Given below are the various transport-level security configurations that are required for the WSO2 Identity Server.

## Configuring SSL/TLS protocols in the WSO2 IS

Follow the instructions given below to configure SSL/TLS protocols in the WSO2 Identity Server.

1. You can configure multiple TLS versions or a single TLS version by adding the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. Note that the list of protocols needs to be seperated by `+` sign.

    ```toml
    [transport.https.sslHostConfig.properties]
    protocols="TLSv1+TLSv1.1+TLSv1.2+TLSv1.3"
    ```

    To achieve higher level of security, use only the latest TLS version by removing `TLSv1`, `TLSv1.1`, and `TLSv1.2` from the `protocols` property of the configuration.

2. Restart the server.

## Configure cipher suites

By default, all SSL ciphers supported by JSSE are enabled. To restrict the server to a specific set of secure cipher suites, explicitly configure the `ciphers` property. If left blank, weak ciphers (including EXPORT ciphers) will also be available, which can make the server vulnerable to attacks such as the Logjam attack.

1. Use the [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6){:target="_blank"} to get a recommended list of cipher suites for your Tomcat version and security profile.

2. Add the selected ciphers as a comma-separated list to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [transport.https.sslHostConfig.properties]
    ciphers="<cipher-name>,<cipher-name>"
    ```

3. Restart the server.

## Enable SSL protocols and ciphers in ThriftAuthenticationService

Follow the instructions given below to enable SSL protocols and ciphers in `ThriftAuthenticationService`

1. Add the following configurations by adding the supported cipher suites as a comma-separated list in the `<CARBON_SERVER>/repository/conf/identity/thrift-authentication.xml` file as sub-elements of the root `<Server>` element.

    !!! note
        For a list of cipher suites that are secure and functional in Tomcat for the TLSv1.2 and TLSv1.3  protocols, see the list of ciphers provided in the [secure configuration generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6){:target="_blank"}, which the Mozilla Foundation provides.

    ``` java
    <SSLEnabledProtocols>TLSv1,TLSv1.1,TLSv1.2</SSLEnabledProtocols>
    <Ciphers>Ciphername1, Ciphername2</Ciphers>
    ```

    !!! tip
        You can add the following cipher suites to the `<Ciphers>` property if the JCE Unlimited Strength Jurisdiction Policy is enabled in Java.

        ``` java
        TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_DHE_RSA_WIT
        ```

    If you wish to remove `TLSv1` or `TLSv1.1`, you can do so by removing them as values from the `<SSLEnabledProtocols>` property.


2. Restart the server.
  
## Change the server name in HTTP response headers

By default, the WSO2 Identity Server passes `WSO2 WSO2 IS server` as the server value in HTTP headers when sending HTTP responses. This means that information about the WSO2 Identity Server stack will be exposed through HTTP responses. It is recommended to change this by configuring the server name in the `deployment.toml` file.

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add a new server name by adding the following property under the relevant Tomcat connector configuration.

    ```
    [transport.https.properties]
    server="WSO2 WSO2 IS server"
    [transport.http.properties]
    server="WSO2 WSO2 IS server"
    ```

## Enable/disable http/https transport

By default, both the `http` and `https` connectors are enabled. To disable either the `http` or `https` connector, add the corresponding configuration to `<IS_HOME>/repository/conf/deployment.toml` as shown below. 

```toml
[transport]
http.enabled=false
```

```toml
[transport]
https.enabled=false
```

!!! info "Related topics"
    [Deploy: Security Guidelines for Production Deployment]({{base_path}}/deploy/security/security-guidelines/)
