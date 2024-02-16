# Integrate SAML with your Java EE webapp

Follow the steps given below to authenticate users to your Java EE web application deployed on Tomcat using the [Tomcat SAML Agent](https://github.com/asgardeo/asgardeo-tomcat-saml-agent) which enables SAML-based login and logout.

<div class="border-text">
  <img src="{{base_path}}/assets/img/logo/java-logo.svg" alt="React" width=50><br>
  <a href="{{base_path}}/get-started/try-samples/qsg-saml-webapp-java-ee">Try out the sample app</a>
</div>

## Prerequisites

- [Download](https://tomcat.apache.org/tomcat-9.0-doc/) Apache Tomcat 9.x or 8.x in your local environment.
- [Download](https://maven.apache.org/download.cgi) and [install](https://maven.apache.org/install.html) Apache Maven (3.6.x or higher) as the package manager if you already haven't.
- You need to have an application already registered in the {{ product_name }}. If you don't, see the instructions on [registering a SAML application]({{base_path}}/guides/applications/register-saml-web-app/).

## Install the SDK

Follow the steps given below to install the SAML agent.

1. Add the relevant dependencies.  

    To get started, you need to enable the SAML agent in your application's project by adding the relevant dependencies to the `pom.xml` file.

    ```xml
    <dependency>
        <groupId>io.asgardeo.tomcat.saml.agent</groupId>
        <artifactId>io.asgardeo.tomcat.saml.agent</artifactId>
        <version>0.1.31</version>
    </dependency>
    ```

2. Add the nexus repository.

    The agent is hosted at **WSO2 Internal Repository**. Point to this nexus repository to resolve the dependency mentioned above.

    ```xml 
    <repositories>
        <repository>
          <id>wso2.releases</id>
          <name>WSO2 internal Repository</name>
          <url>http://maven.wso2.org/nexus/content/repositories/releases/</url>
          <releases>
              <enabled>true</enabled>
              <updatePolicy>daily</updatePolicy>
              <checksumPolicy>ignore</checksumPolicy>
          </releases>
        </repository>
    </repositories>
    ```

See the [reference documentation](https://github.com/asgardeo/asgardeo-tomcat-saml-agent/blob/master/README.md) to learn more.

## Initialize the SDK

Follow the steps given below to initialize the SAML agent.

### Create the configuration file

To initialize the SAML agent, you need a property file with the configurations such as the the {{ product_name }} endpoints. The {{ product_name }} SAML agent reads the configurations from this file.

Create a file named **sample-app.properties** inside the **<YOUR_APP>/src/main/resources** directory, using the content below.


    ```saml
    SAML2.AssertionConsumerURL={acs_url}
    SAML2.SPEntityId={entity_id}
    SAML2.IdPEntityId=localhost
    SAML2.IdPURL=https://localhost:9443/samlsso
    SAML2SSOURL=samlsso
    EnableSAML2SSOLogin=true
    SAML2.EnableSLO=true
    SAML2.SLOURL=logout
    SkipURIs=/sample-app/index.html
    IndexPage=index.html
    ErrorPage=/error.jsp
    SAML2.EnableResponseSigning=false
    SAML2.EnableAssertionSigning=false
    SAML2.EnableAssertionEncryption=false
    SAML2.EnableRequestSigning=true
    SAML2.IsPassiveAuthn=false
    IdPPublicCert={public_cert_of_identity-server}
    KeyStorePassword=wso2carbon
    PrivateKeyAlias=wso2carbon
    IdPPublicCertAlias=wso2carbon
    PrivateKeyPassword=wso2carbon
    ```
<table>
  <thead>
    <tr>
      <th>Configuration</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>SAML2.AssertionConsumerURL</code></td>
      <td>
      The URL to which the user is redirected after login and logout.
      </td>
    </tr>
    <tr>
      <td><code>SAML2.SPEntityId</code></td>
      <td>
        The SAML issuer that is used when registering your application with the {{ product_name }}.
      </td>
    </tr>
    <tr>
      <td><code>SAML2.IdPEntityId</code></td>
      <td>
        The issuer name of the {{ product_name }}.
        <p><code>localhost</code></p>
      </td>
    </tr>
    <tr>
      <td><code>SAML2.IdPURL</code></td>
      <td>
        The endpoint of the {{ product_name }} to which login and logout requests should be sent:
        <p><code>https://localhost:9443/samlsso</code></p>
      </td>
    </tr>
    <tr>
      <td><code>IdPPublicCert</code></td>
      <td>This specifies the public certificate of the {{ product_name }}. You can obtain the public certificate from the Console. See [how to get SAML configurations from the {{ product_name }} Console]({{base_path}}/guides/authentication/saml/discover-saml-configs/#discover-saml-configurations-of-asgardeo).<td>
    </tr>
    <tr>
      <td><code>skipURIs</code></td>
      <td>Defines the web pages in your application that should not be secured and does not require authentication.</td>
    </tr>
    <tr>
      <td>
        <code>EnableSAML2SSOLogin</code>
      </td>
      <td>
        Specifies whether single sign-on is enabled for this application.
      </td>
    </tr>
    <tr>
      <td>
        <code> SAML2.EnableSLO</code>
      </td>
      <td>
        Specifies whether logout is enabled for this application.
      </td>
    </tr>
    <tr>
      <td>
        <code>SAML2.EnableResponseSigning</code>
      </td>
      <td>
        If this configuration is set to <code>true</code>, the application validates the signature in SAML response. You also need to [enable response signing from {{ product_name }}]({{base_path}}/references/app-settings/saml-settings-for-app/#response-signing).
        If this configuration is set to <code>false</code>, the application does not mandate response signing from {{ product_name }}.
      </td>
    </tr>
    <tr>
      <td>
      <code>SAML2.EnableAssertionSigning</code>
      </td>
      <td>
        If this configuration is set to <code>true</code>, the application validates the signature in the SAML assertion. You also need to [enable response signing from {{ product_name }}]({{base_path}}/references/app-settings/saml-settings-for-app/#response-signing).
        If this configuration is set to <code>false</code>, the application does not mandate response signing from {{ product_name }}.
      </td>
    </tr>
    <tr>
      <td>
        <code>SAML2.EnableAssertionEncryption</code>
      </td>
      <td>
        If this configuration is set to <code>true</code>, the application expects an encrypted SAML assertion. You also need to [enable encryption for SAML assertions]({{base_path}}/references/app-settings/saml-settings-for-app/) from {{ product_name }}.
      </td>
    </tr>
    <tr>
      <td>
        <code>SAML2.EnableRequestSigning</code>
      </td>
      <td>
        If this configuration is set to <code>true</code>, {{ product_name }} validates the SAML authentication requeand logout request. You also need to [enable request signing]({{base_path}}/references/app-settings/saml-settings-for-app/) from {{ product_name }}.
      </td>
    </tr>
    <tr>
      <td>
        <code>SAML2.IsPassiveAuthn</code>
      </td>
      <td>
        Specifies whether to enable passive authentication.
      </td>
    </tr>
    <tr>
      <td>
        <code>KeyStorePassword</code>
      </td>
      <td>
        Keystore password of your application.
      </td>
    </tr>
    <tr>
      <td>
        <code>PrivateKeyAlias</code>
      </td>
      <td>
        Private key alias of your application.
      </td>
    </tr>
    <tr>
      <td>
        <code>PrivateKeyPassword</code>
      </td>
      <td>
        Password of the private key of your application.
      </td>
    </tr>
  </tbody>
</table>

See the complete list of [configuration properties](https://github.com/asgardeo/asgardeo-tomcat-saml-agent/blob/master/io.asgardeo.tomcat.saml.agent.sample/src/main/resources/configuration-catalog.md).

### Configure the keystore

Copy the following configurations to the **<APP_HOME>/WEB-INF/web.xml** file and change the **certificate-file** parameter to the name of **your keystore file**.

```xml 
<filter>
    <filter-name>SAML2SSOAgentFilter</filter-name>
    <filter-class>io.asgardeo.tomcat.saml.agent.SAML2SSOAgentFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>SAML2SSOAgentFilter</filter-name>
    <url-pattern>*.jsp</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>SAML2SSOAgentFilter</filter-name>
    <url-pattern>*.html</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>SAML2SSOAgentFilter</filter-name>
    <url-pattern>/samlsso</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>SAML2SSOAgentFilter</filter-name>
    <url-pattern>/logout</url-pattern>
</filter-mapping>

<listener>
    <listener-class>io.asgardeo.tomcat.saml.agent.SSOAgentContextEventListener</listener-class>
</listener>
<context-param>
    <param-name>property-file</param-name>
    <param-value>sample-app.properties</param-value>
</context-param>
<context-param>
    <param-name>certificate-file</param-name>
    <param-value>KEYSTORE_FILE_NAME</param-value>
</context-param>
```

## Add login

In the `index.html` file, add a login button to be used to redirect users to secure pages.

When the user clicks the button, the SAML agent intercepts the request and initiates the SAML login flow if an authenticated session does not already exist.

```html
<form action="<HOME_PAGE>" method="post">
    <input type="submit" value="log in">
</form>
```

## Add logout

In the previous steps, you implemented login for your app. Now you need a way to log users out of your application and remove the user sessions from {{ product_name }}.

When the user initiates the logout, the local authenticated application session is cleared and the session in {{ product_name }} is terminated.

Add the following snippet to enable logout.

```html
<form action="logout?SAML2.HTTPBinding=HTTP-POST" method="get">
    <input type="submit" value="Log Out">
</form>
```

See the [Tomcat SAML Agent documentation](https://github.com/asgardeo/asgardeo-tomcat-saml-agent#how-it-works) for more information.
