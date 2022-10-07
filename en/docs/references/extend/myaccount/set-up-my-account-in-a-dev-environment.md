# Set Up My Account in a Development Environment

In WSO2 Identity Server (WSO2 IS), **My Account** application can be accessed 
via the URL `http(s)://<SERVER_HOST>:<PORT>/t/<TENANT_DOMAIN>/myaccount`. 

Follow the steps given below to set up **My Account** application in a development environment.

!!! note "Before you begin"

    1. Install [node](https://nodejs.org/en/download/) if you have not already installed it. Npm is already bundled with node.
    2. Install [maven](https://maven.apache.org/download.cgi). This is needed to run `mvn` commands.
    3. A running instance of WSO2 IS. To build from source, follow the instructions given [here](https://github.com/wso2/product-is#building-the-distribution-from-source).

---

## Step 1: Configure WSO2 Identity Server

!!! note
    The default dev origin, hostname, and port that is set for **My Account** is `https://localhost:9000`.
    Change this in the following configurations if you have changed this port or any other configuration.


1.  Enable cross-origin requests for WSO2 Identity Server.

    Cross-origin requests are blocked by default in WSO2 IS as a security measure. Add the following CORS configuration to
    the `<IS_HOME>/repository/resources/conf/deployment.toml` file to enable it.

    ``` toml
    [cors]
    allow_generic_http_requests = true
    allow_any_origin = false
    allowed_origins = [
        "https://localhost:9000"
    ]
    allow_subdomains = false
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS",
        "DELETE",
        "PATCH",
        "PUT"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = ["Location"]
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

2.  Allow list your hostname and port as a trusted FIDO2 origin by adding the dev url as an allowed origin in the `<IS_HOME>/repository/resources/conf/deployment.toml` file.
    
    ```toml
    [fido.trusted]
    origins=["https://localhost:9000"]
    ```

3. Make the callback URL configurable by adding the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
    ```toml
    [system_applications]
    read_only_apps = []
    ```

4.  Restart WSO2 IS.

5.  Configure the callback URLs for **My Account**.

    1.  Log in to the WSO2 IS management console.
    2.  Click **Service Providers > List**.
    3.  Click **Edit** to edit the **My Account** service provider.
    4.  Expand **Inbound Authentication Configuration**, and then expand **OAuth/OpenID Connect Configuration**. Click **Edit**.
    5.  Change the **Callback URL** field to reflect the port as 9000 or you can add a regexp as follows.
        ```
        regexp=(https://localhost:9443/myaccount/login|https://localhost:9000/myaccount/login)
        ```
---

## Step 2: Build the Identity Apps repository

Fork the original repository to start working on it. You can also directly clone the original repo but it is
recommended to create your own fork.

```
git clone https://github.com/wso2/identity-apps
cd identity-apps
```

Build the project using either of the following commands.

```
mvn clean install
```
or 

```
npm run build
```

---

## Step 3: Run My Account in dev mode

After the build is complete, navigate to the **myaccount** directory and run the application using the webpack dev server.

```
cd apps/myaccount
npm start
```

The application will be served from `https://localhost:9000/myaccount`
