# Setting-Up User Portal in a Development Environment

In [WSO2 Identity Server](https://wso2.com/identity-and-access-management/) the user portal is available under
 the URL `http(s)://<SERVER_HOST>/t/<TENANT_DOMAIN>/user-portal`. Follow the steps below to set up the repo in a
 development environment.

!!! note "Before you begin"

    1. Install [node](https://nodejs.org/en/download/) if you have not already(npm is already bundled with node).
    2. Install [maven](https://maven.apache.org/download.cgi) (his is needed to run `mvn` commands).
    3. A running instance of WSO2 Identity Server (to build from source, follow the instructions given [here]
    (https://github.com/wso2/product-is)).


### Step 1: Configuring Identity Server

!!! tip
    Note that the default dev origin, hostname, and port that is set for the user portal is `https://localhost:9000`.
    Change the following configurations accordingly if you have changed this port or any other configuration.


1.  Enable cross-origin requests for WSO2 Identity Server.

    Cross-origin requests are blocked by default in WSO2 IS as a security measure. Add the following CORS filter to
    the `<IS_HOME>/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2` file to enable it.
    ```
        <filter>
            <filter-name>CORS</filter-name>
            <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
            <init-param>
                <param-name>cors.allowOrigin</param-name>
                <param-value>https://localhost:9000</param-value>
            </init-param>
            <init-param>
                <param-name>cors.supportedMethods</param-name>
                <param-value>GET, HEAD, POST, DELETE, OPTIONS, PATCH, PUT</param-value>
            </init-param>
            <init-param>
                <param-name>cors.exposedHeaders</param-name>
                <param-value>Location</param-value>
            </init-param>
        </filter>
        <filter-mapping>
            <filter-name>CORS</filter-name>
            <url-pattern>/*</url-pattern>
            <dispatcher>REQUEST</dispatcher>
            <dispatcher>FORWARD</dispatcher>
        </filter-mapping>
    ```
2.  Whitelist your hostname and port as a trusted FIDO2 origin.



    Add the dev url to the <Origin> tag of the FIDO configurations in the
    `<IS_HOME>/repository/resources/conf/templates/repository/conf/identity/identity.xml.j2` file.
    ```
        <FIDO>
            <WebAuthn>
                <Enable>{{fido.webauthn.enable}}</Enable>
            </WebAuthn>
            <FIDO2TrustedOrigins>
                    {% for origin in fido.trusted.origins %}
                    <Origin>{{origin}}</Origin>
                    {% endfor %}
                    <Origin>https://localhost:9000</Origin>
            </FIDO2TrustedOrigins>
        </FIDO>
    ```

3.  Restart the WSO2 Identity Server.
4.  Configure the callback URLs for the User Portal.

    1.  Log in to the WSO2 IS management console.
    2.  Click Service Providers > List.
    3.  Click Edit to edit the User Portal service provider.
    4.  Expand Inbound Authentication Configuration, and then expand OAuth/OpenID Connect Configuration. Click Edit.
    5.  Change the Callback URL field to reflect the port as 9000 or you can add a regexp as follows.
        ```
            regexp=(https://localhost:9443/user-portal/login|https://localhost:9000/user-portal/login)
        ```

### Step 2: Building the Identity Apps repository

Fork the original repository to start working on it. You can also directly clone the original repo but it is
recommended to create your own fork.
```java
    git clone https://github.com/brionmario/identity-apps
    cd identity-apps
    mvn clean install or npm run build
```

### Step 3: Running the user portal in dev mode

After the build is finished, navigate to the user portal directory and run the portal using the webpack dev server.
```java
    cd apps/user-portal
    npm start
```

The portal will be served from `https://localhost:9000/user-portal`