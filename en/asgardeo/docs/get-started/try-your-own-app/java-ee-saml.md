# Integrate SAML with your Java EE webapp

Follow the steps given below to authenticate users to your Java EE web application deployed on Tomcat using the [Asgardeo Tomcat SAML Agent](https://github.com/asgardeo/asgardeo-tomcat-saml-agent) which enables SAML-based login and logout.

## Prerequisites

- [Download](https://tomcat.apache.org/tomcat-9.0-doc/) Apache Tomcat 9.x or 8.x in your local environment.
- [Download](https://maven.apache.org/download.cgi) and [install](https://maven.apache.org/install.html) Apache Maven (3.6.x or higher) as the package manager if you already haven't.
- You need to have an application already registered in Asgardeo. If you don't, see the instructions on [registering a SAML application]({{base_path}}/guides/applications/register-saml-web-app/).

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

See the [reference documentation](https://github.com/asgardeo/asgardeo-tomcat-saml-agent/blob/master/README/) to learn more.

## Initialize the SDK

Follow the steps given below to initialize the SAML agent.

### Create the configuration file

To initialize the SAML agent, you need a property file with the configurations such as the Asgardeo endpoints. The Asgardeo SAML agent reads the configurations from this file.

Create a file named **sample-app.properties** inside the **<YOUR_APP>/src/main/resources** directory, using the content below.


```   
SAML2.AssertionConsumerURL=<acs_url>
SAML2.SPEntityId=<entity_id>

#Asgardeo related configs
SAML2.IdPEntityId=accounts.asgardeo.io/t/{organization_nam}
SAML2.IdPURL=https://api.asgardeo.io/t/{organization_name}samlsso 
IdPPublicCert=<public_cert_of_asgardeo_organization>
IdPPublicCertAlias=wso2carbon

#Config properties
EnableSAML2SSOLogin=true
SAML2.EnableSLO=true
SAML2.EnableResponseSigning=false
SAML2.EnableAssertionSigning=false
SAML2.EnableAssertionEncryption=false
SAML2.EnableRequestSigning=false
SAML2.IsPassiveAuthn=false      

SAML2.SLOURL=logout
SkipURIs=<YOUR_APP_PATH>/index.html
IndexPage=index.html
ErrorPage=/error.jsp
SAML2SSOURL=samlsso

# App keystore related configs
KeyStorePassword=<app_keystore_password>
PrivateKeyAlias=<app_private_key_alias>
PrivateKeyPassword=<app_private_key_password>
```

For advanced use cases such as SAML response signing, the Asgardeo SAML Agent uses a keystore with your private key. If your application doesn't have a keystore already, generate a keystore file and copy it to the **<APP_HOME>/src/main/resources** directory. Make sure to update KeyStorePassword, PrivateKeyAlias, and PrivateKeyPassword with relevant values.
  
Find the configuration information below:

<table>
   <thead>
      <tr>
         <th>Configuration</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>SAML2.AssertionConsumerURL</td>
         <td>Specifies the URL to redirect to after login and logout. See [See ACS URLs](../../references/app-settings/saml-settings-for-app/#default-assertion-consumer-service-url-default-acs-url)</td>
      </tr>
      <tr>
         <td>SAML2.SPEntityId</td>
         <td>This is the unique name of the application used when registering your application with Asgardeo. See [how to register a SAML app manually](../../guides/applications/register-saml-web-app/#register-app-using-manual-configurations) via the Asgardeo Console.</td>
      </tr>
      <tr>
         <td>SAML2.IdPEntityId</td>
         <td>This is the issuer of Asgardeo. This is always <code>accounts.asgardeo.io/t/{organization_name}</code>.</td>
      </tr>
     <tr>
          <td>SAML2.IdPURL</td>
          <td>This specifies the endpoint of Asgardeo to which login and logout requests should be sent. Note that the organization name should be replaced in the URL with the correct value. <code>https://api.asgardeo.io/t/{organization_name}/samlsso</code>. </td>
     </tr>
     <tr>
           <td>IdPPublicCert</td>
           <td>This specifies the public certificate of Asgardeo. You can obtain the public certificate from the Asgardeo Console. See [how to get SAML configurations from the Asgardeo Console.](../../guides/authentication/saml/discover-saml-configs/#discover-saml-configurations-of-asgardeo)</td>
       </tr>
       <tr>
           <td>EnableSAML2SSOLogin</td>
           <td>Specifies whether sign-on is enabled for this application</td>
       </tr>
       <tr>
         <td>SAML2.EnableSLO</td>
         <td>Specifies whether logout is enabled for this application</td>
       </tr>
       <tr>
         <td>SAML2.EnableResponseSigning</td>
         <td>If this configuration is set to <code>true</code>, the application validates the signature in the SAML response. If this configuration is set to <code>true</code>, then [enable response signing from Asgardeo](../../references/app-settings/saml-settings-for-app/#response-signing).
         If this configuration is set to <code>false</code>, the application does not mandate response signing from Asgardeo.</td>
     </tr>
     <tr>
       <td>SAML2.EnableAssertionSigning</td>
       <td>If this configuration is set to <code>true</code>, the application validates the signature in the SAML assertion. If this configuration is set to <code>true</code>, then [enable response signing from Asgardeo](../../references/app-settings/saml-settings-for-app/#response-signing).
       If this configuration is set to <code>false</code>, the application does not mandate response signing from Asgardeo.</td>
     </tr>
     <tr>
       <td>SAML2.EnableAssertionEncryption</td>
       <td>If this configuration is set to <code>true</code>,the application expects an encrypted SAML assertion. If this configuration is set to <code>true</code>, then [enable encryption for SAML assertion](../../references/app-settings/saml-settings-for-app/) from Asgardeo.</td>
     </tr>
     <tr>
       <td>SAML2.EnableRequestSigning</td>
       <td>If this configuration is set to <code>true</code>, Asgardeo validates the SAML authentication request and logout request. If this configuration is set to <code>true</code>, then [enable request signing](../../references/app-settings/saml-settings-for-app/) from Asgardeo.</td>
     </tr>
     <tr>
       <td>SAML2.IsPassiveAuthn</td>
       <td>Specifies whether to enable passive authentication</td>
     </tr>
     <tr>
       <td>skipURIs</td>
       <td>Defines the web pages in your application that should not be secured and does not require authentication</td>
     </tr>
     <tr>
        <td>KeyStorePassword</td>
        <td>Keystore password of your application</td>
      </tr>
      <tr>
        <td>PrivateKeyAlias</td>
        <td>Private key alias of your application</td>
      </tr>
      <tr>
        <td>PrivateKeyPassword</td>
        <td>Password of the private key of your application</td>
      </tr>

   </tbody>
</table>

See the complete list of [configuration properties](https://github.com/asgardeo/asgardeo-tomcat-saml-agent/blob/master/io.asgardeo.tomcat.saml.agent.sample/src/main/resources/configuration-catalog/).

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

In the previous steps, you implemented login for your app. Now you need a way to log users out of your application and remove the user sessions from Asgardeo.

When the user initiates the logout, the local authenticated application session is cleared and the session in Asgardeo is terminated.

Add the following snippet to enable logout.

```html
<form action="logout?SAML2.HTTPBinding=HTTP-POST" method="get">
    <input type="submit" value="Log Out">
</form>
```

See the [Asgardeo Tomcat SAML Agent documentation](https://github.com/asgardeo/asgardeo-tomcat-saml-agent#how-it-works) for more information.
