# Setting Up My Account in a Development Environment

!!! note 
    The **User Portal** application has been renamed as **My Account** from this release onwards.

In [WSO2 Identity Server](https://wso2.com/identity-and-access-management/)(WSO2 IS), **My Account** can be accessed via the URL `http(s)://<SERVER_HOST>/t/<TENANT_DOMAIN>/myaccount`. 

Follow the steps given below to set up the repo in a development environment.

!!! note "Before you begin"

    1. Install [node](https://nodejs.org/en/download/) if you have not already installed it. Npm is already bundled with node.
    2. Install [maven](https://maven.apache.org/download.cgi). This is needed to run `mvn` commands.
    3. A running instance of WSO2 IS. To build from source, follow the instructions given [here](https://github.com/wso2/product-is).


## Step 1: Configure WSO2 Identity Server

!!! note
    The default dev origin, hostname, and port that is set for **My Account** is `https://localhost:9000`.
    Change this in the following configurations if you have changed this port or any other configuration.


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

2.  Allowlist your hostname and port as a trusted FIDO2 origin.

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

3.  Restart WSO2 IS.

4.  Configure the callback URLs for **My Account**.

    1.  Log in to the WSO2 IS management console.
    2.  Click **Service Providers > List**.
    3.  Click **Edit** to edit the **My Account** service provider.
    4.  Expand **Inbound Authentication Configuration**, and then expand **OAuth/OpenID Connect Configuration**. Click **Edit**.
    5.  Change the **Callback URL** field to reflect the port as 9000 or you can add a regexp as follows.
        ```
        regexp=(https://localhost:9443/user-portal/login|https://localhost:9000/user-portal/login)
        ```

### Step 2: Build the Identity Apps repository

Fork the original repository to start working on it. You can also directly clone the original repo but it is
recommended to create your own fork.

```java
git clone https://github.com/brionmario/identity-apps
cd identity-apps
mvn clean install or npm run build
```

### Step 3: Run My Account in dev mode

After the build is complete, navigate to the **My Account** directory and run the portal using the webpack dev server.
```java
cd apps/user-portal
npm start
```

The portal will be served from `https://localhost:9000/myaccount`