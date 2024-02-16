# Integrate OIDC with your Java EE webapp

Follow the steps given below to authenticate users to your Java EE web application deployed on Tomcat using the [Tomcat OIDC Agent](https://github.com/asgardeo/asgardeo-tomcat-oidc-agent) which enables OIDC-based login and logout.

<div class="border-text">
  <img src="{{base_path}}/assets/img/logo/java-logo.svg" alt="React" width=50><br>
  <a href="{{base_path}}/get-started/try-samples/qsg-oidc-webapp-java-ee">Try out the sample app</a>
</div>

## Prerequisites
- [Download](https://tomcat.apache.org/tomcat-9.0-doc/) Apache Tomcat 9.x or 8.x in your local environment.
- [Download](https://maven.apache.org/download.cgi), and [install](https://maven.apache.org/install.html) Apache Maven (3.6.x or higher) as the package manager if you already haven't.
- You need to have an application registered in the {{ product_name }}. If you don't, see the instructions on [registering an OIDC application]({{base_path}}/guides/applications/register-oidc-web-app/).

## Install the SDK

To get started with the OIDC agent, you need to add relevant dependencies. By updating the `pom.xml` file with the following dependency, you can add the OIDC agent to your project.

```xml
<dependency>
    <groupId>io.asgardeo.tomcat.oidc.agent</groupId>
    <artifactId>io.asgardeo.tomcat.oidc.agent</artifactId>
    <version>0.1.27</version>
</dependency>
```

The Agent is hosted at **WSO2 Internal Repository**. To resolve the dependency mentioned above, point to the repository as follows.

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

## Initialize the SDK

To initialize the OIDC agent, you need a property file with the configurations such as the {{ product_name }} endpoints. The OIDC agent reads the configurations from this file.

Create a file named `oidc-sample-app.properties` in the _<YOUR_APP>/src/main/resources_ directory, using the content
below.

!!! note
    The `skipURIs` property defines the web pages in your application that should not be secured, and do not require authentication.

_Few of the configurations such as `callBackURL` and `skipURIs` depends on the context path of your application._

```  
consumerKey=<consumerKey>
consumerSecret=<consumerSecret>
callBackURL=<YOUR_APP_PATH>/oauth2client
scope=openid
logoutURL=logout
authorizeEndpoint=https://localhst:9443/localhost:9443/oauth2/authorize
logoutEndpoint=https://localhst:9443/oidc/logout
tokenEndpoint=https://localhst:9443/oauth2/token
issuer=https://localhst:9443//oauth2/token
jwksEndpoint=https://localhst:9443/oauth2/jwks
skipURIs=<YOUR_APP_PATH>/index.html
```

A comprehensive list of the properties used above can be found in
the [Configuration Catalog](https://github.com/asgardeo/asgardeo-tomcat-oidc-agent/blob/master/io.asgardeo.tomcat.oidc.sample/src/main/resources/configuration-catalog.md)
.

Finally, copy and paste the following configuration to the _<YOUR_APP>/src/main/webapp/WEB-INF/web.xml_ file.

```xml
<filter>
    <filter-name>OIDCAgentFilter</filter-name>
    <filter-class>io.asgardeo.tomcat.oidc.agent.OIDCAgentFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>OIDCAgentFilter</filter-name>
    <url-pattern>/logout</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>OIDCAgentFilter</filter-name>
    <url-pattern>/oauth2client</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>OIDCAgentFilter</filter-name>
    <url-pattern>*.jsp</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>OIDCAgentFilter</filter-name>
    <url-pattern>*.html</url-pattern>
</filter-mapping>
<listener>
    <listener-class>io.asgardeo.tomcat.oidc.agent.SSOAgentContextEventListener</listener-class>
</listener>
<context-param>
    <param-name>app-property-file</param-name>
    <param-value>oidc-sample-app.properties</param-value>
</context-param>
<listener>
    <listener-class>io.asgardeo.tomcat.oidc.agent.JKSLoader</listener-class>
</listener>
```

## Add login

In the `index.html` file, add a login button to redirect the user to secure pages upon successful login.

Once the user clicks on the button, the request will be intercepted by the OIDC agent and will initiate the OIDC Login
flow if it does not find an authenticated application session.

```html
<form action="<HOME_PAGE>" method="post">
    <input type="submit" value="Log In">
</form>
```

## Add logout

Add the following snippet to enable logout.

When the user initiates the logout, the local authenticated application session is cleared and the session in the {{ product_name }} is terminated.

```html
<form action="logout" method="get">
    <input type="submit" value="Log Out">
</form>
```

See the [Tomcat OIDC Agent documentation](https://github.com/asgardeo/asgardeo-tomcat-oidc-agent#how-it-works) for more information on how it works.
