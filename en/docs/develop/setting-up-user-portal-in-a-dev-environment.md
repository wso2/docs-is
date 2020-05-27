# Setting-Up User Portal in a Development Environment

In [WSO2 Identity Server 5.10.0](https://wso2.com/identity-and-access-management/) the user portal is available under
 the URL `http(s)://<SERVER_HOST>/t/<TENANT_DOMAIN>/user-portal`. If you are planning on setting up the repo in a
 development environment follow the steps given below.

!!! note "Before you begin"

    1. Install [node](https://nodejs.org/en/download/) if you haven’t already(npm is already bundled with node).
    2. Install [maven](https://maven.apache.org/download.cgi) (Needed to run mvn commands).
    3. A running Identity Server v 5.10. (If you want to build from source follow the instructions listed [here]
    (https://github.com/wso2/product-is)).


### Step 1: Configuring Identity Server

!!! tip
    Default dev origin, hostname and port set for the User Portal is https://localhost:9000. So the following
    configurations will have to change accordingly if you change the port or any other configurations.


1.  Allowing Cross Origin requests to the Identity Server.

    Cross origin requests will be blocked by default as a security measure. So you have to put the following CORS
    filter to the config file `<IS_HOME>/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2` in
    WSO2 Identity Server distribution pack.
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
2.  Add your hostname and port as a trusted FIDO2 origin.

    Whitelist the dev URL in the FIDO configurations found in the file
    `<IS_HOME>/repository/resources/conf/templates/repository/conf/identity/identity.xml.j2`.
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

3.  Restart the Identity Server.
4.  Configure the callback URLs for the User Portal.

    Log in to the management console `https://<SERVER_HOST>/carbon`
    Go to service provider listing and click on edit in **User Portal** list item.

    In the edit view, expand the **Inbound Authentication Configuration** section, and further expand the **OAuth/OpenID
     Connect Configuration**. Click on edit under User Portal list item.

    You can simple change the port to 9000 or you can add a regexp as follows.
    ```
        regexp=(https://localhost:9443/user-portal/login|https://localhost:9000/user-portal/login)
    ```

### Step 2: Building the Identity Apps repository

You can fork the original repo or directly clone the original repo and start working on it, but it is recommended to
create your own fork.
```java
    git clone https://github.com/brionmario/identity-apps
    cd identity-apps
    mvn clean install or npm run build
```

### Step 3: Running the User Portal in dev mode

After the build is finished, navigate to the user portal directory and run the portal using the webpack dev server.
```java
    cd apps/user-portal
    npm start
```

The portal will be served from `https://localhost:9000/user-portal`